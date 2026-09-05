import * as p_ from 'pareto-core/transformer'

//schemas
import type * as s_in from "../schema.js"
import type * as s_out from "../../location/schema.js"
namespace declarations {
    export type Value = p_.Transformer<
        s_in.Value,
        s_out.Range
    >
    export type Concrete_Value = p_.Transformer<
        s_in.Value.type_.concrete,
        s_out.Range
    >
    export type ID_Value_Pair = p_.Transformer<
        s_in.ID_Value_Pairs.L,
        s_out.Range
    >
    export type State = p_.Transformer<
        s_in.Value.type_.concrete.state,
        s_out.Range
    >
    export type List = p_.Transformer<
        s_in.Value.type_.concrete.list,
        s_out.Range
    >
    export type Dictionary = p_.Transformer<
        s_in.Value.type_.concrete.dictionary,
        s_out.Range
    >
    export type Group = p_.Transformer<
        s_in.Value.type_.concrete.group,
        s_out.Range
    >
    export type Optional = p_.Transformer<
        s_in.Value.type_.concrete.optional,
        s_out.Range
    >
}


export const Concrete_Value: declarations.Concrete_Value = ($) => p_.from.state($).decide(
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

export const Dictionary: declarations.Dictionary = ($) => ({
    'start': $['{'].range.start,
    'end': $['}'].range.end
})

export const Group: declarations.Group = ($) => p_.from.state($).decide(
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

export const List: declarations.List = ($) => ({
    'start': $['['].range.start,
    'end': $[']'].range.end
})

export const Optional: declarations.Optional = ($) => p_.from.state($).decide(
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

export const State: declarations.State = ($) => ({
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

export const Value: declarations.Value = ($) => p_.from.state($.type).decide(
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

export const ID_Value_Pair: declarations.ID_Value_Pair = ($) => ({
    'start': $.id.range.start,
    'end': p_.from.optional($.assignment).decide(
        ($) => p_.from.optional($.value).decide(
            ($) => Value($).end,
            () => $[':'].range.end
        ),
        () => $.id.range.end
    )
})