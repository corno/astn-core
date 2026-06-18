import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/deserialize"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"

//dependencies
import * as t_deserialize_parse_tree_to_location from "../deserialize_parse_tree/location"
import * as t_unmarshall_to_location from "../unmarshall/location"

export const Error: p_i.Transformer<d_in.Error, d_out.Possible_Range> = ($) => p_.from.state($).decide(($): d_out.Possible_Range => {
    switch ($[0]) {
        case 'parse error': return p_.ss($, ($) => t_deserialize_parse_tree_to_location.Error($))
        case 'unmarshall error': return p_.ss($, ($) => ['range', t_unmarshall_to_location.Error($)])
        default: return p_.au($[0])
    }
})