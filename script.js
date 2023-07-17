const result = document.getElementById("result_calculate");
const resultElement = document.getElementById("result_calculate");
const calculateDiv = document.getElementById("calculate_container");

let currentOperator = "";
let firstNumber = "";
let secondNumber = "";
let isComma = false;
let negativeNumber = false;
let checkNegativeType = false;
let checkFloatType = false;
let resultCalculating = "";

//*** Создаём функцию которая принимает и меняет значения операнда,первого и второго параметра при определённых условиях ***//

function setNumber(number) {
  // if (resultElement.scrollWidth > calculateDiv.style.width) {
  //   resultElement.style.fontSize = "40px";
  //   resultElement.style.marginBottom = "20px";
  // }
  if (currentOperator && secondNumber) {
    result.innerHTML += number;
    secondNumber += number;
  } else if (!currentOperator) {
    if (result.innerHTML === "0") {
      firstNumber += number;
      result.innerHTML = number;
    } else {
      firstNumber += number;
      result.innerHTML += number;
    }
  } else {
    secondNumber += number;
    result.innerHTML = number;
  }
}

//*** ***//

function setFloatNumber(symbol) {
  //* FirstNumber *//

  if (firstNumber === "" && isComma === false) {
    firstNumber = "0" + symbol;
    isComma = true;
    result.innerHTML += symbol;
  } else if (firstNumber !== "" && isComma === false) {
    firstNumber += symbol;
    isComma = true;
    result.innerHTML += symbol;
  }

  //*** СurrentOperator and SecondNumber ***//

  if (currentOperator !== "" && checkFloatType === false) {
    isComma = false;
    if (secondNumber !== "" && isComma === false) {
      secondNumber += symbol;
      isComma = true;
      result.innerHTML += symbol;
      checkFloatType = true;
    }
  }
}

//*** Создаём функцию которая принимает операнд в качестве параметра и записывает его в переменную ***//

function setOperator(operator) {
  currentOperator = operator;
  result.innerHTML = currentOperator;
}

//*** Создаём функцию которая принимает оператор и делает калькуляцию первого и второго значения в зависимости от опрератора ***//

function resulting() {
  if (resultElement.scrollWidth > resultElement.style.width) {
    resultElement.style.color = "Lime";
    // resultElement = Number(resultElement);
    // resultElement.substring(0, 6);
    // resultElement = Number(resultElement);
  }
  switch (currentOperator) {
    case "+":
      resultCalculating = +firstNumber + +secondNumber;
      result.innerHTML = +resultCalculating;
      break;
    case "-":
      resultCalculating = +firstNumber - +secondNumber;
      result.innerHTML = +resultCalculating;
      break;
    case "*":
      resultCalculating = +firstNumber * +secondNumber;
      result.innerHTML = +resultCalculating;
      break;
    case "/":
      resultCalculating = +firstNumber / +secondNumber;
      result.innerHTML = +resultCalculating;
      break;
    case "%":
      resultCalculating = (+firstNumber / 100) * +secondNumber;
      result.innerHTML = +resultCalculating;
      break;
  }
}

//*** Создаём функцию которая очищает все переменные с нашими параметрами ***//

function cleaning() {
  resultElement.style.fontSize = "100px";

  result.innerHTML = 0;
  currentOperator = "";
  firstNumber = "";
  secondNumber = "";
  isComma = false;
  negativeNumber = false;
  checkFloatType = false;
  checkNegativeType = false;
  resultCalculating = "";
}

function setSeparatorNumber(separator) {
  // Если первое значение отрицательное а второе значение положительное - Работает! А если наоборот то почему-то не работает :/
  if (firstNumber === "" && negativeNumber === false) {
    firstNumber += "0";
    result.innerHTML = firstNumber;
    negativeNumber = true;
  } else if (firstNumber !== "" && negativeNumber === false) {
    firstNumber = separator + firstNumber;
    result.innerHTML = firstNumber;
    negativeNumber = true;
  }

  if (currentOperator !== "" && checkNegativeType === false) {
    negativeNumber = false;
    if (secondNumber !== "" && negativeNumber === false) {
      secondNumber = separator + secondNumber;
      result.innerHTML = secondNumber;
      negativeNumber = true;
      checkNegativeType = true;
    }
  }
}

