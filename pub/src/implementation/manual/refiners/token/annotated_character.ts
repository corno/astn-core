import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import * as _pi_new from '../../../../temp_core/new_interface_signatures'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

import * as d_in from "../../../../interface/to_be_generated/annotated_characters"
import * as d_out from "../../../../interface/generated/liana/schemas/token/data"
import * as d_function from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"

import * as d_temp_location from "../../../../interface/generated/liana/schemas/location/data"
import * as d_loc from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

//dependencies

type Temp_Choice = d_function.Lexer_Error.type_.unexpected.expected.L

type Temp_Iterator<Element, End_Info> = {
    'old': _pi.Iterator<Element>,
    'new': _pi_new.Iterator<Element, Temp_Choice, End_Info>,
}


const temp_get_current_character_or_null = (iterator: Temp_Iterator<d_in.Annotated_Character, d_location.Location>): d_in.Annotated_Character | null => {
    const next = iterator.old.look()
    if (next === null) {
        return null
    } else {
        return next[0]
    }
}

const WhitespaceChars = {
    tab: 0x09,                  // \t
    line_feed: 0x0A,            // \n
    carriage_return: 0x0D,      // \r
    space: 0x20,                //
    comma: 0x2C                 // ,
}

export const is_control_character = ($: d_in.Annotated_Character): boolean =>
    $.code < 0x20
    && $.code !== WhitespaceChars.tab
    && $.code !== WhitespaceChars.line_feed
    && $.code !== WhitespaceChars.carriage_return

const create_range = (
    iterator: Temp_Iterator<d_in.Annotated_Character, d_location.Location>,
    $p: {
        'start character': d_in.Annotated_Character
    }
): d_temp_location.Range => {
    const next = iterator.old.look()
    if (next === null) {
        return {
            'start': $p['start character'].location,
            'end': iterator.new.get_end_info()
        }
    } else {
        return {
            'start': $p['start character'].location,
            'end': next[0].location,
        }
    }
}


export const Whitespace = (
    iterator: Temp_Iterator<d_in.Annotated_Character, d_location.Location>,
    abort: _pi.Abort<d_function.Lexer_Error>,
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

    const next = iterator.old.look()
    if (next === null) {
        return _p.optional.literal.not_set()
    }
    if (!is_whitespace_character(next[0])) {
        return _p.optional.literal.not_set()
    }
    const start_character = next[0]
    return _p.optional.literal.set({
        'value': _p_text_from_list<number>(
            iterator.new.list(
                ($) => is_whitespace_character($),
                ($) => {
                    if (is_control_character($)) {
                        iterator.old.discard(() => null)
                        return abort({
                            'range': create_range(iterator, { 'start character': $ }),
                            'type': ['unexpected control character', {
                                'character': $.code,
                            }]
                        })

                    }
                    iterator.old.discard(() => null) // discard the character
                    return $.code
                },
                ($) => $
            ),
            ($) => $
        ),
        'range': create_range(iterator, { 'start character': start_character }),
    })
}

