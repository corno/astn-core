    
    import * as _p from "pareto-core/dist/expression"
    
    import _p_change_context from "pareto-core/dist/_p_change_context"
    
    import * as t_signatures from "../../../../../../interface/generated/liana/schemas/parse_tree/boilerplate_for_migrate"
    
    import * as t_out from "../../../../../../interface/generated/liana/schemas/parse_tree/data"
    
    import * as v_token from "../../token/transformers/boilerplate_for_migrate"
    
    import * as v_location from "../../location/transformers/boilerplate_for_migrate"
    
    export const Document: t_signatures.Document = ($) => ({
        'header': _p_change_context(
            $['header'],
            ($) => _p.optional.map(
                $,
                ($) => ({
                    '!': _p_change_context(
                        $['!'],
                        ($) => Structural_Token(
                            $,
                        ),
                    ),
                    'value': _p_change_context(
                        $['value'],
                        ($) => Value(
                            $,
                        ),
                    ),
                }),
            ),
        ),
        'content': _p_change_context(
            $['content'],
            ($) => Content(
                $,
            ),
        ),
    })
    
    export const Content: t_signatures.Content = ($) => Value(
        $,
    )
    
    export const Value: t_signatures.Value = ($) => ({
        'type': _p_change_context(
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
                                                    ($) => ['dictionary', {
                                                        '{': _p_change_context(
                                                            $['{'],
                                                            ($) => Structural_Token(
                                                                $,
                                                            ),
                                                        ),
                                                        'entries': _p_change_context(
                                                            $['entries'],
                                                            ($) => ID_Value_Pairs(
                                                                $,
                                                            ),
                                                        ),
                                                        '}': _p_change_context(
                                                            $['}'],
                                                            ($) => Structural_Token(
                                                                $,
                                                            ),
                                                        ),
                                                    }],
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
                                                                        ($) => ['concise', {
                                                                            '<': _p_change_context(
                                                                                $['<'],
                                                                                ($) => Structural_Token(
                                                                                    $,
                                                                                ),
                                                                            ),
                                                                            'items': _p_change_context(
                                                                                $['items'],
                                                                                ($) => Items(
                                                                                    $,
                                                                                ),
                                                                            ),
                                                                            '>': _p_change_context(
                                                                                $['>'],
                                                                                ($) => Structural_Token(
                                                                                    $,
                                                                                ),
                                                                            ),
                                                                        }],
                                                                    )
                                                                case 'verbose':
                                                                    return _p.ss(
                                                                        $,
                                                                        ($) => ['verbose', {
                                                                            '(': _p_change_context(
                                                                                $['('],
                                                                                ($) => Structural_Token(
                                                                                    $,
                                                                                ),
                                                                            ),
                                                                            'entries': _p_change_context(
                                                                                $['entries'],
                                                                                ($) => ID_Value_Pairs(
                                                                                    $,
                                                                                ),
                                                                            ),
                                                                            ')': _p_change_context(
                                                                                $[')'],
                                                                                ($) => Structural_Token(
                                                                                    $,
                                                                                ),
                                                                            ),
                                                                        }],
                                                                    )
                                                                default:
                                                                    return _p.au(
                                                                        $[0],
                                                                    )
                                                            }
                                                        },
                                                    )],
                                                )
                                            case 'list':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['list', {
                                                        '[': _p_change_context(
                                                            $['['],
                                                            ($) => Structural_Token(
                                                                $,
                                                            ),
                                                        ),
                                                        'items': _p_change_context(
                                                            $['items'],
                                                            ($) => Items(
                                                                $,
                                                            ),
                                                        ),
                                                        ']': _p_change_context(
                                                            $[']'],
                                                            ($) => Structural_Token(
                                                                $,
                                                            ),
                                                        ),
                                                    }],
                                                )
                                            case 'nothing':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['nothing', {
                                                        '~': _p_change_context(
                                                            $['~'],
                                                            ($) => Structural_Token(
                                                                $,
                                                            ),
                                                        ),
                                                    }],
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
                                                                        ($) => ['set', {
                                                                            '*': _p_change_context(
                                                                                $['*'],
                                                                                ($) => Structural_Token(
                                                                                    $,
                                                                                ),
                                                                            ),
                                                                            'value': _p_change_context(
                                                                                $['value'],
                                                                                ($) => Value(
                                                                                    $,
                                                                                ),
                                                                            ),
                                                                        }],
                                                                    )
                                                                default:
                                                                    return _p.au(
                                                                        $[0],
                                                                    )
                                                            }
                                                        },
                                                    )],
                                                )
                                            case 'state':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['state', {
                                                        '|': _p_change_context(
                                                            $['|'],
                                                            ($) => Structural_Token(
                                                                $,
                                                            ),
                                                        ),
                                                        'status': _p_change_context(
                                                            $['status'],
                                                            ($) => _p.decide.state(
                                                                $,
                                                                ($): t_out.Value.type_.concrete.state.status => {
                                                                    switch ($[0]) {
                                                                        case 'missing data':
                                                                            return _p.ss(
                                                                                $,
                                                                                ($) => ['missing data', {
                                                                                    '#': _p_change_context(
                                                                                        $['#'],
                                                                                        ($) => Structural_Token(
                                                                                            $,
                                                                                        ),
                                                                                    ),
                                                                                }],
                                                                            )
                                                                        case 'set':
                                                                            return _p.ss(
                                                                                $,
                                                                                ($) => ['set', {
                                                                                    'option': _p_change_context(
                                                                                        $['option'],
                                                                                        ($) => Text(
                                                                                            $,
                                                                                        ),
                                                                                    ),
                                                                                    'value': _p_change_context(
                                                                                        $['value'],
                                                                                        ($) => Value(
                                                                                            $,
                                                                                        ),
                                                                                    ),
                                                                                }],
                                                                            )
                                                                        default:
                                                                            return _p.au(
                                                                                $[0],
                                                                            )
                                                                    }
                                                                },
                                                            ),
                                                        ),
                                                    }],
                                                )
                                            case 'text':
                                                return _p.ss(
                                                    $,
                                                    ($) => ['text', Text(
                                                        $,
                                                    )],
                                                )
                                            default:
                                                return _p.au(
                                                    $[0],
                                                )
                                        }
                                    },
                                )],
                            )
                        case 'include':
                            return _p.ss(
                                $,
                                ($) => ['include', {
                                    '@': _p_change_context(
                                        $['@'],
                                        ($) => Structural_Token(
                                            $,
                                        ),
                                    ),
                                    'path': _p_change_context(
                                        $['path'],
                                        ($) => Text(
                                            $,
                                        ),
                                    ),
                                }],
                            )
                        case 'missing data':
                            return _p.ss(
                                $,
                                ($) => ['missing data', {
                                    '#': _p_change_context(
                                        $['#'],
                                        ($) => Structural_Token(
                                            $,
                                        ),
                                    ),
                                }],
                            )
                        default:
                            return _p.au(
                                $[0],
                            )
                    }
                },
            ),
        ),
    })
    
    export const Structural_Token: t_signatures.Structural_Token = ($) => ({
        'trailing trivia': _p_change_context(
            $['trailing trivia'],
            ($) => v_token.Trivia(
                $,
            ),
        ),
        'range': _p_change_context(
            $['range'],
            ($) => v_location.Range(
                $,
            ),
        ),
    })
    
    export const Text: t_signatures.Text = ($) => ({
        'trailing trivia': _p_change_context(
            $['trailing trivia'],
            ($) => v_token.Trivia(
                $,
            ),
        ),
        'range': _p_change_context(
            $['range'],
            ($) => v_location.Range(
                $,
            ),
        ),
        'value': _p_change_context(
            $['value'],
            ($) => $,
        ),
        'type': _p_change_context(
            $['type'],
            ($) => v_token.Text_Type(
                $,
            ),
        ),
    })
    
    export const ID_Value_Pairs: t_signatures.ID_Value_Pairs = ($) => _p.list.map(
        $,
        ($) => ({
            'id': _p_change_context(
                $['id'],
                ($) => Text(
                    $,
                ),
            ),
            'value': _p_change_context(
                $['value'],
                ($) => _p.optional.map(
                    $,
                    ($) => ({
                        ':': _p_change_context(
                            $[':'],
                            ($) => Structural_Token(
                                $,
                            ),
                        ),
                        'value': _p_change_context(
                            $['value'],
                            ($) => Value(
                                $,
                            ),
                        ),
                    }),
                ),
            ),
        }),
    )
    
    export const Items: t_signatures.Items = ($) => _p.list.map(
        $,
        ($) => ({
            'value': _p_change_context(
                $['value'],
                ($) => Value(
                    $,
                ),
            ),
        }),
    )
