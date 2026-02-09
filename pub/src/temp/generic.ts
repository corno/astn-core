import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

import * as d_parse_tree from "../interface/generated/liana/schemas/parse_tree/data"

export const expect_dictionary = (
    $: d_parse_tree.Value,
    abort: _pi.Abort<null>
): _pi.Dictionary<d_parse_tree.Value> => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'dictionary': return _p.ss($, ($) => _p.dictionary.from.list(
                    $.entries,
                ).convert(
                    ($) => $.id.value,
                    ($) => $.value.__decide(
                        ($) => $.value,
                        () => abort(null)
                    ),
                    {
                        duplicate_id: () => abort(null)
                    },
                ))
                default: return abort(null)
            }
        }))
        default: return abort(null)
    }
})

export const expect_group = (
    $: d_parse_tree.Value,
    abort: _pi.Abort<null>
): _pi.Dictionary<d_parse_tree.Value> => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'group': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        // case 'concise':
                        case 'verbose': return _p.ss($, ($) => _p.dictionary.from.list(
                            $.entries,
                        ).convert(
                            ($) => $.id.value,
                            ($) => $.value.__decide(
                                ($) => $.value,
                                () => abort(null)
                            ),
                            {
                                duplicate_id: () => abort(null)
                            },
                        ))
                        default: return abort(null)
                    }
                }))
                default: return abort(null)
            }
        }))
        default: return abort(null)
    }
})

export const expect_list = (
    $: d_parse_tree.Value,
    abort: _pi.Abort<null>
): _pi.List<d_parse_tree.Value> => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'list': return _p.ss($, ($) => $.items.__l_map(($) => $.value))
                default: return abort(null)
            }
        }))
        default: return abort(null)
    }
})

export const expect_nothing = (
    $: d_parse_tree.Value,
    abort: _pi.Abort<null>
): null => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'nothing': return _p.ss($, ($) => null)
                default: return abort(null)
            }
        }))
        default: return abort(null)
    }
})

export const expect_optional = (
    $: d_parse_tree.Value,
    abort: _pi.Abort<null>
): _pi.Optional_Value<d_parse_tree.Value> => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'nothing': return _p.ss($, ($) => _p.optional.literal.not_set())
                case 'optional': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'set': return _p.ss($, ($) => _p.optional.literal.set($.value))
                        default: return abort(null)
                    }
                }))
                default: return abort(null)
            }
        }))
        default: return abort(null)
    }
})

export const expect_state = (
    $: d_parse_tree.Value,
    abort: _pi.Abort<null>
): d_parse_tree.Value.type_.concrete.state.status.set_ => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'state': return _p.ss($, ($) => _p.decide.state($.status, ($) => {
                    switch ($[0]) {
                        case 'set': return _p.ss($, ($) => $)
                        default: return abort(null)
                    }
                }))
                default: return abort(null)
            }
        }))
        default: return abort(null)
    }
})

export const expect_text = (
    $: d_parse_tree.Value,
    abort: _pi.Abort<null>
): string => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'text': return _p.ss($, ($) => $.value)
                default: return abort(null)
            }
        }))
        default: return abort(null)
    }
})