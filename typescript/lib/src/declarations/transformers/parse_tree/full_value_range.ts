
import type * as p_ from 'pareto-core/interface/transformer'


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
export type ID_Value_Pair = p_.Transformer<
    s_in.ID_Value_Pairs.L,
    s_out.Range
>
export type State = p_.Transformer<
    s_in.Value.type_.concrete.state,
    s_out.Range
>
export type List = p_.Transformer<
    s_in.Value.type_.concrete.list,
    s_out.Range
>
export type Dictionary = p_.Transformer<
    s_in.Value.type_.concrete.dictionary,
    s_out.Range
>
export type Group = p_.Transformer<
    s_in.Value.type_.concrete.group,
    s_out.Range
>
export type Optional = p_.Transformer<
    s_in.Value.type_.concrete.optional,
    s_out.Range
>

