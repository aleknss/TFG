import { ISeriesApi } from 'lightweight-charts';
import { ForwardedRef } from 'react';
import { SeriesActionParams, SeriesActionResult } from '../../internal/series.js';
export declare function createSeriesHook<T extends SeriesActionParams>(type: T['type'], deps?: (props: Omit<T, 'type'>) => unknown[]): (props: Omit<T, 'type'>, ref: ForwardedRef<ISeriesApi<T['type']>>) => import("react").MutableRefObject<import("../../internal/lazy-value.js").LazyValue<SeriesActionResult<T>>>;
