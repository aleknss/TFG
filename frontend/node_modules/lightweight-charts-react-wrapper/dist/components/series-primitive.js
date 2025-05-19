import { memo, useContext, useLayoutEffect, useRef } from 'react';
import { seriesPrimitive } from '../internal/series-primitive.js';
import { SeriesContext } from './internal/series-context.js';
import { createLazyValue } from '../internal/lazy-value.js';
export const SeriesPrimitive = memo(function SeriesPrimitive(props) {
    useSeriesPrimitive(props);
    return null;
});
function useSeriesPrimitive(props) {
    const series = useContext(SeriesContext);
    const context = useRef(createLazyValue(() => seriesPrimitive(series(), props), (value) => value.destroy()));
    useLayoutEffect(() => {
        context.current();
        return () => {
            context.current.reset();
        };
    }, []);
    useLayoutEffect(() => {
        context.current().update(props);
    }, [props]);
    return context;
}
