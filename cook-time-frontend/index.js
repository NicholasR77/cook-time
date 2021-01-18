class Recipe {
    constructor(name, description, ingredients, difficulty) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.difficulty = difficulty;
    }
}

class Step {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

function hideElement(domNode) {
    const element = document.querySelector(domNode);
    element.classList.remove('show');
    element.classList.add('hide')
}

function showElement(domNode) {
    const element = document.querySelector(domNode);
    element.classList.remove('hide');
    element.classList.add('show')
}

function checkForClass(domNode, className) {
    const element = document.querySelector(domNode);
    let status = false;
    element.classList.forEach(
        function(value) {
            if (value === className) {
                status = true;
            }
        }
    )
    return status;
}

function attachEvents() {

}

function init() {
    
}

init();