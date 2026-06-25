import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_i from 'pareto-core/dist/interface/refiner'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'

//data types
import * as d_function from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"
import * as d_annotated_characters from "../../../../interface/data/annotated_characters"
import * as d_location from "../../../../interface/generated/liana/schemas/location/data"

//dependencies
import * as r_annotated_characters from "../annotated_characters/text"
import * as pr_tokenize from "../../productions/token/annotated_character"
import * as r_from_tokenizer_result from "./tokenizer_result"

export namespace signatures {

    export type Document = p_i.Refiner_With_Parameter<
        d_out.Document,
        d_function.Error,
        d_in.List_of_Characters,
        d_function.Parameters
    >

}

export const Document: signatures.Document = ($, abort, $p,) => {
    const ann_chars = r_annotated_characters.Annotated_Characters(
        $,
        $p
    )
    return p_iterate<
        d_out.Document,
        d_annotated_characters.Annotated_Character,
        d_annotated_characters.End
    >({
        list: ann_chars.characters,
        end_info: ann_chars.end,
        on_dangling_item: null,//fixme: make this iterate_fully
        // create_expectation_error: (expected, found) => ({
        //     'expected': expected,
        //     'range': p_.from.state(found).decide(
        //         ($): d_location.Range => {
        //             switch ($[0]) {
        //                 case 'end': return p_.ss($, ($) => ({
        //                     'start': ann_chars.end,
        //                     'end': ann_chars.end
        //                 }))
        //                 case 'item': return p_.ss($, ($) => ({
        //                     'start': $.location,
        //                     'end': $.location, //shouldn't this be incremented by 1?
        //                 }))
        //                 default: return p_.au($[0])
        //             }
        //         }
        //     ),
        // }),
        assign: (iterator) => r_from_tokenizer_result.Document(//fixme: make this iterate_fully
            pr_tokenize.Tokenizer_Result(
                iterator,
                ($) => abort({
                    'type': ['lexer', $],
                }),
                {
                    'end info': ann_chars.end,
                }
            ),
            ($) => abort({
                'type': ['parser', $],
            })
        )
    })
}