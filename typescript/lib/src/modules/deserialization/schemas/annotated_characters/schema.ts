import * as p_ from 'pareto-core/schema'

import type * as s_location from "../location/schema.js"

export type Annotated_Character = {
    'code': number
    'location': s_location.Location
    'line indentation': number
}

export type Annotated_Characters = {
    'characters': p_.List<Annotated_Character>,
    'end': End
}

export type End = s_location.Location