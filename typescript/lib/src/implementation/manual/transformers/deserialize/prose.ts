import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../../declarations/transformers/deserialize/prose.js"

//dependencies
import * as t_deserialize_parse_tree_to_prose from "../deserialize_parse_tree/prose.js"
import * as t_unmarshall_to_prose from "../unmarshall/prose.js"

export const Error: interface_.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {

            case 'parse error': return p_.option($, ($) => t_deserialize_parse_tree_to_prose.Error($))
            case 'unmarshall error': return p_.option($, ($) => t_unmarshall_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    })