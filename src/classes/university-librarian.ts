// Task 06.04
import { sealed, logger, writable, logParameter, logMethod, format } from '../decorators';
import * as Interfaces from './../interfaces';

// @sealed('UniversityLibrarian') // -- task 08.01
// @logger // -- task 08.02
class UniversityLibrarian implements Interfaces.Librarian {
    @format() // -- task 08.06
    name: string;
    email: string;
    department: string;

    @logMethod // -- task 08.05
    assistCustomer(@logParameter custName: string, @logParameter bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with book ${bookTitle}`);
    };

    // @writable(true) // -- task 08.04
    /* static */ assistFaculty(): void {
        console.log('Assisting faculty');
    };

    // @writable(false) // -- task 08.04
    teachCommunity(): void {
        console.log('Teaching community');
    };
}

export { UniversityLibrarian };