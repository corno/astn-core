
import * as _p from "pareto-core/dist/transformer"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/parse_tree/marshall"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_serialize_number from "liana-core/dist/implementation/manual/primitives/integer/serializers/decimal"

import * as v_serialize_boolean from "liana-core/dist/implementation/manual/primitives/boolean/serializers/true_false"

import * as v_external__token from "../token/marshall"
export const Structural_Token: t_signatures.Structural_Token = ($,) => ['group', ['verbose', _p.dictionary.literal(({
    'trailing trivia': _p.deprecated_cc($['trailing trivia'], ($,) => v_external_token.Trivia($)),
    'range': _p.deprecated_cc($['range'], ($,) => v_external_token.Range($)),
}))]]
export const Text: t_signatures.Text = ($,) => ['group', ['verbose', _p.dictionary.literal(({
    'trailing trivia': _p.deprecated_cc($['trailing trivia'], ($,) => v_external_token.Trivia($)),
    'range': _p.deprecated_cc($['range'], ($,) => v_external_token.Range($)),
    'value': _p.deprecated_cc($['value'], ($,) => ['text', ({
        'delimiter': ['quote', null],
        'value': $,
    })]),
    'type': _p.deprecated_cc($['type'], ($,) => v_external_token.Text_Type($)),
}))]]
export const Key_Value_Pairs: t_signatures.Key_Value_Pairs = ($,) => ['list', $.__l_map(($,) => ['group', ['verbose', _p.dictionary.literal(({
    'key': _p.deprecated_cc($['key'], ($,) => Text($)),
    'value': _p.deprecated_cc($['value'], ($,) => ['optional', $(($,) => ['set', ['group', ['verbose', _p.dictionary.literal(({
        ':': _p.deprecated_cc($[':'], ($,) => Structural_Token($)),
        'value': _p.deprecated_cc($['value'], ($,) => Value($)),
    }))]]], () => ['set', ['group', ['verbose', _p.dictionary.literal(({
        ':': _p.deprecated_cc($[':'], ($,) => Structural_Token($)),
        'value': _p.deprecated_cc($['value'], ($,) => Value($)),
    }))]]])]),
}))]])]
export const Elements: t_signatures.Elements = ($,) => ['list', $.__l_map(($,) => ['group', ['verbose', _p.dictionary.literal(({
    'value': _p.deprecated_cc($['value'], ($,) => Value($)),
}))]])]
export const Value: t_signatures.Value = ($,) => ['group', ['verbose', _p.dictionary.literal(({
    'type': _p.deprecated_cc($['type'], ($,) => ['state', _p.decide.state($, ($,): t_out.Value.state => {
        switch ($[0]) {
            case 'concrete':
                return _p.ss($, ($,) => ({
                    'option': "concrete",
                    'value': ['state', _p.decide.state($, ($,): t_out.Value.state => {
                        switch ($[0]) {
                            case 'dictionary':
                                return _p.ss($, ($,) => ({
                                    'option': "dictionary",
                                    'value': ['group', ['verbose', _p.dictionary.literal(({
                                        '{': _p.deprecated_cc($['{'], ($,) => Structural_Token($)),
                                        'entries': _p.deprecated_cc($['entries'], ($,) => Key_Value_Pairs($)),
                                        '}': _p.deprecated_cc($['}'], ($,) => Structural_Token($)),
                                    }))]],
                                }))
                            case 'group':
                                return _p.ss($, ($,) => ({
                                    'option': "group",
                                    'value': ['state', _p.decide.state($, ($,): t_out.Value.state => {
                                        switch ($[0]) {
                                            case 'concise':
                                                return _p.ss($, ($,) => ({
                                                    'option': "concise",
                                                    'value': ['group', ['verbose', _p.dictionary.literal(({
                                                        '<': _p.deprecated_cc($['<'], ($,) => Structural_Token($)),
                                                        'elements': _p.deprecated_cc($['elements'], ($,) => Elements($)),
                                                        '>': _p.deprecated_cc($['>'], ($,) => Structural_Token($)),
                                                    }))]],
                                                }))
                                            case 'verbose':
                                                return _p.ss($, ($,) => ({
                                                    'option': "verbose",
                                                    'value': ['group', ['verbose', _p.dictionary.literal(({
                                                        '(': _p.deprecated_cc($['('], ($,) => Structural_Token($)),
                                                        'entries': _p.deprecated_cc($['entries'], ($,) => Key_Value_Pairs($)),
                                                        ')': _p.deprecated_cc($[')'], ($,) => Structural_Token($)),
                                                    }))]],
                                                }))
                                            default:
                                                return _p.au($[0])
                                        }
                                    })],
                                }))
                            case 'list':
                                return _p.ss($, ($,) => ({
                                    'option': "list",
                                    'value': ['group', ['verbose', _p.dictionary.literal(({
                                        '[': _p.deprecated_cc($['['], ($,) => Structural_Token($)),
                                        'elements': _p.deprecated_cc($['elements'], ($,) => Elements($)),
                                        ']': _p.deprecated_cc($[']'], ($,) => Structural_Token($)),
                                    }))]],
                                }))
                            case 'nothing':
                                return _p.ss($, ($,) => ({
                                    'option': "nothing",
                                    'value': ['group', ['verbose', _p.dictionary.literal(({
                                        '~': _p.deprecated_cc($['~'], ($,) => Structural_Token($)),
                                    }))]],
                                }))
                            case 'optional':
                                return _p.ss($, ($,) => ({
                                    'option': "optional",
                                    'value': ['state', _p.decide.state($, ($,): t_out.Value.state => {
                                        switch ($[0]) {
                                            case 'set':
                                                return _p.ss($, ($,) => ({
                                                    'option': "set",
                                                    'value': ['group', ['verbose', _p.dictionary.literal(({
                                                        '*': _p.deprecated_cc($['*'], ($,) => Structural_Token($)),
                                                        'value': _p.deprecated_cc($['value'], ($,) => Value($)),
                                                    }))]],
                                                }))
                                            default:
                                                return _p.au($[0])
                                        }
                                    })],
                                }))
                            case 'state':
                                return _p.ss($, ($,) => ({
                                    'option': "state",
                                    'value': ['group', ['verbose', _p.dictionary.literal(({
                                        '|': _p.deprecated_cc($['|'], ($,) => Structural_Token($)),
                                        'status': _p.deprecated_cc($['status'], ($,) => ['state', _p.decide.state($, ($,): t_out.Value.state => {
                                            switch ($[0]) {
                                                case 'missing data':
                                                    return _p.ss($, ($,) => ({
                                                        'option': "missing data",
                                                        'value': ['group', ['verbose', _p.dictionary.literal(({
                                                            '#': _p.deprecated_cc($['#'], ($,) => Structural_Token($)),
                                                        }))]],
                                                    }))
                                                case 'set':
                                                    return _p.ss($, ($,) => ({
                                                        'option': "set",
                                                        'value': ['group', ['verbose', _p.dictionary.literal(({
                                                            'option': _p.deprecated_cc($['option'], ($,) => Text($)),
                                                            'value': _p.deprecated_cc($['value'], ($,) => Value($)),
                                                        }))]],
                                                    }))
                                                default:
                                                    return _p.au($[0])
                                            }
                                        })]),
                                    }))]],
                                }))
                            case 'text':
                                return _p.ss($, ($,) => ({
                                    'option': "text",
                                    'value': Text($),
                                }))
                            default:
                                return _p.au($[0])
                        }
                    })],
                }))
            case 'include':
                return _p.ss($, ($,) => ({
                    'option': "include",
                    'value': ['group', ['verbose', _p.dictionary.literal(({
                        '@': _p.deprecated_cc($['@'], ($,) => Structural_Token($)),
                        'path': _p.deprecated_cc($['path'], ($,) => Text($)),
                    }))]],
                }))
            case 'missing data':
                return _p.ss($, ($,) => ({
                    'option': "missing data",
                    'value': ['group', ['verbose', _p.dictionary.literal(({
                        '#': _p.deprecated_cc($['#'], ($,) => Structural_Token($)),
                    }))]],
                }))
            default:
                return _p.au($[0])
        }
    })]),
}))]]
export const Content: t_signatures.Content = ($,) => Value($)
export const Document: t_signatures.Document = ($,) => ['group', ['verbose', _p.dictionary.literal(({
    'header': _p.deprecated_cc($['header'], ($,) => ['optional', $(($,) => ['set', ['group', ['verbose', _p.dictionary.literal(({
        '!': _p.deprecated_cc($['!'], ($,) => Structural_Token($)),
        'value': _p.deprecated_cc($['value'], ($,) => Value($)),
    }))]]], () => ['set', ['group', ['verbose', _p.dictionary.literal(({
        '!': _p.deprecated_cc($['!'], ($,) => Structural_Token($)),
        'value': _p.deprecated_cc($['value'], ($,) => Value($)),
    }))]]])]),
    'content': _p.deprecated_cc($['content'], ($,) => Content($)),
}))]]
