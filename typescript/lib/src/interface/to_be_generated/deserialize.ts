import * as p_di from 'pareto-core/dist/data/interface'

import * as d_deserialize_parse_tree from "../generated/liana/schemas/deserialize_parse_tree/data"
import * as d_unmarshall from "../to_be_generated/unmarshall"


export type Error_ = 
    | ['parse error', d_deserialize_parse_tree.Error]
    | ['unmarshall error', d_unmarshall.Error]

export { 
    Error_ as Error, 
}

export type Parameters = d_deserialize_parse_tree.Parameters