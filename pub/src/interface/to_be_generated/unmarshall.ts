import * as _pi from 'pareto-core/dist/interface'

import * as d_location from "../../interface/generated/liana/schemas/location/data"

export type Error = {
    'type': Error_Type
    'range': d_location.Range
}

export type Error_Type =
    | ['state', State_Error]
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

export type State_Error =
    | ['unknown option', string]

export type Dictionary_Error =
    | ['entry not set', string]
    | ['duplicate entry', string]

export type Type_Error = 
    | ['duplicate property', string]
    | ['unexpected properties', _pi.Dictionary<d_location.Range>]
    | ['missing property', string]
    | ['property not set', string]
