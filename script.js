const buttons = document.querySelectorAll('button');
const field = document.querySelector('#field');
const numBtns = document.querySelectorAll('.num');
const opBtns = document.querySelectorAll('.operation');
let numArr = [];
let op;
let numStr = '';
let numBtnPressed = false;
let equalsPressed = false;
let polarityForTotal = false;

    buttons.forEach((button) => {
        button.addEventListener('click', ()=> {
            if(button.classList == 'num') {
                numStr += button.textContent;
                console.log('You clicked number: ' + numStr);
                field.textContent = numStr;
                numBtnPressed = true;
            }
            else if(button.classList == 'operation') {
                if(numBtnPressed == true) {
                    op = button.textContent;
                    console.log('You clicked operation: ' + op, 'and number: ' + numStr);
                    field.textContent = op;
                    numAndOp(numStr, op);
                    numStr = '';
                }
            }
            else if(button.classList == 'equals') {
                equalsPressed = true;
                numAndOp(numStr, op, equalsPressed);
                numStr = null;
            }
            else if(button.classList == 'clear') {
                numStr = '';
                field.textContent = numStr;
                numArr = [];
                numBtnPressed = false;
                console.log('Cleared.')
            }

            else if(button.classList == 'decimal') {
                if(field.textContent.includes('.') !== true) {
                    numStr += '.';
                    field.textContent = equation;
                }
            }
            else if(button.classList == 'polarity') {
                /*let polNum = '-' + numStr;
                console.log('Polairty button. NumStr is: ' + numStr)
                if(field.textContent.includes('-') !== true) {
                field.textContent = polNum
                numStr = String(polNum);
                console.log('Polarity button clicked. The number is now: ' + numStr);
                }
                else {
                    let newNum = polNum.replace(/-/g, '');
                    field.textContent = newNum;
                    numStr = newNum;
                    console.log('Polarity button clicked. Negative number is now positive: ' + numStr);
                }*/
                if(polarityForTotal == false) {
                    let num = Math.sign(Number(numStr));
                console.log('NumStr is ' + numStr + ' and num is ' + num);
                if(num == 1) {
                    let coolNum = (Number(numStr) * num) * -1;
                    field.textContent = coolNum;
                    numStr = String(coolNum);
                    console.log('Polarity flipped! NumStr is now ' + numStr);
                }
                else if(num == -1) {
                    let coolNum = Number(numStr) * num;
                    field.textContent = coolNum;
                    numStr = String(coolNum);
                    console.log('Polarity flipped! NumStr is now ' + numStr);
                }
                }

            }
        })
    });

function polarityAfter(numStr) {
    buttons.forEach((button) => {
        button.addEventListener('click', ()=> {
            if(button.classList == 'polarity') {
                let num = Math.sign(Number(numStr));
    console.log('NumStr is ' + numStr + ' and num is ' + num);
    if(num == 1) {
        let coolNum = (Number(numStr) * num) * -1;
        field.textContent = coolNum;
        numStr = String(coolNum);
        console.log('Polarity flipped! NumStr is now ' + numStr);
    }
    else if(num == -1) {
        let coolNum = Number(numStr) * num;
        field.textContent = coolNum;
        numStr = String(coolNum);
        console.log('Polarity flipped! NumStr is now ' + numStr);
    }
            }
        })
    })
    polarityForTotal = false;
            
        }
            

function numAndOp(numStr, op, equalsPressed) {
    if(op) {
        console.log('numAndOp function. The number is: ' + numStr + ' and the operation is: ' + op + ' The array is: ' + numArr);
        if(numStr != null) {
            numArr.push(Number(numStr));
            operate(numArr, op, equalsPressed, numStr);
            
        }
    }
}

function operate(numArr, op, equalsPressed, numStr) {
    console.log('operate function. The number array is: ' + numArr + ' and the operation is ' + op);
    if(numArr.length > 1 && equalsPressed) {
        switch(op) {
            case "+":
                add(numArr, numStr);
                break;
            case "-":
                subtract(numArr, numStr);
                break;
            case "x":
                multiply(numArr, numStr);
                break;
            case "/":
                divide(numArr, numStr);
                break;
            case 'Pow':
                power(numArr);
                break;
        };
    }
}

function add(numArr, numStr) {
    console.log('ADDING the numbers in this array: ' + numArr)
    const total = numArr.reduce((sum, current) => (sum + current), 0);
    totalNum(total, numStr, numArr);
}

function subtract(numArr, numStr) {
    console.log('ADDING the numbers in this array: ' + numArr)
    const total = numArr.reduce((sum, current) => (sum - current));
    totalNum(total, numStr, numArr);
}
function multiply(numArr, numStr) {
    console.log('ADDING the numbers in this array: ' + numArr)
    const total = numArr.reduce((product, current) => (product * current), 1);
    totalNum(total, numStr, numArr);
}

function divide(nums) {
    console.log('ADDING the numbers in this array: ' + numArr);
    const total = nums.reduce((product, current) =>(product / current));
    totalNum(total, numStr, numArr);
}

function power(nums) {
    console.log('ADDING the numbers in this array: ' + numArr)
    const total = nums.reduce((product, current) => (Math.pow(product, current)));
    totalNum(total, numStr, numArr);
}

function totalNum(total, numStr, numArr) {
    field.textContent = total;
    console.log('The total is: ' + total);
    numStr = total;
    numArr.length = 0;
    numArr.push(total);
    console.log('The numStr is now: ' + numStr);
    polarityForTotal = true;
    polarityAfter(numStr)
}