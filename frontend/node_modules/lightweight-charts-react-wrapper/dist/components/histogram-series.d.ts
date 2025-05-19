import { ReactNode } from 'react';
import { HistogramSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap, SeriesMarker, Time } from 'lightweight-charts';
export interface HistogramSeriesProps extends HistogramSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Histogram'][];
    markers?: SeriesMarker<Time>[];
    reactive?: boolean;
    children?: ReactNode;
}
export declare const HistogramSeries: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<HistogramSeriesProps & import("react").RefAttributes<ISeriesApi<"Histogram", Time, import("lightweight-charts").WhitespaceData<Time> | import("lightweight-charts").HistogramData<Time>, import("lightweight-charts").HistogramSeriesOptions, import("lightweight-charts").DeepPartial<import("lightweight-charts").HistogramStyleOptions & import("lightweight-charts").SeriesOptionsCommon>>>>>;
