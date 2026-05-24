import { sveltekit } from "@sveltejs/kit/vite";
import { enhancedImages, get_widths } from "@sveltejs/enhanced-img";
import { defineConfig } from "vite";
import { DEV } from "./utils.js";

function fallback_format(meta) {
    if (meta.pages && meta.pages > 1) {
        return meta.format === "tiff" ? "tiff" : "gif";
    }
    if (meta.hasAlpha) {
        return "png";
    }
    return "jpeg";
}

export default defineConfig({
    plugins: [
        enhancedImages(async ({ pathname, searchParams: qs }, metadata) => {
            // skips processing in dev in addition to default behaviour
            if (DEV || !qs.has("enhanced")) return new URLSearchParams();

            const meta = await metadata();
            const img_width = qs.get("imgWidth");
            const width = img_width ? parseInt(img_width) : meta.width;

            if (!width) {
                console.warn(`Could not determine width of image ${pathname}`);
                return new URLSearchParams();
            }

            const { widths, kind } = get_widths(width, qs.get("imgSizes"));
            return new URLSearchParams({
                as: "picture",
                format: `avif;webp;${fallback_format(meta)}`,
                w: widths.join(";"),
                ...(kind === "x" && !qs.has("w") && { basePixels: widths[0].toString() }),
                // custom settings
                effort: "max",
                quality: 80
            });
        }),
        sveltekit()
    ]
});
