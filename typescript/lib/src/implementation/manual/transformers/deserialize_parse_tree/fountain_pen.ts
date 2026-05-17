import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
export namespace signatures {
    export type Error = _pi.Transformer<d_in.Error, d_out.Phrase>
}

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error: signatures.Error = ($) => {
    const Parse_Error_Type = ($: d_in.Error.type_): d_out.Phrase => _p.decide.state($, ($) => {
        switch ($[0]) {
            case 'lexer': return _p.ss($, ($) => _p.decide.state($.expected, ($) => {
                switch ($[0]) {
                    case 'unicode character': return sh.ph.literal("found invalid unicode escape sequence")
                    case 'no end of line in text': return _p.ss($, ($) => sh.ph.literal("no end of line in text"))
                    case 'escape character': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("escape character (), but found "),
                        $.found.__decide(
                            ($) => sh.ph.serialize(_p.list.literal([$])),
                            () => sh.ph.literal("nothing")
                        ),
                    ]))
                    case 'block comment termination': return _p.ss($, ($) => sh.ph.literal("block comment termination: */"))
                    case 'text termination': return _p.ss($, ($) => sh.ph.literal("text delimiter: \" or ' or `"))

                    default: return _p.au($[0])
                }
            }))
            case 'parser': return _p.ss($, ($) => sh.ph.composed([
                sh.ph.literal("expected "),
                sh.ph.rich(
                    $.expected.__l_map(
                        ($) => sh.ph.literal(
                            _p.decide.state($, ($) => {
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
                                    default: return _p.au($[0])
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
                _p.decide.state($.cause, ($) => {
                    switch ($[0]) {
                        case 'unexpected token': return _p.ss($, ($) => sh.ph.composed([
                            sh.ph.literal("'"),
                            sh.ph.literal($.found.type[0]),
                            sh.ph.literal("'")
                        ]))
                        case 'missing token': return _p.ss($, ($) => sh.ph.literal("nothing"))
                        default: return _p.au($[0])
                    }
                })
            ]))
            default: return _p.au($[0])
        }
    })
    return sh.ph.composed([
        sh.ph.literal("failed to parse ASTN: "),
        Parse_Error_Type($['type']),
    ])
}
