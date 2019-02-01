
import { METADATA } from '../../types/metadata';

export default function Reducer<State>(reducerKey: string | symbol) {
    return function(target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        if( descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, key);
        }

        if (!target.hasOwnProperty(METADATA)) {
            (target as any)[METADATA] = new Map();
        }
        (target as any)[METADATA].set(reducerKey, descriptor.value);
    }
}