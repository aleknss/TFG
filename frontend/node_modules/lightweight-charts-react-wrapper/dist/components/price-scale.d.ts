import { ReactNode } from 'react';
import { DeepPartial, IPriceScaleApi, PriceScaleOptions } from 'lightweight-charts';
export interface PriceScaleProps extends DeepPartial<PriceScaleOptions> {
    id: string;
    children?: ReactNode;
}
export declare const PriceScale: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<PriceScaleProps & import("react").RefAttributes<IPriceScaleApi>>>;
