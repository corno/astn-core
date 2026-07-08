import * as p_ from 'pareto-core/implementation/refiner'
import type * as p_ti from 'pareto-core/interface/transformer'

import type * as d_out from "../../../../interface/data/annotated_characters.js"
import type * as d_in from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"
import type * as d_function from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data.js"

export namespace interface_ {

    export type Annotated_Characters = p_ti.Transformer_With_Parameter<
        d_in.List_of_Characters,
        d_out.Annotated_Characters,
        d_function.Parameters
    >

}
