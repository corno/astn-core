import * as p_di from 'pareto-core/dist/data/interface'
import * as pt from 'pareto-core/dist/assign'
import * as p_ri from 'pareto-core/dist/refiner/interface'

import * as d_in from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/to_be_generated/unmarshalled"
import * as d_function from "../../../../interface/to_be_generated/unmarshall"

import * as d_location from "../../../../interface/generated/liana/schemas/location/data"

//dependencies
import * as t_parse_tree_to_location from "../../transformers/parse_tree/start_token_range"

export type Dictionary = p_ri.Refiner<
    d_out.Dictionary,
    d_function.Error,
    d_in.Value
>

export type List = p_ri.Refiner<
    d_out.List,
    d_function.Error,
    d_in.Value
>

export type Nothing = p_ri.Refiner<
    d_out.Nothing,
    d_function.Error,
    d_in.Value
>

export type Optional = p_ri.Refiner<
    d_out.Optional,
    d_function.Error,
    d_in.Value
>

export type Property = p_ri.Refiner_With_Parameter<
    d_out.Property,
    d_function.Error,
    d_out.Verbose_Group,
    {
        'id': string
    }
>

export type State = p_ri.Refiner<
    d_out.State,
    d_function.Error,
    d_in.Value
>

export type Text = p_ri.Refiner<
    d_out.Text,
    d_function.Error,
    d_in.Value
>

export type Verbose_Group = p_ri.Refiner_With_Parameter<
    d_out.Verbose_Group,
    d_function.Error,
    d_in.Value,
    {
        'expected properties': p_di.Dictionary<null>
    }
>

export const Dictionary: Dictionary = ($, abort) => {
    const value = $
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return pt.ss($, ($) => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'dictionary': return pt.ss($, ($): d_out.Dictionary => ({
                        'value': value,
                        'entries': pt.dictionary.from.list(
                            $.entries,
                        ).convert(
                            ($) => $.id.token.value,
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

export const List: List = ($, abort) => {
    const value = $
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return pt.ss($, ($) => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'list': return pt.ss($, ($) => ({
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

export const Nothing: Nothing = ($, abort) => {
    const value = $
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return pt.ss($, ($) => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'nothing': return pt.ss($, ($) => ({
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

export const Optional: Optional = ($, abort) => {
    const value = $
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return pt.ss($, ($) => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'optional': return pt.ss($, ($) => pt.decide.state($, ($) => {
                        switch ($[0]) {
                            case 'set': return pt.ss($, ($) => ({
                                'value': value,
                                'optional': pt.optional.literal.set($.value)
                            }))
                            case 'not set': return pt.ss($, ($) => ({
                                'value': value,
                                'optional': pt.optional.literal.not_set()
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

export const Property: Property = ($, abort, $p) => {
    const value = $
    return pt.select.entry(
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


export const State: State = ($, abort) => {
    const value = $
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return pt.ss($, ($) => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'state': return pt.ss($, ($) => pt.decide.state($.status, ($) => {
                        switch ($[0]) {
                            case 'set': return pt.ss($, ($) => $)
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

export const Text: Text = ($, abort) => {
    const value = $
    return pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'concrete': return pt.ss($, ($) => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'text': return pt.ss($, ($) => $)
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

export const Verbose_Group: Verbose_Group = ($, abort, $p) => {
    const value = $
    return {
        'value': $,
        'properties': pt.decide.state($.type, ($) => {
            switch ($[0]) {
                case 'concrete': return pt.ss($, ($) => pt.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'group': return pt.ss($, ($) => pt.decide.state($, ($) => {
                            switch ($[0]) {
                                // case 'concise':
                                case 'verbose': return pt.ss($, ($) => {
                                    const xxx = pt.dictionary.from.list(
                                        $.properties,
                                    ).convert(
                                        ($) => $.id.token.value,
                                        ($) => $,
                                        {
                                            duplicate_id: ($) => abort({
                                                'type': ['type', ['duplicate property', $]],
                                                'range': t_parse_tree_to_location.Value(value),
                                            })
                                        },
                                    )

                                    const unexpected_properties = pt.dictionary.from.dictionary(
                                        pt.dictionary.from.dictionary(
                                            xxx,
                                        ).join(
                                            $p['expected properties'],
                                            ($, other, id): p_di.Optional_Value<d_location.Range> => pt.decide.optional(
                                                other,
                                                () => pt.optional.literal.not_set(),
                                                () => pt.optional.literal.set($.id.range)
                                            )
                                        )
                                    ).map_optionally(
                                        ($) => $
                                    )
                                    if (unexpected_properties.__get_number_of_entries() > 0) {
                                        return abort({
                                            'range': t_parse_tree_to_location.Value(value),
                                            'type': ['type', ['unexpected properties', {
                                                'found': unexpected_properties,
                                                'expected': $p['expected properties'],
                                            }]]
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