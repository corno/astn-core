import * as _p from 'pareto-core/dist/assign'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'

//data types
import * as d_function from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_out from "../../../../interface/generated/liana/schemas/parse_tree/data"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/text/data"

//dependencies
import * as r_from_list_of_characters from "./list_of_characters"

export type Document = _pi.Refiner_With_Parameter<
    d_out.Document,
    d_function.Error,
    d_in.Text,
    d_function.Parameters
>

export const Document: Document = ($, abort, $p,) => r_from_list_of_characters.Document(
    _p_list_from_text($, ($) => $),
    abort,
    $p,
)