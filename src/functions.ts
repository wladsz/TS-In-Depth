/* eslint-disable no-redeclare */
// Task 06.02
import { Book, TOptions, LibMgrCallback, Callback } from './interfaces';
import { Category } from './enums';
import { BookProperties, BookOrUndefined } from './types';
import RefBook from './classes/encyclopedia';

export function getAllBooks(): readonly Book[] {
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

export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    console.log(`Number of books: ${books.length}`);

    const title = books.find(({available}) => available)?.title;
    console.log(`First available book: ${title}`);
}

export function getBookTitlesByCategory(inputCategory: Category = Category.JavaScript): string[] {
    const books = getAllBooks();

    return books
        .filter(book => book.category === inputCategory)
        .map(({title}) => title);
}

export function logBookTitles(titles: Array<string>): void {
    titles.forEach(title => console.log(title));
}


export function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index];

    return [ title, author ];
}

// export function calcTotalPages(): void {
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

export function createCustomerID(name: string, id: number): string {
    return `${name}-${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);

    if (age) {
        console.log(`Customer age: ${age}`);
    }

    if (city) {
        console.log(`Customer city: ${city}`);
    }
}

// export function getBookByID(id: Book['id']): BookOrUndefined {
export function getBookByID(id: Book['id']): Book {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

export function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer name: ${customer}`);

    return bookIDs
        .map(id => getBookByID(id)) // не дуже оптимальний варіант, але для малих масивів ОК
        .filter(book => book.available)
        .map(book => book.title);
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...bookProperties: [string|boolean] | [number, boolean]): string[] {
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

export function assertStringValue(data: any): asserts data is string {
    if (typeof data !== 'string') {
        throw new Error('value should have been a string');
    }
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return [...title].reverse().join('');
}

export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

export function getProperty(book: Book, property: BookProperties): any {
    const value = book[property];

    return typeof value === 'function' ? value.name : value;
}

// Task 06.03
export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('It is not an instance of RefBook');
    }
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}


// Task 07.01  Generic Functions
export function purge<T>(inventory: Array<T>): T[] {
    return inventory.slice(2);
}

// Task 07.03 Generic Constraints
export function getObjectProperty<TObject, TKey extends keyof TObject>(object: TObject, key: TKey): TObject[TKey] | string {
    const value = object[key];

    return typeof value === 'function' ? value.name : value;
}

// Task 09.01
// export function getBooksByCategory(category: Category, callback: LibMgrCallback): void { // or
export function getBooksByCategory(category: Category, callback: Callback<string[]>): void {
    setTimeout(function() {
        try {
            const titles = getBookTitlesByCategory(category);

            if (titles.length > 0) {
                callback(null, titles);
            } else {
                throw new Error('No books found.');
            }
        } catch (error) {
            callback(error, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error | null, titles: string[] | null): void {
    if (err) {
        console.log(err.message);
    } else{
        console.log(titles);
    }
}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            const titles = getBookTitlesByCategory(category);

            if (titles.length > 0) {
                resolve(titles);
            } else {
                reject('No books found.');
            }
        }, 2000);
    });
}

// Task 09.03 Async Functions
export async function logSearchResults(category: Category) {
    const titles = await getBooksByCategoryPromise(category);
    console.log(titles.length);
    return titles;
}