//*** Событие для использования калькулятора с клавиатуры ***//
document.addEventListener("keydown", function (clicked) {
  let btnKey = clicked.key;
  let btnCode = clicked.code;
  const btnMassive = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "/",
    "*",
    "-",
    "+",
    "%",
    ".",
    "Backspace",
    "Enter",
  ];
  for (let i = 0; i < btnMassive.length; i++) {
    if (btnKey === btnMassive[i]) {
      if (Number(btnKey) || btnKey === "0") {
        btnKey = setNumber(btnKey);
      } else if (!Number(btnKey)) {
        if (String(btnKey)) {
          if (btnCode === "Minus") {
            setSeparatorNumber(btnKey);
          }

          if (btnKey === "Backspace") {
            resultElement.style.color = "#fff";
            btnKey = "0";
            cleaning();
          } else if (btnKey === "Enter") {
            resulting(btnKey);
          } else if (btnKey === ".") {
            btnKey = setFloatNumber(btnKey);
          } else if (
            (btnCode =
              "NumpadDivide" ||
              "NumpadMultiply" ||
              "NumpadSubtract" ||
              "NumpadAdd" ||
              "ShiftLeft" + "Digit5")
          ) {
            btnKey = setOperator(btnKey);
          }
        }
      }
    }
  }
});

//*** Настраиваем шторку телефона ***/

//*** Время ***//

function getNowTimePhone() {
  setInterval(() => {
    let timeIphone = document.getElementById("Time");

    let nowDateInfo = new Date();
    let timerNow = nowDateInfo.toLocaleTimeString();

    let newTimeNow = timerNow.substring(0, 8);

    timeIphone.innerHTML = newTimeNow;
  }, 1000);
}

getNowTimePhone();

//*** Уровень зарядки ***//

function levelBatary() {
  let batary = document.getElementById("bataryPhone");
  let messageForLevelBatary = document.getElementById("message-batary");
  let bataryLevel = 10;
  setInterval(() => {
    bataryLevel += -1;

    switch (bataryLevel) {
      case 10:
        batary;
        break;
      case 8:
        batary.style.backgroundColor = "orange";
        batary.style.width = "32px";
        batary.style.transition = "0.5s";
        break;
      case 6:
        batary.style.backgroundColor = "yellow";
        batary.style.width = "26px";
        batary.style.transition = "0.5s";
        break;

      case 4:
        batary.style.backgroundColor = "rgb(255, 94, 0)";
        batary.style.width = "16px";
        batary.style.transition = "0.5s";
        break;

      case 2:
        batary.style.backgroundColor = "red";
        batary.style.width = "8px";
        batary.style.transition = "0.5s";
        break;

      case 0:
        batary.style.backgroundColor = "black";
        batary.style.width = "0px";
        batary.style.opacity = "0";
        batary.style.transition = "0.5s";
        setInterval(() => {
          messageForLevelBatary.innerHTML = "0%";
          messageForLevelBatary.style.color = "#fff";
          messageForLevelBatary.style.transition = "0.5s";
          messageForLevelBatary.style.textAlign = "center";
          messageForLevelBatary.style.fontSize = "14px";
          messageForLevelBatary.style.marginTop = "2px";
        }, 2000);
        break;
    }
  }, 5000);

  if (bataryLevel === 0) {
  }
}

levelBatary();

// *** HOMEWORK
// * Чтобы кнопки работали от клавиатуры
// * Чтобы показывалось текущее время |--
// * Чтобы  заканчивалась зарядка |--
// * Чтобы все кнопки работали при нажатии мышкой  |--
