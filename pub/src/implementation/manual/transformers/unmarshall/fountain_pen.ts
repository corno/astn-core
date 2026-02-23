import * as _p from 'pareto-core/dist/assign'
//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error = ($: d_in.Error): d_out.Phrase => sh.ph.composed([
    sh.ph.literal(`${$.range.start.relative['document resource identifier']}:${$.range.start.relative.line}:${$.range.start.relative.column}-${$.range.end.relative.line}:${$.range.end.relative.column}`),
    sh.ph.literal(" - "),
    _p.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'dictionary': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'duplicate entry': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("duplicate entry: '"),
                        sh.ph.literal($),
                        sh.ph.literal("'")
                    ]))

                    default: return _p.au($[0])
                }
            }))
            case 'type': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'duplicate property': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("duplicate property: '"),
                        sh.ph.literal($),
                        sh.ph.literal("'")
                    ]))
                    case 'missing property': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("missing property: '"),
                        sh.ph.literal($),
                        sh.ph.literal("'")
                    ]))
                    case 'unexpected properties': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("unexpected properties: "),
                        sh.ph.indent(
                            sh.pg.sentences($.__to_list(($, key) => sh.sentence([
                                sh.ph.literal("-'"),
                                sh.ph.literal(key),
                                sh.ph.literal("'"),
                            ])))
                        ),
                    ]))

                    default: return _p.au($[0])
                }
            }))
            case 'wrong value type': return _p.ss($, ($) => sh.ph.composed([
                sh.ph.literal("wrong value type, expected: "),
                _p.decide.state($.expected, ($) => {
                    switch ($[0]) {
                        case 'optional': return _p.ss($, ($) => sh.ph.literal("an optional"))
                        case 'nothing': return _p.ss($, ($) => sh.ph.literal("a nothing"))
                        case 'dictionary': return _p.ss($, ($) => sh.ph.literal("a dictionary"))
                        case 'verbose group': return _p.ss($, ($) => sh.ph.literal("a verbose group"))
                        case 'list': return _p.ss($, ($) => sh.ph.literal("a list"))
                        case 'state': return _p.ss($, ($) => sh.ph.literal("a state"))
                        case 'text': return _p.ss($, ($) => sh.ph.literal("a text"))
                        default: return _p.au($[0])
                    }
                }),
                sh.ph.literal(" value")
            ]))
            default: return _p.au($[0])
        }
    }),

])

// export const Error = ($: d_in.Error): d_out.Phrase => _p.decide.state($, ($) => {
//     switch ($[0]) {

//         case 'expected a dictionary': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a dictionary")
//         ]))
//         case 'expected a group': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a group")
//         ]))
//         case 'expected a list': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a list")
//         ]))
//         case 'expected a nothing': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a nothing ( ~ )")
//         ]))
//         case 'expected an optional': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected an optional ( ~ or * -value- )")
//         ]))
//         case 'expected a state': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a state ( one of the allowed options )")
//         ]))
//         case 'expected a text': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a text")
//         ]))
//         case 'not a valid number': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("not a valid number")
//         ]))
//         case 'not a valid boolean': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("not a valid boolean")
//         ]))
//         case 'no such entry': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("no such entry: '"),
//             sh.ph.literal($),
//             sh.ph.literal("'")
//         ]))
//         case 'unknown option': return _p.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("unknown option: '"),
//             sh.ph.literal($),
//             sh.ph.literal("'")
//         ]))
//         default: return _p.au($[0])
//     }
// })