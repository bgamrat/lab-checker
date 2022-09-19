const lab6 = {
    head: {
        meta: null,
        title: null
    },
    body: {
        header: {
            nav: {
                ul: {
                    li: Array(5).fill({a: null})
                }
            }
        },
        main: {
            article: {
                h1: null,
                section: {
                    h2: null
                },
                aside: null
            }
        },
        footer: {
            address: {
                "a[href^='mailto:']": null,
                "a[href^='tel:']": null
            }
        },
        present: {
            count: 1,
            elements: [
                "img"
            ]
        }
    }
};

export { lab6 };