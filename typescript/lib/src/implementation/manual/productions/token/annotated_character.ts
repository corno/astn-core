import * as p_ from 'pareto-core/dist/implementation/production'
import * as p_t from 'pareto-core/dist/implementation/transformer'
import * as p_di from 'pareto-core/dist/interface/data'
import * as p_ri from 'pareto-core/dist/interface/refiner'
import * as p_pi from 'pareto-core/dist/interface/production'
import p_unreachable_code_path from 'pareto-core/dist/implementation/transformer/specials/unreachable_code_path'
import p_list_build_deprecated from 'pareto-core/dist/implementation/refiner/specials/list_build_deprecated'
import p_text_from_list from 'pareto-core/dist/implementation/transformer/specials/text_from_list'
import p_change_context from 'pareto-core/dist/implementation/refiner/specials/change_context'

import * as d_in from "../../../../interface/data/annotated_characters"
import * as d_out from "../../../../interface/generated/liana/schemas/token/data"
import * as d_function from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"

import * as d_temp_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_loc from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

//dependencies



const create_range: p_pi.Production_Without_Error_With_Parameter<
    d_temp_location.Range,
    d_in.Annotated_Character,
    d_location.Location,
    {
        'start character': d_in.Annotated_Character
    }
> = (
    iterator,
    $p
): d_temp_location.Range => ({
    'start': $p['start character'].location,
    'end': iterator.look(
        (next) => next.location,
        (end_info) => end_info
    )
})


export const Whitespace: p_pi.Production_Without_Error<
    d_out.Whitespace,
    d_in.Annotated_Character,
    d_location.Location
> = (
    iterator,
): d_out.Whitespace => {

        const is_whitespace_character = ($: d_in.Annotated_Character) => {
            switch ($.code) {
                case 0x09: // \t
                    return true
                case 0x0A: // \n
                    return true
                case 0x0D: // \r
                    return true
                case 0x20: // space
                    return true
                case 0x2C: // ,
                    return true
                default:
                    return false
            }
        }

        const next = iterator.look_raw()
        if (next === null) {
            return p_.literal.not_set()
        } else {
            if (!is_whitespace_character(next[0])) {
                return p_.literal.not_set()
            } else {
                const start_character = next[0]
                return p_.literal.set({
                    'value': p_text_from_list<number>(
                        iterator.list({
                            has_more_items: ($) => is_whitespace_character($),
                            handle: ($) => {
                                iterator.discard(
                                    () => null) // discard the character
                                return $.code
                            },
                        }),
                        ($) => $
                    ),
                    'range': create_range(iterator, { 'start character': start_character }),
                })
            }
        }
    }

export const Trivia: p_pi.Production<
    d_out.Trivia,
    d_function.Lexer_Error,
    d_in.Annotated_Character,
    d_location.Location
