import p_iterate from 'pareto-core/implementation/refiner/specials/iterate'

//dependencies
import * as r_annotated_characters from "../annotated_characters/text.js"
import * as r_tokenize from "../token/annotated_character.js"
import * as r_from_tokenizer_result from "./tokenizer_result.js"

import type * as interface_ from "../../../../declarations/refiners/parse_tree/list_of_characters.js"

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