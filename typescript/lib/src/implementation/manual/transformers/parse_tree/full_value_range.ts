import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'


import * as d_in from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"

export type Value = p_i.Transformer<d_in.Value, d_out.Range>
export type Concrete_Value = p_i.Transformer<d_in.Value.type_.concrete, d_out.Range>
export type ID_Value_Pair = p_i.Transformer<d_in.ID_Value_Pairs.L, d_out.Range>
export type State = p_i.Transformer<d_in.Value.type_.concrete.state, d_out.Range>
export type List = p_i.Transformer<d_in.Value.type_.concrete.list, d_out.Range>
export type Dictionary = p_i.Transformer<d_in.Value.type_.concrete.dictionary, d_out.Range>
export type Group = p_i.Transformer<d_in.Value.type_.concrete.group, d_out.Range>
export type Optional = p_i.Transformer<d_in.Value.type_.concrete.optional, d_out.Range>


export const Concrete_Value: Concrete_Value = ($) => p_.from.state($).decide(($) => p_.from.state($).decide(($): d_out.Range => {
    switch ($[0]) {
        case 'dictionary': return p_.ss($, ($) => Dictionary($))

        case 'group': return p_.ss($, ($) => Group($))
        case 'list': return p_.ss($, ($) => List($))
        case 'nothing': return p_.ss($, ($) => $['~'].range)
        case 'optional': return p_.ss($, ($) => Optional($))
        case 'state': return p_.ss($, ($) => State($))
        case 'text': return p_.ss($, ($) => $.range)
        default: return p_.au($[0])
    }
}))

export const Dictionary: Dictionary = ($) => ({
    'start': $['{'].range.start,
    'end': $['}'].range.end
})

export const Group: Group = ($) => p_.from.state($).decide(($) => {
    switch ($[0]) {
        case 'concise': return p_.ss($, ($) => ({
            'start': $['<'].range.start,
            'end': $['>'].range.end
        }))
        case 'verbose': return p_.ss($, ($) => ({
            'start': $['('].range.start,
            'end': $[')'].range.end
        }))
        default: return p_.au($[0])
    }
})

export const List: List = ($) => ({
    'start': $['['].range.start,
    'end': $[']'].range.end
})

export const Optional: Optional = ($) => p_.from.state($).decide(($) => {
    switch ($[0]) {
        case 'set': return p_.ss($, ($) => ({
            'start': $['*'].range.start,
            'end': Value($['value']).end
        }))
        case 'not set': return p_.ss($, ($) => $['_'].range)
        default: return p_.au($[0])
    }
})

export const State: State = ($) => ({
    'start': $['|'].range.start,
    'end': p_.from.state($.status).decide(($) => {
        switch ($[0]) {
            case 'missing': return p_.ss($, ($) => $['#'].range.end)
            case 'set': return p_.ss($, ($) => Value($['value']).end)
            default: return p_.au($[0])
        }
    })
})

export const Value: Value = ($) => p_.from.state($.type).decide(($): d_out.Range => {
    switch ($[0]) {
        case 'concrete': return p_.ss($, ($) => Concrete_Value($))
        case 'include': return p_.ss($, ($) => ({
            'start': $['@'].range.start,
            'end': $.path.range.end
        }))
        case 'missing': return p_.ss($, ($) => ($['#'].range))
        default: return p_.au($[0])
    }
})

export const ID_Value_Pair: ID_Value_Pair = ($) => ({
    'start': $.id.range.start,
    'end': $.assignment.__decide(
        ($) => $.value.__decide(
            ($) => Value($).end,
            () => $[':'].range.end
        ),
        () => $.id.range.end
    )
})