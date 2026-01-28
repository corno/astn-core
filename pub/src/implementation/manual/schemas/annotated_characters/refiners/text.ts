import * as _p from 'pareto-core/dist/deserializer'
import * as _pi from 'pareto-core/dist/interface'

import * as d_annotated_characters from "../../../../../interface/to_be_generated/annotated_characters"

export namespace signatures {

    export type Annotated_Characters = _pi.Refiner_Without_Error_With_Parameters<d_annotated_characters.Annotated_Characters, _pi.List<number>, { 'tab size': number, 'document resource identifier': string }>

}



// const loop = <Iterator_Element, State>(
//     iterator: _pi.Iterator<Iterator_Element>,
//     initial_state: State,
//     callback: (
//         element: Iterator_Element,
//         state: State,
//         $i: {
//             'end reached': () => void
//         },
//     ) => State
// ): State => {
//     let current_state = initial_state
//     _pdev.log_debug_message("Starting loop...", () => { })
//     while (true) {
//         let end_reached = false
//         const next = iterator.look()
//         if (next === null) {
//             end_reached = true
//         } else {
//                 current_state = callback(
//                     next[0],
//                     current_state,
//                     {
//                         'end reached': () => {
//                             end_reached = true
//                         }
//                     }
//                 )
//         }
//         if (end_reached) {
//             break
//         }
//     }
//     _pdev.log_debug_message("Loop ended.", () => { })
//     return current_state

// }


export const map_with_state = <Source_Element, Target_Element, State, Result_Type>(
    $: _pi.List<Source_Element>,
    initial_state: State,
    handle_value: (
        value: Source_Element,
        state: State
    ) => Target_Element,
    update_state: (
        value: Target_Element,
        state: State
    ) => State,
    wrapup: (
        final_list: _pi.List<Target_Element>,
        final_state: State
    ) => Result_Type,
): Result_Type => {
    let current_state = initial_state
    return wrapup(
        $.__l_map(($) => {
            const result = handle_value($, current_state)
            current_state = update_state(result, current_state)
            return result
        }),
        current_state
    )
}

type My_State = {
    'absolute': number
    'line': number
    'column': number
    'line indentation': number | null
    'found carriage return before': boolean
}

/**
 * Creates a string iterator that allows iterating over characters in a string,
 * while keeping track of line numbers, columns, and line indentation.
 */
export const Annotated_Characters: signatures.Annotated_Characters = ($, $p) => map_with_state(
    $,
    {
        'absolute': 0,
        'line': 0,
        'column': 0,
        'line indentation': null,
        'found carriage return before': false,
    } as My_State,
    (value, state) => ({
        'code': value,
        'location': {
            'absolute': state.absolute,
            'relative': {
                'document resource identifier': $p['document resource identifier'],
                'line': state.line,
                'column': state.column,
            }
        },
        'line indentation': state['line indentation'] !== null
            ? state['line indentation']
            : state.column,
    }),
    (value, state) => {
        return value.code === 0x0A /* line feed */
            ? {
                'absolute': state.absolute + 1,
                'line': state.line + 1,
                'column': 0,
                'line indentation': null,
                'found carriage return before': false,
            }
            : state['found carriage return before']
                ? {
                    'absolute': state.absolute + 1,
                    'line': state.line + 1,
                    'column': 0,
                    'line indentation': null,
                    'found carriage return before': false,
                }
                : {
                    'absolute': state.absolute + 1,
                    'line': state.line,
                    'column': state.column + (value.code === 0x09 /* tab */
                        ? $p['tab size']
                        : 1),
                    'line indentation': state['line indentation'] !== null
                        ? state['line indentation']
                        : value.code === 0x20 /* space */ || value.code === 0x09 /* tab */
                            ? null
                            : state.column,
                    'found carriage return before': value.code === 0x0D /* carriage return */,
                }
    },
    (final_list, final_state): d_annotated_characters.Annotated_Characters => final_list
)