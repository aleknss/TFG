import { ReactNode } from 'react';
import { LineSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap, SeriesMarker, Time } from 'lightweight-charts';
export interface LineSeriesProps extends LineSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Line'][];
    markers?: SeriesMarker<Time>[];
    reactive?: boolean;
    children?: ReactNode;
}
export declare const LineSeries: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<LineSeriesProps & import("react").RefAttributes<ISeriesApi<"Line", Time, import("lightweight-charts").WhitespaceData<Time> | import("lightweight-charts").LineData<Time>, import("lightweight-charts").LineSeriesOptions, import("lightweight-charts").DeepPartial<import("lightweight-charts").LineStyleOptions & import("lightweight-charts").SeriesOptionsCommon>>>>>;
