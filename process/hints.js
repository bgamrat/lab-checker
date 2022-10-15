"use strict";
import { labs } from '../labs/csci107n.js';

const contentEl = document.getElementById('hints');

const traverse = (tree, text, depth) => {

    let tabs = '    '.repeat(depth);
    depth++;
    let expected = 1;
    for (let node in tree) {
        let n = tree[node];
        if (["required"].includes(node)) {
            if (!n.required) {
                text.push(`${tabs} ${node} (optional)`);
            }
            continue;
        }
        if (node === "present") {
            text.push(`${tabs}expecting ${n.count} of <${n.elements.join('>, <')}>`)
            continue;
        }
        if (n instanceof Array) {
            expected = 0;
            for (let nn of n) {
                if (nn === null || (typeof nn === "object" && !nn.required)) {
                    expected++;
                }
            }
            text.push(`${tabs}expecting ${expected} <${node}>`);
        } else {
            let s = tabs + '<' + node +'>';
            if (typeof n !== "object" && !n.required) {
                s += "(optional)";
            }
            text.push(s);
        }

        if (n instanceof Array) {
            for (let nn of n) {
                if (nn !== null) {
                    traverse(nn, text, depth);
                }
            }
        } else if (n !== null) {
            traverse(n, text, depth);

        }
        expected = 1;
    }
    return depth;
};

const hints = (lab) => {
    let text = [];
    traverse(labs[lab], text, 0);
    contentEl.innerText = text.join('\n');
};

export { hints }