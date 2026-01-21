import * as _p from 'pareto-core-transformer'
import * as _pi from 'pareto-core-interface'
import * as _ps from 'pareto-core-serializer'
import * as _pd from 'pareto-core-deserializer'

export const $$ = (
    $: string,
): string => _ps.text.deprecated_build(($i) => {
        _pd.list.from_text($, ($) => $).__for_each(($) => {
            switch ($) {
                case 0x2F: // slash (\/)
                    $i['add character'](0x5C) // \
                    $i['add character'](0x2F) // /
                    break
                case 0x22: // " (\")
                    $i['add character'](0x5C) // \
                    $i['add character'](0x22) // "
                    break
                case 0x5C: // \ (\\)
                    $i['add character'](0x5C) // \
                    $i['add character'](0x5C) // \
                    break
                case 0x08: // backspace (\b)
                    $i['add character'](0x5C) // \
                    $i['add character'](0x62) // b
                    break
                case 0x0C: // form feed (\f)
                    $i['add character'](0x5C) // \
                    $i['add character'](0x66) // f
                    break
                case 0x0A: // line feed (\n)
                    $i['add character'](0x5C) // \
                    $i['add character'](0x6E) // n
                    break
                case 0x0D: // carriage return (\r)
                    $i['add character'](0x5C) // \
                    $i['add character'](0x72) // r
                    break
                case 0x09: // horizontal tab (\t)
                    $i['add character'](0x5C) // \
                    $i['add character'](0x74) // t
                    break
                case 0x0B: // vertical tab (\v)
                    $i['add character'](0x5C) // \
                    $i['add character'](0x76) // v
                    break
                default: {
                   $i['add character']($)
                }
            }
        })
    })