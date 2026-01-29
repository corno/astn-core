
import * as _p from "pareto-core/dist/transformer"

import {
    _p_cc,
} from "pareto-core/dist/change_context"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/deserialize_parse_tree/migrate_boilerplate"

import * as t_out from "../../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"

import * as v_parse_tree from "../parse_tree/migrate_boilerplate"

import * as v_token from "../token/migrate_boilerplate"

import * as v_location from "../location/migrate_boilerplate"

export const Lexer_Error: t_signatures.Lexer_Error = ($) => _p.decide.state(
    $,
    ($): t_out.Lexer_Error => {
        switch ($[0]) {
            case 'dangling slash':
                return _p.ss(
                    $,
                    ($) => ['dangling slash', ({
                        'range': _p_cc(
                            $['range'],
                            ($) => v_location.Range(
                                $
                            )
                        ),
                        'at end of input': _p_cc(
                            $['at end of input'],
                            ($) => $
                        ),
                    })]
                )
            case 'invalid unicode escape sequence':
                return _p.ss(
                    $,
                    ($) => ['invalid unicode escape sequence', ({
                        'range': _p_cc(
                            $['range'],
                            ($) => v_location.Range(
                                $
                            )
                        ),
                    })]
                )
            case 'missing character after escape':
                return _p.ss(
                    $,
                    ($) => ['missing character after escape', ({
                        'range': _p_cc(
                            $['range'],
                            ($) => v_location.Range(
                                $
                            )
                        ),
                    })]
                )
            case 'unexpected control character':
                return _p.ss(
                    $,
                    ($) => ['unexpected control character', ({
                        'character': _p_cc(
                            $['character'],
                            ($) => $
                        ),
                        'location': _p_cc(
                            $['location'],
                            ($) => v_location.Location(
                                $
                            )
                        ),
                    })]
                )
            case 'unexpected control character in text':
                return _p.ss(
                    $,
                    ($) => ['unexpected control character in text', ({
                        'character': _p_cc(
                            $['character'],
                            ($) => $
                        ),
                        'range': _p_cc(
                            $['range'],
                            ($) => v_location.Range(
                                $
                            )
                        ),
                    })]
                )
            case 'unexpected end of line in delimited text':
                return _p.ss(
                    $,
                    ($) => ['unexpected end of line in delimited text', ({
                        'range': _p_cc(
                            $['range'],
                            ($) => v_location.Range(
                                $
                            )
                        ),
                    })]
                )
            case 'unknown escape character':
                return _p.ss(
                    $,
                    ($) => ['unknown escape character', ({
                        'character': _p_cc(
                            $['character'],
                            ($) => $
                        ),
                        'range': _p_cc(
                            $['range'],
                            ($) => v_location.Range(
                                $
                            )
                        ),
                    })]
                )
            case 'unterminated block comment':
                return _p.ss(
                    $,
                    ($) => ['unterminated block comment', ({
                        'range': _p_cc(
                            $['range'],
                            ($) => v_location.Range(
                                $
                            )
                        ),
                    })]
                )
            case 'unterminated text':
                return _p.ss(
                    $,
                    ($) => ['unterminated text', ({
                        'range': _p_cc(
                            $['range'],
                            ($) => v_location.Range(
                                $
                            )
                        ),
                    })]
                )
            case 'unterminated unicode escape sequence':
                return _p.ss(
                    $,
                    ($) => ['unterminated unicode escape sequence', ({
                        'range': _p_cc(
                            $['range'],
                            ($) => v_location.Range(
                                $
                            )
                        ),
                    })]
                )
            default:
                return _p.au(
                    $[0]
                )
        }
    }
)

export const Expected: t_signatures.Expected = ($) => _p.decide.state(
    $,
    ($): t_out.Expected => {
        switch ($[0]) {
            case 'a text value':
                return _p.ss(
                    $,
                    ($) => ['a text value', null]
                )
            case 'any value':
                return _p.ss(
                    $,
                    ($) => ['any value', null]
                )
            case '!':
                return _p.ss(
                    $,
                    ($) => ['!', null]
                )
            case '>':
                return _p.ss(
                    $,
                    ($) => ['>', null]
                )
            case '}':
                return _p.ss(
                    $,
                    ($) => ['}', null]
                )
            case '@':
                return _p.ss(
                    $,
                    ($) => ['@', null]
                )
            case ',':
                return _p.ss(
                    $,
                    ($) => [',', null]
                )
            case ':':
                return _p.ss(
                    $,
                    ($) => [':', null]
                )
            case ')':
                return _p.ss(
                    $,
                    ($) => [')', null]
                )
            case ']':
                return _p.ss(
                    $,
                    ($) => [']', null]
                )
            case '#':
                return _p.ss(
                    $,
                    ($) => ['#', null]
                )
            default:
                return _p.au(
                    $[0]
                )
        }
    }
)

export const Parser_Error: t_signatures.Parser_Error = ($) => ({
    'expected': _p_cc(
        $['expected'],
        ($) => $.__l_map(
            ($) => Expected(
                $
            )
        )
    ),
    'cause': _p_cc(
        $['cause'],
        ($) => _p.decide.state(
            $,
            ($): t_out.Parser_Error.cause => {
                switch ($[0]) {
                    case 'missing token':
                        return _p.ss(
                            $,
                            ($) => ['missing token', null]
                        )
                    case 'unexpected token':
                        return _p.ss(
                            $,
                            ($) => ['unexpected token', ({
                                'found': _p_cc(
                                    $['found'],
                                    ($) => v_token.Annotated_Token(
                                        $
                                    )
                                ),
                            })]
                        )
                    default:
                        return _p.au(
                            $[0]
                        )
                }
            }
        )
    ),
})

export const Error: t_signatures.Error = ($) => ({
    'type': _p_cc(
        $['type'],
        ($) => _p.decide.state(
            $,
            ($): t_out.Error.type_ => {
                switch ($[0]) {
                    case 'lexer':
                        return _p.ss(
                            $,
                            ($) => ['lexer', Lexer_Error(
                                $
                            )]
                        )
                    case 'parser':
                        return _p.ss(
                            $,
                            ($) => ['parser', Parser_Error(
                                $
                            )]
                        )
                    default:
                        return _p.au(
                            $[0]
                        )
                }
            }
        )
    ),
})
