import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'

//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"


export const Error: _pi.Transformer<d_in.Error, d_out.Range> = ($) => $.range