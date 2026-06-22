import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"

export namespace signatures {
    export type Error = p_i.Transformer<d_in.Error, d_out.Possible_Range>
}

export const Error: signatures.Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'lexer': return p_.ss($, ($): d_out.Possible_Range => ['range', $.range])
            case 'parser': return p_.ss($, ($): d_out.Possible_Range => p_.from.state($.cause).decide(
                ($) => {
                    switch ($[0]) {
                        case 'missing token': return p_.ss($, ($) => ['end of document', {
                            'end': $.end
                        }])
                        case 'unexpected token': return p_.ss($, ($): d_out.Possible_Range => ['range', {
                            'start': $.found.start,
                            'end': $.found.end,
                        }])
                        default: return p_.au($[0])
                    }
                }))
            default: return p_.au($[0])
        }
    })