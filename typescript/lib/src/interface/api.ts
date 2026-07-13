import * as p_t from 'pareto-core/interface/transformer'
import * as p_r from 'pareto-core/interface/refiner'
import * as p_s from 'pareto-core/implementation/serializer'
import * as p_d from 'pareto-core/implementation/deserializer'

import * as s_deserialize from "./schemas/deserialize_parse_tree.js"
import * as s_full_value_range from "./schemas/full_value_range.js"
import * as s_parse_tree from "./schemas/parse_tree.js"
import * as s_sealed_target from "./schemas/sealed_target.js"
import * as s_serialize_prose from "./schemas/serialize_prose.js"
import * as s_start_token_range from "./schemas/start_token_range.js"
import * as s_unmarshall from "./schemas/unmarshall.js"
import * as s_unmarshalled from "./schemas/unmarshalled.js"

export type API = {
    'serializers': {
        'sealed target': {
            'Document': p_s.Serializer_With_Parameter<
                s_sealed_target.Document,
                s_serialize_prose.Parameters
            >
        },
        'deserialize parse tree': {
            'Error': p_s.Serializer_With_Parameter<
                s_deserialize.Error,
                s_serialize_prose.Parameters
            >
        },

    },
    'transformers': {
        'parse tree': {
            'full value range': {
                'Value': p_t.Transformer<
                    s_parse_tree.Value,
                    s_full_value_range.Range
                >
            },
            'start token range': {
                'Value': p_t.Transformer<
                    s_parse_tree.Value,
                    s_start_token_range.Range
                >
            },
        },
    },
    'deserializers': {
        'parse tree': {
            'Document': p_d.Deserializer_With_Parameter<
                s_parse_tree.Document,
                s_deserialize.Error,
                s_deserialize.Parameters
            >
        },

    },
    'refiners': {
        'unmarshalled': {
            'parse tree': {
                'Dictionary': p_r.Refiner<
                    s_unmarshalled.Dictionary,
                    s_unmarshall.Error,
                    s_parse_tree.Value
                >
                'List': p_r.Refiner<
                    s_unmarshalled.List,
                    s_unmarshall.Error,
                    s_parse_tree.Value
                >
                'Nothing': p_r.Refiner<
                    s_unmarshalled.Nothing,
                    s_unmarshall.Error,
                    s_parse_tree.Value
                >
                'Optional': p_r.Refiner<
                    s_unmarshalled.Optional,
                    s_unmarshall.Error,
                    s_parse_tree.Value
                >
                'State': p_r.Refiner<
                    s_unmarshalled.State,
                    s_unmarshall.Error,
                    s_parse_tree.Value
                >
                'Text': p_r.Refiner<
                    s_unmarshalled.Text,
                    s_unmarshall.Error,
                    s_parse_tree.Value
                >
                'Verbose Group': p_r.Refiner_With_Parameter<
                    s_unmarshalled.Verbose_Group,
                    s_unmarshall.Error,
                    s_parse_tree.Value,
                    s_unmarshall.Verbose_Group_Parameters
                >
            }
        }
    }
}