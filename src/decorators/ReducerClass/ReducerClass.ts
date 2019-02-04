import { Map as ImmutableMap } from 'immutable';

import Reducer from '../../reducer';
import { IStore, ReducerConstructor, MapState, ReducerMethod } from '../../types';
import { REDUCER_KEY } from '../../types/internal';

export interface ReducerClassDecoratorPayload<T> {
    name?: string;
    defaultState?: T;
}

export default function ReducerClass<T, C extends new (...args: any[]) => any>(options?: ReducerClassDecoratorPayload<T>): C & ReducerConstructor<T> {
    return function(target: C): C & ReducerConstructor<T> {
        return class WrappedReducer extends Reducer<T> {
            constructor(store: IStore, defaultState: MapState<T> = options.defaultState ? ImmutableMap(options.defaultState): null) {
                super(store, defaultState);
                for (const prop in target) {
                    if (target.prototype.hasOwnProperty(prop)) {
                        if (typeof target.prototype[prop] === 'function') {
                            (this as any)[prop] = (target.prototype[prop] as any).bind(this);
                        } else {
                            (this as any)[prop] = target.prototype[prop];
                        }
                    }
                }

                if ((target.prototype as any)[REDUCER_KEY] && (target.prototype as any)[REDUCER_KEY].size) {
                    (target.prototype as any)[REDUCER_KEY].forEach((v: ReducerMethod<MapState<T>>, k: string | symbol) => {
                        this.register(k, v.bind(this));
                    });
                }
            }
        } as any as C & ReducerConstructor<T>;
    } as any as C & ReducerConstructor<T>;
}