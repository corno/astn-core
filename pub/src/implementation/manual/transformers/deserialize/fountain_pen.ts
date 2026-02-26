import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/deserialize"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_function_loc from "astn-core/dist/interface/to_be_generated/location_to_fountain_pen"

//dependencies
import * as t_deserialize_parse_tree_to_fountain_pen from "../deserialize_parse_tree/fountain_pen"
import * as t_unmarshall_to_fountain_pen from "../unmarshall/fountain_pen"

export const Error: _pi.Transformer_With_Parameter<d_in.Error, d_out.Phrase, d_function_loc.Parameters> = ($, $p) => _p.decide.state($, ($) => {
    switch ($[0]) {

        case 'parse error': return _p.ss($, ($) => t_deserialize_parse_tree_to_fountain_pen.Error($, $p))
        case 'unmarshall error': return _p.ss($, ($) => t_unmarshall_to_fountain_pen.Error($, $p))
        default: return _p.au($[0])
    }
})