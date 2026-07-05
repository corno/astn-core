import * as p_i from 'pareto-core/dist/interface/refiner'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'




import * as d_function from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_in from "../../../../interface/generated/liana/schemas/token/data"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"


//dependencies
import * as pr_authoring_parse_tree from "../../productions/parse_tree/token"

export namespace interface_ {

    export type Document = p_i.Refiner<
        d_out.Document,
        d_function.Parser_Error,
        d_in.Tokenizer_Result
    >

}



export const Document: interface_.Document = ($, abort) => p_iterate<
    d_out.Document,
    d_in.Tokenizer_Result.tokens.L,
    d_location.Location

>({
    list: $.tokens,
    end_info: $.end,
    assign: (iterator) => pr_authoring_parse_tree.Document(
        iterator,
        abort,
    ),
    on_dangling_item: null, //FIX enable checking for too many tokens
})