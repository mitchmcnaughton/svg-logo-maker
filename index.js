// getting fs,inquirer and linking the shapes file in lib
const fs = require('fs');
const inquirer = require('inquirer');
const shapes = require('./lib/shapes');

//function to collect user input and write the svg file
async function collectUserInputWriteFile(){
    try {
        //questions for determining the logo
        const questions = [
            {
                type: 'input',
                name: 'logo',
                message: 'Please Enter 3 Characters:',
                //making sure user can only progress when they have entered 3 characters
                validate: (input) => input.length <= 3,
            },
            {
                type: 'input',
                name: 'textColour',
                message: 'Please enter a text colour or hex number:',
            },
            {
                type: 'list',
                name: 'shape',
                message: 'Please choose a shape:',
                choices: ['circle', 'triangle','square']
            },
            {
                type: 'input',
                name: 'shapeColour',
                message: 'Please enter a shape colour or hexn number:',
            }
        ];

        const answers = await inquirer.prompt(questions);

    }
}
