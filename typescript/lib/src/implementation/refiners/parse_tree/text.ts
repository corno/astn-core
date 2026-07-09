import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'

//dependencies
import * as r_from_list_of_characters from "./list_of_characters.js"

import type * as interface_ from "../../../declarations/refiners/parse_tree/text.js"

export const Document: interface_.Document = ($, abort, $p) => {
    return r_from_list_of_characters.Document(
        p_list_from_text(
            $,
            ($) => $
        ),
        abort,
        $p,
    )
}