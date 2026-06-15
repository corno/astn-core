import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_di from 'pareto-core/dist/data/interface'
import p_list_from_text from 'pareto-core/dist/specials/list_from_text'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/sealed_target/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_loc from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

//dependencies
import * as t_primitives_to_text from "../primitives/text"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Document = (
    $: d_in.Document

): d_out.Paragraph => sh.pg.sentences([
    sh.sentence([
        Value($),
    ])
])

export const Value = (
    $: d_in.Value,
): d_out.Phrase => sh.ph.composed([
    pt.decide.state($, ($) => {
        switch ($[0]) {
            case 'dictionary': return pt.ss($, ($) => sh.ph.composed([
                sh.ph.literal("{"),
                sh.ph.indent(
                    sh.pg.sentences(pt.list.from.dictionary($).convert(($, id) => sh.sentence([
                        sh.ph.serialize(t_primitives_to_text.Apostrophed(id, {
                            'add delimiters': true
                        })),
                        sh.ph.literal(": "),
                        Value($),
                    ]))),
                ),
                sh.ph.literal("}"),
            ]))
            case 'group': return pt.ss($, ($) => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'verbose': return pt.ss($, ($) => sh.ph.composed([
                        sh.ph.composed([
                            sh.ph.literal("("),
                            sh.ph.indent(
                                sh.pg.sentences($.__to_list(($, id) => sh.sentence([
                                    sh.ph.serialize(t_primitives_to_text.Backticked(id, {
                                        'add delimiters': true
                                    })),
                                    sh.ph.literal(": "),
                                    Value($),
                                ]))),
                            ),
                            sh.ph.literal(")"),
                        ])
                    ]))
                    default: return pt.au($[0])
                }
            }))
            case 'list': return pt.ss($, ($) => sh.ph.composed([
                sh.ph.literal("["),
                sh.ph.composed($.__l_map(($) => sh.ph.composed([
                    sh.ph.literal(" "),
                    Value($),
                ]))),
                sh.ph.literal(" ]"),
            ]))
            case 'nothing': return pt.ss($, ($) => sh.ph.literal("~"))
            case 'optional': return pt.ss($, ($) => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'not set': return pt.ss($, ($) => sh.ph.literal("_"))
                    case 'set': return pt.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("* "),
                        Value($),
                    ]))

                    default: return pt.au($[0])
                }
            }))
            case 'state': return pt.ss($, ($) => sh.ph.composed([
                sh.ph.literal("| "),
                sh.ph.serialize(t_primitives_to_text.Backticked($.option, {
                    'add delimiters': true
                })),
                sh.ph.literal(" "),
                Value($.value),
            ]))
            case 'text': return pt.ss($, ($) => {
                const value = $.value
                return pt.decide.state($.delimiter, ($) => {
                    switch ($[0]) {
                        case 'apostrophe': return pt.ss($, ($) => sh.ph.serialize(t_primitives_to_text.Apostrophed(value, {
                            'add delimiters': true
                        })))
                        case 'quote': return pt.ss($, ($) => sh.ph.serialize(t_primitives_to_text.Quoted(value, {
                            'add delimiters': true
                        })))
                        case 'none': return pt.ss($, ($) => sh.ph.serialize(t_primitives_to_text.Undelimited(value)))
                        default: return pt.au($[0])
                    }
                })
            })
            default: return pt.au($[0])
        }
    })
])