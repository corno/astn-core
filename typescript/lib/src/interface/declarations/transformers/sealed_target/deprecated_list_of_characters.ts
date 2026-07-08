import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../generated/liana/schemas/sealed_target/data.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"
import type * as d_function_fp from "pareto-fountain-pen/interface/data/prose_serialize"



    export type Document = p_.Transformer_With_Parameter<
        d_in.Document,
        d_out.List_of_Characters,
        d_function_fp.Parameters
    >
    export type Value = p_.Transformer_With_Parameter<
        d_in.Value,
        d_out.List_of_Characters,
        d_function_fp.Parameters
    >