export const Trivia = (
    iterator: Temp_Iterator<d_in.Annotated_Character, d_location.Location>,
    abort: _pi.Abort<d_function.Lexer_Error>,
): d_out.Trivia => ({
    'leading whitespace': Whitespace(iterator, abort),
    'comments': iterator.new.list(
        (current) => current.code === 0x2F, // /
        (slash_character): d_out.Trivia.comments.L => {

            const next_char = iterator.old.look_ahead(1)
            if (next_char === null) {
                return abort({
                    'range': create_range(iterator, { 'start character': slash_character }),
                    'type': ['dangling slash', {
                        'at end of input': true,
                    }]
                })
            }
            switch (next_char[0].code) {
                case 0x2F: // /
                    iterator.old.discard(() => null) // discard the second /
                    const Character = {
                        line_feed: 0x0A,            // \n
                        carriage_return: 0x0D,      // \r
                        // solidus: 0x2F,              // /
                    }
                    return ({
                        'type': ['line', null],
                        'content': _p_text_from_list(
                            iterator.new.list(
                                ($) => $.code !== Character.line_feed && $.code !== Character.carriage_return,
                                ($) => {
                                    iterator.old.discard(() => null) // discard the character
                                    return $.code
                                },
                                ($) => $,
                            ),
                            ($) => $
                        ),
                        'range': create_range(iterator, { 'start character': slash_character }),
                        'trailing whitespace': Whitespace(iterator, abort)
                    })
                    break
                case 0x2A: {// *
                    iterator.old.discard(() => null) // discard the asterisk
                    return ({
                        'type': ['block', null],
                        'content': _p_text_from_list(
                            iterator.new.list(
                                ($) => {
                                    const next_char = iterator.old.look_ahead(1)
                                    return $.code !== 0x2A || (next_char === null || next_char[0].code !== 0x2A) // not a solidus followed by an asterisk (end of block comment)
                                },
                                ($) => {
                                    iterator.old.discard(() => null) // discard the character
                                    return $.code
                                },
                                ($) => {
                                    const asterisk = iterator.new.expect(
                                        [
                                            ['end of block comment', null]
                                        ],
                                        ($, abort) => $.code === 0x2A
                                            ? $
                                            : abort()
                                    )
                                    const solidus = iterator.new.expect(
                                        [
                                            ['end of block comment', null]
                                        ],
                                        ($, abort) => $.code === 0x2A
                                            ? $
                                            : abort()
                                    )
                                    return $
                                },
                            ),
                            ($) => $
                        ),
                        'range': create_range(iterator, { 'start character': slash_character }),
                        'trailing whitespace': Whitespace(iterator, abort)
                    })
                }
                default:
                    return abort({
                        'range': create_range(iterator, { 'start character': slash_character }),
                        'type': ['dangling slash', {
                            'at end of input': false,
                        }]
                    })
            }
        },
        ($) => $
    ),
})

