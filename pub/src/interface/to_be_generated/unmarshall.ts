import * as _pi from 'pareto-core/dist/interface'

import * as d_location from "../../interface/generated/liana/schemas/location/data"
import { Range_Info } from '../../implementation/manual/transformers/parse_tree/location_info'

export type Error = {
    'type': Error_Type
    'range': Range_Info
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
    | ['unexpected properties', _pi.Dictionary<d_location.Range>]
    | ['missing property', string]
