import * as p_ from 'pareto-core/interface/schema'

import type * as s_parse_tree from "../../../deserialization/schemas/parse_tree/schema.js"

export type Dictionary = {
    'value': s_parse_tree.Value
    'entries': p_.Dictionary<s_parse_tree.ID_Value_Pairs.L>
}

export type Verbose_Group = {
    'value': s_parse_tree.Value
    'properties': p_.Dictionary<s_parse_tree.ID_Value_Pairs.L>
}

export type List = {
    'value': s_parse_tree.Value
    'items': p_.List<s_parse_tree.Items.L>
}

export type Optional = {
    'value': s_parse_tree.Value
    'optional': p_.Optional_Value<s_parse_tree.Value>
}

export type Nothing = {
    'value': s_parse_tree.Value
    'null': null //useful for unmarshalling functions that have to produce a null value
}

export type State = s_parse_tree.Value.type_.concrete.state.status.set_

export type Text = s_parse_tree.Value.type_.concrete.text

export type Property = s_parse_tree.ID_Value_Pairs.L