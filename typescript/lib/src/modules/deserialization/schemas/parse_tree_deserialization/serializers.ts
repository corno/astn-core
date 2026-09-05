import * as p_ from 'pareto-core/serializer'
import p_text_from_list from 'pareto-core/transformer/specials/text_from_list'

//schemas
import * as s_out from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/schema"
import type * as s_in from "./schema.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}


//shorthands
import * as sh from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/shorthands/deprecated"

import * as ser_rich_phrase from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/serializers"

export const Error: declarations.Error = ($) => {
    const Parse_Error_Type = ($: s_in.Error.type_): s_out.Phrase => p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'lexer': return p_.option($, ($) => p_.from.state($.expected).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'unicode character': return sh.ph.text("found invalid unicode escape sequence")
                            case 'no end of line in text': return p_.option($, ($) => sh.ph.text("no end of line in text"))
                            case 'escape character': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.text("escape character (), but found "),
                                p_.from.optional($.found).decide(
                                    ($) => sh.ph.text(
                                        p_text_from_list(
                                            p_.literal.list([$]),
                                            ($) => $,
                                        )

                                    ),
                                    () => sh.ph.text("nothing")
                                ),
                            ]))
                            case 'block comment termination': return p_.option($, ($) => sh.ph.text("block comment termination: */"))
                            case 'text termination': return p_.option($, ($) => sh.ph.text("text delimiter: \" or ' or `"))

                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'parser': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("expected "),
                    sh.ph.rich_phrase(
                        p_.from.list($.expected).map(
                            ($) => sh.ph.text(
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
                        sh.ph.text("something"),
                        null,
                        sh.ph.text(" or "),
                        null,
                    ),
                    sh.ph.text(", found "),
                    p_.from.state($.cause).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'unexpected token': return p_.option($, ($) => sh.ph.composed([
                                    sh.ph.text("'"),
                                    sh.ph.text($.found.type[0]),
                                    sh.ph.text("'")
                                ]))
                                case 'missing token': return p_.option($, ($) => sh.ph.text("nothing"))
                                default: return p_.exhaustive($[0])
                            }
                        })
                ]))
                default: return p_.exhaustive($[0])
            }
        })
    return ser_rich_phrase.Phrase(sh.ph.composed([
        sh.ph.text("failed to parse ASTN: "),
        Parse_Error_Type($['type']),
    ]))
}
