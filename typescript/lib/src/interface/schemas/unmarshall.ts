import * as p_ from 'pareto-core/interface/data'

import type * as d_location from "../../interface/schemas/location.js"

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
        'found': p_.Dictionary<d_location.Range>
        'expected': p_.Dictionary<null>
    }]
    | ['missing property', string]
