const fs = require('fs');
const inquirer = require('inquirer');


//mock the inquirer prompt
jest.mock('inquirer');

//import the function that collects user input and writes the SVG file
const { collectUserInputWriteFile } = require('./index.mjs');


describe('collectUserInputWriteFile', () => {
  it('generates an SVG file for a circle', async () => {
    inquirer.prompt.mockResolvedValueOnce({
      logo: 'ABC',
      textColour: 'red',
      shape: 'circle',
      shapeColour: 'blue',
    });

    //runs the function
    await collectUserInputWriteFile();

    //replace 'examples' with the correct path to your output folder
    const svgFilePath = 'examples/some-timestamp.svg';

    //read the generated SVG file
    const svgContent = fs.readFileSync(svgFilePath, 'utf8');

    
    expect(svgContent).toContain('<circle');
    expect(svgContent).toContain('fill="blue"');
    expect(svgContent).toContain('fill="red"');
    expect(svgContent).toContain('ABC');
  });

  it('generates an SVG file for a triangle', async () => {
    inquirer.prompt.mockResolvedValueOnce({
      logo: 'XYZ',
      textColour: 'blue',
      shape: 'triangle',
      shapeColour: 'green',
    });

    await collectUserInputWriteFile();

    const svgFilePath = 'examples/some-timestamp.svg';
    const svgContent = fs.readFileSync(svgFilePath, 'utf8');

    expect(svgContent).toContain('<polygon');
    expect(svgContent).toContain('fill="green"');
    expect(svgContent).toContain('fill="blue"');
    expect(svgContent).toContain('XYZ');
  });

  it('generates an SVG file for a square', async () => {
    inquirer.prompt.mockResolvedValueOnce({
      logo: '123',
      textColour: 'red',
      shape: 'square',
      shapeColour: 'yellow',
    });

    await collectUserInputWriteFile();

    const svgFilePath = 'examples/some-timestamp.svg';
    const svgContent = fs.readFileSync(svgFilePath, 'utf8');

    expect(svgContent).toContain('<rect');
    expect(svgContent).toContain('fill="yellow"');
    expect(svgContent).toContain('fill="red"');
    expect(svgContent).toContain('123');
  });

  
});