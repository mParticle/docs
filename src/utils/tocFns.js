export const generateTocItems = (object) => {
    if (object.length > 1) {
        return object.map((item) => generateTocItems(item));
    }
    if (object.metadataChildren) {
        return {
            id: object.id,
            label: object.title,
            children: generateTocItems(object.metadataChildren),
        };
    }

    const result = {
        id: object.id,
        path: object.path,
        label: object.title,
    };

    return result;
};

export const generateHeadings = (headings) => headings
    // Filter only h1, h2, and h3
    .filter((entry) => entry.depth <= 3)
    .map((entry) => ({
        id: entry.id,
        label: entry.value,
        anchor: entry.id,
    }));
