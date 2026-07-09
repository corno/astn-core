
import type * as interface_ from "../../../../declarations/transformers/sealed_target/deprecated_list_of_characters.js"

//dependencies
import * as t_to_prose from "./prose.js"
import * as t_fp_to_characters from "pareto-fountain-pen/implementation/manual/transformers/prose/list_of_characters"


export const Document: interface_.Document = ($, $p) => t_fp_to_characters.Paragraph(
    t_to_prose.Document($),
    $p
)
export const Value: interface_.Value = ($, $p) => t_fp_to_characters.Phrase(
    t_to_prose.Value($),
    $p
)