
import * as _p from "pareto-core/dist/transformer"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/parse_tree/migrate_boilerplate"

import * as t_out from "../../../../../interface/generated/liana/schemas/parse_tree/data"

import * as v_token from "../token/migrate_boilerplate"
export const Structural_Token: t_signatures.Structural_Token = ($) => ({
    'trailing trivia': _p.deprecated_cc($['trailing trivia'], ($) => v_token.Trivia(
        $
    )),
    'range': _p.deprecated_cc($['range'], ($) => v_token.Range(
        $
    )),
})
export const Text: t_signatures.Text = ($) => ({
    'trailing trivia': _p.deprecated_cc($['trailing trivia'], ($) => v_token.Trivia(
        $
    )),
    'range': _p.deprecated_cc($['range'], ($) => v_token.Range(
        $
    )),
    'value': _p.deprecated_cc($['value'], ($) => $),
    'type': _p.deprecated_cc($['type'], ($) => v_token.Text_Type(
        $
    )),
})
export const Key_Value_Pairs: t_signatures.Key_Value_Pairs = ($) => $.__l_map(($) => ({
    'key': _p.deprecated_cc($['key'], ($) => Text(
        $
    )),
    'value': _p.deprecated_cc($['value'], ($) => $.__o_map(($) => ({
        ':': _p.deprecated_cc($[':'], ($) => Structural_Token(
            $
        )),
        'value': _p.deprecated_cc($['value'], ($) => Value(
            $
        )),
    }))),
}))
export const Elements: t_signatures.Elements = ($) => $.__l_map(($) => ({
    'value': _p.deprecated_cc($['value'], ($) => Value(
        $
    )),
}))
export const Value: t_signatures.Value = ($) => ({
    'type': _p.deprecated_cc($['type'], ($) => _p.deprecated_cc($, ($): t_out.Value.type_ => {
        switch ($[0]) {
            case 'concrete': return _p.ss($, ($) => ['concrete', _p.deprecated_cc($, ($): t_out.Value.type_.concrete => {
                switch ($[0]) {
                    case 'dictionary': return _p.ss($, ($) => ['dictionary', ({
                        '{': _p.deprecated_cc($['{'], ($) => Structural_Token(
                            $
                        )),
                        'entries': _p.deprecated_cc($['entries'], ($) => Key_Value_Pairs(
                            $
                        )),
                        '}': _p.deprecated_cc($['}'], ($) => Structural_Token(
                            $
                        )),
                    })])
                    case 'group': return _p.ss($, ($) => ['group', _p.deprecated_cc($, ($): t_out.Value.type_.concrete.group => {
                        switch ($[0]) {
                            case 'concise': return _p.ss($, ($) => ['concise', ({
                                '<': _p.deprecated_cc($['<'], ($) => Structural_Token(
                                    $
                                )),
                                'elements': _p.deprecated_cc($['elements'], ($) => Elements(
                                    $
                                )),
                                '>': _p.deprecated_cc($['>'], ($) => Structural_Token(
                                    $
                                )),
                            })])
                            case 'verbose': return _p.ss($, ($) => ['verbose', ({
                                '(': _p.deprecated_cc($['('], ($) => Structural_Token(
                                    $
                                )),
                                'entries': _p.deprecated_cc($['entries'], ($) => Key_Value_Pairs(
                                    $
                                )),
                                ')': _p.deprecated_cc($[')'], ($) => Structural_Token(
                                    $
                                )),
                            })])
                            default: return _p.au($[0])
                        }
                    })])
                    case 'list': return _p.ss($, ($) => ['list', ({
                        '[': _p.deprecated_cc($['['], ($) => Structural_Token(
                            $
                        )),
                        'elements': _p.deprecated_cc($['elements'], ($) => Elements(
                            $
                        )),
                        ']': _p.deprecated_cc($[']'], ($) => Structural_Token(
                            $
                        )),
                    })])
                    case 'nothing': return _p.ss($, ($) => ['nothing', ({
                        '~': _p.deprecated_cc($['~'], ($) => Structural_Token(
                            $
                        )),
                    })])
                    case 'optional': return _p.ss($, ($) => ['optional', _p.deprecated_cc($, ($): t_out.Value.type_.concrete.optional => {
                        switch ($[0]) {
                            case 'set': return _p.ss($, ($) => ['set', ({
                                '*': _p.deprecated_cc($['*'], ($) => Structural_Token(
                                    $
                                )),
                                'value': _p.deprecated_cc($['value'], ($) => Value(
                                    $
                                )),
                            })])
                            default: return _p.au($[0])
                        }
                    })])
                    case 'state': return _p.ss($, ($) => ['state', ({
                        '|': _p.deprecated_cc($['|'], ($) => Structural_Token(
                            $
                        )),
                        'status': _p.deprecated_cc($['status'], ($) => _p.deprecated_cc($, ($): t_out.Value.type_.concrete.state.status => {
                            switch ($[0]) {
                                case 'missing data': return _p.ss($, ($) => ['missing data', ({
                                    '#': _p.deprecated_cc($['#'], ($) => Structural_Token(
                                        $
                                    )),
                                })])
                                case 'set': return _p.ss($, ($) => ['set', ({
                                    'option': _p.deprecated_cc($['option'], ($) => Text(
                                        $
                                    )),
                                    'value': _p.deprecated_cc($['value'], ($) => Value(
                                        $
                                    )),
                                })])
                                default: return _p.au($[0])
                            }
                        })),
                    })])
                    case 'text': return _p.ss($, ($) => ['text', Text(
                        $
                    )])
                    default: return _p.au($[0])
                }
            })])
            case 'include': return _p.ss($, ($) => ['include', ({
                '@': _p.deprecated_cc($['@'], ($) => Structural_Token(
                    $
                )),
                'path': _p.deprecated_cc($['path'], ($) => Text(
                    $
                )),
            })])
            case 'missing data': return _p.ss($, ($) => ['missing data', ({
                '#': _p.deprecated_cc($['#'], ($) => Structural_Token(
                    $
                )),
            })])
            default: return _p.au($[0])
        }
    })),
})
export const Content: t_signatures.Content = ($) => Value(
    $
)
export const Document: t_signatures.Document = ($) => ({
    'header': _p.deprecated_cc($['header'], ($) => $.__o_map(($) => ({
        '!': _p.deprecated_cc($['!'], ($) => Structural_Token(
            $
        )),
        'value': _p.deprecated_cc($['value'], ($) => Value(
            $
        )),
    }))),
    'content': _p.deprecated_cc($['content'], ($) => Content(
        $
    )),
})
