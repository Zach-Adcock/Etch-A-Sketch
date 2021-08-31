
//Identify box that will hold squares
const boxContainer = document.getElementById("squares-container1");
const gridContainer = document.createElement('div');
gridContainer.className = 'grid-container';



let deleteCells = () => {
    while(gridContainer.firstChild){
        gridContainer.removeChild(gridContainer.lastChild)
    }
}

let createGrid = num => {
    console.log(gridContainer);
    deleteCells();
    console.log(gridContainer);

    for (let i =1; i<= (num**2); i++){
        var cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = i;
        gridContainer.append(cell);
    }
    gridContainer.style.gridTemplateRows = `repeat(${num}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${num}, 1fr)`;


    //Random RGB color - number value
    let randomRGB = () => Math.floor((Math.random()*257));

    // let addBackground = () => {
    //     cell.style.background = `rgb(${randomRGB()},${randomRGB()},${randomRGB()})`
    // }
    //Gives each cell a hover over eventListener to change background color
    const cells = document.querySelectorAll('div.cell');
    cells.forEach((cell) => {
        cell.addEventListener('mouseenter', () => {
            cell.style.background = `rgb(${randomRGB()},${randomRGB()},${randomRGB()})`}, {once: true})
});
}


//Append grid container to the box container already in the HTML
boxContainer.append(gridContainer);
createGrid(16);




//Creating reset button and its container
const button = document.createElement('button');
button.classList.add('reset-button');
button.textContent = 'Create New Grid';
const buttonContainer = document.createElement('div');
buttonContainer.classList.add('button-container');

buttonContainer.append(button);
document.body.prepend(buttonContainer)


button.addEventListener('click', () => {
    let choice = window.prompt('How many squares per side?');
    createGrid(choice);
})


