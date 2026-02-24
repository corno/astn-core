import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'


import * as d_in from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"

export type Value = _pi.Transformer<d_in.Value, d_out.Range>
export type Concrete_Value = _pi.Transformer<d_in.Value.type_.concrete, d_out.Range>


export const Concrete_Value: Concrete_Value = ($) => _p.decide.state($, ($) => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'dictionary': return _p.ss($, ($) => ({
            'start': $['{'].range.start,
            'end': $['}'].range.end
        }))

        case 'group': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'concise': return _p.ss($, ($) => ({
                    'start': $['<'].range.start,
                    'end': $['>'].range.end
                }))
                case 'verbose': return _p.ss($, ($) => ({
                    'start': $['('].range.start,
                    'end': $[')'].range.end
                }))
                default: return _p.au($[0])
            }
        }))
        case 'list': return _p.ss($, ($) => ({
            'start': $['['].range.start,
            'end': $[']'].range.end
        }))
        case 'nothing': return _p.ss($, ($) => $['~'].range)
        case 'optional': return _p.ss($, ($) => _p.decide.state($, ($) => {
            switch ($[0]) {
                case 'set': return _p.ss($, ($) => ({
                    'start': $['*'].range.start,
                    'end': Value($['value']).end
                }))

                default: return _p.au($[0])
            }
        }))
        case 'state': return _p.ss($, ($) => ({
            'start': $['|'].range.start,
            'end': _p.decide.state($.status, ($) => {
                switch ($[0]) {
                    case 'missing data': return _p.ss($, ($) => $['#'].range.end)
                    case 'set': return _p.ss($, ($) => Value($['value']).end)
                    default: return _p.au($[0])
                }
            })
        }))
        case 'text': return _p.ss($, ($) => $.range)

        default: return _p.au($[0])
    }
}))

export const Value: Value = ($) => _p.decide.state($.type, ($) => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => Concrete_Value($))
        case 'include': return _p.ss($, ($) => ({
            'start': $['@'].range.start,
            'end': $.path.range.end
        }))
        case 'missing data': return _p.ss($, ($) => $['#'].range)
        default: return _p.au($[0])
    }
})