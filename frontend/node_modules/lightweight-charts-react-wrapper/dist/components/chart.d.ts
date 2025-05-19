import { HTMLAttributes, ForwardedRef, ReactNode } from 'react';
import { ChartOptions, DeepPartial, IChartApi, MouseEventHandler, Time } from 'lightweight-charts';
export interface ChartProps extends DeepPartial<ChartOptions> {
    children?: ReactNode;
    container?: HTMLAttributes<HTMLDivElement> & {
        ref?: ForwardedRef<HTMLDivElement>;
    };
    onClick?: MouseEventHandler<Time>;
    onCrosshairMove?: MouseEventHandler<Time>;
}
export declare const Chart: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<ChartProps & import("react").RefAttributes<IChartApi>>>;
