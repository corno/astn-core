
import type * as p_ti from 'pareto-core/interface/transformer'

import type * as d_out from "../../../interface/schemas/annotated_characters.js"
import type * as d_in from "pareto-fountain-pen/interface/data/list_of_characters"
import type * as d_function from "../../../interface/schemas/deserialize_parse_tree.js"



export type Annotated_Characters = p_ti.Transformer_With_Parameter<
    d_in.List_of_Characters,
    d_out.Annotated_Characters,
    d_function.Parameters
>


