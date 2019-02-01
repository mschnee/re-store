
import { METADATA } from '@re-store/types';

export default function Reducer<State>(reducerKey: string | symbol) {
    return function(target: any, key: string | symbol, descriptor: PropertyDescriptor) {
        if (!target.hasOwnProperty(METADATA)) {
            (target as any)[METADATA] = new Map();
        }
        (target as any)[METADATA].set(reducerKey, descriptor.value);
    }
}
