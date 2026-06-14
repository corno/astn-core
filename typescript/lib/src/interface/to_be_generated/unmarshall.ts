import * as pi from 'pareto-core/dist/interface'

import * as d_location from "../../interface/generated/liana/schemas/location/data"

export type Error = {
    'type': Error_Type
    'range': d_location.Range
}

export type Error_Type =
    | ['dictionary', Dictionary_Error]
    | ['type', Type_Error]
    | ['wrong value type', {
        'expected':
        | ['dictionary', null]
        | ['verbose group', null]
        | ['list', null]
        | ['nothing', null]
        | ['optional', null]
        | ['state', null]
        | ['text', null]
    }]

export type Dictionary_Error =
    | ['duplicate entry', string]

export type Type_Error = 
    | ['duplicate property', string]
    | ['unexpected properties', {
        'found': pi.Dictionary<d_location.Range>
        'expected': pi.Dictionary<null>
    }]
    | ['missing property', string]
