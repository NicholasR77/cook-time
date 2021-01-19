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

function toggleHideShow(domNode) {
    let status = checkForClass(domNode, 'hide');
    if (status == true) {
        showElement(domNode);
    } else {
        hideElement(domNode);
    };
}

async function handleShowHideForm(createButtonNode = '#new-recipe-btn', formNode = '#new-recipe-form') {
    let button = document.querySelector(createButtonNode);
    button.addEventListener('click', function(){
        toggleHideShow(formNode)
    });
}

async function postFormDataAsJson({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
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

async function handleFormSubmit(event) {
	event.preventDefault();

	const form = event.currentTarget;
    const url = form.action;
    
    console.log(form)

	try {
        const formData = new FormData(form); 
		const responseData = await postFormDataAsJson({ url, formData });

		console.log({ responseData });
	} catch (error) {
		console.error(error);
	}
}

function init() {
    handleShowHideForm();

    // Make more DRY later
    const exampleForm = document.querySelector("#new-recipe-form");
    exampleForm.addEventListener("submit", handleFormSubmit);
};

init();