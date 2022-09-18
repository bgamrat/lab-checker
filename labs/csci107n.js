
const labs = {
    "lab4": {
        h1: {
            required: true
        },
        article: {
            required: true,
            h2: {
                required: true
            },
            section: [{
                    required: true,
                    h3: {
                        required: true
                    },
                    ul: {
                        required: true,
                        li: Array(3).fill(null)
                    }
                },
                {
                    required: true,
                    h3: {
                        required: true
                    },
                    ol: {
                        required: true,
                        li: Array(3).fill(null)
                    }
                },
                {
                    required: true,
                    h3: {
                        required: true
                    },
                    dl: {
                        required: true,
                        dt: Array(3).fill(null),
                        dd: Array(3).fill(null)
                    }
                }
            ]
        }
    }
};

export { labs };