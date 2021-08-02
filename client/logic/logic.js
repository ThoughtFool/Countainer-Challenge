const largeNumber = 5;
const smallNumber = 3;
const targetNumber = 4;

let lgRemainder = 0;
let smRemainder = 0;

let largeContainer = 0;
let smallContainer = 0;

let stepCounter = 0;

console.log = () => {};

solved = function () {
    console.info("*******************************************");
    console.info("The value of smallContainer is: " + smallContainer + ".");
    console.info("The value of largeContainer is: " + largeContainer + ".");
    console.info("The number of steps to solve is " + stepCounter + ".");
    console.info("We gotta winner!");
};

start = function () {
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
};

smallRemainder = function () {
    largeContainer = 0;
    console.info("function called - smallRemainder: " + smRemainder);
    fillLarge(smRemainder);
};

largeRemainder = function () {
    smallContainer = 0;
    console.info("function called - lgRemainder: " + lgRemainder);
    fillSmall(lgRemainder);
};

//****************************************
//****************************************
//****************************************

fillLarge = function () {
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

        stepCounter++;
    }
    valueChecker();
};

fillSmall = function () {
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
    }

    if (smallContainer > smallNumber && smallContainer != targetNumber) {
        lgRemainder = smallContainer - smallNumber;
        smallContainer = 0;
    }

    // smallContainer = dumpSmall(0, smallNumber);

    valueChecker();
};

valueChecker = function () {
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
};
start(); // ########### [1]
//****************************************

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
