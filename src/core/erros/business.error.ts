
export class BusinessError extends Error {

    public name: string;

    constructor(message) {
        super(message);
        this.name = 'BusinessError';
    }

}