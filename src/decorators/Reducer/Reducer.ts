
import { REDUCER_KEY } from '../../types/internal';

export default function Reducer<State>(reducerKey: string | symbol) {
    return function(target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        if( descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }

        if (!target.hasOwnProperty(REDUCER_KEY)) {
            (target as any)[REDUCER_KEY] = new Map();
        }
        (target as any)[REDUCER_KEY].set(reducerKey, descriptor.value);
    }
}
