
import * as _pi from "pareto-core/dist/interface"

import * as i__imports_parse_tree from "../parse_tree/data"

import * as i__imports_token from "../token/data"

import * as i__imports_location from "../location/data"

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
    
    export namespace dangling_slash {
        
        export type range = i__imports_location.Range
        
        export type at_end_of_input = boolean
        
    }
    
    export type dangling_slash = {
        readonly 'range': dangling_slash.range
        readonly 'at end of input': dangling_slash.at_end_of_input
    }
    
    export namespace invalid_unicode_escape_sequence {
        
        export type range = i__imports_location.Range
        
    }
    
    export type invalid_unicode_escape_sequence = {
        readonly 'range': invalid_unicode_escape_sequence.range
    }
    
    export namespace missing_character_after_escape {
        
        export type range = i__imports_location.Range
        
    }
    
    export type missing_character_after_escape = {
        readonly 'range': missing_character_after_escape.range
    }
    
    export namespace unexpected_control_character {
        
        export type character = number
        
        export type location = i__imports_location.Location
        
    }
    
    export type unexpected_control_character = {
        readonly 'character': unexpected_control_character.character
        readonly 'location': unexpected_control_character.location
    }
    
    export namespace unexpected_control_character_in_text {
        
        export type character = number
        
        export type range = i__imports_location.Range
        
    }
    
    export type unexpected_control_character_in_text = {
        readonly 'character': unexpected_control_character_in_text.character
        readonly 'range': unexpected_control_character_in_text.range
    }
    
    export namespace unexpected_end_of_line_in_delimited_text {
        
        export type range = i__imports_location.Range
        
    }
    
    export type unexpected_end_of_line_in_delimited_text = {
        readonly 'range': unexpected_end_of_line_in_delimited_text.range
    }
    
    export namespace unknown_escape_character {
        
        export type character = number
        
        export type range = i__imports_location.Range
        
    }
    
    export type unknown_escape_character = {
        readonly 'character': unknown_escape_character.character
        readonly 'range': unknown_escape_character.range
    }
    
    export namespace unterminated_block_comment {
        
        export type range = i__imports_location.Range
        
    }
    
    export type unterminated_block_comment = {
        readonly 'range': unterminated_block_comment.range
    }
    
    export namespace unterminated_text {
        
        export type range = i__imports_location.Range
        
    }
    
    export type unterminated_text = {
        readonly 'range': unterminated_text.range
    }
    
    export namespace unterminated_unicode_escape_sequence {
        
        export type range = i__imports_location.Range
        
    }
    
    export type unterminated_unicode_escape_sequence = {
        readonly 'range': unterminated_unicode_escape_sequence.range
    }
    
}

export type Lexer_Error_ = 
    | readonly ['dangling slash', Lexer_Error_.dangling_slash]
    | readonly ['invalid unicode escape sequence', Lexer_Error_.invalid_unicode_escape_sequence]
    | readonly ['missing character after escape', Lexer_Error_.missing_character_after_escape]
    | readonly ['unexpected control character', Lexer_Error_.unexpected_control_character]
    | readonly ['unexpected control character in text', Lexer_Error_.unexpected_control_character_in_text]
    | readonly ['unexpected end of line in delimited text', Lexer_Error_.unexpected_end_of_line_in_delimited_text]
    | readonly ['unknown escape character', Lexer_Error_.unknown_escape_character]
    | readonly ['unterminated block comment', Lexer_Error_.unterminated_block_comment]
    | readonly ['unterminated text', Lexer_Error_.unterminated_text]
    | readonly ['unterminated unicode escape sequence', Lexer_Error_.unterminated_unicode_escape_sequence]

export namespace Parser_Error_ {
    
    export namespace expected {
        
        export type L = Expected_
        
    }
    
    export type expected = _pi.List<expected.L>
    
    export namespace cause {
        
        export type missing_token = null
        
        export namespace unexpected_token {
            
            export type found = i__imports_token.Annotated_Token
            
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

export { 
    Error_ as Error, 
    Lexer_Error_ as Lexer_Error, 
    Parser_Error_ as Parser_Error, 
    Expected_ as Expected, 
}
