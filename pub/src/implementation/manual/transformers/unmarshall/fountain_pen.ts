import * as _p from 'pareto-core/dist/assign'
//data types
import * as d_in from "../../../../interface/to_be_generated/unmarshall"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

export const Error = ($: d_in.Error): d_out.Phrase => _p.decide.state($, ($) => {
    switch ($[0]) {

        case 'expected a dictionary': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("expected a dictionary")
        ]))
        case 'expected a group': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("expected a group")
        ]))
        case 'expected a list': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("expected a list")
        ]))
        case 'expected a nothing': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("expected a nothing ( ~ )")
        ]))
        case 'expected an optional': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("expected an optional ( ~ or * -value- )")
        ]))
        case 'expected a state': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("expected a state ( one of the allowed options )")
        ]))
        case 'expected a text': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("expected a text")
        ]))
        case 'not a valid number': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("not a valid number")
        ]))
        case 'not a valid boolean': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("not a valid boolean")
        ]))
        case 'no such entry': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("no such entry: '"),
            sh.ph.literal($),
            sh.ph.literal("'")
        ]))
        case 'unknown option': return _p.ss($, ($) => sh.ph.composed([
            sh.ph.literal("unknown option: '"),
            sh.ph.literal($),
            sh.ph.literal("'")
        ]))
        default: return _p.au($[0])
    }
})