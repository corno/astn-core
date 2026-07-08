import type * as p_i from 'pareto-core/interface/refiner'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'

//data types
import type * as d_function from "../../../generated/liana/schemas/deserialize_parse_tree/data.js"
import type * as d_out from "../../../generated/liana/schemas/parse_tree/data.js"
import type * as d_in from "pareto-fountain-pen/interface/generated/liana/schemas/text/data"

//dependencies
import * as r_from_list_of_characters from "./list_of_characters.js"

export namespace interface_ {
    export type Document = p_i.Refiner_With_Parameter<
        d_out.Document,
        d_function.Error,
        d_in.Text,
        d_function.Parameters
    >
}
