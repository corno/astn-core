import * as _pi from 'pareto-core/dist/interface'

import * as d_parse_tree from "../generated/liana/schemas/parse_tree/data"

export type Dictionary = _pi.Dictionary<d_parse_tree.Value>

export type List = _pi.List<d_parse_tree.Value>

export type Optional = _pi.Optional_Value<d_parse_tree.Value>

export type Nothing = null

export type State = d_parse_tree.Value.type_.concrete.state.status.set_

export type Text = string