const previous_answer = document.querySelector(".previous-answer");
const current_answer = document.querySelector(".current-answer");
const numbers = document.querySelectorAll(".numbers");
const operations = document.querySelectorAll(".operations");
const functions = document.querySelectorAll(".function");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", function() {
        if (button.classList.contains("numbers")) {
            if (current_answer.classList.contains("equalsTriggered")) {
                previous_answer.textContent = current_answer.textContent;
                current_answer.textContent = "";
                current_answer.classList.remove("equalsTriggered");
            }
            if (button.classList.contains("dot")) {
                if (current_answer.classList.contains("dot-added")) return;
                current_answer.classList.add("dot-added");
            }
            current_answer.textContent += button.textContent;
        } else if(button.classList.contains("operations")) {
            if (current_answer.classList.contains("equalsTriggered")) {
                current_answer.classList.remove("equalsTriggered");
            }
            
            current_answer.classList.remove("dot-added");
            previous_answer.textContent = current_answer.textContent + " " + button.textContent + " ";
            current_answer.textContent = "";
        } else if (button.classList.contains("function")) {
            if (button.classList.contains("delete")) {
                let number_string = current_answer.textContent;
                let last_char = number_string[number_string.length - 1];              
                current_answer.textContent = number_string.slice(0,-1);

                if (last_char == ".") current_answer.classList.remove("dot-added");
                
            } else if (button.classList.contains("clear")) {
                current_answer.textContent = previous_answer.textContent = "";
            }
        } else if (button.classList.contains("equals")) {
            current_answer.classList.add("equalsTriggered");
            let current_number_answer = previous_answer.textContent;
            let regex = /[+-]?\d+(\.\d+)?/g;
            let matches = current_number_answer.match(regex).map(function(v) { return parseFloat(v); });
            let operation = current_number_answer.replace(/\d|\.|\s/g, "");
            
            switch(operation) {
                case "+":
                    current_answer.textContent = parseFloat(matches) + parseFloat(current_answer.textContent);
                    console.log(parseFloat(matches));
                    console.log(parseFloat(current_answer.textContent));
                    break;
                case "x":
                    current_answer.textContent = parseFloat(matches) * parseFloat(current_answer.textContent);
                    break;
                case "-":
                    current_answer.textContent = parseFloat(matches) - parseFloat(current_answer.textContent);
                    break;
                case "/":
                    current_answer.textContent = parseFloat(matches) / parseFloat(current_answer.textContent);
                    break;
            }
        }
    });
})