// Task 06.01 Using Namespaces (try)

namespace Utility {
    export namespace Fees {
        export function calculateLateFee(daysLate: number): number {
            const fee = daysLate * 0.25;

            return fee;
        }
    }

    export function maxBooksAllowed(age): number {
        if (age < 12) { // return 3 or 10 - ?
            return 3;
        }
    }
}

function privateFunc(): void {
    console.log('This is a private function');
}