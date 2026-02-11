

export type Error = 
    | readonly ['expected a dictionary', null]
    | readonly ['expected a group', null]
    | readonly ['expected a list', null]
    | readonly ['expected a nothing', null]
    | readonly ['expected an optional', null]
    | readonly ['expected a state', null]
    | readonly ['expected a text', null]
    | readonly ['not a valid number', null]
    | readonly ['not a valid boolean', null]
    | readonly ['no such entry', string]
    | readonly ['unknown option', string]