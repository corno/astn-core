import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/sealed_target.js"
import type * as s_out from "../../../interface/schemas/text.js"
import type * as s_function_fp from "../../../interface/schemas/prose_serialize.js"

namespace declarations {
    export type Document = p_.Transformer_With_Parameter<
        s_in.Document,
        s_out.Text,
        s_function_fp.Parameters
    >
    export type Value = p_.Transformer_With_Parameter<
        s_in.Value,
        s_out.Text,
        s_function_fp.Parameters
    >
}

//dependencies
import * as t_to_prose from "./prose.js"
import * as t_prose_to_text from "pareto-fountain-pen/implementation/transformers/prose/text"


export const Document: declarations.Document = ($, $p) => t_prose_to_text.Paragraph(
    t_to_prose.Document($),
    $p
)

export const Value: declarations.Value = ($, $p) => t_prose_to_text.Phrase(
    t_to_prose.Value($),
    $p
)