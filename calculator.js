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
let variables = {}; // Object to store variables
let currentVariable = null; 

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
        
    },
    {
        name: "calculate",
        symbol: "=",
        formula: "ANS",
        type: "calculate"
        },
    {
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
    },  {
        name: "add-var",
        symbol: "+Var",
        formula: false,
        type: "key",
      },  {
        name: "variable",
        symbol: "Var",
        formula: false,
        type: "variable",
      },
    //   {
    //     name: "variables",
    //     symbol: "Variables",
    //     formula: false,
    //     type: "key",
    //   },
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

    if (button.type === "variable") {
      const variableButton = document.getElementById(button.name);
      variableButton.addEventListener("click", () => {
        handleVariableClick(button.symbol);
      });
    }
  });
}
createCalculatorButtons();

// calculator
// function calculator(button){// console.log(button)
//     if(button.type == "operator"){
//         data.operation.push (button.symbol);
//         data.formula.push (button.formula);

//     }else if(button.type == "number"){
//         data.operation.push (button.symbol);
//         data.formula.push (button.formula);

//         updateOutputOperation(data.operation.join(""));

//     }else if(button.type == "trigo_function"){     
//         data.operation.push(button.symbol + "(");
//         data.formula.push(button.formula);
//     }else if(button.type == "math_function"){// console.log('math');
//         let symbol, formula;

//         if (button.name == "factorial") {
//             symbol = "!";
//             formula = "factorial(";

//             // Add a closing parenthesis after the number to indicate the end of the factorial sequence
//             let previous_index = data.operation.length - 1;
//             if (previous_index >= 0 && data.formula[previous_index] !== ")") {
//               data.operation.push(")");
//               data.formula.push(")");
//             }

//             data.operation.push(symbol);
//             data.formula.push(formula);
//         }else if (button.name == "power") {
//             symbol = "^(";
//             formula = button.formula;

//             data.operation.push(symbol);
//             data.formula.push(formula);
//         }          
//         else if(button.name == "square"){
//             symbol = "^(";
//             formula = button.formula; 

//             data.operation.push(symbol);
//             data.formula.push(formula);

//             data.operation.push(2);
//             data.formula.push(2);
//         }else{
//             symbol= button.symbol + "(";
//             formula = button.formula + "(";
//             data.operation.push(symbol);
//             data.formula.push(formula);
//         }

//     }else if(button.type == "key"){ 
//         if( button.name == "clear"){
//             data.operation = [];
//             data.formula = [];

//             updateOutputResult(0);
//         }else if(button.name == "delete"){
//             data.operation.pop();
//             data.formula.pop();

//         }else if(button.name == "rad"){
//             RADIAN = true;
//             angleToggler();
//         }else if(button.name == "deg"){
//             RADIAN = false;
//             angleToggler();
//         }
//     }else if(button.type == "calculate"){
//         formula_str = data.formula.join('');

//         //fixing power issues
//         // searches the power
//         let power_search_result = search(data.formula, POWER);
//         // console.log(data.formula, power_search_result, factorial_search_result);
//         // getting base for power function // and replacing it with the right formula
//         const bases = powerBaseGetter (data.formula, power_search_result);
//         bases.forEach((base) => {
//             let toReplace = base + POWER;
//             let replacement = "Math.pow(" + base + ",";

//             formula_str = formula_str.replace(toReplace, replacement);
//           });
//         // console.log(bases);
        
//         console.log(formula_str)
//        //calculate 
//         let result;
//         try {
//             result = eval(formula_str);
//             history.push({ expression: formula_str, result: result }); // Store expression and result in history
//         } catch (error) {
//             if (error instanceof SyntaxError) {
//                 result = "Syntax Error!";
//                 updateOutputResult(result);
//                 return;
//             }
//         }

//         // saving result for later use
//         ans = result;
//         data.operation = [result];
//         data.formula = [result];

//         updateOutputResult(result);
//         return; 
//     }else if (button.type == "variable") {
//         const variableValue = button.symbol;
    
//         // Store the variable value in the currentVariable
//         currentVariable = variableValue;
    
//         // Update the output result with the variable value
//         updateOutputResult(variableValue);
//     }
    

//     updateOutputOperation( data.operation.join (''));
// }
// function calculator(button) {
//   if (button.type === "operator") {
//     data.operation.push(button.symbol);
//     data.formula.push(button.formula);
//   } else if (button.type === "number") {
//     data.operation.push(button.symbol);
//     data.formula.push(button.formula);
//     updateOutputOperation(data.operation.join(""));
//   } else if (button.type === "trigo_function") {
//     data.operation.push(button.symbol + "(");
//     data.formula.push(button.formula);
//   } else if (button.type === "math_function") {
//     let symbol, formula;