export const Annotated_Token = (
    iterator: Temp_Iterator<d_in.Annotated_Character, d_location.Location>,
    abort: _pi.Abort<d_function.Lexer_Error>,
    $p: { 'character': d_in.Annotated_Character }
): d_out.Annotated_Token => {
    const WhitespaceChars = {
        tab: 0x09,                  // \t
        line_feed: 0x0A,            // \n
        carriage_return: 0x0D,      // \r
        space: 0x20,                //
        comma: 0x2C,                // ,
    }


    return {
        'type': _p.state.block((): d_out.Annotated_Token.type_ => {

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
            switch ($p.character.code) {
                case Character.open_brace:
                    iterator.old.discard(() => null)
                    return ['{', null]
                case Character.open_bracket:
                    iterator.old.discard(() => null)
                    return ['[', null]
                case Character.open_angle_bracket:
                    iterator.old.discard(() => null)
                    return ['<', null]
                case Character.open_paren:
                    iterator.old.discard(() => null)
                    return ['(', null]
                case Character.close_brace:
                    iterator.old.discard(() => null)
                    return ['}', null]
                case Character.close_bracket:
                    iterator.old.discard(() => null)
                    return [']', null]
                case Character.close_angle_bracket:
                    iterator.old.discard(() => null)
                    return ['>', null]
                case Character.close_paren:
                    iterator.old.discard(() => null)
                    return [')', null]

                //individuals
                case Character.hash:
                    iterator.old.discard(() => null)
                    return ['#', null] // missing data token
                case Character.pipe:
                    iterator.old.discard(() => null)
                    return ['|', null] // state value token
                case Character.underscore:
                    iterator.old.discard(() => null)
                    return ['_', null] // unset value token
                case Character.tilde:
                    iterator.old.discard(() => null)
                    return ['~', null] // unset value token
                case Character.asterisk:
                    iterator.old.discard(() => null)
                    return ['*', null] // set value token
                case Character.at:
                    iterator.old.discard(() => null)
                    return ['@', null] // include token
                case Character.bang:
                    iterator.old.discard(() => null)
                    return ['!', null] // header token
                case Character.colon:
                    iterator.old.discard(() => null)
                    return [':', null] // structural token
                case Character.quotation_mark:
                    iterator.old.discard(() => null)
                    return ['text', {
                        'value': Delimited_Text(($) => $ === Character.quotation_mark, true, iterator, abort, { 'start character': $p.character }),
                        'type': ['quoted', null],
                    }]
                case Character.backtick:
                    iterator.old.discard(() => null)
                    return ['text', {
                        'value': Delimited_Text(($) => $ === Character.backtick, false, iterator, abort, { 'start character': $p.character }),
                        'type': ['backticked', null],
                    }]
                case Character.apostrophe:
                    iterator.old.discard(() => null)
                    return ['text', {
                        'value': Delimited_Text(($) => $ === Character.apostrophe, false, iterator, abort, { 'start character': $p.character }),
                        'type': ['apostrophed', null],
                    }]

                default:
                    return ['text', {
                        'type': ['undelimited', null],
                        'value': _p_text_from_list(

                            iterator.new.list(
                                ($) => {
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
                                ($) => {
                                    if (is_control_character($)) {
                                        iterator.old.discard(() => null)
                                        return abort({
                                            'range': create_range(iterator, { 'start character': $ }),
                                            'type': ['unexpected control character in text', {
                                                'character': $.code,
                                            }]
                                        })

                                    }
                                    iterator.old.discard(() => null) // discard the character
                                    return $.code
                                },
                                ($) => {
                                    return $
                                },
                            ),
                            ($) => $
                        )
                    }]
            }
        }),
        'start': $p.character.location,
        'end': create_range(iterator, { 'start character': $p.character }).end,
        'trailing trivia': Trivia(iterator, abort),
    }
}

export const Delimited_Text = (
    is_end_character: (character: number) => boolean,
    allow_newlines: boolean,
    iterator: Temp_Iterator<d_in.Annotated_Character, d_location.Location>,
    abort: _pi.Abort<d_function.Lexer_Error>,
    $p: {
        'start character': d_in.Annotated_Character
    }
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
    const txt = _p_text_from_list(
        _p_list_build_deprecated<number>(
            ($i) => {
                while (true) {
                    const $ = temp_get_current_character_or_null(iterator)
                    if ($ === null) {

                        return abort({
                            'range': create_range(iterator, { 'start character': $p['start character'] }),
                            'type': ['unterminated text', null]
                        })
                    }
                    if (is_control_character($)) {
                        return abort({
                            'range': create_range(iterator, { 'start character': $p['start character'] }),
                            'type': ['unexpected control character in text', {
                                'character': $.code,
                            }]
                        })

                    }
                    if (is_end_character($.code)) {
                        iterator.old.discard(() => null) // discard the end character
                        return
                    }
                    switch ($.code) {
                        case Character.line_feed:
                        case Character.carriage_return:
                            if (!allow_newlines) {
                                return abort({
                                    'type': ['unexpected end of line in delimited text', null],
                                    'range': create_range(iterator, { 'start character': $p['start character'] }),
                                })
                            }
                            iterator.old.discard(() => null)
                            $i['add item']($.code)
                            break
                        case Character.reverse_solidus: // \ (escape)
                            iterator.old.discard(() => null)
                            {
                                const $ = temp_get_current_character_or_null(iterator)
                                if ($ === null) {
                                    return abort({
                                        'range': create_range(iterator, { 'start character': $p['start character'] }),
                                        'type': ['missing character after escape', null]
                                    })
                                }
                                switch ($.code) {
                                    case Character.quotation_mark:
                                        iterator.old.discard(() => null)
                                        $i['add item'](Character.quotation_mark)
                                        break
                                    case Character.apostrophe:
                                        iterator.old.discard(() => null)
                                        $i['add item'](Character.apostrophe)
                                        break
                                    case Character.backtick:
                                        iterator.old.discard(() => null)
                                        $i['add item'](Character.backtick)
                                        break
                                    case Character.reverse_solidus:
                                        iterator.old.discard(() => null)
                                        $i['add item'](Character.reverse_solidus)
                                        break
                                    case Character.solidus:
                                        iterator.old.discard(() => null)
                                        $i['add item'](Character.solidus)
                                        break
                                    case Character.b:
                                        iterator.old.discard(() => null)
                                        $i['add item'](Character.backspace)
                                        break
                                    case Character.f:
                                        iterator.old.discard(() => null)
                                        $i['add item'](Character.form_feed)
                                        break
                                    case Character.n:
                                        iterator.old.discard(() => null)
                                        $i['add item'](Character.line_feed)
                                        break
                                    case Character.r:
                                        iterator.old.discard(() => null)
                                        $i['add item'](Character.carriage_return)
                                        break
                                    case Character.t:
                                        iterator.old.discard(() => null)
                                        $i['add item'](Character.tab)
                                        break
                                    case Character.u:
                                        iterator.old.discard(() => null)
                                        const ds_hexadecimal: _pi.Refiner<number, string, d_loc.List_of_Characters> = ($, abort) => {
                                            const characters = $
                                            let result = 0
                                            let isNegative = false
                                            let startIndex = 0

                                            // Check for empty string
                                            if (characters.__get_number_of_items() === 0) {
                                                abort("Empty string is not a valid hexadecimal number")
                                            }

                                            const get_character_at = (index: number): number => {
                                                return characters.__deprecated_get_item_at(
                                                    index,
                                                    {
                                                        out_of_bounds: () => abort("index out of bounds")
                                                    }
                                                )
                                            }

                                            // Check for negative sign
                                            if (characters.__get_number_of_items() > 0 && get_character_at(0) === 45) { // '-'
                                                isNegative = true
                                                startIndex = 1
                                            }

                                            // Check for "0x" prefix - REQUIRE it for hex
                                            if (characters.__get_number_of_items() <= startIndex + 1 ||
                                                get_character_at(startIndex) !== 48 || // '0'
                                                get_character_at(startIndex + 1) !== 120) { // 'x'
                                                abort("Hexadecimal number must have '0x' prefix")
                                            }
                                            startIndex += 2

                                            // Check if there are digits after the prefix
                                            if (startIndex >= characters.__get_number_of_items()) {
                                                abort("Hexadecimal number must have digits after '0x' prefix")
                                            }

                                            // Parse hex digits from left to right
                                            for (let i = startIndex; i < characters.__get_number_of_items(); i++) {
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
                                        $i['add item'](ds_hexadecimal(
                                            _p_list_build_deprecated<number>(
                                                ($i) => {
                                                    const get_char = () => {
                                                        const char = temp_get_current_character_or_null(iterator)
                                                        if (char === null) {
                                                            return abort({
                                                                'range': create_range(iterator, { 'start character': $p['start character'] }),
                                                                'type': ['unterminated unicode escape sequence', null]
                                                            })
                                                        }
                                                        if (char.code < Character.a || (char.code > Character.f && char.code < Character.A) || char.code > Character.F || char.code < 0x30 || char.code > 0x39) {
                                                            return abort({
                                                                'range': create_range(iterator, { 'start character': $p['start character'] }),
                                                                'type': ['invalid unicode escape sequence', null]
                                                            })
                                                        }
                                                        iterator.old.discard(() => null)
                                                        return char.code
                                                    }
                                                    $i['add item'](get_char())
                                                    $i['add item'](get_char())
                                                    $i['add item'](get_char())
                                                    $i['add item'](get_char())
                                                }
                                            ),
                                            () => _p_unreachable_code_path("the number was built in a controlled way")
                                        ))
                                        break
                                    default:
                                        return abort({
                                            'range': create_range(iterator, { 'start character': $p['start character'] }),
                                            'type': ['unknown escape character', {
                                                'character': $.code
                                            }]
                                        })
                                }
                            }
                            break
                        default:
                            iterator.old.discard(() => null)
                            $i['add item']($.code)
                    }
                }
            }
        ),
        ($) => $
    )
    return txt
}

export const Tokenizer_Result = (
    iterator: Temp_Iterator<d_in.Annotated_Character, d_location.Location>,
    abort: _pi.Abort<d_function.Lexer_Error>,
): d_out.Tokenizer_Result => ({
    'leading trivia': Trivia(iterator, abort),
    'tokens': iterator.new.list(
        ($) => true,
        ($) => Annotated_Token(iterator, abort, { 'character': $ }),
        ($) => $
    ),
    'end': iterator.new.get_end_info()
})