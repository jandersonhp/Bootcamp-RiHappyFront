// Laços de Repetição
//For, while, do-while.


//For (variavel, condição, função)
let pontosDeVida = 0

for(let i = 10; i <= 100 ; i+= 10){
    pontosDeVida ++ 
    console.log("Tomou poção de HP " + i)
}

console.log(pontosDeVida + " Totais")
console.log("------------------------")

//While (só roda se a bater com a condição)

let contador = 0

while(contador < 3){
    contador ++
    console.log("Contador " + contador)
}

console.log("------------")

//Do-While (a condição sempre executa pelo menos uma vez)

let count = 0

do{
    console.log(count)
    count++
} while (count < 3)