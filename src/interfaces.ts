// Task 06.02

import {Category} from './enums';

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;

    pages?: number;
    markDamaged?: DamageLogger;
};

interface DamageLogger {
    (reason: string): void;
}

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string, bookTitle: string) => void;
}

interface TOptions {
    duration?: number;
    speed?: number;
}

// Task 07.02 Generic Interfaces and Classes
interface Magazine {
    title: string;
    publisher: string;
}

// Task 07.03
interface ShelfItem {
    title: string;
}

// Task 09.01
interface LibMgrCallback {
    (err: Error | null, titles: string[] | null): void;
}
// or
interface Callback<T> {
    (err: Error | null, data: T | null): void;
}

export { Book, DamageLogger as Logger, Person, Author, Librarian, TOptions, Magazine, ShelfItem, LibMgrCallback, Callback };