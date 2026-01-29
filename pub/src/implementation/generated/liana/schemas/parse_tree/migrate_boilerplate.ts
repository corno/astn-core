
import * as _p from "pareto-core/dist/transformer"

import {
    _p_unreachable_code_path,
} from "pareto-core/dist/unreachable_code_path"

import {
    _p_cc,
} from "pareto-core/dist/change_context"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/parse_tree/migrate_boilerplate"

import * as t_out from "../../../../../interface/generated/liana/schemas/parse_tree/data"

import * as v_token from "../token/migrate_boilerplate"

import * as v_location from "../location/migrate_boilerplate"

export const Structural_Token: t_signatures.Structural_Token = ($) => ({
    'trailing trivia': _p_cc(
        $['trailing trivia'],
        ($) => v_token.Trivia(
            $
        )
    ),
    'range': _p_cc(
        $['range'],
        ($) => v_location.Range(
            $
        )
    ),
})

export const Text: t_signatures.Text = ($) => ({
    'trailing trivia': _p_cc(
        $['trailing trivia'],
        ($) => v_token.Trivia(
            $
        )
    ),
    'range': _p_cc(
        $['range'],
        ($) => v_location.Range(
            $
        )
    ),
    'value': _p_cc(
        $['value'],
        ($) => $
    ),
    'type': _p_cc(
        $['type'],
        ($) => v_token.Text_Type(
            $
        )
    ),
})

export const ID_Value_Pairs: t_signatures.ID_Value_Pairs = ($) => $.__l_map(
    ($) => ({
        'id': _p_cc(
            $['id'],
            ($) => Text(
                $
            )
        ),
        'value': _p_cc(
            $['value'],
            ($) => $.__o_map(
                ($) => ({
                    ':': _p_cc(
                        $[':'],
                        ($) => Structural_Token(
                            $
                        )
                    ),
                    'value': _p_cc(
                        $['value'],
                        ($) => Value(
                            $
                        )
                    ),
                })
            )
        ),
    })
)

export const Items: t_signatures.Items = ($) => $.__l_map(
    ($) => ({
        'value': _p_cc(
            $['value'],
            ($) => Value(
                $
            )
        ),
    })
)

