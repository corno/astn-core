import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/deserialize"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_deserialize_parse_tree_to_fountain_pen from "../deserialize_parse_tree/fountain_pen"
import * as t_unmarshall_to_fountain_pen from "../unmarshall/fountain_pen"

export const Error: p_i.Transformer<d_in.Error, d_out.Phrase> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {

            case 'parse error': return p_.ss($, ($) => t_deserialize_parse_tree_to_fountain_pen.Error($))
            case 'unmarshall error': return p_.ss($, ($) => t_unmarshall_to_fountain_pen.Error($))
            default: return p_.au($[0])
        }
    })