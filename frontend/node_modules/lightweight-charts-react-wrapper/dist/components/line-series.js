import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo, } from 'react';
import { SeriesContext } from './internal/series-context.js';
import { createSeriesHook } from './internal/create-series-hook.js';
const useLineSeriesAction = createSeriesHook('Line');
export const LineSeries = memo(forwardRef(function LineSeries(props, ref) {
    const { children } = props, rest = __rest(props, ["children"]);
    const context = useLineSeriesAction(rest, ref);
    return (_jsx(SeriesContext.Provider, Object.assign({ value: context.current }, { children: children })));
}));
