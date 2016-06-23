export class Dispatcher<T> extends Rx.Subject<T> {
    constructor() { super() }

    dispatch = action => this.onNext(action);

}