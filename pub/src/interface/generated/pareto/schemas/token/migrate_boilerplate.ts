
import * as _pi from "pareto-core-interface"

import * as i_out from "./data"

import * as i_in from "./data"

export namespace Relative_Location_ {
    
    export type I = i_in.Relative_Location
    
    export type O = i_out.Relative_Location
    
    export namespace P {
        
    }
    
}

export type Relative_Location_ = (
    $$_: Relative_Location_.I,
) => Relative_Location_.O

export namespace Location_ {
    
    export type I = i_in.Location
    
    export type O = i_out.Location
    
    export namespace P {
        
    }
    
}

export type Location_ = (
    $$_: Location_.I,
) => Location_.O

export namespace Range_ {
    
    export type I = i_in.Range
    
    export type O = i_out.Range
    
    export namespace P {
        
    }
    
}

export type Range_ = (
    $$_: Range_.I,
) => Range_.O

export namespace Whitespace_ {
    
    export type I = i_in.Whitespace
    
    export type O = i_out.Whitespace
    
    export namespace P {
        
    }
    
}

export type Whitespace_ = (
    $$_: Whitespace_.I,
) => Whitespace_.O

export namespace Trivia_ {
    
    export type I = i_in.Trivia
    
    export type O = i_out.Trivia
    
    export namespace P {
        
    }
    
}

export type Trivia_ = (
    $$_: Trivia_.I,
) => Trivia_.O

export namespace Delimited_Text_ {
    
    export type I = i_in.Delimited_Text
    
    export type O = i_out.Delimited_Text
    
    export namespace P {
        
    }
    
}

export type Delimited_Text_ = (
    $$_: Delimited_Text_.I,
) => Delimited_Text_.O

export namespace Text_Type_ {
    
    export type I = i_in.Text_Type
    
    export type O = i_out.Text_Type
    
    export namespace P {
        
    }
    
}

export type Text_Type_ = (
    $$_: Text_Type_.I,
) => Text_Type_.O

export namespace Token_Type_ {
    
    export type I = i_in.Token_Type
    
    export type O = i_out.Token_Type
    
    export namespace P {
        
    }
    
}

export type Token_Type_ = (
    $$_: Token_Type_.I,
) => Token_Type_.O

export namespace Annotated_Token_ {
    
    export type I = i_in.Annotated_Token
    
    export type O = i_out.Annotated_Token
    
    export namespace P {
        
    }
    
}

export type Annotated_Token_ = (
    $$_: Annotated_Token_.I,
) => Annotated_Token_.O

export namespace Tokenizer_Result_ {
    
    export type I = i_in.Tokenizer_Result
    
    export type O = i_out.Tokenizer_Result
    
    export namespace P {
        
    }
    
}

export type Tokenizer_Result_ = (
    $$_: Tokenizer_Result_.I,
) => Tokenizer_Result_.O

export { 
    Relative_Location_ as Relative_Location, 
    Location_ as Location, 
    Range_ as Range, 
    Whitespace_ as Whitespace, 
    Trivia_ as Trivia, 
    Delimited_Text_ as Delimited_Text, 
    Text_Type_ as Text_Type, 
    Token_Type_ as Token_Type, 
    Annotated_Token_ as Annotated_Token, 
    Tokenizer_Result_ as Tokenizer_Result, 
}
