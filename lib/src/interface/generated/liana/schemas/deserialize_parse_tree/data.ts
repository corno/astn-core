
import * as _pi from 'pareto-core/dist/interface'

import * as i_imports_parse_tree from "../parse_tree/data"

import * as i_imports_token from "../token/data"

import * as i_imports_location from "../location/data"

export namespace Error_ {
    
    export namespace type_ {
        
        export type lexer = Lexer_Error_
        
        export type parser = Parser_Error_
        
    }
    
    export type type_ = 
        | readonly ['lexer', type_.lexer]
        | readonly ['parser', type_.parser]
    
}

export type Error_ = {
    readonly 'type': Error_.type_
}

export namespace Lexer_Error_ {
    
    export type range = i_imports_location.Range
    
    export namespace type_ {
        
        export namespace dangling_slash {
            
            export type at_end_of_input = boolean
            
        }
        
        export type invalid_unicode_escape_sequence = null
        
        export type missing_character_after_escape = null
        
        export namespace unexpected_control_character {
            
            export type character = number
            
        }
        
        export type unexpected_control_character = {
            readonly 'character': unexpected_control_character.character
        }
        
        export namespace unexpected_control_character_in_text {
            
            export type character = number
            
        }
        
        export type unexpected_control_character_in_text = {
            readonly 'character': unexpected_control_character_in_text.character
        }
        
        export type unexpected_end_of_line_in_delimited_text = null
        
        export namespace unknown_escape_character {
            
            export type character = number
            
        }
        
        export type unknown_escape_character = {
            readonly 'character': unknown_escape_character.character
        }
        
        export type unterminated_block_comment = null
        
        export type unterminated_text = null
        
        export type unterminated_unicode_escape_sequence = null
        
        export namespace unexpected {
            
            export namespace expected {
                
                export namespace L {
                    
                    export type end_of_block_comment = null
                    
                    export type end_of_delimited_text = null
                    
                }
                
                export type L = 
                    | readonly ['end of block comment', L.end_of_block_comment]
                    | readonly ['end of delimited text', L.end_of_delimited_text]
                
            }
            
            export type expected = _pi.List<expected.L>
            
        }
        
        export type unexpected = {
            readonly 'expected': unexpected.expected
        }
        
    }
    
    export type type_ = 
        | readonly ['invalid unicode escape sequence', type_.invalid_unicode_escape_sequence]
        | readonly ['missing character after escape', type_.missing_character_after_escape]
        | readonly ['unexpected control character', type_.unexpected_control_character]
        | readonly ['unexpected control character in text', type_.unexpected_control_character_in_text]
        | readonly ['unexpected end of line in delimited text', type_.unexpected_end_of_line_in_delimited_text]
        | readonly ['unknown escape character', type_.unknown_escape_character]
        | readonly ['unterminated block comment', type_.unterminated_block_comment]
        | readonly ['unterminated text', type_.unterminated_text]
        | readonly ['unterminated unicode escape sequence', type_.unterminated_unicode_escape_sequence]
        | readonly ['unexpected', type_.unexpected]
    
}

export type Lexer_Error_ = {
    readonly 'range': Lexer_Error_.range
    readonly 'type': Lexer_Error_.type_
}

export namespace Parser_Error_ {
    
    export namespace expected {
        
        export type L = Expected_
        
    }
    
    export type expected = _pi.List<expected.L>
    
    export namespace cause {
        
        export namespace missing_token {
            
            export type end = i_imports_location.Location
            
        }
        
        export type missing_token = {
            readonly 'end': missing_token.end
        }
        
        export namespace unexpected_token {
            
            export type found = i_imports_token.Annotated_Token
            
        }
        
        export type unexpected_token = {
            readonly 'found': unexpected_token.found
        }
        
    }
    
    export type cause = 
        | readonly ['missing token', cause.missing_token]
        | readonly ['unexpected token', cause.unexpected_token]
    
}

export type Parser_Error_ = {
    readonly 'expected': Parser_Error_.expected
    readonly 'cause': Parser_Error_.cause
}

export namespace Expected_ {
    
    export type a_text_value = null
    
    export type any_value = null
    
    export type $ex_ = null
    
    export type $gt_ = null
    
    export type $cc_ = null
    
    export type $at_ = null
    
    export type $cm_ = null
    
    export type $cl_ = null
    
    export type $pc_ = null
    
    export type $bc_ = null
    
    export type $ha_ = null
    
}

export type Expected_ = 
    | readonly ['a text value', Expected_.a_text_value]
    | readonly ['any value', Expected_.any_value]
    | readonly ['!', Expected_.$ex_]
    | readonly ['>', Expected_.$gt_]
    | readonly ['}', Expected_.$cc_]
    | readonly ['@', Expected_.$at_]
    | readonly [',', Expected_.$cm_]
    | readonly [':', Expected_.$cl_]
    | readonly [')', Expected_.$pc_]
    | readonly [']', Expected_.$bc_]
    | readonly ['#', Expected_.$ha_]

export namespace Parameters_ {
    
    export type tab_size = number
    
}

export type Parameters_ = {
    readonly 'tab size': Parameters_.tab_size
}

export { 
    Error_ as Error, 
    Lexer_Error_ as Lexer_Error, 
    Parser_Error_ as Parser_Error, 
    Expected_ as Expected, 
    Parameters_ as Parameters, 
}
