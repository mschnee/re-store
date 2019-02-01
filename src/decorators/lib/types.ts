import { ReducerConstructor } from '@re-store/types';

export const METADATA = Symbol('@re-store metadata');

export declare type SimpleClass<T = {}> = new () => T;

export declare type DecoratedClass<T> = SimpleClass & DecoratedMetaData<T>;

export declare type  ReducerFunction<T> = (state: T, payload: any) => T;

export interface DecoratedMetaData<T> {
    [METADATA]: Array<ReducerFunction<T>>;
}