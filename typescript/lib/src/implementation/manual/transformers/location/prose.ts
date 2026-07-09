import * as p_ from 'pareto-core/implementation/transformer'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'

import type * as interface_ from "../../../../declarations/transformers/location/prose.js"

//data types
import type * as d_temp_text from "pareto-fountain-pen/interface/generated/liana/schemas/list_of_characters/data"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"



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