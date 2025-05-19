import { ChartActionResult } from '../../internal/chart.js';
export declare type ChartContextValue = null | (() => ChartActionResult);
export declare const ChartContext: import("react").Context<ChartContextValue>;
