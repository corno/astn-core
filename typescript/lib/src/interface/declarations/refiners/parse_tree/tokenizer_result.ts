
import type * as p_i from 'pareto-core/interface/refiner'
import type * as p_ti from 'pareto-core/interface/transformer'

import p_iterate from 'pareto-core/implementation/refiner/specials/iterate'
import p_unreachable_code_path from 'pareto-core/implementation/transformer/specials/unreachable_code_path'

//data types
import type * as d_choice from "../../../generated/liana/schemas/deserialize_parse_tree/data.js"
import type * as d_function from "../../../generated/liana/schemas/deserialize_parse_tree/data.js"
import type * as d_out from "../../../generated/liana/schemas/parse_tree/data.js"
import type * as d_in from "../../../generated/liana/schemas/token/data.js"
import type * as d_location from "../../../generated/liana/schemas/location/data.js"


//dependencies



    export type Document = p_i.Refiner<
        d_out.Document,
        d_function.Parser_Error,
        d_in.Tokenizer_Result
    >

    export type Value = p_i.Production<
        d_out.Value,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location
    >

    export type Guaranteed_Structural_Token = p_i.Production_With_Parameter<
        d_out.Structural_Token,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'token': d_in.Annotated_Token
        }
    >

    export type Possible_Structural_Token = p_i.Production_With_Parameter<
        d_out.Structural_Token,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'expected token': d_choice.Expected
        }
    >

    export type Text = p_i.Production_With_Parameter<
        d_out.Text,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'text': d_in.Annotated_Token.type_.text
            'token': d_in.Annotated_Token
        }
    >

    export type Items = p_i.Production_With_Parameter<
        d_out.Items,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'end token': d_choice.Expected
        }
    >

    export type Element = p_i.Production_With_Parameter<
        d_out.Items,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'end token': d_choice.Expected
        }
    >

    export type ID_Value_Pairs = p_i.Production_With_Parameter<
        d_out.ID_Value_Pairs,
        d_choice.Parser_Error,
        d_in.Annotated_Token,
        d_location.Location,
        {
            'end token': d_choice.Expected
        }
    >


