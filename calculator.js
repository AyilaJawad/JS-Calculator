




// select elements
const input_element = document.querySelector('.input');
const output_operation_element = document.querySelector('.operation .value');
const output_result_element = document.querySelector('.result .value');

// saome variables to be used
const OPERATION = ["+", "-", "*", "/"];
const POWER = "POWER(", FACTORIAL = "FACTORIAL";

let data = {
    operation: [],
    formula: []
}

let history = [];

// CALCULATOR BUTTONS
let calculator_buttons = [
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "square",
        symbol : "x²",
        formula : POWER,
        type : "math_function"
    },
    {
        name : "power",
        symbol : "x<span>y</span>",
        formula : POWER,
        type : "math_function"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : "trigo(Math.cos,",
        type : "trigo_function"
    },{
        name : "sin",
        symbol : "sin",
        formula : "trigo(Math.sin,",
        type : "trigo_function"
    },{
        name : "tan",
        symbol : "tan",
        formula : "trigo(Math.tan,",
        type : "trigo_function"
    },
    {
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "exp",
        symbol : "exp",
        formula : "Math.exp",
        type : "math_function"
    },{
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "math_function"
    },{
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "math_function"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },{
        name : "rad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },
    {
        name : "deg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "factorial",
        symbol : "×!",
        formula : FACTORIAL,
        type : "math_function"
    }
];

//creating calculator buttons
function createCalculatorButtons() {
    const btns_per_row = 7;
    let added_btns = 0;

    // Add history button
    input_element.innerHTML = "<button id='history'>History</button>" + input_element.innerHTML;

    calculator_buttons.forEach(button => {
        if (added_btns % btns_per_row === 0) {
            input_element.innerHTML += `<div class='row'></div>`;
        }

        const row = document.querySelector('.row:last-child');
        row.innerHTML += `<button id="${button.name}">
            ${button.symbol}
        </button>`;

        added_btns++;
    });
}

  
createCalculatorButtons();

// radians and degrees
let RADIAN = true;

const rad_btn = document.getElementById('rad');
const deg_btn = document.getElementById('deg');

rad_btn.classList.add("active-angle");

function angleToggler(){
    rad_btn.classList.toggle("active-angle");
    deg_btn.classList.toggle("active-angle");
}

// event listener clicks
input_element.addEventListener("click", event =>{
    const target_btn = event.target;

    if (target_btn.id === "history") {
        showHistory();
    } else {
        calculator_buttons.forEach(button => {
            if (button.name == target_btn.id) calculator(button);
        });
    }
});

// event listeners click + keyboard
// input_element.addEventListener("click", handleButtonClick);
// window.addEventListener("keydown", handleKeyboardInput);

// function handleButtonClick(event) {
//     const targetBtn = event.target;
  
//     calculator_buttons.forEach(button => {
//       if (button.name === targetBtn.id) {
//         calculator(button);
//       }
//     });
// }
  


// calculator
function calculator(button){// console.log(button)
    if(button.type == "operator"){
        data.operation.push (button.symbol);
        data.formula.push (button.formula);
    
    }else if(button.type == "number"){
        data.operation.push (button.symbol);
        data.formula.push (button.formula);
    
    }else if(button.type == "trigo_function"){     
        data.operation.push(button.symbol + "(");
        data.formula.push(button.formula);
    }else if(button.type == "math_function"){// console.log('math');
        let symbol, formula;
        
        // if(button.name == "factorial"){
        //     symbol = "!";
        //     formula = button.formula;

        //     data.operation.push(symbol);
        //     data.formula.push(formula);
        // }
        if (button.name == "factorial") {
            symbol = "!";
            formula = "factorial(";
      
            // Add a closing parenthesis after the number to indicate the end of the factorial sequence
            let previous_index = data.operation.length - 1;
            if (previous_index >= 0 && data.formula[previous_index] !== ")") {
              data.operation.push(")");
              data.formula.push(")");
            }
      
            data.operation.push(symbol);
            data.formula.push(formula);
        }else if (button.name == "power") {
            symbol = "^(";
            formula = button.formula;
            
            data.operation.push(symbol);
            data.formula.push(formula);
        }          
        else if(button.name == "square"){
            symbol = "^(";
            formula = button.formula; 

            data.operation.push(symbol);
            data.formula.push(formula);

            data.operation.push(2);
            data.formula.push(2);
        }else{
            symbol= button.symbol + "(";
            formula = button.formula + "(";
            data.operation.push(symbol);
            data.formula.push(formula);
        }

    }else if(button.type == "key"){ 
        if( button.name == "clear"){
            data.operation = [];
            data.formula = [];

            updateOutputResult(0);
        }else if(button.name == "delete"){
            data.operation.pop();
            data.formula.pop();

        }else if(button.name == "rad"){
            RADIAN = true;
            angleToggler();
        }else if(button.name == "deg"){
            RADIAN = false;
            angleToggler();
        }
    } 
    else if(button.type == "calculate"){
        formula_str = data.formula.join('');
        
        //fixing power and factorial issues
        // searches the power
        let power_search_result = search(data.formula, POWER);
        let factorial_search_result = search(data.formula, FACTORIAL);
        // console.log(data.formula, power_search_result, factorial_search_result);
        // getting base for power function // and replacing it with the right formula
        const bases = powerBaseGetter (data.formula, power_search_result);
        bases.forEach((base) => {
            let toReplace = base + POWER;
            let replacement = "Math.pow(" + base + ",";
          
            formula_str = formula_str.replace(toReplace, replacement);
          });
        // console.log(bases);
        //getting bases for factorial as well
        const NUMBERS = factorialNumberGetter(data.formula, factorial_search_result);
        // console.log(NUMBERS);
        NUMBERS.forEach((factorial) => {
        formula_str = formula_str.replace(factorial.toReplace, factorial.replacement);
        });

        // Replace any remaining factorial symbols with the factorial function
        formula_str = formula_str.replace(new RegExp(FACTORIAL, "g"), "factorial(");

        // console.log(formula_str)
        //calculate 
        let result;
        try {
            result = eval(formula_str);
            history.push({ expression: formula_str, result: result }); // Store expression and result in history
        } catch (error) {
            if (error instanceof SyntaxError) {
                result = "Syntax Error!";
                updateOutputResult(result);
                return;
            }
        }

        // saving result for later use
        ans = result;
        data.operation = [result];
        data.formula = [result];

        updateOutputResult(result);
        return; 
    }

    updateOutputOperation( data.operation.join (''));
}

