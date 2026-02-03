import * as _pi from 'pareto-core/dist/interface'
import * as _p from 'pareto-core/dist/expression'

//data types
import * as d_out from "pareto-fountain-pen/dist/interface/to_be_generated/text"

import { $$ as s_escaped } from "./escaped"

export type Parameters = {
    'add delimiters': boolean
}

export type Signature = _pi.Transformer_With_Parameters<string, d_out.Text, Parameters>

export const $$: Signature = ($, $p) => $p['add delimiters']
    ? _p.list.nested_literal_old([
        [
            0x27, // '
        ],
        s_escaped(
            $,
        ),
        [
            0x27, // '
        ]
    ])
    : s_escaped($)