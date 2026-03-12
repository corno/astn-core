import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'

import * as new_pi from "./new_interface_signatures"

export const create_iterator = <Iterator_Element, Choice, End_Info>(
    old: _pi.Iterator<Iterator_Element>,
    abort: {
        unexpected_element: (expected: _pi.List<Choice>, element: Iterator_Element, position: number) => never,
        unexpected_end_with_expected: (expected: _pi.List<Choice>) => never,
        unguarded_unexpected_end: () => never,
    },
    end_info: End_Info,
): new_pi.Iterator<Iterator_Element, Choice, End_Info> => ({
    consume: (
        callback,
    ) => callback(old.consume(
        ($) => $,
        {
            no_more_tokens: () => abort.unguarded_unexpected_end()
        }
    )),
    expect: (
        expected,
        callback,
    ) => {
        const next = old.look()
        if (next === null) {
            return abort.unexpected_end_with_expected(_p.list.literal(expected))
        }
        return callback(
            next[0],
            () => abort.unexpected_element(
                _p.list.literal(expected),
                next[0],
                old.get_position()
            )
        )

    },
    list: <List_Element, Out>(
        has_more_elements: ($: Iterator_Element) => boolean,
        handle: ($: Iterator_Element) => List_Element,
        wrap_up: (list: _pi.List<List_Element>) => Out,
    ): Out => {
        return wrap_up(_p_list_build_deprecated<List_Element>(($i) => {
            while (true) {
                const next_element = old.look()
                if (next_element === null) {
                    return
                } else if (!has_more_elements(next_element[0])) {
                    return
                } else {
                    $i['add item'](handle(next_element[0]))
                }
            }
        }))
    },
    get_end_info: () => end_info
})