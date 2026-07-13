import * as p_t from 'pareto-core/interface/transformer'
import * as p_r from 'pareto-core/interface/refiner'
import * as p_s from 'pareto-core/implementation/serializer'


export type API = {
    'serializers': {
        'sealed target': {
            'Document': p_s.Serializer<
                import("./schemas/sealed_target.js").Document
            >
        },
        'deserialize parse tree': {
            'Error': p_s.Serializer<
                import("./schemas/parse_tree_deserialization.js").Error
            >
        },
        'location': {
            'Range': p_s.Serializer_With_Parameter<
                import("./schemas/location.js").Range,
                import("./schemas/location_serialization.js").Parameters
            >
            'Possible Range': p_s.Serializer_With_Parameter<
                import("./schemas/location.js").Possible_Range,
                import("./schemas/location_serialization.js").Parameters
            >
        }

    },
    'transformers': {
        'parse tree': {
            'full value range': {
                'Value': p_t.Transformer<
                    import("./schemas/parse_tree.js").Value,
                    import("./schemas/full_value_range.js").Range
                >
            },
            'start token range': {
                'Value': p_t.Transformer<
                    import("./schemas/parse_tree.js").Value,
                    import("./schemas/start_token_range.js").Range
                >
            },
        },
        'parse tree deserialization': {
            'location': {
                'Error': p_t.Transformer<
                    import("./schemas/parse_tree_deserialization.js").Error,
                    import("./schemas/location.js").Possible_Range
                >
            }
        }
    },
    'refiners': {
        'parse tree': {
            'list of characters': {

                'Document': p_r.Refiner_With_Parameter<
                    import("./schemas/parse_tree.js").Document,
                    import("./schemas/parse_tree_deserialization.js").Error,
                    import("./schemas/list_of_characters.js").List_Of_Characters,
                    import("./schemas/parse_tree_deserialization.js").Parameters
                >
            }
        },
        'unmarshalled': {
            'parse tree': {
                'Dictionary': p_r.Refiner<
                    import("./schemas/unmarshalled.js").Dictionary,
                    import("./schemas/unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value
                >
                'List': p_r.Refiner<
                    import("./schemas/unmarshalled.js").List,
                    import("./schemas/unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value
                >
                'Nothing': p_r.Refiner<
                    import("./schemas/unmarshalled.js").Nothing,
                    import("./schemas/unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value
                >
                'Optional': p_r.Refiner<
                    import("./schemas/unmarshalled.js").Optional,
                    import("./schemas/unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value
                >
                'State': p_r.Refiner<
                    import("./schemas/unmarshalled.js").State,
                    import("./schemas/unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value
                >
                'Text': p_r.Refiner<
                    import("./schemas/unmarshalled.js").Text,
                    import("./schemas/unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value
                >
                'Verbose Group': p_r.Refiner_With_Parameter<
                    import("./schemas/unmarshalled.js").Verbose_Group,
                    import("./schemas/unmarshalling.js").Error,
                    import("./schemas/parse_tree.js").Value,
                    import("./schemas/unmarshalling.js").Verbose_Group_Parameters
                >
            }
        }
    }
}