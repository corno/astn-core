import * as d_location from "../../interface/generated/liana/schemas/location/data"

export type Error = {
    'type': Error_Type
    'range': d_location.Range
}

export type Error_Type =
    | ['entry missing', null]
    | ['duplicate entry', string]
    | ['wrong value type', {
        'expected':
        | ['dictionary', null]
        | ['group', null]
        | ['list', null]
        | ['nothing', null]
        | ['optional', null]
        | ['state', null]
        | ['text', null]
    }]