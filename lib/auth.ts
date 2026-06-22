import { betterAuth } from "better-auth";
import { admin, emailOTP } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { sendEmail } from "./email";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // verification handled manually via OTP before registration
    sendResetPassword: async ({ user, url, token }) => {
      void sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
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
      scope: ["repo", "read:user", "user:email"], // Added repo scope for GitHub Sync
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
      githubRepo: {
        type: "string",
        required: false,
      },
      githubSyncMode: {
        type: "string",
        required: false,
        defaultValue: "ACCEPTED_ONLY",
      },
      githubAutoSync: {
        type: "boolean",
        required: false,
        defaultValue: true,
      },
      lastSyncedAt: {
        type: "date",
        required: false,
      },
    },
  },
  databaseHooks: {
    account: {
      create: {
        after: async (account) => {
          console.log("[Auth] Account created hook triggered for provider:", account.providerId);
          if (account.providerId === "github" && account.accessToken) {
            try {
              console.log("[Auth] Fetching GitHub profile using accessToken...");
              const res = await fetch("https://api.github.com/user", {
                headers: {
                  Authorization: `Bearer ${account.accessToken}`,
                  "User-Agent": "Algo-fox",
                },
              });
              if (res.ok) {
                const profile = await res.json();
                console.log("[Auth] GitHub profile fetched successfully, login:", profile.login);
                if (profile.login) {
                  await prisma.user.update({
                    where: { id: account.userId },
                    data: { githubHandle: profile.login },
                  });
                  console.log("[Auth] Successfully updated user githubHandle to", profile.login);
                }
              } else {
                const errorText = await res.text();
                console.error("[Auth] Failed to fetch GitHub profile. Status:", res.status, errorText);
              }
            } catch (err) {
              console.error("[Auth] Error fetching GitHub profile on account link:", err);
            }
          } else if (account.providerId === "github") {
            console.error("[Auth] GitHub account linked but no accessToken was provided in the account object!");
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
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification" || type === "sign-in") {
          void sendEmail({
            to: email,
            subject: "Verify your email address",
            text: `Your OTP for Algo-fox is: ${otp}`,
          });
        }
      },
    }),
  ],
});

