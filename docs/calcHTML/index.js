/*
Comentarios sao feitos assim no javascript, abrindo e fechando com /* e * /, respectivamente
*/
// Comentarios de uma linha sao feitos assim

/* definicao de variavel no js eh com let ou var, mas let eh mais novo/melhor aparentemente - meu pai */

/* pra mudar oq tem dentro de um div, tem q chamar o div pelo id e mudar alguma coisa dele */


/* array do polinomio */
let inputArray = [];

/* grau do polinomio */
let grau = 0;

/* aqui esconde tudo fofo pq q a vida eh assim dificil */
divVisible("botao-funcao", false); // esconde o botao de funcao por default
divVisible("preview-funcao-div", false); // esconde o preview da funcao por default
divVisible("preview-raizes-div", false); // esconde o preview das raizes por default
divVisible("grau-preview-div", false); // esconde o preview do grau por default
divVisible("botao-reset", false); // esconde o botao de reset por default

/* esqueca tudo */
function reset() {
    inputArray = []; // limpa o array
    grau = 0; // limpa o grau
    divVisible("botao-funcao", false); // esconde o botao de funcao
    divVisible("preview-funcao-div", false); // esconde o preview da funcao
    divVisible("preview-raizes-div", false); // esconde o preview das raizes
    divVisible("grau-preview-div", false); // esconde o preview do grau
    divVisible("botao-reset", false); // esconde o botao de reset
    document.getElementById("preview-funcao").innerHTML = ""; // limpa o preview da funcao
    document.getElementById("preview-raizes").innerHTML = ""; // limpa o preview das raizes
    document.getElementById("my-input").value = ""; // limpa o input
    document.getElementById("grau-input").value = ""; // limpa o input de grau
    divVisible("botao-grau", true); // mostra o botao de grau
    document.getElementById("my-paragraph").innerText = "Explicando pra quem eh burro: bota grau, bota coeficientes um por um, sucesso"; // reseta o texto do paragrafo
}

/* controla a visibilidade do div chamado como argumento
value = visibilidade (true === visivel, false === invisivel) */
function divVisible(div, value) {
    let x = document.getElementById(div); // pega o elemento pelo id
    if (value === true) { // se o valor for true
        x.style.display = "block"; // mostra o elemento
    } else { // se o valor for false
        x.style.display = "none"; // esconde o elemento
    }
}

/* Funcao chamada qdo aperta no botao super fofo de grau */
function defGrau() {
    /* pega o elemento de preview do grau */
    let grauPreview = document.getElementById("grau-preview-div");

    document.getElementById("my-paragraph").innerText = "Grau valido!" // mostra um alerta q o grau eh valido

    // checa se o input de grau eh um numero, maior do que zero
    if (isNaN(document.getElementById("grau-input").value) || document.getElementById("grau-input").value <= 0) {
        document.getElementById("my-paragraph").innerText = "Grau invalido!"; // mostra um alerta
        reset(); // reseta tudo
        return; // sai da funcao
    }
    /* controla a visibildade do preview de grau */
    if (document.getElementById("grau-preview-div").style.display === "none") { // se o preview estiver escondido
        divVisible("grau-preview-div", true); // mostra o preview
    }

    /* pega o valor do input de grau */
    grau = document.getElementById("grau-input").value;
    
    /* exibe o grau no console */
    console.log("Grau:" + grau);

    /* esconde o botao de grau e mostra o de funcao */
    divVisible("botao-funcao", true);
    divVisible("botao-grau", false);

    /* preview do grau na tela */
    grauPreview.innerText = "Grau: " + grau;
}

