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
                message: 'Please enter a shape colour or hex number:',
            }
        ];

        const answers = await inquirer.prompt(questions);
        var svgShape;
        var svgContent;
        //if statement to change the svg shape based on users selection
        if (answers.shape === 'circle'){
            svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
            <g>
              <circle cx="150" cy="100" r="90" fill="${answers.shapeColour}" />
              <text x="150" y="100" font-size="20" fill="${answers.textColour}" text-anchor="middle" alignment-baseline="middle">${answers.logo}</text>
            </g>
          </svg>`;
        } else if (answers.shape === 'triangle') {
            svgContent= `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
            <g>
              <polygon points="150,30 75,200 225,200" fill="${answers.shapeColour}" />
              <text x="150" y="160" font-size="20" fill="${answers.textColour}" text-anchor="middle" alignment-baseline="middle">${answers.logo}</text>
            </g>
          </svg>`;
        } else {
            svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
            <g>
              <rect x="50" y="0" width="200" height="200" fill="${answers.shapeColour}" />
              <text x="150" y="100" font-size="20" fill="${answers.textColour}" text-anchor="middle" alignment-baseline="middle">${answers.logo}</text>
            </g>
          </svg>`;
        }

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

