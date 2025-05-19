import { SeriesActionParams, SeriesActionResult } from '../../internal/series.js';
export declare type SeriesContextValue = null | (() => SeriesActionResult<SeriesActionParams>);
export declare const SeriesContext: import("react").Context<SeriesContextValue>;
