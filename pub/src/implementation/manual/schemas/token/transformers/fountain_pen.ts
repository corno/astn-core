import * as _p from 'pareto-core/dist/transformer'
import * as _pi from 'pareto-core/dist/interface'

import * as d_in from "../../../../../interface/generated/pareto/schemas/token/data"
import * as d_out from "pareto-fountain-pen/dist/interface/generated/pareto/schemas/block/data"

import * as sh from "pareto-fountain-pen/dist/shorthands/block"

export type Parameters = {
    'with @': boolean
    'position info':
    | ['zero based', null]
    | ['one based', null]
}

export namespace signatures {
    export type Location = _pi.Transformer_With_Parameters<d_in.Location, d_out.Block_Part, Parameters>
    export type Range = _pi.Transformer_With_Parameters<d_in.Range, d_out.Block_Part, Parameters>
}

export const Range: signatures.Range = ($, $p) =>  sh.b.sub([
    $p['with @'] ? sh.b.snippet(`@ `) : sh.b.nothing(),
    sh.b.snippet($.start.relative.uri),
    sh.b.snippet(`:`),
    sh.b.snippet("" + $.start.relative.line + _p.sg($p['position info'], ($) => ($[0] === 'zero based' ? 0 : 1))),
    sh.b.snippet(`:`),
    sh.b.snippet("" + ($.start.relative.column + _p.sg($p['position info'], ($) => ($[0] === 'zero based' ? 0 : 1)))),
    sh.b.snippet(`-`),
    sh.b.snippet("" + $.end.relative.line + _p.sg($p['position info'], ($) => ($[0] === 'zero based' ? 0 : 1))),
    sh.b.snippet(`:`),
    sh.b.snippet("" + ($.end.relative.column + _p.sg($p['position info'], ($) => ($[0] === 'zero based' ? 0 : 1))))
])

export const Location: signatures.Location = ($, $p) => {
    return sh.b.sub([
        $p['with @'] ? sh.b.snippet(`@ `) : sh.b.nothing(),
        sh.b.snippet($.relative.uri),
        sh.b.snippet(`:`),
        sh.b.snippet("" + $.relative.line + _p.sg($p['position info'], ($) => ($[0] === 'zero based' ? 0 : 1))),
        sh.b.snippet(`:`),
        sh.b.snippet("" + ($.relative.column + _p.sg($p['position info'], ($) => ($[0] === 'zero based' ? 0 : 1)))),
    ])
}