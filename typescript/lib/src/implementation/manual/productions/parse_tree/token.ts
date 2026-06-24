import * as p_ from 'pareto-core/dist/implementation/production'
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
        d_choice.Parser_Error.expected,
        d_in.Annotated_Token,
        d_location.Location
    >

    export type Value = p_pi.Production<
        d_out.Value,
        d_choice.Parser_Error,
        d_choice.Parser_Error.expected,
        d_in.Annotated_Token,
        d_location.Location
    >

    export type Guaranteed_Structural_Token = p_pi.Production_With_Parameter<
        d_out.Structural_Token,
        d_choice.Parser_Error,
        d_choice.Parser_Error.expected,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'token': d_in.Annotated_Token
        }
    >

    export type Possible_Structural_Token = p_pi.Production_With_Parameter<
        d_out.Structural_Token,
        d_choice.Parser_Error,
        d_choice.Parser_Error.expected,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'expected token': d_choice.Expected
        }
    >

    export type Text = p_pi.Production_With_Parameter<
        d_out.Text,
        d_choice.Parser_Error,
        d_choice.Parser_Error.expected,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'text': d_in.Annotated_Token.type_.text
        }
    >

    export type Items = p_pi.Production_With_Parameter<
        d_out.Items,
        d_choice.Parser_Error,
        d_choice.Parser_Error.expected,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'end token': d_choice.Expected
        }
    >

    export type Element = p_pi.Production_With_Parameter<
        d_out.Items,
        d_choice.Parser_Error,
        d_choice.Parser_Error.expected,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'end token': d_choice.Expected
        }
    >

    export type ID_Value_Pairs = p_pi.Production_With_Parameter<
        d_out.ID_Value_Pairs,
        d_choice.Parser_Error,
        d_choice.Parser_Error.expected,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'end token': d_choice.Expected
        }
    >

}



export const Document: interface_.Document = (iterator) => ({
    'header': iterator.optional({
        item: (token) => token.type[0] === '!' //header token
            ? p_.literal.set({
                '!': Guaranteed_Structural_Token(
                    iterator,
                    { 'token': token }
                ),
                'value': Value(iterator)
            })
            : p_.literal.not_set(),
    }),
    'content': Value(iterator)
})

