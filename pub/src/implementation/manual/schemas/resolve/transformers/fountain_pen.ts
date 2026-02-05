import * as _p from 'pareto-core/dist/expression'

import * as d_in from "../../../../../interface/to_be_generated/resolve"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/block/data"

export type Error = ($: d_in.Error) => d_out.Phrase

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/block"

export const Error: Error = ($) => sh.ph.composed([
    sh.ph.literal($.location['document resource identifier']),
    sh.ph.literal(":"),
    sh.ph.decimal($.location.line),
    sh.ph.literal(":"),
    sh.ph.decimal($.location.column),
    sh.ph.literal(": "),
    _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'constraint': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'state': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("expected '"),
                        sh.ph.literal($.expected),
                        sh.ph.literal("' but found '"),
                        sh.ph.literal($.found),
                        sh.ph.literal("'"),
                    ]))
                    case 'optional value is not set': return _p.ss($, ($) => sh.ph.literal("expected parameter/optional value to be set"))
                    case 'same node': return _p.ss($, ($) => sh.ph.literal("${$}, not the same node"))
                    default: return _p.au($[0])
                }
            }))
            case 'lookup': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'cycle detected': return _p.ss($, ($) => sh.ph.literal("cycle detected"))
                    case 'no such entry': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("no such entry: '"),
                        sh.ph.literal($),
                        sh.ph.literal("'")
                    ]))
                    case 'no context lookup': return _p.ss($, ($) => sh.ph.literal("there is is no context where this entry can be looked up"))
                    default: return _p.au($[0])
                }
            }))
            case 'missing required entries': return _p.ss($, ($) => sh.ph.composed([
                sh.ph.literal("missing required entries:"),
                sh.ph.indent(
                    sh.pg.sentences($.__to_list(($, id) => sh.ph.composed([
                        sh.ph.literal(`- `),
                        sh.ph.literal(id)
                    ])))
                )
            ]))
            default: return _p.au($[0])
        }
    })
])