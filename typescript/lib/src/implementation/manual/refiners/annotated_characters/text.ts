import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_ti from 'pareto-core/dist/interface/transformer'

import * as d_out from "../../../../interface/data/annotated_characters"
import * as d_in from "pareto-fountain-pen/dist/interface/generated/liana/schemas/list_of_characters/data"
import * as d_function from "../../../../interface/generated/liana/schemas/deserialize_parse_tree/data"

export namespace signatures {

    export type Annotated_Characters = p_ti.Transformer_With_Parameter<
        d_in.List_of_Characters,
        d_out.Annotated_Characters,
        d_function.Parameters
    >

}

type My_State = {
    'location': {
        'absolute': number
        'relative': {
            'line': number
            'column': number
        }
    },
    'line indentation': number | null
    'found carriage return before': boolean
}

/**
 * Creates a string iterator that allows iterating over characters in a string,
 * while keeping track of line numbers, columns, and line indentation.
 */
export const Annotated_Characters: signatures.Annotated_Characters = ($, $p) => p_.from.list($).map_with_state(
    {
        'location': {
            'absolute': 0,
            'relative': {
                'line': 0,
                'column': 0,
            }
        },
        'line indentation': null,
        'found carriage return before': false,
    } as My_State,
    (value, state) => ({
        'code': value,
        'location': state.location,
        'line indentation': state['line indentation'] !== null
            ? state['line indentation']
            : state.location.relative.column,
    }),
    (value, state) => {
        return value.code === 0x0A /* line feed */
            ? {
                'location': {
                    'absolute': state.location.absolute + 1,
                    'relative': {
                        'line': state.location.relative.line + 1,
                        'column': 0,
                    }
                },
                'line indentation': null,
                'found carriage return before': false,
            }
            : state['found carriage return before']
                ? {
                    'location': {
                        'absolute': state.location.absolute + 1,
                        'relative': {
                            'line': state.location.relative.line + 1,
                            'column': 0,
                        },
                    },

                    'line indentation': null,
                    'found carriage return before': false,
                }
                : {
                    'location': {
                        'absolute': state.location.absolute + 1,
                        'relative': {
                            'line': state.location.relative.line,
                            'column': state.location.relative.column + (value.code === 0x09 /* tab */
                                ? $p['tab size']
                                : 1),
                        }
                    },
                    'line indentation': state['line indentation'] !== null
                        ? state['line indentation']
                        : value.code === 0x20 /* space */ || value.code === 0x09 /* tab */
                            ? null
                            : state.location.relative.column,
                    'found carriage return before': value.code === 0x0D /* carriage return */,
                }
    },
    (final_list, final_state) => ({
        'characters': final_list,
        'end': final_state.location,
    })
)