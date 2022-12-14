// Task 06.01 Using Namespaces
var Utility;
(function (Utility) {
    var Fees;
    (function (Fees) {
        function calculateLateFee(daysLate) {
            var fee = daysLate * 0.25;
            return fee;
        }
        Fees.calculateLateFee = calculateLateFee;
    })(Fees = Utility.Fees || (Utility.Fees = {}));
    function maxBooksAllowed(age) {
        return age < 12 ? 3 : 10;
    }
    Utility.maxBooksAllowed = maxBooksAllowed;
    function privateFunc() {
        console.log('This is a private function');
    }
})(Utility || (Utility = {}));

/// <reference path="utility-functions.ts" />
var util = Utility.Fees;
var result1 = Utility.maxBooksAllowed(10);
console.log(result1);
var result2 = util.calculateLateFee(10);
console.log(result2);
