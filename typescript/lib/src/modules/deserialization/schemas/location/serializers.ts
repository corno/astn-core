import * as p_ from 'pareto-core/serializer'

//schemas
import type * as s_in from "./schema.js"
import type * as s_parameters from "../location_serialization/schema.js"

namespace declarations {
    export type Location = p_.Serializer_With_Parameter<
        s_in.Location,
        s_parameters.Parameters
    >
    export type Range = p_.Serializer_With_Parameter<
        s_in.Range,
        s_parameters.Parameters
    >
    export type Possible_Range = p_.Serializer_With_Parameter<
        s_in.Possible_Range,
        s_parameters.Parameters
    >
}


//shorthands
import * as sh from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/shorthands/deprecated"

//dependencies
import * as ser_rich_phrase from "pareto-fountain-pen/modules/rich_phrase/schemas/rich_phrase/serializers"

const temp_serialize_number = (n: number): string => {
    return `${n}`
}

export const Range: declarations.Range = ($, $p) => ser_rich_phrase.Phrase(sh.ph.composed([
    sh.ph.text(temp_serialize_number($.start.relative.line + p_.from.state($p['character location reporting']).decide(
        ($) => ($[0] === 'zero based' ? 0 : 1)))),
    sh.ph.text(":"),
    sh.ph.text(temp_serialize_number($.start.relative.column + p_.from.state($p['character location reporting']).decide(
        ($) => ($[0] === 'zero based' ? 0 : 1)))),
    sh.ph.text("-"),
    sh.ph.text(temp_serialize_number($.end.relative.line + p_.from.state($p['character location reporting']).decide(
        ($) => ($[0] === 'zero based' ? 0 : 1)))),
    sh.ph.text(":"),
    sh.ph.text(temp_serialize_number($.end.relative.column + p_.from.state($p['character location reporting']).decide(
        ($) => ($[0] === 'zero based' ? 0 : 1))))
]))

export const Possible_Range: declarations.Possible_Range = ($, $p) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'range': return p_.option($, ($) => Range($, $p))
            case 'end of document': return p_.option($, ($) => Location($.end, $p))
            default: return p_.exhaustive($[0])
        }
    })

export const Location: declarations.Location = ($, $p) => {
    return ser_rich_phrase.Phrase(sh.ph.composed([
        sh.ph.text(temp_serialize_number($.relative.line + p_.from.state($p['character location reporting']).decide(
            ($) => ($[0] === 'zero based' ? 0 : 1)))),
        sh.ph.text(":"),
        sh.ph.text(temp_serialize_number($.relative.column + p_.from.state($p['character location reporting']).decide(
            ($) => ($[0] === 'zero based' ? 0 : 1)))),
    ]))
}