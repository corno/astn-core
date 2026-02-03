import * as _p from 'pareto-core/dist/expression'
import * as _pi from 'pareto-core/dist/interface'
import * as _pi_new from '../productions/temp'
import _p_unreachable_code_path from 'pareto-core/dist/_p_unreachable_code_path'
import _p_iterate from 'pareto-core/dist/_p_iterate'
import * as _pds_new from "../../parse_tree/productions/temp"




import * as d_authoring_parse_result from "../../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_authoring_parse_tree from "../../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_token from "../../../../../interface/generated/liana/schemas/token/data"


//dependencies
import * as p_authoring_parse_tree from "../productions/token"

export namespace signatures {

    export type Document = _pi.Refiner<d_authoring_parse_tree.Document, d_authoring_parse_result.Parser_Error, d_token.Tokenizer_Result>

}

export const Document: signatures.Document = ($, abort) => _p_iterate(//fixme: make this iterate_fully
    $.tokens,
    (iter) => p_authoring_parse_tree.Document(
        _pi_new.create_iterator(
            iter,
            (expected, element) => abort({
                'expected': expected,
                'cause': ['unexpected token', {
                    'found': element,
                }],
            }),
            (expected) => abort({
                'expected': expected,
                'cause': ['missing token', null],
            }),
            () => _p_unreachable_code_path(),
        )
    )
)