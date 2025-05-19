import { ReactNode } from 'react';
import { CandlestickSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap, SeriesMarker, Time } from 'lightweight-charts';
export interface CandlestickSeriesProps extends CandlestickSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Candlestick'][];
    markers?: SeriesMarker<Time>[];
    reactive?: boolean;
    children?: ReactNode;
}
export declare const CandlestickSeries: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<CandlestickSeriesProps & import("react").RefAttributes<ISeriesApi<"Candlestick", Time, import("lightweight-charts").WhitespaceData<Time> | import("lightweight-charts").CandlestickData<Time>, import("lightweight-charts").CandlestickSeriesOptions, import("lightweight-charts").DeepPartial<import("lightweight-charts").CandlestickStyleOptions & import("lightweight-charts").SeriesOptionsCommon>>>>>;