> = (
    iterator,
    abort,
): d_out.Trivia => ({
    'leading whitespace': Whitespace(iterator),
    'comments': iterator.list({
        has_more_items: (current) => {
            const next = iterator.look_ahead_raw(1)
            return current.code === 0x2F
                && next !== null && (next[0].code === 0x2F || next[0].code === 0x2A) // slash followed by either slash or asterisk
        },
        handle: (slash_character): d_out.Trivia.comments.L => {
            iterator.discard(
                () => null) // discard the first slash
            const next_char = iterator.look_raw()
            if (next_char === null) {
                return p_unreachable_code_path("we checked in has_more_items for the presence of the next character, so this should never happen")
            }
            switch (next_char[0].code) {
                case 0x2F: // /
                    iterator.discard(
                        () => null) // discard the second /
                    return ({
                        'type': ['line', null],
                        'content': p_text_from_list(
                            iterator.list({
                                has_more_items: ($) => $.code !== 0x0A && $.code !== 0x0D, // not a line feed or carriage return
                                handle: ($) => {
                                    iterator.discard(
                                        () => null) // discard the character
                                    return $.code
                                },
                            }),
                            ($) => $
                        ),
                        'range': create_range(iterator, { 'start character': slash_character }),
                        'trailing whitespace': Whitespace(iterator)
                    })
                case 0x2A: {// *
                    iterator.discard(
                        () => null) // discard the asterisk


                    const create_error = (
                        element: p_di.Optional_Value<d_in.Annotated_Character>,
                        expected: d_function.Lexer_Error.expected,
                    ): d_function.Lexer_Error => p_t.from.optional(element).decide<d_function.Lexer_Error>(
                        ($) => ({
                            'range': {
                                'start': $.location,
                                'end': {
                                    'absolute': $.location.absolute + 1,
                                    'relative': {
                                        'line': $.location.relative.line,
                                        'column': $.location.relative.column + 1,
                                    }
                                }
                            },
                            'expected': expected
                        }),
                        () => p_unreachable_code_path("implement me")
                    )
                    return {
                        'type': ['block', null],
                        'content': iterator.wrap_up(
                            () => p_text_from_list(
                                iterator.list({
                                    has_more_items: ($) => {
                                        const next_char = iterator.look_ahead_raw(1)
                                        return $.code !== 0x2A || (next_char === null || next_char[0].code !== 0x2F) // not an asterisk followed by a solidus (end of block comment)
                                    },
                                    handle: ($) => {
                                        iterator.discard(
                                            () => null) // discard the character
                                        return $.code
                                    },
                                }),
                                ($) => $
                            ),
                            () => ({
                                'asterisk': iterator.expect({
                                    abort: abort,
                                    get_error: ($) => create_error(
                                        $,
                                        ['block comment termination', null],
                                    ),
                                    item: ($, abort2) => $.code === 0x2A
                                        ? $
                                        : abort2(null),
                                }),
                                'solidus': iterator.expect({
                                    abort: abort,
                                    get_error: ($) => create_error(
                                        $,
                                        ['block comment termination', null],
                                    ),
                                    item: ($, abort2) => $.code === 0x2F
                                        ? $
                                        : abort2(null),
                                }),
                            }),
                        ),
                        'range': create_range(iterator, { 'start character': slash_character }),
                        'trailing whitespace': Whitespace(iterator)
                    }
                }
                default: return p_unreachable_code_path("we checked in has_more_items that the next character is either a * or a /, so this should never happen")
            }
        },

    }),
})

export const Delimited_Text: p_pi.Production_With_Parameter<
    string,
    d_function.Lexer_Error,
    d_in.Annotated_Character,
    d_location.Location,
    {
        'allow newlines': boolean,
        'end character': number,
        'start character': d_in.Annotated_Character
    }
