// code for https://www.learningtypescript.com/type-operations/array-type-shenanigans/
// 把类型当作数据进行处理, 可以实现很简短的小功能

// 展开数组内容并过滤, 仅保留Filter的子类型
export type FilteredArrayItems<T, Filter> = T extends (infer Item)[] 
    ? Item extends Filter ? FilteredArrayItems<Item, Filter> : never
    : T extends Filter ? T : never;

// 数组反转
export type Reverse<T extends Array<any>> = T extends [infer U, ...infer Rest] ? [...Reverse<Rest>, U] : T;

// Zip功能
export type Zip<T extends any[], U extends any[]> = 
    T extends [infer firstT, ...infer restT] ? 
        U extends [infer firstU, ...infer restU] ?
        [firstT, firstU, ...Zip<restT, restU>] 
        : [...T]
    : U;

// 简接大小写调整
export type SpOnGeCaSe<
    Text,
    FirstTransform extends "upper" | "lower" = "upper"
> = Text extends `${infer First}${infer Rest}` ? 
        FirstTransform extends "upper" ? 
        `${Capitalize<First>}${SpOnGeCaSe<Rest, "lower">}` : 
        `${Lowercase<First>}${SpOnGeCaSe<Rest, "upper">}` : 
    Text;

// Split
export type SplitOn<Text extends string, On extends string> = 
    Text extends `${infer Before}${On}${infer After}` ?
        [Before, ...SplitOn<After, On>] :
        [Text]

// Replace Substring
export type WordReplace<Text extends string, Original extends string, Replacement extends string>
    = Text extends `${infer Prefix}${Original}${infer Suffix}` ?
        WordReplace<`${Prefix}${Replacement}${Suffix}`, Original, Replacement> :
        Text;
