#!/usr/bin/env node

const { writeFileSync, existsSync, mkdirSync } = require('fs');
const { get } = require('https');

const templatePath = (fileName) => `https://jayhal.es/cdn/jayh/${fileName}.tmplt`;

const functionName = process.argv[2];

const arguments = process.argv.slice(3);

switch (functionName) {
    case "--crc": // Create react component
        createClass(arguments[0]);
        break;

    case "--rtc": // Replace TSConfig
        replaceTsConfig();
}

async function createClass(className) {
    let template = await getFile(templatePath('classTemplate.tsx'));

    template = template.replace(/\${className}/g, className);

    if (!existsSync('./components')) {
        mkdirSync('./components');
    }

    writeFileSync(`./components/${className}.tsx`, template);
}

async function replaceTsConfig() {
    const template = await getFile(templatePath('tsconfig.json'));

    writeFileSync(`./tsconfig.json`, template);
}

function getFile(url) {
    return new Promise((resolve, reject) => {       
        get(url, (res) => {

            let data = '';

            res.on('data', (d) => {
                data += d;
            });

            res.on('end', () => {
                resolve(data);
            });

            res.on('error', (e) => {
                reject(e);
            });
        });
    });
}

