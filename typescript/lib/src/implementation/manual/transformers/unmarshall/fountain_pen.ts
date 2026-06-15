import * as pt from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_in from "../../../../interface/data/unmarshall"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error: p_i.Transformer<d_in.Error, d_out.Phrase> = ($) => sh.ph.composed([
    pt.decide.state($.type, ($) => {
        switch ($[0]) {
            case 'dictionary': return pt.ss($, ($) => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'duplicate entry': return pt.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("duplicate entry: '"),
                        sh.ph.literal($),
                        sh.ph.literal("'")
                    ]))

                    default: return pt.au($[0])
                }
            }))
            case 'type': return pt.ss($, ($) => pt.decide.state($, ($) => {
                switch ($[0]) {
                    case 'duplicate property': return pt.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("duplicate property: '"),
                        sh.ph.literal($),
                        sh.ph.literal("'")
                    ]))
                    case 'missing property': return pt.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("missing property: '"),
                        sh.ph.literal($),
                        sh.ph.literal("'")
                    ]))
                    case 'unexpected properties': return pt.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("unexpected properties: "),
                        sh.ph.indent(
                            sh.pg.sentences($.found.__to_list(($, key) => sh.sentence([
                                sh.ph.literal("-'"),
                                sh.ph.literal(key),
                                sh.ph.literal("'"),
                            ])))
                        ),
                        sh.ph.literal("expected properties: "),
                        sh.ph.indent(
                            sh.pg.sentences($.expected.__to_list(($, key) => sh.sentence([
                                sh.ph.literal("-'"),
                                sh.ph.literal(key),
                                sh.ph.literal("'"),
                            ])))
                        ),
                    ]))

                    default: return pt.au($[0])
                }
            }))
            case 'wrong value type': return pt.ss($, ($) => sh.ph.composed([
                sh.ph.literal("wrong value type, expected: "),
                pt.decide.state($.expected, ($) => {
                    switch ($[0]) {
                        case 'optional': return pt.ss($, ($) => sh.ph.literal("an optional"))
                        case 'nothing': return pt.ss($, ($) => sh.ph.literal("a nothing"))
                        case 'dictionary': return pt.ss($, ($) => sh.ph.literal("a dictionary"))
                        case 'verbose group': return pt.ss($, ($) => sh.ph.literal("a verbose group"))
                        case 'list': return pt.ss($, ($) => sh.ph.literal("a list"))
                        case 'state': return pt.ss($, ($) => sh.ph.literal("a state"))
                        case 'text': return pt.ss($, ($) => sh.ph.literal("a text"))
                        default: return pt.au($[0])
                    }
                }),
                sh.ph.literal(" value")
            ]))
            default: return pt.au($[0])
        }
    }),

])

// export const Error = ($: d_in.Error): d_out.Phrase => pt.decide.state($, ($) => {
//     switch ($[0]) {

//         case 'expected a dictionary': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a dictionary")
//         ]))
//         case 'expected a group': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a group")
//         ]))
//         case 'expected a list': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a list")
//         ]))
//         case 'expected a nothing': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a nothing ( ~ )")
//         ]))
//         case 'expected an optional': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected an optional ( ~ or * -value- )")
//         ]))
//         case 'expected a state': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a state ( one of the allowed options )")
//         ]))
//         case 'expected a text': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("expected a text")
//         ]))
//         case 'not a valid number': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("not a valid number")
//         ]))
//         case 'not a valid boolean': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("not a valid boolean")
//         ]))
//         case 'no such entry': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("no such entry: '"),
//             sh.ph.literal($),
//             sh.ph.literal("'")
//         ]))
//         case 'unknown option': return pt.ss($, ($) => sh.ph.composed([
//             sh.ph.literal("unknown option: '"),
//             sh.ph.literal($),
//             sh.ph.literal("'")
//         ]))
//         default: return pt.au($[0])
//     }
// })