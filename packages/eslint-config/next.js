import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { baseIgnores } from "./base.js";

// Shared Next.js config — same rule set the web app used before the monorepo move.
export const nextJsConfig = defineConfig([...nextVitals, ...nextTs, baseIgnores]);

export default nextJsConfig;
