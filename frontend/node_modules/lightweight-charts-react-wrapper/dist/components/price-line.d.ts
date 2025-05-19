import { ReactNode } from 'react';
import { IPriceLine, CreatePriceLineOptions } from 'lightweight-charts';
export interface PriceLineProps extends CreatePriceLineOptions {
    children?: ReactNode;
}
export declare const PriceLine: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<PriceLineProps & import("react").RefAttributes<IPriceLine>>>;
