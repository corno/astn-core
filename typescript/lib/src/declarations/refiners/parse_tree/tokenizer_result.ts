
import type * as p_ from 'pareto-core/interface/refiner'

//data types
import type * as s_choice from "../../../interface/schemas/deserialize_parse_tree.js"
import type * as s_function from "../../../interface/schemas/deserialize_parse_tree.js"
import type * as s_out from "../../../interface/schemas/parse_tree.js"
import type * as s_in from "../../../interface/schemas/token.js"
import type * as s_location from "../../../interface/schemas/location.js"

export type Document = p_.Refiner<
    s_out.Document,
    s_function.Parser_Error,
    s_in.Tokenizer_Result
>

export type Value = p_.Production<
    s_out.Value,
    s_choice.Parser_Error,
    s_in.Annotated_Token,
    s_location.Location
>

export type Guaranteed_Structural_Token = p_.Production_With_Parameter<
    s_out.Structural_Token,
    s_choice.Parser_Error,
    s_in.Annotated_Token,
    s_location.Location,
    {
        'token': s_in.Annotated_Token
    }
>

export type Possible_Structural_Token = p_.Production_With_Parameter<
    s_out.Structural_Token,
    s_choice.Parser_Error,
    s_in.Annotated_Token,
    s_location.Location,
    {
        'expected token': s_choice.Expected
    }
>

export type Text = p_.Production_With_Parameter<
    s_out.Text,
    s_choice.Parser_Error,
    s_in.Annotated_Token,
    s_location.Location,
    {
        'text': s_in.Annotated_Token.type_.text
        'token': s_in.Annotated_Token
    }
>

export type Items = p_.Production_With_Parameter<
    s_out.Items,
    s_choice.Parser_Error,
    s_in.Annotated_Token,
    s_location.Location,
    {
        'end token': s_choice.Expected
    }
>

export type Element = p_.Production_With_Parameter<
    s_out.Items,
    s_choice.Parser_Error,
    s_in.Annotated_Token,
    s_location.Location,
    {
        'end token': s_choice.Expected
    }
>

export type ID_Value_Pairs = p_.Production_With_Parameter<
    s_out.ID_Value_Pairs,
    s_choice.Parser_Error,
    s_in.Annotated_Token,
    s_location.Location,
    {
        'end token': s_choice.Expected
    }
>


