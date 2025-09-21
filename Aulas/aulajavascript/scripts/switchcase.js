// Estruturas de Decisão Switch Case
// Switch-Case | Break | Default

let frutas = ["laranja", "banana", "morango", "uva"]
let fruta = frutas[Math.floor(Math.random() * frutas.length)]

switch (fruta){
    case "laranja":
        console.log("Suco de Laranja")
        break

    case "banana":
    case "morango":
        console.log("Vitamina de " + fruta + ".")
        break

    case "maça":
        console.log("Suco de Maçã")
        break

    default:
        console.log("Não sei o que fazer com " + fruta + ".")
    }
