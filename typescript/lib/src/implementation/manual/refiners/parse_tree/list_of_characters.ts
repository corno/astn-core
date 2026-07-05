import * as p_i from 'pareto-core/dist/interface/refiner'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'

//data types
import * as d_function from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"

//dependencies
import * as r_annotated_characters from "../annotated_characters/text"
import * as r_tokenize from "../../productions/token/annotated_character"
import * as r_from_tokenizer_result from "./tokenizer_result"

export namespace interface_ {

    export type Document = p_i.Refiner_With_Parameter<
        d_out.Document,
        d_function.Error,
        d_in.List_of_Characters,
        d_function.Parameters
    >

}

export const Document: interface_.Document = ($, abort, $p,) => {
    const ann_chars = r_annotated_characters.Annotated_Characters(
        $,
        $p
    )
    return p_iterate({
        list: ann_chars.characters,
        end_info: ann_chars.end,
        assign: (iterator) => r_from_tokenizer_result.Document(//fixme: make this iterate_fully
            r_tokenize.Tokenizer_Result(
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
        ),
        on_dangling_item: null,//fixme: make this iterate_fully
    })
}