import { ForwardedRef, ReactNode } from 'react';
import { CustomSeriesOptions, ICustomSeriesPaneView, ISeriesApi, SeriesDataItemTypeMap, SeriesMarker, SeriesPartialOptions, Time } from 'lightweight-charts';
export declare type CustomSeriesProps<T extends CustomSeriesOptions = CustomSeriesOptions> = SeriesPartialOptions<T> & {
    view: ICustomSeriesPaneView<Time, SeriesDataItemTypeMap['Custom'], T>;
    data: SeriesDataItemTypeMap['Custom'][];
    markers?: SeriesMarker<Time>[];
    reactive?: boolean;
    children?: ReactNode;
};
export declare const CustomSeries: <T extends CustomSeriesOptions>(props: CustomSeriesProps<T>, ref: ForwardedRef<ISeriesApi<'Custom'>>) => JSX.Element;
