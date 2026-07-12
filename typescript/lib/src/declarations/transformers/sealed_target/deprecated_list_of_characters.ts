import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/sealed_target.js"
import type * as s_out from "pareto-fountain-pen/interface/data/list_of_characters"
import type * as s_function_fp from "pareto-fountain-pen/interface/data/prose_serialize"



export type Document = p_.Transformer_With_Parameter<
    s_in.Document,
    s_out.List_of_Characters,
    s_function_fp.Parameters
>
export type Value = p_.Transformer_With_Parameter<
    s_in.Value,
    s_out.List_of_Characters,
    s_function_fp.Parameters
>

