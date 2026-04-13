import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

import * as d_out from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_choice from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_in from "../../../../interface/generated/liana/schemas/token/data"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"
export namespace signatures {

    export type Document = _pi.Production<
        d_out.Document,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location
    >

    export type Value = _pi.Production<
        d_out.Value,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location
    >

    export type Guaranteed_Structural_Token = _pi.Production<
        d_out.Structural_Token,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location
    >

    export type Possible_Structural_Token = _pi.Production_With_Parameter<
        d_out.Structural_Token,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'expected token': d_choice.Expected
        }
    >

    export type Text = _pi.Production_With_Parameter<
        d_out.Text,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'text': d_in.Annotated_Token.type_.text
        }
    >

    export type Items = _pi.Production_With_Parameter<
        d_out.Items,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'end token': d_choice.Expected
        }
    >

    export type Element = _pi.Production_With_Parameter<
        d_out.Items,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'end token': d_choice.Expected
        }
    >

    export type ID_Value_Pairs = _pi.Production_With_Parameter<
        d_out.ID_Value_Pairs,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'end token': d_choice.Expected
        }
    >

}

const temp_create_error = (
    element: _pi.Optional_Value<d_in.Annotated_Token>,
    expected: _pi.List<d_choice.Expected>,
    end_info: d_location.Location
): d_choice.Parser_Error => ({
    'expected': expected,
    'cause': element.__decide<d_choice.Parser_Error.cause>(
        ($) => ['unexpected token', {
            'found': $,
        }],
        () => ['missing token', {
            'end': end_info,
        }]
    ),
})


export const Document: signatures.Document = (iterator, abort) => ({
    'header': iterator.optional({
        item: (token) => token.type[0] === '!' //header token
            ? _p.optional.literal.set({
                '!': Guaranteed_Structural_Token(iterator, abort),
                'value': Value(iterator, abort)
            })
            : _p.optional.literal.not_set(),
    }),
    'content': Value(iterator, abort)
})

