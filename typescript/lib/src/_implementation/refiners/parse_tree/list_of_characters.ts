import * as p_ from 'pareto-core/implementation/refiner'
import p_iterate from 'pareto-core/implementation/refiner/specials/iterate'

//schemas
import type * as s_function from "../../../interface/schemas/deserialize_parse_tree.js"
import type * as s_out from "../../../interface/schemas/parse_tree.js"
import type * as s_in from "../../../interface/schemas/list_of_characters.js"

namespace declarations {
    export type Document = p_.Refiner_With_Parameter<
        s_out.Document,
        s_function.Error,
        s_in.List_Of_Characters,
        s_function.Parameters
    >
}

//dependencies
import * as r_annotated_characters from "../annotated_characters/list_of_characters.js"
import * as r_tokenize from "../token/annotated_character.js"
import * as r_from_tokenizer_result from "./tokenizer_result.js"




export const Document: declarations.Document = ($, abort, $p,) => {
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