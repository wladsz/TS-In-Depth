// Task 08.01 Class Decorators
export function sealed(param: string) /* :(constructor: Function) => void */ { // full syntax
    return function(constructor: Function): void {
        console.log(`Sealing the constructor ${param}`);
        console.log(constructor);
        console.log(constructor.prototype);

        Object.seal(constructor);
        Object.seal(constructor.prototype);
    };
}

export function logger<TFunction extends Function>(constructor: TFunction): TFunction {
    const newConstructor: Function = function() {
        console.log('Creating new instance');
        console.log(constructor);
        this.age = 30;
    };

    newConstructor.prototype = Object.create(constructor.prototype);

    newConstructor.prototype.printLibraraian = function(): void {
        console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
    };

    return newConstructor as TFunction;
}

// Task 08.03
export function writable(isWritable: boolean) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        console.log(target);
        console.log(methodName);
        console.log(descriptor);

        descriptor.writable = isWritable;

        return descriptor;
    };
}

// Task 08.04
export function timeout (ms: number) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any) {
            if (window.confirm('Are you sure?')) {
                setTimeout(() => {
                    originalMethod.apply(this, args.toString());
                }, ms);
            }
        };

        return descriptor;
    };
}

// Task 08.05
export function logParameter(target: any, methodName: string, index: number) {
    const key = `${methodName}_decor_params_indexes`;

    const proto = typeof target === 'function' ? target.prototype : target;

    (proto[key] ??= []).push(index);
}

export function logMethod (target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: any) {
        const key = `${methodName}_decor_params_indexes`;
        const proto = typeof target === 'function' ? target.prototype : target;
        const indexes = proto[key];

        if(Array.isArray(indexes)) {
            args.forEach((arg, index) => {
                if (indexes.includes(index)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
                }
            });
        }
        return originalMethod.apply(this, args);
    };

    return descriptor;
}

// Task 08.06
function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer?: (value: any) => T,
    setTransformer?: (value: any) => T
) {
    const values = new Map<any, T>();
    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            Object.defineProperty(this, propertyName, {
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true
    });
}

export function format(pref: string = 'Mr./Mrs.') {
    return function(target: any, propertyName: string) {
        makeProperty(target, propertyName, value => `${pref} ${value}`, value => value);
    };
}

// Task 08.07
export function positiveInteger(target: any, propName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalSet = descriptor.set;

    descriptor.set = function(value: number) {
        if (value < 1 || !Number.isInteger(value)) {
            throw new Error('Invalid value');
        }

        if (originalSet) { // check if original 'set' exists
            originalSet.call(this, value);
        }
    };

    return descriptor;
}