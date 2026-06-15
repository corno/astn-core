import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
export namespace signatures {
    export type Error = p_ti.Transformer<d_in.Error, d_out.Phrase>
}

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error: signatures.Error = ($) => {
    const Parse_Error_Type = ($: d_in.Error.type_): d_out.Phrase => pt.decide.state($, ($) => {
        switch ($[0]) {
            case 'lexer': return pt.ss($, ($) => pt.decide.state($.expected, ($) => {
                switch ($[0]) {
                    case 'unicode character': return sh.ph.literal("found invalid unicode escape sequence")
                    case 'no end of line in text': return pt.ss($, ($) => sh.ph.literal("no end of line in text"))
                    case 'escape character': return pt.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("escape character (), but found "),
                        $.found.__decide(
                            ($) => sh.ph.serialize(pt.list.literal([$])),
                            () => sh.ph.literal("nothing")
                        ),
                    ]))
                    case 'block comment termination': return pt.ss($, ($) => sh.ph.literal("block comment termination: */"))
                    case 'text termination': return pt.ss($, ($) => sh.ph.literal("text delimiter: \" or ' or `"))

                    default: return pt.au($[0])
                }
            }))
            case 'parser': return pt.ss($, ($) => sh.ph.composed([
                sh.ph.literal("expected "),
                sh.ph.rich(
                    $.expected.__l_map(
                        ($) => sh.ph.literal(
                            pt.decide.state($, ($) => {
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
                                    default: return pt.au($[0])
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
                pt.decide.state($.cause, ($) => {
                    switch ($[0]) {
                        case 'unexpected token': return pt.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("'"),
                            sh.ph.literal($.found.type[0]),
                            sh.ph.literal("'")
                        ]))
                        case 'missing token': return pt.ss($, ($) => sh.ph.literal("nothing"))
                        default: return pt.au($[0])
                    }
                })
            ]))
            default: return pt.au($[0])
        }
    })
    return sh.ph.composed([
        sh.ph.literal("failed to parse ASTN: "),
        Parse_Error_Type($['type']),
    ])
}
