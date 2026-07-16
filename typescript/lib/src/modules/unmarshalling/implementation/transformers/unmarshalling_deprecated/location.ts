import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../schemas/unmarshalling_deprecated.js"
import type * as s_out from "../../../../deserialization/schemas/location.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Possible_Range
    >
}

//dependencies
import * as t_parse_tree_deserialization_to_location from "../../../../deserialization/implementation/transformers/parse_tree_deserialization/location.js"
import * as t_value_unmarshalling_to_location from "../value_unmarshalling/location.js"

export const Error: declarations.Error = ($) => p_.from.state($).decide(
    ($): s_out.Possible_Range => {
        switch ($[0]) {
            case 'parse tree deserialization': return p_.option($, ($) => t_parse_tree_deserialization_to_location.Error($))
            case 'value unmarshalling': return p_.option($, ($) => ['range', t_value_unmarshalling_to_location.Error($)])
            default: return p_.exhaustive($[0])
        }
    })