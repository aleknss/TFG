import { __rest } from "tslib";
import { clone, merge } from './utils.js';
export function timeScale(target, params) {
    let { onVisibleTimeRangeChange, onVisibleLogicalRangeChange, onSizeChange } = params, options = __rest(params, ["onVisibleTimeRangeChange", "onVisibleLogicalRangeChange", "onSizeChange"]);
    const subject = target.subject().timeScale();
    const defaults = clone(subject.options());
    subject.applyOptions(options);
    if (onVisibleTimeRangeChange) {
        subject.subscribeVisibleTimeRangeChange(onVisibleTimeRangeChange);
    }
    if (onVisibleLogicalRangeChange) {
        subject.subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChange);
    }
    if (onSizeChange) {
        subject.subscribeSizeChange(onSizeChange);
    }
    return {
        subject() {
            return subject;
        },
        update(nextParams) {
            const { onVisibleTimeRangeChange: nextOnVisibleTimeRangeChange, onVisibleLogicalRangeChange: nextOnVisibleLogicalRangeChange, onSizeChange: nextOnSizeChange } = nextParams, nextOptions = __rest(nextParams, ["onVisibleTimeRangeChange", "onVisibleLogicalRangeChange", "onSizeChange"]);
            if (nextOptions !== options) {
                /*
                  The rightOffset behaves like a command not an option.
                  It should be omitted to prevent scroll to the right edge on every render.
                 */
                const omitRightOffset = nextOptions.rightOffset === options.rightOffset;
                options = nextOptions;
                if (options) {
                    const optionsToApply = merge(clone(defaults), options);
                    if (omitRightOffset) {
                        delete optionsToApply.rightOffset;
                    }
                    subject.applyOptions(optionsToApply);
                }
            }
            if (nextOnVisibleTimeRangeChange !== onVisibleTimeRangeChange) {
                if (onVisibleTimeRangeChange) {
                    subject.unsubscribeVisibleTimeRangeChange(onVisibleTimeRangeChange);
                }
                onVisibleTimeRangeChange = nextOnVisibleTimeRangeChange;
                if (onVisibleTimeRangeChange) {
                    subject.subscribeVisibleTimeRangeChange(onVisibleTimeRangeChange);
                }
            }
            if (nextOnVisibleLogicalRangeChange !== onVisibleLogicalRangeChange) {
                if (onVisibleLogicalRangeChange) {
                    subject.unsubscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChange);
                }
                onVisibleLogicalRangeChange = nextOnVisibleLogicalRangeChange;
                if (onVisibleLogicalRangeChange) {
                    subject.subscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChange);
                }
            }
            if (nextOnSizeChange !== onSizeChange) {
                if (onSizeChange) {
                    subject.unsubscribeSizeChange(onSizeChange);
                }
                onSizeChange = nextOnSizeChange;
                if (onSizeChange) {
                    subject.subscribeSizeChange(onSizeChange);
                }
            }
        },
        destroy() {
            if (onVisibleTimeRangeChange) {
                subject.unsubscribeVisibleTimeRangeChange(onVisibleTimeRangeChange);
            }
            if (onVisibleLogicalRangeChange) {
                subject.unsubscribeVisibleLogicalRangeChange(onVisibleLogicalRangeChange);
            }
            if (onSizeChange) {
                subject.unsubscribeSizeChange(onSizeChange);
            }
        }
    };
}
