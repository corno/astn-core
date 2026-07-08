import * as p_ from 'pareto-core/implementation/refiner'
import * as p_t from 'pareto-core/implementation/transformer'
import type * as p_di from 'pareto-core/interface/data'
import type * as p_i from 'pareto-core/interface/refiner'
import p_assert from 'pareto-core/implementation/refiner/specials/assert'

import type * as d_in from "../../../generated/liana/schemas/parse_tree/data.js"
import type * as d_out from "../../../data/unmarshalled.js"
import type * as d_function from "../../../data/unmarshall.js"

import type * as d_location from "../../../generated/liana/schemas/location/data.js"

//dependencies
import * as t_parse_tree_to_location from "../../transformers/parse_tree/start_token_range.js"

export namespace interface_ {
    export type Dictionary = p_i.Refiner<
        d_out.Dictionary,
        d_function.Error,
        d_in.Value
    >

    export type List = p_i.Refiner<
        d_out.List,
        d_function.Error,
        d_in.Value
    >

    export type Nothing = p_i.Refiner<
        d_out.Nothing,
        d_function.Error,
        d_in.Value
    >

    export type Optional = p_i.Refiner<
        d_out.Optional,
        d_function.Error,
        d_in.Value
    >

    export type Property = p_i.Refiner_With_Parameter<
        d_out.Property,
        d_function.Error,
        d_out.Verbose_Group,
        {
            'id': string
        }
    >

    export type State = p_i.Refiner<
        d_out.State,
        d_function.Error,
        d_in.Value
    >

    export type Text = p_i.Refiner<
        d_out.Text,
        d_function.Error,
        d_in.Value
    >

    export type Verbose_Group = p_i.Refiner_With_Parameter<
        d_out.Verbose_Group,
        d_function.Error,
        d_in.Value,
        {
            'expected properties': p_di.Dictionary<null>
        }
    >
}
