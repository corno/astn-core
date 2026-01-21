import * as _p from 'pareto-core-refiner'
import * as _pi from 'pareto-core-interface'
import * as _pi_new from '../productions/temp'
import * as _pds_new from "../productions/temp"




import * as d_authoring_parse_result from "../../../../../interface/generated/pareto/schemas/deserialize_parse_tree/data"
import * as d_authoring_parse_tree from "../../../../../interface/generated/pareto/schemas/parse_tree/data"
import * as d_token from "../../../../../interface/generated/pareto/schemas/token/data"


//dependencies
import * as ds_annotated_characters from "../../annotated_characters/refiners/text"
import * as tokenize from "../../token/productions/annotated_character"
import * as r_from_token from "./token"

export namespace signatures {

    export type Document = _pi.Refiner_With_Parameters<d_authoring_parse_tree.Document, d_authoring_parse_result.Error, _pi.List<number>, { 'tab size': number, 'uri': string }>

}

export const Document: signatures.Document = ($, abort, $p,) => _p.iterate( //fixme: make this iterate_fully
    ds_annotated_characters.Annotated_Characters(
        $,
        {
            'tab size': $p['tab size'],
            'uri': $p['uri'],
        }
    ),
    (iter) => r_from_token.Document(//fixme: make this iterate_fully
        tokenize.Tokenizer_Result(
            {
                'old': iter,
                'new': _pds_new.create_iterator(
                    iter,
                    () => _p.unreachable_code_path(),
                    () => _p.unreachable_code_path(),
                    () => _p.unreachable_code_path(),
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