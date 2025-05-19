import { __rest } from "tslib";
export function seriesPrimitive(target, params) {
    let { view } = params, options = __rest(params, ["view"]);
    view.applyOptions(options);
    target.subject().attachPrimitive(view);
    return {
        update(nextParams) {
            const { view: nextView } = nextParams, nextOptions = __rest(nextParams, ["view"]);
            if (nextView !== view) {
                target.subject().detachPrimitive(view);
                view = nextView;
                options = nextOptions;
                view.applyOptions(options);
                target.subject().attachPrimitive(view);
            }
            else {
                options = nextOptions;
                view.applyOptions(options);
            }
        },
        destroy() {
            target.subject().detachPrimitive(view);
        }
    };
}
