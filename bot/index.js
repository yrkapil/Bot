/* eslint-disable */
const add = (arg1, arg2) => {
    if (typeof(arg1) !== "number" || typeof(arg2) !== "number") return("Please input numbers to add!");
    return arg1 + arg2;
};
module.exports = add;