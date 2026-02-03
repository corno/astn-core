import * as _p from 'pareto-core/dist/expression'
import * as _pi from 'pareto-core/dist/interface'

import * as new_pi from "./new_interface_signatures"

import * as d_target from "../../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_parse_result from "../../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_source from "../../../../../interface/generated/liana/schemas/token/data"
export namespace signatures {

    export type Document = new_pi.Production_Without_Parameters<
        d_target.Document,
        d_source.Annotated_Token,
        d_parse_result.Expected
    >

    export type Value = new_pi.Production_Without_Parameters<
        d_target.Value,
        d_source.Annotated_Token,
        d_parse_result.Expected
    >

    export type Structural_Token = new_pi.Production_Without_Parameters<d_target.Structural_Token,
        d_source.Annotated_Token,
        d_parse_result.Expected
    >

    export type Text = new_pi.Production<
        d_target.Text,
        d_source.Annotated_Token,
        d_parse_result.Expected,
        {
            'string': d_source.Token_Type.text
        }
    >

    export type Items = new_pi.Production<
        d_target.Items,
        d_source.Annotated_Token,
        d_parse_result.Expected,
        {
            'end token': d_parse_result.Expected
        }
    >

    export type Element = new_pi.Production<
        d_target.Items,
        d_source.Annotated_Token,
        d_parse_result.Expected,
        {
            'end token': d_parse_result.Expected
        }
    >

    export type ID_Value_Pairs = new_pi.Production<
        d_target.ID_Value_Pairs,
        d_source.Annotated_Token,
        d_parse_result.Expected,
        {
            'end token': d_parse_result.Expected
        }
    >

}


export const Document: signatures.Document = (iterator) => ({
    'header': iterator.expect(
        [
            ['!', null],
            ['any value', null]
        ],
        (token, abort) => token.type[0] === '!'
            ? _p.optional.set({
                '!': Structural_Token(iterator),
                'value': Value(iterator)
            })
            : _p.optional.not_set()
    ),
    'content': Value(iterator)
})