/* Funcao chamada qdo aperta no botao super fofo de funcao */
function inputFunc() {
    let inputText = document.getElementById("my-input").value; // pega o valor do input

    inputArray.push(Number(inputText)); // adiciona o valor do input no array

    document.getElementById("my-input").value = ""; // limpa o input

    console.log("Input aceito: " + inputText); // mostra o input atual no console

    /* controla a visibildade do preview de funcao */
    if (document.getElementById("preview-funcao-div").style.display === "none") { // se o preview estiver escondido
        divVisible("preview-funcao-div", true); // mostra o preview
    }   

    if (inputArray.length === Number(grau)+1) { // se o array tiver o tamanho do grau + 1
        calcular(inputArray) // chama a funcao calcular com o array como parametro
    }

    let previewFunc = document.getElementById("preview-funcao"); // pega o elemento de preview da funcao
    previewFunc.innerHTML = inputArray.join(", "); // mostra o array na tela\
}

/* Funcao que lida com o array de coeficiente e 
chama a funcao de achar as raizes, 
jogando tudo na tela lindinho fofinho */
function calcular(inputArray) {
    /* controla a visibildade do preview de raizes */
    if (document.getElementById("preview-raizes-div").style.display === "none") { // se o preview estiver escondido
        divVisible("preview-raizes-div", true); // mostra o preview
    }

    let raizPreview = document.getElementById("preview-raizes"); // pega o elemento de preview das raizes
    console.log("Raizes de", inputArray, "sao:", findRoots(inputArray)) // mostra as raizes no console
    raizPreview.innerHTML = findRoots(inputArray).join(", "); // mostra as raizes na tela
    divVisible("botao-funcao", false); // esconde o botao de funcao
    divVisible("botao-reset", true);  // mostra o botao de reset
}

/* aqui comeca a magia */

// funcao que acha todos os divisores de x
function divisors(x) {
    let divisors = []; // array vazio de divisores (aqui vai encher rlx)
    let abs_x = Math.abs(Number(x)); // pega o modulo de x
    for (let i = 1; i <= abs_x; i++) { // isso daq eh tipo "for i in range(0, len(coefficients))" no python
        if (abs_x % i === 0) { // checa se o modulo de x dividido por i = 0, se sim, eh um divisor
            divisors.push(i); // bota i como divisor
            divisors.push(-i) // se i eh divisor, i negativo tambem ent joga isso no array
        }
    }
return divisors; // retorna os divisores eba
}

// funcao q acha f(x) de um polinomio dado um x
function evaluatePolynomials(coefficients, x) {
    let degree = coefficients.length - 1; // pega o grau do polinomio
    let result = 0; // define o resultado como 0

    for (let i = 0; i < degree+1; i++) { // isso daq eh tipo "for i in range(0, len(coefficients))" no python
        result += coefficients[degree-i] * Math.pow(x, i) // adiciona o valor de f(x) a cada iteracao
    }
return result // retorna o resultado eba2
}

// funcao que acha as raizes (finalmente)
function findRoots(coefficients) {
    let degree = coefficients.length - 1; // pega o grau do polinomio DNV
    let roots = []; // array vazio de raizes (aqui vai encher tmb rlx)

    let p = divisors(Number(coefficients[degree])); // pega os divisores do ultimo termo
    let q = divisors(Number(coefficients[0])); // pega os divisores do primeiro termo

    let pq = []; // array vazio pq (aqui vai encher tmb2 rlx)

    // aqui eh tipo "for i in p" no python, soq mais bonitinho
    p.forEach((i) => {
        q.forEach((j) => { // aqui eh tipo "for j in q" no python, soq ainda mais bonitinho
            if (!pq.includes(i/parseFloat(j))) { // checa se o valor de i/j ja ta no array pq, se nao tiver...
                pq.push(i/parseFloat(j)) // adiciona o valor de i/j no array pq
            }
        });
    });
    
    // aqui eh tipo "for i in pq" no python, soq mais bonitinho ainda ebaaa
    pq.forEach((i) => {
        if (evaluatePolynomials(coefficients, i) === 0) // checa se f(i) = 0, se sim...
            roots.push(i) // adiciona i no array de raizes
    })

return roots // retorna as raizes eba master
}
