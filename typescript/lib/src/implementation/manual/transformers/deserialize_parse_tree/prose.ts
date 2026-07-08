import * as p_ from 'pareto-core/implementation/transformer'
import * as p_i from 'pareto-core/interface/transformer'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data.js"
import * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"
export namespace signatures {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >
}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: signatures.Error = ($) => {
    const Parse_Error_Type = ($: d_in.Error.type_): d_out.Phrase => p_.from.state($).decide(
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
                                    ($) => sh.ph.serialize(p_.literal.list([$])),
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
                    sh.ph.rich(
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
