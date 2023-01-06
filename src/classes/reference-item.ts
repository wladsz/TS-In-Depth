// Task 06.04

import { timeout } from '../decorators';

abstract class ReferenceItem {
    #id: number;

    private Xpublisher: string;

    get publisher(): string {
        return this.Xpublisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this.Xpublisher = newPublisher;
    }

    static department: string = 'Research';

    constructor(
        id: number,
        public title: string,
        protected year: number
    ) {
        console.log('Creating a new ReferenceItem...');
        this.#id = id;
    }

    @timeout(2000) // -- task 08.04
    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
        console.log(ReferenceItem.department);
        console.log(Object.getPrototypeOf(this).constructor.department); // get property by prototype
    }

    getID(): number {
        return this.#id;
    }

    abstract printCitation(): void;
}

export { ReferenceItem };