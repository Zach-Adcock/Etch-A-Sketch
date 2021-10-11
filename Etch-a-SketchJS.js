//Getting color choice buttons from HTML
const colorSelectorButton = document.querySelector('.color-choice');
const colorSelectorCircle = document.querySelector('#color-selector');
const ludicrousButton = document.querySelector('#ludicrous');
const eraserButton = document.querySelector('#eraser');
const clearButton = document.querySelector('#clear');

const buttonArray = [colorSelectorButton, ludicrousButton, eraserButton];

const getCurrentColor = () => {
    let currentButton = ''
    buttonArray.forEach(button => {
        if (button.classList.contains('active')) {
            currentButton = button.innerText;
        }
    })
    switch (currentButton) {
        case 'Color Selector':
            return colorSelectorCircle.value
            break;
        case 'Ludicrous Mode':
            return `rgb(${randomRGB()},${randomRGB()},${randomRGB()})`
            break;
        case 'Eraser':
            return 'rgb(255, 255, 255)'
            break;
    }
}


const buttonClick = e => {
    if (e.target.id === 'color-selector') return
    buttonArray.forEach(button => {
        button.classList.remove('active');
    })
    e.target.classList.add('active')
}

//Adding Event Listeners to buttons
buttonArray.forEach(button => {
    button.addEventListener('click', buttonClick)
})

//Identify box that will hold squares
const boxContainer = document.getElementById("squares-container1");
const gridContainer = document.createElement('div');
gridContainer.className = 'grid-container';


const defaultSize = 10;
let currentSize = 10;

let deleteCells = () => {
    while(gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.lastChild)
    }
}

let createGrid = () => {
    deleteCells();
    for (let i =1; i<= (currentSize**2); i++){
        var cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = i;
        cell.style.backgroundColor = 'white'
        gridContainer.append(cell);
    }
    gridContainer.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;


    // let addBackground = () => {
    //     cell.style.background = `rgb(${randomRGB()},${randomRGB()},${randomRGB()})`
    // }
    //Gives each cell a hover over eventListener to change background color
    const cells = document.querySelectorAll('div.cell');
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', () => {
            cell.style.background = getCurrentColor()});
    });
document.body.style.backgroundColor = `rgb(${randomRGB()},${randomRGB()},${randomRGB()})`;
}

//Random RGB color - number value
let randomRGB = () => Math.floor((Math.random()*257));

//Append grid container to the box container already in the HTML
boxContainer.append(gridContainer);

//Creating reset button and its container
const button = document.createElement('button');
button.classList.add('reset-button');
button.textContent = 'Resize Grid';
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');

buttonContainer.append(button);

const mainDiv = document.querySelector('.main'); //adding button to DIV
mainDiv.prepend(buttonContainer);


button.addEventListener('click', () => {
    let choice = window.prompt('How many squares per side?', 'Value must be < 100');
    if (!isNaN(choice) && choice != 0 && choice < 100){
        currentSize = Math.abs(choice);
        createGrid();
    } else {
        alert('Please input a number between 1 and 100')
    }
});
createGrid(); //initial grid creation. Default size used

// document.addEventListener('click', function(e) {
//     e = e || window.event;
//     console.log(e.target);   
// }, false);
//touch events for mobile
gridContainer.addEventListener('touchmove', function(e) {
    e.preventDefault();
    let cellLocation = e.changedTouches[0];
    let cellTarget = document.elementFromPoint(cellLocation.clientX, cellLocation.clientY);
    if (cellTarget.classList.contains('cell')) cellTarget.style.background = getCurrentColor()
});

//clearButton
clearButton.addEventListener('click', createGrid)