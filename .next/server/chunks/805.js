"use strict";
exports.id = 805;
exports.ids = [805];
exports.modules = {

/***/ 42805:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85893);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(41664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



const Button = ({ children, onClick: handleClick, as, href, target, rel, color = "main", type = "default", className: passedClasses = "" })=>{
    let fontStyle = color === "white" ? "text-black" : "text-white";
    let bgColor;
    let bgHoverColor;
    switch(color){
        case "main":
            bgColor = "bg-main";
            bgHoverColor = "hover:bg-main/80";
            break;
        case "primary":
            bgColor = "bg-primary";
            bgHoverColor = "hover:bg-primary/80";
            break;
        case "secondary":
            bgColor = "bg-secondary";
            bgHoverColor = "hover:bg-secondary/80";
            break;
        case "white":
            bgColor = "bg-white";
            bgHoverColor = "hover:bg-white/80";
            break;
        default:
            bgColor = "bg-main";
            bgHoverColor = "hover:bg-main/80";
            break;
    }
    let disabledStyle = "";
    if (type === "disabled") {
        bgColor = `bg-white`;
        bgHoverColor = `hover:bg-white/80`;
        fontStyle = "black";
        disabledStyle = "border border-grey border-1 !cursor-not-allowed";
    }
    const button = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        disabled: type === "disabled",
        onClick: handleClick,
        className: `inline-block rounded ${bgColor} text-sm ${fontStyle} transition ${bgHoverColor} ${passedClasses} ${disabledStyle}`,
        children: children
    });
    if (as === "a") {
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
            href: href || "/",
            target: target,
            rel: rel,
            onClick: handleClick,
            className: "w-fit",
            children: button
        });
    }
    return button;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);


/***/ })

};
;