import * as p_ from 'pareto-core/dist/implementation/production'
import * as p_ti from 'pareto-core/dist/interface/transformer'
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

    export type Guaranteed_Structural_Token = p_pi.Production_With_Parameter<
        d_out.Structural_Token,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'token': d_in.Annotated_Token
        }
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
            'token': d_in.Annotated_Token
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

export const create_missing_token: p_ti.Transformer_With_Parameter<
    d_choice.Parser_Error.expected,
    d_choice.Parser_Error,
    {
        'end location': d_location.Location
    }
> = ($, $p) => ({
    'expected': $,
    'cause': ['missing token', {
        'end': $p['end location'],
    }]
})

export const create_unexpected_token: p_ti.Transformer_With_Parameter<
    d_choice.Parser_Error.expected,
    d_choice.Parser_Error,
    {
        'found': d_in.Annotated_Token
    }
> = ($, $p) => ({
    'expected': $,
    'cause': ['unexpected token', {
        'found': $p.found,
    }]
})

export const Document: interface_.Document = (iterator, abort) => ({
    'header': iterator.consume.optional({
        item: (token) => token.type[0] === '!' //header token
            ? p_.literal.set({
                '!': Guaranteed_Structural_Token(
                    iterator,
                    abort,
                    { 'token': token }
                ),
                'value': Value(iterator, abort)
            })
            : p_.literal.not_set(),
    }),
    'content': Value(iterator, abort)
})

