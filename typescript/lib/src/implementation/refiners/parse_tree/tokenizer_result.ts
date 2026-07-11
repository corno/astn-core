import * as p_ from 'pareto-core/implementation/refiner'
import type * as p_ti from 'pareto-core/interface/transformer'
import p_iterate from 'pareto-core/implementation/refiner/specials/iterate'
import p_unreachable_code_path from 'pareto-core/implementation/transformer/specials/unreachable_code_path'

//data types
import type * as s_choice from "../../../interface/schemas/deserialize_parse_tree.js"
import type * as s_out from "../../../interface/schemas/parse_tree.js"
import type * as s_in from "../../../interface/schemas/token.js"
import type * as s_location from "../../../interface/schemas/location.js"

import type * as interface_ from "../../../declarations/refiners/parse_tree/tokenizer_result.js"

export const create_missing_token: p_ti.Transformer_With_Parameter<
    s_choice.Parser_Error.expected,
    s_choice.Parser_Error,
    {
        'end location': s_location.Location
    }
> = ($, $p) => ({
    'expected': $,
    'cause': ['missing token', {
        'end': $p['end location'],
    }]
})

export const create_unexpected_token: p_ti.Transformer_With_Parameter<
    s_choice.Parser_Error.expected,
    s_choice.Parser_Error,
    {
        'found': s_in.Annotated_Token
    }
> = ($, $p) => ({
    'expected': $,
    'cause': ['unexpected token', {
        'found': $p.found,
    }]
})

