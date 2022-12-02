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
};

function getAllBooks(): readonly Book[] {
    const books = <const> [
        { id: 1, title: 'Refactoring JavaScript', author: 'Evan Burchard', available:
        true, category: Category.JavaScript},
        { id: 2, title: 'JavaScript Testing', author: 'Liang Yuxian Eugene', available:
        false, category: Category.JavaScript},
        { id: 3, title: 'CSS Secrets', author: 'Lea Verou', available: true, category: Category.CSS},
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', author:
        'Andrea Chiarelli', available: true, category: Category.JavaScript}
    ];

    return books;
}

function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    console.log(`Number of books: ${books.length}`);

    const title = books.find(({available}) => available)?.title;
    console.log(`First available book: ${title}`);
}

logFirstAvailable(getAllBooks());



function getBookTitlesByCategory(inputCategory: Category = Category.JavaScript): string[] {
    const books = getAllBooks();

    return books
        .filter(book => book.category === inputCategory)
        .map(({title}) => title);
}

function logBookTitles(titles: Array<string>): void {
    titles.forEach(title => console.log(title));
}

logBookTitles(getBookTitlesByCategory(Category.JavaScript));

function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index];

    return [ title, author ];
}

console.log(getBookAuthorByIndex(0));

function calcTotalPages(): void {
    const data = <const> [
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 }
    ];

    const r = data.reduce((acc: BigInt, obj ) => {
        return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
    }, 0n);

    console.log(r);
}

calcTotalPages();


// --------------------------------------------------------
// Task 03.01
function createCustomerID(name: string, id: number): string {
    return `${name}-${id}`;
}

const myID: string = createCustomerID('Ann', 10);
console.log(myID);

// let idGenerator: (name: string, id: number) => string;
let idGenerator: typeof createCustomerID;
idGenerator = (name: string, id: number) => `${name}-${id}`;
idGenerator = createCustomerID;

console.log(idGenerator('Vlad', 25));


// Task 03.02
function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);

    if (age) {
        console.log(`Customer age: ${age}`);
    }

    if (city) {
        console.log(`Customer city: ${city}`);
    }
}

createCustomer('Ann');
createCustomer('Ann', 20);
createCustomer('Ann', 20, 'Kyiv');

logBookTitles(getBookTitlesByCategory());

logFirstAvailable();

// function getBookByID(id: number): Book {
function getBookByID(id: Book['id']): Book | undefined {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

console.log(getBookByID(1));

function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer name: ${customer}`);

    return bookIDs
        .map(id => getBookByID(id)) // не дуже оптимальний варіант, але для малих масивів ОК
        .filter(book => book.available)
        .map(book => book.title);
}

checkoutBooks('NoName Customer', 1, 3, 4);

const myBooks = checkoutBooks('Ann', 1, 2, 4 );
console.log(myBooks);


// Task 03.03 Function Overloading
function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
// function getTitles(...args: unknown[]): string[] {
function getTitles(...bookProperties: [string|boolean] | [number, boolean]): string[] {
    const books = getAllBooks();
    let foundTitles: string[];
    if (bookProperties.length === 1) {
        const [property] = bookProperties;

        if (typeof property === 'string') {
            return books.filter(book => book.author === property).map(book => book.title);
        } else if (typeof property === 'boolean') {
            return books.filter(book => book.available === property).map(book => book.title);
        }
    } else if (bookProperties.length === 2) {
        const [id, available] = bookProperties;

        if (typeof id === 'number' && typeof available === 'boolean') { // optional, not neccesary
            return books.filter(book => book.id === id && book.available === available).map(book => book.title);
        }
    }
}

console.log(getTitles(1, true));
console.log(getTitles('Lea Verou'));


// Task 03.04 Assertion Functions
function assertStringValue(data: any): asserts data is string {
    if (typeof data !== 'string') {
        throw new Error('value should have been a string');
    }
}


function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return [...title].reverse().join('');
}

console.log(bookTitleTransform('Learn TypeScript'));
console.log(bookTitleTransform(123));



// ----------------------------------------------------------------------

// Task 04.01 Defining an Interface
function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    // year: 2015,
    // copies: 3
};

printBook(myBook);