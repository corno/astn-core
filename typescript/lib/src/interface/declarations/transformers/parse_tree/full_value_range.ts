import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'


import type * as d_in from "../../../../interface/generated/liana/schemas/parse_tree/data.js"
import type * as d_out from "../../../../interface/generated/liana/schemas/location/data.js"

export namespace interface_ {
    export type Value = p_i.Transformer<
        d_in.Value,
        d_out.Range
    >
    export type Concrete_Value = p_i.Transformer<
        d_in.Value.type_.concrete,
        d_out.Range
    >
    export type ID_Value_Pair = p_i.Transformer<
        d_in.ID_Value_Pairs.L,
        d_out.Range
    >
    export type State = p_i.Transformer<
        d_in.Value.type_.concrete.state,
        d_out.Range
    >
    export type List = p_i.Transformer<
        d_in.Value.type_.concrete.list,
        d_out.Range
    >
    export type Dictionary = p_i.Transformer<
        d_in.Value.type_.concrete.dictionary,
        d_out.Range
    >
    export type Group = p_i.Transformer<
        d_in.Value.type_.concrete.group,
        d_out.Range
    >
    export type Optional = p_i.Transformer<
        d_in.Value.type_.concrete.optional,
        d_out.Range
    >
}
