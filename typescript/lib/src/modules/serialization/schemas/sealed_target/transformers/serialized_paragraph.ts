import * as p_ from 'pareto-core/transformer'

//schemas
import type * as s_in from "../schema.js"
import type * as s_out from "pareto-fountain-pen/modules/paragraph/schemas/serialized/schema"

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
import * as t_paragraph_to_serialized_paragraph from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/transformers/serialized"
import * as t_to_paragraph from "./paragraph.js"

export const Document: declarations.Document = ($, $p) => t_paragraph_to_serialized_paragraph.Paragraph(
    t_to_paragraph.Document($),
    $p
)