> = (
    iterator,
    abort,
    $p
): string => {

        const Character = {
            backspace: 0x08,            // \b
            form_feed: 0x0C,            // \f
            tab: 0x09,                  // \t
            line_feed: 0x0A,            // \n
            carriage_return: 0x0D,      // \r
            quotation_mark: 0x22,       // "
            backtick: 0x60,             // `
            apostrophe: 0x27,           // '
            reverse_solidus: 0x5C,      // \
            solidus: 0x2F,              // /
            a: 0x61,                    // a
            b: 0x62,                    // b
            f: 0x66,                    // f
            n: 0x6E,                    // n
            r: 0x72,                    // r
            t: 0x74,                    // t
            u: 0x75,                    // u
            A: 0x41,                    // A
            F: 0x46,                    // F

        }
        const txt = p_text_from_list(
            p_list_build_deprecated<number>(
                ($i) => {
                    while (true) {
                        const $ = iterator.look_raw()
                        if ($ === null) {

                            return abort({
                                'range': create_range(iterator, { 'start character': $p['start character'] }),
                                'expected': ['text termination', null]
                            })
                        }
                        if ($[0].code === $p['end character']) {
                            iterator.discard(
                                () => null) // discard the end character
                            return
                        }
                        switch ($[0].code) {
                            case Character.line_feed:
                            case Character.carriage_return:
                                if (!$p['allow newlines']) {
                                    return abort({
                                        'expected': ['no end of line in text', null],
                                        'range': create_range(iterator, { 'start character': $p['start character'] }),
                                    })
                                }
                                iterator.discard(
                                    () => null)
                                $i['add item']($[0].code)
                                break
                            case Character.reverse_solidus: // \ (escape)
                                iterator.discard(
                                    () => null)
                                {
                                    const $ = iterator.look_raw()
                                    if ($ === null) {
                                        return abort({
                                            'range': create_range(iterator, { 'start character': $p['start character'] }),
                                            'expected': ['escape character', { 'found': p_.literal.not_set() }]
                                        })
                                    }
                                    switch ($[0].code) {
                                        case Character.quotation_mark:
                                            iterator.discard(
                                                () => null)
                                            $i['add item'](Character.quotation_mark)
                                            break
                                        case Character.apostrophe:
                                            iterator.discard(
                                                () => null)
                                            $i['add item'](Character.apostrophe)
                                            break
                                        case Character.backtick:
                                            iterator.discard(
                                                () => null)
                                            $i['add item'](Character.backtick)
                                            break
                                        case Character.reverse_solidus:
                                            iterator.discard(
                                                () => null)
                                            $i['add item'](Character.reverse_solidus)
                                            break
                                        case Character.solidus:
                                            iterator.discard(
                                                () => null)
                                            $i['add item'](Character.solidus)
                                            break
                                        case Character.b:
                                            iterator.discard(
                                                () => null)
                                            $i['add item'](Character.backspace)
                                            break
                                        case Character.f:
                                            iterator.discard(
                                                () => null)
                                            $i['add item'](Character.form_feed)
                                            break
                                        case Character.n:
                                            iterator.discard(
                                                () => null)
                                            $i['add item'](Character.line_feed)
                                            break
                                        case Character.r:
                                            iterator.discard(
                                                () => null)
                                            $i['add item'](Character.carriage_return)
                                            break
                                        case Character.t:
                                            iterator.discard(
                                                () => null)
                                            $i['add item'](Character.tab)
                                            break
                                        case Character.u:
                                            iterator.discard(
                                                () => null)
                                            const r_hexadecimal: p_ri.Refiner<number, string, d_loc.List_of_Characters> = ($, abort) => {
                                                const characters = $
                                                let result = 0
                                                let isNegative = false
                                                let startIndex = 0

                                                // Check for empty string
                                                if (p_t.from.list(characters).amount_of_items() === 0) {
                                                    abort("empty string is not a valid hexadecimal number")
                                                }

                                                const get_character_at = (index: number): number => {
                                                    return characters.__deprecated_get_item_at(
                                                        index,
                                                        {
                                                            out_of_bounds: () => p_unreachable_code_path("this function is only called with valid indices, so this should never happen"),
                                                        }
                                                    )
                                                }

                                                // Check for negative sign
                                                if (p_t.from.list(characters).amount_of_items() > 0 && get_character_at(0) === 45) { // '-'
                                                    isNegative = true
                                                    startIndex = 1
                                                }

                                                // Check for "0x" prefix - REQUIRE it for hex
                                                if (p_t.from.list(characters).amount_of_items() <= startIndex + 1 ||
                                                    get_character_at(startIndex) !== 48 || // '0'
                                                    get_character_at(startIndex + 1) !== 120) { // 'x'
                                                    abort("Hexadecimal number must have '0x' prefix")
                                                }
                                                startIndex += 2

                                                // Check if there are digits after the prefix
                                                if (startIndex >= p_t.from.list(characters).amount_of_items()) {
                                                    abort("Hexadecimal number must have digits after '0x' prefix")
                                                }

                                                // Parse hex digits from left to right
                                                for (let i = startIndex; i < p_t.from.list(characters).amount_of_items(); i++) {
                                                    const charCode = get_character_at(i)
                                                    let digit: number

                                                    // Check if character is a hex digit
                                                    if (charCode >= 48 && charCode <= 57) { // '0'-'9'
                                                        digit = charCode - 48
                                                    } else if (charCode >= 65 && charCode <= 70) { // 'A'-'F'
                                                        digit = charCode - 65 + 10
                                                    } else if (charCode >= 97 && charCode <= 102) { // 'a'-'f'
                                                        digit = charCode - 97 + 10
                                                    } else {
                                                        // Invalid character
                                                        return abort("Invalid character in hexadecimal string")
                                                    }

                                                    result = result * 16 + digit
                                                }

                                                return isNegative ? -result : result
                                            }
                                            $i['add item'](r_hexadecimal(
                                                p_list_build_deprecated<number>(
                                                    ($i) => {
                                                        const get_char = () => {
                                                            const char = iterator.look_raw()
                                                            if (char === null) {
                                                                return abort({
                                                                    'range': create_range(iterator, { 'start character': $p['start character'] }),
                                                                    'expected': ['unicode character', { 'found': p_.literal.not_set() }]
                                                                })
                                                            }
                                                            if (char[0].code < Character.a || (char[0].code > Character.f && char[0].code < Character.A) || char[0].code > Character.F || char[0].code < 0x30 || char[0].code > 0x39) {
                                                                return abort({
                                                                    'range': create_range(iterator, { 'start character': $p['start character'] }),
                                                                    'expected': ['unicode character', { 'found': p_.literal.set(char[0].code) }]
                                                                })
                                                            }
                                                            iterator.discard(
                                                                () => null)
                                                            return char[0].code
                                                        }
                                                        $i['add item'](get_char())
                                                        $i['add item'](get_char())
                                                        $i['add item'](get_char())
                                                        $i['add item'](get_char())
                                                    }
                                                ),
                                                () => p_unreachable_code_path("the number was built in a controlled way")
                                            ))
                                            break
                                        default:
                                            return abort({
                                                'range': create_range(iterator, { 'start character': $p['start character'] }),
                                                'expected': ['escape character', {
                                                    'found': p_.literal.set($[0].code)
                                                }]
                                            })
                                    }
                                }
                                break
                            default:
                                iterator.discard(
                                    () => null)
                                $i['add item']($[0].code)
                        }
                    }
                }
            ),
            ($) => $
        )
        return txt
    }

