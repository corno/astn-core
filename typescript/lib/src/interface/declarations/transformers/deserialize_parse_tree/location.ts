
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../generated/liana/schemas/deserialize_parse_tree/data.js"
import type * as d_out from "../../../generated/liana/schemas/location/data.js"


export type Error = p_.Transformer<
    d_in.Error,
    d_out.Possible_Range
>

