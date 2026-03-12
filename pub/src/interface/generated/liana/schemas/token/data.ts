
import * as _pi from 'pareto-core/dist/interface'

import * as i__imports_location from "../location/data"

export namespace Tokenizer_Result_ {
    
    export type leading_trivia = Trivia_
    
    export namespace tokens {
        
        export type L = Annotated_Token_
        
    }
    
    export type tokens = _pi.List<tokens.L>
    
    export type end = i__imports_location.Location
    
}

export type Tokenizer_Result_ = {
    readonly 'leading trivia': Tokenizer_Result_.leading_trivia
    readonly 'tokens': Tokenizer_Result_.tokens
    readonly 'end': Tokenizer_Result_.end
}

export namespace Annotated_Token_ {
    
    export type start = i__imports_location.Location
    
    export namespace type_ {
        
        export type $ex_ = null
        
        export type $at_ = null
        
        export type $cl_ = null
        
        export type $ha_ = null
        
        export type $co_ = null
        
        export type $cc_ = null
        
        export type $bo_ = null
        
        export type $bc_ = null
        
        export type $po_ = null
        
        export type $pc_ = null
        
        export type $st_ = null
        
        export type $gt_ = null
        
        export type $ti_ = null
        
        export type $sr_ = null
        
        export type $vb_ = null
        
        export type text = Text_
        
    }
    
    export type type_ = 
        | readonly ['!', type_.$ex_]
        | readonly ['@', type_.$at_]
        | readonly [':', type_.$cl_]
        | readonly ['#', type_.$ha_]
        | readonly ['{', type_.$co_]
        | readonly ['}', type_.$cc_]
        | readonly ['[', type_.$bo_]
        | readonly [']', type_.$bc_]
        | readonly ['(', type_.$po_]
        | readonly [')', type_.$pc_]
        | readonly ['<', type_.$st_]
        | readonly ['>', type_.$gt_]
        | readonly ['~', type_.$ti_]
        | readonly ['*', type_.$sr_]
        | readonly ['|', type_.$vb_]
        | readonly ['text', type_.text]
    
    export type end = i__imports_location.Location
    
    export type trailing_trivia = Trivia_
    
}

export type Annotated_Token_ = {
    readonly 'start': Annotated_Token_.start
    readonly 'type': Annotated_Token_.type_
    readonly 'end': Annotated_Token_.end
    readonly 'trailing trivia': Annotated_Token_.trailing_trivia
}

export namespace Whitespace_ {
    
    export namespace O {
        
        export type range = i__imports_location.Range
        
        export type value = string
        
    }
    
    export type O = {
        readonly 'range': O.range
        readonly 'value': O.value
    }
    
}

export type Whitespace_ = _pi.Optional_Value<Whitespace_.O>

export namespace Trivia_ {
    
    export type leading_whitespace = Whitespace_
    
    export namespace comments {
        
        export namespace L {
            
            export namespace type_ {
                
                export type line = null
                
                export type block = null
                
            }
            
            export type type_ = 
                | readonly ['line', type_.line]
                | readonly ['block', type_.block]
            
            export type content = string
            
            export type range = i__imports_location.Range
            
            export type trailing_whitespace = Whitespace_
            
        }
        
        export type L = {
            readonly 'type': L.type_
            readonly 'content': L.content
            readonly 'range': L.range
            readonly 'trailing whitespace': L.trailing_whitespace
        }
        
    }
    
    export type comments = _pi.List<comments.L>
    
}

export type Trivia_ = {
    readonly 'leading whitespace': Trivia_.leading_whitespace
    readonly 'comments': Trivia_.comments
}

export namespace Text_ {
    
    export type value = string
    
    export type type_ = Text_Type_
    
}

export type Text_ = {
    readonly 'value': Text_.value
    readonly 'type': Text_.type_
}

export namespace Text_Type_ {
    
    export type quoted = null
    
    export type apostrophed = null
    
    export type undelimited = null
    
    export type backticked = null
    
}

export type Text_Type_ = 
    | readonly ['quoted', Text_Type_.quoted]
    | readonly ['apostrophed', Text_Type_.apostrophed]
    | readonly ['undelimited', Text_Type_.undelimited]
    | readonly ['backticked', Text_Type_.backticked]

export { 
    Tokenizer_Result_ as Tokenizer_Result, 
    Annotated_Token_ as Annotated_Token, 
    Whitespace_ as Whitespace, 
    Trivia_ as Trivia, 
    Text_ as Text, 
    Text_Type_ as Text_Type, 
}
