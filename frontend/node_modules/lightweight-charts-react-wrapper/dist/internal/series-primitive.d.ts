import { ISeriesPrimitive } from 'lightweight-charts';
import { ActionResult } from './utils.js';
import { SeriesActionParams, SeriesActionResult } from './series';
export interface IReactiveSeriesPrimitive<O> extends ISeriesPrimitive {
    applyOptions(options: Omit<O, 'view'>): void;
}
export declare type SeriesPrimitiveParams<O> = O & {
    view: IReactiveSeriesPrimitive<O>;
};
export declare type SeriesPrimitiveActionResult<O> = ActionResult<SeriesPrimitiveParams<O>>;
export declare function seriesPrimitive<O>(target: SeriesActionResult<SeriesActionParams>, params: SeriesPrimitiveParams<O>): SeriesPrimitiveActionResult<O>;
