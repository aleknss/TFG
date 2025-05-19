import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo, useCallback, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { ChartContext } from './internal/chart-context.js';
import { createLazyValue } from '../internal/lazy-value.js';
import { chart } from '../internal/chart.js';
export const Chart = memo(forwardRef(function Chart(props, ref) {
    const { container = {} } = props, rest = __rest(props, ["container"]);
    const { ref: containerRef } = container, restContainer = __rest(container, ["ref"]);
    const [element, setElement] = useState(null);
    const handleContainerRef = useCallback((ref) => {
        setElement(ref);
        if (containerRef) {
            if (typeof containerRef === 'function') {
                containerRef(ref);
            }
            else {
                containerRef.current = ref;
            }
        }
    }, [containerRef]);
    const style = Object.assign({ height: !props.autoSize && props.height !== undefined ? props.height + 'px' : undefined, width: !props.autoSize && props.width !== undefined ? props.width + 'px' : undefined }, container.style);
    return (_jsx("div", Object.assign({ ref: handleContainerRef }, restContainer, { style: style }, { children: element !== null ? _jsx(ChartComponent, Object.assign({}, rest, { ref: ref, container: element })) : null })));
}));
const ChartComponent = memo(forwardRef(function ChartComponent(props, ref) {
    const { children } = props;
    const context = useChartAction(props, ref);
    return (_jsx(ChartContext.Provider, Object.assign({ value: context.current }, { children: children })));
}));
function useChartAction(props, ref) {
    const { children, container } = props, rest = __rest(props, ["children", "container"]);
    const context = useRef(createLazyValue(() => chart(container, rest), (value) => value.destroy()));
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
