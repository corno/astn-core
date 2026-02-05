import * as _p from 'pareto-core/dist/expression'
import * as _pi from 'pareto-core/dist/interface'
import _p_list_build_deprecated from 'pareto-core/dist/_p_list_build_deprecated'
import _p_list_from_text from 'pareto-core/dist/_p_list_from_text'
import _p_text_from_list from 'pareto-core/dist/_p_text_from_list'

//data types
import * as d_out from "pareto-fountain-pen/dist/interface/to_be_generated/list_of_characters"

export const $$ = (
    $: string,
): d_out.List_of_Characters => _p.list.flatten(
    _p.list.map(
        _p_list_from_text($, ($) => $),
        ($): _pi.List<number> => {
            switch ($) {
                case 0x2F: // slash (\/)
                    return _p.list.literal([
                        0x5c, // \
                        0x2f, // /
                    ])
                case 0x22: // " (\")
                    return _p.list.literal([
                        0x5C, // \
                        0x22, // "
                    ])
                case 0x5C: // \ (\\)
                    return _p.list.literal([
                        0x5C, // \
                        0x5C, // \
                    ])
                case 0x08: // backspace (\b)
                    return _p.list.literal([
                        0x5C, // \
                        0x62, // b
                    ])
                case 0x0C: // form feed (\f)
                    return _p.list.literal([
                        0x5C, // \
                        0x66, // f
                    ])
                case 0x0A: // line feed (\n)
                    return _p.list.literal([
                        0x5C, // \
                        0x6E, // n
                    ])
                case 0x0D: // carriage return (\r)
                    return _p.list.literal([
                        0x5C, // \
                        0x72, // r
                    ])
                case 0x09: // horizontal tab (\t)
                    return _p.list.literal([
                        0x5C, // \
                        0x74, // t
                    ])
                case 0x0B: // vertical tab (\v)
                    return _p.list.literal([
                        0x5C, // \
                        0x76, // v
                    ])
                default: {
                    return _p.list.literal([
                        $,
                    ])
                }
            }
        }
    ),
    ($) => $,
)