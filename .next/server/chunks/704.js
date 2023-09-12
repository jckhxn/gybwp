exports.id = 704;
exports.ids = [704];
exports.modules = {

/***/ 83619:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 31232, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 52987, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 50831, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 56926, 23));
Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 44282, 23))

/***/ }),

/***/ 62253:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 68258))

/***/ }),

/***/ 68258:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"src/app/layout.tsx","import":"Open_Sans","arguments":[{"subsets":["latin"],"weight":"variable"}],"variableName":"openSans"}
var layout_tsx_import_Open_Sans_arguments_subsets_latin_weight_variable_variableName_openSans_ = __webpack_require__(20227);
var layout_tsx_import_Open_Sans_arguments_subsets_latin_weight_variable_variableName_openSans_default = /*#__PURE__*/__webpack_require__.n(layout_tsx_import_Open_Sans_arguments_subsets_latin_weight_variable_variableName_openSans_);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(57114);
;// CONCATENATED MODULE: ./src/components/Layout/index.tsx


const Layout = ({ children })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "z-0 bg-white",
            children: children
        })
    });
};
Layout.background = "white";
/* harmony default export */ const components_Layout = (Layout);

// EXTERNAL MODULE: ./src/routes/index.tsx
var routes = __webpack_require__(23310);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(11440);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(52451);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./public/images/logo.png
var logo = __webpack_require__(29405);
;// CONCATENATED MODULE: ./src/components/Footer/static-data.tsx
// components

const footer = {
    companyLogo: logo/* default */.Z,
    incorporatedDate: 2023,
    currentYear: new Date().getFullYear(),
    linkedin: "https://www.linkedin.com/company/growing-your-business-with-people",
    facebook: "https://www.facebook.com/GYBWPpodcast",
    instagram: "https://www.instagram.com/growingyourbusinesswithpeople/",
    twitter: "https://twitter.com/GYBWPpodcast",
    tiktok: "https://www.tiktok.com/@gybwp",
    youtube: "https://www.youtube.com/@jkladvisors"
};

;// CONCATENATED MODULE: ./src/components/Footer/index.tsx



// components



// copy

