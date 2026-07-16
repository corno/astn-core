import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../schemas/parse_tree_deserialization.js"
import type * as s_out from "../../../schemas/location.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Possible_Range
    >
}

export const Error: declarations.Error = ($) => p_.from.state($.type).decide(
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