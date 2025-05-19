import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo, } from 'react';
import { SeriesContext } from './internal/series-context.js';
import { createSeriesHook } from './internal/create-series-hook.js';
const useCandlestickSeriesAction = createSeriesHook('Candlestick');
export const CandlestickSeries = memo(forwardRef(function CandlestickSeries(props, ref) {
    const { children } = props, rest = __rest(props, ["children"]);
    const context = useCandlestickSeriesAction(rest, ref);
    return (_jsx(SeriesContext.Provider, Object.assign({ value: context.current }, { children: children })));
}));
