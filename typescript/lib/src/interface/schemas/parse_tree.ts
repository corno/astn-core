
import * as p_di from 'pareto-core/interface/schema'

import * as i_imports_token from "./token.js"

import * as i_imports_location from "./location.js"

export namespace Document_ {
    
    export namespace header {
        
        export namespace O {
            
            export type $ex_ = Structural_Token_
            
            export type value = Value_
            
        }
        
        export type O = {
            readonly '!': O.$ex_
            readonly 'value': O.value
        }
        
    }
    
    export type header = p_di.Optional_Value<header.O>
    
    export type content = Content_
    
}

export type Document_ = {
    readonly 'header': Document_.header
    readonly 'content': Document_.content
}

export type Content_ = Value_

export namespace Value_ {
    
    export namespace type_ {
        
        export namespace concrete {
            
            export namespace dictionary {
                
                export type $co_ = Structural_Token_
                
                export type entries = ID_Value_Pairs_
                
                export type $cc_ = Structural_Token_
                
            }
            
            export type dictionary = {
                readonly '{': dictionary.$co_
                readonly 'entries': dictionary.entries
                readonly '}': dictionary.$cc_
            }
            
            export namespace group {
                
                export namespace concise {
                    
                    export type $st_ = Structural_Token_
                    
                    export type properties = Items_
                    
                    export type $gt_ = Structural_Token_
                    
                }
                
                export type concise = {
                    readonly '<': concise.$st_
                    readonly 'properties': concise.properties
                    readonly '>': concise.$gt_
                }
                
                export namespace verbose {
                    
                    export type $po_ = Structural_Token_
                    
                    export type properties = ID_Value_Pairs_
                    
                    export type $pc_ = Structural_Token_
                    
                }
                
                export type verbose = {
                    readonly '(': verbose.$po_
                    readonly 'properties': verbose.properties
                    readonly ')': verbose.$pc_
                }
                
            }
            
            export type group = 
                | readonly ['concise', group.concise]
                | readonly ['verbose', group.verbose]
            
            export namespace list {
                
                export type $bo_ = Structural_Token_
                
                export type items = Items_
                
                export type $bc_ = Structural_Token_
                
            }
            
            export type list = {
                readonly '[': list.$bo_
                readonly 'items': list.items
                readonly ']': list.$bc_
            }
            
            export namespace nothing {
                
                export type $ti_ = Structural_Token_
                
            }
            
            export type nothing = {
                readonly '~': nothing.$ti_
            }
            
            export namespace optional {
                
                export namespace set_ {
                    
                    export type $sr_ = Structural_Token_
                    
                    export type value = Value_
                    
                }
                
                export type set_ = {
                    readonly '*': set_.$sr_
                    readonly 'value': set_.value
                }
                
                export namespace not_set {
                    
                    export type $_ = Structural_Token_
                    
                }
                
                export type not_set = {
                    readonly '_': not_set.$_
                }
                
            }
            
            export type optional = 
                | readonly ['set', optional.set_]
                | readonly ['not set', optional.not_set]
            
            export namespace state {
                
                export type $vb_ = Structural_Token_
                
                export namespace status {
                    
                    export namespace missing {
                        
                        export type $ha_ = Structural_Token_
                        
                    }
                    
                    export type missing = {
                        readonly '#': missing.$ha_
                    }
                    
                    export namespace set_ {
                        
                        export type option = Text_
                        
                        export type value = Value_
                        
                    }
                    
                    export type set_ = {
                        readonly 'option': set_.option
                        readonly 'value': set_.value
                    }
                    
                }
                
                export type status = 
                    | readonly ['missing', status.missing]
                    | readonly ['set', status.set_]
                
            }
            
            export type state = {
                readonly '|': state.$vb_
                readonly 'status': state.status
            }
            
            export type text = Text_
            
        }
        
        export type concrete = 
            | readonly ['dictionary', concrete.dictionary]
            | readonly ['group', concrete.group]
            | readonly ['list', concrete.list]
            | readonly ['nothing', concrete.nothing]
            | readonly ['optional', concrete.optional]
            | readonly ['state', concrete.state]
            | readonly ['text', concrete.text]
        
        export type include = Include_
        
        export namespace missing {
            
            export type $ha_ = Structural_Token_
            
        }
        
        export type missing = {
            readonly '#': missing.$ha_
        }
        
    }
    
    export type type_ = 
        | readonly ['concrete', type_.concrete]
        | readonly ['include', type_.include]
        | readonly ['missing', type_.missing]
    
}

export type Value_ = {
    readonly 'type': Value_.type_
}

export namespace Include_ {
    
    export type $at_ = Structural_Token_
    
    export type path = Text_
    
}

export type Include_ = {
    readonly '@': Include_.$at_
    readonly 'path': Include_.path
}

export namespace Structural_Token_ {
    
    export type trailing_trivia = i_imports_token.Trivia
    
    export type range = i_imports_location.Range
    
}

export type Structural_Token_ = {
    readonly 'trailing trivia': Structural_Token_.trailing_trivia
    readonly 'range': Structural_Token_.range
}

export namespace Text_ {
    
    export type trailing_trivia = i_imports_token.Trivia
    
    export type range = i_imports_location.Range
    
    export type token = i_imports_token.Text
    
}

export type Text_ = {
    readonly 'trailing trivia': Text_.trailing_trivia
    readonly 'range': Text_.range
    readonly 'token': Text_.token
}

export namespace ID_Value_Pairs_ {
    
    export type L = ID_Value_Pair_
    
}

export type ID_Value_Pairs_ = p_di.List<ID_Value_Pairs_.L>

export namespace ID_Value_Pair_ {
    
    export type id = Text_
    
    export namespace assignment {
        
        export namespace O {
            
            export type $cl_ = Structural_Token_
            
            export namespace value {
                
                export type O = Value_
                
            }
            
            export type value = p_di.Optional_Value<value.O>
            
        }
        
        export type O = {
            readonly ':': O.$cl_
            readonly 'value': O.value
        }
        
    }
    
    export type assignment = p_di.Optional_Value<assignment.O>
    
}

export type ID_Value_Pair_ = {
    readonly 'id': ID_Value_Pair_.id
    readonly 'assignment': ID_Value_Pair_.assignment
}

export namespace Items_ {
    
    export namespace L {
        
        export type value = Value_
        
    }
    
    export type L = {
        readonly 'value': L.value
    }
    
}

export type Items_ = p_di.List<Items_.L>

export type { 
    Document_ as Document, 
    Content_ as Content, 
    Value_ as Value, 
    Include_ as Include, 
    Structural_Token_ as Structural_Token, 
    Text_ as Text, 
    ID_Value_Pairs_ as ID_Value_Pairs, 
    ID_Value_Pair_ as ID_Value_Pair, 
    Items_ as Items, 
}
