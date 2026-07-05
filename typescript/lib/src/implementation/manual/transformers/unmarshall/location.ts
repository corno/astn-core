import * as p_i from 'pareto-core/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall.js"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data.js"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Range
    >
}

export const Error: interface_.Error = ($) => $.range