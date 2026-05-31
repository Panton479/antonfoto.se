<script>
    import IcRoundHome from "@iconify-svelte/ic/round-home";

    /** @type {import("./$types").LayoutProps} */
    let { children } = $props();
</script>

<header>
    <a id="home" href="/"><IcRoundHome /></a>
    <ul>
        <li><a href="/hiring">Hiring</a></li>
        <li><a href="/gallery">Galleri</a></li>
        <li><a href="/blog">Blogg</a></li>
    </ul>
</header>

<div id="content">
    {@render children()}
</div>

<footer>
    <p>Anton Duvemar &copy; {new Date().getFullYear()}</p>
    <p>Skapad av <a href="https://cheese.nu">ThaCheeseBun</a></p>
</footer>

<style>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        z-index: 100;
        font-size: 16pt;
        text-shadow: 1px 1px 2px var(--background);
    }
    #home {
        width: 3rem;
        height: 3rem;
        filter: drop-shadow(1px 1px 2px var(--background));
    }
    header ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-auto-flow: column;
        column-gap: 2rem;
    }
    #content {
        flex: 1;
    }
    footer {
        display: flex;
        justify-content: space-between;
        padding: 1rem 2rem;
    }
    footer p {
        margin: 0;
    }

    header a {
        color: var(--accent);
        text-decoration: none;
        border-bottom: 1px solid;
        border-color: transparent;
        transition: border-color 100ms;
    }
    header a:hover {
        border-color: var(--accent);
    }

    @media screen and (max-width: 500px) {
        footer {
            display: block;
            text-align: center;
        }
    }
    @media screen and (max-width: 400px) {
        header ul {
            column-gap: 1rem;
        }
    }
</style>
