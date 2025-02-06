/** @type {import("drizzle-kit").Config} */

export default {
    schema: "./src/utils/schema.tsx",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DRIZZLE_DB_URL
    }
};