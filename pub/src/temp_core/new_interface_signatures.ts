import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

export type Iterator<Iterator_Element, Choice> = {
    'list': <List_Element, Out>(
        end_reached: ($: Iterator_Element) => boolean,
        handle: () => List_Element,
        wrap_up: (list: _pi.List<List_Element>) => Out,
    ) => Out,
    'expect': <T>(
        expected: Choice[],
        callback: (token: Iterator_Element, abort: () => never) => T,
    ) => T
    'consume': <T>(
        callback: (token: Iterator_Element) => T,
    ) => T
}

export type Production<Result, Iterator_Element, Choice, Parameters> = (iterator: Iterator<Iterator_Element, Choice>, parameters: Parameters) => Result

export type Production_Without_Parameters<Result, Iterator_Element, Choice> = (iterator: Iterator<Iterator_Element, Choice>) => Result

