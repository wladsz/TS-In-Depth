// Task 06.01 Using Namespaces (try)
/// <reference path="utility-functions.ts" />
var util = Utility.Fees;
var result1 = Utility.maxBooksAllowed(10);
console.log(result1);
var result2 = util.calculateLateFee(10);
console.log(result2);
