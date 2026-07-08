
import type * as d_deserialize_parse_tree from "../generated/liana/schemas/deserialize_parse_tree/data.js"
import type * as d_unmarshall from "../data/unmarshall.js"


export type Error_ = 
    | ['parse error', d_deserialize_parse_tree.Error]
    | ['unmarshall error', d_unmarshall.Error]

export type { 
    Error_ as Error, 
}

export type Parameters = d_deserialize_parse_tree.Parameters