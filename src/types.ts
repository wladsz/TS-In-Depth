// Task 06.02
import { Book, Person } from './interfaces';

type PersonBook = Person&Book;

type BookProperties = keyof Book;

type BookOrUndefined = Book&undefined;

export { PersonBook, BookProperties, BookOrUndefined };