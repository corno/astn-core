import type * as p_ from 'pareto-core/interface/refiner'

//data types
import type * as d_function from "../../../interface/schemas/deserialize_parse_tree.js"
import type * as d_out from "../../../interface/schemas/parse_tree.js"
import type * as d_in from "pareto-fountain-pen/interface/data/text"

export type Document = p_.Refiner_With_Parameter<
    d_out.Document,
    d_function.Error,
    d_in.Text,
    d_function.Parameters
>

