import { ISeriesApi, SeriesDataItemTypeMap, AreaSeriesPartialOptions, BarSeriesPartialOptions, CandlestickSeriesPartialOptions, HistogramSeriesPartialOptions, LineSeriesPartialOptions, BaselineSeriesPartialOptions, CustomSeriesPartialOptions, SeriesOptionsMap, SeriesMarker, Time, ICustomSeriesPaneView } from 'lightweight-charts';
import { ActionResult } from './utils.js';
import { ChartActionResult } from './chart.js';
export interface AreaSeriesParams extends AreaSeriesPartialOptions {
    type: 'Area';
    reactive?: boolean;
    data: SeriesDataItemTypeMap['Area'][];
    markers?: SeriesMarker<Time>[];
}
export interface BarSeriesParams extends BarSeriesPartialOptions {
    type: 'Bar';
    reactive?: boolean;
    data: SeriesDataItemTypeMap['Bar'][];
    markers?: SeriesMarker<Time>[];
}
export interface CandlestickSeriesParams extends CandlestickSeriesPartialOptions {
    type: 'Candlestick';
    reactive?: boolean;
    data: SeriesDataItemTypeMap['Candlestick'][];
    markers?: SeriesMarker<Time>[];
}
export interface HistogramSeriesParams extends HistogramSeriesPartialOptions {
    type: 'Histogram';
    reactive?: boolean;
    data: SeriesDataItemTypeMap['Histogram'][];
    markers?: SeriesMarker<Time>[];
}
export interface LineSeriesParams extends LineSeriesPartialOptions {
    type: 'Line';
    reactive?: boolean;
    data: SeriesDataItemTypeMap['Line'][];
    markers?: SeriesMarker<Time>[];
}
export interface BaselineSeriesParams extends BaselineSeriesPartialOptions {
    type: 'Baseline';
    reactive?: boolean;
    data: SeriesDataItemTypeMap['Baseline'][];
    markers?: SeriesMarker<Time>[];
}
export interface CustomSeriesParams extends CustomSeriesPartialOptions {
    type: 'Custom';
    reactive?: boolean;
    view: ICustomSeriesPaneView<Time, SeriesDataItemTypeMap['Custom'], SeriesOptionsMap['Custom']>;
    data: SeriesDataItemTypeMap['Custom'][];
    markers?: SeriesMarker<Time>[];
}
export declare type SeriesActionParams = AreaSeriesParams | BarSeriesParams | CandlestickSeriesParams | HistogramSeriesParams | LineSeriesParams | BaselineSeriesParams | CustomSeriesParams;
export declare type SeriesActionResult<T extends SeriesActionParams> = ActionResult<T> & {
    subject(): ISeriesApi<T['type']>;
    alive(): boolean;
};
export declare function series<T extends SeriesActionParams>(target: ChartActionResult, params: T): SeriesActionResult<T>;
