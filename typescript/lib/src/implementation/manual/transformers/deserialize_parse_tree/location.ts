import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../../declarations/transformers/deserialize_parse_tree/location.js"

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