import type * as p_i from 'pareto-core/interface/refiner'
import p_iterate from 'pareto-core/implementation/refiner/specials/iterate'

//data types
import type * as d_function from "../../../generated/liana/schemas/deserialize_parse_tree/data.js"
import type * as d_out from "../../../generated/liana/schemas/parse_tree/data.js"
import type * as d_in from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"

//dependencies
import * as r_annotated_characters from "../annotated_characters/text.js"
import * as r_tokenize from "../token/annotated_character.js"
import * as r_from_tokenizer_result from "./tokenizer_result.js"

export namespace interface_ {

    export type Document = p_i.Refiner_With_Parameter<
        d_out.Document,
        d_function.Error,
        d_in.List_of_Characters,
        d_function.Parameters
    >

}
