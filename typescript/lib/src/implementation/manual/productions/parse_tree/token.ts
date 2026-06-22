import * as p_ from 'pareto-core/dist/implementation/production'
import * as p_t from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
import * as p_pi from 'pareto-core/dist/interface/production'
import p_unreachable_code_path from 'pareto-core/dist/implementation/transformer/specials/unreachable_code_path'

//data types
import * as d_out from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_choice from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_in from "../../../../interface/generated/liana/schemas/token/data"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"


export namespace interface_ {

    export type Document = p_pi.Production<
        d_out.Document,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location
    >

    export type Value = p_pi.Production<
        d_out.Value,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location
    >

    export type Guaranteed_Structural_Token = p_pi.Production<
        d_out.Structural_Token,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location
    >

    export type Possible_Structural_Token = p_pi.Production_With_Parameter<
        d_out.Structural_Token,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'expected token': d_choice.Expected
        }
    >

    export type Text = p_pi.Production_With_Parameter<
        d_out.Text,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'text': d_in.Annotated_Token.type_.text
        }
    >

    export type Items = p_pi.Production_With_Parameter<
        d_out.Items,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'end token': d_choice.Expected
        }
    >

    export type Element = p_pi.Production_With_Parameter<
        d_out.Items,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'end token': d_choice.Expected
        }
    >

    export type ID_Value_Pairs = p_pi.Production_With_Parameter<
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
    element: p_di.Optional_Value<d_in.Annotated_Token>,
    expected: p_di.List<d_choice.Expected>,
    end_info: d_location.Location
): d_choice.Parser_Error => ({
    'expected': expected,
    'cause': p_t.from.optional(element).decide<d_choice.Parser_Error.cause>(
        ($) => ['unexpected token', {
            'found': $,
        }],
        () => ['missing token', {
            'end': end_info,
        }]
    ),
})


export const Document: interface_.Document = (iterator, abort) => ({
    'header': iterator.optional({
        item: (token) => token.type[0] === '!' //header token
            ? p_.literal.set({
                '!': Guaranteed_Structural_Token(iterator, abort),
                'value': Value(iterator, abort)
            })
            : p_.literal.not_set(),
    }),
    'content': Value(iterator, abort)
})

export const Value: interface_.Value = (iterator, abort) => iterator.expect({
    abort: abort,
    get_error: ($) => temp_create_error(
        $,
        p_.literal.list<d_choice.Expected>([
            ['any value', null]
        ]),
        iterator.get_end_info()
    ),
    item: (token, abort2) => ({
        'type': p_.from.state(token.type).decide(($): d_out.Value.type_ => {
            switch ($[0]) {
                case 'text': return p_.ss($, ($): d_out.Value.type_ => ['concrete',
                    ['text', iterator.expect({
                        abort: abort,
                        get_error: ($) => temp_create_error(
                            $,
                            p_.literal.list([
                                ['a text value', null]
                            ]),
                            iterator.get_end_info()
                        ),
                        item: (token, abort2) => token.type[0] === 'text'
                            ? Text(iterator, abort, { 'text': token.type[1] })
                            : abort2(null),
                    })]
                ])
                case '{': return p_.ss($, ($) => ['concrete', ['dictionary', {
                    '{': Guaranteed_Structural_Token(iterator, abort),
                    'entries': ID_Value_Pairs(iterator, abort, { 'end token': ['}', null] }),
                    '}': Possible_Structural_Token(iterator, abort, { 'expected token': ['}', null] }),
                }]])
                case '(': return p_.ss($, ($) => ['concrete', ['group', ['verbose', {
                    '(': Guaranteed_Structural_Token(iterator, abort),
                    'properties': ID_Value_Pairs(iterator, abort, { 'end token': [')', null] }),
                    ')': Possible_Structural_Token(iterator, abort, { 'expected token': [')', null] })
                }]]])
                case '[': return p_.ss($, ($): d_out.Value.type_ => ['concrete', ['list', {
                    '[': Guaranteed_Structural_Token(iterator, abort),
                    'items': Items(iterator, abort, { 'end token': [']', null] }),
                    ']': Possible_Structural_Token(iterator, abort, { 'expected token': [']', null] })
                }]])
                case '<': return p_.ss($, ($): d_out.Value.type_ => ['concrete', ['group', ['concise', {
                    '<': Guaranteed_Structural_Token(iterator, abort),
                    'properties': Items(iterator, abort, { 'end token': ['>', null] }),
                    '>': Possible_Structural_Token(iterator, abort, { 'expected token': ['>', null] })
                }]]])
                case '@': return p_.ss($, ($) => ['include', {
                    '@': Guaranteed_Structural_Token(iterator, abort),
                    'path': iterator.expect({
                        abort: abort,
                        get_error: ($) => temp_create_error(
                            $,
                            p_.literal.list([
                                ['a text value', null]
                            ]),
                            iterator.get_end_info()
                        ),
                        item: (token, abort2) => token.type[0] === 'text'
                            ? Text(iterator, abort, { 'text': token.type[1] })
                            : abort2(null),
                    })
                }])
                case '~': return p_.ss($, ($) => ['concrete', ['nothing', {
                    '~': Guaranteed_Structural_Token(iterator, abort),
                }]])
                case '|': return p_.ss($, ($) => ['concrete', ['state', {
                    '|': Guaranteed_Structural_Token(iterator, abort),
                    'status': iterator.expect({
                        abort: abort,
                        get_error: ($) => temp_create_error(
                            $,
                            p_.literal.list([
                                ['any value', null],
                                ['#', null]
                            ]),
                            iterator.get_end_info()
                        ),
                        item: (token, abort2) => p_.from.state(token.type).decide(($): d_out.Value.type_.concrete.state.status => {
                            switch ($[0]) {
                                case 'text': return p_.ss($, ($) => ['set', {
                                    'option': Text(iterator, abort, { 'text': $ }),
                                    'value': Value(iterator, abort)
                                }])
                                case '#': return p_.ss($, ($) => ['missing', {
                                    '#': Guaranteed_Structural_Token(iterator, abort),
                                }])

                                default: return abort2(null)
                            }
                        }),
                    })
                }]])
                case '_': return p_.ss($, ($) => ['concrete', ['optional', ['not set', {
                    '_': Guaranteed_Structural_Token(iterator, abort),
                }]]])
                case '*': return p_.ss($, ($) => ['concrete', ['optional', ['set', {
                    '*': Guaranteed_Structural_Token(iterator, abort),
                    'value': Value(iterator, abort)
                }]]])
                case '#': return p_.ss($, ($) => ['missing', {
                    '#': Guaranteed_Structural_Token(iterator, abort),
                }])

                //unexpected tokens

                // case '!': return p_.ss($, ($) => iterator.unexpected_token(token, p_.literal.list([
                //     ['any value', null]
                // ])))
                // case ':': return p_.ss($, ($) => iterator.unexpected_token(token, p_.literal.list([
                //     ['any value', null]
                // ])))
                // case ')': return p_.ss($, ($) => iterator.unexpected_token(token, p_.literal.list([
                //     ['any value', null]
                // ])))
                // case '>': return p_.ss($, ($) => iterator.unexpected_token(token, p_.literal.list([
                //     ['any value', null]
                // ])))
                // case ']': return p_.ss($, ($) => iterator.unexpected_token(token, p_.literal.list([
                //     ['any value', null]
                // ])))
                // case '}': return p_.ss($, ($) => iterator.unexpected_token(token, p_.literal.list([
                //     ['any value', null]
                // ])))

                default: return abort2(null)
            }
        })
    }),
})

