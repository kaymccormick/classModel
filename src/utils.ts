/**
 * @uuid 47ebd5aa-f442-4264-ac8a-bca30cd35cb6
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getFieldNames, getFieldValue, eachField, namedTypes } from "ast-types";

import { Map, List } from "immutable";
type ValueKind = any | any[];

//namedTypes.Node | namedTypes.Node[] | string | Map<string, {}> | Map<string, {}>[];
export function copyTree(node: namedTypes.Node): Map<string, ValueKind> {
    let out: Map<string, ValueKind> = Map();

    eachField(node, (name, value): void => {
        if (Array.isArray(value)) {
            if (typeof value[0] === "string") {
                //instanceof namedTypes.Node) {
                throw new Error("unexpected string type");
            }

            if (value.length > 0) {
                if (value[0].constructor && value[0].constructor.name === "Node") {
                    const x = List(
                        value.map((elem: namedTypes.Node): Map<string, ValueKind> => copyTree(elem))
                    );

                    out = out.set(name, x);
                }
            } else {
                out = out.set(name, value);
            }
        } else if (value && value.constructor && value.constructor.name === "Node") {
            out = out.set(name, copyTree(value));
        } else if (value && value.type) {
            out = out.set(name, copyTree(value));
        } else {
            {
                out = out.set(name, value);
            }
        }
    });

    return out;
}