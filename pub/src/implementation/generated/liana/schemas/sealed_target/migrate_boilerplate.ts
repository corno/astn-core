
import * as _p from "pareto-core/dist/transformer"

import {
    _p_cc,
} from "pareto-core/dist/change_context"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/sealed_target/migrate_boilerplate"

import * as t_out from "../../../../../interface/generated/liana/schemas/sealed_target/data"

export const Document: t_signatures.Document = ($) => Value(
    $
)

export const Value: t_signatures.Value = ($) => _p.decide.state(
    $,
    ($): t_out.Value => {
        switch ($[0]) {
            case 'list':
                return _p.ss(
                    $,
                    ($) => ['list', _p.list.map(
                        $,
                        ($) => Value(
                            $
                        )
                    )]
                )
            case 'dictionary':
                return _p.ss(
                    $,
                    ($) => ['dictionary', _p.dictionary.map(
                        $,
                        ($, id) => Value(
                            $
                        )
                    )]
                )
            case 'group':
                return _p.ss(
                    $,
                    ($) => ['group', _p.decide.state(
                        $,
                        ($): t_out.Value.group => {
                            switch ($[0]) {
                                case 'verbose':
                                    return _p.ss(
                                        $,
                                        ($) => ['verbose', _p.dictionary.map(
                                            $,
                                            ($, id) => Value(
                                                $
                                            )
                                        )]
                                    )
                                default:
                                    return _p.au(
                                        $[0]
                                    )
                            }
                        }
                    )]
                )
            case 'nothing':
                return _p.ss(
                    $,
                    ($) => ['nothing', null]
                )
            case 'optional':
                return _p.ss(
                    $,
                    ($) => ['optional', _p.decide.state(
                        $,
                        ($): t_out.Value.optional => {
                            switch ($[0]) {
                                case 'not set':
                                    return _p.ss(
                                        $,
                                        ($) => ['not set', null]
                                    )
                                case 'set':
                                    return _p.ss(
                                        $,
                                        ($) => ['set', Value(
                                            $
                                        )]
                                    )
                                default:
                                    return _p.au(
                                        $[0]
                                    )
                            }
                        }
                    )]
                )
            case 'state':
                return _p.ss(
                    $,
                    ($) => ['state', {
                        'option': _p_cc(
                            $['option'],
                            ($) => $
                        ),
                        'value': _p_cc(
                            $['value'],
                            ($) => Value(
                                $
                            )
                        ),
                    }]
                )
            case 'text':
                return _p.ss(
                    $,
                    ($) => ['text', {
                        'value': _p_cc(
                            $['value'],
                            ($) => $
                        ),
                        'delimiter': _p_cc(
                            $['delimiter'],
                            ($) => _p.decide.state(
                                $,
                                ($): t_out.Value.text.delimiter => {
                                    switch ($[0]) {
                                        case 'none':
                                            return _p.ss(
                                                $,
                                                ($) => ['none', null]
                                            )
                                        case 'quote':
                                            return _p.ss(
                                                $,
                                                ($) => ['quote', null]
                                            )
                                        case 'backtick':
                                            return _p.ss(
                                                $,
                                                ($) => ['backtick', null]
                                            )
                                        default:
                                            return _p.au(
                                                $[0]
                                            )
                                    }
                                }
                            )
                        ),
                    }]
                )
            default:
                return _p.au(
                    $[0]
                )
        }
    }
)
