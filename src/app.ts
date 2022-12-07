/* eslint-disable no-underscore-dangle */
/* eslint-disable no-redeclare */

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// -----------------------------------------------------------------------
// Task 02.01
enum Category {JavaScript, CSS, HTML, TypeScript, Angular}

// type Book = {
//     id: number;
//     title: string;
//     author: string;
//     available: boolean;
//     category: Category;
// };

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;

    pages?: number;
    // markDamaged?(reason: string): void;
    // markDamaged?: (reason: string) => void;
    markDamaged?: DamageLogger;
};

// from task 04.02:
interface DamageLogger {
    (reason: string): void;
}


// function getAllBooks(): readonly Book[] {
//     const books = <const> [
//         { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available:
//         true, category: Category.JavaScript},
//         { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available:
//         false, category: Category.JavaScript},
//         { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS},
//         { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author:
//         'Andrea Chiarelli', available: true, category: Category.JavaScript}
//     ];

//     return books;
// }

// function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
//     console.log(`Number of books: ${books.length}`);

//     const title = books.find(({available}) => available)?.title;
//     console.log(`First available book: ${title}`);
// }

// logFirstAvailable(getAllBooks());



// function getBookTitlesByCategory(inputCategory: Category = Category.JavaScript): string[] {
//     const books = getAllBooks();

//     return books
//         .filter(book => book.category === inputCategory)
//         .map(({title}) => title);
// }

// function logBookTitles(titles: Array<string>): void {
//     titles.forEach(title => console.log(title));
// }

// logBookTitles(getBookTitlesByCategory(Category.JavaScript));

// function getBookAuthorByIndex(index: number): [title: string, author: string] {
//     const books = getAllBooks();
//     const { title, author } = books[index];

//     return [ title, author ];
// }

// console.log(getBookAuthorByIndex(0));

// function calcTotalPages(): void {
//     const data = <const> [
//         { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
//         { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
//         { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
//     ];

//     const r = data.reduce((acc: BigInt, obj ) => {
//         return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
//     }, 0n);

//     console.log(r);
// }

// calcTotalPages();


// // --------------------------------------------------------
// // Task 03.01
// function createCustomerID(name: string, id: number): string {
//     return `${name}-${id}`;
// }

// const myID: string = createCustomerID('Ann', 10);
// console.log(myID);

// // let idGenerator: (name: string, id: number) => string;
// let idGenerator: typeof createCustomerID;
// idGenerator = (name: string, id: number) => `${name}-${id}`;
// idGenerator = createCustomerID;

// console.log(idGenerator('Vlad', 25));


// // Task 03.02
// function createCustomer(name: string, age?: number, city?: string): void {
//     console.log(`Customer name: ${name}`);

//     if (age) {
//         console.log(`Customer age: ${age}`);
//     }

//     if (city) {
//         console.log(`Customer city: ${city}`);
//     }
// }

// createCustomer('Ann');
// createCustomer('Ann', 20);
// createCustomer('Ann', 20, 'Kyiv');

// logBookTitles(getBookTitlesByCategory());

// logFirstAvailable();

// // function getBookByID(id: number): Book {
// function getBookByID(id: Book['id']): Book | undefined {
//     const books = getAllBooks();
//     return books.find(book => book.id === id);
// }

// console.log(getBookByID(1));

// function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
//     console.log(`Customer name: ${customer}`);

//     return bookIDs
//         .map(id => getBookByID(id)) // не дуже оптимальний варіант, але для малих масивів ОК
//         .filter(book => book.available)
//         .map(book => book.title);
// }

// checkoutBooks('NoName Customer', 1, 3, 4);

// const myBooks = checkoutBooks('Ann', 1, 2, 4 );
// console.log(myBooks);


// // Task 03.03 Function Overloading
// function getTitles(author: string): string[];
// function getTitles(available: boolean): string[];
// function getTitles(id: number, available: boolean): string[];
// // function getTitles(...args: unknown[]): string[] {
// function getTitles(...bookProperties: [string|boolean] | [number, boolean]): string[] {
//     const books = getAllBooks();
//     let foundTitles: string[];
//     if (bookProperties.length === 1) {
//         const [property] = bookProperties;

//         if (typeof property === 'string') {
//             return books.filter(book => book.author === property).map(book => book.title);
//         } else if (typeof property === 'boolean') {
//             return books.filter(book => book.available === property).map(book => book.title);
//         }
//     } else if (bookProperties.length === 2) {
//         const [id, available] = bookProperties;

//         if (typeof id === 'number' && typeof available === 'boolean') { // optional, not neccesary
//             return books.filter(book => book.id === id && book.available === available).map(book => book.title);
//         }
//     }
// }

// console.log(getTitles(1, true));
// console.log(getTitles('Lea Verou'));


// // Task 03.04 Assertion Functions
// function assertStringValue(data: any): asserts data is string {
//     if (typeof data !== 'string') {
//         throw new Error('value should have been a string');
//     }
// }


