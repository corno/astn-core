
import type * as d_deserialize_parse_tree from "./deserialize_parse_tree.js"
import type * as d_unmarshall from "./unmarshall.js"


export type Error_ = 
    | ['parse error', d_deserialize_parse_tree.Error]
    | ['unmarshall error', d_unmarshall.Error]

export type { 
    Error_ as Error, 
}

export type Parameters = d_deserialize_parse_tree.Parameters