
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/generated/liana/schemas/deserialize_parse_tree/data.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export type Error = p_.Transformer<
    d_in.Error,
    d_out.Phrase
>

