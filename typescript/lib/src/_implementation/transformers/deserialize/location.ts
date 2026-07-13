import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../private_schemas/deserialize_and_unmarshall.js"
import type * as s_out from "../../../interface/schemas/location.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Possible_Range
    >
}

//dependencies
import * as t_deserialize_parse_tree_to_location from "../deserialize_parse_tree/location.js"
import * as t_unmarshall_to_location from "../unmarshall/location.js"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($): s_out.Possible_Range => {
        switch ($[0]) {
            case 'parse error': return p_.option($, ($) => t_deserialize_parse_tree_to_location.Error($))
            case 'unmarshall error': return p_.option($, ($) => ['range', t_unmarshall_to_location.Error($)])
            default: return p_.exhaustive($[0])
        }
    })