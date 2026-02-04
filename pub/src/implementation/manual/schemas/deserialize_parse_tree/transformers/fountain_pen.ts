import * as _p from 'pareto-core/dist/expression'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

import * as d_in from "../../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/block/data"


export type Parameters = {
    'position info':
    | ['zero based', null]
    | ['one based', null]
}

export namespace signatures {
    export type Error = _pi.Transformer_With_Parameters<d_in.Error, d_out.Block_Part, Parameters>
}

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

import * as t_token_to_fountain_pen from "../../location/transformers/fountain_pen"


export const Error: signatures.Error = ($, $p) => {
    const extra: number = _p.decide.state($p['position info'], ($) => {
        switch ($[0]) {
            case 'zero based': return 0
            case 'one based': return 1
            default: return _p.au($[0])
        }
    })
    const Parse_Error_Type = ($: d_in.Error.type_): d_out.Block_Part => _p.decide.state($, ($) => {
        switch ($[0]) {
            case 'lexer': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'dangling slash': return sh.b.literal("found dangling slash")
                    case 'invalid unicode escape sequence': return sh.b.literal("found invalid unicode escape sequence")
                    case 'missing character after escape': return sh.b.literal("found missing character after escape")
                    // case 'unexpected character': return `found unexpected character`
                    case 'unexpected control character': return sh.b.literal("found unexpected control character")
                    case 'unexpected control character in text': return sh.b.literal("found unexpected control character in text")
                    case 'unexpected end of line in delimited text': return sh.b.literal("found unexpected end of line in delimited text")
                    case 'unknown escape character': return sh.b.literal("found unknown escape character")
                    case 'unterminated block comment': return sh.b.literal("found unterminated block comment")
                    case 'unterminated text': return sh.b.literal("found unterminated text")
                    case 'unterminated unicode escape sequence': return sh.b.literal("found unterminated unicode escape sequence")
                    default: return _p.au($[0])
                }
            }))
            case 'parser': return _p.ss($, ($) => sh.b.sub([
                sh.b.literal("expected "),
                sh.b.rich(
                    $.expected.__l_map(
                        ($) => sh.b.literal(
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
                    sh.b.literal("something"),
                    sh.b.nothing(),
                    sh.b.literal(" or "),
                    sh.b.nothing(),
                ),
                sh.b.literal(", found"),
                _p.decide.state($.cause, ($) => {
                    switch ($[0]) {
                        case 'unexpected token': return _p.ss($, ($) => sh.b.literal($.found.type[0]))
                        case 'missing token': return _p.ss($, ($) => sh.b.literal("nothing"))
                        default: return _p.au($[0])
                    }
                })



            ]))
            default: return _p.au($[0])
        }
    })
    return sh.b.sub([
        sh.b.literal("failed to parse ASTN, ${Parse_Error_Type($.type)}"),
        //location
        _p.decide.state($.type, ($) => {
            switch ($[0]) {
                case 'lexer': return _p.ss($, ($) => _p.decide.state($, ($) => {
                    switch ($[0]) {
                        case 'unexpected control character': return _p.ss($, ($) => t_token_to_fountain_pen.Location($.location, { 'position info': $p['position info'], 'with @': true }))
                        case 'unexpected control character in text': return _p.ss($, ($) => t_token_to_fountain_pen.Range($.range, { 'position info': $p['position info'], 'with @': true }))
                        case 'missing character after escape': return _p.ss($, ($) => t_token_to_fountain_pen.Range($.range, { 'position info': $p['position info'], 'with @': true }))
                        case 'unexpected end of line in delimited text': return _p.ss($, ($) => t_token_to_fountain_pen.Range($.range, { 'position info': $p['position info'], 'with @': true }))
                        // case 'unexpected character': return _p.ss($, ($) => t_token_to_fountain_pen.Location($.location, { 'position info': $p['position info'], 'with @': true }))
                        case 'unterminated text': return _p.ss($, ($) => t_token_to_fountain_pen.Range($.range, { 'position info': $p['position info'], 'with @': true }))
                        case 'unterminated block comment': return _p.ss($, ($) => t_token_to_fountain_pen.Range($.range, { 'position info': $p['position info'], 'with @': true }))
                        case 'unterminated unicode escape sequence': return _p.ss($, ($) => t_token_to_fountain_pen.Range($.range, { 'position info': $p['position info'], 'with @': true }))
                        case 'invalid unicode escape sequence': return _p.ss($, ($) => t_token_to_fountain_pen.Range($.range, { 'position info': $p['position info'], 'with @': true }))
                        case 'unknown escape character': return _p.ss($, ($) => t_token_to_fountain_pen.Range($.range, { 'position info': $p['position info'], 'with @': true }))
                        case 'dangling slash': return _p.ss($, ($) => t_token_to_fountain_pen.Range($.range, { 'position info': $p['position info'], 'with @': true }))
                        default: return _p.au($[0])
                    }
                }))
                case 'parser': return _p.ss($, ($): d_out.Block_Part => _p.decide.state($.cause, ($) => {
                    switch ($[0]) {
                        case 'missing token': return _p.ss($, ($) => sh.b.nothing())
                        case 'unexpected token': return _p.ss($, ($) => t_token_to_fountain_pen.Range($.found, { 'position info': $p['position info'], 'with @': true }))
                        default: return _p.au($[0])
                    }
                }))
                default: return _p.au($[0])
            }
        }),
    ])
}
