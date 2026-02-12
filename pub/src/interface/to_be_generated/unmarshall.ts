import * as _pi from 'pareto-core/dist/interface'

import * as d_location from "../../interface/generated/liana/schemas/location/data"

export type Error = {
    'type': Error_Type
    'range': d_location.Range
}

export type Error_Type =
    | ['unexpected properties', _pi.Dictionary<d_location.Range>]
    | ['missing property', string]
    | ['duplicate entry', string]
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