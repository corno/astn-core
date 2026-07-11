import type * as p_ from 'pareto-core/interface/refiner'

//data types
import type * as s_function from "../../../interface/schemas/deserialize_parse_tree.js"
import type * as s_out from "../../../interface/schemas/parse_tree.js"
import type * as s_in from "pareto-fountain-pen/interface/data/text"

export type Document = p_.Refiner_With_Parameter<
    s_out.Document,
    s_function.Error,
    s_in.Text,
    s_function.Parameters
>

