// Task 06.01 Using Namespaces

namespace Utility {
    export namespace Fees {
        export function calculateLateFee(daysLate: number): number {
            const fee = daysLate * 0.25;

            return fee;
        }
    }

    export function maxBooksAllowed(age): number {
        return age < 12 ? 3 : 10;
    }

    function privateFunc(): void {
        console.log('This is a private function');
    }
}