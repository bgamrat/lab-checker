"use strict";

import { validate } from './validate.js';
import { check } from './check.js';
import { hints } from './hints.js';
import { clearUI, displayError } from '../common/ui.js';

const contentEl = document.getElementById('fileContent');
const fileEl = document.getElementById('fileInput');
const labIdEl = document.getElementById('labIdInput');

const loadFile = () => {

    clearUI();

    const [file] = fileEl.files;
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        contentEl.innerText = reader.result;
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