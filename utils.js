import process from "node:process";

// shorthand for checking if in development environment
export const DEV = process.env.NODE_ENV != "production";
