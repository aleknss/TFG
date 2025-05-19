import { ReactNode } from 'react';
import { BarSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap, SeriesMarker, Time } from 'lightweight-charts';
export interface BarSeriesProps extends BarSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Bar'][];
    markers?: SeriesMarker<Time>[];
    reactive?: boolean;
    children?: ReactNode;
}
export declare const BarSeries: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<BarSeriesProps & import("react").RefAttributes<ISeriesApi<"Bar", Time, import("lightweight-charts").WhitespaceData<Time> | import("lightweight-charts").BarData<Time>, import("lightweight-charts").BarSeriesOptions, import("lightweight-charts").DeepPartial<import("lightweight-charts").BarStyleOptions & import("lightweight-charts").SeriesOptionsCommon>>>>>;
