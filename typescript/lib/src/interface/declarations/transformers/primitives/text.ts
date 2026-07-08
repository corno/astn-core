import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'

import type * as d_in from "../../../../interface/data/primitives.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"

export namespace d_function {

    export type Parameters = {  
        'add delimiters': boolean
    }

}

export namespace interface_ {
    export type Escaped = p_i.Transformer<
        d_in.Escaped,
        d_out.List_of_Characters
    >
    export type Quoted = p_i.Transformer_With_Parameter<
        d_in.Quoted,
        d_out.List_of_Characters,
        d_function.Parameters
    >
    export type Apostrophed = p_i.Transformer_With_Parameter<
        d_in.Apostrophed,
        d_out.List_of_Characters,
        d_function.Parameters
    >
    export type Backticked = p_i.Transformer_With_Parameter<
        d_in.Backticked,
        d_out.List_of_Characters,
        d_function.Parameters
    >
    export type Undelimited = p_i.Transformer<
        d_in.Undelimited,
        d_out.List_of_Characters
    >
}
