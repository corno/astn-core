import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/parse_tree/start_token_range.js"

export const Concrete_Value: interface_.Concrete_Value = ($) => p_.from.state($).decide(
    ($) => p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'dictionary': return p_.option($, ($) => $['{'].range)
                case 'group': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'concise': return p_.option($, ($) => $['<'].range)
                            case 'verbose': return p_.option($, ($) => $['('].range)
                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'list': return p_.option($, ($) => $['['].range)
                case 'nothing': return p_.option($, ($) => $['~'].range)
                case 'optional': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'set': return p_.option($, ($) => $['*'].range)
                            case 'not set': return p_.option($, ($) => $['_'].range)
                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'state': return p_.option($, ($) => $['|'].range)
                case 'text': return p_.option($, ($) => $.range)
                default: return p_.exhaustive($[0])
            }
        }))

export const Value: interface_.Value = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'concrete': return p_.option($, ($) => Concrete_Value($))
            case 'include': return p_.option($, ($) => $['@'].range)
            case 'missing': return p_.option($, ($) => $['#'].range)
            default: return p_.exhaustive($[0])
        }
    })