// function bookTitleTransform(title: any): string {
//     assertStringValue(title);
//     return [...title].reverse().join('');
// }

// console.log(bookTitleTransform('Learn TypeScript'));
// console.log(bookTitleTransform(123));


// ----------------------------------------------------------------------

// // Task 04.01 Defining an Interface
// function printBook(book: Book): void {
//     console.log(`${book.title} by ${book.author}`);
// }

// const myBook: Book = {
//     id: 5,
//     title: 'Colors, Backgrounds, and Gradients',
//     author: 'Eric A. Meyer',
//     available: true,
//     category: Category.CSS,
//     // year: 2015,
//     // copies: 3

//     pages: 200,
//     // markDamaged: (reason: string) => console.log(`Damaged: ${reason}`) // as property
//     markDamaged(reason: string) { // as method
//         console.log(`Damaged: ${reason}`);
//     }
// };

// printBook(myBook);
// myBook.markDamaged('Missing back cover');


// // Task 04.02 Defining an Interface for Function Types
// const logDamage: DamageLogger = (reason: string) => console.log(`Damaged: ${reason}`);
// logDamage('Missing back cover');


// // Task 04.03 Extending Interface
interface Person {
    name: string;
    email: string;
}

// interface Author extends Person {
//     numBooksPublished: number;
// }

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string, bookTitle: string) => void;
}

// const favoriteAuthor: Author = {
//     name: 'Anna',
//     email: 'anna@exapmle.com',
//     numBooksPublished: 2
// };

// const favoriteLibrarian: Librarian = {
//     name: 'Pavlo',
//     email: 'pavlo@exapmle.com',
//     department: 'Classic Literature',
//     assistCustomer: null
// };


// // Task 04.04 Optional Chaining
// const offer: any = {
//     book: {
//         title: 'Essential TypeScript',
//     },
// };

// console.log(offer.magazine);
// console.log(offer.magazine?.getTitle());
// console.log(offer.book?.getTitle?.());
// console.log(offer.book.authors?.[0]);


// // Task 04.05 Keyof Operator
// type BookProperties = keyof Book;

// function getProperty(book: Book, property: BookProperties): any {
//     const value = book[property];

//     return typeof value === 'function' ? value.name : value;
// }

// console.log(getProperty(myBook, 'title')); // variable from task 04.01
// console.log(getProperty(myBook, 'markDamaged'));
// console.log(getProperty(myBook, 'isbn'));


// ----------------------------------------------------------------------
// // Classes
// // Task 05.01 Creating and Using Classes
// abstract class ReferenceItem { // 'abstract' from task 05.03
//     // title: string;
//     // year: number;

//     // constructor(newTitle: string, newYear: number) {
//     //     console.log('Creating a new ReferenceItem...');
//     //     this.title = newTitle;
//     //     this.year = newYear;
//     // }

//     #id: number;

//     private _publisher: string;

//     get publisher(): string {
//         return this._publisher.toUpperCase();
//     }

//     set publisher(newPublisher: string) {
//         this._publisher = newPublisher;
//     }

//     static department: string = 'Research';

//     constructor(
//         id: number,
//         public title: string,
//         // private year: number
//         protected year: number
//     ) {
//         console.log('Creating a new ReferenceItem...');
//         this.#id = id;
//     }

//     printItem(): void {
//         console.log(`${this.title} was published in ${this.year}`);
//         console.log(ReferenceItem.department);
//         console.log(Object.getPrototypeOf(this).constructor.department); // get property by prototype
//     }

//     getID(): number {
//         return this.#id;
//     }

//     abstract printCitation(): void; // from task 05.03
// }

// const ref = new ReferenceItem(1, 'Learn TypeScript', 2022);
// console.log(ref);
// ref.printItem();
// ref.publisher = 'abc-group';
// console.log(ref.publisher);
// console.log(ref.getID());


// // Task 05.02 Extending Classes
// class Encyclopedia extends ReferenceItem {
//     constructor(
//         id: number,
//         title: string,
//         year: number,
//         public edition: number
//     ) {
//         super(id, title, year);
//     }

//     override printItem(): void {
//         super.printItem();
//         console.log(`Edition: ${this.edition} (${this.year})`);
//     }

//     printCitation(): void { // from task 05.03
//         console.log(`${this.title} - ${this.year}`);
//     };
// }

// const refBook: Encyclopedia = new Encyclopedia(1, 'Learn TypeScript', 2022, 2);
// // console.log(refBook);
// refBook.printItem();


// // Task 05.03 Creating Abstract Classes
// refBook.printCitation();


// Task 05.04 Interfaces for Class Types
class UniversityLibrarian implements Librarian {
    name: string;
    email: string;
    department: string;

    assistCustomer(custName: string, bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with book ${bookTitle}`);
    };
}

const favoriteLibrarian: Librarian = new UniversityLibrarian();
favoriteLibrarian.name = 'Anna';
favoriteLibrarian.assistCustomer('Boris', 'Learn TypeScript');


// Task 05.05 Intersection and Union Types