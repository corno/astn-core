
import type * as p_ from 'pareto-core/interface/transformer'

import type * as s_in from "../../../interface/schemas/primitives.js"
import type * as s_out from "pareto-fountain-pen/interface/data/list_of_characters"

export namespace s_function {

    export type Parameters = {
        'add delimiters': boolean
    }

}

export type Escaped = p_.Transformer<
    s_in.Escaped,
    s_out.List_of_Characters
>
export type Quoted = p_.Transformer_With_Parameter<
    s_in.Quoted,
    s_out.List_of_Characters,
    s_function.Parameters
>
export type Apostrophed = p_.Transformer_With_Parameter<
    s_in.Apostrophed,
    s_out.List_of_Characters,
    s_function.Parameters
>
export type Backticked = p_.Transformer_With_Parameter<
    s_in.Backticked,
    s_out.List_of_Characters,
    s_function.Parameters
>
export type Undelimited = p_.Transformer<
    s_in.Undelimited,
    s_out.List_of_Characters
>

