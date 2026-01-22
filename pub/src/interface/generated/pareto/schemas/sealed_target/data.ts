
import * as _pi from "pareto-core/dist/interface"

import * as i__location from "../../core/location"

export namespace Value_ {
    
    export namespace list {
        
        export type L = Value_
        
    }
    
    export type list = _pi.List<list.L>
    
    export namespace dictionary {
        
        export type D = Value_
        
    }
    
    export type dictionary = _pi.Dictionary<dictionary.D>
    
    export namespace group {
        
        export namespace verbose {
            
            export type D = Value_
            
        }
        
        export type verbose = _pi.Dictionary<verbose.D>
        
    }
    
    export type group = 
        | readonly ['verbose', group.verbose]
    
    export type nothing = null
    
    export namespace optional {
        
        export type not_set = null
        
        export type set_ = Value_
        
    }
    
    export type optional = 
        | readonly ['not set', optional.not_set]
        | readonly ['set', optional.set_]
    
    export namespace state_group {
        
        export type state = string
        
        export type value = Value_
        
    }
    
    export type state_group = {
        readonly 'state': state_group.state
        readonly 'value': state_group.value
    }
    
    export namespace text {
        
        export type value = string
        
        export namespace delimiter {
            
            export type none = null
            
            export type quote = null
            
            export type backtick = null
            
        }
        
        export type delimiter = 
            | readonly ['none', delimiter.none]
            | readonly ['quote', delimiter.quote]
            | readonly ['backtick', delimiter.backtick]
        
    }
    
    export type text = {
        readonly 'value': text.value
        readonly 'delimiter': text.delimiter
    }
    
}

export type Value_ = 
    | readonly ['list', Value_.list]
    | readonly ['dictionary', Value_.dictionary]
    | readonly ['group', Value_.group]
    | readonly ['nothing', Value_.nothing]
    | readonly ['optional', Value_.optional]
    | readonly ['state group', Value_.state_group]
    | readonly ['text', Value_.text]

export type Document_ = Value_

export { 
    Value_ as Value, 
    Document_ as Document, 
}
