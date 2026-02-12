import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

import * as d_in from "../../../../interface/generated/liana/schemas/sealed_target/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_loc from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

import * as sh from "pareto-fountain-pen/dist/shorthands/prose"

const s_escaped = (
    $: string,
): d_loc.List_of_Characters => _p.list.from.list(
    _p_list_from_text($, ($) => $),
).flatten(
    ($): _pi.List<number> => {
        switch ($) {
            case 0x2F: // slash (\/)
                return _p.list.literal([
                    0x5c, // \
                    0x2f, // /
                ])
            case 0x22: // " (\")
                return _p.list.literal([
                    0x5C, // \
                    0x22, // "
                ])
            case 0x5C: // \ (\\)
                return _p.list.literal([
                    0x5C, // \
                    0x5C, // \
                ])
            case 0x08: // backspace (\b)
                return _p.list.literal([
                    0x5C, // \
                    0x62, // b
                ])
            case 0x0C: // form feed (\f)
                return _p.list.literal([
                    0x5C, // \
                    0x66, // f
                ])
            case 0x0A: // line feed (\n)
                return _p.list.literal([
                    0x5C, // \
                    0x6E, // n
                ])
            case 0x0D: // carriage return (\r)
                return _p.list.literal([
                    0x5C, // \
                    0x72, // r
                ])
            case 0x09: // horizontal tab (\t)
                return _p.list.literal([
                    0x5C, // \
                    0x74, // t
                ])
            case 0x0B: // vertical tab (\v)
                return _p.list.literal([
                    0x5C, // \
                    0x76, // v
                ])
            default: {
                return _p.list.literal([
                    $,
                ])
            }
        }
    }
)

const s_quoted: _pi.Transformer_With_Parameter<string, d_loc.List_of_Characters, {
    'add delimiters': boolean
}> = ($, $p) => $p['add delimiters']
    ? _p.list.nested_literal_old([
        [
            0x22, // "
        ],
        s_escaped(
            $,
        ),
        [
            0x22, // "
        ]
    ])
    : s_escaped($)

const s_apostrophed: _pi.Transformer_With_Parameter<string, d_loc.List_of_Characters, {
    'add delimiters': boolean
}> = ($, $p) => $p['add delimiters']
    ? _p.list.nested_literal_old([
        [
            0x27, // '
        ],
        s_escaped(
            $,
        ),
        [
            0x27, // '
        ]
    ])
    : s_escaped($)

const s_backticked: _pi.Transformer_With_Parameter<string, d_loc.List_of_Characters, {
    'add delimiters': boolean
}> = ($, $p) => $p['add delimiters']
    ? _p.list.nested_literal_old([
        [
            0x60, // `
        ],
        s_escaped(
            $,
        ),
        [
            0x60, // `
        ]
    ])
    : s_escaped($)

export const Value = (
    $: d_in.Value,
): d_out.Phrase => sh.ph.composed([
    _p.decide.state($, ($) => {
        switch ($[0]) {
            case 'dictionary': return _p.ss($, ($) => sh.ph.composed([
                sh.ph.literal("{"),
                sh.ph.indent(
                    sh.pg.sentences(_p.list.from.dictionary($).convert(($, id) => sh.sentence([
                        sh.ph.serialize(s_backticked(id, {
                            'add delimiters': true
                        })),
                        sh.ph.literal(": "),
                        Value($),
                    ]))),
                ),
                sh.ph.literal("}"),
            ]))
            case 'group': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'verbose': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.composed([
                            sh.ph.literal("("),
                            sh.ph.indent(
                                sh.pg.sentences($.__to_list(($, id) => sh.sentence([
                                    sh.ph.serialize(s_apostrophed(id, {
                                        'add delimiters': true
                                    })),
                                    sh.ph.literal(": "),
                                    Value($),
                                ]))),
                            ),
                            sh.ph.literal(")"),
                        ])
                    ]))
                    default: return _p.au($[0])
                }
            }))
            case 'list': return _p.ss($, ($) => sh.ph.composed([
                sh.ph.literal("["),
                sh.ph.composed($.__l_map(($) => sh.ph.composed([
                    sh.ph.literal(" "),
                    Value($),
                ]))),
                sh.ph.literal(" ]"),
            ]))
            case 'nothing': return _p.ss($, ($) => sh.ph.literal("~"))
            case 'optional': return _p.ss($, ($) => _p.decide.state($, ($) => {
                switch ($[0]) {
                    case 'not set': return _p.ss($, ($) => sh.ph.literal("~"))
                    case 'set': return _p.ss($, ($) => sh.ph.composed([
                        sh.ph.literal("* "),
                        Value($),
                    ]))

                    default: return _p.au($[0])
                }
            }))
            case 'state': return _p.ss($, ($) => sh.ph.composed([
                sh.ph.literal("| "),
                sh.ph.serialize(s_apostrophed($.option, {
                    'add delimiters': true
                })),
                sh.ph.literal(" "),
                Value($.value),
            ]))
            case 'text': return _p.ss($, ($) => {
                const value = $.value
                return _p.decide.state($.delimiter, ($) => {
                    switch ($[0]) {
                        case 'backtick': return _p.ss($, ($) => sh.ph.serialize(s_backticked(value, {
                            'add delimiters': true
                        })))
                        case 'quote': return _p.ss($, ($) => sh.ph.serialize(s_quoted(value, {
                            'add delimiters': true
                        })))
                        case 'none': return _p.ss($, ($) => sh.ph.literal(value))
                        default: return _p.au($[0])
                    }
                })
            })
            default: return _p.au($[0])
        }
    })
])

export const Document = (
    $: d_in.Document

): d_out.Paragraph => sh.pg.sentences([
    sh.sentence([
        Value($),
    ])
])