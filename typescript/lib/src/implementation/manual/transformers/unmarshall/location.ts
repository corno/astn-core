import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/unmarshall.js"
import type * as d_out from "../../../../interface/generated/liana/schemas/location/data.js"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Range
    >
}
import * as temp_interface_ from "../../../../interface/declarations/transformers/unmarshall/location.js"

export const Error: interface_.Error = ($) => $.range