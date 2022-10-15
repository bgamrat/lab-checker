// lab template

/* 
 * represents an HTML document
 * uses CSS selectors
 * all elements are required, unless explicitly excluded
 * hierarchy must be exact, meaning the article must have an h1 and at least one section as direct descendents
 * import this into the course (in this case csci107n.js) - this is new code ... 
 */ 

const labName = {
    head: {
        meta: null,
        title: null
    },
    body: {
        main: {
            article: {
                // terminal elements are indicated as 'null'
                h1: null,
                // at least 8 of these elements must be present at some level in the parent
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
                ],
                picture: {
                    // repeated elements must be handled as arrays
                    source: Array(2).fill(null),
                    img: null
                }
            }
        }
    }
};

export { labName };