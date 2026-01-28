
import * as _p from "pareto-core/dist/transformer"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/token/migrate_boilerplate"

import * as t_out from "../../../../../interface/generated/liana/schemas/token/data"
export const Relative_Location: t_signatures.Relative_Location = ($,) => ({
    'document resource identifier': _p.deprecated_cc($['document resource identifier'], ($,) => $),
    'line': _p.deprecated_cc($['line'], ($,) => $),
    'column': _p.deprecated_cc($['column'], ($,) => $),
})
export const Location: t_signatures.Location = ($,) => ({
    'relative': _p.deprecated_cc($['relative'], ($,) => Relative_Location($)),
    'absolute': _p.deprecated_cc($['absolute'], ($,) => $),
})
export const Range: t_signatures.Range = ($,) => ({
    'start': _p.deprecated_cc($['start'], ($,) => Location($)),
    'end': _p.deprecated_cc($['end'], ($,) => Location($)),
})
export const Whitespace: t_signatures.Whitespace = ($,) => ({
    'range': _p.deprecated_cc($['range'], ($,) => Range($)),
    'value': _p.deprecated_cc($['value'], ($,) => $),
})
export const Trivia: t_signatures.Trivia = ($,) => ({
    'leading whitespace': _p.deprecated_cc($['leading whitespace'], ($,) => Whitespace($)),
    'comments': _p.deprecated_cc($['comments'], ($,) => $.__l_map(($,) => ({
        'type': _p.deprecated_cc($['type'], ($,) => _p.decide.state($, ($,): t_out.Trivia.comments.L.type_ => {
            switch ($[0]) {
                case 'line':
                    return _p.ss($, ($,) => ['line', null])
                case 'block':
                    return _p.ss($, ($,) => ['block', null])
                default:
                    return _p.au($[0])
            }
        })),
        'content': _p.deprecated_cc($['content'], ($,) => $),
        'range': _p.deprecated_cc($['range'], ($,) => Range($)),
        'trailing whitespace': _p.deprecated_cc($['trailing whitespace'], ($,) => Whitespace($)),
    }))),
})
export const Delimited_Text: t_signatures.Delimited_Text = ($,) => $
export const Text_Type: t_signatures.Text_Type = ($,) => _p.decide.state($, ($,): t_out.Text_Type => {
    switch ($[0]) {
        case 'quoted':
            return _p.ss($, ($,) => ['quoted', null])
        case 'apostrophed':
            return _p.ss($, ($,) => ['apostrophed', null])
        case 'undelimited':
            return _p.ss($, ($,) => ['undelimited', null])
        case 'backticked':
            return _p.ss($, ($,) => ['backticked', null])
        default:
            return _p.au($[0])
    }
})
export const Token_Type: t_signatures.Token_Type = ($,) => _p.decide.state($, ($,): t_out.Token_Type => {
    switch ($[0]) {
        case '!':
            return _p.ss($, ($,) => ['!', null])
        case '@':
            return _p.ss($, ($,) => ['@', null])
        case ':':
            return _p.ss($, ($,) => [':', null])
        case '#':
            return _p.ss($, ($,) => ['#', null])
        case '{':
            return _p.ss($, ($,) => ['{', null])
        case '}':
            return _p.ss($, ($,) => ['}', null])
        case '[':
            return _p.ss($, ($,) => ['[', null])
        case ']':
            return _p.ss($, ($,) => [']', null])
        case '(':
            return _p.ss($, ($,) => ['(', null])
        case ')':
            return _p.ss($, ($,) => [')', null])
        case '<':
            return _p.ss($, ($,) => ['<', null])
        case '>':
            return _p.ss($, ($,) => ['>', null])
        case '~':
            return _p.ss($, ($,) => ['~', null])
        case '*':
            return _p.ss($, ($,) => ['*', null])
        case '|':
            return _p.ss($, ($,) => ['|', null])
        case 'text':
            return _p.ss($, ($,) => ['text', ({
                'value': _p.deprecated_cc($['value'], ($,) => Delimited_Text($)),
                'type': _p.deprecated_cc($['type'], ($,) => Text_Type($)),
            })])
        default:
            return _p.au($[0])
    }
})
export const Annotated_Token: t_signatures.Annotated_Token = ($,) => ({
    'start': _p.deprecated_cc($['start'], ($,) => Location($)),
    'type': _p.deprecated_cc($['type'], ($,) => Token_Type($)),
    'end': _p.deprecated_cc($['end'], ($,) => Location($)),
    'trailing trivia': _p.deprecated_cc($['trailing trivia'], ($,) => Trivia($)),
})
export const Tokenizer_Result: t_signatures.Tokenizer_Result = ($,) => ({
    'leading trivia': _p.deprecated_cc($['leading trivia'], ($,) => Trivia($)),
    'tokens': _p.deprecated_cc($['tokens'], ($,) => $.__l_map(($,) => Annotated_Token($))),
    'end': _p.deprecated_cc($['end'], ($,) => Location($)),
})
