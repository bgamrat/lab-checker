"use strict";
import { clearUI, displaySuccess, displayError, displayResults, displayLabId } from '../common/ui.js';

import { labs } from '../labs/csci107n.js';

const handlePresents = (n, frag) => {
    let count = 0;
    let missing = [];
    for (const nn of n.elements) {
        if (frag.querySelector(nn) !== null) {
            count++;
        } else {
            missing.push(nn);
        }
    }
    if (count < n.count) {
        displayError(`Missing ${n.count - count} expected elements <${missing.join('>, <')}>`);
        return false;
    }
    return true;
};

const traverse = (doc, tree, frag) => {

    let expected = 1;
    for (let node in tree) {
        let n = tree[node];
        if (["required"].includes(node)) {
            if (!n.required) {
                expected = 0;
            }
            continue;
        }
        if (node === "present") {
            if (!handlePresents(n, frag)) {
                return false;
            }
            continue;
        }
        if (n instanceof Array) {
            expected = 0;
            for (let nn of n) {
                if (nn === null || (typeof nn === "object" && !nn.required)) {
                    expected++;
                }
            }
        } else {
            if (typeof n !== "object" && !n.required) {
                expected = 0;
            }
        }

        let querySelector = node;
        let qs = frag.querySelectorAll(querySelector);
        if (qs.length < expected) {
            displayError(`Missing expected element <${node}>`);
            return false;
        } else if (qs.length !== 0) {
            if (n instanceof Array) {
                let q = 0;
                for (let nn of n) {
                    if (nn !== null && qs[q].children.length > 0) {
                        if (!traverse(doc, nn, qs[q])) {
                            return false;
                        }
                    }
                    q++;
                }
            } else if (n !== null && qs.length > 0) {
                if (!traverse(doc, n, qs[0])) {
                    return false;
                }
            }
        }
        expected = 1;
    }
    return true;
};

const getLabNumber = (str) => {
    const re = /lab\s*\d+/im;
    const found = str.match(re);
    if (found) {
        return found[0].replace(' ', '').toLowerCase();
    }
    return null;
};

const check = (filename,str) => {

    clearUI();
    displayResults();
    const lab = getLabNumber(filename) || getLabNumber(str);

    if (lab) {
        if (!labs[lab]) {
            displayError(lab + " not found");
            return null;
        }
    } else {
        displayError("Missing lab identifier (add 'Lab #' as a <title> or in a <!-- comment -->)");
        return null;
    }
    displayLabId("Lab "+lab.replace(/\D+/,''));

    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    const errorNode = doc.querySelector("parsererror");

    if (errorNode) {
        displayError(errorNode);
    } else {
        console.log(doc);
        if (traverse(doc, labs[lab], doc)) {
            displaySuccess("Passed all checks");
        }
    }
    return lab;
};

export { check }