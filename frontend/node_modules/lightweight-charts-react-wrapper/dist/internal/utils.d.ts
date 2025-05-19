export declare function ensure<T>(value: T | null | undefined): T;
export declare function clone<T>(object: T): T;
export declare function merge(dest: Record<string, any>, source: Record<string, any>): Record<string, any>;
export interface ActionResult<T> {
    update(params: T): void;
    destroy(): void;
}
