URL = 'http://localhost:3000'; 


class Recipe {
    constructor(id, name, description, ingredients, difficulty) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.difficulty = difficulty;
    }

    static async fetchRecipes() {
        const url = `${URL}/recipes`;
        fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
            return Recipe.createRecipes(data['json']);
        });
    }

    static async createRecipes(obj) {
        let recipes = obj['data'];

        for (const [k1, v1] of Object.entries(recipes)) {
            for (const [k2, v2] of Object.entries(v1)) {
                if (k2 == 'attributes') {
                    let newRecipe = new Recipe();
                    for (const [k3, v3] of Object.entries(v2)) {
                        let recipeProperties = Object.getOwnPropertyNames(new Recipe);
                        for (const [k4, v4] of Object.entries(recipeProperties)) {
                            if (k3 == v4) {
                                newRecipe[`${k3}`] = v3;
                            }
                        }
                        
                    }
                    console.log(newRecipe);
                    newRecipe.addRecipesToDom();
                    newRecipe.addDeleteButtonListener();
                    newRecipe.addEditButtonListener();
                    newRecipe.addFormSubmitListener();
                    newRecipe.addViewStepsListener();
                    newRecipe.addNewStepFormToDom();
                    newRecipe.addShowHideStepFormListener();
                    newRecipe.addStepFormSubmitListener();
                }
            }
        }
    }

    static addShowHideRecipeFormListener() {
        const listener = document.getElementById(`new-recipe-btn`);
        const target1 = `#new-recipe-form`;
        
        listener.addEventListener('click', () => {
            toggleHideShow(target1);
        });
    }

    static addRecipeFormSubmit() {
        const form = document.querySelector('#new-recipe-form');
        form.addEventListener('submit', function(){
            Recipe.handleFormSubmit(event, '#new-recipe-form');
         });
    }

    static async handleFormSubmit(event, formNode) { 
        event.preventDefault();

        const form = document.querySelector(formNode);
        const url = form.action;

        try {
            const formData = new FormData(form);
            const responseData = await Recipe.postFormDataAsJson({ url, formData });

            showSuccessMessage();
            clearFormData(formNode);
            toggleHideShow(formNode);
            Recipe.reset();
            console.log({ responseData });
        } catch (error) {
            console.error(error);
        }
    }

    static async postFormDataAsJson({ url, formData }) {
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: formDataJsonString,
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return response.json();
    }

    static reset() {
        let el = document.getElementById('recipe-list');
        el.innerHTML = '';
        Recipe.fetchRecipes();
    }

    async patchRecipe({ url, formData }) {
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);

        const fetchOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: formDataJsonString,
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return response.json();
    }

    async deleteRecipe(element) {
        const id = element.getAttribute('delete-data-id');
        fetch(`${URL}/recipes/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json()) // or res.json()
        .then(res => console.log(res));
    
        document.getElementById(`rec-${id}`).remove();
    }

    async handleEditFormSubmit(event, formNode) {
        console.log(`Tring to submit`);
        console.log(event);
        event.preventDefault();
    
        const form = document.querySelector(formNode);
        const url = form.action;
    
        try {
            const formData = new FormData(form);
            const responseData = await this.patchRecipe({ url, formData });
    
            clearFormData(formNode);
            toggleHideShow(formNode);
            Recipe.reset();
            console.log({ responseData });
        } catch (error) {
            console.error(error);
        }
    }
    
    addRecipesToDom() {
        const recipe =
        `<div class='card'>
            <div class='card-body'>
                <div class='top-right-nav'><button id='recipe-edit-${this.id}' class='btn btn-edit'><img src='imgs/edit.png'/></button><button id='recipe-delete-${this.id}' delete-data-id='${this.id}' class='btn btn-delete'><img src='imgs/delete.png'/></button>
                </div>
                <div id='recipe-non-form-${this.id}' class='card-non-form'>
                    <h5 class='card-title'>${this.name}</h5>
                    <p class='card-text'>Description: ${this.description}</p>
                    <p class='card-text'>Ingredients: ${this.ingredients}</p>
                    <p class='card-text'>Difficulty: ${this.difficulty}</p>
                    <button id='recipe-steps-${this.id}' type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#modal-${this.id}'>Recipe Steps</button>
                </div>
                <form id='recipe-form-${this.id}' class='card-form hide' action='${URL}/recipes/${this.id}' method='PATCH'>
                    <h5 class='card-title'>Name: <input type='text' class='form-control' id='name' name='name' value='${this.name}' required/></h5>
                    <p class='card-text'>Description: <textarea class='form-control' id='recipe-description' name='description'>${this.description}</textarea></p>
                    <p class='card-text'>Ingredients: <textarea type='text' class='form-control' id='recipe-ingredients' name='ingredients'>${this.ingredients}</textarea></p>
                    <p class='card-text'>Difficulty: <input type='text' class='form-control' id='recipe-difficulty' name='difficulty' value='${this.difficulty}'/></p>
                    <button type='submit' class='btn btn-primary'>Update Recipe</button>
                </form>
                <div class='modal fade' id='modal-${this.id}' tabindex='-1' aria-labelledby='modal-${this.id}-label' aria-hidden='true'>
                    <div class='modal-dialog'>
                        <div class='modal-content'>
                        <div class='modal-header'>
                            <h5 class='modal-title' id='modal-${this.id}-label'>${this.name} Steps</h5>
                            <button type='button' id='new-step-${this.id}'  class='btn btn-primary new-step'>New Step</button>
                            <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div id='step-modal-body-${this.id}' class='modal-body'>
                            <div id='steps-container-${this.id}' class="step-container">
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>`;

        let node = document.getElementById('recipe-list');
        let el = document.createElement('div');
        el.classList.add('col-4', 'p-3');
        el.id = `rec-${this.id}`
        el.innerHTML = recipe;
        node.appendChild(el);
    }

    addDeleteButtonListener() {
        const button = document.getElementById(`recipe-delete-${this.id}`);

        button.addEventListener('click', ()=> {
            this.deleteRecipe(button);
        });
    }

    addEditButtonListener() {
        const listener = document.getElementById(`recipe-edit-${this.id}`);
        const target1 = `#recipe-form-${this.id}`;
        const target2 = `#recipe-non-form-${this.id}`;
        
        listener.addEventListener('click', function(){
            toggleHideShow(target1);
            toggleHideShow(target2);
        });
    }

    addFormSubmitListener() {
        const formNode = `#recipe-form-${this.id}`;
        const form = document.querySelector(formNode);
        form.addEventListener('submit', () => {
            this.handleEditFormSubmit(event, formNode);
        });
    }

    addViewStepsListener() {
        const viewStepsButton = document.getElementById(`recipe-steps-${this.id}`);

        viewStepsButton.addEventListener('click', () => {
            Step.reset(this.id)
        });
    }

    addNewStepFormToDom() {
        const form = `
        <form id='step-form-${this.id}' class='card-form hide' action='${URL}/recipes/${this.id}/steps' method='POST' step-data-id='${this.id}'>
            <p class='card-title'>Name: <input type='text' class='form-control' id='name' name='name' required/></h5>
            <p class='card-text'>Description: <textarea class='form-control' id='recipe-description' name='description'></textarea></p>
            <button type='submit' class='btn btn-primary'>Create Step</button>
        </form>`

        let node = document.getElementById(`step-modal-body-${this.id}`);
        let el = document.createElement('div');
        el.id = `step-outer-form-${this.id}`
        el.innerHTML = form;
        node.appendChild(el);
    }

    addShowHideStepFormListener() {
        const listener = document.getElementById(`new-step-${this.id}`);
        const target1 = `#step-form-${this.id}`;
        const target2 = `#steps-container-${this.id}`;
        
        listener.addEventListener('click', () => {
            toggleHideShow(target1);
            toggleHideShow(target2);
        });
    }

    addStepFormSubmitListener() {
        console.log("Trying to submit");
        const formNode = `#step-form-${this.id}`;
        const form = document.querySelector(formNode);

        form.addEventListener('submit', () => {
            Step.handleFormSubmit(event, formNode);
        });
    }
}
class Step {
    constructor(id, name, description, recipeId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.recipeId = recipeId;
    }

