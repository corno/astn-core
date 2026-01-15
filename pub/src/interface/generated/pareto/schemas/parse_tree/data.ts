
import * as _pi from "pareto-core-interface"

import * as i__location from "../../core/location"

import * as i__imports_token from "../token/data"

export namespace Structural_Token_ {
    
    export type trailing_trivia = i__imports_token.Trivia
    
    export type range = i__imports_token.Range
    
}

export type Structural_Token_ = {
    readonly 'trailing trivia': Structural_Token_.trailing_trivia
    readonly 'range': Structural_Token_.range
}

export namespace Text_ {
    
    export type trailing_trivia = i__imports_token.Trivia
    
    export type range = i__imports_token.Range
    
    export type value = string
    
    export type _type = i__imports_token.Text_Type
    
}

export type Text_ = {
    readonly 'trailing trivia': Text_.trailing_trivia
    readonly 'range': Text_.range
    readonly 'value': Text_.value
    readonly 'type': Text_._type
}

export namespace Key_Value_Pairs_ {
    
    export namespace L {
        
        export type key = Text_
        
        export namespace value {
            
            export namespace O {
                
                export type $cl_ = Structural_Token_
                
                export type value = Value_
                
            }
            
            export type O = {
                readonly ':': O.$cl_
                readonly 'value': O.value
            }
            
        }
        
        export type value = _pi.Optional_Value<value.O>
        
    }
    
    export type L = {
        readonly 'key': L.key
        readonly 'value': L.value
    }
    
}

export type Key_Value_Pairs_ = _pi.List<Key_Value_Pairs_.L>

export namespace Elements_ {
    
    export namespace L {
        
        export type value = Value_
        
    }
    
    export type L = {
        readonly 'value': L.value
    }
    
}

export type Elements_ = _pi.List<Elements_.L>

export namespace Value_ {
    
    export namespace _type {
        
        export namespace concrete {
            
            export namespace dictionary {
                
                export type $co_ = Structural_Token_
                
                export type entries = Key_Value_Pairs_
                
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
                    
                    export type elements = Elements_
                    
                    export type $gt_ = Structural_Token_
                    
                }
                
                export type concise = {
                    readonly '<': concise.$st_
                    readonly 'elements': concise.elements
                    readonly '>': concise.$gt_
                }
                
                export namespace verbose {
                    
                    export type $po_ = Structural_Token_
                    
                    export type entries = Key_Value_Pairs_
                    
                    export type $pc_ = Structural_Token_
                    
                }
                
                export type verbose = {
                    readonly '(': verbose.$po_
                    readonly 'entries': verbose.entries
                    readonly ')': verbose.$pc_
                }
                
            }
            
            export type group = 
                | readonly ['concise', group.concise]
                | readonly ['verbose', group.verbose]
            
            export namespace list {
                
                export type $bo_ = Structural_Token_
                
                export type elements = Elements_
                
                export type $bc_ = Structural_Token_
                
            }
            
            export type list = {
                readonly '[': list.$bo_
                readonly 'elements': list.elements
                readonly ']': list.$bc_
            }
            
            export namespace nothing {
                
                export type $ti_ = Structural_Token_
                
            }
            
            export type nothing = {
                readonly '~': nothing.$ti_
            }
            
            export namespace optional {
                
                export namespace _set {
                    
                    export type $sr_ = Structural_Token_
                    
                    export type value = Value_
                    
                }
                
                export type _set = {
                    readonly '*': _set.$sr_
                    readonly 'value': _set.value
                }
                
            }
            
            export type optional = 
                | readonly ['set', optional._set]
            
            export namespace state_group {
                
                export type $vb_ = Structural_Token_
                
                export namespace status {
                    
                    export namespace missing_data {
                        
                        export type $ha_ = Structural_Token_
                        
                    }
                    
                    export type missing_data = {
                        readonly '#': missing_data.$ha_
                    }
                    
                    export namespace _set {
                        
                        export type state = Text_
                        
                        export type value = Value_
                        
                    }
                    
                    export type _set = {
                        readonly 'state': _set.state
                        readonly 'value': _set.value
                    }
                    
                }
                
                export type status = 
                    | readonly ['missing data', status.missing_data]
                    | readonly ['set', status._set]
                
            }
            
            export type state_group = {
                readonly '|': state_group.$vb_
                readonly 'status': state_group.status
            }
            
            export type text = Text_
            
        }
        
        export type concrete = 
            | readonly ['dictionary', concrete.dictionary]
            | readonly ['group', concrete.group]
            | readonly ['list', concrete.list]
            | readonly ['nothing', concrete.nothing]
            | readonly ['optional', concrete.optional]
            | readonly ['state group', concrete.state_group]
            | readonly ['text', concrete.text]
        
        export namespace include {
            
            export type $at_ = Structural_Token_
            
            export type path = Text_
            
        }
        
        export type include = {
            readonly '@': include.$at_
            readonly 'path': include.path
        }
        
        export namespace missing_data {
            
            export type $ha_ = Structural_Token_
            
        }
        
        export type missing_data = {
            readonly '#': missing_data.$ha_
        }
        
    }
    
    export type _type = 
        | readonly ['concrete', _type.concrete]
        | readonly ['include', _type.include]
        | readonly ['missing data', _type.missing_data]
    
}

export type Value_ = {
    readonly 'type': Value_._type
}

export type Content_ = Value_

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
    
    export type header = _pi.Optional_Value<header.O>
    
    export type content = Content_
    
}

export type Document_ = {
    readonly 'header': Document_.header
    readonly 'content': Document_.content
}

export { 
    Structural_Token_ as Structural_Token, 
    Text_ as Text, 
    Key_Value_Pairs_ as Key_Value_Pairs, 
    Elements_ as Elements, 
    Value_ as Value, 
    Content_ as Content, 
    Document_ as Document, 
}
