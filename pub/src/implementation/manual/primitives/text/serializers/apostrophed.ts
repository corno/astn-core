import * as _p from 'pareto-core-serializer'
import * as _pi from 'pareto-core-interface'

import { $$ as s_escaped } from "./escaped"

export type Parameters = {
    'add delimiters': boolean
}

export type Signature = _pi.Text_Serializer_With_Parameters<Parameters>

export const $$: Signature = ($, $p) => $p['add delimiters']
    ? "'" + s_escaped($) + "'"
    : s_escaped($)