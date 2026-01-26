
import * as _p from "pareto-core/dist/transformer"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/deserialize_parse_tree/marshall"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_serialize_number from "liana-core/dist/implementation/manual/primitives/integer/serializers/decimal"

import * as v_serialize_boolean from "liana-core/dist/implementation/manual/primitives/boolean/serializers/true_false"

import * as v_external__parse_tree from "../parse_tree/marshall"

import * as v_external__token from "../token/marshall"
export const Lexer_Error: t_signatures.Lexer_Error = ($,) => ['state', _p.decide.state($, ($,): t_out.Value.state => {
    switch ($[0]) {
        case 'dangling slash':
            return _p.ss($, ($,) => ({
                'option': "dangling slash",
                'value': ['group', ['verbose', _p.dictionary.literal(({
                    'range': _p.deprecated_cc($['range'], ($,) => v_external_token.Range($)),
                    'at end of input': _p.deprecated_cc($['at end of input'], ($,) => ['text', ({
                        'delimiter': ['backtick', null],
                        'value': v_serialize_boolean.serialize($),
                    })]),
                }))]],
            }))
        case 'invalid unicode escape sequence':
            return _p.ss($, ($,) => ({
                'option': "invalid unicode escape sequence",
                'value': ['group', ['verbose', _p.dictionary.literal(({
                    'range': _p.deprecated_cc($['range'], ($,) => v_external_token.Range($)),
                }))]],
            }))
        case 'missing character after escape':
            return _p.ss($, ($,) => ({
                'option': "missing character after escape",
                'value': ['group', ['verbose', _p.dictionary.literal(({
                    'range': _p.deprecated_cc($['range'], ($,) => v_external_token.Range($)),
                }))]],
            }))
        case 'unexpected control character':
            return _p.ss($, ($,) => ({
                'option': "unexpected control character",
                'value': ['group', ['verbose', _p.dictionary.literal(({
                    'character': _p.deprecated_cc($['character'], ($,) => ['text', ({
                        'delimiter': ['backtick', null],
                        'value': v_serialize_number.serialize($),
                    })]),
                    'location': _p.deprecated_cc($['location'], ($,) => v_external_token.Location($)),
                }))]],
            }))
        case 'unexpected control character in text':
            return _p.ss($, ($,) => ({
                'option': "unexpected control character in text",
                'value': ['group', ['verbose', _p.dictionary.literal(({
                    'character': _p.deprecated_cc($['character'], ($,) => ['text', ({
                        'delimiter': ['backtick', null],
                        'value': v_serialize_number.serialize($),
                    })]),
                    'range': _p.deprecated_cc($['range'], ($,) => v_external_token.Range($)),
                }))]],
            }))
        case 'unexpected end of line in delimited text':
            return _p.ss($, ($,) => ({
                'option': "unexpected end of line in delimited text",
                'value': ['group', ['verbose', _p.dictionary.literal(({
                    'range': _p.deprecated_cc($['range'], ($,) => v_external_token.Range($)),
                }))]],
            }))
        case 'unknown escape character':
            return _p.ss($, ($,) => ({
                'option': "unknown escape character",
                'value': ['group', ['verbose', _p.dictionary.literal(({
                    'character': _p.deprecated_cc($['character'], ($,) => ['text', ({
                        'delimiter': ['backtick', null],
                        'value': v_serialize_number.serialize($),
                    })]),
                    'range': _p.deprecated_cc($['range'], ($,) => v_external_token.Range($)),
                }))]],
            }))
        case 'unterminated block comment':
            return _p.ss($, ($,) => ({
                'option': "unterminated block comment",
                'value': ['group', ['verbose', _p.dictionary.literal(({
                    'range': _p.deprecated_cc($['range'], ($,) => v_external_token.Range($)),
                }))]],
            }))
        case 'unterminated text':
            return _p.ss($, ($,) => ({
                'option': "unterminated text",
                'value': ['group', ['verbose', _p.dictionary.literal(({
                    'range': _p.deprecated_cc($['range'], ($,) => v_external_token.Range($)),
                }))]],
            }))
        case 'unterminated unicode escape sequence':
            return _p.ss($, ($,) => ({
                'option': "unterminated unicode escape sequence",
                'value': ['group', ['verbose', _p.dictionary.literal(({
                    'range': _p.deprecated_cc($['range'], ($,) => v_external_token.Range($)),
                }))]],
            }))
        default:
            return _p.au($[0])
    }
})]
export const Expected: t_signatures.Expected = ($,) => ['state', _p.decide.state($, ($,): t_out.Value.state => {
    switch ($[0]) {
        case 'a text value':
            return _p.ss($, ($,) => ({
                'option': "a text value",
                'value': ['nothing', null],
            }))
        case 'any value':
            return _p.ss($, ($,) => ({
                'option': "any value",
                'value': ['nothing', null],
            }))
        case '!':
            return _p.ss($, ($,) => ({
                'option': "!",
                'value': ['nothing', null],
            }))
        case '>':
            return _p.ss($, ($,) => ({
                'option': ">",
                'value': ['nothing', null],
            }))
        case '}':
            return _p.ss($, ($,) => ({
                'option': "}",
                'value': ['nothing', null],
            }))
        case '@':
            return _p.ss($, ($,) => ({
                'option': "@",
                'value': ['nothing', null],
            }))
        case ',':
            return _p.ss($, ($,) => ({
                'option': ",",
                'value': ['nothing', null],
            }))
        case ':':
            return _p.ss($, ($,) => ({
                'option': ":",
                'value': ['nothing', null],
            }))
        case ')':
            return _p.ss($, ($,) => ({
                'option': ")",
                'value': ['nothing', null],
            }))
        case ']':
            return _p.ss($, ($,) => ({
                'option': "]",
                'value': ['nothing', null],
            }))
        case '#':
            return _p.ss($, ($,) => ({
                'option': "#",
                'value': ['nothing', null],
            }))
        default:
            return _p.au($[0])
    }
})]
export const Parser_Error: t_signatures.Parser_Error = ($,) => ['group', ['verbose', _p.dictionary.literal(({
    'expected': _p.deprecated_cc($['expected'], ($,) => ['list', $.__l_map(($,) => Expected($))]),
    'cause': _p.deprecated_cc($['cause'], ($,) => ['state', _p.decide.state($, ($,): t_out.Value.state => {
        switch ($[0]) {
            case 'missing token':
                return _p.ss($, ($,) => ({
                    'option': "missing token",
                    'value': ['nothing', null],
                }))
            case 'unexpected token':
                return _p.ss($, ($,) => ({
                    'option': "unexpected token",
                    'value': ['group', ['verbose', _p.dictionary.literal(({
                        'found': _p.deprecated_cc($['found'], ($,) => v_external_token.Annotated_Token($)),
                    }))]],
                }))
            default:
                return _p.au($[0])
        }
    })]),
}))]]
export const Error: t_signatures.Error = ($,) => ['group', ['verbose', _p.dictionary.literal(({
    'type': _p.deprecated_cc($['type'], ($,) => ['state', _p.decide.state($, ($,): t_out.Value.state => {
        switch ($[0]) {
            case 'lexer':
                return _p.ss($, ($,) => ({
                    'option': "lexer",
                    'value': Lexer_Error($),
                }))
            case 'parser':
                return _p.ss($, ($,) => ({
                    'option': "parser",
                    'value': Parser_Error($),
                }))
            default:
                return _p.au($[0])
        }
    })]),
}))]]
