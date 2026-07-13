import * as p_ from 'pareto-core/implementation/serializer'

//schemas
import type * as s_in from "../../interface/schemas/deserialize_parse_tree.js"

namespace declarations {
    export type Error = p_.Serializer<
        s_in.Error
    >
}

import * as api_fountain_pen from "pareto-fountain-pen/api"
import * as to_prose from "../transformers/deserialize_parse_tree/prose.js"

//shorthands

export const Error: declarations.Error = ($) => api_fountain_pen.api.serializers.prose.Phrase(
    to_prose.Error($),
)