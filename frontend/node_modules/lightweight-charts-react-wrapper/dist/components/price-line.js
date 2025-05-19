import { __rest } from "tslib";
import { forwardRef, memo, useContext, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { createLazyValue } from '../internal/lazy-value.js';
import { priceLine } from '../internal/price-line.js';
import { SeriesContext } from './internal/series-context.js';
export const PriceLine = memo(forwardRef(function PriceLine(props, ref) {
    usePriceLineAction(props, ref);
    return null;
}));
function usePriceLineAction(props, ref) {
    const { children } = props, rest = __rest(props, ["children"]);
    const series = useContext(SeriesContext);
    const context = useRef(createLazyValue(() => priceLine(series(), rest), (value) => value.destroy()));
    useLayoutEffect(() => {
        context.current();
        return () => {
            context.current.reset();
        };
    }, []);
    useLayoutEffect(() => {
        context.current().update(rest);
    }, [rest]);
    useImperativeHandle(ref, () => context.current().subject(), []);
    return context;
}
