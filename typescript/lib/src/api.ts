import * as interface_ from "./interface/api.js"

import * as t_sealed_target_to_list_of_characters from "./_implementation/transformers/sealed_target/list_of_characters.js"
import * as r_parse_tree_from_list_of_characters from "./_implementation/refiners/parse_tree/list_of_characters.js"

export const api: interface_.API = {
    'transformers': {
        'sealed target': {
            'list of characters': {
                'Document': t_sealed_target_to_list_of_characters.Document,
            }
        }
    },
    'refiners': {
        'parse tree': {
            'list of characters': {
                'Document': r_parse_tree_from_list_of_characters.Document,
            }
        }
    }
}