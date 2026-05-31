<script>
    import { afterNavigate, disableScrollHandling, goto } from "$app/navigation";
    import IcRoundClose from "@iconify-svelte/ic/round-close";
    import IcRoundChevronLeft from "@iconify-svelte/ic/round-chevron-left";
    import IcRoundChevronRight from "@iconify-svelte/ic/round-chevron-right";
    import { fade, scale } from "svelte/transition";

    /** @type {import("./$types").PageProps} */
    let { data } = $props();

    function img_close() {
        goto("/gallery");
    }

    afterNavigate(() => disableScrollHandling());
</script>

<svelte:head>
    <title>Galleri | Anton Foto</title>
</svelte:head>

<main>
    <ul id="images">
        {#each data.images as img, i}
        <li>
            <a href="/gallery/{encodeURIComponent(data.names[i])}" title={data.names[i]}>
                <!-- svelte-ignore a11y_missing_attribute -->
                <enhanced:img src={img.default} loading="lazy" decoding="async" />
            </a>
        </li>
        {/each}
    </ul>
</main>

{#if data.popup}
<div id="image-popup" transition:fade={{ duration: 250 }}>
    <div id="popup-container" transition:scale>
        <!-- svelte-ignore a11y_missing_attribute -->
        <enhanced:img src={data.popup.image.default} fetchpriority="high" />
    </div>
    
    <a id="popup-close" href="/gallery">
        <IcRoundClose />
    </a>
    {#if data.popup.prev}
    <a id="popup-prev" href="/gallery/{encodeURIComponent(data.popup.prev)}">
        <IcRoundChevronLeft />
    </a>
    {/if}
    {#if data.popup.next}
    <a id="popup-next" href="/gallery/{encodeURIComponent(data.popup.next)}">
        <IcRoundChevronRight />
    </a>
    {/if}

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div id="popup-close-target" onclick={img_close}></div>
</div>
{/if}

<style>
    #images {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-auto-rows: 20rem;
    }
    #images a {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    #images enhanced\:img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition-property: transform, filter;
        transition-duration: 100ms;
    }
    #images a:hover:not(:focus) enhanced\:img {
        filter: brightness(0.8);
        transform: scale(1.1);
    }

    #image-popup {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #image-popup enhanced\:img {
        width: auto;
        height: auto;
        max-width: 100vw;
        max-height: 100vh;
    }
    #image-popup a {
        position: absolute;
        color: var(--accent);
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 12px;
        width: 3rem;
        height: 3rem;
    }
    #popup-close {
        top: 1rem;
        right: 1rem;
    }
    #popup-prev, #popup-next {
        top: 50%;
        transform: translateY(-50%);
    }
    #popup-prev {
        left: 0.5rem;
    }
    #popup-next {
        right: 0.5rem;
    }
    #popup-close-target {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    /* layer order for popup elements*/
    #image-popup {
        z-index: 200;
    }
    #popup-close-target {
        z-index: 250;
    }
    #popup-container,
    #image-popup a {
        z-index: 300;
    }

    @media (prefers-reduced-motion: reduce) {
        #images a:hover:not(:focus) enhanced\:img {
            transform: none;
        }
        #image-popup enhanced\:img {
            transition: none;
        }
    }

    @media screen and (max-width: 1600px) {
        #images {
            grid-template-columns: repeat(4, 1fr);
        }
    }
    @media screen and (max-width: 1200px) {
        #images {
            grid-template-columns: repeat(3, 1fr);
        }
    }
    @media screen and (max-width: 800px) {
        #images {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media screen and (max-width: 600px) {
        #images {
            grid-auto-rows: 15rem;
        }
    }
</style>
