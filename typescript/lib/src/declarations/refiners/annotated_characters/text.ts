
import type * as p_ti from 'pareto-core/interface/transformer'

import type * as s_out from "../../../interface/schemas/annotated_characters.js"
import type * as s_in from "../../../interface/schemas/list_of_characters.js"
import type * as s_function from "../../../interface/schemas/deserialize_parse_tree.js"



export type Annotated_Characters = p_ti.Transformer_With_Parameter<
    s_in.List_of_Characters,
    s_out.Annotated_Characters,
    s_function.Parameters
>


