import * as _p from 'pareto-core/dist/deserializer'
import * as _pi from 'pareto-core/dist/interface'

import * as d_authoring_parse_result from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_authoring_parse_tree from "../../../../interface/generated/liana/schemas/parse_tree/data"

//dependencies
import * as r_from_text from "./refiners/text"

export namespace signatures {

    export type Document = _pi.Deserializer_With_Parameters<d_authoring_parse_tree.Document, d_authoring_parse_result.Error, { 'tab size': number, 'document resource identifier': string }>

}

export const Document: signatures.Document = ($, abort, $p,) => r_from_text.Document(
    _p.list.from_text($, ($) => $),
    abort,
    $p,
)