//     if (button.name === "factorial") {
//       symbol = "!";
//       formula = "factorial(";

//       // Add a closing parenthesis after the number to indicate the end of the factorial sequence
//       let previous_index = data.operation.length - 1;
//       if (previous_index >= 0 && data.formula[previous_index] !== ")") {
//         data.operation.push(")");
//         data.formula.push(")");
//       }

//       data.operation.push(symbol);
//       data.formula.push(formula);
//     } else if (button.name === "power") {
//       symbol = "^(";
//       formula = button.formula;

//       data.operation.push(symbol);
//       data.formula.push(formula);
//     } else if (button.name === "square") {
//       symbol = "^(";
//       formula = button.formula;

//       data.operation.push(symbol);
//       data.formula.push(formula);

//       data.operation.push(2);
//       data.formula.push(2);
//     } else {
//       symbol = button.symbol + "(";
//       formula = button.formula + "(";
//       data.operation.push(symbol);
//       data.formula.push(formula);
//     }
//   } else if (button.type === "key") {
//     if (button.name === "clear") {
//       data.operation = [];
//       data.formula = [];

//       updateOutputResult(0);
//     } else if (button.name === "delete") {
//       data.operation.pop();
//       data.formula.pop();
//     } else if (button.name === "rad") {
//       RADIAN = true;
//       angleToggler();
//     } else if (button.name === "deg") {
//       RADIAN = false;
//       angleToggler();
//     } else if (button.name === "add-var") {
//       addVariable();
//     }
//   } else if (button.type === "calculate") {
//     formula_str = data.formula.join("");

//     // Fix power issues
//     let power_search_result = search(data.formula, POWER);
//     const bases = powerBaseGetter(data.formula, power_search_result);
//     bases.forEach((base) => {
//       let toReplace = base + POWER;
//       let replacement = "Math.pow(" + base + ",";

//       formula_str = formula_str.replace(toReplace, replacement);
//     });

//     let result;
//     try {
//       if (formula_str === "ANS") {
//         result = ans;
//       } else {
//         result = eval(formula_str);
//         history.push({ expression: formula_str, result: result });
//       }
//     } catch (error) {
//       if (error instanceof SyntaxError) {
//         result = "Syntax Error!";
//         updateOutputResult(result);
//         return;
//       }
//     }
  
//     ans = result;
//     data.operation = [result];
//     data.formula = [result];
  
//     updateOutputResult(result);
//     return;
//   } else if (button.type === "variable") {
//       const variableSymbol = button.symbol;
//       const variableValue = variables[variableSymbol];
  
//       if (variableValue !== undefined) {
//         data.operation.push(variableSymbol);
//         data.formula.push(variableValue);
//         updateOutputOperation(data.operation.join(""));
//       }
//     }

//   updateOutputOperation(data.operation.join(""));
// }
  
// event listener clicks

function calculator(button) {
  if (button.type === "operator") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type === "number") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
    updateOutputOperation(data.operation.join(""));
  } else if (button.type === "trigo_function") {
    data.operation.push(button.symbol + "(");
    data.formula.push(button.formula);
  } else if (button.type === "math_function") {
    let symbol, formula;

    if (button.name === "factorial") {
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
    } else if (button.name === "power") {
      symbol = "^(";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name === "square") {
      symbol = "^(";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula);

      data.operation.push(2);
      data.formula.push(2);
    } else {
      symbol = button.symbol + "(";
      formula = button.formula + "(";
      data.operation.push(symbol);
      data.formula.push(formula);
    }
  } else if (button.type === "key") {
    if (button.name === "clear") {
      data.operation = [];
      data.formula = [];

      updateOutputResult(0);
    } else if (button.name === "delete") {
      data.operation.pop();
      data.formula.pop();
    } else if (button.name === "rad") {
      RADIAN = true;
      angleToggler();
    } else if (button.name === "deg") {
      RADIAN = false;
      angleToggler();
    } else if (button.name === "add-var") {
      addVariable();
    }
  } else if (button.type === "calculate") {
    formula_str = data.formula.join("");

    // Fix power issues
    let power_search_result = search(data.formula, POWER);
    const bases = powerBaseGetter(data.formula, power_search_result);
    bases.forEach((base) => {
      let toReplace = base + POWER;
      let replacement = "Math.pow(" + base + ",";

      formula_str = formula_str.replace(toReplace, replacement);
    });

    let result;
    try {
      if (formula_str === "ANS") {
        result = ans;
      } else {
        result = eval(formula_str);
        history.push({ expression: formula_str, result: result });
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        result = "Syntax Error!";
        updateOutputResult(result);
        return;
      }
    }

    ans = result;
    data.operation = [result];
    data.formula = [result];

    updateOutputResult(result);
    return;
  } else if (button.type === "variable") {
    const variableSymbol = button.symbol;
    const variableValue = variables[variableSymbol];

    if (variableValue !== undefined) {
      // Append the variable value to the output operation element
     // output_operation_element.innerHTML += variableValue;

      // Add the variable value to the data object
      data.operation.push(variableValue);
      data.formula.push(variableValue);
    }
  }
  updateOutputOperation();
  // updateOutputOperation(data.operation.join(""));
}


