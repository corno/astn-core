
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../interface/schemas/location.js"
import type * as d_out from "pareto-fountain-pen/interface/data/prose"
import type * as d_function from "../../../interface/schemas/location_to_prose.js"

export type Location = p_.Transformer_With_Parameter<
    d_in.Location,
    d_out.Phrase,
    d_function.Parameters
>

export type Range = p_.Transformer_With_Parameter<
    d_in.Range,
    d_out.Phrase,
    d_function.Parameters
>

export type Possible_Range = p_.Transformer_With_Parameter<
    d_in.Possible_Range,
    d_out.Phrase,
    d_function.Parameters
>


