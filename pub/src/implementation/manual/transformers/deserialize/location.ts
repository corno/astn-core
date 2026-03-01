import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/deserialize"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"

//dependencies
import * as t_deserialize_parse_tree_to_location from "../deserialize_parse_tree/location"
import * as t_unmarshall_to_location from "../unmarshall/location"

export const Error: _pi.Transformer<d_in.Error, d_out.Range> = ($) => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'parse error': return _p.ss($, ($) => t_deserialize_parse_tree_to_location.Error($))
        case 'unmarshall error': return _p.ss($, ($) => t_unmarshall_to_location.Error($))
        default: return _p.au($[0])
    }
})