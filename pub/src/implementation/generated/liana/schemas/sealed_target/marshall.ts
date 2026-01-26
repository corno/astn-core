
import * as _p from "pareto-core/dist/transformer"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/sealed_target/marshall"

import * as t_out from "astn-core/dist/interface/generated/liana/schemas/sealed_target/data"

import * as v_serialize_number from "liana-core/dist/implementation/manual/primitives/integer/serializers/decimal"

import * as v_serialize_boolean from "liana-core/dist/implementation/manual/primitives/boolean/serializers/true_false"
export const Value: t_signatures.Value = ($,) => ['state', _p.decide.state($, ($,): t_out.Value.state => {
    switch ($[0]) {
        case 'list':
            return _p.ss($, ($,) => ({
                'option': "list",
                'value': ['list', $.__l_map(($,) => Value($))],
            }))
        case 'dictionary':
            return _p.ss($, ($,) => ({
                'option': "dictionary",
                'value': ['dictionary', $.__d_map(($,key,) => Value($))],
            }))
        case 'group':
            return _p.ss($, ($,) => ({
                'option': "group",
                'value': ['state', _p.decide.state($, ($,): t_out.Value.state => {
                    switch ($[0]) {
                        case 'verbose':
                            return _p.ss($, ($,) => ({
                                'option': "verbose",
                                'value': ['dictionary', $.__d_map(($,key,) => Value($))],
                            }))
                        default:
                            return _p.au($[0])
                    }
                })],
            }))
        case 'nothing':
            return _p.ss($, ($,) => ({
                'option': "nothing",
                'value': ['nothing', null],
            }))
        case 'optional':
            return _p.ss($, ($,) => ({
                'option': "optional",
                'value': ['state', _p.decide.state($, ($,): t_out.Value.state => {
                    switch ($[0]) {
                        case 'not set':
                            return _p.ss($, ($,) => ({
                                'option': "not set",
                                'value': ['nothing', null],
                            }))
                        case 'set':
                            return _p.ss($, ($,) => ({
                                'option': "set",
                                'value': Value($),
                            }))
                        default:
                            return _p.au($[0])
                    }
                })],
            }))
        case 'state':
            return _p.ss($, ($,) => ({
                'option': "state",
                'value': ['group', ['verbose', _p.dictionary.literal(({
                    'option': _p.deprecated_cc($['option'], ($,) => ['text', ({
                        'delimiter': ['quote', null],
                        'value': $,
                    })]),
                    'value': _p.deprecated_cc($['value'], ($,) => Value($)),
                }))]],
            }))
        case 'text':
            return _p.ss($, ($,) => ({
                'option': "text",
                'value': ['group', ['verbose', _p.dictionary.literal(({
                    'value': _p.deprecated_cc($['value'], ($,) => ['text', ({
                        'delimiter': ['quote', null],
                        'value': $,
                    })]),
                    'delimiter': _p.deprecated_cc($['delimiter'], ($,) => ['state', _p.decide.state($, ($,): t_out.Value.state => {
                        switch ($[0]) {
                            case 'none':
                                return _p.ss($, ($,) => ({
                                    'option': "none",
                                    'value': ['nothing', null],
                                }))
                            case 'quote':
                                return _p.ss($, ($,) => ({
                                    'option': "quote",
                                    'value': ['nothing', null],
                                }))
                            case 'backtick':
                                return _p.ss($, ($,) => ({
                                    'option': "backtick",
                                    'value': ['nothing', null],
                                }))
                            default:
                                return _p.au($[0])
                        }
                    })]),
                }))]],
            }))
        default:
            return _p.au($[0])
    }
})]
export const Document: t_signatures.Document = ($,) => Value($)
