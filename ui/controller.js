"use strict";

import { check } from './check.js';
import { clearAlerts,displayError } from '../common/ui.js';

const contentEl = document.getElementById('fileContent');
const fileEl = document.getElementById('fileInput');

const previewFile = () => {

    const [file] = fileEl.files;
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        contentEl.innerText = reader.result;
        check(reader.result);
    }, false);

    if (file) {
        clearAlerts();
        if (file.type === "text/html") {
            reader.readAsText(file);
        } else {
            displayError("File must be .html");
        }
    }
}

fileEl.addEventListener("change", previewFile);