export const Guaranteed_Structural_Token: interface_.Guaranteed_Structural_Token = (iterator) => iterator.consume(
    (token) => ({
        'trailing trivia': token['trailing trivia'],
        'range': {
            'start': token['start'],
            'end': token['end']
        }
    }),
    () => p_unreachable_code_path("this function should only be called when we are sure there is a structural token to consume")
)

export const Possible_Structural_Token: interface_.Possible_Structural_Token = (iterator, abort, $p) => iterator.expect({
    abort: abort,
    get_error: ($) => temp_create_error(
        $,
        p_.literal.list<d_choice.Expected>([
            $p['expected token']
        ]),
        iterator.get_end_info(),
    ),
    item: (token, abort2) => {
        iterator.discard(() => null)
        return ({
            'trailing trivia': token['trailing trivia'],
            'range': {
                'start': token['start'],
                'end': token['end']
            }
        })
    },
})

export const Text: interface_.Text = (iterator, abort, $p) => iterator.consume(
    (token) => ({
        'range': {
            'start': token['start'],
            'end': token['end']
        },
        'token': $p.text,
        'trailing trivia': token['trailing trivia'],
    }),
    () => p_unreachable_code_path("this function should only be called when we are sure there is a text token to consume")

)

export const Items: interface_.Items = (iterator, abort, $p) => iterator.list({
    has_more_items: (current_token) => current_token.type[0] !== $p['end token'][0],
    handle: () => iterator.expect({
        abort: abort,
        get_error: ($) => temp_create_error(
            $,
            p_.literal.list<d_choice.Expected>([
                ['any value', null],
                $p['end token']
            ]),
            iterator.get_end_info(),
        ),
        item: (token, abort2) => ({
            'value': Value(iterator, abort)
        }),
    }),
})

export const ID_Value_Pairs: interface_.ID_Value_Pairs = (iterator, abort, $p) => iterator.list({
    has_more_items: (current_token) => current_token.type[0] !== $p['end token'][0],
    handle: (): d_out.ID_Value_Pairs.L => ({
        'id': iterator.expect({
            abort: abort,
            get_error: ($) => temp_create_error(
                $,
                p_.literal.list<d_choice.Expected>([
                    ['a text value', null],
                    $p['end token'],
                ]),
                iterator.get_end_info(),
            ),
            item: (token, abort2) => token.type[0] === 'text'
                ? Text(iterator, abort, { 'text': token.type[1] })
                : abort2(null),
        }),
        'assignment': iterator.expect({
            abort: abort,
            get_error: ($) => temp_create_error(
                $,
                p_.literal.list<d_choice.Expected>([
                    ['a text value', null],
                    [':', null],
                    $p['end token']
                ]),
                iterator.get_end_info(),
            ),
            item: (token, abort2) => p_.from.state(token.type).decide(($) => {
                switch ($[0]) {
                    case 'text': return p_.ss($, ($) => p_.literal.not_set())
                    case ':': return p_.ss($, ($) => p_.literal.set({
                        ':': Guaranteed_Structural_Token(iterator, abort),
                        'value': p_.literal.set(Value(iterator, abort)) //FIXME determine if it is set... if the next token is a text, we will need to do an extra lookahead if there is a colon
                    }))

                    default: return $[0] === $p['end token'][0] ? p_.literal.not_set() : abort2(null)
                }
            }),
        }),
        // ',': p_.literal.not_set() //FIXME implement optional comma (or keep it as 'whitespace' but then remove this property)
    }),
})
