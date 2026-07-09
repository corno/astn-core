
import type * as interface_ from "../../../declarations/transformers/sealed_target/text.js"

//dependencies
import * as t_to_prose from "./prose.js"
import * as t_prose_to_text from "pareto-fountain-pen/implementation/manual/transformers/prose/text"


export const Document: interface_.Document = ($, $p) => t_prose_to_text.Paragraph(
    t_to_prose.Document($),
    $p
)

export const Value: interface_.Value = ($, $p) => t_prose_to_text.Phrase(
    t_to_prose.Value($),
    $p
)