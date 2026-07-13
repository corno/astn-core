import * as p_ from 'pareto-core/implementation/serializer'
import p_text_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'

//schemas
import type * as s_in from "../../interface/schemas/parse_tree_deserialization.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}

import * as s_out from "pareto-fountain-pen/interface/schemas/prose"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: declarations.Error = ($) => {
    const Parse_Error_Type = ($: s_in.Error.type_): s_out.Phrase => p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'lexer': return p_.option($, ($) => p_.from.state($.expected).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'unicode character': return sh.ph.literal("found invalid unicode escape sequence")
                            case 'no end of line in text': return p_.option($, ($) => sh.ph.literal("no end of line in text"))
                            case 'escape character': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.literal("escape character (), but found "),
                                p_.from.optional($.found).decide(
                                    ($) => sh.ph.literal(
                                        p_text_from_list(
                                            p_.literal.list([$]),
                                            ($) => $,
                                        )

                                    ),
                                    () => sh.ph.literal("nothing")
                                ),
                            ]))
                            case 'block comment termination': return p_.option($, ($) => sh.ph.literal("block comment termination: */"))
                            case 'text termination': return p_.option($, ($) => sh.ph.literal("text delimiter: \" or ' or `"))

                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'parser': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("expected "),
                    sh.ph.rich_phrase(
                        p_.from.list($.expected).map(
                            ($) => sh.ph.literal(
                                p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case '!': return "'!'"
                                            case ')': return "')'"
                                            case ',': return "','"
                                            case ':': return "':'"
                                            case '>': return "'>'"
                                            case '@': return "'@'"
                                            case ']': return "']'"
                                            case 'a text value': return "a text value"
                                            case 'any value': return "any value"
                                            case '}': return "'}'"
                                            case '#': return "'#'"
                                            default: return p_.exhaustive($[0])
                                        }
                                    })
                            ),
                        ),
                        sh.ph.literal("something"),
                        sh.ph.nothing(),
                        sh.ph.literal(" or "),
                        sh.ph.nothing(),
                    ),
                    sh.ph.literal(", found "),
                    p_.from.state($.cause).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'unexpected token': return p_.option($, ($) => sh.ph.composed([
                                    sh.ph.literal("'"),
                                    sh.ph.literal($.found.type[0]),
                                    sh.ph.literal("'")
                                ]))
                                case 'missing token': return p_.option($, ($) => sh.ph.literal("nothing"))
                                default: return p_.exhaustive($[0])
                            }
                        })
                ]))
                default: return p_.exhaustive($[0])
            }
        })
    return sh.ph.composed([
        sh.ph.literal("failed to parse ASTN: "),
        Parse_Error_Type($['type']),
    ])
}
