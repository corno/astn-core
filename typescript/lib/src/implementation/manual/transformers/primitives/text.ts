import * as p_ from 'pareto-core/implementation/transformer'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'
import type * as interface_ from "../../../../interface/declarations/transformers/primitives/text.js"

export namespace d_function {

    export type Parameters = {  
        'add delimiters': boolean
    }

}


export const Escaped: interface_.Escaped = ($) => p_.from.list(p_list_from_text(
    $,
    ($) => $
),
).flatten(
    ($) => {
        switch ($) {
            //I see no need to escape the slash, as it is not an operator character in JSON, and it is not whitespace
            // case 0x2F: // slash (\/)
            //     return p_.literal.list([
            //         0x5c, // \
            //         0x2f, // /
            //     ])
            case 0x22: // " (\")
                return p_.literal.list([
                    0x5C, // \
                    0x22, // "
                ])
            case 0x5C: // \ (\\)
                return p_.literal.list([
                    0x5C, // \
                    0x5C, // \
                ])
            case 0x08: // backspace (\b)
                return p_.literal.list([
                    0x5C, // \
                    0x62, // b
                ])
            case 0x0C: // form feed (\f)
                return p_.literal.list([
                    0x5C, // \
                    0x66, // f
                ])
            case 0x0A: // line feed (\n)
                return p_.literal.list([
                    0x5C, // \
                    0x6E, // n
                ])
            case 0x0D: // carriage return (\r)
                return p_.literal.list([
                    0x5C, // \
                    0x72, // r
                ])
            case 0x09: // horizontal tab (\t)
                return p_.literal.list([
                    0x5C, // \
                    0x74, // t
                ])
            case 0x0B: // vertical tab (\v)
                return p_.literal.list([
                    0x5C, // \
                    0x76, // v
                ])
            default: {
                return p_.literal.list([
                    $,
                ])
            }
        }
    }
)

export const Quoted: interface_.Quoted = ($, $p) => $p['add delimiters']
    ? p_.literal.segmented_list([
        p_.literal.list([
            0x22, // "
        ]),
        Escaped(
            $,
        ),
        p_.literal.list([
            0x22, // "
        ])
    ])
    : Escaped($)

export const Apostrophed: interface_.Apostrophed = ($, $p) => $p['add delimiters']
    ? p_.literal.segmented_list([
        p_.literal.list([
            0x27, // '
        ]),
        Escaped(
            $,
        ),
        p_.literal.list([
            0x27, // '
        ])
    ])
    : Escaped($)

export const Backticked: interface_.Backticked = ($, $p) => $p['add delimiters']
    ? p_.literal.segmented_list([
        p_.literal.list([
            0x60, // `
        ]),
        Escaped(
            $,
        ),
        p_.literal.list([
            0x60, // `
        ])
    ])
    : Escaped($)

export const Undelimited: interface_.Undelimited = ($) => p_list_from_text(
    $,
    ($) => $ //FIXME: this needs escaping of the operator characters and whitespace
) 