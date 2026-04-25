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
