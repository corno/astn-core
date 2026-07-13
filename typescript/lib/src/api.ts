import * as interface_ from "./interface/api.js"

import * as r_parse_tree_from_list_of_characters from "./_implementation/refiners/parse_tree/list_of_characters.js"
import * as r_unmarshalled_from_parse_tree from "./_implementation/refiners/unmarshalled/parse_tree.js"
import * as t_deserialize_parse_tree_to_list_of_characters from "./_implementation/serializers/deserialize_parse_tree.js"
import * as t_parse_tree_to_full_value_range from "./_implementation/transformers/parse_tree/full_value_range.js"
import * as t_parse_tree_to_start_token_range from "./_implementation/transformers/parse_tree/start_token_range.js"
import * as t_sealed_target_to_list_of_characters from "./_implementation/serializers/sealed_target.js"

export const api: interface_.API = {
    'serializers': {
        'deserialize parse tree': {
            'Error': t_deserialize_parse_tree_to_list_of_characters.Error,
        },
        'sealed target': {
            'Document': t_sealed_target_to_list_of_characters.Document,
        },

    },
    'transformers': {
        'parse tree': {
            'full value range': {
                'Value': t_parse_tree_to_full_value_range.Value,
            },
            'start token range': {
                'Value': t_parse_tree_to_start_token_range.Value,
            },
        },

    },
    'refiners': {
        'parse tree': {
            'list of characters': {
                'Document': r_parse_tree_from_list_of_characters.Document,
            }
        },
        'unmarshalled': {
            'parse tree': {
                'Dictionary': r_unmarshalled_from_parse_tree.Dictionary,
                'State': r_unmarshalled_from_parse_tree.State,
                'Verbose Group': r_unmarshalled_from_parse_tree.Verbose_Group,
                'List': r_unmarshalled_from_parse_tree.List,
                'Optional': r_unmarshalled_from_parse_tree.Optional,
                'Nothing': r_unmarshalled_from_parse_tree.Nothing,
                'Text': r_unmarshalled_from_parse_tree.Text,
            }
        }
    }
}