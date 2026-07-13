import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../private_schemas/deserialize_and_unmarshall.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}

//dependencies
import * as t_deserialize_parse_tree_to_prose from "../transformers/deserialize_parse_tree/prose.js"
import * as t_unmarshall_to_prose from "./unmarshall.js"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {

            case 'parse error': return p_.option($, ($) => t_deserialize_parse_tree_to_prose.Error($))
            case 'unmarshall error': return p_.option($, ($) => t_unmarshall_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    })