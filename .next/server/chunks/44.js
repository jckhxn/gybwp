"use strict";
exports.id = 44;
exports.ids = [44];
exports.modules = {

/***/ 73044:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var components_Socials_logos__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4258);
/* harmony import */ var components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(67404);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52451);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var components_shared__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(52346);



// components



//
//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV
const getLogo = (socialName)=>{
    // This also handles podcast links, ignore param name lol
    switch(socialName){
        case "apple":
            return components_Socials_logos__WEBPACK_IMPORTED_MODULE_2__/* .apple */ .W3.src;
        case "spotify":
            return components_Socials_logos__WEBPACK_IMPORTED_MODULE_2__/* .spotify */ .NA.src;
        case "google podcasts":
            return components_Socials_logos__WEBPACK_IMPORTED_MODULE_2__/* .google */ .lk.src;
        case "amazon music":
            return components_Socials_logos__WEBPACK_IMPORTED_MODULE_2__/* .amazon */ .cI.src;
        case "facebook":
            return components_Socials_logos__WEBPACK_IMPORTED_MODULE_2__/* .facebook */ .qv.src;
        case "linkedin":
            return components_Socials_logos__WEBPACK_IMPORTED_MODULE_2__/* .linkedin */ .kG.src;
        case "instagram":
            return components_Socials_logos__WEBPACK_IMPORTED_MODULE_2__/* .instagram */ .CR.src;
        case "more":
            return components_Socials_logos__WEBPACK_IMPORTED_MODULE_2__/* .more */ .Dk.src;
    }
};
const Socials = ({ socials, className: passedClasses })=>{
    const generateSocialIcon = ({ name, link, icon })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components_Button__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            as: "a",
            href: link,
            target: "_blank",
            color: "secondary",
            className: "rounded-full h-fit mx-2",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_4___default()), {
                className: "rounded-full h-fit",
                src: getLogo(name) || components_Socials_logos__WEBPACK_IMPORTED_MODULE_2__/* .home */ .LE.src,
                alt: `social-${name}`,
                height: 30,
                width: 30
            })
        }, `social-button${name}`);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(components_shared__WEBPACK_IMPORTED_MODULE_5__/* .Section */ .$0, {
        className: `flex flex-row mt-8 ${passedClasses}`,
        children: [
            ...socials,
            {
                name: "more",
                link: "https://www.buzzsprout.com/2057493/share",
                icon: components_Socials_logos__WEBPACK_IMPORTED_MODULE_2__/* .more */ .Dk.src
            }
        ].map((social)=>generateSocialIcon(social))
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Socials);


/***/ })

};
;