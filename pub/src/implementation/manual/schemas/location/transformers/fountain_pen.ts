import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import * as d_in from "../../../../../interface/generated/liana/schemas/location/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_text from "pareto-fountain-pen/dist/interface/to_be_generated/list_of_characters"

import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export type Parameters = {
    'with @': boolean
    'position info':
    | ['zero based', null]
    | ['one based', null]
}

export namespace signatures {
    export type Location = _pi.Transformer_With_Parameter<d_in.Location, d_out.Phrase, Parameters>
    export type Range = _pi.Transformer_With_Parameter<d_in.Range, d_out.Phrase, Parameters>
}


const temp_serialize_number = (n: number): d_text.List_of_Characters => {
    return _p_list_from_text(`${n}`, ($) => $)
}

export const Range: signatures.Range = ($, $p) =>  sh.ph.composed([
    $p['with @'] ? sh.ph.literal("@ ") : sh.ph.nothing(),
    sh.ph.literal($.start.relative['document resource identifier']),
    sh.ph.literal(":"),
    sh.ph.serialize(temp_serialize_number($.start.relative.line + _p.decide.state($p['position info'], ($) => ($[0] === 'zero based' ? 0 : 1)))),
    sh.ph.literal(":"),
    sh.ph.serialize(temp_serialize_number($.start.relative.column + _p.decide.state($p['position info'], ($) => ($[0] === 'zero based' ? 0 : 1)))),
    sh.ph.literal("-"),
    sh.ph.serialize(temp_serialize_number($.end.relative.line + _p.decide.state($p['position info'], ($) => ($[0] === 'zero based' ? 0 : 1)))),
    sh.ph.literal(":"),
    sh.ph.serialize(temp_serialize_number($.end.relative.column + _p.decide.state($p['position info'], ($) => ($[0] === 'zero based' ? 0 : 1))))
])

export const Location: signatures.Location = ($, $p) => {
    return sh.ph.composed([
        $p['with @'] ? sh.ph.literal("@ ") : sh.ph.nothing(),
        sh.ph.literal($.relative['document resource identifier']),
        sh.ph.literal(":"),
        sh.ph.serialize(temp_serialize_number($.relative.line + _p.decide.state($p['position info'], ($) => ($[0] === 'zero based' ? 0 : 1)))),
        sh.ph.literal(":"),
        sh.ph.serialize(temp_serialize_number($.relative.column + _p.decide.state($p['position info'], ($) => ($[0] === 'zero based' ? 0 : 1)))),
    ])
}