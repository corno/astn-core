
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../generated/liana/schemas/parse_tree/data.js"
import type * as d_out from "../../../generated/liana/schemas/location/data.js"


    export type Value = p_i.Transformer<
        d_in.Value,
        d_out.Range
    >
    export type Concrete_Value = p_i.Transformer<
        d_in.Value.type_.concrete,
        d_out.Range
    >

