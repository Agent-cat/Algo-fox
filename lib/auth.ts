import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  account: {
    accountLinking: {
      updateUserInfoOnLink: true,
      allowUnlinkingAll: true,
      allowDifferentEmails: true,
    },
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    microsoft: {
      enabled: true,
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
    },
    github: {
      enabled: true,
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser: (profile) => {
        return {
          githubHandle: profile.login,
        };
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
      },
      institutionId: {
        type: "string",
        required: false,
      },
      onboardingCompleted: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      currentStreak: {
        type: "number",
        required: false,
        defaultValue: 0,
        input: false,
      },
      githubHandle: {
        type: "string",
        required: false,
      },
    },
  },
  databaseHooks: {
    account: {
      create: {
        after: async (account) => {
          if (account.providerId === "github" && account.accessToken) {
            try {
              const res = await fetch("https://api.github.com/user", {
                headers: {
                  Authorization: `Bearer ${account.accessToken}`,
                  "User-Agent": "Algo-fox",
                },
              });
              if (res.ok) {
                const profile = await res.json();
                if (profile.login) {
                  await prisma.user.update({
                    where: { id: account.userId },
                    data: { githubHandle: profile.login },
                  });
                }
              }
            } catch (err) {
              console.error("Error fetching GitHub profile on account link:", err);
            }
          }
        },
      },
      delete: {
        after: async (account) => {
          if (account.providerId === "github") {
            try {
              await prisma.user.update({
                where: { id: account.userId },
                data: { githubHandle: null },
              });
            } catch (err) {
              console.error("Error clearing GitHub handle on account unlink:", err);
            }
          }
        },
      },
    },
  },

  plugins: [
    admin({
      adminRoles: ["ADMIN"],
      defaultRole: "USER",
      impersonation: {
        enabled: true,
      },
      // Set ADMIN_USER_IDS in your .env as a comma-separated list of user IDs
      adminUserIds: process.env.ADMIN_USER_IDS
        ? process.env.ADMIN_USER_IDS.split(",").map((id) => id.trim()).filter(Boolean)
        : ["jvp0LDpaCm0Y2VpUVP75vCNQnDioEdpm"],
    }),
  ],
});