export const Tokenizer_Result: p_pi.Production<
    d_out.Tokenizer_Result,
    d_function.Lexer_Error,
    d_in.Annotated_Character,
    d_location.Location
> = (
    iterator,
    abort,
) => ({
    'leading trivia': Trivia(iterator, abort),
    'tokens': iterator.list({
        has_more_items: ($) => true,
        handle: ($) => ({
            'type': p_change_context(null, (): d_out.Annotated_Token.type_ => {

                const Character = {

                    open_angle_bracket: 0x3C, // <
                    open_brace: 0x7B,           // {
                    open_bracket: 0x5B,         // [
                    open_paren: 0x28,          // (

                    close_angle_bracket: 0x3E, // >
                    close_brace: 0x7D,          // }
                    close_bracket: 0x5D,        // ]
                    close_paren: 0x29,         // )

                    apostrophe: 0x27,          // '
                    asterisk: 0x2A,            // *
                    at: 0x40,                  // @
                    backtick: 0x60,            // `
                    bang: 0x21,
                    colon: 0x3A,                // :
                    pipe: 0x7C,                // |
                    quotation_mark: 0x22,       // "
                    slash: 0x2F,               // /
                    underscore: 0x5F,           // _
                    tilde: 0x7E,               // ~
                    hash: 0x23,                // #

                    space: 0x20,               // space
                    tab: 0x09,                 // \t

                }
                switch ($.code) {
                    case Character.open_brace:
                        iterator.discard(
                            () => null)
                        return ['{', null]
                    case Character.open_bracket:
                        iterator.discard(
                            () => null)
                        return ['[', null]
                    case Character.open_angle_bracket:
                        iterator.discard(
                            () => null)
                        return ['<', null]
                    case Character.open_paren:
                        iterator.discard(
                            () => null)
                        return ['(', null]
                    case Character.close_brace:
                        iterator.discard(
                            () => null)
                        return ['}', null]
                    case Character.close_bracket:
                        iterator.discard(
                            () => null)
                        return [']', null]
                    case Character.close_angle_bracket:
                        iterator.discard(
                            () => null)
                        return ['>', null]
                    case Character.close_paren:
                        iterator.discard(
                            () => null)
                        return [')', null]

                    //individuals
                    case Character.hash:
                        iterator.discard(
                            () => null)
                        return ['#', null] // missing data token
                    case Character.pipe:
                        iterator.discard(
                            () => null)
                        return ['|', null] // state value token
                    case Character.underscore:
                        iterator.discard(
                            () => null)
                        return ['_', null] // unset value token
                    case Character.tilde:
                        iterator.discard(
                            () => null)
                        return ['~', null] // unset value token
                    case Character.asterisk:
                        iterator.discard(
                            () => null)
                        return ['*', null] // set value token
                    case Character.at:
                        iterator.discard(
                            () => null)
                        return ['@', null] // include token
                    case Character.bang:
                        iterator.discard(
                            () => null)
                        return ['!', null] // header token
                    case Character.colon:
                        iterator.discard(
                            () => null)
                        return [':', null] // structural token
                    case Character.quotation_mark:
                        iterator.discard(
                            () => null)
                        return ['text', {
                            'value': Delimited_Text(
                                iterator,
                                abort,
                                {
                                    'start character': $,
                                    'end character': Character.quotation_mark,
                                    'allow newlines': true,
                                }
                            ),
                            'type': ['quoted', null],
                        }]
                    case Character.backtick:
                        iterator.discard(
                            () => null)
                        return ['text', {
                            'value': Delimited_Text(
                                iterator,
                                abort,
                                {
                                    'start character': $,
                                    'end character': Character.backtick,
                                    'allow newlines': false,
                                }
                            ),
                            'type': ['backticked', null],
                        }]
                    case Character.apostrophe:
                        iterator.discard(
                            () => null)
                        return ['text', {
                            'value': Delimited_Text(
                                iterator,
                                abort,
                                {
                                    'start character': $,
                                    'end character': Character.apostrophe,
                                    'allow newlines': false,
                                }
                            ),
                            'type': ['apostrophed', null],
                        }]

                    default:
                        return ['text', {
                            'type': ['undelimited', null],
                            'value': p_text_from_list(

                                iterator.list({
                                    has_more_items: ($) => {
                                        const WhitespaceChars = {
                                            tab: 0x09,                  // \t
                                            line_feed: 0x0A,            // \n
                                            carriage_return: 0x0D,      // \r
                                            space: 0x20,                //
                                            comma: 0x2C,                // ,
                                        }
                                        return $.code !== Character.open_brace &&
                                            $.code !== Character.close_brace &&
                                            $.code !== Character.open_bracket &&
                                            $.code !== Character.close_bracket &&
                                            $.code !== Character.open_angle_bracket &&
                                            $.code !== Character.close_angle_bracket &&
                                            $.code !== Character.open_paren &&
                                            $.code !== Character.close_paren &&
                                            $.code !== Character.apostrophe &&
                                            $.code !== Character.asterisk &&
                                            $.code !== Character.at &&
                                            $.code !== Character.backtick &&
                                            $.code !== Character.bang &&
                                            $.code !== Character.colon &&
                                            $.code !== Character.pipe &&
                                            $.code !== Character.quotation_mark &&
                                            $.code !== Character.slash &&
                                            $.code !== Character.tilde &&
                                            $.code !== WhitespaceChars.comma &&
                                            $.code !== WhitespaceChars.space &&
                                            $.code !== WhitespaceChars.tab &&
                                            $.code !== WhitespaceChars.line_feed &&
                                            $.code !== WhitespaceChars.carriage_return
                                    },
                                    handle: ($) => {
                                        iterator.discard(
                                            () => null) // discard the character
                                        return $.code
                                    },
                                }),
                                ($) => $
                            )
                        }]
                }
            }),
            'start': $.location,
            'end': create_range(iterator, { 'start character': $ }).end,
            'trailing trivia': Trivia(iterator, abort),
        }),
    }),
    'end': iterator.get_end_info()
})