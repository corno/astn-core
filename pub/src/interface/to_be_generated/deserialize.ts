import * as _pi from 'pareto-core/dist/interface'

import * as d_deserialized_parse_tree from "../generated/liana/schemas/deserialize_parse_tree/data"
import * as d_unmarshall from "../to_be_generated/unmarshall"


export type Error_ = 
    | ['parse error', d_deserialized_parse_tree.Error]
    | ['unmarshall error', d_unmarshall.Error]

export { 
    Error_ as Error, 
}

export type Parameters = d_deserialized_parse_tree.Parameters