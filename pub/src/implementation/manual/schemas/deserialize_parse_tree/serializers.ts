import * as _p from 'pareto-core/dist/transformer'
import * as _pi from 'pareto-core/dist/interface'

import * as d_in from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"
import * as d_to_fountain_pen from "./transformers/fountain_pen"

export type Error = _pi.Serializer_With_Parameters<d_in.Error, d_to_fountain_pen.Parameters>

//dependencies
import * as t_to_fountain_pen from "./transformers/fountain_pen"
import * as s_fp from "pareto-fountain-pen/dist/implementation/manual/schemas/block/serializers"

export const Error: Error = ($, $p) => s_fp.Block_Part(
    t_to_fountain_pen.Error($, $p),
    {
        'indentation': `    `,
        'newline': '\n',
    }
)