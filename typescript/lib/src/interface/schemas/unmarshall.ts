import * as p_ from 'pareto-core/interface/schema'

import type * as s_location from "../../interface/schemas/location.js"

export type Error = {
    'type': Error_Type
    'range': s_location.Range
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
        'found': p_.Dictionary<s_location.Range>
        'expected': p_.Dictionary<null>
    }]
    | ['missing property', string]
