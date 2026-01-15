
import * as _pi from "pareto-core-interface"

import * as i_out from "./data"

import * as i_in from "./data"

export namespace Structural_Token_ {
    
    export type I = i_in.Structural_Token
    
    export type O = i_out.Structural_Token
    
    export namespace P {
        
    }
    
}

export type Structural_Token_ = (
    $$_: Structural_Token_.I,
) => Structural_Token_.O

export namespace Text_ {
    
    export type I = i_in.Text
    
    export type O = i_out.Text
    
    export namespace P {
        
    }
    
}

export type Text_ = (
    $$_: Text_.I,
) => Text_.O

export namespace Key_Value_Pairs_ {
    
    export type I = i_in.Key_Value_Pairs
    
    export type O = i_out.Key_Value_Pairs
    
    export namespace P {
        
    }
    
}

export type Key_Value_Pairs_ = (
    $$_: Key_Value_Pairs_.I,
) => Key_Value_Pairs_.O

export namespace Elements_ {
    
    export type I = i_in.Elements
    
    export type O = i_out.Elements
    
    export namespace P {
        
    }
    
}

export type Elements_ = (
    $$_: Elements_.I,
) => Elements_.O

export namespace Value_ {
    
    export type I = i_in.Value
    
    export type O = i_out.Value
    
    export namespace P {
        
    }
    
}

export type Value_ = (
    $$_: Value_.I,
) => Value_.O

export namespace Content_ {
    
    export type I = i_in.Content
    
    export type O = i_out.Content
    
    export namespace P {
        
    }
    
}

export type Content_ = (
    $$_: Content_.I,
) => Content_.O

export namespace Document_ {
    
    export type I = i_in.Document
    
    export type O = i_out.Document
    
    export namespace P {
        
    }
    
}

export type Document_ = (
    $$_: Document_.I,
) => Document_.O

export { 
    Structural_Token_ as Structural_Token, 
    Text_ as Text, 
    Key_Value_Pairs_ as Key_Value_Pairs, 
    Elements_ as Elements, 
    Value_ as Value, 
    Content_ as Content, 
    Document_ as Document, 
}
