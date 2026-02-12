import * as _pi from 'pareto-core/dist/interface'

import * as d_parse_tree from "../generated/liana/schemas/parse_tree/data"

export type Dictionary = {
    'value': d_parse_tree.Value
    'entries': _pi.Dictionary<d_parse_tree.ID_Value_Pairs.L>
}

export type Verbose_Group = {
    'value': d_parse_tree.Value
    'properties': _pi.Dictionary<d_parse_tree.ID_Value_Pairs.L>
}

export type List = {
    'value': d_parse_tree.Value
    'items': _pi.List<d_parse_tree.Items.L>
}

export type Optional = {
    'value': d_parse_tree.Value
    'optional': _pi.Optional_Value<d_parse_tree.Value>
}

export type Nothing = {
    'value': d_parse_tree.Value
}

export type State = d_parse_tree.Value.type_.concrete.state.status.set_

export type Text = d_parse_tree.Value.type_.concrete.text

export type Property = d_parse_tree.ID_Value_Pairs.L