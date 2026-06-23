import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'


import * as d_in from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"

export type Value = p_i.Transformer<
d_in.Value, d_out.Range
>
export type Concrete_Value = p_i.Transformer<
d_in.Value.type_.concrete, d_out.Range
>


export const Concrete_Value: Concrete_Value = ($) => p_.from.state($).decide(
    ($) => p_.from.state($).decide(
        ($): d_out.Range => {
            switch ($[0]) {
                case 'dictionary': return p_.ss($, ($) => $['{'].range)
                case 'group': return p_.ss($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'concise': return p_.ss($, ($) => $['<'].range)
                            case 'verbose': return p_.ss($, ($) => $['('].range)
                            default: return p_.au($[0])
                        }
                    }))
                case 'list': return p_.ss($, ($) => $['['].range)
                case 'nothing': return p_.ss($, ($) => $['~'].range)
                case 'optional': return p_.ss($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'set': return p_.ss($, ($) => $['*'].range)
                            case 'not set': return p_.ss($, ($) => $['_'].range)
                            default: return p_.au($[0])
                        }
                    }))
                case 'state': return p_.ss($, ($) => $['|'].range)
                case 'text': return p_.ss($, ($) => $.range)
                default: return p_.au($[0])
            }
        }))

export const Value: Value = ($) => p_.from.state($.type).decide(
    ($): d_out.Range => {
        switch ($[0]) {
            case 'concrete': return p_.ss($, ($) => Concrete_Value($))
            case 'include': return p_.ss($, ($) => $['@'].range)
            case 'missing': return p_.ss($, ($) => $['#'].range)
            default: return p_.au($[0])
        }
    })