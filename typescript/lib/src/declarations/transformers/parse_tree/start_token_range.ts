
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/data/parse_tree.js"
import type * as d_out from "../../../interface/data/location.js"


export type Value = p_.Transformer<
    d_in.Value,
    d_out.Range
>
export type Concrete_Value = p_.Transformer<
    d_in.Value.type_.concrete,
    d_out.Range
>

