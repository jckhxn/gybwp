"use strict";
exports.id = 346;
exports.ids = [346];
exports.modules = {

/***/ 52346:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $0: () => (/* binding */ Section),
/* harmony export */   OT: () => (/* binding */ SectionHeading)
/* harmony export */ });
/* unused harmony export generateImage */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Section = ({ children, relative = false, flex = false, className: passedClasses = "", style = {}, innerRef, id })=>{
    const defaultClasses = flex ? "flex flex-col items-center" : "";
    const relativeClasses = relative ? "relative" : "";
    const classes = `${defaultClasses} ${passedClasses} ${relativeClasses}`;
    if (innerRef) {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
            id: id,
            className: classes,
            style: style,
            ref: innerRef,
            children: children
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
        id: id,
        className: classes,
        style: style,
        children: children
    });
};
const SectionHeading = ({ children, className = "" })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
        className: `${className} text-2xl md:text-4xl`,
        children: children
    });
const generateImage = ({ text, foregroundColor = "#000000", backgroundColor = "#F2F2F3", width = 300, height = 170 })=>{
    if (false) {}
    return "";
};


/***/ })

};
;