
import * as _p from "pareto-core/dist/transformer"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/token/marshall"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_serialize_number from "liana-core/dist/implementation/manual/primitives/integer/serializers/decimal"

import * as v_serialize_boolean from "liana-core/dist/implementation/manual/primitives/boolean/serializers/true_false"
export const Relative_Location: t_signatures.Relative_Location = ($,) => ['group', ['verbose', _p.dictionary.literal(({
    'uri': _p.deprecated_cc($['uri'], ($,) => ['text', ({
        'delimiter': ['quote', null],
        'value': $,
    })]),
    'line': _p.deprecated_cc($['line'], ($,) => ['text', ({
        'delimiter': ['backtick', null],
        'value': v_serialize_number.serialize($),
    })]),
    'column': _p.deprecated_cc($['column'], ($,) => ['text', ({
        'delimiter': ['backtick', null],
        'value': v_serialize_number.serialize($),
    })]),
}))]]
export const Location: t_signatures.Location = ($,) => ['group', ['verbose', _p.dictionary.literal(({
    'relative': _p.deprecated_cc($['relative'], ($,) => Relative_Location($)),
    'absolute': _p.deprecated_cc($['absolute'], ($,) => ['text', ({
        'delimiter': ['backtick', null],
        'value': v_serialize_number.serialize($),
    })]),
}))]]
export const Range: t_signatures.Range = ($,) => ['group', ['verbose', _p.dictionary.literal(({
    'start': _p.deprecated_cc($['start'], ($,) => Location($)),
    'end': _p.deprecated_cc($['end'], ($,) => Location($)),
}))]]
export const Whitespace: t_signatures.Whitespace = ($,) => ['group', ['verbose', _p.dictionary.literal(({
    'range': _p.deprecated_cc($['range'], ($,) => Range($)),
    'value': _p.deprecated_cc($['value'], ($,) => ['text', ({
        'delimiter': ['quote', null],
        'value': $,
    })]),
}))]]
export const Trivia: t_signatures.Trivia = ($,) => ['group', ['verbose', _p.dictionary.literal(({
    'leading whitespace': _p.deprecated_cc($['leading whitespace'], ($,) => Whitespace($)),
    'comments': _p.deprecated_cc($['comments'], ($,) => ['list', $.__l_map(($,) => ['group', ['verbose', _p.dictionary.literal(({
        'type': _p.deprecated_cc($['type'], ($,) => ['state', _p.decide.state($, ($,): t_out.Value.state => {
            switch ($[0]) {
                case 'line':
                    return _p.ss($, ($,) => ({
                        'option': "line",
                        'value': ['nothing', null],
                    }))
                case 'block':
                    return _p.ss($, ($,) => ({
                        'option': "block",
                        'value': ['nothing', null],
                    }))
                default:
                    return _p.au($[0])
            }
        })]),
        'content': _p.deprecated_cc($['content'], ($,) => ['text', ({
            'delimiter': ['quote', null],
            'value': $,
        })]),
        'range': _p.deprecated_cc($['range'], ($,) => Range($)),
        'trailing whitespace': _p.deprecated_cc($['trailing whitespace'], ($,) => Whitespace($)),
    }))]])]),
}))]]
export const Delimited_Text: t_signatures.Delimited_Text = ($,) => ['text', ({
    'delimiter': ['quote', null],
    'value': $,
})]
export const Text_Type: t_signatures.Text_Type = ($,) => ['state', _p.decide.state($, ($,): t_out.Value.state => {
    switch ($[0]) {
        case 'quoted':
            return _p.ss($, ($,) => ({
                'option': "quoted",
                'value': ['nothing', null],
            }))
        case 'apostrophed':
            return _p.ss($, ($,) => ({
                'option': "apostrophed",
                'value': ['nothing', null],
            }))
        case 'undelimited':
            return _p.ss($, ($,) => ({
                'option': "undelimited",
                'value': ['nothing', null],
            }))
        case 'backticked':
            return _p.ss($, ($,) => ({
                'option': "backticked",
                'value': ['nothing', null],
            }))
        default:
            return _p.au($[0])
    }
})]
export const Token_Type: t_signatures.Token_Type = ($,) => ['state', _p.decide.state($, ($,): t_out.Value.state => {
    switch ($[0]) {
        case '!':
            return _p.ss($, ($,) => ({
                'option': "!",
                'value': ['nothing', null],
            }))
        case '@':
            return _p.ss($, ($,) => ({
                'option': "@",
                'value': ['nothing', null],
            }))
        case ':':
            return _p.ss($, ($,) => ({
                'option': ":",
                'value': ['nothing', null],
            }))
        case '#':
            return _p.ss($, ($,) => ({
                'option': "#",
                'value': ['nothing', null],
            }))
        case '{':
            return _p.ss($, ($,) => ({
                'option': "{",
                'value': ['nothing', null],
            }))
        case '}':
            return _p.ss($, ($,) => ({
                'option': "}",
                'value': ['nothing', null],
            }))
        case '[':
            return _p.ss($, ($,) => ({
                'option': "[",
                'value': ['nothing', null],
            }))
        case ']':
            return _p.ss($, ($,) => ({
                'option': "]",
                'value': ['nothing', null],
            }))
        case '(':
            return _p.ss($, ($,) => ({
                'option': "(",
                'value': ['nothing', null],
            }))
        case ')':
            return _p.ss($, ($,) => ({
                'option': ")",
                'value': ['nothing', null],
            }))
        case '<':
            return _p.ss($, ($,) => ({
                'option': "<",
                'value': ['nothing', null],
            }))
        case '>':
            return _p.ss($, ($,) => ({
                'option': ">",
                'value': ['nothing', null],
            }))
        case '~':
            return _p.ss($, ($,) => ({
                'option': "~",
                'value': ['nothing', null],
            }))
        case '*':
            return _p.ss($, ($,) => ({
                'option': "*",
                'value': ['nothing', null],
            }))
        case '|':
            return _p.ss($, ($,) => ({
                'option': "|",
                'value': ['nothing', null],
            }))
        case 'text':
            return _p.ss($, ($,) => ({
                'option': "text",
                'value': ['group', ['verbose', _p.dictionary.literal(({
                    'value': _p.deprecated_cc($['value'], ($,) => Delimited_Text($)),
                    'type': _p.deprecated_cc($['type'], ($,) => Text_Type($)),
                }))]],
            }))
        default:
            return _p.au($[0])
    }
})]
export const Annotated_Token: t_signatures.Annotated_Token = ($,) => ['group', ['verbose', _p.dictionary.literal(({
    'start': _p.deprecated_cc($['start'], ($,) => Location($)),
    'type': _p.deprecated_cc($['type'], ($,) => Token_Type($)),
    'end': _p.deprecated_cc($['end'], ($,) => Location($)),
    'trailing trivia': _p.deprecated_cc($['trailing trivia'], ($,) => Trivia($)),
}))]]
export const Tokenizer_Result: t_signatures.Tokenizer_Result = ($,) => ['group', ['verbose', _p.dictionary.literal(({
    'leading trivia': _p.deprecated_cc($['leading trivia'], ($,) => Trivia($)),
    'tokens': _p.deprecated_cc($['tokens'], ($,) => ['list', $.__l_map(($,) => Annotated_Token($))]),
    'end': _p.deprecated_cc($['end'], ($,) => Location($)),
}))]]
