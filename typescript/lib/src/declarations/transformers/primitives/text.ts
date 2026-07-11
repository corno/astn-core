
import type * as p_ from 'pareto-core/interface/transformer'

import type * as d_in from "../../../interface/schemas/primitives.js"
import type * as d_out from "pareto-fountain-pen/interface/data/list_of_characters"

export namespace d_function {

    export type Parameters = {
        'add delimiters': boolean
    }

}

export type Escaped = p_.Transformer<
    d_in.Escaped,
    d_out.List_of_Characters
>
export type Quoted = p_.Transformer_With_Parameter<
    d_in.Quoted,
    d_out.List_of_Characters,
    d_function.Parameters
>
export type Apostrophed = p_.Transformer_With_Parameter<
    d_in.Apostrophed,
    d_out.List_of_Characters,
    d_function.Parameters
>
export type Backticked = p_.Transformer_With_Parameter<
    d_in.Backticked,
    d_out.List_of_Characters,
    d_function.Parameters
>
export type Undelimited = p_.Transformer<
    d_in.Undelimited,
    d_out.List_of_Characters
>

