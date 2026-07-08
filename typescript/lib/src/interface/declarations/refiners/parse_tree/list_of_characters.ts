import type * as p_ from 'pareto-core/interface/refiner'

//data types
import type * as d_function from "../../../generated/liana/schemas/deserialize_parse_tree/data.js"
import type * as d_out from "../../../generated/liana/schemas/parse_tree/data.js"
import type * as d_in from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"


export type Document = p_.Refiner_With_Parameter<
    d_out.Document,
    d_function.Error,
    d_in.List_of_Characters,
    d_function.Parameters
>


