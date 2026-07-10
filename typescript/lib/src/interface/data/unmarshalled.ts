import * as p_ from 'pareto-core/interface/data'

import type * as d_parse_tree from "./parse_tree.js"

export type Dictionary = {
    'value': d_parse_tree.Value
    'entries': p_.Dictionary<d_parse_tree.ID_Value_Pairs.L>
}

export type Verbose_Group = {
    'value': d_parse_tree.Value
    'properties': p_.Dictionary<d_parse_tree.ID_Value_Pairs.L>
}

export type List = {
    'value': d_parse_tree.Value
    'items': p_.List<d_parse_tree.Items.L>
}

export type Optional = {
    'value': d_parse_tree.Value
    'optional': p_.Optional_Value<d_parse_tree.Value>
}

export type Nothing = {
    'value': d_parse_tree.Value
    'null': null //useful for unmarshalling functions that have to produce a null value
}

export type State = d_parse_tree.Value.type_.concrete.state.status.set_

export type Text = d_parse_tree.Value.type_.concrete.text

export type Property = d_parse_tree.ID_Value_Pairs.L