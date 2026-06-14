import * as pt from 'pareto-core/dist/assign'
import * as pi from 'pareto-core/dist/interface'
import p_iterate from 'pareto-core/dist/_p_iterate'

//data types
import * as d_function from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"


//dependencies
import * as ds_annotated_characters from "../annotated_characters/text"
import * as tokenize from "../token/annotated_character"
import * as r_from_token from "./tokenizer_result"

export namespace signatures {

    export type Document = pi.Refiner_With_Parameter<
        d_out.Document,
        d_function.Error,
        d_in.List_of_Characters,
        d_function.Parameters
    >

}

export const Document: signatures.Document = ($, abort, $p,) => {
    const ann_chars = ds_annotated_characters.Annotated_Characters(
        $,
        $p
    )
    return p_iterate( //fixme: make this iterate_fully
        ann_chars.characters,
        ann_chars.end,
        (iter) => r_from_token.Document(//fixme: make this iterate_fully
            tokenize.Tokenizer_Result(
                iter,
                ($) => abort({
                    'type': ['lexer', $],
                }),
            ),
            ($) => abort({
                'type': ['parser', $],
            })
        )
    )
}