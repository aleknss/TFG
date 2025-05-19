import { __rest } from "tslib";
import { forwardRef, memo, useContext, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { createLazyValue } from '../internal/lazy-value.js';
import { priceScale } from '../internal/price-scale.js';
import { ChartContext } from './internal/chart-context.js';
export const PriceScale = memo(forwardRef(function PriceScale(props, ref) {
    usePriceScaleAction(props, ref);
    return null;
}));
function usePriceScaleAction(props, ref) {
    const { children } = props, rest = __rest(props, ["children"]);
    const chart = useContext(ChartContext);
    const context = useRef(createLazyValue(() => priceScale(chart(), rest), (value) => value.destroy()));
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
