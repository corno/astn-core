import * as p_ from 'pareto-core/implementation/transformer'

import type * as s_in from "../../../interface/schemas/sealed_target.js"
import type * as s_out from "../../../interface/schemas/list_of_characters.js"
import type * as s_parameters from "../../../interface/schemas/serialize_prose.js"

namespace declarations {
    export type Document = p_.Transformer_With_Parameter<
        s_in.Document,
        s_out.List_of_Characters,
        s_parameters.Parameters
    >
    export type Value = p_.Transformer_With_Parameter<
        s_in.Value,
        s_out.List_of_Characters,
        s_parameters.Parameters
    >
}

//dependencies
import * as t_to_prose from "./prose.js"
import * as fp_api from "pareto-fountain-pen/api"


export const Document: declarations.Document = ($, $p) => fp_api.api.transformers.prose['list of characters'].Paragraph(
    t_to_prose.Document($),
    $p
)
export const Value: declarations.Value = ($, $p) => fp_api.api.transformers.prose['list of characters'].Phrase(
    t_to_prose.Value($),
    $p
)