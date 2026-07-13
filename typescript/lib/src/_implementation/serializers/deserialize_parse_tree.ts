import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../interface/schemas/deserialize_parse_tree.js"
import type * as s_serialize_prose from "../../interface/schemas/serialize_prose.js"

namespace declarations {
    export type Error = p_.Serializer_With_Parameter<
        s_in.Error,
        s_serialize_prose.Parameters
    >
}

import * as api_fountain_pen from "pareto-fountain-pen/api"
import * as to_prose from "../transformers/deserialize_parse_tree/prose.js"

//shorthands

export const Error: declarations.Error = ($, $p) => api_fountain_pen.api.serializers.prose['list of characters'].Phrase(
    to_prose.Error($),
    $p,

)