import * as p_ from 'pareto-core/implementation/transformer'

import type * as interface_ from "../../../declarations/transformers/sealed_target/prose.js"

//dependencies
import * as t_primitives_to_text from "../primitives/text.js"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Document: interface_.Document = ($) => sh.pg.sentences([
    sh.sentence([
        Value($),
    ])
])

export const Value: interface_.Value = ($) => sh.ph.composed([
    p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'dictionary': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("{"),
                    sh.ph.indent(
                        sh.pg.sentences(p_.from.dictionary($).convert_to_list(
                            ($, id) => sh.sentence(
                                p_.literal.list([
                                    sh.ph.serialize(t_primitives_to_text.Apostrophed(id, {
                                        'add delimiters': true
                                    })),
                                    sh.ph.literal(": "),
                                    Value($),
                                ])))
                        ),
                    ),
                    sh.ph.literal("}"),
                ]))
                case 'group': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'verbose': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.composed([
                                    sh.ph.literal("("),
                                    sh.ph.indent(
                                        sh.pg.sentences(p_.from.dictionary($).convert_to_list(
                                            ($, id) => sh.sentence(
                                                p_.literal.list([
                                                sh.ph.serialize(t_primitives_to_text.Backticked(id, {
                                                    'add delimiters': true
                                                })),
                                                sh.ph.literal(": "),
                                                Value($),
                                            ])))
                                        ),
                                    ),
                                    sh.ph.literal(")"),
                                ])
                            ]))
                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'list': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("["),
                    sh.ph.composed(p_.from.list($).map(
                        ($) => sh.ph.composed([
                            sh.ph.literal(" "),
                            Value($),
                        ]))),
                    sh.ph.literal(" ]"),
                ]))
                case 'nothing': return p_.option($, ($) => sh.ph.literal("~"))
                case 'optional': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'not set': return p_.option($, ($) => sh.ph.literal("_"))
                            case 'set': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.literal("* "),
                                Value($),
                            ]))

                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'state': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("| "),
                    sh.ph.serialize(t_primitives_to_text.Backticked($.option, {
                        'add delimiters': true
                    })),
                    sh.ph.literal(" "),
                    Value($.value),
                ]))
                case 'text': return p_.option($, ($) => {
                    const value = $.value
                    return p_.from.state($.delimiter).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'apostrophe': return p_.option($, ($) => sh.ph.serialize(t_primitives_to_text.Apostrophed(value, {
                                    'add delimiters': true
                                })))
                                case 'quote': return p_.option($, ($) => sh.ph.serialize(t_primitives_to_text.Quoted(value, {
                                    'add delimiters': true
                                })))
                                case 'none': return p_.option($, ($) => sh.ph.serialize(t_primitives_to_text.Undelimited(value)))
                                default: return p_.exhaustive($[0])
                            }
                        })
                })
                default: return p_.exhaustive($[0])
            }
        })
])