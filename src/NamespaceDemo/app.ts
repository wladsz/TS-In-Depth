// Task 06.01 Using Namespaces
/// <reference path="utility-functions.ts" />

import util = Utility.Fees;

const result1 = Utility.maxBooksAllowed(10);
console.log(result1);

const result2 = util.calculateLateFee(10);
console.log(result2);


