import * as p_ from 'pareto-core/implementation/serializer'
import * as p_t from 'pareto-core/implementation/transformer'
import type * as p_schema from 'pareto-core/interface/schema'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'

//schemas
import type * as s_in from "../../private_schemas/primitives.js"

namespace s_parameters {

    export type Parameters = {
        'add delimiters': boolean
    }

}

namespace declarations {
    export type Quoted = p_.Phrase_Serializer_With_Parameter<
        s_in.Quoted,
        s_parameters.Parameters
    >
    export type Apostrophed = p_.Phrase_Serializer_With_Parameter<
        s_in.Apostrophed,
        s_parameters.Parameters
    >
    export type Backticked = p_.Phrase_Serializer_With_Parameter<
        s_in.Backticked,
        s_parameters.Parameters
    >
    export type Undelimited = p_.Phrase_Serializer<
        s_in.Undelimited
    >
}

import * as sh from 'pareto-fountain-pen/shorthands/prose/deprecated'


export const Escaped: p_t.Transformer<
    s_in.Escaped,
    p_schema.List<number>
> = ($) => p_.from.list(
    p_list_from_text(
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

export const Quoted: declarations.Quoted = ($, $p) => sh.ph.list_of_characters(
    $p['add delimiters']
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
        : Escaped($),
)

export const Apostrophed: declarations.Apostrophed = ($, $p) => sh.ph.list_of_characters(
    $p['add delimiters']
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
        : Escaped($),
)

export const Backticked: declarations.Backticked = ($, $p) => sh.ph.list_of_characters(
    $p['add delimiters']
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
        : Escaped($),
)

export const Undelimited: declarations.Undelimited = ($) => sh.ph.list_of_characters(
    p_list_from_text(
        $,
        ($) => $ //FIXME: this needs escaping of the operator characters and whitespace
    ),
)