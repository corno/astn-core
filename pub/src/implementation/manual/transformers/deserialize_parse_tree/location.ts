import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_change_context from 'pareto-core/dist/_p_change_context'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'

export namespace signatures {
    export type Error = _pi.Transformer<d_in.Error, d_out.Possible_Range>
}

export const Error: signatures.Error = ($) => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'lexer': return _p.ss($, ($): d_out.Possible_Range => ['range', $.range])
        case 'parser': return _p.ss($, ($):d_out.Possible_Range => _p.decide.state($.cause, ($) => {
            switch ($[0]) {
                case 'missing token': return _p.ss($, ($) => _p_unreachable_code_path("this is not unreachable, needs implementation; how to get location info (at least the document resource identifier) for this error?"))
                case 'unexpected token': return _p.ss($, ($): d_out.Possible_Range => ['range', {
                    'start': $.found.start,
                    'end': $.found.end,
                }])
                default: return _p.au($[0])
            }
        }))
        default: return _p.au($[0])
    }
})