import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_i from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"

export namespace signatures {
    export type Error = p_i.Transformer<d_in.Error, d_out.Possible_Range>
}

export const Error: signatures.Error = ($) => pt.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'lexer': return pt.ss($, ($): d_out.Possible_Range => ['range', $.range])
        case 'parser': return pt.ss($, ($):d_out.Possible_Range => pt.decide.state($.cause, ($) => {
            switch ($[0]) {
                case 'missing token': return pt.ss($, ($) => ['end of document', {
                    'end': $.end
                }])
                case 'unexpected token': return pt.ss($, ($): d_out.Possible_Range => ['range', {
                    'start': $.found.start,
                    'end': $.found.end,
                }])
                default: return pt.au($[0])
            }
        }))
        default: return pt.au($[0])
    }
})