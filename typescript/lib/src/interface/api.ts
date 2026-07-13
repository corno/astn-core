import * as p_t from 'pareto-core/interface/transformer'
import * as p_r from 'pareto-core/interface/refiner'

import * as s_sealed_target from "./schemas/sealed_target.js"
import * as s_list_of_characters from "./schemas/list_of_characters.js"
import * as s_serialize_prose from "./schemas/serialize_prose.js"
import * as s_parse_tree from "./schemas/parse_tree.js"
import * as s_deserialize from "./schemas/deserialize_parse_tree.js"

export type API = {
    'transformers': {
        'sealed target': {
            'list of characters': {
                Document: p_t.Transformer_With_Parameter<
                    s_sealed_target.Document,
                    s_list_of_characters.List_of_Characters,
                    s_serialize_prose.Parameters
                >
            }
        }
    },
    'refiners': {
        'parse tree': {
            'list of characters': {
                Document: p_r.Refiner_With_Parameter<
                    s_parse_tree.Document,
                    s_deserialize.Error,
                    s_list_of_characters.List_of_Characters,
                    s_deserialize.Parameters
                >
            }
        }
    }
}