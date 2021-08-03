const largeJugInputElem = document.getElementById("large-jug-size");
const smallJugInputElem = document.getElementById("small-jug-size");
const targetNumberInputElem = document.getElementById("target-number");
const predictionInputElem = document.getElementById("prediction");

const totalSteps = document.getElementById("total-steps");
const solveRiddleBtn = document.getElementById("solve-riddle");
const displayFormArea = document.querySelector(".form-area");
const displayStepsNeeded = document.querySelector(".steps-area");
const comparisonSpan = document.querySelector(".comparison");
const playAgainBtn = document.getElementById("play-again");
const stepsInfoElem = document.getElementById("steps-info");
const overlayElem = document.querySelector(".overlay");
const bgVidElem = document.querySelector(".fullscreen-bg__video");

// let counterArr = []; TODO: use with two paths to solve

solveRiddleBtn.addEventListener("click", solveRiddle);
playAgainBtn.addEventListener("click", playAgain);

let largeNumber = 0;
let smallNumber = 0;
let targetNumber = 0;
let userPrediction = 0;

let lgRemainder = 0;
let smRemainder = 0;

let largeContainer = 0;
let smallContainer = 0;

let stepCounter = 0;

let stepsArray = [];

console.log = () => {};

document.body.style.backgroundColor = "rgb(137, 128, 138)";

function solveRiddle() {
    largeNumber = parseInt(largeJugInputElem.value);
    smallNumber = parseInt(smallJugInputElem.value);
    targetNumber = parseInt(targetNumberInputElem.value);
    userPrediction = parseInt(predictionInputElem.value);

    if (targetNumber != null) {
        if (largeNumber % smallNumber !== 0) {
            displayFormArea.style.display = "none";
        displayStepsNeeded.style.display = "block";
        playAgainBtn.style.display = "block";
        // comparisonSpan.innerHTML = `Total steps: ${
        //     targetNumberInputElem.value
        // }, Your Prediction: ${predictionInputElem.value}. Difference: ${
        //     predictionInputElem.value - targetNumberInputElem.value
        // }`;
        return start();

        } else {
            alert("Sorry, it will not work if the large size can be divided evenly by the small size. Please change either one of those values.");
        };
    } else {
        alert("All fields required!");
    }
}

function playAgain() {
    displayFormArea.style.display = "block";
    displayStepsNeeded.style.display = "none";
    playAgainBtn.style.display = "none";
    // comparisonSpan.innerHTML = "";
    totalSteps.innerHTML = "";
    largeNumber = 0;
    smallNumber = 0;
    targetNumber = 0;
    userPrediction = 0;

    lgRemainder = 0;
    smRemainder = 0;

    largeContainer = 0;
    smallContainer = 0;

    stepCounter = 0;

    stepsArray = [];

    bgVidElem.style.display = "block";
    overlayElem.style.opacity = .75;

    // counterArr = [];
};

function solved() {
    stepsArray.push("*******************************************");
    stepsArray.push("The value of smallContainer is: " + smallContainer + ".");
    stepsArray.push("The value of largeContainer is: " + largeContainer + ".");
    stepsArray.push("The number of steps to solve is " + stepCounter + ".");
    stepsArray.push("We gotta winner!");

    bgVidElem.style.display = "none"
    overlayElem.style.opacity = 0;

    totalSteps.innerText = `The number of steps to solve is ${stepCounter}.`;
    stepsArray.forEach((step, index) => {
        stepsInfoElem.innerHTML += `${step} <br>`;
    });
}

function start() {
    if (smallContainer != targetNumber && largeContainer != targetNumber) {
        fillLarge();
    } else {
        console.log(
            "smallContainer: " +
                smallContainer +
                " || largeContainer: " +
                largeContainer
        );
        valueChecker();
    }
}

function smallRemainder() {
    largeContainer = 0;
    stepsArray.push("function called - smallRemainder: " + smRemainder);
    fillLarge(smRemainder);
}

function largeRemainder() {
    smallContainer = 0;
    stepsArray.push("function called - lgRemainder: " + lgRemainder);
    fillSmall(lgRemainder);
}

//****************************************
//****************************************
//****************************************

function fillLarge() {
    if (smRemainder > 0) {
        
        stepsArray.push(`Remainder left in SMALL container equals: ${smRemainder}`);
        largeContainer = smRemainder;
        stepsArray.push(
            `Remainder poured into LARGE container. LARGE now equals: ${largeContainer}`
        );
    }

    smRemainder = 0;
    stepsArray.push("===========================================");
    stepsArray.push("FILL LARGE: SMALL POURS");
    stepsArray.push("===========================================");

    let pourCount = 0;
    while (largeContainer <= largeNumber && largeContainer != targetNumber) {
        pourCount++;
        stepsArray.push("LARGE container: ", pourCount);

        // simulates small container poured into large container until full (any excess will be assigned as new smRemainder and then be assigned to new largeContainer size)
        largeContainer = dumpSmall(0, smallNumber);

        // largeContainer = largeContainer + smallNumber;

        stepCounter++;
    }

    if (largeContainer > largeNumber && largeContainer != targetNumber) {
        smRemainder = largeContainer - largeNumber;
        largeContainer = 0;

        stepsArray.push(`Remainder left inside Small container: ${smRemainder}`);

        // stepCounter++;
    }
    valueChecker();
}

// TODO: run two paths: 1. fillLarge(), 2. fillSmall(), then compare which path took more steps
function fillSmall() {
    smallContainer = lgRemainder;
    lgRemainder = 0;
    stepsArray.push("===========================================");
    stepsArray.push("FILL SMALL: LARGE POURS");
    stepsArray.push("===========================================");

    let pourCount = 0;
    while (smallContainer <= smallNumber) {
        pourCount++;
        stepsArray.push("SMALL container: ", pourCount);

        smallContainer = smallContainer + smallNumber;
        if (smallContainer == targetNumber) {
            return;
        }

        stepCounter++;
    }

    if (smallContainer > smallNumber && smallContainer != targetNumber) {
        lgRemainder = smallContainer - smallNumber;
        smallContainer = 0;
    }

    // smallContainer = dumpSmall(0, smallNumber);

    valueChecker();
}

function valueChecker() {
    console.log("checking containers");
    stepsArray.push("***** valueChecker function fires! *****");

    if (smRemainder != 0) {
        smallRemainder();
    } else if (lgRemainder != 0) {
        stepsArray.push("lgRemainder (in valueChecker()): " + lgRemainder);
        largeRemainder();
    } else if (
        largeContainer == targetNumber ||
        smallContainer == targetNumber
    ) {
        solved();
    } else {
        console.log("try again");
    }
}

function dumpLarge(pourAmount) {
    if (pourAmount < containerSize) {
        pourAmount++;
        stepsArray.push(`..... pour 1 out .....`);
        stepsArray.push(
            `Large into Small: ${pourAmount} out of ${containerSize} pours`
        );

        return dumpLarge(pourAmount, containerSize);
    } else {
        return (smallContainer = smallContainer + containerSize);
    }
}

function dumpSmall(pourAmount, containerSize) {
    if (pourAmount < containerSize) {
        pourAmount++;
        stepsArray.push(`..... pour 1 out .....`);
        stepsArray.push(
            `Small into Large: ${pourAmount} out of ${containerSize} pours`
        );

        stepsArray.push(
            `LARGE container now equals: ${largeContainer + pourAmount}`
        );

        return dumpSmall(pourAmount, containerSize);
    } else {
        return (largeContainer = largeContainer + containerSize);
    }
}

