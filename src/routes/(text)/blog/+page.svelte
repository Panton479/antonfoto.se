<script>
    import { onMount } from "svelte";

    /** @type {import("./$types").PageProps} */
    let { data } = $props();

    let dates = $state([]);

    onMount(() => {
        const format = new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium"
        });
        for (const post of data.posts) {
            dates.push(format.format(new Date(post.frontmatter.created)));
        }
    });
</script>

<svelte:head>
    <title>Blogg | Anton Foto</title>
</svelte:head>

{#if data.posts.length > 0}
<ul>
{#each data.posts as post, i}
    <li>
        <a class="post" href="/blog/{post.slug}">
            <h1 class="post-title">{post.frontmatter.title}</h1>
            <time class="post-date" datetime={post.frontmatter.created}>{dates[i]}</time>
            <p class="post-summary">{post.frontmatter.summary}</p>
        </a>
    </li>
{/each}
</ul>
{:else}
    <div id="empty">
        <h1>¯\_(ツ)_/¯</h1>
        <h2>inget här än</h2>
    </div>
{/if}

<style>
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    li:nth-child(even) {
        text-align: right;
    }
    .post {
        display: block;
        color: var(--accent);
        text-decoration: none;
    }
    .post-title {
        margin-bottom: 0;
        color: var(--link);
    }
    .post:hover .post-title {
        text-decoration: underline;
    }
    .post-date {
        font-style: italic;
    }

    #empty {
        color: var(--accent-less);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #empty h2 {
        margin: 0;
    }
</style>
