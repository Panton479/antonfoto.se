<script>
    /** @type {import("./$types").LayoutProps} */
    let { children } = $props();
</script>

<main>
    {@render children()}
</main>

<style>
    main {
        max-width: 900px;
        margin: 0 auto;
        padding: 0 2rem;
        line-height: 1.4;
        overflow-wrap: anywhere;
    }
</style>
