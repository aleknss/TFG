import { useContext, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { ChartContext } from './chart-context.js';
import { createLazyValue } from '../../internal/lazy-value.js';
import { series } from '../../internal/series.js';
export function createSeriesHook(type, deps) {
    return (props, ref) => {
        const chart = useContext(ChartContext);
        const context = useRef(createLazyValue(() => series(chart(), Object.assign(Object.assign({}, props), { type })), (value) => value.destroy()));
        useLayoutEffect(() => {
            context.current();
            return () => {
                context.current.reset();
            };
        }, []);
        useLayoutEffect(() => {
            context.current().update(Object.assign(Object.assign({}, props), { type: type }));
        }, [props]);
        useImperativeHandle(ref, () => context.current().subject(), deps ? deps(props) : []);
        return context;
    };
}
