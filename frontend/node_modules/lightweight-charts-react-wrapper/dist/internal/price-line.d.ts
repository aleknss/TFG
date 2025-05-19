import { DeepPartial, IPriceLine, PriceLineOptions } from 'lightweight-charts';
import { ActionResult } from './utils.js';
import { SeriesActionParams, SeriesActionResult } from './series.js';
export declare type PriceLineActionResult = ActionResult<PriceLineParams> & {
    subject(): IPriceLine;
};
export interface PriceLineParams extends DeepPartial<PriceLineOptions> {
}
export declare function priceLine<T extends SeriesActionParams>(target: SeriesActionResult<T>, params: PriceLineParams): PriceLineActionResult;
