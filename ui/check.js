"use strict";
import { clearAlerts, displaySuccess, displayError, showView } from '../common/ui.js';

import { labs } from '../labs/csci107n.js';

const traverse = (doc, tree, frag) => {
    let expected = 0;
    for (let node in tree) {
        let n = tree[node];
        if (["required"].includes(node)) {
            if (n.required) {
                expected = 1;
            }
            continue;
        }
        if (n instanceof Array) {
            expected = 0;
            for (let nn of n) {
                if (nn === null || nn.required) {
                    expected++;
                }
            }
        } else {
            if (n.required) {
                expected = 1;
            }
        }
        let qs = frag.querySelectorAll(node);
        if (qs.length < expected) {
            displayError(`Missing expected element <${node}>`);
            return false;
        } else {
            if (n instanceof Array) {
                let q = 0;
                for (let nn of n) {
                    if (qs[q].children.length > 0) {
                        if (!traverse(doc, nn, qs[q])) {
                            return false;
                        }
                    }
                    q++;
                }
            } else if (qs.length > 0) {
                if (!traverse(doc, n, qs[0])) {
                    return false;
                }
            }
        }
        expected = 0;
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
}

const check = (str) => {
    clearAlerts();
    showView();
    const lab = getLabNumber(str);

    if (lab) {
        if (!labs[lab]) {
            displayError(lab + " not found");
            return;
        }
    } else {
        displayError("Missing lab identifier (add 'Lab #' as a <title> or in a <!-- comment -->)");
        return;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    const errorNode = doc.querySelector("parsererror");

    if (errorNode) {
        displayError(errorNode);
    } else {
        if (traverse(doc, labs[lab], doc)) {
            displaySuccess("Passed all checks");
        }
    }
}

export { check }