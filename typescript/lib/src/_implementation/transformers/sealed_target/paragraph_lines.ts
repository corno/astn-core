import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/sealed_target.js"
import type * as s_out from "../../../interface/schemas/paragraph_lines.js"

namespace declarations {
    export type Document = p_.Transformer_With_Parameter<
        s_in.Document,
        s_out.Lines,
        {
            'indentation': string
        }
    >
}

//dependencies
import * as t_paragraph_to_paragraph_lines from "pareto-fountain-pen/_implementation/transformers/paragraph/lines"
import * as t_to_paragraph from "./paragraph.js"

export const Document: declarations.Document = ($, $p) => t_paragraph_to_paragraph_lines.Paragraph(
    t_to_paragraph.Document($),
    $p
)
