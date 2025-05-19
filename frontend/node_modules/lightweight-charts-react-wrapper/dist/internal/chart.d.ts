import { ChartOptions, DeepPartial, IChartApi, MouseEventHandler, Time } from 'lightweight-charts';
import { ActionResult } from './utils.js';
export interface ChartActionParams extends DeepPartial<ChartOptions> {
    onClick?: MouseEventHandler<Time>;
    onCrosshairMove?: MouseEventHandler<Time>;
}
export declare type ChartActionResult = ActionResult<ChartActionParams> & {
    subject(): IChartApi;
    alive(): boolean;
};
export declare function chart(node: HTMLElement, params: ChartActionParams): ChartActionResult;
