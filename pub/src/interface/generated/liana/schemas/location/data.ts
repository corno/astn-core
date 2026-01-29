
import * as _pi from "pareto-core/dist/interface"

export namespace Relative_Location_ {
    
    export type document_resource_identifier = string
    
    export type line = number
    
    export type column = number
    
}

export type Relative_Location_ = {
    readonly 'document resource identifier': Relative_Location_.document_resource_identifier
    readonly 'line': Relative_Location_.line
    readonly 'column': Relative_Location_.column
}

export namespace Location_ {
    
    export type relative = Relative_Location_
    
    export type absolute = number
    
}

export type Location_ = {
    readonly 'relative': Location_.relative
    readonly 'absolute': Location_.absolute
}

export namespace Range_ {
    
    export type start = Location_
    
    export type end = Location_
    
}

export type Range_ = {
    readonly 'start': Range_.start
    readonly 'end': Range_.end
}

export { 
    Relative_Location_ as Relative_Location, 
    Location_ as Location, 
    Range_ as Range, 
}