export const Value: interface_.Value = (iterator, abort) => ({
    'type': iterator.peek_with_expectation(
        p_.literal.list<s_choice.Expected>([
            ['any value', null]
        ]),
        ($, expected) => abort(create_missing_token(expected, { 'end location': $ })),
        ($, expected) => {
            const token = $
            return p_.from.state($.type).decide(
                ($) => {
                    switch ($[0]) {
                        case 'text': return p_.option($, ($) => ['concrete',
                            ['text', Text(
                                iterator,
                                abort,
                                { 'token': token, 'text': $ }
                            )]
                        ])
                        case '{': return p_.option($, ($) => ['concrete', ['dictionary', {
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
                        case '(': return p_.option($, ($) => ['concrete', ['group', ['verbose', {
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
                        case '[': return p_.option($, ($) => ['concrete', ['list', {
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
                        case '<': return p_.option($, ($) => ['concrete', ['group', ['concise', {
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
                        case '@': return p_.option($, ($) => ['include', {
                            '@': Guaranteed_Structural_Token(
                                iterator,
                                abort,
                                { 'token': token }
                            ),
                            'path': iterator.peek_with_expectation(
                                p_.literal.list<s_choice.Expected>([
                                    ['a text value', null]
                                ]),
                                (end_info, expected) => abort(create_missing_token(expected, { 'end location': end_info })),
                                ($, expected) => $.type[0] === 'text'
                                    ? Text(
                                        iterator,
                                        abort,
                                        { 'token': $, 'text': $.type[1] })
                                    : abort(create_unexpected_token(expected, { 'found': $ })),
                            )
                        }])
                        case '~': return p_.option($, ($) => ['concrete', ['nothing', {
                            '~': Guaranteed_Structural_Token(
                                iterator,
                                abort,
                                { 'token': token }
                            ),
                        }]])
                        case '|': return p_.option($, ($) => ['concrete', ['state', {
                            '|': Guaranteed_Structural_Token(
                                iterator,
                                abort,
                                { 'token': token }
                            ),
                            'status': iterator.peek_with_expectation(
                                p_.literal.list<s_choice.Expected>([
                                    ['a text value', null],
                                    ['#', null]
                                ]),
                                ($, expected) => abort(create_missing_token(expected, { 'end location': $ })),
                                ($, expected) => {
                                    const token = $
                                    return p_.from.state($.type).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'text': return p_.option($, ($) => ['set', {
                                                    'option': Text(
                                                        iterator,
                                                        abort,
                                                        { 'token': token, 'text': $ }),
                                                    'value': Value(
                                                        iterator,
                                                        abort
                                                    )
                                                }])
                                                case '#': return p_.option($, ($) => ['missing', {
                                                    '#': Guaranteed_Structural_Token(
                                                        iterator,
                                                        abort,
                                                        { 'token': token }
                                                    ),
                                                }])

                                                default: return abort(create_unexpected_token(expected, { 'found': token }))
                                            }
                                        }
                                    )
                                },
                            )
                        }]])
                        case '_': return p_.option($, ($) => ['concrete', ['optional', ['not set', {
                            '_': Guaranteed_Structural_Token(
                                iterator,
                                abort,
                                { 'token': token }
                            ),
                        }]]])
                        case '*': return p_.option($, ($) => ['concrete', ['optional', ['set', {
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
                        case '#': return p_.option($, ($) => ['missing', {
                            '#': Guaranteed_Structural_Token(
                                iterator,
                                abort,
                                { 'token': token }
                            ),
                        }])

                        //unexpected tokens

                        // case '!': return p_.option($, ($) => iterator.unexpected_token(token, p_.literal.list([
                        //     ['any value', null]
                        // ])))
                        // case ':': return p_.option($, ($) => iterator.unexpected_token(token, p_.literal.list([
                        //     ['any value', null]
                        // ])))
                        // case ')': return p_.option($, ($) => iterator.unexpected_token(token, p_.literal.list([
                        //     ['any value', null]
                        // ])))
                        // case '>': return p_.option($, ($) => iterator.unexpected_token(token, p_.literal.list([
                        //     ['any value', null]
                        // ])))
                        // case ']': return p_.option($, ($) => iterator.unexpected_token(token, p_.literal.list([
                        //     ['any value', null]
                        // ])))
                        // case '}': return p_.option($, ($) => iterator.unexpected_token(token, p_.literal.list([
                        //     ['any value', null]
                        // ])))

                        default: return abort(create_unexpected_token(expected, { 'found': token }))
                    }
                }
            )
        },
    )
})

export const Guaranteed_Structural_Token: interface_.Guaranteed_Structural_Token = (iterator, abort, $p) => {
    iterator.consume(
        () => p_unreachable_code_path("guaranteed"),
        () => null,
    ) //make this a 'discard' operation
    return {
        'trailing trivia': $p.token['trailing trivia'],
        'range': {
            'start': $p.token['start'],
            'end': $p.token['end']
        }
    }
}

export const Possible_Structural_Token: interface_.Possible_Structural_Token = (iterator, abort, $p) => iterator.peek_with_expectation(
    p_.literal.list<s_choice.Expected>([
        $p['expected token']
    ]),
    ($, expected) => abort(create_missing_token(expected, { 'end location': $ })),
    ($, expected) => {
        const token = $
        if ($.type[0] !== $p['expected token'][0]) {
            return abort(create_unexpected_token(expected, { 'found': token }))
        } else {
            return iterator.consume( //discard
                () => p_unreachable_code_path("peeked (with 'expected')"),
                () => ({
                    'trailing trivia': token['trailing trivia'],
                    'range': {
                        'start': token['start'],
                        'end': token['end']
                    }
                }),
            )
        }
    },
)

export const Text: interface_.Text = (iterator, abort, $p) => {
    return iterator.consume(
        () => p_unreachable_code_path("guaranteed (it has a token as parameter)"),
        ($) => ({
            'range': {
                'start': $['start'],
                'end': $['end']
            },
            'token': $p.text,
            'trailing trivia': $['trailing trivia'],
        }),
    )

}

export const Items: interface_.Items = (iterator, abort, $p) => iterator.build_list({
    has_more_items: (current_token) => current_token.type[0] !== $p['end token'][0],
    handle: () => iterator.peek( //for the proper error message (any value or end token) we peek instead of processing the token directly
        ($) => abort(create_missing_token(
            p_.literal.list<s_choice.Expected>([
                ['any value', null],
                $p['end token']
            ]),
            { 'end location': $ }
        )),
        ($) => ({
            'value': Value(iterator, abort)
        }),
    ),
    on_no_progression: () => p_unreachable_code_path("'handle' is expected to always consume at least one token, so this should never happen"),
})

export const ID_Value_Pairs: interface_.ID_Value_Pairs = (iterator, abort, $p) => iterator.build_list({
    has_more_items: ($) => $.type[0] !== $p['end token'][0],
    handle: (): s_out.ID_Value_Pairs.L => ({
        'id': iterator.peek( //to get a better error message (a text value or end token) we peek instead of processing the Text token directly
            () => p_unreachable_code_path("has more items is true"),
            ($) => $.type[0] === 'text'
                ? Text(
                    iterator,
                    abort,
                    {
                        'token': $,
                        'text': $.type[1]
                    }
                )
                : abort(
                    create_unexpected_token(
                        p_.literal.list<s_choice.Expected>([
                            ['a text value', null],
                            $p['end token'],
                        ]),
                        { 'found': $ }
                    )
                ),
        ),
        'assignment': iterator.peek_with_expectation<
            s_out.ID_Value_Pair.assignment,
            s_choice.Parser_Error.expected
        >(
            p_.literal.list([
                ['a text value', null],
                [':', null],
                $p['end token']
            ]),
            ($, expected) => abort(create_missing_token(expected, { 'end location': $ })),
            ($, expected) => {
                const token = $
                return p_.from.state($.type).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'text': return p_.option($, ($) => p_.literal.not_set())
                            case ':': return p_.option($, ($) => p_.literal.set({
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
                    }
                )
            },
        ),
        // ',': p_.literal.not_set() //FIXME implement optional comma (or keep it as 'whitespace' but then remove this property)
    }),
    on_no_progression: () => p_unreachable_code_path("'handle' is expected to always consume at least one token, so this should never happen"),
})

export const Document: interface_.Document = ($, abort) => p_iterate<
    s_out.Document,
    s_in.Tokenizer_Result.tokens.L,
    s_location.Location

>({
    list: $.tokens,
    end_info: $.end,
    assign: (iterator) => ({
        'header': iterator.peek(
            ($) => p_.literal.not_set(),
            ($) => $.type[0] === '!' //header token
                ? iterator.consume(
                    () => p_unreachable_code_path("peeked (with 'expected')"),
                    ($) => p_.literal.set({
                        '!': Guaranteed_Structural_Token(
                            iterator,
                            abort,
                            { 'token': $ }
                        ),
                        'value': Value(iterator, abort)
                    })
                )
                : p_.literal.not_set(),
        ),
        'content': Value(iterator, abort)
    }),
    on_dangling_item: null, //FIX enable checking for too many tokens
})