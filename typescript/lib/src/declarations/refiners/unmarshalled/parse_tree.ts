
import type * as p_di from 'pareto-core/interface/data'
import type * as p_ from 'pareto-core/interface/refiner'

import type * as d_in from "../../../interface/generated/liana/schemas/parse_tree/data.js"
import type * as d_out from "../../../interface/data/unmarshalled.js"
import type * as d_function from "../../../interface/data/unmarshall.js"

export type Dictionary = p_.Refiner<
    d_out.Dictionary,
    d_function.Error,
    d_in.Value
>

export type List = p_.Refiner<
    d_out.List,
    d_function.Error,
    d_in.Value
>

export type Nothing = p_.Refiner<
    d_out.Nothing,
    d_function.Error,
    d_in.Value
>

export type Optional = p_.Refiner<
    d_out.Optional,
    d_function.Error,
    d_in.Value
>

export type Property = p_.Refiner_With_Parameter<
    d_out.Property,
    d_function.Error,
    d_out.Verbose_Group,
    {
        'id': string
    }
>

export type State = p_.Refiner<
    d_out.State,
    d_function.Error,
    d_in.Value
>

export type Text = p_.Refiner<
    d_out.Text,
    d_function.Error,
    d_in.Value
>

export type Verbose_Group = p_.Refiner_With_Parameter<
    d_out.Verbose_Group,
    d_function.Error,
    d_in.Value,
    {
        'expected properties': p_di.Dictionary<null>
    }
>