export const Value: t_signatures.Value = ($) => ({
    'type': _p_cc(
        $['type'],
        ($) => _p.decide.state(
            $,
            ($): t_out.Value.type_ => {
                switch ($[0]) {
                    case 'concrete':
                        return _p.ss(
                            $,
                            ($) => ['concrete', _p.decide.state(
                                $,
                                ($): t_out.Value.type_.concrete => {
                                    switch ($[0]) {
                                        case 'dictionary':
                                            return _p.ss(
                                                $,
                                                ($) => ['dictionary', ({
                                                    '{': _p_cc(
                                                        $['{'],
                                                        ($) => Structural_Token(
                                                            $
                                                        )
                                                    ),
                                                    'entries': _p_cc(
                                                        $['entries'],
                                                        ($) => ID_Value_Pairs(
                                                            $
                                                        )
                                                    ),
                                                    '}': _p_cc(
                                                        $['}'],
                                                        ($) => Structural_Token(
                                                            $
                                                        )
                                                    ),
                                                })]
                                            )
                                        case 'group':
                                            return _p.ss(
                                                $,
                                                ($) => ['group', _p.decide.state(
                                                    $,
                                                    ($): t_out.Value.type_.concrete.group => {
                                                        switch ($[0]) {
                                                            case 'concise':
                                                                return _p.ss(
                                                                    $,
                                                                    ($) => ['concise', ({
                                                                        '<': _p_cc(
                                                                            $['<'],
                                                                            ($) => Structural_Token(
                                                                                $
                                                                            )
                                                                        ),
                                                                        'items': _p_cc(
                                                                            $['items'],
                                                                            ($) => Items(
                                                                                $
                                                                            )
                                                                        ),
                                                                        '>': _p_cc(
                                                                            $['>'],
                                                                            ($) => Structural_Token(
                                                                                $
                                                                            )
                                                                        ),
                                                                    })]
                                                                )
                                                            case 'verbose':
                                                                return _p.ss(
                                                                    $,
                                                                    ($) => ['verbose', ({
                                                                        '(': _p_cc(
                                                                            $['('],
                                                                            ($) => Structural_Token(
                                                                                $
                                                                            )
                                                                        ),
                                                                        'entries': _p_cc(
                                                                            $['entries'],
                                                                            ($) => ID_Value_Pairs(
                                                                                $
                                                                            )
                                                                        ),
                                                                        ')': _p_cc(
                                                                            $[')'],
                                                                            ($) => Structural_Token(
                                                                                $
                                                                            )
                                                                        ),
                                                                    })]
                                                                )
                                                            default:
                                                                return _p.au(
                                                                    $[0]
                                                                )
                                                        }
                                                    }
                                                )]
                                            )
                                        case 'list':
                                            return _p.ss(
                                                $,
                                                ($) => ['list', ({
                                                    '[': _p_cc(
                                                        $['['],
                                                        ($) => Structural_Token(
                                                            $
                                                        )
                                                    ),
                                                    'items': _p_cc(
                                                        $['items'],
                                                        ($) => Items(
                                                            $
                                                        )
                                                    ),
                                                    ']': _p_cc(
                                                        $[']'],
                                                        ($) => Structural_Token(
                                                            $
                                                        )
                                                    ),
                                                })]
                                            )
                                        case 'nothing':
                                            return _p.ss(
                                                $,
                                                ($) => ['nothing', ({
                                                    '~': _p_cc(
                                                        $['~'],
                                                        ($) => Structural_Token(
                                                            $
                                                        )
                                                    ),
                                                })]
                                            )
                                        case 'optional':
                                            return _p.ss(
                                                $,
                                                ($) => ['optional', _p.decide.state(
                                                    $,
                                                    ($): t_out.Value.type_.concrete.optional => {
                                                        switch ($[0]) {
                                                            case 'set':
                                                                return _p.ss(
                                                                    $,
                                                                    ($) => ['set', ({
                                                                        '*': _p_cc(
                                                                            $['*'],
                                                                            ($) => Structural_Token(
                                                                                $
                                                                            )
                                                                        ),
                                                                        'value': _p_cc(
                                                                            $['value'],
                                                                            ($) => Value(
                                                                                $
                                                                            )
                                                                        ),
                                                                    })]
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
                                                ($) => ['state', ({
                                                    '|': _p_cc(
                                                        $['|'],
                                                        ($) => Structural_Token(
                                                            $
                                                        )
                                                    ),
                                                    'status': _p_cc(
                                                        $['status'],
                                                        ($) => _p.decide.state(
                                                            $,
                                                            ($): t_out.Value.type_.concrete.state.status => {
                                                                switch ($[0]) {
                                                                    case 'missing data':
                                                                        return _p.ss(
                                                                            $,
                                                                            ($) => ['missing data', ({
                                                                                '#': _p_cc(
                                                                                    $['#'],
                                                                                    ($) => Structural_Token(
                                                                                        $
                                                                                    )
                                                                                ),
                                                                            })]
                                                                        )
                                                                    case 'set':
                                                                        return _p.ss(
                                                                            $,
                                                                            ($) => ['set', ({
                                                                                'option': _p_cc(
                                                                                    $['option'],
                                                                                    ($) => Text(
                                                                                        $
                                                                                    )
                                                                                ),
                                                                                'value': _p_cc(
                                                                                    $['value'],
                                                                                    ($) => Value(
                                                                                        $
                                                                                    )
                                                                                ),
                                                                            })]
                                                                        )
                                                                    default:
                                                                        return _p.au(
                                                                            $[0]
                                                                        )
                                                                }
                                                            }
                                                        )
                                                    ),
                                                })]
                                            )
                                        case 'text':
                                            return _p.ss(
                                                $,
                                                ($) => ['text', Text(
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
                    case 'include':
                        return _p.ss(
                            $,
                            ($) => ['include', ({
                                '@': _p_cc(
                                    $['@'],
                                    ($) => Structural_Token(
                                        $
                                    )
                                ),
                                'path': _p_cc(
                                    $['path'],
                                    ($) => Text(
                                        $
                                    )
                                ),
                            })]
                        )
                    case 'missing data':
                        return _p.ss(
                            $,
                            ($) => ['missing data', ({
                                '#': _p_cc(
                                    $['#'],
                                    ($) => Structural_Token(
                                        $
                                    )
                                ),
                            })]
                        )
                    default:
                        return _p.au(
                            $[0]
                        )
                }
            }
        )
    ),
})

export const Content: t_signatures.Content = ($) => Value(
    $
)

export const Document: t_signatures.Document = ($) => ({
    'header': _p_cc(
        $['header'],
        ($) => $.__o_map(
            ($) => ({
                '!': _p_cc(
                    $['!'],
                    ($) => Structural_Token(
                        $
                    )
                ),
                'value': _p_cc(
                    $['value'],
                    ($) => Value(
                        $
                    )
                ),
            })
        )
    ),
    'content': _p_cc(
        $['content'],
        ($) => Content(
            $
        )
    ),
})
