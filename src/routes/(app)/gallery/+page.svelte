<script>
    import IcRoundClose from "@iconify-svelte/ic/round-close";
    import IcRoundChevronLeft from "@iconify-svelte/ic/round-chevron-left";
    import IcRoundChevronRight from "@iconify-svelte/ic/round-chevron-right";
    import { onMount } from "svelte";

    // import all images under gallery folder
    const imports = import.meta.glob(
        "$lib/gallery/*.{avif,AVIF,gif,GIF,heif,HEIF,jpeg,JPEG,jpg,JPG,png,PNG,tiff,TIFF,webp,WEBP}",
        {
            eager: true,
            query: {
                enhanced: true
            }
        }
    );

    // strip keys to only filename
    const NAME_MATCHER = /[^\/\\]+$/;
    const images = [];
    const names = [];
    for (const [k, v] of Object.entries(imports)) {
        const name = k.match(NAME_MATCHER)[0].split(".")[0];
        images.push(v);
        names.push(name);
    };

    let popupDisplay = $state("none");
    let popupOpacity = $state("0");
    let popupTransform = $state("scale(0)");
    let selected = $state(0);
    let disablePrev = $derived(selected <= 0);
    let disableNext = $derived(selected >= images.length - 1);

    // button functions
    function img_click(i, delay = true) {
        location.hash = encodeURIComponent(names[i]);
        selected = i;
        popupDisplay = undefined;
        if (delay) {
            setTimeout(img_click_post, 10);
        } else {
            img_click_post();
        }
    }
    function img_click_post() {
        popupOpacity = "1";
        popupTransform = "scale(1)";
    }
    function img_close() {
        location.hash = "";
        popupOpacity = "0";
        popupTransform = "scale(0)";
        setTimeout(() => {
            popupDisplay = "none";
        }, 250);
    }
    function img_prev() {
        if (selected > 0) {
            selected -= 1;
            location.hash = encodeURIComponent(names[selected]);
        }
    }
    function img_next() {
        if (selected < images.length - 1) {
            selected += 1;
            location.hash = encodeURIComponent(names[selected]);
        }
    }

    onMount(() => {
        if (location.hash?.length > 1) {
            const lookup = names.indexOf(decodeURIComponent(location.hash.substring(1)));
            if (lookup < 0) {
                location.hash = "";
            } else {
                img_click(lookup, false);
            }
        }
    });
</script>

<svelte:head>
    <title>Galleri | Anton Foto</title>
</svelte:head>

<main>
    <ul id="images">
        {#each images as img, i}
        <li>
            <button onclick={() => img_click(i)} title={names[i]}>
                <!-- svelte-ignore a11y_missing_attribute -->
                <enhanced:img src={img.default} loading="lazy" decoding="async" />
            </button>
        </li>
        {/each}
    </ul>
</main>


<div id="image-popup" style:display={popupDisplay} style:opacity={popupOpacity}>
    <!-- svelte-ignore a11y_missing_attribute -->
    <enhanced:img src={images[selected].default} style:transform={popupTransform} decoding="async" fetchpriority="high" />
    
    <button id="image-close" onclick={img_close}>
        <IcRoundClose />
    </button>
    <button id="image-prev" onclick={img_prev} disabled={disablePrev}>
        <IcRoundChevronLeft />
    </button>
    <button id="image-next" onclick={img_next} disabled={disableNext}>
        <IcRoundChevronRight />
    </button>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div id="image-close-target" onclick={img_close}></div>
</div>

<style>
    #images {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-auto-rows: 20rem;
    }
    #images button {
        width: 100%;
        height: 100%;
        padding: 0;
        border: none;
        overflow: hidden;
        cursor: pointer;
        background: none;
    }
    #images enhanced\:img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition-property: transform, filter;
        transition-duration: 100ms;
    }
    #images button:hover:not(:focus) enhanced\:img {
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
        transition: opacity 250ms;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #image-popup enhanced\:img {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        transition: transform 250ms;
    }
    #image-popup button {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 12px;
        padding: 0;
        color: #fff;
        cursor: pointer;
        width: 3rem;
        height: 3rem;
    }
    #image-popup button[disabled] {
        display: none;
    }
    #image-close {
        top: 1rem;
        right: 1rem;
    }
    #image-prev, #image-next {
        top: 50%;
        transform: translateY(-50%);
    }
    #image-prev {
        left: 0.5rem;
    }
    #image-next {
        right: 0.5rem;
    }
    #image-close-target {
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
    #image-close-target {
        z-index: 250;
    }
    #image-popup enhanced\:img, #image-popup button {
        z-index: 300;
    }

    @media (prefers-reduced-motion: reduce) {
        #images button:hover:not(:focus) enhanced\:img {
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
