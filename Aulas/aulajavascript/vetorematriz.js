// Vetores
let pokemon = ["Pikachu",
    "Charmander",
    "Bulbassaur"]

pokemon.pop() //remove o último elemento do vetor
pokemon.shift() //remove o primeiro elemento do vetor

console.log(pokemon)
/* Imprime: 
[ 'Charmander' ]
*/

// Matrizes
let timePokemon = [
    ["Pikachu", "M", 1],
    ["Charmander", "F", 3]];

console.log("Pokemon: " + timePokemon[1][0] + 
    "\nGênero: " + timePokemon[1][1] +
    "\nNv." + timePokemon[1][2]);

/* Imprime: 
Pokemon: Charmander
Gênero: F
Nv.3
*/