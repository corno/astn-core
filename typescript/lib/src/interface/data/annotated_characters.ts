import * as p_di from 'pareto-core/dist/interface/data'

import * as d_location from "../generated/liana/schemas/location/data"

export type Annotated_Character = {
    'code': number
    'location': d_location.Location
    'line indentation': number
}

export type Annotated_Characters = {
    'characters': p_di.List<Annotated_Character>,
    'end': d_location.Location
}