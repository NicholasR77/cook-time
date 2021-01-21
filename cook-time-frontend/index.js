class Recipe {
    constructor(name, description, ingredients, difficulty) {
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.difficulty = difficulty;
    }
}
class Step extends Recipe {
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

function clearFormData(formNode) {
    document.querySelector(formNode).reset();
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

async function handleFormSubmit(event, formNode) {
	event.preventDefault();

	const form = document.querySelector(formNode);
	const url = form.action;

	try {
		const formData = new FormData(form);
		const responseData = await postFormDataAsJson({ url, formData });

        clearFormData(formNode);
        toggleHideShow(formNode);
        console.log({ responseData });
	} catch (error) {
		console.error(error);
	}
}

async function

async function addFormSubmitListener(formNode) {
    let form = document.querySelector(formNode);
    form.addEventListener('submit', function(){
        handleFormSubmit(event, formNode);
    });
}

async function addShowHideListener(listenerDomNode, targetDomNode) {
    let el = document.querySelector(listenerDomNode);

    el.addEventListener('click', function(){
        toggleHideShow(targetDomNode)
    });
}

function init() {
    addShowHideListener('#new-recipe-btn', '#new-recipe-form');
    addFormSubmitListener('#new-recipe-form');
};

init();