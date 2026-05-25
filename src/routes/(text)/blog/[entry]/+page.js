import { error } from "@sveltejs/kit";

/** @type {import("./$types").PageLoad} */
export async function load({ params }) {
    try {
        // ignore template file
        if (params.entry == "_template_") {
            throw new Error("");
        }
        const post = await import(`$lib/blog/${params.entry}.md`);
        return { post };
    } catch {
        throw error(404);
    }
};
