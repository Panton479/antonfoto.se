<script>
    const { src, ...rest } = $props();

    // import all images in assets folder
    const imports = import.meta.glob(
        "$lib/assets/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}",
        {
            eager: true,
            query: {
                enhanced: true
            }
        }
    );

    // find the image module that matches the src
    const matchingPath = Object.keys(imports).find(x => x.endsWith(src));
    const image = matchingPath ? imports[matchingPath].default : undefined;
</script>

{#if image}
    <enhanced:img src={image} {...rest} />
{:else}
    <img src={src} {...rest}>
{/if}
