import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'


import * as d_in from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/location/data"

export type Value = _pi.Transformer<d_in.Value, d_out.Range>
export type Concrete_Value = _pi.Transformer<d_in.Value.type_.concrete, d_out.Range>
export type ID_Value_Pair = _pi.Transformer<d_in.ID_Value_Pairs.L, d_out.Range>
export type State = _pi.Transformer<d_in.Value.type_.concrete.state, d_out.Range>
export type List = _pi.Transformer<d_in.Value.type_.concrete.list, d_out.Range>
export type Dictionary = _pi.Transformer<d_in.Value.type_.concrete.dictionary, d_out.Range>
export type Group = _pi.Transformer<d_in.Value.type_.concrete.group, d_out.Range>
export type Optional = _pi.Transformer<d_in.Value.type_.concrete.optional, d_out.Range>


export const Concrete_Value: Concrete_Value = ($) => _p.decide.state($, ($) => _p.decide.state($, ($): d_out.Range => {
    switch ($[0]) {
        case 'dictionary': return _p.ss($, ($) => Dictionary($))

        case 'group': return _p.ss($, ($) => Group($))
        case 'list': return _p.ss($, ($) => List($))
        case 'nothing': return _p.ss($, ($) => $['~'].range)
        case 'optional': return _p.ss($, ($) => Optional($))
        case 'state': return _p.ss($, ($) => State($))
        case 'text': return _p.ss($, ($) => $.range)
        default: return _p.au($[0])
    }
}))

export const Dictionary: Dictionary = ($) => ({
    'start': $['{'].range.start,
    'end': $['}'].range.end
})

export const Group: Group = ($) => _p.decide.state($, ($) => {
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
})

export const List: List = ($) => ({
    'start': $['['].range.start,
    'end': $[']'].range.end
})

export const Optional: Optional = ($) => _p.decide.state($, ($) => {
    switch ($[0]) {
        case 'set': return _p.ss($, ($) => ({
            'start': $['*'].range.start,
            'end': Value($['value']).end
        }))
        case 'not set': return _p.ss($, ($) => $['_'].range)
        default: return _p.au($[0])
    }
})

export const State: State = ($) => ({
    'start': $['|'].range.start,
    'end': _p.decide.state($.status, ($) => {
        switch ($[0]) {
            case 'missing': return _p.ss($, ($) => $['#'].range.end)
            case 'set': return _p.ss($, ($) => Value($['value']).end)
            default: return _p.au($[0])
        }
    })
})

export const Value: Value = ($) => _p.decide.state($.type, ($): d_out.Range => {
    switch ($[0]) {
        case 'concrete': return _p.ss($, ($) => Concrete_Value($))
        case 'include': return _p.ss($, ($) => ({
            'start': $['@'].range.start,
            'end': $.path.range.end
        }))
        case 'missing': return _p.ss($, ($) => ($['#'].range))
        default: return _p.au($[0])
    }
})

export const ID_Value_Pair: ID_Value_Pair = ($) => ({
    'start': $.id.range.start,
    'end': $.assignment.__decide(
        ($) => $.value.__decide(
            ($) => Value($).end,
            () => $[':'].range.end
        ),
        () => $.id.range.end
    )
})