import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"


export const Error: p_ti.Transformer<d_in.Error, d_out.Range> = ($) => $.range