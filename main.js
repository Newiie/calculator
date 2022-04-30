class Calculator {
    constructor(previousAnswerText, currentAnswerText) {
        this.previousAnswerText = previousAnswerText;
        this.currentAnswerText = currentAnswerText;
        this.clear()
    }

    clear() {
        this.currentAnswer = '';
        this.previousAnswer = '';
        this.operator = undefined;
    }

    delete() {
        this.currentAnswer = this.currentAnswer.toString().slice(0,-1);
    }

    appendNumber(number) {
        //if period is present in currentAnswer then return
        if (number === '.' && this.currentAnswer.includes('.')) return
        this.currentAnswer = this.currentAnswer.toString() + number.toString();
    }

    chooseOperator(operator) {
        //if currentAnswer is equal to Empty String then it exits
        if (this.currentAnswer === '') return;
        
        /*if There is previous answer then when operatorButton is clicked
        computer() will be run*/
        if (this.previousAnswer !== '') {
            this.compute();
        }
        this.operator = operator;
        this.previousAnswer = this.currentAnswer;
        this.currentAnswer = '';
    }

    compute() {
        //variables
        let computation
        const prev = parseFloat(this.previousAnswer);
        const current = parseFloat(this.currentAnswer);

        //if prev and current is NaN then exit
        if (isNaN(prev) || isNaN(current)) return;

        //computes the number
        switch (this.operator) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }

        this.currentAnswer = computation
        this.operator = undefined
        this.previousAnswer = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0});
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }
    updateDisplay() {
        this.currentAnswerText.textContent = this.getDisplayNumber(this.currentAnswer)
        if (this.operator != null) {
            this.previousAnswerText.textContent = `${this.getDisplayNumber(this.previousAnswer)} ${this.operator}`
        } else {
            this.previousAnswerText.textContent = '';
        }
    }
}

//variables
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clearAll');
const equalButton = document.querySelector('[data-equal]');
const previousAnswerText = document.querySelector('[data-previous-answer');
const currentAnswerText = document.querySelector('[data-current-answer]');

//the object
const calculator = new Calculator(previousAnswerText, currentAnswerText);


//event-listener

//updates the currentAnswer when numberButtons are clicked
numberButtons.forEach(number => {
    number.addEventListener('click', () => {
        calculator.appendNumber(number.textContent);
        calculator.updateDisplay();
    })
})

//updates the currentAnswer with the text of the operator
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperator(button.innerText);
        calculator.updateDisplay();
    })
})

//computes the CurrentAnswer
equalButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})














// const buttons = document.querySelectorAll('.b');
// const prompt = document.querySelector('.prompt');
// const answer = document.querySelector('.answer');
// const opButtons = document.querySelectorAll('.op');
// let firstNum, secondNum, temp = "", ctr = 0, sum = 0, op = "";
// let opCheck = false, next = false;

// buttons.forEach(button => button.addEventListener('click', buttonClicked));    
// function buttonClicked(e) {
//     if (e.target.classList.value === 'b CE') {
//         prompt.textContent = "";
//         answer.textContent = "";
//         temp = "";
//         firstNum = 0;
//         secondNum = 0;
//     }
//     else if (e.target.classList.value === 'b op'){
//         //checks op is used
//         if (!opCheck) {
//             ctr++;
//             console.log(`ctr = ${ctr}`);
//             firstNum = parseInt(prompt.textContent);
//             op = e.target.textContent;
//             next = true;
//             opCheck = true;
//             prompt.textContent += e.target.textContent;
//         }
//     }
//     else {
//         if (next) {
//             //stores secondNum
//             temp += e.target.textContent;
//         }
//         //displays the prompt
//         prompt.textContent += e.target.textContent;
//         opCheck = false;
//     }
//     //this will calculate
//     if (ctr == 2) {
//         prompt.textContent = "";
//         secondNum = parseInt(temp);
//         // answer.textContent = secondNum + firstNum;
//         sum = parseInt(firstNum + secondNum);
//         answer.textContent = sum;
//         prompt.textContent = "";
//         ctr = 1;
//     }
// }

// function operate() {
//     sum = firstNum + secondNum;
    
// }
// // opButtons.forEach(op => addEventListener('click', ));