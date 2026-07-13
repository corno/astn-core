import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/unmarshalling.js"
import type * as s_out from "../../../interface/schemas/location.js"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Range
    >
}

export const Error: declarations.Error = ($) => $.range