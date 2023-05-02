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

let funcString = ""; // string da funcao

/* aqui esconde tudo fofo pq q a vida eh dificil assim memo eu quero falar com a ana minha ex nao aguento mais essa porra */
divVisible("botao-funcao", false); // esconde o botao de funcao por default
divVisible("preview-funcao-div", false); // esconde o preview da funcao por default
divVisible("preview-raizes-div", false); // esconde o preview das raizes por default
divVisible("grau-preview-div", false); // esconde o preview do grau por default
divVisible("botao-reset", false); // esconde o botao de reset por default
divVisible("preview-fatorar-div", false); // esconde o preview de fatoracao por default

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
    funcString = ""; // limpa a string da funcao
    divVisible("preview-fatorar-div", false); // esconde o preview de fatoracao
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

    // faz o preview da funcao usando LaTeX
    let previewFunc = document.getElementById("preview-funcao"); // pega o elemento de preview da funcao

    funcString += outputAsString(inputArray[inputArray.length-1]) + " " + outputGrau(grau - (inputArray.length-1)) // mostra o array na tela
    // reescreva a linha de cima mas implementando LaTeX
    console.log(funcString)
    previewFunc.innerHTML = "$$f(x) = " + funcString + "$$"; // mostra o array na tela
    MathJax.typeset(); // faz o LaTeX renderizar



    // let previewFunc = document.getElementById("preview-funcao"); // pega o elemento de preview da funcao
    // previewFunc.innerHTML = inputArray.join(", "); // mostra o array na tela
}

function outputGrau(number) {
    if (number === 1) {
        return "x";
    } 
    else if (number === 0) {
        return "";
    }
    else {
        return "x^"+number.toString();
    }
}

function outputAsString(number) {
    if ((inputArray.length-1) === 0) {
        return "";
    }
    
    if (number < 0) {
        return " - " + Math.abs(Number(number));
    } else {
        return " + " + number.toString();
    }
}


/* Funcao que lida com o array de coeficiente e 
chama a funcao de achar as raizes, 
jogando tudo na tela lindinho fofinho */
function calcular(inputArray) {
    let roots = findRoots(inputArray); // chama a funcao de achar as raizes e guarda o resultado em roots
    
    /* controla a visibildade do preview de raizes */
    if (document.getElementById("preview-raizes-div").style.display === "none") { // se o preview estiver escondido
        divVisible("preview-raizes-div", true); // mostra o preview
    }

    // detecta se nenhuma raiz foi encontrada e fala que nenhuma raiz foi encontrada, talvez porque todas sao complexas
    if (roots.length === 0) {
        document.getElementById("my-paragraph").innerText = "Nenhuma raiz encontrada, talvez porque todas sao complexas";
        // return
    }   
    // deteca se o numero de raizes eh diferente do grau e fala que talvez as raizes sejam complexas ou que tenha alguma raiz dupla
    else if (roots.length !== Number(grau)) {
        roots.push(findRoots(briotRuffini(inputArray, roots)))
        if (roots.length !== Number(grau)) {
            document.getElementById("my-paragraph").innerText = "Talvez algumas raizes sejam complexas";
        }
        else {
            document.getElementById("my-paragraph").innerText = "Todas as raizes sao reais";
        }
    }
    // deteca se o numero de raizes eh igual ao grau e fala que todas as raizes sao reais
    else if (roots.length === Number(grau)) {
        document.getElementById("my-paragraph").innerText = "Todas as raizes sao reais";
    }

    // organiza o array de raizes em ordem crescente usando merge sort
    roots = mergeSort(roots);

    let raizPreview = document.getElementById("preview-raizes"); // pega o elemento de preview das raizes
    console.log("Raizes de", inputArray, "sao:", roots) // mostra as raizes no console
    // loop for q faz o preview das raizes usando LaTeX e dizendo x1, x2, x3, etc
    for (let i = 0; i < roots.length; i++) {
        raizPreview.innerHTML += "$$x_" + (i+1).toString() + " = " + roots[i].toString() + "$$";
    }
    MathJax.typeset(); // faz o LaTeX renderizar

    let fatorarPreview = document.getElementById("preview-fatorar"); // pega o elemento de preview de fatoramento
    fatorarPreview.innerHTML = "$$f(x) = " + fatorar(roots).toString() + "$$"; // faz o preview do fatoramento usando LaTeX
    MathJax.typeset(); // faz o LaTeX renderizar

    divVisible("botao-funcao", false); // esconde o botao de funcao
    divVisible("botao-reset", true);  // mostra o botao de reset

    divVisible("preview-fatorar-div", true); // mostra o preview de fatoramento de fatorar
}

// merge sort
function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }
    let middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

// merge sort p2
function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
        }
    }
    return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
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


// funcao q roda briot ruffini horner com os coefficientes e as raizes, retornando o resto como polinomio/array
function briotRuffini(coefficients, roots) {
    let degree = coefficients.length - 1; // pega o grau do polinomio DNV
    let result = coefficients; // define o resultado como o array de coeficientes

    // aqui eh tipo "for i in roots" no python, soq mais bonitinho ainda ebaaa
    roots.forEach((i) => {
        let temp = []; // array temporario
        temp.push(result[0]); // adiciona o primeiro termo do array de coeficientes no array temporario
        for (let j = 1; j < degree+1; j++) { // isso daq eh tipo "for j in range(0, len(coefficients))" no python
            temp.push(result[j] + temp[j-1]*i); // adiciona o valor de f(x) a cada iteracao
        }
        result = temp; // define o resultado como o array temporario
    })      
    // retorna o resultado sem o ultimo "0"
    return result.slice(0, result.length-roots.length);
}

function fatorar(roots) {
    fatores = ""
    /* roots.forEach((i) => {
        fatores += "(x - " + String(i) + ")"
    }) */
    // checa se a raiz eh positiva ou negativa. se eh negativa, bota um + na frente, se eh positiva, bota um - na frente
    roots.forEach((i) => {
        if (i < 0) {
            fatores += "(x + " + String(Math.abs(Number(i))) + ")"
        } else {
            fatores += "(x - " + String(Math.abs(Number(i))) + ")"
        }
    })
    return fatores
}