import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'

//data types
import type * as d_in from "../../../generated/liana/schemas/location/data.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"
import type * as d_function from "../../../data/location_to_prose.js"

import type * as d_temp_text from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"



export namespace interface_ {

    export type Location = p_i.Transformer_With_Parameter<
        d_in.Location,
        d_out.Phrase,
        d_function.Parameters
    >

    export type Range = p_i.Transformer_With_Parameter<
        d_in.Range,
        d_out.Phrase,
        d_function.Parameters
    >

    export type Possible_Range = p_i.Transformer_With_Parameter<
        d_in.Possible_Range,
        d_out.Phrase,
        d_function.Parameters
    >
    
}
