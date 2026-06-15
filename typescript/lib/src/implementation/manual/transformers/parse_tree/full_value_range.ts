import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_ti from 'pareto-core/dist/transformer/interface'


import * as d_in from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"

export type Value = p_ti.Transformer<d_in.Value, d_out.Range>
export type Concrete_Value = p_ti.Transformer<d_in.Value.type_.concrete, d_out.Range>
export type ID_Value_Pair = p_ti.Transformer<d_in.ID_Value_Pairs.L, d_out.Range>
export type State = p_ti.Transformer<d_in.Value.type_.concrete.state, d_out.Range>
export type List = p_ti.Transformer<d_in.Value.type_.concrete.list, d_out.Range>
export type Dictionary = p_ti.Transformer<d_in.Value.type_.concrete.dictionary, d_out.Range>
export type Group = p_ti.Transformer<d_in.Value.type_.concrete.group, d_out.Range>
export type Optional = p_ti.Transformer<d_in.Value.type_.concrete.optional, d_out.Range>


export const Concrete_Value: Concrete_Value = ($) => pt.decide.state($, ($) => pt.decide.state($, ($): d_out.Range => {
    switch ($[0]) {
        case 'dictionary': return pt.ss($, ($) => Dictionary($))

        case 'group': return pt.ss($, ($) => Group($))
        case 'list': return pt.ss($, ($) => List($))
        case 'nothing': return pt.ss($, ($) => $['~'].range)
        case 'optional': return pt.ss($, ($) => Optional($))
        case 'state': return pt.ss($, ($) => State($))
        case 'text': return pt.ss($, ($) => $.range)
        default: return pt.au($[0])
    }
}))

export const Dictionary: Dictionary = ($) => ({
    'start': $['{'].range.start,
    'end': $['}'].range.end
})

export const Group: Group = ($) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'concise': return pt.ss($, ($) => ({
            'start': $['<'].range.start,
            'end': $['>'].range.end
        }))
        case 'verbose': return pt.ss($, ($) => ({
            'start': $['('].range.start,
            'end': $[')'].range.end
        }))
        default: return pt.au($[0])
    }
})

export const List: List = ($) => ({
    'start': $['['].range.start,
    'end': $[']'].range.end
})

export const Optional: Optional = ($) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'set': return pt.ss($, ($) => ({
            'start': $['*'].range.start,
            'end': Value($['value']).end
        }))
        case 'not set': return pt.ss($, ($) => $['_'].range)
        default: return pt.au($[0])
    }
})

export const State: State = ($) => ({
    'start': $['|'].range.start,
    'end': pt.decide.state($.status, ($) => {
        switch ($[0]) {
            case 'missing': return pt.ss($, ($) => $['#'].range.end)
            case 'set': return pt.ss($, ($) => Value($['value']).end)
            default: return pt.au($[0])
        }
    })
})

export const Value: Value = ($) => pt.decide.state($.type, ($): d_out.Range => {
    switch ($[0]) {
        case 'concrete': return pt.ss($, ($) => Concrete_Value($))
        case 'include': return pt.ss($, ($) => ({
            'start': $['@'].range.start,
            'end': $.path.range.end
        }))
        case 'missing': return pt.ss($, ($) => ($['#'].range))
        default: return pt.au($[0])
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