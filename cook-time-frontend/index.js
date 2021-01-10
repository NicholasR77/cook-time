fetch('http://localhost:3000/recipes')
.then(function(response) {
    return response.json();
}).then(function(json) {
    console.log(json);
});