import { Map as ImmutableMap } from 'immutable';
import { DEFAULT_STATE } from '../../types/internal';
import { ReducerConstructor, MapState } from '../../types';

export default function DefaultState<T>(state: any) {
    return function(target: ReducerConstructor<T>) {
        if (!target.prototype[DEFAULT_STATE]) {
            (target.prototype as any)[DEFAULT_STATE] = ImmutableMap(state) as MapState<T>;
        }
    }
}
