const display = document.querySelector("#display");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");

let novoNumero = true;
let operador;
let numeroAnterior;

const atualizarDisplay = (texto) => {
    if(novoNumero){
        display.textContent = texto;
        novoNumero = false;
    }else{
        display.textContent += texto;
    }
};

const inserirNumero = (event) => 
    atualizarDisplay(event.target.textContent);

numeros.forEach(numero => numero.addEventListener("click", inserirNumero));

const selecionaOperador = (event) => {
    novoNumero = true;
    operador = event.target.textContent;
    numeroAnterior = display.textContent.replace(",", ".");
};

operadores.forEach((operador) => 
    operador.addEventListener("click", selecionaOperador)
);

const calcular = () => {
    if(operador !== undefined){
        const numeroAtual = display.textContent.replace(",", ".");
        //calculo utilizando eval
        novoNumero = true;
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado.toString().replace(".", ","));
        operador = undefined;
        //fazer a atualização do display com o resultado
    }
};

const ativarIgual = () => calcular();

document.querySelector("#igual").addEventListener("click", ativarIgual);

const limparDisplay = () => display.textContent = "";

document.querySelector("#limparDisplay").addEventListener("click", limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    novoNumero = true;
    operador = undefined;
    numeroAnterior = undefined;
}

document.querySelector("#limparCalculo").addEventListener("click", limparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);

document.querySelector("#backspace").addEventListener("click", removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
}

document.querySelector("#inverter").addEventListener("click", inverterSinal);

const existeValor = () => display.textContent.length > 0;
const existeDecimal = () => display.textContent.indexOf(",") !== -1;

const inserirDecimal = () => {
    if (!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(",");
        }else{
            atualizarDisplay("0,");
    }
}
}

document.querySelector("#decimal").addEventListener("click", inserirDecimal);

