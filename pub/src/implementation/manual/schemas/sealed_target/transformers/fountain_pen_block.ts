import * as _p from 'pareto-core/dist/transformer'
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
                sh.b.snippet("{"),
                sh.b.indent([
                    sh.g.sub(_p.list.from_dictionary($, ($, key) => sh.g.nested_block([
                        sh.b.snippet(s_backticked(key, {
                            'add delimiters': true
                        })),
                        sh.b.snippet(": "),
                        Value($),
                    ]))),
                ]),
                sh.b.snippet("}"),
            ]))
            case 'group': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'verbose': return _p.ss($, ($) => sh.b.sub([
                        sh.b.sub([
                            sh.b.snippet("("),
                            sh.b.indent([
                                sh.g.sub($.__to_list(($, key) => ({ 'key': key, 'value': $ })).__l_map(($) => sh.g.nested_block([
                                    sh.b.snippet(s_apostrophed($.key, {
                                        'add delimiters': true
                                    })),
                                    sh.b.snippet(": "),
                                    Value($.value),
                                ]))),
                            ]),
                            sh.b.snippet(")"),
                        ])
                    ]))
                    default: return _p.au($[0])
                }
            }))
            case 'list': return _p.ss($, ($) => sh.b.sub([
                sh.b.snippet("["),
                sh.b.sub($.__l_map(($) => sh.b.sub([
                    sh.b.snippet(" "),
                    Value($),
                ]))),
                sh.b.snippet(" ]"),
            ]))
            case 'nothing': return _p.ss($, ($) => sh.b.snippet("~"))
            case 'optional': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'not set': return _p.ss($, ($) => sh.b.snippet("~"))
                    case 'set': return _p.ss($, ($) => sh.b.sub([
                        sh.b.snippet("* "),
                        Value($),
                    ]))

                    default: return _p.au($[0])
                }
            }))
            case 'state': return _p.ss($, ($) => sh.b.sub([
                sh.b.snippet("| "),
                sh.b.snippet(s_apostrophed($.option, {
                    'add delimiters': true
                })),
                sh.b.snippet(" "),
                Value($.value),
            ]))
            case 'text': return _p.ss($, ($) => {
                const value = $.value
                return _p.decide.state($.delimiter, ($) => {
                    switch ($[0]) {
                        case 'backtick': return _p.ss($, ($) => sh.b.snippet(s_backticked(value, {
                            'add delimiters': true
                        })))
                        case 'quote': return _p.ss($, ($) => sh.b.snippet(s_quoted(value, {
                            'add delimiters': true
                        })))
                        case 'none': return _p.ss($, ($) => sh.b.snippet(value))
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
