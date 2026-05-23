import { markdocPreprocess } from "markdoc-svelte";
import adapter from "@sveltejs/adapter-static";

/** @type {import("@sveltejs/kit").Config} */
const config = {
    kit: {
        adapter: adapter(),
        prerender: {
            handleUnseenRoutes: "warn"
        }
    },
    preprocess: [
        markdocPreprocess()
    ],
    extensions: [
        ".svelte",
        ".mdoc",
        ".md"
    ],
    paths: {
        base: process.argv.includes("dev") ? "" : process.env.BASE_PATH
    }
};

export default config;
