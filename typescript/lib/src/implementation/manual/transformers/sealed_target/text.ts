import * as pt from 'pareto-core/dist/transformer/implementation'
import * as p_i from 'pareto-core/dist/transformer/interface'

//data types
import * as d_in from "../../../../interface/generated/liana/schemas/sealed_target/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/text/data"
import * as d_function_fp from "pareto-fountain-pen/dist/interface/to_be_generated/prose_serialize"


//dependencies
import * as t_to_fp from "./fountain_pen"
import * as t_fp_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"


export const Document: p_i.Transformer_With_Parameter<d_in.Document, d_out.Text, d_function_fp.Parameters> = ($, $p) => t_fp_to_text.Paragraph(
    t_to_fp.Document($),
    $p
)

export const Value: p_i.Transformer_With_Parameter<d_in.Value, d_out.Text, d_function_fp.Parameters> = ($, $p) => t_fp_to_text.Phrase(
    t_to_fp.Value($),
    $p
)