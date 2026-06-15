import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_ti from 'pareto-core/dist/transformer/interface'


import * as d_in from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"

export type Value = p_ti.Transformer<d_in.Value, d_out.Range>
export type Concrete_Value = p_ti.Transformer<d_in.Value.type_.concrete, d_out.Range>


export const Concrete_Value: Concrete_Value = ($) => pt.decide.state($, ($) => pt.decide.state($, ($): d_out.Range => {
    switch ($[0]) {
        case 'dictionary': return pt.ss($, ($) => $['{'].range)
        case 'group': return pt.ss($, ($) => pt.decide.state($, ($) => {
            switch ($[0]) {
                case 'concise': return pt.ss($, ($) => $['<'].range)
                case 'verbose': return pt.ss($, ($) => $['('].range)
                default: return pt.au($[0])
            }
        }))
        case 'list': return pt.ss($, ($) => $['['].range)
        case 'nothing': return pt.ss($, ($) => $['~'].range)
        case 'optional': return pt.ss($, ($) => pt.decide.state($, ($) => {
            switch ($[0]) {
                case 'set': return pt.ss($, ($) => $['*'].range)
                case 'not set': return pt.ss($, ($) => $['_'].range)
                default: return pt.au($[0])
            }
        }))
        case 'state': return pt.ss($, ($) => $['|'].range)
        case 'text': return pt.ss($, ($) => $.range)
        default: return pt.au($[0])
    }
}))

export const Value: Value = ($) => pt.decide.state($.type, ($): d_out.Range => {
    switch ($[0]) {
        case 'concrete': return pt.ss($, ($) => Concrete_Value($))
        case 'include': return pt.ss($, ($) => $['@'].range)
        case 'missing': return pt.ss($, ($) => $['#'].range)
        default: return pt.au($[0])
    }
})