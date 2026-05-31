import { error } from "@sveltejs/kit";

// import all images under gallery folder
const imports = import.meta.glob(
    "$lib/gallery/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp}",
    {
        eager: true,
        query: {
            enhanced: true
        }
    }
);

// strip keys to only filename
const images = [];
const names = [];
for (const [k, v] of Object.entries(imports)) {
    // surely this wont cause any issues
    const name = k.match(/[^\/\\]+$/)[0].split(".")[0];
    images.push(v);
    names.push(name);
};

/** @type {import("./$types").PageLoad} */
export async function load({ params }) {
    const data = {
        images,
        names,
        popup: null
    };

    if (params.entry) {
        const lookup = names.indexOf(decodeURIComponent(params.entry));
        if (lookup < 0) {
            throw error(404);
        } else {
            data.popup = {
                image: images[lookup],
                name: names[lookup],
                prev: names[lookup - 1],
                next: names[lookup + 1]
            };
        }
    }

    return data;
};
