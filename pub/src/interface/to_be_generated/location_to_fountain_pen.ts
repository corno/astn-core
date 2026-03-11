
export type Old_Parameters = {
    'character location reporting': character_location_reporting
    'document resource identifier': string
}

export type character_location_reporting =
    | ['zero based', null]
    | ['one based', null]