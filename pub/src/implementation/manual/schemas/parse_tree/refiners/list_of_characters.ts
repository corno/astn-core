import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import * as _pi_new from '../productions/temp'
import _p_iterate from 'pareto-core/dist/_p_iterate'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import * as _pds_new from "../productions/temp"

//data types
import * as d_authoring_parse_result from "../../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_authoring_parse_tree from "../../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_out from "pareto-fountain-pen/dist/interface/to_be_generated/list_of_characters"


//dependencies
import * as ds_annotated_characters from "../../annotated_characters/refiners/text"
import * as tokenize from "../../token/productions/annotated_character"
import * as r_from_token from "./token"

export namespace signatures {

    export type Document = _pi.Refiner_With_Parameter<
        d_authoring_parse_tree.Document,
        d_authoring_parse_result.Error,
        d_out.List_of_Characters,
        {
            'tab size': number,
            'document resource identifier': string
        }
    >

}

export const Document: signatures.Document = ($, abort, $p,) => _p_iterate( //fixme: make this iterate_fully
    ds_annotated_characters.Annotated_Characters(
        $,
        {
            'tab size': $p['tab size'],
            'document resource identifier': $p['document resource identifier'],
        }
    ),
    (iter) => r_from_token.Document(//fixme: make this iterate_fully
        tokenize.Tokenizer_Result(
            {
                'old': iter,
                'new': _pds_new.create_iterator(
                    iter,
                    {
                        unexpected_element: _p_unreachable_code_path("not sure if this cannot be reacched or needs implementation"),
                        unexpected_end_with_expected: _p_unreachable_code_path("not sure if this cannot be reacched or needs implementation"),
                        unguarded_unexpected_end: _p_unreachable_code_path("not sure if this cannot be reacched or needs implementation"),
                    }
                )
            },
            ($) => abort({
                'type': ['lexer', $],
            }),
        ),
        ($) => abort({
            'type': ['parser', $],
        })
    )
)