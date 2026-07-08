import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../data/unmarshall.js"
import type * as d_out from "../../../generated/liana/schemas/location/data.js"


export type Error = p_.Transformer<
    d_in.Error,
    d_out.Range
>

