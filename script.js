const display = document.querySelector("#display");
const keys = document.querySelectorAll("[id*=tecla]");
const operators = document.querySelectorAll("[id*=operador]");

let newNumber = true;
let operator;
let previousNumber;


//Atualizar o display
function updateDisplay(numero) {
    if(newNumber) {
        display.textContent = numero;
        newNumber = false;
    }else {
        display.textContent +=numero;
    }
}

//Inserir os números
const insertNumber = (number) => updateDisplay(number);

keys.forEach(function (key) {
    key.addEventListener("click", function(event){
        insertNumber(event.target.textContent);
    });
});

//Selecionar operador
const selectOperator = (event) => {
    previousNumber =  parseFloat(display.textContent.replace(',', '.'));
    operator = event.target.textContent;
    newNumber = true;
}

operators.forEach((key) => key.addEventListener("click", selectOperator));

//Realizar cálculo
const calculate = () => {
        const actualNumber = parseFloat(display.textContent.replace(',', '.'));
        const result = eval(previousNumber + operator + actualNumber);
        newNumber = true;
        updateDisplay(result.toString().replace('.',',')); 
}

//Adicionar o evento na tecla igual
const equal = document.querySelector("#igual");

equal.addEventListener('click', calculate);

//Limpar display
const clearDisplay = () => display.textContent = "";

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

//Limpar cálculo
const clearCalc = () => {
    newNumber = true;
    operator = undefined;
    previousNumber = undefined;
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

//Remover o último número
const removeLastNumber = () => {
    newNumber = true;
    updateDisplay(display.textContent.slice(0, - 1))
} 

document.querySelector("#apagar").addEventListener("click", removeLastNumber);

//Inverter o sinal 
const invertSignal = () => { 
    display.textContent = (-parseFloat(display.textContent.replace(",", ".")))
}

document.querySelector("#inverter").addEventListener("click", invertSignal);

//Inserir o número decimal 
const decimalNumber = () => display.textContent.indexOf(',') !== -1;
const withValue = () => display.textContent.length > 0;
const insertDecimal = () => {
    if (!decimalNumber ()) {
        if (withValue()) {
            updateDisplay(',');
        } else {
            updateDisplay('0,')
        }
    }
}

document.querySelector("#decimal").addEventListener("click", insertDecimal);
