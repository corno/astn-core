import * as p_ from 'pareto-core/implementation/transformer'
import * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data.js"
import type * as d_out from "../../../../interface/generated/liana/schemas/location/data.js"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Possible_Range
    >
}

export const Error: interface_.Error = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'lexer': return p_.option($, ($) => ['range', $.range])
            case 'parser': return p_.option($, ($) => p_.from.state($.cause).decide(
                ($) => {
                    switch ($[0]) {
                        case 'missing token': return p_.option($, ($) => ['end of document', {
                            'end': $.end
                        }])
                        case 'unexpected token': return p_.option($, ($) => ['range', {
                            'start': $.found.start,
                            'end': $.found.end,
                        }])
                        default: return p_.exhaustive($[0])
                    }
                }))
            default: return p_.exhaustive($[0])
        }
    })