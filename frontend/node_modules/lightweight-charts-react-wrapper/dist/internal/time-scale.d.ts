import { ITimeScaleApi, DeepPartial, LogicalRangeChangeEventHandler, SizeChangeEventHandler, TimeRangeChangeEventHandler, TimeScaleOptions, Time } from 'lightweight-charts';
import { ActionResult } from './utils.js';
import { ChartActionResult } from './chart.js';
export interface TimeScaleParams extends DeepPartial<TimeScaleOptions> {
    onVisibleTimeRangeChange?: TimeRangeChangeEventHandler<Time>;
    onVisibleLogicalRangeChange?: LogicalRangeChangeEventHandler;
    onSizeChange?: SizeChangeEventHandler;
}
export declare type TimeScaleActionResult = ActionResult<TimeScaleParams> & {
    subject(): ITimeScaleApi<Time>;
};
export declare function timeScale(target: ChartActionResult, params: TimeScaleParams): TimeScaleActionResult;
