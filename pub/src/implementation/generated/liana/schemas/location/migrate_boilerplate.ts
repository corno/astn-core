
import * as _p from "pareto-core/dist/transformer"

import {
    _p_cc,
} from "pareto-core/dist/change_context"

import * as t_signatures from "../../../../../interface/generated/liana/schemas/location/migrate_boilerplate"

import * as t_out from "../../../../../interface/generated/liana/schemas/location/data"

export const Relative_Location: t_signatures.Relative_Location = ($) => ({
    'document resource identifier': _p_cc(
        $['document resource identifier'],
        ($) => $
    ),
    'line': _p_cc(
        $['line'],
        ($) => $
    ),
    'column': _p_cc(
        $['column'],
        ($) => $
    ),
})

export const Location: t_signatures.Location = ($) => ({
    'relative': _p_cc(
        $['relative'],
        ($) => Relative_Location(
            $
        )
    ),
    'absolute': _p_cc(
        $['absolute'],
        ($) => $
    ),
})

export const Range: t_signatures.Range = ($) => ({
    'start': _p_cc(
        $['start'],
        ($) => Location(
            $
        )
    ),
    'end': _p_cc(
        $['end'],
        ($) => Location(
            $
        )
    ),
})
