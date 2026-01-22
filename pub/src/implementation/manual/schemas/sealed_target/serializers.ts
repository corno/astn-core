import * as _p from 'pareto-core/dist/transformer'
import * as _pi from 'pareto-core/dist/interface'

import * as d_in from "../../../../interface/generated/liana/schemas/sealed_target/data"

export type Document = _pi.Serializer<d_in.Document>

//dependencies
import * as t_to_fountain_pen from "./transformers/fountain_pen_block"
import * as s_fp from "pareto-fountain-pen/dist/implementation/manual/schemas/block/serializers"

export const Document: Document = ($) => s_fp.Group(
    t_to_fountain_pen.Document(
        $,
    ),
    {
        'indentation': `    `,
        'newline': '\n',
    }
)