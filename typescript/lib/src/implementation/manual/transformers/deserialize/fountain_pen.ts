import * as pt from 'pareto-core/dist/assign'
import * as p_di from 'pareto-core/dist/data/interface'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/deserialize"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_function_loc from "astn-core/dist/interface/to_be_generated/location_to_fountain_pen"

//dependencies
import * as t_deserialize_parse_tree_to_fountain_pen from "../deserialize_parse_tree/fountain_pen"
import * as t_unmarshall_to_fountain_pen from "../unmarshall/fountain_pen"

export const Error: p_ti.Transformer<d_in.Error, d_out.Phrase> = ($) => pt.decide.state($, ($) => {
    switch ($[0]) {

        case 'parse error': return pt.ss($, ($) => t_deserialize_parse_tree_to_fountain_pen.Error($))
        case 'unmarshall error': return pt.ss($, ($) => t_unmarshall_to_fountain_pen.Error($))
        default: return pt.au($[0])
    }
})