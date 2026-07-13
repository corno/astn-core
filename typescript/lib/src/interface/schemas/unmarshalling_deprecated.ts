
import type * as s_deserialize_parse_tree from "./parse_tree_deserialization.js"
import type * as s_unmarshalling_from_parse_tree from "./unmarshalling.js"


export type Error_ = 
    | ['deserialize', s_deserialize_parse_tree.Error]
    | ['unmarshall parse tree', s_unmarshalling_from_parse_tree.Error]

export type { 
    Error_ as Error, 
}

export type Parameters = s_deserialize_parse_tree.Parameters