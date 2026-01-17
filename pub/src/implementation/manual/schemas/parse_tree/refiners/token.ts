import * as _p from 'pareto-core-deserializer'
import * as _pi from 'pareto-core-interface'
import * as _pi_new from '../productions/temp'
import * as _pds_new from "../../parse_tree/productions/temp"




import * as d_authoring_parse_result from "../../../../../interface/generated/pareto/schemas/deserialize_parse_tree/data"
import * as d_authoring_parse_tree from "../../../../../interface/generated/pareto/schemas/parse_tree/data"
import * as d_token from "../../../../../interface/generated/pareto/schemas/token/data"


//dependencies
import * as ds_annotated_characters from "../../annotated_characters/refiners/text"
import * as p_authoring_parse_tree from "../productions/token"
import * as tokenize from "../../token/productions/annotated_character"

export namespace signatures {

    export type Document = _pi.Refiner<d_authoring_parse_tree.Document, d_authoring_parse_result.Parser_Error, d_token.Tokenizer_Result>

}

export const Document: signatures.Document = ($, abort) => _p.iterate(//fixme: make this iterate_fully
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
            () => _p.unreachable_code_path(),
        )
    )
)