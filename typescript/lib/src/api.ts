import * as interface_ from "./interface/api.js"

import * as r_parse_tree_from_list_of_characters from "./_implementation/refiners/parse_tree/list_of_characters.js"
import * as r_unmarshalled_from_parse_tree from "./_implementation/refiners/unmarshalled/parse_tree.js"
import * as ser_deserialize_parse_tree from "./_implementation/serializers/parse_tree_deserialization.js"
import * as ser_location from "./_implementation/serializers/location.js"
import * as t_sealed_target_to_paragraph_lines from "./_implementation/transformers/sealed_target/paragraph_lines.js"
import * as ser_value_unmarshalling from "./_implementation/serializers/value_unmarshalling.js"
import * as t_parse_tree_deserialization_to_location from "./_implementation/transformers/parse_tree_deserialization/location.js"
import * as t_parse_tree_to_full_value_range from "./_implementation/transformers/parse_tree/full_value_range.js"
import * as t_parse_tree_to_start_token_range from "./_implementation/transformers/parse_tree/start_token_range.js"

export const api: interface_.API = {
    'serializers': {
        'parse tree deserialization': {
            'Error': ser_deserialize_parse_tree.Error,
        },
        'location': {
            'Range': ser_location.Range,
            'Possible Range': ser_location.Possible_Range,
        },
        'value unmarshalling': {
            'Error': ser_value_unmarshalling.Error,
        }

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
        'parse tree deserialization': {
            'location': {
                'Error': t_parse_tree_deserialization_to_location.Error,
            }
        },
        'sealed target': {
            'paragraph lines': {

                'Document': t_sealed_target_to_paragraph_lines.Document,
            }
        },

    },
    'refiners': {
        'parse tree': {
            'list of characters': {
                'Document': r_parse_tree_from_list_of_characters.Document,
            }
        },
        'unmarshalled value': {
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