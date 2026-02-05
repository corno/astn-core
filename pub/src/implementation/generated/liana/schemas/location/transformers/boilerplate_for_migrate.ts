    
    import * as _p from "pareto-core/dist/expression"
    
    import _p_change_context from "pareto-core/dist/_p_change_context"
    
    import * as t_signatures from "../../../../../../interface/generated/liana/schemas/location/boilerplate_for_migrate"
    
    import * as t_out from "../../../../../../interface/generated/liana/schemas/location/data"
    
    export const Range: t_signatures.Range = ($) => ({
        'start': _p_change_context(
            $['start'],
            ($) => Location(
                $,
            ),
        ),
        'end': _p_change_context(
            $['end'],
            ($) => Location(
                $,
            ),
        ),
    })
    
    export const Location: t_signatures.Location = ($) => ({
        'relative': _p_change_context(
            $['relative'],
            ($) => Relative_Location(
                $,
            ),
        ),
        'absolute': _p_change_context(
            $['absolute'],
            ($) => $,
        ),
    })
    
    export const Relative_Location: t_signatures.Relative_Location = ($) => ({
        'document resource identifier': _p_change_context(
            $['document resource identifier'],
            ($) => $,
        ),
        'line': _p_change_context(
            $['line'],
            ($) => $,
        ),
        'column': _p_change_context(
            $['column'],
            ($) => $,
        ),
    })
