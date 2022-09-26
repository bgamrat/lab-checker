const lab6 = {
    head: {
        meta: null,
        title: null
    },
    body: {
	a: null,
        header: {
		h1: null,
		img: null,
		a: null
        },
        main: {
            article: {
                h2: null,
                nav: {
                    ul: {
                        li: Array(5).fill({a: null})
                    }
                },
                section: Array(5).fill({h3: null, p:null}),
                aside: null,
		a: null
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
