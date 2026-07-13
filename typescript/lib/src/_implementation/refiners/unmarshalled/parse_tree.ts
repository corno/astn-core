import * as p_ from 'pareto-core/implementation/refiner'
import * as p_t from 'pareto-core/implementation/transformer'
import type * as p_di from 'pareto-core/interface/schema'
import p_assert from 'pareto-core/implementation/refiner/specials/assert'

//schemas
import type * as s_out from "../../../private_schemas/unmarshalled.js"
import type * as s_location from "../../../interface/schemas/location.js"
import type * as s_in from "../../../interface/schemas/parse_tree.js"
import type * as s_function from "../../../private_schemas/unmarshall.js"

namespace declarations {
    export type Dictionary = p_.Refiner<
        s_out.Dictionary,
        s_function.Error,
        s_in.Value
    >

    export type List = p_.Refiner<
        s_out.List,
        s_function.Error,
        s_in.Value
    >

    export type Nothing = p_.Refiner<
        s_out.Nothing,
        s_function.Error,
        s_in.Value
    >

    export type Optional = p_.Refiner<
        s_out.Optional,
        s_function.Error,
        s_in.Value
    >

    export type Property = p_.Refiner_With_Parameter<
        s_out.Property,
        s_function.Error,
        s_out.Verbose_Group,
        {
            'id': string
        }
    >

    export type State = p_.Refiner<
        s_out.State,
        s_function.Error,
        s_in.Value
    >

    export type Text = p_.Refiner<
        s_out.Text,
        s_function.Error,
        s_in.Value
    >

    export type Verbose_Group = p_.Refiner_With_Parameter<
        s_out.Verbose_Group,
        s_function.Error,
        s_in.Value,
        {
            'expected properties': p_di.Dictionary<null>
        }
    >

}

//dependencies
import * as t_parse_tree_to_location from "../../transformers/parse_tree/start_token_range.js"

export const Dictionary: declarations.Dictionary = ($, abort) => {
    const value = $
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'concrete': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'dictionary': return p_.option($, ($): s_out.Dictionary => ({
                                'value': value,
                                'entries': p_.from.list($.entries).convert_to_dictionary(
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

export const List: declarations.List = ($, abort) => {
    const value = $
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'concrete': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'list': return p_.option($, ($) => ({
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

export const Nothing: declarations.Nothing = ($, abort) => {
    const value = $
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'concrete': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'nothing': return p_.option($, ($) => ({
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

export const Optional: declarations.Optional = ($, abort) => {
    const value = $
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'concrete': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'optional': return p_.option($, ($) => p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'set': return p_.option($, ($) => ({
                                            'value': value,
                                            'optional': p_.literal.set($.value)
                                        }))
                                        case 'not set': return p_.option($, ($) => ({
                                            'value': value,
                                            'optional': p_.literal.not_set()
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

export const Property: declarations.Property = ($, abort, $p) => {
    return p_.from.dictionary($.properties).get_entry(
        $p.id,
        {
            no_such_entry: () => abort({
                'range': t_parse_tree_to_location.Value($.value),
                'type': ['type', ['missing property', $p.id]]
            })
        }
    )
}

export const State: declarations.State = ($, abort) => {
    const value = $
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'concrete': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'state': return p_.option($, ($) => p_.from.state($.status).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'set': return p_.option($, ($) => $)
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

export const Text: declarations.Text = ($, abort) => {
    const value = $
    return p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'concrete': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'text': return p_.option($, ($) => $)
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

export const Verbose_Group: declarations.Verbose_Group = ($, abort, $p) => {
    const value = $
    return {
        'value': $,
        'properties': p_.from.state($.type).decide(
            ($) => {
                switch ($[0]) {
                    case 'concrete': return p_.option($, ($) => p_.from.state($).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'group': return p_.option($, ($) => p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            // case 'concise':
                                            case 'verbose': return p_.option($, ($) => {
                                                const xxx = p_.from.list($.properties).convert_to_dictionary(
                                                    ($) => $.id.token.value,
                                                    ($) => $,
                                                    {
                                                        duplicate_id: ($) => abort({
                                                            'type': ['type', ['duplicate property', $]],
                                                            'range': t_parse_tree_to_location.Value(value),
                                                        })
                                                    },
                                                )


                                                return p_assert(
                                                    abort,
                                                    () => {

                                                        return p_t.from.dictionary(
                                                            p_t.from.dictionary(
                                                                p_t.from.dictionary(xxx).join(
                                                                    $p['expected properties'],
                                                                    ($, other, id): p_di.Optional_Value<s_location.Range> => p_t.from.optional(other).decide(
                                                                        ($) => p_.literal.not_set(),
                                                                        () => p_.literal.set($.id.range)
                                                                    )
                                                                )
                                                            ).map_optionally(
                                                                ($) => $
                                                            ),
                                                        ).on_has_entries(
                                                            ($) => p_.literal.set({
                                                                'range': t_parse_tree_to_location.Value(value),
                                                                'type': ['type', ['unexpected properties', {
                                                                    'found': $,
                                                                    'expected': $p['expected properties'],
                                                                }]]
                                                            }),
                                                            () => p_.literal.not_set()
                                                        )

                                                    },
                                                    () => xxx
                                                )
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