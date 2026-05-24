import { markdocPreprocess } from "markdoc-svelte";
import adapter from "@sveltejs/adapter-static";
import { DEV } from "./utils.js";

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
        base: DEV ? "" : process.env.BASE_PATH
    }
};

export default config;
