import { ReactNode } from 'react';
import { BaselineSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap, SeriesMarker, Time } from 'lightweight-charts';
export interface BaselineSeriesProps extends BaselineSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Baseline'][];
    markers?: SeriesMarker<Time>[];
    reactive?: boolean;
    children?: ReactNode;
}
export declare const BaselineSeries: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<BaselineSeriesProps & import("react").RefAttributes<ISeriesApi<"Baseline", Time, import("lightweight-charts").WhitespaceData<Time> | import("lightweight-charts").BaselineData<Time>, import("lightweight-charts").BaselineSeriesOptions, import("lightweight-charts").DeepPartial<import("lightweight-charts").BaselineStyleOptions & import("lightweight-charts").SeriesOptionsCommon>>>>>;
