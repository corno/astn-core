import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../schemas/unmarshalling_deprecated.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}

//dependencies
import * as ser_parse_tree_deserialization from "../../../deserialization/implementation/serializers/parse_tree_deserialization.js"
import * as ser_value_unmarshalling from "./value_unmarshalling.js"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'parse tree deserialization': return p_.option($, ($) => ser_parse_tree_deserialization.Error($))
            case 'value unmarshalling': return p_.option($, ($) => ser_value_unmarshalling.Error($))
            default: return p_.exhaustive($[0])
        }
    })