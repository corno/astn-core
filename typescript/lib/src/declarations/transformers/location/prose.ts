
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as s_in from "../../../interface/schemas/location.js"
import type * as s_out from "pareto-fountain-pen/interface/data/prose"
import type * as s_function from "../../../interface/schemas/location_to_prose.js"

export type Location = p_.Transformer_With_Parameter<
    s_in.Location,
    s_out.Phrase,
    s_function.Parameters
>

export type Range = p_.Transformer_With_Parameter<
    s_in.Range,
    s_out.Phrase,
    s_function.Parameters
>

export type Possible_Range = p_.Transformer_With_Parameter<
    s_in.Possible_Range,
    s_out.Phrase,
    s_function.Parameters
>


