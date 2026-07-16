import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../schemas/value_unmarshalling.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}

//dependencies
import * as ser_rich_phrase from "pareto-fountain-pen/_implementation/serializers/rich_phrase"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/rich_phrase/deprecated"

export const Error: declarations.Error = ($) => ser_rich_phrase.Phrase(sh.ph.composed([
    p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'dictionary': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'duplicate entry': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.text("duplicate entry: '"),
                                sh.ph.text($),
                                sh.ph.text("'")
                            ]))

                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'type': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'duplicate property': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.text("duplicate property: '"),
                                sh.ph.text($),
                                sh.ph.text("'")
                            ]))
                            case 'missing property': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.text("missing property: '"),
                                sh.ph.text($),
                                sh.ph.text("'")
                            ]))
                            case 'unexpected properties': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.text("unexpected properties: FIXME"),
                                // sh.ph.indent(
                                //     sh.pg.sentences(p_.from.dictionary($.found).convert_to_list(
                                //         ($, key) => sh.sentence([
                                //             sh.ph.text("-'"),
                                //             sh.ph.text(key),
                                //             sh.ph.text("'"),
                                //         ])))
                                // ),
                                sh.ph.text("expected properties: FIXME"),
                                // sh.ph.indent(
                                //     sh.pg.sentences(p_.from.dictionary($.expected).convert_to_list(
                                //         ($, key) => sh.sentence([
                                //             sh.ph.text("-'"),
                                //             sh.ph.text(key),
                                //             sh.ph.text("'"),
                                //         ])))
                                // ),
                            ]))

                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'wrong value type': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("wrong value type, expected: "),
                    p_.from.state($.expected).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'optional': return p_.option($, ($) => sh.ph.text("an optional"))
                                case 'nothing': return p_.option($, ($) => sh.ph.text("a nothing"))
                                case 'dictionary': return p_.option($, ($) => sh.ph.text("a dictionary"))
                                case 'verbose group': return p_.option($, ($) => sh.ph.text("a verbose group"))
                                case 'list': return p_.option($, ($) => sh.ph.text("a list"))
                                case 'state': return p_.option($, ($) => sh.ph.text("a state"))
                                case 'text': return p_.option($, ($) => sh.ph.text("a text"))
                                default: return p_.exhaustive($[0])
                            }
                        }),
                    sh.ph.text(" value")
                ]))
                default: return p_.exhaustive($[0])
            }
        }
    ),
]))