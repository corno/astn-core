import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'
import p_list_from_text from 'pareto-core/dist/implementation/specials/list_from_text'

import * as d_in from "../../../../interface/data/primitives"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

export const Escaped: p_i.Transformer<d_in.Escaped, d_out.List_of_Characters> = ($) => p_.list.from.list(
    p_list_from_text($, ($) => $),
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

export const Quoted: p_i.Transformer_With_Parameter<d_in.Quoted, d_out.List_of_Characters, {
    'add delimiters': boolean
}> = ($, $p) => $p['add delimiters']
    ? p_.literal.nested_list([
        [
            0x22, // "
        ],
        Escaped(
            $,
        ),
        [
            0x22, // "
        ]
    ])
    : Escaped($)

export const Apostrophed: p_i.Transformer_With_Parameter<d_in.Apostrophed, d_out.List_of_Characters, {
    'add delimiters': boolean
}> = ($, $p) => $p['add delimiters']
    ? p_.literal.nested_list([
        [
            0x27, // '
        ],
        Escaped(
            $,
        ),
        [
            0x27, // '
        ]
    ])
    : Escaped($)

export const Backticked: p_i.Transformer_With_Parameter<d_in.Backticked, d_out.List_of_Characters, {
    'add delimiters': boolean
}> = ($, $p) => $p['add delimiters']
    ? p_.literal.nested_list([
        [
            0x60, // `
        ],
        Escaped(
            $,
        ),
        [
            0x60, // `
        ]
    ])
    : Escaped($)

export const Undelimited: p_i.Transformer<d_in.Undelimited, d_out.List_of_Characters> = ($) => p_list_from_text(
    $,
    ($) => $ //FIXME: this needs escaping of the operator characters and whitespace
) 