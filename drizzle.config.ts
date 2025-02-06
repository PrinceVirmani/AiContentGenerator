/** @type {import("drizzle-kit").Config} */

export default {
    schema: "./src/utils/schema.tsx",
    dialect: "postgresql",
    dbCredentials: {
        url: "postgresql://neondb_owner:npg_7zVKM1LDfATZ@ep-late-hall-a8vmqkzc-pooler.eastus2.azure.neon.tech/aicontentgenerator?sslmode=require"
    }
};