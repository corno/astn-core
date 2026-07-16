
import * as p_di from 'pareto-core/interface/schema'

export type Document_ = Value_

export namespace Value_ {
    
    export namespace list {
        
        export type L = Value_
        
    }
    
    export type list = p_di.List<list.L>
    
    export namespace dictionary {
        
        export type D = Value_
        
    }
    
    export type dictionary = p_di.Dictionary<dictionary.D>
    
    export namespace group {
        
        export namespace verbose {
            
            export type D = Value_
            
        }
        
        export type verbose = p_di.Dictionary<verbose.D>
        
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
    
    export namespace state {
        
        export type option = string
        
        export type value = Value_
        
    }
    
    export type state = {
        readonly 'option': state.option
        readonly 'value': state.value
    }
    
    export namespace text {
        
        export type value = string
        
        export namespace delimiter {
            
            export type none = null
            
            export type quote = null
            
            export type apostrophe = null
            
        }
        
        export type delimiter = 
            | readonly ['none', delimiter.none]
            | readonly ['quote', delimiter.quote]
        
    }
    
    export type text = {
        readonly 'value': text.value
        readonly 'delimiter': text.delimiter
    }
    export type reference = {
        readonly 'value': string
    }
    
}

export type Value_ = 
    | readonly ['list', Value_.list]
    | readonly ['dictionary', Value_.dictionary]
    | readonly ['group', Value_.group]
    | readonly ['nothing', Value_.nothing]
    | readonly ['optional', Value_.optional]
    | readonly ['state', Value_.state]
    | readonly ['text', Value_.text]
    | readonly ['reference', Value_.reference]

export type { 
    Document_ as Document, 
    Value_ as Value, 
}
