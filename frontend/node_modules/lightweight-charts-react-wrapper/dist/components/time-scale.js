import { __rest } from "tslib";
import { forwardRef, memo, useContext, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { createLazyValue } from '../internal/lazy-value.js';
import { ChartContext } from './internal/chart-context.js';
import { timeScale } from '../internal/time-scale.js';
export const TimeScale = memo(forwardRef(function TimeScale(props, ref) {
    useTimeScaleAction(props, ref);
    return null;
}));
function useTimeScaleAction(props, ref) {
    const { children } = props, rest = __rest(props, ["children"]);
    const chart = useContext(ChartContext);
    const context = useRef(createLazyValue(() => timeScale(chart(), rest), (value) => value.destroy()));
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
