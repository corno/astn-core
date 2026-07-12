
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/parse_tree.js"
import type * as s_out from "../../../interface/schemas/location.js"


export type Value = p_.Transformer<
    s_in.Value,
    s_out.Range
>
export type Concrete_Value = p_.Transformer<
    s_in.Value.type_.concrete,
    s_out.Range
>

