import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_i from 'pareto-core/dist/interface/refiner'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'




import * as d_function from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_in from "../../../../interface/generated/liana/schemas/token/data"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"


//dependencies
import * as pr_authoring_parse_tree from "../../productions/parse_tree/token"

export namespace signatures {

    export type Document = p_i.Refiner<
        d_out.Document,
        d_function.Parser_Error,
        d_in.Tokenizer_Result
    >

}



export const Document: signatures.Document = ($, abort) => p_iterate<
    d_out.Document,
    d_function.Parser_Error,
    d_function.Parser_Error.expected,
    d_in.Tokenizer_Result.tokens.L,
    d_location.Location

>({
    list: $.tokens,
    end_info: $.end,
    //p_.literal.set<d_function.Parser_Error>(ss), //FIX enable checking for too many tokens
    create_dangling_item_error: () => p_.literal.not_set<d_function.Parser_Error>(),
    abort: abort,
    create_expectation_error: (expected, found) => ({
        'expected': expected,
        'cause': p_.from.state(found).decide(
            ($) => {
                switch ($[0]) {
                    case 'end': return p_.ss($, ($) => ['missing token', {
                        'end': $,
                    }])
                    case 'item': return p_.ss($, ($) => ['unexpected token', {
                        'found': $,
                    }])
                    default: return p_.au($[0])
                }
            }
        )
    }),
    assign: (iterator) => pr_authoring_parse_tree.Document(
        iterator,
    )
})