    static async fetchSteps(url, recipeId) {
        fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data);
            return Step.createSteps(data['json'], recipeId);
        });
    }

    static async createSteps(obj, recipeId) {
        let steps = obj['data'];

        for (const [k1, v1] of Object.entries(steps)) {
            for (const [k2, v2] of Object.entries(v1)) {
                if (k2 == 'attributes') {
                    let newStep = new Step();
                    newStep['recipeId'] = recipeId;
                    for (const [k3, v3] of Object.entries(v2)) {
                        let stepProperties = Object.getOwnPropertyNames(new Step);
                        for (const [k4, v4] of Object.entries(stepProperties)) {
                            if (k3 == v4) {
                                newStep[`${k3}`] = v3;
                            }
                        }
                        
                    }
                    console.log(newStep);
                    newStep.addStepsToDom();
                    newStep.addDeleteButtonListener();
                }    
            }
        }
    }

    static async handleFormSubmit(event, formNode) { 
        event.preventDefault();

        const form = document.querySelector(formNode);
        const id = form.getAttribute('step-data-id');
        const url = form.action;

        try {
            const formData = new FormData(form);
            const responseData = await Recipe.postFormDataAsJson({ url, formData });

            Step.reset(id);
            clearFormData(formNode);
            console.log({ responseData });
        } catch (error) {
            console.error(error);
        }
    }

    static async postFormDataAsJson({ url, formData }) {
        const plainFormData = Object.fromEntries(formData.entries());
        const formDataJsonString = JSON.stringify(plainFormData);

        const fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: formDataJsonString,
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        return response.json();
    }

    static reset(id) {
        const target1 = `#step-form-${id}`;
        const target2 = `#steps-container-${id}`;
        hideElement(target1);
        showElement(target2);

        let el = document.querySelector(`#steps-container-${id}`);
        el.innerHTML = '';
        Step.fetchSteps(`${URL}/recipes/${id}/steps`, id);
    }

    async deleteStep() {
        const stepId = this.id;
        const recipeId = this.recipeId;

        fetch(`${URL}/recipes/${recipeId}/steps/${stepId}`, {
            method: 'DELETE',
        })
        .then(res => res.json()) // or res.json()
        .then(res => console.log(res));
    
        document.getElementById(`step-non-form-${stepId}`).remove();
    }

    addStepsToDom() {
        const step = `
            <div id="step-menu-${this.id}" class="step-menu"><h3>${this.name}</h3><button id='step-delete-${this.id}' delete-data-id='${this.id}' recipe-data-id='${this.recipeId}' class='btn btn-delete'><img src='imgs/delete.png'/></button></div>
            <p>Description: ${this.description}</p>
            `

        let node = document.getElementById(`steps-container-${this.recipeId}`);
        let el = document.createElement('div');
        el.classList.add('step-non-form');
        el.id = `step-non-form-${this.id}`;
        el.innerHTML = step;
        node.appendChild(el);
    }

    addDeleteButtonListener() {
        const button = document.getElementById(`step-delete-${this.id}`);

        button.addEventListener('click', ()=> {
            this.deleteStep();
        });
    }
 
}

// Utilities
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

function toggleHideShow(domNode) {
    const status = checkForClass(domNode, 'hide');
    if (status == true) {
        showElement(domNode);
    } else {
        hideElement(domNode);
    };
}

function clearFormData(formNode) {
    document.querySelector(formNode).reset();
}

function showSuccessMessage() {
    toggleHideShow('.alert-success');
    setTimeout(function(){ toggleHideShow('.alert-success') }, 2000);
}

async function addShowHideListener(listenerDomNode, targetDomNode) {
    const el = document.querySelector(listenerDomNode);

    el.addEventListener('click', function(){
        toggleHideShow(targetDomNode)
    });
}

function init() {
    Recipe.addShowHideRecipeFormListener();
    Recipe.addRecipeFormSubmit();
    Recipe.fetchRecipes();
};

init();