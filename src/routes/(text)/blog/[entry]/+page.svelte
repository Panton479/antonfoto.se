<script>
    import { onMount } from "svelte";

    /** @type {import("./$types").PageProps} */
    let { data } = $props();

    let created = $state("");
    let edited = $state("");

    onMount(() => {
        const format = new Intl.DateTimeFormat(undefined, {
            dateStyle: "full",
            timeStyle: "medium"
        });
        created = format.format(new Date(data.post.frontmatter.created));
        if (data.post.frontmatter.edited) {
            edited = format.format(new Date(data.post.frontmatter.edited));
        }
    });
</script>

<svelte:head>
    <title>{data.post.frontmatter.title} | Anton Foto</title>
</svelte:head>

<h1>{data.post.frontmatter.title}</h1>
<data.post.default />

<p>
    Publicerad
    <time datetime={data.post.frontmatter.created}>{created}</time>
</p>
{#if data.post.frontmatter.edited}
    <p id="edited">
        Uppdaterad
        <time datetime={data.post.frontmatter.edited}>{edited}</time>
    </p>
{/if}

<style>
    #edited {
        font-style: italic;
        font-size: 11pt;
    }
</style>
