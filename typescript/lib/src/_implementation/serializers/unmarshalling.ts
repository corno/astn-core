import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../interface/schemas/unmarshalling_deprecated.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}

//dependencies
import * as ser_deserialize_parse_tree_to_prose from "../serializers/parse_tree_deserialization.js"
import * as ser_unmarshall_to_prose from "./unmarshalling_from_parse_tree.js"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'deserialize': return p_.option($, ($) => ser_deserialize_parse_tree_to_prose.Error($))
            case 'unmarshall parse tree': return p_.option($, ($) => ser_unmarshall_to_prose.Error($))
            default: return p_.exhaustive($[0])
        }
    })