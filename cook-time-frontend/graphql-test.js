fetch('http://localhost:3000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: `
    query {
        fetchRecipes {
            name
            id
        }
    }` 
  }),
})
.then(res => res.json())
.then(res => console.log(res.data));

console.log('cool');