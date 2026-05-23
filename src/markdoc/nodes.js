import Markdoc from "@markdoc/markdoc";

export default {
    image: {
        render: "EnhancedImage",
        attributes: {
            // include the default image attributes
            ...Markdoc.nodes.image.attributes
        }
    }
};
