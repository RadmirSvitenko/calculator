const result = document.getElementById("result_calculate");
const resultElement = document.getElementById("result_calculate");
const calculateDiv = document.getElementById("calculate_container");
const messageBatary = document.getElementById("message-batary");
const iconWifi = document.getElementById("img_wifi");
const iconSignal = document.getElementById("img_signal");
// let btnActive = document.querySelector("btn");

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
  if (result.innerHTML.length > 6) {
    result.style.fontSize = "40px";
    result.style.wordBreak = "break-all";
  }

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

  if (result.innerHTML.length > 6) {
    result.style.fontSize = "40px";
    result.style.wordBreak = "break-all";
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
    "c",
    "Enter",
  ];
  for (let i = 0; i < btnMassive.length; i++) {
    if (btnKey === btnMassive[i]) {
      // btnKey = btnActive.classList.add("active");
      if (Number(btnKey) || btnKey === "0") {
        btnKey = setNumber(btnKey);
      } else if (!Number(btnKey)) {
        if (String(btnKey)) {
          if (btnCode === "Minus") {
            setSeparatorNumber(btnKey);
          } else if (btnKey === "c") {
            resultElement.style.color = "#fff";
            btnKey = "0";
            cleaning();
          } else if (btnKey === "Backspace") {
            if (firstNumber && !secondNumber) {
              firstNumber = firstNumber.slice(0, firstNumber.length - 1);
              result.innerHTML = firstNumber;
            } else if (firstNumber && secondNumber) {
              secondNumber = secondNumber.slice(0, secondNumber.length - 1);
              result.innerHTML = secondNumber;
            }
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
let percent = 100;
let checkPercent = false;
function getPercent() {
  return () => {
    if (checkPercent) {
      percent++;
      if (percent === 100) {
        checkPercent = false;
      }
    } else {
      percent--;
      if (percent === 0) {
        checkPercent = true;
      }
    }
    return `${percent}%`;
  };
}

const currentPercent = getPercent();

setInterval(() => {
  messageBatary.innerHTML = currentPercent();
}, 1000);

//*** События изменения уровня сигнала телефона и Wi-Fi ***//

const calculateContainer = document.addEventListener(
  "mousemove",
  (coordinator) => {
    if (coordinator.clientY >= 450 && coordinator.clientY <= 600) {
      iconWifi.src = "images/wifi1.svg";
    } else if (coordinator.clientY >= 300 && coordinator.clientY <= 450) {
      iconWifi.src = "images/wifi2.svg";
    } else if (coordinator.clientY >= 150 && coordinator.clientY <= 300) {
      iconWifi.src = "images/wifi3.svg";
    } else if (coordinator.clientY >= 0 && coordinator.clientY <= 150) {
      iconWifi.src = "images/wifi4.svg";
    }

    if (coordinator.clientX >= 0 && coordinator.clientX <= 325) {
      iconSignal.src = "images/signal1.svg";
    } else if (coordinator.clientX >= 325 && coordinator.clientX <= 650) {
      iconSignal.src = "images/signal2.svg";
    } else if (coordinator.clientX >= 650 && coordinator.clientX <= 975) {
      iconSignal.src = "images/signal3.svg";
    } else if (coordinator.clientX >= 975 && coordinator.clientX <= 1365) {
      iconSignal.src = "images/signal4.svg";
    }
  }
);
