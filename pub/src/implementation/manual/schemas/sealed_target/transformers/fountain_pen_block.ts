import * as _p from 'pareto-core/dist/expression'
import * as _pi from 'pareto-core/dist/interface'

import * as d_in from "../../../../../interface/generated/liana/schemas/sealed_target/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/block/data"

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

import { $$ as s_apostrophed } from "../../../primitives/text/serializers/apostrophed"
import { $$ as s_quoted } from "../../../primitives/text/serializers/quoted"
import { $$ as s_backticked } from "../../../primitives/text/serializers/backticked"


export const Value = (
    $: d_in.Value,
): d_out.Block_Part => sh.b.sub([
    _p.decide.state($, ($) => {
        switch ($[0]) {
            case 'dictionary': return _p.ss($, ($) => sh.b.sub([
                sh.b.literal("{"),
                sh.b.indent([
                    sh.g.sub(_p.list.from_dictionary($, ($, id) => sh.g.nested_block([
                        sh.b.text(s_backticked(id, {
                            'add delimiters': true
                        })),
                        sh.b.literal(": "),
                        Value($),
                    ]))),
                ]),
                sh.b.literal("}"),
            ]))
            case 'group': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'verbose': return _p.ss($, ($) => sh.b.sub([
                        sh.b.sub([
                            sh.b.literal("("),
                            sh.b.indent([
                                sh.g.sub($.__to_list(($, id) => sh.g.nested_block([
                                    sh.b.text(s_apostrophed(id, {
                                        'add delimiters': true
                                    })),
                                    sh.b.literal(": "),
                                    Value($),
                                ]))),
                            ]),
                            sh.b.literal(")"),
                        ])
                    ]))
                    default: return _p.au($[0])
                }
            }))
            case 'list': return _p.ss($, ($) => sh.b.sub([
                sh.b.literal("["),
                sh.b.sub($.__l_map(($) => sh.b.sub([
                    sh.b.literal(" "),
                    Value($),
                ]))),
                sh.b.literal(" ]"),
            ]))
            case 'nothing': return _p.ss($, ($) => sh.b.literal("~"))
            case 'optional': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'not set': return _p.ss($, ($) => sh.b.literal("~"))
                    case 'set': return _p.ss($, ($) => sh.b.sub([
                        sh.b.literal("* "),
                        Value($),
                    ]))

                    default: return _p.au($[0])
                }
            }))
            case 'state': return _p.ss($, ($) => sh.b.sub([
                sh.b.literal("| "),
                sh.b.text(s_apostrophed($.option, {
                    'add delimiters': true
                })),
                sh.b.literal(" "),
                Value($.value),
            ]))
            case 'text': return _p.ss($, ($) => {
                const value = $.value
                return _p.decide.state($.delimiter, ($) => {
                    switch ($[0]) {
                        case 'backtick': return _p.ss($, ($) => sh.b.text(s_backticked(value, {
                            'add delimiters': true
                        })))
                        case 'quote': return _p.ss($, ($) => sh.b.text(s_quoted(value, {
                            'add delimiters': true
                        })))
                        case 'none': return _p.ss($, ($) => sh.b.literal(value))
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

): d_out.Group => {
    const result = sh.group([sh.g.nested_block([
        Value($),
    ])])
    return result
}
