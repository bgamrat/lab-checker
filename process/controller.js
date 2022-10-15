"use strict";

import { check } from './check.js';
import { clearUI, displayError } from '../common/ui.js';
import { hints } from './hints.js';
import { validate } from './validate.js';

const contentEl = document.getElementById('fileContent');
const fileEl = document.getElementById('fileInput');
const labIdEl = document.getElementById('labIdInput');
const viewEl = document.getElementById('view');

viewEl.addEventListener('load', function(e) {
    // Thanks to: https://stackoverflow.com/a/819455/2182349
    this.height = this.contentWindow.document.body.scrollHeight + 50; // fudge factor
});


const loadFile = () => {

    clearUI();

    viewEl.srcdoc = "";

    const [file] = fileEl.files;
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        contentEl.innerText = reader.result;
        viewEl.srcdoc = reader.result;
        
        // gives the text input value precedence over the filename
        const labId = labIdEl.value.trim() + file.name;
        const lab = check(labId, reader.result);
        if (lab) {
            hints(lab);
        }
    }, false);

    if (file) {
        if (file.type === "text/html") {
            reader.readAsText(file);
            validate(file);
        } else {
            displayError("File must be .html");
        }
    }
}

fileEl.addEventListener("change", loadFile);
labIdEl.addEventListener("change", loadFile);