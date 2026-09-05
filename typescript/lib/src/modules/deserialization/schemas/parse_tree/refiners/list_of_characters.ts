import * as p_ from 'pareto-core/refiner'
import p_iterate from 'pareto-core/refiner/specials/iterate'

//schemas
import type * as s_function from "../../parse_tree_deserialization/schema.js"
import type * as s_out from "../schema.js"
import type * as s_in from "../../list_of_characters/schema.js"

namespace declarations {
    export type Document = p_.Refiner_With_Parameter<
        s_out.Document,
        s_function.Error,
        s_in.List_Of_Characters,
        s_function.Parameters
    >
}

//dependencies
import * as r_annotated_characters from "../../annotated_characters/refiners/list_of_characters.js"
import * as r_tokenize from "../../token/refiners/annotated_character.js"
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