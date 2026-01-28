import * as _pi from 'pareto-core/dist/interface'

export type Annotated_Character = {
    'code': number
    'location': {
        absolute: number
        relative: {
            'document resource identifier': string
            'line': number
            'column': number
        }
    }
    'line indentation': number
}

export type Annotated_Characters = _pi.List<Annotated_Character>