
let test;

fetch('http://localhost:3000/recipes/1')
.then(function(response) {
    return response.json();
}).then(function(json) {
    test = json;
    console.log(json);
});

fetch('http://localhost:3000/recipes/1/steps/1')
.then(function(response) {
    return response.json();
}).then(function(json) {
    console.log('Recipe steps test')
    test = json;
    console.log(json);
});
