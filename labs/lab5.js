const lab5 = {
    head: {
        meta: null,
        title: null
    },
    body: {
        main: {
            article: {
                h1: null,
                present: {
                    count: 8,
                    elements: [
                        "abbr", "address", "blockquote", "cite", "dl", "em", "a[href^='mailto:']", "a[href^='tel:']",
                        "img", "quote", "small", "strong", "time"
                    ]},
                section: [{
                        h2: null,
                    },
                    {
                        required: false,
                        h2: null,
                    },
                    {
                        required: false,
                        h2: null,
                    }
                ]
            }
        }
    }
};

export { lab5 };