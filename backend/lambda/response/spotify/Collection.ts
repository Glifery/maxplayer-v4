export class Collection<T> {
    private elements: T[] = [];

    constructor (elements: T[] = []) {
        this.set(elements);
    }

    reset (): Collection<T> {
        this.elements = [];

        return this;
    }

    add (element: T): Collection<T> {
        this.elements.push(element);

        return this;
    }

    set (elements: T[]): Collection<T> {
        this.reset();

        for (let element of elements) {
            this.add(element);
        }

        return this;
    }

    getElements(): T[] {
        return this.elements;
    }
}