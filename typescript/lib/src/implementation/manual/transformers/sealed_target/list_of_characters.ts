import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_di from 'pareto-core/dist/data/interface'
import * as p_ti from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/sealed_target/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"
import * as d_function_fp from "pareto-fountain-pen/dist/interface/to_be_generated/prose_serialize"


//dependencies
import * as t_to_fp from "./fountain_pen"
import * as t_fp_to_characters from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/list_of_characters"


export const Document: p_ti.Transformer_With_Parameter<d_in.Document, d_out.List_of_Characters, d_function_fp.Parameters> = ($, $p) => t_fp_to_characters.Paragraph(
    t_to_fp.Document($),
    $p
)
export const Value: p_ti.Transformer_With_Parameter<d_in.Value, d_out.List_of_Characters, d_function_fp.Parameters> = ($, $p) => t_fp_to_characters.Phrase(
    t_to_fp.Value($),
    $p
)