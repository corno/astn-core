import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/assign'
import _p_assert from 'pareto-core/dist/_p_assert'

import * as d_in from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/to_be_generated/unmarshalled"
import * as d_function from "../../../../interface/to_be_generated/unmarshall"

import * as d_location from "../../../../interface/generated/liana/schemas/location/data"

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
                    case 'dictionary': return _p.ss($, ($): d_out.Dictionary => ({
                        'value': value,
                        'entries': _p.dictionary.from.list(
                            $.entries,
                        ).convert(
                            ($) => $.id.value,
                            ($) => $,
                            {
                                duplicate_id: ($) => abort({
                                    'type': ['dictionary', ['duplicate entry', $]],
                                    'range': t_parse_tree_to_location.Value(value),
                                })
                            },
                        )
                    }))
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

export const List = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>
): d_out.List => {
    const value = $
    return _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'list': return _p.ss($, ($) => ({
                        'value': value,
                        'items': $.items
                    }))
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
                    case 'nothing': return _p.ss($, ($) => ({
                        'value': value,
                        'null': null
                    }))
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
                    case 'nothing': return _p.ss($, ($) => ({
                        'value': value,
                        'optional': _p.optional.literal.not_set()
                    }))
                    case 'optional': return _p.ss($, ($) => _p.decide.state($, ($) => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($) => ({
                                'value': value,
                                'optional': _p.optional.literal.set($.value)
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

export const Property = (
    $: d_out.Verbose_Group,
    abort: _pi.Abort<d_function.Error>,
    $p: {
        'id': string
    }
): d_out.Property => {
    const value = $
    return _p.select.entry(
        $.properties,
        $p.id,
        {
            no_such_entry: ($) => abort({
                'range': t_parse_tree_to_location.Value(value.value),
                'type': ['type', ['missing property', $p.id]]
            })
        }
    )
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
                    case 'text': return _p.ss($, ($) => $)
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

export const Verbose_Group = (
    $: d_in.Value,
    abort: _pi.Abort<d_function.Error>,
    $p: {
        'expected properties': _pi.Dictionary<null>
    }
): d_out.Verbose_Group => {
    const value = $
    return {
        'value': $,
        'properties': _p.decide.state($.type, ($) => {
            switch ($[0]) {
                case 'concrete': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'group': return _p.ss($, ($) => _p.decide.state($, ($) => {
                            switch ($[0]) {
                                // case 'concise':
                                case 'verbose': return _p.ss($, ($) => {
                                    const xxx = _p.dictionary.from.list(
                                        $.entries,
                                    ).convert(
                                        ($) => $.id.value,
                                        ($) => $,
                                        {
                                            duplicate_id: ($) => abort({
                                                'type': ['type', ['duplicate property', $]],
                                                'range': t_parse_tree_to_location.Value(value),
                                            })
                                        },
                                    )

                                    const unexpected_properties = _p.dictionary.from.dictionary(
                                        _p.dictionary.from.dictionary(
                                            xxx,
                                        ).join(
                                            $p['expected properties'],
                                            ($, other, id): _pi.Optional_Value<d_location.Range> => _p.decide.optional(
                                                other,
                                                () => _p.optional.literal.not_set(),
                                                () => _p.optional.literal.set($.id.range)
                                            )
                                        )
                                    ).filter(
                                        ($) => $
                                    )
                                    if (unexpected_properties.__get_number_of_entries() > 0) {
                                        return abort({
                                            'range': t_parse_tree_to_location.Value(value),
                                            'type': ['type', ['unexpected properties', unexpected_properties]]
                                        })
                                    }
                                    return xxx
                                })
                                default: return abort({
                                    'type': ['wrong value type', {
                                        'expected': ['verbose group', null],
                                    }],
                                    'range': t_parse_tree_to_location.Value(value),
                                })
                            }
                        }))
                        default: return abort({
                            'type': ['wrong value type', {
                                'expected': ['verbose group', null],
                            }],
                            'range': t_parse_tree_to_location.Value(value),
                        })
                    }
                }))
                default: return abort({
                    'type': ['wrong value type', {
                        'expected': ['verbose group', null],
                    }],
                    'range': t_parse_tree_to_location.Value(value),
                })
            }
        })
    }
}