input_element.addEventListener("click", event => {
  const target_btn = event.target;

  if (target_btn.id === "history") {
    showHistory();
  } else if (target_btn.id === "add-var") {
    addVariable();
  } else if (target_btn.id === "variables") {
    showVariables();
  } else {
    const button = calculator_buttons.find(btn => btn.name === target_btn.id);
    if (button) {
      calculator(button);
    } else if (target_btn.classList.contains("variable-value")) {
      handleVariableClick(target_btn.textContent);
    }
  }
});
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

// Function to handle the "Add Var" button click
// function addVariable() {
//     const variableName = prompt("Enter variable name and value (e.g., x=5):");
  
//     if (variableName) {
//       const [name, value] = variableName.split("=");
  
//       if (name && value && !isNaN(value) && !OPERATION.includes(name)) {
//         const trimmedName = name.trim();
        
//         // Check if the variable name is already used
//         if (trimmedName in variables) {
//           alert("Variable name already taken!");
//         } else {
//           variables[trimmedName] = parseFloat(value.trim());
//           showVariables();
//         }
//       }
//     }
//   }

function addVariable() {
  const variableName = prompt("Enter variable name and value (e.g., x=5):");

  if (variableName) {
    const [name, value] = variableName.split("=");

    if (name && value && !isNaN(value) && !OPERATION.includes(name)) {
      const trimmedName = name.trim();

      // Check if the variable name is already taken
      if (trimmedName in variables) {
        alert("Variable name already taken!");
      } else {
        variables[trimmedName] = parseFloat(value.trim());
        showVariables();

        // Find the "Variable" button object
        const variableButton = calculator_buttons.find(btn => btn.name === "variable");

        // Call the calculator function with the "Variable" button object
        calculator(variableButton);
      }
    }
  }
}

// Function to handle the "Variables" button click
function showVariables() {
    let variablesContainer = document.querySelector(".variables-container");

    if (!variablesContainer) {
    // Create a new variables container
    variablesContainer = document.createElement("div");
    variablesContainer.classList.add("variables-container");
    document.body.appendChild(variablesContainer);
    }

    // Clear the existing content of the variables container
    variablesContainer.innerHTML = "";

    // Iterate over the variables object and create HTML elements to display each variable
    for (const variable in variables) {
    const variableValue = variables[variable];

    // Create a container for each variable
    const variableContainer = document.createElement("div");
    variableContainer.classList.add("variable-container");
    variableContainer.innerHTML = `<span class="variable-name">${variable}</span> : <span class="variable-value">${variableValue}</span>`;

    // Add an event listener to each variable container
    variableContainer.addEventListener("click", () => {
        // Retrieve the clicked variable value
        const clickedValue = variableValue;

        // Append the clicked value to the output operation element
        output_operation_element.innerHTML += clickedValue;
    });

    // Append the variable container to the variables container
    variablesContainer.appendChild(variableContainer);
    }
}
// Call the showVariables function with the "editable" parameter set to true
// showVariables(true);
showVariables();
// Function to handle the "Variable" button click
function handleVariableClick(variableSymbol) {
  const variableValue = variables[variableSymbol];
  console.log(variableValue)
  if (variableValue !== undefined) {
    // Append the variable value to the output operation element
    // output_operation_element.innerHTML += variableValue;

    // Add the variable value to the data object
    data.operation.push(variableValue);
    data.formula.push(variableValue);

    updateOutputOperation(data.operation.join(""));
  }
}

//power number getter
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
// function updateOutputOperation(operation){
//     output_operation_element.innerHTML = operation;
// }
function updateOutputOperation() {
  output_operation_element.innerHTML = data.operation.join("");
}
function updateOutputResult(result) {
    if (result === "Syntax Error!") {
      output_result_element.innerHTML = result;
    } else {
      const fixedResult = parseFloat(result.toFixed(4));  //fixing our output result to 4 decimal places
      output_result_element.innerHTML = fixedResult;
    }
  }

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

// radians and degrees
let RADIAN = true;

const rad_btn = document.getElementById('rad');
const deg_btn = document.getElementById('deg');

rad_btn.classList.add("active-angle");

function angleToggler(){
    rad_btn.classList.toggle("active-angle");
    deg_btn.classList.toggle("active-angle");
}