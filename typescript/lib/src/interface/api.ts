import * as p_t from 'pareto-core/interface/transformer'
import * as p_r from 'pareto-core/interface/refiner'
import * as p_s from 'pareto-core/implementation/serializer'


export type API = {
    'deserialization': {
        'serializers': {
            'parse tree deserialization': {
                'Error': p_s.Serializer<
                    import("../modules/deserialization/schemas/parse_tree_deserialization.js").Error
                >
            },
            'location': {
                'Range': p_s.Serializer_With_Parameter<
                    import("../modules/deserialization/schemas/location.js").Range,
                    import("../modules/deserialization/schemas/location_serialization.js").Parameters
                >
                'Possible Range': p_s.Serializer_With_Parameter<
                    import("../modules/deserialization/schemas/location.js").Possible_Range,
                    import("../modules/deserialization/schemas/location_serialization.js").Parameters
                >
            }
        },
        'transformers': {
            'parse tree': {
                'full value range': {
                    'Value': p_t.Transformer<
                        import("../modules/deserialization/schemas/parse_tree.js").Value,
                        import("../modules/deserialization/schemas/full_value_range.js").Range
                    >
                },
                'start token range': {
                    'Value': p_t.Transformer<
                        import("../modules/deserialization/schemas/parse_tree.js").Value,
                        import("../modules/deserialization/schemas/start_token_range.js").Range
                    >
                },
            },
            'parse tree deserialization': {
                'location': {
                    'Error': p_t.Transformer<
                        import("../modules/deserialization/schemas/parse_tree_deserialization.js").Error,
                        import("../modules/deserialization/schemas/location.js").Possible_Range
                    >
                }
            },
        },
        'refiners': {
            'parse tree': {
                'list of characters': {
                    'Document': p_r.Refiner_With_Parameter<
                        import("../modules/deserialization/schemas/parse_tree.js").Document,
                        import("../modules/deserialization/schemas/parse_tree_deserialization.js").Error,
                        import("../modules/deserialization/schemas/list_of_characters.js").List_Of_Characters,
                        import("../modules/deserialization/schemas/parse_tree_deserialization.js").Parameters
                    >
                }
            },
        }

    },
    'serialization': {
        'transformers': {
            'sealed target': {
                'serialized paragraph': {
                    'Document': p_t.Transformer_With_Parameter<
                        import("../modules/serialization/schemas/sealed_target.js").Document,
                        import("../modules/serialization/schemas/serialized_paragraph.js").Lines,
                        import("../modules/serialization/schemas/paragraph_serialization.js").Parameters
                    >
                }
            },

        },

    },
    'unmarshalling': {
        'serializers': {
            'value unmarshalling': {
                'Error': p_s.Serializer<
                    import("../modules/unmarshalling/schemas/value_unmarshalling.js").Error
                >
            }
        },
        'refiners': {
            'unmarshalled value': {
                'parse tree': {
                    'Dictionary': p_r.Refiner<
                        import("../modules/unmarshalling/schemas/unmarshalled_value.js").Dictionary,
                        import("../modules/unmarshalling/schemas/value_unmarshalling.js").Error,
                        import("../modules/unmarshalling/schemas/parse_tree.js").Value
                    >
                    'List': p_r.Refiner<
                        import("../modules/unmarshalling/schemas/unmarshalled_value.js").List,
                        import("../modules/unmarshalling/schemas/value_unmarshalling.js").Error,
                        import("../modules/unmarshalling/schemas/parse_tree.js").Value
                    >
                    'Nothing': p_r.Refiner<
                        import("../modules/unmarshalling/schemas/unmarshalled_value.js").Nothing,
                        import("../modules/unmarshalling/schemas/value_unmarshalling.js").Error,
                        import("../modules/unmarshalling/schemas/parse_tree.js").Value
                    >
                    'Optional': p_r.Refiner<
                        import("../modules/unmarshalling/schemas/unmarshalled_value.js").Optional,
                        import("../modules/unmarshalling/schemas/value_unmarshalling.js").Error,
                        import("../modules/unmarshalling/schemas/parse_tree.js").Value
                    >
                    'State': p_r.Refiner<
                        import("../modules/unmarshalling/schemas/unmarshalled_value.js").State,
                        import("../modules/unmarshalling/schemas/value_unmarshalling.js").Error,
                        import("../modules/unmarshalling/schemas/parse_tree.js").Value
                    >
                    'Text': p_r.Refiner<
                        import("../modules/unmarshalling/schemas/unmarshalled_value.js").Text,
                        import("../modules/unmarshalling/schemas/value_unmarshalling.js").Error,
                        import("../modules/unmarshalling/schemas/parse_tree.js").Value
                    >
                    'Verbose Group': p_r.Refiner_With_Parameter<
                        import("../modules/unmarshalling/schemas/unmarshalled_value.js").Verbose_Group,
                        import("../modules/unmarshalling/schemas/value_unmarshalling.js").Error,
                        import("../modules/unmarshalling/schemas/parse_tree.js").Value,
                        import("../modules/unmarshalling/schemas/value_unmarshalling.js").Verbose_Group_Parameters
                    >
                }
            }

        }
    },
}