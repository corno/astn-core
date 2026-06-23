import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"


export const Error: p_i.Transformer<
d_in.Error, d_out.Range
> = ($) => $.range