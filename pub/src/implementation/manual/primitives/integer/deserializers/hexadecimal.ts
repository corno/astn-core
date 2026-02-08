import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "pareto-fountain-pen/dist/interface/to_be_generated/list_of_characters"

export const $$: _pi.Refiner<number, string, d_in.List_of_Characters> = ($, abort) => {
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