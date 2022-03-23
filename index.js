#!/usr/bin/env node

const { writeFileSync, existsSync, mkdirSync } = require('fs');

const args = process.argv.slice(2);

const className = args[0];

const template = 

`import React from "react";

export default class ${className} extends React.Component<I${className}Props, I${className}State> {

    constructor(props: I${className}Props) {
        super(props);
    }

    render() {
        return(
            <div className="${className}">

            </div>
        );
    }
}

interface I${className}Props {

}

interface I${className}State {

}`;

if (!existsSync('./components')) {
    mkdirSync('./components');
}

writeFileSync(`./components/${className}.tsx`, template);