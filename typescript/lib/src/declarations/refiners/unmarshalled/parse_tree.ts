
import type * as p_di from 'pareto-core/interface/schema'
import type * as p_ from 'pareto-core/interface/refiner'

import type * as s_in from "../../../interface/schemas/parse_tree.js"
import type * as s_out from "../../../interface/schemas/unmarshalled.js"
import type * as s_function from "../../../interface/schemas/unmarshall.js"

export type Dictionary = p_.Refiner<
    s_out.Dictionary,
    s_function.Error,
    s_in.Value
>

export type List = p_.Refiner<
    s_out.List,
    s_function.Error,
    s_in.Value
>

export type Nothing = p_.Refiner<
    s_out.Nothing,
    s_function.Error,
    s_in.Value
>

export type Optional = p_.Refiner<
    s_out.Optional,
    s_function.Error,
    s_in.Value
>

export type Property = p_.Refiner_With_Parameter<
    s_out.Property,
    s_function.Error,
    s_out.Verbose_Group,
    {
        'id': string
    }
>

export type State = p_.Refiner<
    s_out.State,
    s_function.Error,
    s_in.Value
>

export type Text = p_.Refiner<
    s_out.Text,
    s_function.Error,
    s_in.Value
>

export type Verbose_Group = p_.Refiner_With_Parameter<
    s_out.Verbose_Group,
    s_function.Error,
    s_in.Value,
    {
        'expected properties': p_di.Dictionary<null>
    }
>

