const lab4 = {
    head: {
        meta: null,
        title: null
    },
    body: {
        main: {
            article: {
                h1: null,
                section: [{
                        h2: null,
                        ul: {
                            li: Array(3).fill(null)
                        }
                    },
                    {
                        h2: null,
                        ol: {
                            li: Array(3).fill(null)
                        }
                    },
                    {
                        h2: null,
                        dl: {
                            dt: Array(3).fill(null),
                            dd: Array(3).fill(null)
                        }
                    }
                ]
            }
        }
    }
};

export { lab4 };