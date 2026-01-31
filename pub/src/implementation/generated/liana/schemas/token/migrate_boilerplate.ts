
import * as _p from "pareto-core/dist/transformer"

import {
    _p_cc,
} from "pareto-core/dist/change_context"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/token/migrate_boilerplate"

import * as t_out from "../../../../../interface/generated/liana/schemas/token/data"

import * as v_location from "../location/migrate_boilerplate"

export const Tokenizer_Result: t_signatures.Tokenizer_Result = ($) => ({
    'leading trivia': _p_cc(
        $['leading trivia'],
        ($) => Trivia(
            $
        )
    ),
    'tokens': _p_cc(
        $['tokens'],
        ($) => _p.list.map(
            $,
            ($) => Annotated_Token(
                $
            )
        )
    ),
    'end': _p_cc(
        $['end'],
        ($) => v_location.Location(
            $
        )
    ),
})

export const Annotated_Token: t_signatures.Annotated_Token = ($) => ({
    'start': _p_cc(
        $['start'],
        ($) => v_location.Location(
            $
        )
    ),
    'type': _p_cc(
        $['type'],
        ($) => Token_Type(
            $
        )
    ),
    'end': _p_cc(
        $['end'],
        ($) => v_location.Location(
            $
        )
    ),
    'trailing trivia': _p_cc(
        $['trailing trivia'],
        ($) => Trivia(
            $
        )
    ),
})

export const Token_Type: t_signatures.Token_Type = ($) => _p.decide.state(
    $,
    ($): t_out.Token_Type => {
        switch ($[0]) {
            case '!':
                return _p.ss(
                    $,
                    ($) => ['!', null]
                )
            case '@':
                return _p.ss(
                    $,
                    ($) => ['@', null]
                )
            case ':':
                return _p.ss(
                    $,
                    ($) => [':', null]
                )
            case '#':
                return _p.ss(
                    $,
                    ($) => ['#', null]
                )
            case '{':
                return _p.ss(
                    $,
                    ($) => ['{', null]
                )
            case '}':
                return _p.ss(
                    $,
                    ($) => ['}', null]
                )
            case '[':
                return _p.ss(
                    $,
                    ($) => ['[', null]
                )
            case ']':
                return _p.ss(
                    $,
                    ($) => [']', null]
                )
            case '(':
                return _p.ss(
                    $,
                    ($) => ['(', null]
                )
            case ')':
                return _p.ss(
                    $,
                    ($) => [')', null]
                )
            case '<':
                return _p.ss(
                    $,
                    ($) => ['<', null]
                )
            case '>':
                return _p.ss(
                    $,
                    ($) => ['>', null]
                )
            case '~':
                return _p.ss(
                    $,
                    ($) => ['~', null]
                )
            case '*':
                return _p.ss(
                    $,
                    ($) => ['*', null]
                )
            case '|':
                return _p.ss(
                    $,
                    ($) => ['|', null]
                )
            case 'text':
                return _p.ss(
                    $,
                    ($) => ['text', {
                        'value': _p_cc(
                            $['value'],
                            ($) => Delimited_Text(
                                $
                            )
                        ),
                        'type': _p_cc(
                            $['type'],
                            ($) => Text_Type(
                                $
                            )
                        ),
                    }]
                )
            default:
                return _p.au(
                    $[0]
                )
        }
    }
)

export const Delimited_Text: t_signatures.Delimited_Text = ($) => $

export const Whitespace: t_signatures.Whitespace = ($) => ({
    'range': _p_cc(
        $['range'],
        ($) => v_location.Range(
            $
        )
    ),
    'value': _p_cc(
        $['value'],
        ($) => $
    ),
})

export const Trivia: t_signatures.Trivia = ($) => ({
    'leading whitespace': _p_cc(
        $['leading whitespace'],
        ($) => Whitespace(
            $
        )
    ),
    'comments': _p_cc(
        $['comments'],
        ($) => _p.list.map(
            $,
            ($) => ({
                'type': _p_cc(
                    $['type'],
                    ($) => _p.decide.state(
                        $,
                        ($): t_out.Trivia.comments.L.type_ => {
                            switch ($[0]) {
                                case 'line':
                                    return _p.ss(
                                        $,
                                        ($) => ['line', null]
                                    )
                                case 'block':
                                    return _p.ss(
                                        $,
                                        ($) => ['block', null]
                                    )
                                default:
                                    return _p.au(
                                        $[0]
                                    )
                            }
                        }
                    )
                ),
                'content': _p_cc(
                    $['content'],
                    ($) => $
                ),
                'range': _p_cc(
                    $['range'],
                    ($) => v_location.Range(
                        $
                    )
                ),
                'trailing whitespace': _p_cc(
                    $['trailing whitespace'],
                    ($) => Whitespace(
                        $
                    )
                ),
            })
        )
    ),
})

export const Text_Type: t_signatures.Text_Type = ($) => _p.decide.state(
    $,
    ($): t_out.Text_Type => {
        switch ($[0]) {
            case 'quoted':
                return _p.ss(
                    $,
                    ($) => ['quoted', null]
                )
            case 'apostrophed':
                return _p.ss(
                    $,
                    ($) => ['apostrophed', null]
                )
            case 'undelimited':
                return _p.ss(
                    $,
                    ($) => ['undelimited', null]
                )
            case 'backticked':
                return _p.ss(
                    $,
                    ($) => ['backticked', null]
                )
            default:
                return _p.au(
                    $[0]
                )
        }
    }
)
