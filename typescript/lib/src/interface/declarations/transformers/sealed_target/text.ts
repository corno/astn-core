import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/generated/liana/schemas/sealed_target/data.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/text/data"
import type * as d_function_fp from "pareto-fountain-pen/interface/data/prose_serialize"

export namespace interface_ {
    export type Document = p_i.Transformer_With_Parameter<
        d_in.Document,
        d_out.Text,
        d_function_fp.Parameters
    >
    export type Value = p_i.Transformer_With_Parameter<
        d_in.Value,
        d_out.Text,
        d_function_fp.Parameters
    >
}
