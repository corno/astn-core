    
    import * as _p from "pareto-core/dist/expression"
    
    import _p_change_context from "pareto-core/dist/_p_change_context"
    
    import * as t_signatures from "../../../../../../interface/generated/liana/schemas/token/boilerplate_for_migrate"
    
    import * as t_out from "../../../../../../interface/generated/liana/schemas/token/data"
    
    import * as v_location from "../../location/transformers/boilerplate_for_migrate"
    
    export const Tokenizer_Result: t_signatures.Tokenizer_Result = ($) => ({
        'leading trivia': _p_change_context(
            $['leading trivia'],
            ($) => Trivia(
                $,
            ),
        ),
        'tokens': _p_change_context(
            $['tokens'],
            ($) => _p.list.map(
                $,
                ($) => Annotated_Token(
                    $,
                ),
            ),
        ),
        'end': _p_change_context(
            $['end'],
            ($) => v_location.Location(
                $,
            ),
        ),
    })
    
    export const Annotated_Token: t_signatures.Annotated_Token = ($) => ({
        'start': _p_change_context(
            $['start'],
            ($) => v_location.Location(
                $,
            ),
        ),
        'type': _p_change_context(
            $['type'],
            ($) => Token_Type(
                $,
            ),
        ),
        'end': _p_change_context(
            $['end'],
            ($) => v_location.Location(
                $,
            ),
        ),
        'trailing trivia': _p_change_context(
            $['trailing trivia'],
            ($) => Trivia(
                $,
            ),
        ),
    })
    
    export const Token_Type: t_signatures.Token_Type = ($) => _p.decide.state(
        $,
        ($): t_out.Token_Type => {
            switch ($[0]) {
                case '!':
                    return _p.ss(
                        $,
                        ($) => ['!', null],
                    )
                case '@':
                    return _p.ss(
                        $,
                        ($) => ['@', null],
                    )
                case ':':
                    return _p.ss(
                        $,
                        ($) => [':', null],
                    )
                case '#':
                    return _p.ss(
                        $,
                        ($) => ['#', null],
                    )
                case '{':
                    return _p.ss(
                        $,
                        ($) => ['{', null],
                    )
                case '}':
                    return _p.ss(
                        $,
                        ($) => ['}', null],
                    )
                case '[':
                    return _p.ss(
                        $,
                        ($) => ['[', null],
                    )
                case ']':
                    return _p.ss(
                        $,
                        ($) => [']', null],
                    )
                case '(':
                    return _p.ss(
                        $,
                        ($) => ['(', null],
                    )
                case ')':
                    return _p.ss(
                        $,
                        ($) => [')', null],
                    )
                case '<':
                    return _p.ss(
                        $,
                        ($) => ['<', null],
                    )
                case '>':
                    return _p.ss(
                        $,
                        ($) => ['>', null],
                    )
                case '~':
                    return _p.ss(
                        $,
                        ($) => ['~', null],
                    )
                case '*':
                    return _p.ss(
                        $,
                        ($) => ['*', null],
                    )
                case '|':
                    return _p.ss(
                        $,
                        ($) => ['|', null],
                    )
                case 'text':
                    return _p.ss(
                        $,
                        ($) => ['text', {
                            'value': _p_change_context(
                                $['value'],
                                ($) => Delimited_Text(
                                    $,
                                ),
                            ),
                            'type': _p_change_context(
                                $['type'],
                                ($) => Text_Type(
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
    )
    
    export const Delimited_Text: t_signatures.Delimited_Text = ($) => $
    
    export const Whitespace: t_signatures.Whitespace = ($) => ({
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
    })
    
    export const Trivia: t_signatures.Trivia = ($) => ({
        'leading whitespace': _p_change_context(
            $['leading whitespace'],
            ($) => Whitespace(
                $,
            ),
        ),
        'comments': _p_change_context(
            $['comments'],
            ($) => _p.list.map(
                $,
                ($) => ({
                    'type': _p_change_context(
                        $['type'],
                        ($) => _p.decide.state(
                            $,
                            ($): t_out.Trivia.comments.L.type_ => {
                                switch ($[0]) {
                                    case 'line':
                                        return _p.ss(
                                            $,
                                            ($) => ['line', null],
                                        )
                                    case 'block':
                                        return _p.ss(
                                            $,
                                            ($) => ['block', null],
                                        )
                                    default:
                                        return _p.au(
                                            $[0],
                                        )
                                }
                            },
                        ),
                    ),
                    'content': _p_change_context(
                        $['content'],
                        ($) => $,
                    ),
                    'range': _p_change_context(
                        $['range'],
                        ($) => v_location.Range(
                            $,
                        ),
                    ),
                    'trailing whitespace': _p_change_context(
                        $['trailing whitespace'],
                        ($) => Whitespace(
                            $,
                        ),
                    ),
                }),
            ),
        ),
    })
    
    export const Text_Type: t_signatures.Text_Type = ($) => _p.decide.state(
        $,
        ($): t_out.Text_Type => {
            switch ($[0]) {
                case 'quoted':
                    return _p.ss(
                        $,
                        ($) => ['quoted', null],
                    )
                case 'apostrophed':
                    return _p.ss(
                        $,
                        ($) => ['apostrophed', null],
                    )
                case 'undelimited':
                    return _p.ss(
                        $,
                        ($) => ['undelimited', null],
                    )
                case 'backticked':
                    return _p.ss(
                        $,
                        ($) => ['backticked', null],
                    )
                default:
                    return _p.au(
                        $[0],
                    )
            }
        },
    )
