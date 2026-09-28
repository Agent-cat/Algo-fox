import { globalIgnores } from "eslint/config";

// Shared base: ignore build outputs and generated files in every workspace member.
export const baseIgnores = globalIgnores([
  "**/.next/**",
  "**/out/**",
  "**/build/**",
  "**/dist/**",
  "**/next-env.d.ts",
  "**/coverage/**",
]);
