import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

import * as d_in from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/to_be_generated/unmarshalled"
import * as d_function from "../../../../interface/to_be_generated/unmarshall"

export const Dictionary = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.Dictionary => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'dictionary': return _p.ss($, ($) => _p.dictionary.from.list(
                    $.entries,
                ).convert(
                    ($) => $.id.value,
                    ($) => $.value.__decide(
                        ($) => $.value,
                        () => abort(['expected a dictionary', null])
                    ),
                    {
                        duplicate_id: () => abort(['expected a dictionary', null])
                    },
                ))
                default: return abort(['expected a dictionary', null])
            }
        }))
        default: return abort(['expected a dictionary', null])
    }
})

export const Group = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.Group => _p.decide.state($.type, ($) => {
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
                                () => abort(['expected a group', null])
                            ),
                            {
                                duplicate_id: () => abort(['expected a group', null])
                            },
                        ))
                        default: return abort(['expected a group', null])
                    }
                }))
                default: return abort(['expected a group', null])
            }
        }))
        default: return abort(['expected a group', null])
    }
})

export const List = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.List => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'list': return _p.ss($, ($) => $.items.__l_map(($) => $.value))
                default: return abort(['expected a list', null])
            }
        }))
        default: return abort(['expected a list', null])
    }
})

export const Nothing = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.Nothing => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'nothing': return _p.ss($, ($) => null)
                default: return abort(['expected a nothing', null])
            }
        }))
        default: return abort(['expected a nothing', null])
    }
})

export const Optional = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.Optional => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'nothing': return _p.ss($, ($) => _p.optional.literal.not_set())
                case 'optional': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'set': return _p.ss($, ($) => _p.optional.literal.set($.value))
                        default: return abort(['expected an optional', null])
                    }
                }))
                default: return abort(['expected an optional', null])
            }
        }))
        default: return abort(['expected an optional', null])
    }
})

export const State = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.State => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'state': return _p.ss($, ($) => _p.decide.state($.status, ($) => {
                    switch ($[0]) {
                        case 'set': return _p.ss($, ($) => $)
                        default: return abort(['expected a state', null])
                    }
                }))
                default: return abort(['expected a state', null])
            }
        }))
        default: return abort(['expected a state', null])
    }
})

export const Text = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.Text => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'text': return _p.ss($, ($) => $.value)
                default: return abort(['expected a text', null])
            }
        }))
        default: return abort(['expected a text', null])
    }
})