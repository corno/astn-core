
import * as _pi from "pareto-core-interface"

import * as i_out from "./data"

import * as i_in from "./data"

export namespace Lexer_Error_ {
    
    export type I = i_in.Lexer_Error
    
    export type O = i_out.Lexer_Error
    
    export namespace P {
        
    }
    
}

export type Lexer_Error_ = (
    $$_: Lexer_Error_.I,
) => Lexer_Error_.O

export namespace Expected_ {
    
    export type I = i_in.Expected
    
    export type O = i_out.Expected
    
    export namespace P {
        
    }
    
}

export type Expected_ = (
    $$_: Expected_.I,
) => Expected_.O

export namespace Parser_Error_ {
    
    export type I = i_in.Parser_Error
    
    export type O = i_out.Parser_Error
    
    export namespace P {
        
    }
    
}

export type Parser_Error_ = (
    $$_: Parser_Error_.I,
) => Parser_Error_.O

export namespace Error_ {
    
    export type I = i_in.Error
    
    export type O = i_out.Error
    
    export namespace P {
        
    }
    
}

export type Error_ = (
    $$_: Error_.I,
) => Error_.O

export { 
    Lexer_Error_ as Lexer_Error, 
    Expected_ as Expected, 
    Parser_Error_ as Parser_Error, 
    Error_ as Error, 
}