export const Value: signatures.Value = (iterator, abort) => iterator.expect({
    abort: abort,
    get_error: ($) => temp_create_error(
        $,
        _p.list.literal<d_choice.Expected>([
            ['any value', null]
        ]),
        iterator.get_end_info()
    ),
    item: (token, abort) => ({
        'type': _p.decide.state(token.type, ($): d_out.Value.type_ => {
            switch ($[0]) {
                case 'text': return _p.ss($, ($): d_out.Value.type_ => ['concrete',
                    ['text', iterator.expect({
                        abort: abort,
                        get_error: () => _p.list.literal([
                            ['a text value', null]
                        ]),
                        item: (token, abort) => token.type[0] === 'text'
                            ? Text(iterator, abort, { 'text': token.type[1] })
                            : abort(),
                    })]
                ])
                case '{': return _p.ss($, ($) => ['concrete', ['dictionary', {
                    '{': Guaranteed_Structural_Token(iterator, abort),
                    'entries': ID_Value_Pairs(iterator, abort, { 'end token': ['}', null] }),
                    '}': Possible_Structural_Token(iterator, abort, { 'expected token': ['}', null] }),
                }]])
                case '(': return _p.ss($, ($) => ['concrete', ['group', ['verbose', {
                    '(': Guaranteed_Structural_Token(iterator, abort),
                    'entries': ID_Value_Pairs(iterator, abort, { 'end token': [')', null] }),
                    ')': Possible_Structural_Token(iterator, abort, { 'expected token': [')', null] })
                }]]])
                case '[': return _p.ss($, ($): d_out.Value.type_ => ['concrete', ['list', {
                    '[': Guaranteed_Structural_Token(iterator, abort),
                    'items': Items(iterator, abort, { 'end token': [']', null] }),
                    ']': Possible_Structural_Token(iterator, abort, { 'expected token': [']', null] })
                }]])
                case '<': return _p.ss($, ($): d_out.Value.type_ => ['concrete', ['group', ['concise', {
                    '<': Guaranteed_Structural_Token(iterator, abort),
                    'items': Items(iterator, abort, { 'end token': ['>', null] }),
                    '>': Possible_Structural_Token(iterator, abort, { 'expected token': ['>', null] })
                }]]])
                case '@': return _p.ss($, ($) => ['include', {
                    '@': Guaranteed_Structural_Token(iterator, abort),
                    'path': iterator.expect({
                        abort: abort,
                        get_error: () => _p.list.literal([
                            ['a text value', null]
                        ]),
                        item: (token, abort) => token.type[0] === 'text'
                            ? Text(iterator, abort, { 'text': token.type[1] })
                            : abort(),
                    })
                }])
                case '~': return _p.ss($, ($) => ['concrete', ['nothing', {
                    '~': Guaranteed_Structural_Token(iterator, abort),
                }]])
                case '|': return _p.ss($, ($) => ['concrete', ['state', {
                    '|': Guaranteed_Structural_Token(iterator, abort),
                    'status': iterator.expect({
                        abort: abort,
                        get_error: () => _p.list.literal([
                            ['any value', null],
                            ['#', null]
                        ]),
                        item: (token, abort) => _p.decide.state(token.type, ($): d_out.Value.type_.concrete.state.status => {
                            switch ($[0]) {
                                case 'text': return _p.ss($, ($) => ['set', {
                                    'option': Text(iterator, abort, { 'text': $ }),
                                    'value': Value(iterator, abort)
                                }])
                                case '#': return _p.ss($, ($) => ['missing', {
                                    '#': Guaranteed_Structural_Token(iterator, abort),
                                }])

                                default: return abort()
                            }
                        }),
                    })
                }]])
                case '_': return _p.ss($, ($) => ['concrete', ['optional', ['not set', {
                    '_': Guaranteed_Structural_Token(iterator, abort),
                }]]])
                case '*': return _p.ss($, ($) => ['concrete', ['optional', ['set', {
                    '*': Guaranteed_Structural_Token(iterator, abort),
                    'value': Value(iterator, abort)
                }]]])
                case '#': return _p.ss($, ($) => ['missing', {
                    '#': Guaranteed_Structural_Token(iterator, abort),
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
    }),
})

export const Guaranteed_Structural_Token: signatures.Guaranteed_Structural_Token = (iterator) => iterator.consume(
    (token) => ({
        'trailing trivia': token['trailing trivia'],
        'range': {
            'start': token['start'],
            'end': token['end']
        }
    }),
    () => _p_unreachable_code_path("this function should only be called when we are sure there is a structural token to consume")
)

export const Possible_Structural_Token: signatures.Possible_Structural_Token = (iterator, abort, $p) => iterator.expect({
    abort: abort,
    get_error: ($) => temp_create_error(
        $,
        _p.list.literal<d_choice.Expected>([
            $p['expected token']
        ]),
        iterator.get_end_info(),
    ),
    item: (token, abort) => ({
        'trailing trivia': token['trailing trivia'],
        'range': {
            'start': token['start'],
            'end': token['end']
        }
    }),
})

export const Text: signatures.Text = (iterator, abort, $p) => iterator.consume(
    (token) => ({
        'range': {
            'start': token['start'],
            'end': token['end']
        },
        'token': $p.text,
        'trailing trivia': token['trailing trivia'],
    }),
    () => _p_unreachable_code_path("this function should only be called when we are sure there is a text token to consume")

)

export const Items: signatures.Items = (iterator, abort, $p) => iterator.list({
    has_more_items: (current_token) => current_token.type[0] !== $p['end token'][0],
    handle: () => iterator.expect({
        abort: abort,
        get_error: ($) => temp_create_error(
            $,
            _p.list.literal<d_choice.Expected>([
                ['any value', null],
                $p['end token']
            ]),
            iterator.get_end_info(),
        ),
        item: (token, abort) => ({
            'value': Value(iterator, abort)
        }),
    }),
})

export const ID_Value_Pairs: signatures.ID_Value_Pairs = (iterator, abort, $p) => iterator.list({
    has_more_items: (current_token) => current_token.type[0] !== $p['end token'][0],
    handle: (): d_out.ID_Value_Pairs.L => ({
        'id': iterator.expect({
            abort: abort,
            get_error: ($) => temp_create_error(
                $,
                _p.list.literal<d_choice.Expected>([
                    ['a text value', null],
                    $p['end token'],
                ]),
                iterator.get_end_info(),
            ),
            item: (token, abort) => token.type[0] === 'text'
                ? Text(iterator, abort, { 'text': token.type[1] })
                : abort(),
        }),
        'assignment': iterator.expect({
            abort: abort,
            get_error: ($) => temp_create_error(
                $,
                _p.list.literal<d_choice.Expected>([
                    ['a text value', null],
                    [':', null],
                    $p['end token']
                ]),
                iterator.get_end_info(),
            ),
            item: (token, abort) => _p.decide.state(token.type, ($) => {
                switch ($[0]) {
                    case 'text': return _p.ss($, ($) => _p.optional.literal.not_set())
                    case ':': return _p.ss($, ($) => _p.optional.literal.set({
                        ':': Guaranteed_Structural_Token(iterator, abort),
                        'value': _p.optional.literal.set(Value(iterator, abort)) //FIXME determine if it is set... if the next token is a text, we will need to do an extra lookahead if there is a colon
                    }))
                    case ')': return _p.ss($, ($) => _p.optional.literal.not_set())
                    case '}': return _p.ss($, ($) => _p.optional.literal.not_set())
                    default: return abort()
                }
            }),
        }),
        // ',': _p.optional.literal.not_set() //FIXME implement optional comma (or keep it as 'whitespace' but then remove this property)
    }),
})
