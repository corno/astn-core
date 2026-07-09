
import type * as p_ from 'pareto-core/interface/transformer'


import type * as d_in from "../../../interface/generated/liana/schemas/parse_tree/data.js"
import type * as d_out from "../../../interface/generated/liana/schemas/location/data.js"


export type Value = p_.Transformer<
    d_in.Value,
    d_out.Range
>
export type Concrete_Value = p_.Transformer<
    d_in.Value.type_.concrete,
    d_out.Range
>
export type ID_Value_Pair = p_.Transformer<
    d_in.ID_Value_Pairs.L,
    d_out.Range
>
export type State = p_.Transformer<
    d_in.Value.type_.concrete.state,
    d_out.Range
>
export type List = p_.Transformer<
    d_in.Value.type_.concrete.list,
    d_out.Range
>
export type Dictionary = p_.Transformer<
    d_in.Value.type_.concrete.dictionary,
    d_out.Range
>
export type Group = p_.Transformer<
    d_in.Value.type_.concrete.group,
    d_out.Range
>
export type Optional = p_.Transformer<
    d_in.Value.type_.concrete.optional,
    d_out.Range
>

