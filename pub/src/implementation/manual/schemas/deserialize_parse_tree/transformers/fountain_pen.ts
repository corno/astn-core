import * as _p from 'pareto-core/dist/transformer'
import * as _pi from 'pareto-core/dist/interface'
import * as _ps from 'pareto-core/dist/serializer'
import * as _pd from 'pareto-core/dist/deserializer'

import * as d_in from "../../../../../interface/generated/pareto/schemas/deserialize_parse_tree/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/pareto/schemas/block/data"


export type Parameters = {
    'position info':
    | ['zero based', null]
    | ['one based', null]
}

export namespace signatures {
    export type Error = _pi.Transformer_With_Parameters<d_in.Error, d_out.Block_Part, Parameters>
}

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

import * as t_token_to_fountain_pen from "../../token/transformers/fountain_pen"
export const s_list_of_separated_texts: _pi.Serializer_With_Parameters<_pi.List<string>, { 'separator': string }> = ($, $p) => {
    let is_first = true
    return _ps.text.from_list(_p.list.deprecated_build<number>(
        ($i) => {
            $.__for_each(($) => {
                if (!is_first) {
                    $i['add list'](_pd.list.from_text($p.separator, ($) => $))
                }
                $i['add list'](_pd.list.from_text($, ($) => $))
                is_first = false

            })
        }),
        ($) => $,
    )
}

export const Error: signatures.Error = ($, $p) => {
    const extra: number = _p.sg($p['position info'], ($) => {
        switch ($[0]) {
            case 'zero based': return 0
            case 'one based': return 1
            default: return _p.au($[0])
        }
    })
    const Parse_Error_Type = ($: d_in.Error._type): string => _p.sg($, ($) => {
        switch ($[0]) {
            case 'lexer': return _p.ss($, ($) => _p.sg($, ($) => {
                switch ($[0]) {
                    case 'dangling slash': return `found dangling slash`
                    case 'invalid unicode escape sequence': return `found invalid unicode escape sequence`
                    case 'missing character after escape': return `found missing character after escape`
                    // case 'unexpected character': return `found unexpected character`
                    case 'unexpected control character': return `found unexpected control character`
                    case 'unexpected control character in text': return `found unexpected control character in text`
                    case 'unexpected end of line in delimited text': return `found unexpected end of line in delimited text`
                    case 'unknown escape character': return `found unknown escape character`
                    case 'unterminated block comment': return `found unterminated block comment`
                    case 'unterminated text': return `found unterminated text`
                    case 'unterminated unicode escape sequence': return `found unterminated unicode escape sequence`
                    default: return _p.au($[0])
                }
            }))
            case 'parser': return _p.ss($, ($) => `expected ${s_list_of_separated_texts(
                $.expected.__l_map(($) => _p.sg($, ($) => {
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
                })),
                { 'separator': " or " }
            )}, found ${_p.sg($.cause, ($) => {
                switch ($[0]) {
                    case 'unexpected token': return _p.ss($, ($) => $.found.type[0])
                    case 'missing token': return _p.ss($, ($) => `nothing`)
                    default: return _p.au($[0])
                }
            })}`)
            default: return _p.au($[0])
        }
    })
    return sh.b.sub([
        sh.b.snippet(`failed to parse ASTN, ${Parse_Error_Type($.type)}`),
        //location
        _p.sg($.type, ($) => {
            switch ($[0]) {
                case 'lexer': return _p.ss($, ($) => _p.sg($, ($) => {
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
                case 'parser': return _p.ss($, ($): d_out.Block_Part => _p.sg($.cause, ($) => {
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
