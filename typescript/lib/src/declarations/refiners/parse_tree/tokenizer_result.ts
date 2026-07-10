
import type * as p_ from 'pareto-core/interface/refiner'

//data types
import type * as d_choice from "../../../interface/data/deserialize_parse_tree.js"
import type * as d_function from "../../../interface/data/deserialize_parse_tree.js"
import type * as d_out from "../../../interface/data/parse_tree.js"
import type * as d_in from "../../../interface/data/token.js"
import type * as d_location from "../../../interface/data/location.js"

export type Document = p_.Refiner<
    d_out.Document,
    d_function.Parser_Error,
    d_in.Tokenizer_Result
>

export type Value = p_.Production<
    d_out.Value,
    d_choice.Parser_Error,
    d_in.Annotated_Token,
    d_location.Location
>

export type Guaranteed_Structural_Token = p_.Production_With_Parameter<
    d_out.Structural_Token,
    d_choice.Parser_Error,
    d_in.Annotated_Token,
    d_location.Location,
    {
        'token': d_in.Annotated_Token
    }
>

export type Possible_Structural_Token = p_.Production_With_Parameter<
    d_out.Structural_Token,
    d_choice.Parser_Error,
    d_in.Annotated_Token,
    d_location.Location,
    {
        'expected token': d_choice.Expected
    }
>

export type Text = p_.Production_With_Parameter<
    d_out.Text,
    d_choice.Parser_Error,
    d_in.Annotated_Token,
    d_location.Location,
    {
        'text': d_in.Annotated_Token.type_.text
        'token': d_in.Annotated_Token
    }
>

export type Items = p_.Production_With_Parameter<
    d_out.Items,
    d_choice.Parser_Error,
    d_in.Annotated_Token,
    d_location.Location,
    {
        'end token': d_choice.Expected
    }
>

export type Element = p_.Production_With_Parameter<
    d_out.Items,
    d_choice.Parser_Error,
    d_in.Annotated_Token,
    d_location.Location,
    {
        'end token': d_choice.Expected
    }
>

export type ID_Value_Pairs = p_.Production_With_Parameter<
    d_out.ID_Value_Pairs,
    d_choice.Parser_Error,
    d_in.Annotated_Token,
    d_location.Location,
    {
        'end token': d_choice.Expected
    }
>


