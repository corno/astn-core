import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'

//data types
import type * as d_in from "../../../../interface/generated/liana/schemas/location/data.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"
import type * as d_function from "../../../../interface/data/location_to_prose.js"

import type * as d_temp_text from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"



export namespace interface_ {

    export type Location = p_i.Transformer_With_Parameter<
        d_in.Location,
        d_out.Phrase,
        d_function.Parameters
    >

    export type Range = p_i.Transformer_With_Parameter<
        d_in.Range,
        d_out.Phrase,
        d_function.Parameters
    >

    export type Possible_Range = p_i.Transformer_With_Parameter<
        d_in.Possible_Range,
        d_out.Phrase,
        d_function.Parameters
    >
    
}
import * as temp_interface_ from "../../../../interface/declarations/transformers/location/prose.js"


const temp_serialize_number = (n: number): d_temp_text.List_of_Characters => {
    return p_list_from_text(
        `${n}`,
        ($) => $
    )
}

export const Range: interface_.Range = ($, $p) => sh.ph.composed([
    sh.ph.serialize(temp_serialize_number($.start.relative.line + p_.from.state($p['character location reporting']).decide(
        ($) => ($[0] === 'zero based' ? 0 : 1)))),
    sh.ph.literal(":"),
    sh.ph.serialize(temp_serialize_number($.start.relative.column + p_.from.state($p['character location reporting']).decide(
        ($) => ($[0] === 'zero based' ? 0 : 1)))),
    sh.ph.literal("-"),
    sh.ph.serialize(temp_serialize_number($.end.relative.line + p_.from.state($p['character location reporting']).decide(
        ($) => ($[0] === 'zero based' ? 0 : 1)))),
    sh.ph.literal(":"),
    sh.ph.serialize(temp_serialize_number($.end.relative.column + p_.from.state($p['character location reporting']).decide(
        ($) => ($[0] === 'zero based' ? 0 : 1))))
])

export const Possible_Range: interface_.Possible_Range = ($, $p) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'range': return p_.option($, ($) => Range($, $p))
            case 'end of document': return p_.option($, ($) => Location($.end, $p))
            default: return p_.exhaustive($[0])
        }
    })

export const Location: interface_.Location = ($, $p) => {
    return sh.ph.composed([
        sh.ph.serialize(temp_serialize_number($.relative.line + p_.from.state($p['character location reporting']).decide(
            ($) => ($[0] === 'zero based' ? 0 : 1)))),
        sh.ph.literal(":"),
        sh.ph.serialize(temp_serialize_number($.relative.column + p_.from.state($p['character location reporting']).decide(
            ($) => ($[0] === 'zero based' ? 0 : 1)))),
    ])
}