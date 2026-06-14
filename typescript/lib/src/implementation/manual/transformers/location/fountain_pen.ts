import * as pt from 'pareto-core/dist/assign'
import * as pi from 'pareto-core/dist/interface'
import p_list_from_text from 'pareto-core/dist/_p_list_from_text'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/location/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_function from "../../../../interface/to_be_generated/location_to_fountain_pen"

import * as d_temp_text from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"



export namespace signatures {
    export type Location = pi.Transformer_With_Parameter<d_in.Location, d_out.Phrase, d_function.Parameters>
    export type Range = pi.Transformer_With_Parameter<d_in.Range, d_out.Phrase, d_function.Parameters>
    export type Possible_Range = pi.Transformer_With_Parameter<d_in.Possible_Range, d_out.Phrase, d_function.Parameters>
}


const temp_serialize_number = (n: number): d_temp_text.List_of_Characters => {
    return p_list_from_text(`${n}`, ($) => $)
}

export const Range: signatures.Range = ($, $p) => sh.ph.composed([
    sh.ph.serialize(temp_serialize_number($.start.relative.line + pt.decide.state($p['character location reporting'], ($) => ($[0] === 'zero based' ? 0 : 1)))),
    sh.ph.literal(":"),
    sh.ph.serialize(temp_serialize_number($.start.relative.column + pt.decide.state($p['character location reporting'], ($) => ($[0] === 'zero based' ? 0 : 1)))),
    sh.ph.literal("-"),
    sh.ph.serialize(temp_serialize_number($.end.relative.line + pt.decide.state($p['character location reporting'], ($) => ($[0] === 'zero based' ? 0 : 1)))),
    sh.ph.literal(":"),
    sh.ph.serialize(temp_serialize_number($.end.relative.column + pt.decide.state($p['character location reporting'], ($) => ($[0] === 'zero based' ? 0 : 1))))
])

export const Possible_Range: signatures.Possible_Range = ($, $p) => pt.decide.state($, ($) => {
    switch ($[0]) {
        case 'range': return pt.ss($, ($) => Range($, $p))
        case 'end of document': return pt.ss($, ($) => Location($.end, $p))
        default: return pt.au($[0])
    }
})

export const Location: signatures.Location = ($, $p) => {
    return sh.ph.composed([
        sh.ph.serialize(temp_serialize_number($.relative.line + pt.decide.state($p['character location reporting'], ($) => ($[0] === 'zero based' ? 0 : 1)))),
        sh.ph.literal(":"),
        sh.ph.serialize(temp_serialize_number($.relative.column + pt.decide.state($p['character location reporting'], ($) => ($[0] === 'zero based' ? 0 : 1)))),
    ])
}