//function to handle history button click
function handleHistoryClick(expression, result, index) {
    // Set the clicked expression as the input value
    input_element.textContent = expression;

    // Clear the data object and update the output operation
    data.operation = [result];
    data.formula = [result];
    updateOutputOperation(result);

    // Re-create the calculator buttons
    createCalculatorButtons();

    // Remove the clicked history item from the history array
    history.splice(index, 1);
}


function deleteHistoryItem(index) {
    history.splice(index, 1);
    showHistory();
}

function showHistory() {
    // Check if the history container already exists
    const historyContainer = document.querySelector('.history-container');
  
    if (historyContainer) {
        // Clear the existing content of the history container
        historyContainer.innerHTML = '';
    } else {
        // Create a new history container
        const historyContainer = document.createElement('div');
        historyContainer.classList.add('history-container');
        document.body.appendChild(historyContainer);
    }
  
    // Iterate over the history array and create HTML elements to display each history item
    history.forEach((item, index) => {
        // Create a button for each history item
        const historyButton = document.createElement('button');
        historyButton.classList.add('history-item');
        historyButton.textContent = item.expression + " = " + item.result;
    
        // Add an event listener to each button to handle the click event
        historyButton.addEventListener('click', () => {
            handleHistoryClick(item.expression, item.result, index);
        });
    
        // Create a delete button for each history item
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Delete';
    
        // Add an event listener to the delete button to handle the click event
        deleteButton.addEventListener('click', () => {
            deleteHistoryItem(index);
        });
    
        // Create a container for the history item and append the buttons
        const historyItemContainer = document.createElement('div');
        historyItemContainer.classList.add('history-item-container');
        historyItemContainer.appendChild(historyButton);
        historyItemContainer.appendChild(deleteButton);
    
        // Append the history item container to the history container
        historyContainer.appendChild(historyItemContainer);
    });
}


// function showHistory() {
//     // Create a container to display the history
//     const historyContainer = document.createElement('div');
//     historyContainer.classList.add('history-container');

//     // Iterate over the history array and create HTML elements to display each history item
//     history.forEach((item, index) => {
//         // Create a button for each history item
//         const historyButton = document.createElement('button');
//         historyButton.classList.add('history-item');
//         historyButton.textContent = item.expression + " = " + item.result;

//         // Add an event listener to each button to handle the click event
//         historyButton.addEventListener('click', () => {
//             handleHistoryClick(item.expression, item.result, index);
//         });

//         // Create a delete button for each history item
//         const deleteButton = document.createElement('button');
//         deleteButton.classList.add('delete-button');
//         deleteButton.textContent = 'Delete';

//         // Add an event listener to the delete button to handle the click event
//         deleteButton.addEventListener('click', () => {
//             deleteHistoryItem(index);
//         });

//         // Create a container for the history item and append the buttons
//         const historyItemContainer = document.createElement('div');
//         historyItemContainer.classList.add('history-item-container');
//         historyItemContainer.appendChild(historyButton);
//         historyItemContainer.appendChild(deleteButton);

//         // Append the history item container to the history container
//         historyContainer.appendChild(historyItemContainer);
//     });

//     // Display the history container by appending it to the body
//     document.body.appendChild(historyContainer);
// }


// Add an event listener to the delete button to handle the click event
// deleteButton.addEventListener('click', () => {
//     deleteHistoryItem(index);
// });


//factorial number getter
// factorial number getter

