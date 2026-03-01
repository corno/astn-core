import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_change_context from 'pareto-core/dist/_p_change_context'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"

export namespace signatures {
    export type Error = _pi.Transformer<d_in.Error, _pi.Optional_Value<d_out.Range>>
}

export const Error: signatures.Error = ($) => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'lexer': return _p.ss($, ($): _pi.Optional_Value<d_out.Range> => _p_change_context(
            _p.decide.state($, ($): d_out.Range => {
                switch ($[0]) {
                    case 'dangling slash': return _p.ss($, ($) => $.range)
                    case 'invalid unicode escape sequence': return _p.ss($, ($) => $.range)
                    case 'missing character after escape': return _p.ss($, ($) => $.range)
                    case 'unexpected control character': return _p.ss($, ($) => ({
                        'start': $.location,
                        'end': $.location
                    }))
                    case 'unexpected control character in text': return _p.ss($, ($) => $.range)
                    case 'unexpected end of line in delimited text': return _p.ss($, ($) => $.range)
                    case 'unknown escape character': return _p.ss($, ($) => $.range)
                    case 'unterminated block comment': return _p.ss($, ($) => $.range)
                    case 'unterminated text': return _p.ss($, ($) => $.range)
                    case 'unterminated unicode escape sequence': return _p.ss($, ($) => $.range)
                    default: return _p.au($[0])
                }
            }),
            ($): _pi.Optional_Value<d_out.Range> => _p.optional.literal.set($)
        ))
        case 'parser': return _p.ss($, ($) => _p.decide.state($.cause, ($) => {
            switch ($[0]) {
                case 'missing token': return _p.ss($, ($) => _p.optional.literal.not_set())
                case 'unexpected token': return _p.ss($, ($) => _p.optional.literal.set({
                    'start': $.found.start,
                    'end': $.found.end
                }))
                default: return _p.au($[0])
            }
        }))
        default: return _p.au($[0])
    }
})