const Footer = ()=>{
    const calculateDate = ()=>{
        if (footer.currentYear !== footer.incorporatedDate) {
            return `${footer.incorporatedDate}-${footer.currentYear}`;
        }
        return footer.incorporatedDate;
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("footer", {
        "aria-label": "Site Footer",
        className: "bg-white",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("nav", {
                "aria-label": "Footer Nav",
                className: "my-8 mx-8 md:mx-4 pt-16",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                    className: "flex flex-wrap justify-evenly gap-4 md:gap-0 items-center text-center",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "md:w-[12vw]",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                className: "text-gray-700 transition hover:text-gray-700/75",
                                href: routes/* default */.Z.internal.news,
                                children: "News"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "md:w-[12vw]",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                className: "text-gray-700 transition hover:text-gray-700/75",
                                href: routes/* default */.Z.internal.sponsors,
                                children: "Sponsors"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "md:w-[12vw]",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                className: "text-gray-700 transition hover:text-gray-700/75",
                                href: routes/* default */.Z.internal.consulting,
                                children: "Consulting"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "hidden lg:flex justify-center mx-2 w-[13vw] m-auto",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                href: routes/* default */.Z.internal.home,
                                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    priority: true,
                                    loading: "eager",
                                    src: logo/* default */.Z,
                                    alt: "logo",
                                    className: "w-24 h-auto"
                                })
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "md:w-[12vw]",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                className: "text-gray-700 transition hover:text-gray-700/75",
                                href: routes/* default */.Z.internal.tou,
                                children: "Terms of Use"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "md:w-[12vw]",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                className: "text-gray-700 transition hover:text-gray-700/75",
                                href: routes/* default */.Z.internal.privacy,
                                children: "Privacy"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("li", {
                            className: "md:w-[12vw]",
                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                className: "text-gray-700 transition hover:text-gray-700/75",
                                href: routes/* default */.Z.internal.consulting,
                                target: "_blank",
                                children: "JKL Advisors"
                            })
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "mx-auto max-w-5xl px-4 pb-6 sm:px-6 lg:px-8",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "border-t border-gray-300",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                        className: "mt-12 flex justify-center gap-6 md:gap-8",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                    href: footer.facebook,
                                    rel: "noreferrer",
                                    target: "_blank",
                                    className: "text-main transition hover:text-main/75",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "sr-only",
                                            children: "Facebook"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                            className: "h-6 w-6",
                                            fill: "currentColor",
                                            viewBox: "0 0 24 24",
                                            "aria-hidden": "true",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                fillRule: "evenodd",
                                                d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
                                                clipRule: "evenodd"
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                    href: footer.instagram,
                                    rel: "noreferrer",
                                    target: "_blank",
                                    className: "text-main transition hover:text-main/75",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "sr-only",
                                            children: "Instagram"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                            className: "h-6 w-6",
                                            fill: "currentColor",
                                            viewBox: "0 0 24 24",
                                            "aria-hidden": "true",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                fillRule: "evenodd",
                                                d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
                                                clipRule: "evenodd"
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                    href: footer.twitter,
                                    rel: "noreferrer",
                                    className: "text-main transition hover:text-main/75",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "sr-only",
                                            children: "Twitter"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                            className: "h-6 w-6",
                                            fill: "currentColor",
                                            viewBox: "0 0 24 24",
                                            "aria-hidden": "true",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                    href: footer.linkedin,
                                    rel: "noreferrer",
                                    target: "_blank",
                                    className: "text-main transition hover:text-main/75",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "sr-only",
                                            children: "LinkedIn"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            width: "24",
                                            height: "24",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                    href: footer.tiktok,
                                    rel: "noreferrer",
                                    target: "_blank",
                                    className: "text-main transition hover:text-main/75",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "sr-only",
                                            children: "TikTok"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                            width: "24",
                                            height: "24",
                                            viewBox: "0 0 512 512",
                                            id: "icons",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                d: "M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"
                                            })
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                                    href: footer.youtube,
                                    rel: "noreferrer",
                                    target: "_blank",
                                    className: "text-main transition hover:text-main/75",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "sr-only",
                                            children: "TikTok"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                            fill: "#000000",
                                            width: "24",
                                            height: "24",
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            "data-name": "Layer 1",
                                            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                d: "M23,9.71a8.5,8.5,0,0,0-.91-4.13,2.92,2.92,0,0,0-1.72-1A78.36,78.36,0,0,0,12,4.27a78.45,78.45,0,0,0-8.34.3,2.87,2.87,0,0,0-1.46.74c-.9.83-1,2.25-1.1,3.45a48.29,48.29,0,0,0,0,6.48,9.55,9.55,0,0,0,.3,2,3.14,3.14,0,0,0,.71,1.36,2.86,2.86,0,0,0,1.49.78,45.18,45.18,0,0,0,6.5.33c3.5.05,6.57,0,10.2-.28a2.88,2.88,0,0,0,1.53-.78,2.49,2.49,0,0,0,.61-1,10.58,10.58,0,0,0,.52-3.4C23,13.69,23,10.31,23,9.71ZM9.74,14.85V8.66l5.92,3.11C14,12.69,11.81,13.73,9.74,14.85Z"
                                            })
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "pb-16",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                    className: "text-center text-xs/relaxed text-gray-500",
                    children: [
                        "\xa9 JKL Advisors, LLC. ",
                        calculateDate(),
                        ". We love our subscribers!"
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const components_Footer = (Footer);

;// CONCATENATED MODULE: ./src/components/Header/static-data.tsx

const PAGES = [
    {
        name: "Home",
        url: routes/* default */.Z.internal.home
    },
    {
        name: "About",
        url: routes/* default */.Z.internal.about
    },
    {
        name: "Sponsors",
        url: routes/* default */.Z.internal.sponsors
    },
    {
        name: "Consulting",
        url: routes/* default */.Z.internal.consulting
    },
    {
        name: "News",
        url: routes/* default */.Z.internal.news
    }
];
const COPY = {
    buttonText: "Follow Us"
};

;// CONCATENATED MODULE: ./src/components/Header/index.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 


// components



// static data

const Navigation = ()=>{
    const [mobileNavOpen, setMobileNavOpen] = (0,react_.useState)(false);
    const handleMobileHamburgerClick = ()=>{
        setMobileNavOpen(!mobileNavOpen);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("header", {
        "aria-label": "Site Header",
        className: "bg-white pt-2",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex h-16 items-center justify-between",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex-1 md:flex md:items-center md:gap-12",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                            className: "flex",
                            href: routes/* default */.Z.internal.home,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "sr-only",
                                    children: "Home"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                    priority: true,
                                    loading: "eager",
                                    className: "h-16 w-auto",
                                    alt: "Growing Your Business with People Logo",
                                    src: logo/* default */.Z
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                    className: "self-center hidden ml-0 text-sm lg:text-xl md:block lg:ml-3",
                                    children: "Growing Your Business With People"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "md:flex md:items-center md:gap-12",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("nav", {
                                "aria-label": "Site Nav",
                                className: "hidden md:block",
                                children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                    className: "flex items-center gap-6 text-sm",
                                    children: PAGES.map(({ name, url })=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                            children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                className: "text-secondary transition hover:text-gray-500/75",
                                                href: url,
                                                children: name
                                            })
                                        }, name))
                                })
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "sm:flex sm:gap-4",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                            className: "rounded-md bg-main px-5 py-2.5 text-sm font-medium text-white shadow",
                                            href: routes/* default */.Z.external.follow,
                                            target: "_blank",
                                            children: COPY.buttonText
                                        })
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                        className: "block md:hidden relative",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                                                onClick: handleMobileHamburgerClick,
                                                className: "rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        className: "sr-only",
                                                        children: "Open Navigation Menu"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("svg", {
                                                        xmlns: "http://www.w3.org/2000/svg",
                                                        className: "h-5 w-5",
                                                        fill: "none",
                                                        viewBox: "0 0 24 24",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round",
                                                            d: "M4 6h16M4 12h16M4 18h16"
                                                        })
                                                    })
                                                ]
                                            }),
                                            mobileNavOpen && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                className: "absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg",
                                                role: "menu",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                    className: "p-2",
                                                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                                        className: "flow-root",
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("nav", {
                                                            "aria-label": "Millie Navigation",
                                                            className: "-my-2 flex flex-col divide-y divide-gray-100",
                                                            children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                                                                className: "space-y-1 py-2",
                                                                children: PAGES.map(({ name, url })=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                                        onClick: handleMobileHamburgerClick,
                                                                        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                                                            href: url,
                                                                            className: "block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-main",
                                                                            children: name
                                                                        }, name)
                                                                    }, name))
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const Header = (Navigation);