export const Value: interface_.Value = (iterator) => iterator.expect({
    discard: false,
    expected: p_.literal.list<d_choice.Expected>([
        ['any value', null]
    ]),
    item: (token, abort2) => ({
        'type': p_.from.state(token.type).decide(
            ($): d_out.Value.type_ => {
                switch ($[0]) {
                    case 'text': return p_.ss($, ($): d_out.Value.type_ => ['concrete',
                        ['text', Text(
                            iterator,
                            { 'text': $ }
                        )]
                    ])
                    case '{': return p_.ss($, ($) => ['concrete', ['dictionary', {
                        '{': Guaranteed_Structural_Token(
                            iterator,
                            { 'token': token }
                        ),
                        'entries': ID_Value_Pairs(iterator, { 'end token': ['}', null] }),
                        '}': Possible_Structural_Token(iterator, { 'expected token': ['}', null] }),
                    }]])
                    case '(': return p_.ss($, ($) => ['concrete', ['group', ['verbose', {
                        '(': Guaranteed_Structural_Token(
                            iterator,
                            { 'token': token }
                        ),
                        'properties': ID_Value_Pairs(iterator, { 'end token': [')', null] }),
                        ')': Possible_Structural_Token(iterator, { 'expected token': [')', null] })
                    }]]])
                    case '[': return p_.ss($, ($): d_out.Value.type_ => ['concrete', ['list', {
                        '[': Guaranteed_Structural_Token(
                            iterator,
                            { 'token': token }
                        ),
                        'items': Items(iterator, { 'end token': [']', null] }),
                        ']': Possible_Structural_Token(iterator, { 'expected token': [']', null] })
                    }]])
                    case '<': return p_.ss($, ($): d_out.Value.type_ => ['concrete', ['group', ['concise', {
                        '<': Guaranteed_Structural_Token(
                            iterator,
                            { 'token': token }
                        ),
                        'properties': Items(iterator, { 'end token': ['>', null] }),
                        '>': Possible_Structural_Token(iterator, { 'expected token': ['>', null] })
                    }]]])
                    case '@': return p_.ss($, ($) => ['include', {
                        '@': Guaranteed_Structural_Token(
                            iterator,
                            { 'token': token }
                        ),
                        'path': iterator.expect({
                            discard: false,
                            expected: p_.literal.list([
                                ['a text value', null]
                            ]),
                            item: (token, abort2) => token.type[0] === 'text'
                                ? Text(iterator, { 'text': token.type[1] })
                                : abort2(null),
                        })
                    }])
                    case '~': return p_.ss($, ($) => ['concrete', ['nothing', {
                        '~': Guaranteed_Structural_Token(
                            iterator,
                            { 'token': token }
                        ),
                    }]])
                    case '|': return p_.ss($, ($) => ['concrete', ['state', {
                        '|': Guaranteed_Structural_Token(
                            iterator,
                            { 'token': token }
                        ),
                        'status': iterator.expect({
                            discard: false,
                            expected: p_.literal.list([
                                ['any value', null],
                                ['#', null]
                            ]),
                            item: (token, abort2) => p_.from.state(token.type).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'text': return p_.ss($, ($) => ['set', {
                                            'option': Text(iterator, { 'text': $ }),
                                            'value': Value(iterator)
                                        }])
                                        case '#': return p_.ss($, ($) => ['missing', {
                                            '#': Guaranteed_Structural_Token(
                                                iterator,
                                                { 'token': token }
                                            ),
                                        }])

                                        default: return abort2(null)
                                    }
                                }),
                        })
                    }]])
                    case '_': return p_.ss($, ($) => ['concrete', ['optional', ['not set', {
                        '_': Guaranteed_Structural_Token(
                            iterator,
                            { 'token': token }
                        ),
                    }]]])
                    case '*': return p_.ss($, ($) => ['concrete', ['optional', ['set', {
                        '*': Guaranteed_Structural_Token(
                            iterator,
                            { 'token': token }
                        ),
                        'value': Value(iterator)
                    }]]])
                    case '#': return p_.ss($, ($) => ['missing', {
                        '#': Guaranteed_Structural_Token(
                            iterator,
                            { 'token': token }
                        ),
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

export const Guaranteed_Structural_Token: interface_.Guaranteed_Structural_Token = (iterator, $p) => iterator.discard( //make this a 'discard' operation
    () => ({
        'trailing trivia': $p.token['trailing trivia'],
        'range': {
            'start': $p.token['start'],
            'end': $p.token['end']
        }
    }),
)

export const Possible_Structural_Token: interface_.Possible_Structural_Token = (iterator, $p) => iterator.expect({
    discard: false,
    expected: p_.literal.list<d_choice.Expected>([
        $p['expected token']
    ]),
    item: (token, abort2) => {
        if (token.type[0] !== $p['expected token'][0]) {
            return abort2(null)
        }
        iterator.discard(
            () => null
        )
        return ({
            'trailing trivia': token['trailing trivia'],
            'range': {
                'start': token['start'],
                'end': token['end']
            }
        })
    },
})

export const Text: interface_.Text = (iterator, $p) => iterator.consume(
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

export const Items: interface_.Items = (iterator, $p) => iterator.list({
    has_more_items: (current_token) => current_token.type[0] !== $p['end token'][0],
    handle: () => iterator.expect({
        discard: false,
        expected: p_.literal.list<d_choice.Expected>([
            ['any value', null],
            $p['end token']
        ]),
        item: (token, abort2) => ({
            'value': Value(iterator)
        }),
    }),
})

export const ID_Value_Pairs: interface_.ID_Value_Pairs = (iterator, $p) => iterator.list({
    has_more_items: (current_token) => current_token.type[0] !== $p['end token'][0],
    handle: (): d_out.ID_Value_Pairs.L => ({
        'id': iterator.expect({
            discard: false,
            expected: p_.literal.list<d_choice.Expected>([
                ['a text value', null],
                $p['end token'],
            ]),
            item: (token, abort2) => token.type[0] === 'text'
                ? Text(iterator, { 'text': token.type[1] })
                : abort2(null),
        }),
        'assignment': iterator.expect({
            discard: false,
            expected: p_.literal.list<d_choice.Expected>([
                ['a text value', null],
                [':', null],
                $p['end token']
            ]),
            item: (token, abort2) => p_.from.state(token.type).decide(
                ($) => {
                    switch ($[0]) {
                        case 'text': return p_.ss($, ($) => p_.literal.not_set())
                        case ':': return p_.ss($, ($) => p_.literal.set({
                            ':': Guaranteed_Structural_Token(
                                iterator,
                                { 'token': token }
                            ),
                            'value': p_.literal.set(Value(iterator)) //FIXME determine if it is set... if the next token is a text, we will need to do an extra lookahead if there is a colon
                        }))

                        default: return $[0] === $p['end token'][0] ? p_.literal.not_set() : abort2(null)
                    }
                }),
        }),
        // ',': p_.literal.not_set() //FIXME implement optional comma (or keep it as 'whitespace' but then remove this property)
    }),
})
