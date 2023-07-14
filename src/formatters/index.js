import stylishDiff from "./stylish.js";
import plainDiff from "./plain.js";

const selectFormat = (data, format) => {
    switch (format) {
        case 'stylish':
            return `{\n${stylishDiff(data)}\n}`;
        case 'plain':
            return plainDiff(data);
        default:
            throw Error(`Unknown format: ${format}`);
    };
}
export default selectFormat;