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

    //     | readonly ['expected a dictionary', null]
    // | readonly ['expected a group', null]
    // | readonly ['expected a list', null]
    // | readonly ['expected a nothing', null]
    // | readonly ['expected an optional', null]
    // | readonly ['expected a state', null]
    // | readonly ['expected a text', null]
    // | readonly ['not a valid number', null]
    // | readonly ['not a valid boolean', null]
    // | readonly ['no such entry', s]
    // | readonly ['unknown option', null]