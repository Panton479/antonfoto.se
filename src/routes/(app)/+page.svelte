<script>
    // dev note: add "&format=webp" for speedup
    import background from "$lib/assets/image.png?enhanced&effort=max&quality=80";
    import anton from "$lib/assets/anton_grayscale.png?enhanced&effort=max&quality=80";
    import signature from "$lib/assets/signature.png?enhanced&effort=max&quality=80";
</script>

<svelte:head>
    <title>Anton Foto</title>
</svelte:head>

<div id="top">
    <enhanced:img id="bakground" src={background} alt="" />
    <enhanced:img id="signature" src={signature} alt="Signatur av namnet Anton" />
    <div id="top-gradient"></div>
</div>

<div id="about">
    <div>
        <h1>Tjena!</h1>
        <p>Jag heter Anton och är 19 år. Mina två stora intressen i livet är musik och foto. Jag spelar inga instrument utan gillar mer att samla på musik, samt fota konserter. Det jag fotar mest är konserter och arkitektur.</p>
        <p>Jag har gillat att fota sen jag var 15 år. Sen dess har jag flitigt hållit på med fotografering. Några hobbies jag har utöver foto och musik är film och gillar att filma en del också.</p>
    </div>
    <div>
        <enhanced:img id="about-guy" src={anton} alt="Gråskalig bild på en människa som sitter på en säng" />
    </div>
</div>

<style>
    #top {
        margin-top: -5rem;
        position: relative;
        height: 70vh;
        z-index: -1;
    }
    #bakground {
        width: 100%;
        height: 90vh;
        object-fit: cover;
    }
    #signature {
        position: absolute;
        top: 10rem;
        right: 8rem;
        width: 24rem;
        height: auto;
        filter: drop-shadow(2px 2px 4px black);
    }
    #top-gradient {
        position: absolute;
        bottom: -20vh;
        left: 0;
        width: 100%;
        height: 40vh;
        background-image: linear-gradient(to bottom, transparent, black);
    }

    #about {
        display: grid;
        grid-template-columns: 2fr 1fr;
        max-width: 1200px;
        margin: auto;
        padding: 0 2rem;
        text-align: justify;
        column-gap: 1rem;
    }
    #about p {
        font-size: 13pt;
    }

    #about-guy {
        width: 100%;
        height: auto;
        border-radius: 0 20px 20px 0;
    }

    @media screen and (max-width: 800px) {
        #signature {
            width: 15rem;
            top: 8rem;
            right: 3rem;
        }
    }
    @media screen and (max-width: 600px) {
        #about {
            display: block;
        }
        #about-guy {
            border-radius: 0;
        }
    }
</style>
