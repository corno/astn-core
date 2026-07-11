import * as p_ from 'pareto-core/implementation/transformer'

//data types
import type * as d_out from "../../../interface/schemas/location.js"

import type * as interface_ from "../../../declarations/transformers/deserialize/location.js"

//dependencies
import * as t_deserialize_parse_tree_to_location from "../deserialize_parse_tree/location.js"
import * as t_unmarshall_to_location from "../unmarshall/location.js"

export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($): d_out.Possible_Range => {
        switch ($[0]) {
            case 'parse error': return p_.option($, ($) => t_deserialize_parse_tree_to_location.Error($))
            case 'unmarshall error': return p_.option($, ($) => ['range', t_unmarshall_to_location.Error($)])
            default: return p_.exhaustive($[0])
        }
    })