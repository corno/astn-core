import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/deserialize_parse_tree.js"
import type * as s_out from "../../../interface/schemas/list_of_characters.js"
import type * as s_serialize_prose from "../../../interface/schemas/serialize_prose.js"

namespace declarations {
    export type Error = p_.Transformer_With_Parameter<
        s_in.Error,
        s_out.List_of_Characters,
        s_serialize_prose.Parameters
    >
}

import * as api_fountain_pen from "pareto-fountain-pen/api"
import * as to_prose from "./prose.js"

//shorthands

export const Error: declarations.Error = ($, $p) => api_fountain_pen.api.transformers.prose['list of characters'].Phrase(
    to_prose.Error($),
    $p,

)