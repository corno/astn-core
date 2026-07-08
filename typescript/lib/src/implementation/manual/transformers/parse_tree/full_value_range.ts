import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'


import type * as d_in from "../../../../interface/generated/liana/schemas/parse_tree/data.js"
import type * as d_out from "../../../../interface/generated/liana/schemas/location/data.js"

export namespace interface_ {
    export type Value = p_i.Transformer<
        d_in.Value,
        d_out.Range
    >
    export type Concrete_Value = p_i.Transformer<
        d_in.Value.type_.concrete,
        d_out.Range
    >
    export type ID_Value_Pair = p_i.Transformer<
        d_in.ID_Value_Pairs.L,
        d_out.Range
    >
    export type State = p_i.Transformer<
        d_in.Value.type_.concrete.state,
        d_out.Range
    >
    export type List = p_i.Transformer<
        d_in.Value.type_.concrete.list,
        d_out.Range
    >
    export type Dictionary = p_i.Transformer<
        d_in.Value.type_.concrete.dictionary,
        d_out.Range
    >
    export type Group = p_i.Transformer<
        d_in.Value.type_.concrete.group,
        d_out.Range
    >
    export type Optional = p_i.Transformer<
        d_in.Value.type_.concrete.optional,
        d_out.Range
    >
}
import * as temp_interface_ from "../../../../interface/declarations/transformers/parse_tree/full_value_range.js"


export const Concrete_Value: interface_.Concrete_Value = ($) => p_.from.state($).decide(
    ($) => p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'dictionary': return p_.option($, ($) => Dictionary($))

                case 'group': return p_.option($, ($) => Group($))
                case 'list': return p_.option($, ($) => List($))
                case 'nothing': return p_.option($, ($) => $['~'].range)
                case 'optional': return p_.option($, ($) => Optional($))
                case 'state': return p_.option($, ($) => State($))
                case 'text': return p_.option($, ($) => $.range)
                default: return p_.exhaustive($[0])
            }
        }))

export const Dictionary: interface_.Dictionary = ($) => ({
    'start': $['{'].range.start,
    'end': $['}'].range.end
})

export const Group: interface_.Group = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'concise': return p_.option($, ($) => ({
                'start': $['<'].range.start,
                'end': $['>'].range.end
            }))
            case 'verbose': return p_.option($, ($) => ({
                'start': $['('].range.start,
                'end': $[')'].range.end
            }))
            default: return p_.exhaustive($[0])
        }
    })

export const List: interface_.List = ($) => ({
    'start': $['['].range.start,
    'end': $[']'].range.end
})

export const Optional: interface_.Optional = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'set': return p_.option($, ($) => ({
                'start': $['*'].range.start,
                'end': Value($['value']).end
            }))
            case 'not set': return p_.option($, ($) => $['_'].range)
            default: return p_.exhaustive($[0])
        }
    })

export const State: interface_.State = ($) => ({
    'start': $['|'].range.start,
    'end': p_.from.state($.status).decide(
        ($) => {
            switch ($[0]) {
                case 'missing': return p_.option($, ($) => $['#'].range.end)
                case 'set': return p_.option($, ($) => Value($['value']).end)
                default: return p_.exhaustive($[0])
            }
        })
})

export const Value: interface_.Value = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'concrete': return p_.option($, ($) => Concrete_Value($))
            case 'include': return p_.option($, ($) => ({
                'start': $['@'].range.start,
                'end': $.path.range.end
            }))
            case 'missing': return p_.option($, ($) => ($['#'].range))
            default: return p_.exhaustive($[0])
        }
    })

export const ID_Value_Pair: interface_.ID_Value_Pair = ($) => ({
    'start': $.id.range.start,
    'end': p_.from.optional($.assignment).decide(
        ($) => p_.from.optional($.value).decide(
            ($) => Value($).end,
            () => $[':'].range.end
        ),
        () => $.id.range.end
    )
})