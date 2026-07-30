import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../schemas/sealed_target.js"
import type * as s_out from "../../../schemas/paragraph.js"

namespace declarations {
    export type Document = p_.Transformer<
        s_in.Document,
        s_out.Paragraph
    >
    export type Value = p_.Transformer<
        s_in.Value,
        s_out.Phrase
    >
}

//dependencies
import * as ser_primitives from "../../serializers/primitives.js"

//shorthands
import * as sh from "pareto-fountain-pen/modules/paragraph/shorthands/deprecated"

export const Document: declarations.Document = ($) => sh.pg.sentences([sh.sentence([Value($)])])

export const Value: declarations.Value = ($) => sh.ph.composed([
    p_.from.state($).decide(
        ($): s_out.Phrase => {
            switch ($[0]) {
                case 'dictionary': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("{"),
                    sh.ph.indent(
                        sh.pg.sentences(p_.from.dictionary($).convert_to_list(
                            ($, id) => sh.sentence(
                                p_.literal.list([
                                    sh.ph.text(
                                        ser_primitives.Apostrophed(
                                            id,
                                            {
                                                'add delimiters': true
                                            }
                                        )
                                    ),
                                    sh.ph.text(": "),
                                    Value($),
                                ])))
                        ),
                    ),
                    sh.ph.text("}"),
                ]))
                case 'group': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'verbose': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.composed([
                                    sh.ph.text("("),
                                    sh.ph.indent(
                                        sh.pg.sentences(p_.from.dictionary($).convert_to_list(
                                            ($, id) => sh.sentence(
                                                p_.literal.list([
                                                    sh.ph.text(
                                                        ser_primitives.Backticked(id, {
                                                            'add delimiters': true
                                                        })
                                                    ),
                                                    sh.ph.text(": "),
                                                    Value($),
                                                ])))
                                        ),
                                    ),
                                    sh.ph.text(")"),
                                ])
                            ]))
                            default: return p_.exhaustive($[0])
                        }
                    }))
                case 'list': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("["),
                    sh.ph.composed(p_.from.list($).map(
                        ($) => sh.ph.composed([
                            sh.ph.text(" "),
                            Value($),
                        ]))),
                    sh.ph.text(" ]"),
                ]))
                case 'nothing': return p_.option($, ($) => sh.ph.text("~"))
                case 'optional': return p_.option($, ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'not set': return p_.option($, ($) => sh.ph.text("_"))
                            case 'set': return p_.option($, ($) => sh.ph.composed([
                                sh.ph.text("* "),
                                Value($),
                            ]))

                            default: return p_.exhaustive($[0])
                        }
                    }
                ))
                case 'reference': return p_.option($, ($) => {
                    const value = $.value
                    return sh.ph.text(
                        ser_primitives.Apostrophed(
                            value,
                            {
                                'add delimiters': true
                            }
                        )
                    )
                })
                case 'state': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("| "),
                    sh.ph.text(
                        ser_primitives.Backticked(
                            $.option,
                            {
                                'add delimiters': true
                            }
                        )
                    ),
                    sh.ph.text(" "),
                    Value($.value),
                ]))
                case 'text': return p_.option($, ($) => {
                    const value = $.value
                    return p_.from.state($.delimiter).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'quote': return p_.option($, ($) => sh.ph.text(
                                    ser_primitives.Quoted(
                                        value,
                                        {
                                            'add delimiters': true
                                        }
                                    )
                                ))
                                case 'none': return p_.option($, ($) => sh.ph.text(
                                    ser_primitives.Undelimited(
                                        value
                                    )
                                ))
                                default: return p_.exhaustive($[0])
                            }
                        })
                })
                default: return p_.exhaustive($[0])
            }
        })
])