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

console.log = () => {};

function solveRiddle() {
    largeNumber = parseInt(largeJugInputElem.value);
    smallNumber = parseInt(smallJugInputElem.value);
    targetNumber = parseInt(targetNumberInputElem.value);
    userPrediction = parseInt(predictionInputElem.value);

    if (targetNumber != null) {
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
        alert("all fields required!");
    }
}

function playAgain() {
    displayFormArea.style.display = "block";
    displayStepsNeeded.style.display = "none";
    playAgainBtn.style.display = "none";
    comparisonSpan.innerHTML = "";
    totalSteps.innerHTML = "";
    // counterArr = [];
};

function solved() {
    console.info("*******************************************");
    console.info("The value of smallContainer is: " + smallContainer + ".");
    console.info("The value of largeContainer is: " + largeContainer + ".");
    console.info("The number of steps to solve is " + stepCounter + ".");
    console.info("We gotta winner!");

    totalSteps.innerText = `The number of steps to solve is ${stepCounter}.`;
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
    console.info("function called - smallRemainder: " + smRemainder);
    fillLarge(smRemainder);
}

function largeRemainder() {
    smallContainer = 0;
    console.info("function called - lgRemainder: " + lgRemainder);
    fillSmall(lgRemainder);
}

//****************************************
//****************************************
//****************************************

function fillLarge() {
    if (smRemainder > 0) {
        console.info(
            `Remainder left in SMALL container equals: ${smRemainder}`
        );
        largeContainer = smRemainder;
        console.info(
            `Remainder poured into LARGE container. LARGE now equals: ${largeContainer}`
        );
    }

    smRemainder = 0;
    console.info("===========================================");
    console.info("FILL LARGE: SMALL POURS");
    console.info("===========================================");

    let pourCount = 0;
    while (largeContainer <= largeNumber && largeContainer != targetNumber) {
        pourCount++;
        console.info("LARGE container: ", { pourCount });

        // simulates small container poured into large container until full (any excess will be assigned as new smRemainder and then be assigned to new largeContainer size)
        largeContainer = dumpSmall(0, smallNumber);

        // largeContainer = largeContainer + smallNumber;

        stepCounter++;
    }

    if (largeContainer > largeNumber && largeContainer != targetNumber) {
        smRemainder = largeContainer - largeNumber;
        largeContainer = 0;

        console.info(`Remainder left inside Small container: ${smRemainder}`);

        // stepCounter++;
    }
    valueChecker();
}

// TODO: run two paths: 1. fillLarge(), 2. fillSmall(), then compare which path took more steps
function fillSmall() {
    smallContainer = lgRemainder;
    lgRemainder = 0;
    console.info("===========================================");
    console.info("FILL SMALL: LARGE POURS");
    console.info("===========================================");

    let pourCount = 0;
    while (smallContainer <= smallNumber) {
        pourCount++;
        console.info("SMALL container: ", { pourCount });

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
    console.info("***** valueChecker function fires! *****");

    if (smRemainder != 0) {
        smallRemainder();
    } else if (lgRemainder != 0) {
        console.info("lgRemainder (in valueChecker()): " + lgRemainder);
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
        console.info(`..... pour 1 out .....`);
        console.info(
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
        console.info(`..... pour 1 out .....`);
        console.info(
            `Small into Large: ${pourAmount} out of ${containerSize} pours`
        );

        console.info(
            `LARGE container now equals: ${largeContainer + pourAmount}`
        );

        return dumpSmall(pourAmount, containerSize);
    } else {
        return (largeContainer = largeContainer + containerSize);
    }
}

