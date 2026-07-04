import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

export const Error: p_i.Transformer<
    d_in.Error,
    d_out.Phrase
> = ($) => sh.ph.composed([
    p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'dictionary': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'duplicate entry': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.literal("duplicate entry: '"),
                                sh.ph.literal($),
                                sh.ph.literal("'")
                            ]))

                            default: return p_.au($[0])
                        }
                    }))
                case 'type': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'duplicate property': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.literal("duplicate property: '"),
                                sh.ph.literal($),
                                sh.ph.literal("'")
                            ]))
                            case 'missing property': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.literal("missing property: '"),
                                sh.ph.literal($),
                                sh.ph.literal("'")
                            ]))
                            case 'unexpected properties': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.literal("unexpected properties: "),
                                sh.ph.indent(
                                    sh.pg.sentences(p_.from.dictionary($.found).convert_to_list(
                                        ($, key) => sh.sentence([
                                            sh.ph.literal("-'"),
                                            sh.ph.literal(key),
                                            sh.ph.literal("'"),
                                        ])))
                                ),
                                sh.ph.literal("expected properties: "),
                                sh.ph.indent(
                                    sh.pg.sentences(p_.from.dictionary($.expected).convert_to_list(
                                        ($, key) => sh.sentence([
                                            sh.ph.literal("-'"),
                                            sh.ph.literal(key),
                                            sh.ph.literal("'"),
                                        ])))
                                ),
                            ]))

                            default: return p_.au($[0])
                        }
                    }))
                case 'wrong value type': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("wrong value type, expected: "),
                    p_.from.state($.expected).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'optional': return p_.option($, ($) => sh.ph.literal("an optional"))
                                case 'nothing': return p_.option($, ($) => sh.ph.literal("a nothing"))
                                case 'dictionary': return p_.option($, ($) => sh.ph.literal("a dictionary"))
                                case 'verbose group': return p_.option($, ($) => sh.ph.literal("a verbose group"))
                                case 'list': return p_.option($, ($) => sh.ph.literal("a list"))
                                case 'state': return p_.option($, ($) => sh.ph.literal("a state"))
                                case 'text': return p_.option($, ($) => sh.ph.literal("a text"))
                                default: return p_.au($[0])
                            }
                        }),
                    sh.ph.literal(" value")
                ]))
                default: return p_.au($[0])
            }
        }),

])