function factorialNumberGetter(formula, factorial_search_result) {
    let numbers = [];
    let factorial_sequence = 0;
  
    factorial_search_result.forEach((factorial_index) => {
      let number = [];
  
      let next_index = factorial_index + 1;
      let next_input = formula[next_index];
  
      if (next_input == FACTORIAL) {
        factorial_sequence += 1;
        return;
      }
  
      // if a factorial sequence found then
      // we need to get the index of the very 1st factorial func
      let first_factorial_index = factorial_index - factorial_sequence;
  
      // then get the # right before it
      let previous_index = first_factorial_index - 1;
      let parenthesis_count = 0;
  
      while (previous_index >= 0) {
        if (formula[previous_index] === ")") parenthesis_count++;
        if (formula[previous_index] === "(") {
          parenthesis_count--;
          if (parenthesis_count === 0) break;
        }
  
        number.unshift(formula[previous_index]);
        previous_index--;
      }
  
      let number_str = number.join("");
      const factorial = "factorial(",
        close_parenthesis = ")";
      let times = factorial_sequence + 1;
  
      let toReplace = number_str + FACTORIAL.repeat(times);
      let replacement = factorial.repeat(times) + number_str + close_parenthesis.repeat(times);
  
      numbers.push({
        toReplace: toReplace,
        replacement: replacement,
      });
  
      // return the numbers but before reset the factorial_seq
      factorial_sequence = 0;
    });
  
    return numbers;
  }
  
// function factorialNumberGetter(formula, factorial_search_result){
//     let numbers = [];
//     let factorial_sequence = 0;

//     factorial_search_result.forEach( factorial_index => {
//         let number = [];

//         let next_index = factorial_index +1;
//         let next_input = formula[next_index];

//         if (next_index == FACTORIAL){
//             factorial_sequence += 1;
//             return
//         }

//         //if a factorial sequence found then
//         // we need to get the index of the very 1st factorial func
//         let first_factorial_index = factorial_index - factorial_sequence;

//         //then get the # right before it
//         let previous_index = first_factorial_index - 1;
//         let parenthesis_count = 0;

//         while (previous_index >= 0) {
//             if (formula[previous_index] === ")") parenthesis_count++;
//             if (formula[previous_index] === "(") {
//               parenthesis_count--;
//               if (parenthesis_count === 0) break;
//             }
      
//             number.unshift(formula[previous_index]);
//             previous_index--;
//         }

//         let number_str = number.join('');
//         const factorial = "factorial(", close_parenthesis = ")"
//         let times = factorial_sequence +1;

//         let toReplace = number_str + FACTORIAL.repeat(times);
//         let replacement = factorial.repeat(times) + number_str + close_parenthesis.repeat(times);

//         numbers.push({
//             toReplace : toReplace,
//             replacement : replacement
//         })
        
//         //return the numbers but before rest the factorial_seq
//         factorial_sequence = 0;
//     })
//     return numbers;
// }

// power base getter
function powerBaseGetter(formula, power_search_result) {
    let power_bases = [];
  
    power_search_result.forEach((power_index) => {
      let base = [];
      let parenthesis_count = 0;
      let previous_index = power_index - 1;
  
      while (previous_index >= 0) {
        if (formula[previous_index] === ")") parenthesis_count++;
        if (formula[previous_index] === "(") {
          parenthesis_count--;
          if (parenthesis_count === 0) break;
        }
  
        base.unshift(formula[previous_index]);
        previous_index--;
      }
  
      power_bases.push(base.join(""));
    });
  
    return power_bases;
}
  

//seacrch an array
function search(array, keyword){
    let seacrch_result = [];

    array.forEach((element, index) => {
        if (element == keyword) seacrch_result.push(index);
    })
    return seacrch_result;
}
//updating the output
function updateOutputOperation(operation){
    output_operation_element.innerHTML = operation;
}
function updateOutputResult(result){
    output_result_element.innerHTML = result; 
}

function updateOutputResult(result) {
    const fixedResult = parseFloat(result.toFixed(4)); //this will fix our output result to 4 decimal place.
    output_result_element.innerHTML = fixedResult;   // Update the output element with the fixed result
}
  
// //factorial function
// function factorial(number){
//     if(number % 1 !=0) return gamma(number+1);

//     if (number ===0 || number===1 ) return 1;

//     let result =1;
//     for (let i=1; i<= number; i++){
//         result = result *i;
//         if(result ===Infinity) return Infinity
//     }
//     return result
// }

// // GAMMA FUNCTINON
// function gamma(n) {  // accurate to about 15 decimal places
//     //some magic constants 
//     var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
//         p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
//     if(n < 0.5) {
//       return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
//     }
//     else {
//       n--;
//       var x = p[0];
//       for(var i = 1; i < g + 2; i++) {
//         x += p[i] / (n + i);
//       }
//       var t = n + g + 0.5;
//       return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
//     }
// }

//trignometric functions
function trigo(callback, angle){
    if(!RADIAN){
        angle = angle * Math.PI/180;
    }
    return callback(angle);
}
function inv_trigo(callback, value){ //Inverse trignometric functions
    let angle = callback(value);

    if(!RADIAN){
        angle = angle * Math.PI/180;
    }
    return angle;
}