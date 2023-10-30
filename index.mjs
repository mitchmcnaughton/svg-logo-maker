// getting fs,inquirer and linking the shapes file in lib
import fs from 'fs';
import inquirer from 'inquirer';
import shapes from './lib/shapes.js';

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
        var svgShape;
        //if statement to change the svg shape based on users selection
        if (answers.shape === 'circle'){
            svgShape = `<circle cx="0" cy="10" r="20" fill = "${answers.shapeColour}"/>`;
        } else if (answers.shape === 'triangle') {
            svgShape = `<polygon x="0" y="0" points="250,60 100,400 400,400" fill="${answers.shapeColour}/>`
        } else {
            svgShape = `<rect x="0" y="0" width="30" height="30" fill="${answers.shapeColour}/>`;
        }
        
        //text for the svg!
        const svgContent =
        `<svg xmlns="http://www.w3.org/2000/svg">
        <g>
        ${svgShape}
        <text x="0" y="50" font-size="35" fill="${answers.textColour}">${answers.logo}</text>
        </g>
        </svg>
        `;

        //for generating multiple svgs with unique names so nothing gets overwritten
        const timestamp = Date.now();

        //write the svg text from above into a new file in examples folder
        fs.writeFileSync(`examples/${timestamp}.svg`, svgContent, 'utf8');
        console.log('SVG has been generated');
    } catch (error) {
        console.log('An error has occured oop:', error);
    }
    }

    collectUserInputWriteFile();

