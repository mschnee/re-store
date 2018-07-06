import { default as ReducerClass } from '../../Reducer';
import Store from '../../Store';

export function reducer<T>(name: string) {
    return (target: any) => {
        return class extends ReducerClass<T> {
            constructor(store: Store) {
                super(name, store);
                Object.getOwnPropertyNames(target.prototype).forEach((p: string) => {
                    this[p] = target.prototype[p];
                });
            }
        };
    };
}
