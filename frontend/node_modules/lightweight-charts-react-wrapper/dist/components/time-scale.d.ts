import { ReactNode } from 'react';
import { DeepPartial, ITimeScaleApi, LogicalRangeChangeEventHandler, SizeChangeEventHandler, Time, TimeRangeChangeEventHandler, TimeScaleOptions } from 'lightweight-charts';
export interface TimeScaleProps extends DeepPartial<TimeScaleOptions> {
    children?: ReactNode;
    onVisibleTimeRangeChange?: TimeRangeChangeEventHandler<Time>;
    onVisibleLogicalRangeChange?: LogicalRangeChangeEventHandler;
    onSizeChange?: SizeChangeEventHandler;
}
export declare const TimeScale: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<TimeScaleProps & import("react").RefAttributes<ITimeScaleApi<Time>>>>;
