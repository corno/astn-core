
import type * as s_parse_tree_deserialization from "../../../deserialization/schemas/parse_tree_deserialization/schema.js"
import type * as s_value_unmarshalling from "../value_unmarshalling/schema.js"


export type Error_ = 
    | ['parse tree deserialization', s_parse_tree_deserialization.Error]
    | ['value unmarshalling', s_value_unmarshalling.Error]

export type { 
    Error_ as Error, 
}

export type Parameters = s_parse_tree_deserialization.Parameters