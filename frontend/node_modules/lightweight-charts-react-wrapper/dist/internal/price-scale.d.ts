import { IPriceScaleApi, DeepPartial, PriceScaleOptions } from 'lightweight-charts';
import { ActionResult } from './utils.js';
import { ChartActionResult } from './chart.js';
export declare type PriceScaleActionResult = ActionResult<PriceScaleParams> & {
    subject(): IPriceScaleApi;
};
export interface PriceScaleParams extends DeepPartial<PriceScaleOptions> {
    id: string;
}
export declare function priceScale(target: ChartActionResult, params: PriceScaleParams): PriceScaleActionResult;
