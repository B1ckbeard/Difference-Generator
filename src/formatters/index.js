import stylishDiff from "./stylish.js";
import plainDiff from "./plain.js";
import jsonDiff from "./json.js";

const selectFormat = (data, format) => {
    switch (format) {
        case 'stylish':
            return `{\n${stylishDiff(data)}\n}`;
        case 'plain':
            return plainDiff(data);
        case 'json':
            return jsonDiff(data);
        default:
            throw Error(`Unknown format: ${format}`);
    };
}
export default selectFormat;