
import * as _pi from 'pareto-core/dist/interface'

import * as i_out from "./data"

import * as i_in from "./data"

export namespace Error_ {
    
    export type I = i_in.Error
    
    export type O = i_out.Error
    
    export namespace P {
        
    }
    
}

export type Error_ = (
    context: Error_.I,
) => Error_.O

export namespace Lexer_Error_ {
    
    export type I = i_in.Lexer_Error
    
    export type O = i_out.Lexer_Error
    
    export namespace P {
        
    }
    
}

export type Lexer_Error_ = (
    context: Lexer_Error_.I,
) => Lexer_Error_.O

export namespace Parser_Error_ {
    
    export type I = i_in.Parser_Error
    
    export type O = i_out.Parser_Error
    
    export namespace P {
        
    }
    
}

export type Parser_Error_ = (
    context: Parser_Error_.I,
) => Parser_Error_.O

export namespace Expected_ {
    
    export type I = i_in.Expected
    
    export type O = i_out.Expected
    
    export namespace P {
        
    }
    
}

export type Expected_ = (
    context: Expected_.I,
) => Expected_.O

export namespace Parameters_ {
    
    export type I = i_in.Parameters
    
    export type O = i_out.Parameters
    
    export namespace P {
        
    }
    
}

export type Parameters_ = (
    context: Parameters_.I,
) => Parameters_.O

export { 
    Error_ as Error, 
    Lexer_Error_ as Lexer_Error, 
    Parser_Error_ as Parser_Error, 
    Expected_ as Expected, 
    Parameters_ as Parameters, 
}
