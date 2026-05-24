import { error } from "@sveltejs/kit";

/** @type {import("./$types").PageLoad} */
export async function load({ params }) {
    try {
        // ignore template file
        if (params.entry == "_template_") {
            throw new Error("");
        }
        console.log(params.entry);
        const post = await import(`$lib/blog/${params.entry}.md`);
        return { post };
    } catch(err) {
        console.error(err);
        throw error(404, `No corresponding file found for the slug "${params.entry}"`);
    }
};