// EXTERNAL MODULE: ./node_modules/tailwindcss/tailwind.css
var tailwind = __webpack_require__(84597);
// EXTERNAL MODULE: ./dist/output.css
var output = __webpack_require__(84209);
;// CONCATENATED MODULE: ./src/app/layout.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 



// components



// styling


function RootLayout({ children }) {
    const Layout = components_Layout;
    const pathname = (0,navigation.usePathname)();
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("html", {
            lang: "en",
            children: /*#__PURE__*/ jsx_runtime_.jsx("body", {
                children: /*#__PURE__*/ jsx_runtime_.jsx(Layout, {
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
                        className: (layout_tsx_import_Open_Sans_arguments_subsets_latin_weight_variable_variableName_openSans_default()).className,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(Header, {}),
                            children,
                            /*#__PURE__*/ jsx_runtime_.jsx(components_Footer, {})
                        ]
                    })
                })
            })
        })
    });
}


/***/ }),

/***/ 23310:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
// DO NOT TOUCH THIS FILE UNLESS YOU'RE A DEV
const routes = {
    internal: {
        home: "/",
        about: "/about",
        podcastDetails: (podcastId)=>`/${podcastId}`,
        sponsors: "/sponsors",
        sponsorsDetails: (sponsorId)=>`/sponsors/${sponsorId}`,
        consulting: "/consulting",
        news: "/news",
        tou: "/tou",
        privacy: "/privacy",
        error: "/error"
    },
    external: {
        jkl: "https://jkladvisors.ai/",
        listen: "https://www.buzzsprout.com/2057493/share",
        subscribe: "https://www.youtube.com/channel/UC-G0WIwjMApKoHVQ5QxsdZw",
        follow: "https://www.linkedin.com/company/growing-your-business-with-people ",
        newsletter: "https://www.linkedin.com/newsletters/gybwp-newsletter-7049506606413213696/"
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (routes);


/***/ }),

/***/ 74053:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $$typeof: () => (/* binding */ $$typeof),
/* harmony export */   __esModule: () => (/* binding */ __esModule),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61363);

const proxy = (0,next_dist_build_webpack_loaders_next_flight_loader_module_proxy__WEBPACK_IMPORTED_MODULE_0__.createProxy)(String.raw`/Users/jack/Documents/Projects/js/jkl-gybwp/jkl-gybwp/src/app/layout.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__default__);

/***/ }),

/***/ 29405:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/logo.5d2042ae.png","height":3677,"width":3777,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAASFBMVEVHcEyro48AABZwaFmejm0hGhMcGhYAAAADAwADAwp0ShVoWEB5WCGNd0l8Zz6XkXzJvJtYRi+AcVnEtJBVVU+1poStppLGvqTcGCdtAAAAF3RSTlMA/gP+xl6XDU9MGPEXrY9WZLX7+/nnwAkSsP8AAAAJcEhZcwAAKJoAACiaARc6IbIAAAA7SURBVHicRYs3AsAgDMTubANp1BT//6dhQ4sWCVjUz8ox3VzpGRDjM/S9IF15uyUgnKSG2cge4ybr/QE4OgFpBdwkgAAAAABJRU5ErkJggg==","blurWidth":8,"blurHeight":8});

/***/ }),

/***/ 84209:
/***/ (() => {



/***/ })

};
;