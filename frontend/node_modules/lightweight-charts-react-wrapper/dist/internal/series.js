import { __rest } from "tslib";
import { clone, merge } from './utils.js';
export function series(target, params) {
    var _a;
    const emptyMarkers = [];
    let [subject, defaults] = createSeries(target.subject(), params);
    let data = params.reactive ? params.data : null;
    let markers = (_a = params.markers) !== null && _a !== void 0 ? _a : emptyMarkers;
    let view = params.type === 'Custom' ? params.view : null;
    let destroyed = false;
    // Never use shorthand properties as default values
    delete defaults.borderColor;
    delete defaults.wickColor;
    subject.setMarkers(markers);
    return {
        alive() {
            return !destroyed;
        },
        subject() {
            return subject;
        },
        update(nextParams) {
            const { type: nextType, data: nextData, markers: nextMarkers = emptyMarkers, reactive: nextReactive, } = nextParams;
            if (nextType !== subject.seriesType()) {
                throw new TypeError('Can not change type of series in runtime. Report a bug please');
            }
            if (nextParams.type === 'Custom' && subject.seriesType() === 'Custom' && nextParams.view !== view) {
                target.subject().removeSeries(subject);
                [subject, defaults] = createSeries(target.subject(), nextParams);
                view = nextParams.view;
                return;
            }
            subject.applyOptions(merge(clone(defaults), omit(nextParams)));
            if (!nextReactive) {
                data = null;
            }
            if (nextData !== data && nextReactive) {
                data = nextData;
                subject.setData(data);
            }
            if (nextMarkers !== markers) {
                markers = nextMarkers;
                subject.setMarkers(markers);
            }
        },
        destroy() {
            if (target.alive()) {
                target.subject().removeSeries(subject);
            }
            destroyed = true;
        }
    };
}
function createSeries(chart, params) {
    switch (params.type) {
        case 'Area': {
            const series = chart.addAreaSeries();
            const defaults = clone(series.options());
            series.applyOptions(omit(params));
            series.setData(params.data);
            return [series, defaults];
        }
        case 'Bar': {
            const series = chart.addBarSeries();
            const defaults = clone(series.options());
            series.applyOptions(omit(params));
            series.setData(params.data);
            return [series, defaults];
        }
        case 'Candlestick': {
            const series = chart.addCandlestickSeries();
            const defaults = clone(series.options());
            series.applyOptions(omit(params));
            series.setData(params.data);
            return [series, defaults];
        }
        case 'Histogram': {
            const series = chart.addHistogramSeries();
            const defaults = clone(series.options());
            series.applyOptions(omit(params));
            series.setData(params.data);
            return [series, defaults];
        }
        case 'Line': {
            const series = chart.addLineSeries();
            const defaults = clone(series.options());
            series.applyOptions(omit(params));
            series.setData(params.data);
            return [series, defaults];
        }
        case 'Baseline': {
            const series = chart.addBaselineSeries();
            const defaults = clone(series.options());
            series.applyOptions(omit(params));
            series.setData(params.data);
            return [series, defaults];
        }
        case 'Custom': {
            const series = chart.addCustomSeries(params.view);
            const defaults = clone(series.options());
            series.applyOptions(omit(params));
            series.setData(params.data);
            return [series, defaults];
        }
    }
}
function omit(params) {
    const { reactive, data, type, view } = params, rest = __rest(params, ["reactive", "data", "type", "view"]);
    return rest;
}
