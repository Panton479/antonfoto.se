const imports = import.meta.glob("$lib/blog/*.md");

/** @type {import("./$types").PageLoad} */
export async function load() {
    const posts = [];
    for (const [k, v] of Object.entries(imports)) {
        if (k.endsWith("_template_.md")) {
            continue;
        }
        const post = await v();
        posts.push({
            slug: post.slug,
            frontmatter: post.frontmatter
        });
    }

    // sort with latest posts first
    posts.sort((a, b) => {
        return Date.parse(b.frontmatter.created) - Date.parse(a.frontmatter.created);
    });
    
    return { posts };
};
