
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as s_in from "../../../interface/schemas/sealed_target.js"
import type * as s_out from "pareto-fountain-pen/interface/data/prose"


export type Document = p_.Transformer<
    s_in.Document,
    s_out.Paragraph
>
export type Value = p_.Transformer<
    s_in.Value,
    s_out.Phrase
>

