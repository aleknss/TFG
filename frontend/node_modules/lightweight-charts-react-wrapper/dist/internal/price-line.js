import { clone, merge } from './utils.js';
export function priceLine(target, params) {
    // TODO: this works well but throw in dev mode if price is not provided
    const subject = target.subject().createPriceLine({ price: 0 });
    const defaults = clone(subject.options());
    subject.applyOptions(params);
    return {
        subject() {
            return subject;
        },
        update(nextParams) {
            if (nextParams) {
                subject.applyOptions(merge(clone(defaults), nextParams));
            }
        },
        destroy() {
            if (target.alive()) {
                target.subject().removePriceLine(subject);
            }
        }
    };
}
