
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/schemas/sealed_target.js"
import type * as d_out from "pareto-fountain-pen/interface/data/prose"


export type Document = p_.Transformer<
    d_in.Document,
    d_out.Paragraph
>
export type Value = p_.Transformer<
    d_in.Value,
    d_out.Phrase
>

