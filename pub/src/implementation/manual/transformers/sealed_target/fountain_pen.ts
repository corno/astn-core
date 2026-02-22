import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/sealed_target/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_loc from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

//dependencies
import * as t_primitives_to_text from "../primitives/text"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Value = (
    $: d_in.Value,
): d_out.Phrase => sh.ph.composed([
    _p.decide.state($, ($) => {
        switch ($[0]) {
            case 'dictionary': return _p.ss($, ($) => sh.ph.composed([
                sh.ph.literal("{"),
                sh.ph.indent(
                    sh.pg.sentences(_p.list.from.dictionary($).convert(($, id) => sh.sentence([
                        sh.ph.serialize(t_primitives_to_text.Backticked(id, {
                            'add delimiters': true
                        })),
                        sh.ph.literal(": "),
                        Value($),
                    ]))),
                ),
                sh.ph.literal("}"),
            ]))
            case 'group': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'verbose': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.composed([
                            sh.ph.literal("("),
                            sh.ph.indent(
                                sh.pg.sentences($.__to_list(($, id) => sh.sentence([
                                    sh.ph.serialize(t_primitives_to_text.Apostrophed(id, {
                                        'add delimiters': true
                                    })),
                                    sh.ph.literal(": "),
                                    Value($),
                                ]))),
                            ),
                            sh.ph.literal(")"),
                        ])
                    ]))
                    default: return _p.au($[0])
                }
            }))
            case 'list': return _p.ss($, ($) => sh.ph.composed([
                sh.ph.literal("["),
                sh.ph.composed($.__l_map(($) => sh.ph.composed([
                    sh.ph.literal(" "),
                    Value($),
                ]))),
                sh.ph.literal(" ]"),
            ]))
            case 'nothing': return _p.ss($, ($) => sh.ph.literal("~"))
            case 'optional': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'not set': return _p.ss($, ($) => sh.ph.literal("~"))
                    case 'set': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("* "),
                        Value($),
                    ]))

                    default: return _p.au($[0])
                }
            }))
            case 'state': return _p.ss($, ($) => sh.ph.composed([
                sh.ph.literal("| "),
                sh.ph.serialize(t_primitives_to_text.Apostrophed($.option, {
                    'add delimiters': true
                })),
                sh.ph.literal(" "),
                Value($.value),
            ]))
            case 'text': return _p.ss($, ($) => {
                const value = $.value
                return _p.decide.state($.delimiter, ($) => {
                    switch ($[0]) {
                        case 'backtick': return _p.ss($, ($) => sh.ph.serialize(t_primitives_to_text.Backticked(value, {
                            'add delimiters': true
                        })))
                        case 'quote': return _p.ss($, ($) => sh.ph.serialize(t_primitives_to_text.Quoted(value, {
                            'add delimiters': true
                        })))
                        case 'none': return _p.ss($, ($) => sh.ph.serialize(t_primitives_to_text.Undelimited(value)))
                        default: return _p.au($[0])
                    }
                })
            })
            default: return _p.au($[0])
        }
    })
])

export const Document = (
    $: d_in.Document

): d_out.Paragraph => sh.pg.sentences([
    sh.sentence([
        Value($),
    ])
])