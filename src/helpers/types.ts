import { Widget } from "./interface";

export type AnyObj = Record<string, any>;
export type DefinitionFn<T = unknown> = (widget: Widget, pageData?: any) => T | Promise<T>;
export type Definitions<T = unknown> = Record<string, DefinitionFn<T>>;