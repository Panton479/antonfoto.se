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
    }
</style>
