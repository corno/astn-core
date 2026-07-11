
import type * as s_deserialize_parse_tree from "./deserialize_parse_tree.js"
import type * as s_unmarshall from "./unmarshall.js"


export type Error_ = 
    | ['parse error', s_deserialize_parse_tree.Error]
    | ['unmarshall error', s_unmarshall.Error]

export type { 
    Error_ as Error, 
}

export type Parameters = s_deserialize_parse_tree.Parameters