export const Value: signatures.Value = (iterator) => iterator.expect(
    [
        ['any value', null]
    ],
    (token, abort) => ({
        'type': _p.decide.state(token.type, ($): d_target.Value.type_ => {
            switch ($[0]) {
                case 'text': return _p.ss($, ($): d_target.Value.type_ => ['concrete',
                    ['text', iterator.expect(
                        [
                            ['a text value', null]
                        ],
                        (token, abort) => token.type[0] === 'text'
                            ? String(iterator, { 'string': token.type[1] })
                            : abort()

                    )]
                ])
                case '{': return _p.ss($, ($) => ['concrete', ['dictionary', {
                    '{': Structural_Token(iterator),
                    'entries': ID_Value_Pairs(iterator, { 'end token': ['}', null] }),
                    '}': Structural_Token(iterator)
                }]])
                case '(': return _p.ss($, ($) => ['concrete', ['group', ['verbose', {
                    '(': Structural_Token(iterator),
                    'entries': ID_Value_Pairs(iterator, { 'end token': [')', null] }),
                    ')': Structural_Token(iterator)
                }]]])
                case '[': return _p.ss($, ($): d_target.Value.type_ => ['concrete', ['list', {
                    '[': Structural_Token(iterator),
                    'items': Items(iterator, { 'end token': [']', null] }),
                    ']': Structural_Token(iterator)
                }]])
                case '<': return _p.ss($, ($): d_target.Value.type_ => ['concrete', ['group', ['concise', {
                    '<': Structural_Token(iterator),
                    'items': Items(iterator, { 'end token': ['>', null] }),
                    '>': Structural_Token(iterator)
                }]]])
                case '@': return _p.ss($, ($) => ['include', {
                    '@': Structural_Token(iterator),
                    'path': iterator.expect(
                        [
                            ['a text value', null]
                        ],
                        (token, abort) => token.type[0] === 'text'
                            ? String(iterator, { 'string': token.type[1] })
                            : abort()
                    )
                }])
                case '~': return _p.ss($, ($) => ['concrete', ['nothing', {
                    '~': Structural_Token(iterator),
                }]])
                case '|': return _p.ss($, ($) => ['concrete', ['state', {
                    '|': Structural_Token(iterator),
                    'status': iterator.expect(
                        [
                            ['any value', null],
                            ['#', null]
                        ],
                        (token, abort) => _p.decide.state(token.type, ($): d_target.Value.type_.concrete.state.status => {
                            switch ($[0]) {
                                case 'text': return _p.ss($, ($) => ['set', {
                                    'option': String(iterator, { 'string': $ }),
                                    'value': Value(iterator)
                                }])
                                case '#': return _p.ss($, ($) => ['missing data', {
                                    '#': Structural_Token(iterator),
                                }])
                                default: return abort()
                            }
                        }))
                }]])
                case '*': return _p.ss($, ($) => ['concrete', ['optional', ['set', {
                    '*': Structural_Token(iterator),
                    'value': Value(iterator)
                }]]])
                case '#': return _p.ss($, ($) => ['missing data', {
                    '#': Structural_Token(iterator),
                }])

                //unexpected tokens

                // case '!': return _p.ss($, ($) => iterator.unexpected_token(token, _p.list.literal([
                //     ['any value', null]
                // ])))
                // case ':': return _p.ss($, ($) => iterator.unexpected_token(token, _p.list.literal([
                //     ['any value', null]
                // ])))
                // case ')': return _p.ss($, ($) => iterator.unexpected_token(token, _p.list.literal([
                //     ['any value', null]
                // ])))
                // case '>': return _p.ss($, ($) => iterator.unexpected_token(token, _p.list.literal([
                //     ['any value', null]
                // ])))
                // case ']': return _p.ss($, ($) => iterator.unexpected_token(token, _p.list.literal([
                //     ['any value', null]
                // ])))
                // case '}': return _p.ss($, ($) => iterator.unexpected_token(token, _p.list.literal([
                //     ['any value', null]
                // ])))
                default: return abort()
            }
        })
    })
)

export const Structural_Token: signatures.Structural_Token = (iterator) => iterator.consume((token) => ({
    'trailing trivia': token['trailing trivia'],
    'range': {
        'start': token['start'],
        'end': token['end']
    }
}))

export const String: signatures.Text = (iterator, $p) => iterator.consume((token) => ({
    'range': {
        'start': token['start'],
        'end': token['end']
    },
    'value': $p.string.value,
    'type': $p.string.type,
    'trailing trivia': token['trailing trivia'],
}))

export const Items: signatures.Items = (iterator, $p) => iterator.list(
    (current_token) => current_token.type[0] === $p['end token'][0],
    () => iterator.expect(
        [
            ['any value', null],
            $p['end token']
        ],
        (token, abort) => ({
            'value': Value(iterator)
        })
    )

)

export const ID_Value_Pairs: signatures.ID_Value_Pairs = (iterator, $p) => iterator.list(
    (current_token) => current_token.type[0] === $p['end token'][0],
    () => ({
        'id': iterator.expect(
            [
                ['a text value', null],
                $p['end token'],
            ],
            (token, abort) => token.type[0] === 'text'
                ? String(iterator, { 'string': token.type[1] })
                : abort()
        ),
        'value': iterator.expect(
            [
                ['a text value', null],
                [':', null],
                $p['end token'],
            ],
            (token, abort) => _p.decide.state(token.type, ($) => {
                switch ($[0]) {
                    case ':': return _p.ss($, ($) => _p.optional.set({
                        ':': Structural_Token(iterator),
                        'value': Value(iterator)
                    }))
                    case ')': return _p.ss($, ($) => _p.optional.not_set())
                    case '}': return _p.ss($, ($) => _p.optional.not_set())
                    case 'text': return _p.ss($, ($) => _p.optional.not_set())
                    default: return abort()
                }
            })
        ),
        ',': _p.optional.not_set() //FIXME implement optional comma (or keep it as 'whitespace' but then remove this property)
    })
)
