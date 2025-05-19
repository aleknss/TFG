export declare type LazyValue<T> = {
    (): T;
    reset(): void;
};
export declare function createLazyValue<T>(init: () => T, reset: (value: T) => void): LazyValue<T>;
