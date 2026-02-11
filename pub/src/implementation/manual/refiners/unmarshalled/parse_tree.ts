import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'

import * as d_in from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/to_be_generated/unmarshalled"
import * as d_function from "../../../../interface/to_be_generated/unmarshall"

//dependencies
import * as t_parse_tree_to_location from "../../transformers/parse_tree/location"

export const Dictionary = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.Dictionary => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'dictionary': return _p.ss($, ($) => _p.dictionary.from.list(
                        $.entries,
                    ).convert(
                        ($) => $.id.value,
                        ($) => $.value.__decide(
                            ($) => $.value,
                            () => abort({
                                'type': ['entry missing', null],
                                'range': t_parse_tree_to_location.Value(value),
                            })
                        ),
                        {
                            duplicate_id: ($) => abort({
                                'type': ['duplicate entry', $],
                                'range': t_parse_tree_to_location.Value(value),
                            })
                        },
                    ))
                    default: return abort({
                        'type': ['wrong value type', {
                            'expected': ['dictionary', null],
                        }],
                        'range': t_parse_tree_to_location.Value(value),
                    })
                }
            }))
            default: return abort({
                'type': ['wrong value type', {
                    'expected': ['dictionary', null],
                }],
                'range': t_parse_tree_to_location.Value(value),
            })
        }
    })
}

export const Group = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.Group => {
    const value = $
    return _p.decide.state($.type, ($) => {
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
                                    () => abort({
                                        'type': ['wrong value type', {
                                            'expected': ['group', null],
                                        }],
                                        'range': t_parse_tree_to_location.Value(value),
                                    })
                                ),
                                {
                                    duplicate_id: ($) => abort({
                                        'type': ['duplicate entry', $],
                                        'range': t_parse_tree_to_location.Value(value),
                                    })
                                },
                            ))
                            default: return abort({
                                'type': ['wrong value type', {
                                    'expected': ['group', null],
                                }],
                                'range': t_parse_tree_to_location.Value(value),
                            })
                        }
                    }))
                    default: return abort({
                        'type': ['wrong value type', {
                            'expected': ['group', null],
                        }],
                        'range': t_parse_tree_to_location.Value(value),
                    })
                }
            }))
            default: return abort({
                'type': ['wrong value type', {
                    'expected': ['group', null],
                }],
                'range': t_parse_tree_to_location.Value(value),
            })
        }
    })
}

export const List = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.List => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'list': return _p.ss($, ($) => $.items.__l_map(($) => $.value))
                    default: return abort({
                        'type': ['wrong value type', {
                            'expected': ['list', null],
                        }],
                        'range': t_parse_tree_to_location.Value(value),
                    })
                }
            }))
            default: return abort({
                'type': ['wrong value type', {
                    'expected': ['list', null],
                }],
                'range': t_parse_tree_to_location.Value(value),
            })
        }
    })
}

export const Nothing = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.Nothing => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'nothing': return _p.ss($, ($) => null)
                    default: return abort({
                        'type': ['wrong value type', {
                            'expected': ['nothing', null],
                        }],
                        'range': t_parse_tree_to_location.Value(value),
                    })
                }
            }))
            default: return abort({
                'type': ['wrong value type', {
                    'expected': ['nothing', null],
                }],
                'range': t_parse_tree_to_location.Value(value),
            })
        }
    })
}

export const Optional = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.Optional => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'nothing': return _p.ss($, ($) => _p.optional.literal.not_set())
                    case 'optional': return _p.ss($, ($) => _p.decide.state($, ($) => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($) => _p.optional.literal.set($.value))
                            default: return abort({
                                'type': ['wrong value type', {
                                    'expected': ['optional', null],
                                }],
                                'range': t_parse_tree_to_location.Value(value),
                            })
                        }
                    }))
                    default: return abort({
                        'type': ['wrong value type', {
                            'expected': ['optional', null],
                        }],
                        'range': t_parse_tree_to_location.Value(value),
                    })
                }
            }))
            default: return abort({
                'type': ['wrong value type', {
                    'expected': ['optional', null],
                }],
                'range': t_parse_tree_to_location.Value(value),
            })
        }
    })
}

export const State = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.State => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'state': return _p.ss($, ($) => _p.decide.state($.status, ($) => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($) => $)
                            default: return abort({
                                'type': ['wrong value type', {
                                    'expected': ['state', null],
                                }],
                                'range': t_parse_tree_to_location.Value(value),
                            })
                        }
                    }))
                    default: return abort({
                        'type': ['wrong value type', {
                            'expected': ['state', null],
                        }],
                        'range': t_parse_tree_to_location.Value(value),
                    })
                }
            }))
            default: return abort({
                'type': ['wrong value type', {
                    'expected': ['state', null],
                }],
                'range': t_parse_tree_to_location.Value(value),
            })
        }
    })
}

export const Text = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.Text => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'text': return _p.ss($, ($) => $.value)
                    default: return abort({
                        'type': ['wrong value type', {
                            'expected': ['text', null],
                        }],
                        'range': t_parse_tree_to_location.Value(value),
                    })
                }
            }))
            default: return abort({
                'type': ['wrong value type', {
                    'expected': ['text', null],
                }],
                'range': t_parse_tree_to_location.Value(value),
            })
        }
    })
}