export const Value: interface_.Value = (iterator, abort) => ({
    'type': iterator.peek_with_expectation({
        expected: p_.literal.list<d_choice.Expected>([
            ['any value', null]
        ]),
        no_item: (end_info, expected) => abort(create_missing_token(expected, { 'end location': end_info })),
        item: (token, expected) => p_.from.state(token.type).decide(
            ($): d_out.Value.type_ => {
                switch ($[0]) {
                    case 'text': return p_.ss($, ($): d_out.Value.type_ => ['concrete',
                        ['text', Text(
                            iterator,
                            abort,
                            { 'token': token, 'text': $ }
                        )]
                    ])
                    case '{': return p_.ss($, ($) => ['concrete', ['dictionary', {
                        '{': Guaranteed_Structural_Token(
                            iterator,
                            abort,
                            { 'token': token }
                        ),
                        'entries': ID_Value_Pairs(
                            iterator,
                            abort,
                            { 'end token': ['}', null] }),
                        '}': Possible_Structural_Token(
                            iterator,
                            abort,
                            { 'expected token': ['}', null] }),
                    }]])
                    case '(': return p_.ss($, ($) => ['concrete', ['group', ['verbose', {
                        '(': Guaranteed_Structural_Token(
                            iterator,
                            abort,
                            { 'token': token }
                        ),
                        'properties': ID_Value_Pairs(
                            iterator,
                            abort,
                            { 'end token': [')', null] }),
                        ')': Possible_Structural_Token(
                            iterator,
                            abort,
                            { 'expected token': [')', null] })
                    }]]])
                    case '[': return p_.ss($, ($): d_out.Value.type_ => ['concrete', ['list', {
                        '[': Guaranteed_Structural_Token(
                            iterator,
                            abort,
                            { 'token': token }
                        ),
                        'items': Items(
                            iterator,
                            abort,
                            { 'end token': [']', null] }),
                        ']': Possible_Structural_Token(
                            iterator,
                            abort,
                            { 'expected token': [']', null] })
                    }]])
                    case '<': return p_.ss($, ($): d_out.Value.type_ => ['concrete', ['group', ['concise', {
                        '<': Guaranteed_Structural_Token(
                            iterator,
                            abort,
                            { 'token': token }
                        ),
                        'properties': Items(
                            iterator,
                            abort,
                            { 'end token': ['>', null] }),
                        '>': Possible_Structural_Token(
                            iterator,
                            abort,
                            { 'expected token': ['>', null] })
                    }]]])
                    case '@': return p_.ss($, ($) => ['include', {
                        '@': Guaranteed_Structural_Token(
                            iterator,
                            abort,
                            { 'token': token }
                        ),
                        'path': iterator.peek_with_expectation({
                            expected: p_.literal.list<d_choice.Expected>([
                                ['a text value', null]
                            ]),
                            no_item: (end_info, expected) => abort(create_missing_token(expected, { 'end location': end_info })),
                            item: (token, expected) => token.type[0] === 'text'
                                ? Text(
                                    iterator,
                                    abort,
                                    { 'token': token, 'text': token.type[1] })
                                : abort(create_unexpected_token(expected, { 'found': token })),
                        })
                    }])
                    case '~': return p_.ss($, ($) => ['concrete', ['nothing', {
                        '~': Guaranteed_Structural_Token(
                            iterator,
                            abort,
                            { 'token': token }
                        ),
                    }]])
                    case '|': return p_.ss($, ($) => ['concrete', ['state', {
                        '|': Guaranteed_Structural_Token(
                            iterator,
                            abort,
                            { 'token': token }
                        ),
                        'status': iterator.peek_with_expectation({
                            expected: p_.literal.list<d_choice.Expected>([
                                ['a text value', null],
                                ['#', null]
                            ]),
                            no_item: (end_info, expected) => abort(create_missing_token(expected, { 'end location': end_info })),
                            item: (token, expected) => p_.from.state(token.type).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'text': return p_.ss($, ($) => ['set', {
                                            'option': Text(
                                                iterator,
                                                abort,
                                                { 'token': token, 'text': $ }),
                                            'value': Value(
                                                iterator,
                                                abort
                                            )
                                        }])
                                        case '#': return p_.ss($, ($) => ['missing', {
                                            '#': Guaranteed_Structural_Token(
                                                iterator,
                                                abort,
                                                { 'token': token }
                                            ),
                                        }])

                                        default: return abort(create_unexpected_token(expected, { 'found': token }))
                                    }
                                }),
                        })
                    }]])
                    case '_': return p_.ss($, ($) => ['concrete', ['optional', ['not set', {
                        '_': Guaranteed_Structural_Token(
                            iterator,
                            abort,
                            { 'token': token }
                        ),
                    }]]])
                    case '*': return p_.ss($, ($) => ['concrete', ['optional', ['set', {
                        '*': Guaranteed_Structural_Token(
                            iterator,
                            abort,
                            { 'token': token }
                        ),
                        'value': Value(
                            iterator,
                            abort
                        )
                    }]]])
                    case '#': return p_.ss($, ($) => ['missing', {
                        '#': Guaranteed_Structural_Token(
                            iterator,
                            abort,
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

                    default: return abort(create_unexpected_token(expected, { 'found': token }))
                }
            }),
    })
})

export const Guaranteed_Structural_Token: interface_.Guaranteed_Structural_Token = (iterator, abort, $p) => {
    iterator.consume.nothing(
        () => null,
        () => p_unreachable_code_path("guaranteed")
    ) //make this a 'discard' operation
    return {
        'trailing trivia': $p.token['trailing trivia'],
        'range': {
            'start': $p.token['start'],
            'end': $p.token['end']
        }
    }
}

export const Possible_Structural_Token: interface_.Possible_Structural_Token = (iterator, abort, $p) => iterator.peek_with_expectation({
    expected: p_.literal.list<d_choice.Expected>([
        $p['expected token']
    ]),
    no_item: (end_info, expected) => abort(create_missing_token(expected, { 'end location': end_info })),
    item: (token, expected) => {
        if (token.type[0] !== $p['expected token'][0]) {
            return abort(create_unexpected_token(expected, { 'found': token }))
        }
        iterator.consume.nothing( //discard
            () => null,
            () => p_unreachable_code_path("peeked (with 'expected')")
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

export const Text: interface_.Text = (iterator, abort, $p) => {
    iterator.consume.nothing( //discard
        () => null,
        () => p_unreachable_code_path("guaranteed (it has a token as parameter)")
    )

    return {
            'range': {
                'start': $p.token['start'],
                'end': $p.token['end']
            },
            'token': $p.text,
            'trailing trivia': $p.token['trailing trivia'],
        }
}

export const Items: interface_.Items = (iterator, abort, $p) => iterator.build_list({
    has_more_items: (current_token) => current_token.type[0] !== $p['end token'][0],
    handle: () => iterator.peek_with_expectation({
        expected: p_.literal.list<d_choice.Expected>([
            ['any value', null],
            $p['end token']
        ]),
        no_item: (end_info, expected) => abort(create_missing_token(expected, { 'end location': end_info })),
        item: (token, expected) => ({
            'value': Value(iterator, abort)
        }),
    }),
})

export const ID_Value_Pairs: interface_.ID_Value_Pairs = (iterator, abort, $p) => iterator.build_list({
    has_more_items: (current_token) => current_token.type[0] !== $p['end token'][0],
    handle: (): d_out.ID_Value_Pairs.L => ({
        'id': iterator.peek_with_expectation({
            expected: p_.literal.list<d_choice.Expected>([
                ['a text value', null],
                $p['end token'],
            ]),
            no_item: (end_info, expected) => abort(create_missing_token(expected, { 'end location': end_info })),
            item: (token, expected) => token.type[0] === 'text'
                ? Text(
                    iterator,
                    abort,
                    { 'token': token, 'text': token.type[1] })
                : abort(create_unexpected_token(expected, { 'found': token })),
        }),
        'assignment': iterator.peek_with_expectation({
            expected: p_.literal.list<d_choice.Expected>([
                ['a text value', null],
                [':', null],
                $p['end token']
            ]),
            no_item: (end_info, expected) => abort(create_missing_token(expected, { 'end location': end_info })),
            item: (token, expected) => p_.from.state(token.type).decide(
                ($) => {
                    switch ($[0]) {
                        case 'text': return p_.ss($, ($) => p_.literal.not_set())
                        case ':': return p_.ss($, ($) => p_.literal.set({
                            ':': Guaranteed_Structural_Token(
                                iterator,
                                abort,
                                { 'token': token }
                            ),
                            'value': p_.literal.set(
                                Value(
                                    iterator,
                                    abort
                                )
                            ) //FIXME determine if it is set... if the next token is a text, we will need to do an extra lookahead if there is a colon
                        }))

                        default: return $[0] === $p['end token'][0]
                            ? p_.literal.not_set()
                            : abort(create_unexpected_token(expected, { 'found': token }))
                    }
                }),
        }),
        // ',': p_.literal.not_set() //FIXME implement optional comma (or keep it as 'whitespace' but then remove this property)
    }),
})
