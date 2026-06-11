import { prisma } from "./prisma";

export class GithubService {
  /**
   * Fetches the user's GitHub access token from the Account table.
   */
  static async getGithubToken(userId: string): Promise<string | null> {
    const account = await prisma.account.findFirst({
      where: {
        userId,
        providerId: "github",
      },
    });
    
    return account?.accessToken || null;
  }

  /**
   * Checks if a repository exists for the authenticated user.
   */
  static async checkRepoExists(token: string, repoName: string): Promise<boolean> {
    const response = await fetch(`https://api.github.com/user/repos?visibility=all&per_page=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "Algo-fox-sync",
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      console.error("[GithubService] Error fetching repos", await response.text());
      return false;
    }

    const repos = await response.json();
    return repos.some((repo: any) => repo.name === repoName);
  }

  /**
   * Creates a private repository for the user.
   */
  static async createRepository(token: string, repoName: string): Promise<boolean> {
    const response = await fetch(`https://api.github.com/user/repos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "Algo-fox-sync",
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: repoName,
        description: "Coding submissions synced from Algo-fox",
        private: true,
        auto_init: true,
      }),
    });

    if (!response.ok) {
      console.error("[GithubService] Error creating repo", await response.text());
      return false;
    }

    return true;
  }

  /**
   * Pushes a file to the GitHub repository.
   * If the file already exists, it updates it.
   */
  static async pushFileToGithub(
    token: string,
    githubHandle: string,
    repoName: string,
    filePath: string,
    content: string,
    commitMessage: string
  ): Promise<boolean> {
    try {
      const apiUrl = `https://api.github.com/repos/${githubHandle}/${repoName}/contents/${filePath}`;
      
      // 1. Check if file already exists to get its SHA
      const getResponse = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "Algo-fox-sync",
          Accept: "application/vnd.github.v3+json",
        },
      });

      let sha = undefined;
      if (getResponse.ok) {
        const fileData = await getResponse.json();
        sha = fileData.sha;
      }

      // 2. Create or Update file
      const encodedContent = Buffer.from(content).toString("base64");
      
      const putResponse = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": "Algo-fox-sync",
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: commitMessage,
          content: encodedContent,
          sha: sha,
        }),
      });

      if (!putResponse.ok) {
        console.error(`[GithubService] Error pushing file ${filePath}`, await putResponse.text());
        return false;
      }

      return true;
    } catch (error) {
      console.error("[GithubService] Exception in pushFileToGithub", error);
      return false;
    }
  }

  /**
   * Pushes multiple files to the GitHub repository in a single commit.
   * This uses the lower-level Git Database API.
   */
  static async pushMultipleFilesToGithub(
    token: string,
    githubHandle: string,
    repoName: string,
    files: { path: string; content: string }[],
    commitMessage: string
  ): Promise<boolean> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "User-Agent": "Algo-fox-sync",
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      };

      // 1. Get default branch name
      const repoRes = await fetch(`https://api.github.com/repos/${githubHandle}/${repoName}`, { headers });
      if (!repoRes.ok) return false;
      const repoData = await repoRes.json();
      const defaultBranch = repoData.default_branch || "main";

      // 2. Get the latest commit SHA for the default branch
      const refUrl = `https://api.github.com/repos/${githubHandle}/${repoName}/git/ref/heads/${defaultBranch}`;
      const refRes = await fetch(refUrl, { headers });
      
      let baseCommitSha: string;
      if (refRes.ok) {
        const refData = await refRes.json();
        baseCommitSha = refData.object.sha;
      } else {
        // If ref doesn't exist, it might be an empty repo
        return false; // Can't batch commit to an empty repo easily without a base commit.
      }

      // 3. Get the base tree SHA
      const commitRes = await fetch(`https://api.github.com/repos/${githubHandle}/${repoName}/git/commits/${baseCommitSha}`, { headers });
      if (!commitRes.ok) return false;
      const commitData = await commitRes.json();
      const baseTreeSha = commitData.tree.sha;

      // 4. Create the new tree
      const treePayload = {
        base_tree: baseTreeSha,
        tree: files.map(f => ({
          path: f.path,
          mode: "100644",
          type: "blob",
          content: f.content
        }))
      };

      const createTreeRes = await fetch(`https://api.github.com/repos/${githubHandle}/${repoName}/git/trees`, {
        method: "POST",
        headers,
        body: JSON.stringify(treePayload)
      });
      if (!createTreeRes.ok) {
        console.error("[GithubService] Error creating tree", await createTreeRes.text());
        return false;
      }
      const newTreeData = await createTreeRes.json();
      const newTreeSha = newTreeData.sha;

      // 5. Create a new commit
      const createCommitRes = await fetch(`https://api.github.com/repos/${githubHandle}/${repoName}/git/commits`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          message: commitMessage,
          tree: newTreeSha,
          parents: [baseCommitSha]
        })
      });
      if (!createCommitRes.ok) return false;
      const newCommitData = await createCommitRes.json();
      const newCommitSha = newCommitData.sha;

      // 6. Update the branch reference
      const updateRefRes = await fetch(refUrl, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          sha: newCommitSha,
          force: false
        })
      });

      if (!updateRefRes.ok) return false;

      return true;
    } catch (error) {
      console.error("[GithubService] Exception in pushMultipleFilesToGithub", error);
      return false;
    }
  }
}
