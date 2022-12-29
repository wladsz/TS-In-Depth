// Task 06.02
import { createCustomer, getBooksByCategoryPromise } from './functions';
import { Book, Person, Author } from './interfaces';

type PersonBook = Person&Book;

type BookProperties = keyof Book;

type BookOrUndefined = Book&undefined;

// Task 07.04

type BookRequiredFields = Required<Book>;
type UpdatedBook = Partial<Book>;
type AuthorWoEmail = Omit<Author, 'email'>;
type СreateCustomerFunctionType = typeof createCustomer;

// Task 07.05
type fn = (a: string, b: number, c: boolean) => symbol;
type Param1<T> = T extends (a: infer A, b: number, c: boolean) => symbol ? A : never;
type Param2<T> = T extends (a: string, b: infer A, c: boolean) => symbol ? A : never;
type Param3<T> = T extends (a: string, b: number, c: infer A) => symbol ? A : never;

type P1 = Param1<fn>;
type P2 = Param2<fn>;
type P3 = Param3<fn>;

type RequiredProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop>? never : prop;
} [keyof T];
type OptionalProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop>? prop : never;
} [keyof T];

type BookRequiredProps = RequiredProps<Book>;
type BookOptionalProps = OptionalProps<Book>;

type RemoveProps <T extends object, TProps extends keyof T> = {
    [prop in keyof T as Exclude<prop, TProps>]: T[prop];
};

type BookRequiredPropsType = RemoveProps<Book, BookOptionalProps>;
type BookOptionalPropsType = RemoveProps<Book, BookRequiredProps>;

type Unpromisify<T> = T extends Promise<infer R> ? R : never;
type Unarray<T> = T extends Array<infer R> ? R : never; // optional

type pr = Unarray<Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>>;

export { PersonBook, BookProperties, BookOrUndefined, BookRequiredFields, UpdatedBook, СreateCustomerFunctionType, fn, P1, P2, P3, RequiredProps, OptionalProps, Unpromisify};