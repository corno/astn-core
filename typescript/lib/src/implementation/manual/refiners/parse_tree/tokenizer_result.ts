import * as pt from 'pareto-core/dist/assign'
import * as pi from 'pareto-core/dist/interface'
import p_iterate from 'pareto-core/dist/_p_iterate'




import * as d_function from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_in from "../../../../interface/generated/liana/schemas/token/data"


//dependencies
import * as p_authoring_parse_tree from "./token"

export namespace signatures {

    export type Document = pi.Refiner<d_out.Document, d_function.Parser_Error, d_in.Tokenizer_Result>

}

export const Document: signatures.Document = ($, abort) => p_iterate(//fixme: make this iterate_fully
    $.tokens,
    $.end,
    (iter) => p_authoring_parse_tree.Document(
        iter,
        abort,
    )
)