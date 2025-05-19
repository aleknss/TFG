export function createLazyValue(init, reset) {
    let subject = null;
    const getter = () => {
        if (subject === null) {
            subject = init();
        }
        return subject;
    };
    getter.reset = () => {
        if (subject !== null) {
            reset(subject);
        }
        subject = null;
    };
    return getter;
}
