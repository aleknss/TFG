import { ReactNode } from 'react';
import { AreaSeriesPartialOptions, ISeriesApi, SeriesDataItemTypeMap, SeriesMarker, Time } from 'lightweight-charts';
export interface AreaSeriesProps extends AreaSeriesPartialOptions {
    data: SeriesDataItemTypeMap['Area'][];
    markers?: SeriesMarker<Time>[];
    reactive?: boolean;
    children?: ReactNode;
}
export declare const AreaSeries: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<AreaSeriesProps & import("react").RefAttributes<ISeriesApi<"Area", Time, import("lightweight-charts").AreaData<Time> | import("lightweight-charts").WhitespaceData<Time>, import("lightweight-charts").AreaSeriesOptions, import("lightweight-charts").DeepPartial<import("lightweight-charts").AreaStyleOptions & import("lightweight-charts").SeriesOptionsCommon>>>>>;
