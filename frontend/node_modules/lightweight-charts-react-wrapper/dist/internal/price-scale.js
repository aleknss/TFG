import { __rest } from "tslib";
import { clone, merge } from './utils.js';
export function priceScale(target, params) {
    let { id } = params, options = __rest(params, ["id"]);
    let subject = target.subject().priceScale(id);
    const defaults = clone(subject.options());
    subject.applyOptions(options);
    return {
        subject() {
            return subject;
        },
        update(nextParams) {
            const { id: nextId } = nextParams, nextOptions = __rest(nextParams, ["id"]);
            if (nextId !== id) {
                id = nextId;
                subject = target.subject().priceScale(id);
            }
            if (nextOptions !== options) {
                options = nextOptions;
                if (options) {
                    subject.applyOptions(merge(clone(defaults), options));
                }
            }
        },
        destroy() {
        }
    };
}
