import * as p_ from 'pareto-core/interface/data'

import * as d_location from "../generated/liana/schemas/location/data.js"

export type Annotated_Character = {
    'code': number
    'location': d_location.Location
    'line indentation': number
}

export type Annotated_Characters = {
    'characters': p_.List<Annotated_Character>,
    'end': End
}

export type End = d_location.Location