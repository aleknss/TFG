import { IReactiveSeriesPrimitive } from '../internal/series-primitive.js';
export type { IReactiveSeriesPrimitive };
export declare type SeriesPrimitiveProps<T> = T & {
    view: IReactiveSeriesPrimitive<T>;
};
export declare const SeriesPrimitive: <T>(props: SeriesPrimitiveProps<T>) => JSX.Element | null;
