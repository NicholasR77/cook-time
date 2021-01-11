
let test;

fetch('http://localhost:3000/recipes')
.then(function(response) {
    return response.json();
}).then(function(json) {
    test = json;
    console.log(json);
});

fetch('http://localhost:3000/recipes/1')
.then(function(response) {
    return response.json();
}).then(function(json) {
    test = json;
    console.log(json);
});
