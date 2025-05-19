import { __rest } from "tslib";
import { createChart, } from 'lightweight-charts';
import { clone, merge } from './utils.js';
export function chart(node, params) {
    var _a, _b;
    let { onClick, onCrosshairMove } = params, options = __rest(params, ["onClick", "onCrosshairMove"]);
    let width = (_a = options === null || options === void 0 ? void 0 : options.width) !== null && _a !== void 0 ? _a : 0;
    let height = (_b = options === null || options === void 0 ? void 0 : options.height) !== null && _b !== void 0 ? _b : 0;
    let destroyed = false;
    const chart = createChart(node);
    // TODO: write an issue. Chart returns live collection of options.
    const defaults = clone(chart.options());
    /*
     Following properties override series, price scale and time scale properties.
     It is undesired and uncontrolled behavior. It is better to never save them as defaults.
     */
    delete defaults.overlayPriceScales;
    delete defaults.leftPriceScale;
    delete defaults.rightPriceScale;
    delete defaults.timeScale;
    chart.applyOptions(options);
    if (onClick) {
        chart.subscribeClick(onClick);
    }
    if (onCrosshairMove) {
        chart.subscribeCrosshairMove(onCrosshairMove);
    }
    return {
        alive() {
            return !destroyed;
        },
        subject() {
            return chart;
        },
        update(nextParams) {
            var _a, _b;
            const { onClick: nextOnClick, onCrosshairMove: nextOnCrosshairMove } = nextParams, nextOptions = __rest(nextParams, ["onClick", "onCrosshairMove"]);
            if (nextOptions) {
                chart.applyOptions(merge(clone(defaults), nextOptions));
                if (nextOptions.width !== undefined && nextOptions.width !== width
                    || nextOptions.height !== undefined && nextOptions.height !== height) {
                    width = (_a = nextOptions.width) !== null && _a !== void 0 ? _a : width;
                    height = (_b = nextOptions.height) !== null && _b !== void 0 ? _b : height;
                    if (!nextOptions.autoSize) {
                        chart.resize(width, height, true);
                    }
                }
                options = nextOptions;
            }
            if (nextOnClick !== onClick) {
                if (onClick) {
                    chart.unsubscribeClick(onClick);
                }
                onClick = nextOnClick;
                if (onClick) {
                    chart.subscribeClick(onClick);
                }
            }
            if (nextOnCrosshairMove !== onCrosshairMove) {
                if (onCrosshairMove) {
                    chart.unsubscribeCrosshairMove(onCrosshairMove);
                }
                onCrosshairMove = nextOnCrosshairMove;
                if (onCrosshairMove) {
                    chart.subscribeCrosshairMove(onCrosshairMove);
                }
            }
        },
        destroy() {
            if (onClick) {
                chart.unsubscribeClick(onClick);
            }
            if (onCrosshairMove) {
                chart.unsubscribeCrosshairMove(onCrosshairMove);
            }
            chart.remove();
            destroyed = true;
        }
    };
}
