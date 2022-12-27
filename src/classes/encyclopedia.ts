// Task 06.03 Default Export

import { ReferenceItem } from './reference-item';
import { positiveInteger } from '../decorators';

export default class Encyclopedia extends ReferenceItem { // default export
    private _copies: number; // task 08.07

    @positiveInteger // task 08.07
    get copies(): number {
        return this._copies;
    }

    set copies(value: number) {
        this._copies = value;
    }
    constructor(
        id: number,
        title: string,
        year: number,
        public edition: number,
    ) {
        super(id, title, year);
    }

    override printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    printCitation(): void {
        console.log(`${this.title} - ${this.year}`);
    };
}
