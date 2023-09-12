"use strict";
exports.id = 452;
exports.ids = [452];
exports.modules = {

/***/ 30452:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ components_FeaturedNews)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(52451);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./src/components/shared/index.tsx
var shared = __webpack_require__(52346);
// EXTERNAL MODULE: ./public/images/logo.png
var logo = __webpack_require__(29405);
;// CONCATENATED MODULE: ./src/components/FeaturedNews/static-data.tsx
const NEWS_INFO = {
    header: "In The News"
};

// EXTERNAL MODULE: ./src/components/Pages/News/static-data.tsx
var static_data = __webpack_require__(51722);
// EXTERNAL MODULE: ./node_modules/swr/core/dist/index.mjs + 1 modules
var dist = __webpack_require__(97146);
// EXTERNAL MODULE: ./node_modules/next-sanity/dist/client.js + 12 modules
var client = __webpack_require__(35123);
// EXTERNAL MODULE: ./node_modules/groq/node/groq.mjs
var groq = __webpack_require__(91669);
;// CONCATENATED MODULE: ./src/components/FeaturedNews/index.tsx
// @ts-nocheck
/* __next_internal_client_entry_do_not_use__ default auto */ 

// components



// copy


// SWR


const FeaturedNews_client = (0,client/* createClient */.e)({
    projectId: "hxymd1na",
    dataset: "production",
    apiVersion: "2023-08-22",
    useCdn: false
});
const FeaturedNews = ({ color = "light" })=>{
    const [featuredArticles, setFeaturedArticles] = (0,react_.useState)();
    const { data, error, isLoading } = (0,dist/* default */.ZP)(groq/* default */.Z`*[_type == "featuredArticle"]`, (query)=>FeaturedNews_client.fetch(query));
    (0,react_.useEffect)(()=>{
        if (!isLoading) {
            const featuredArticles = Object.keys(data).map(function(property) {
                return data[property];
            });
            setFeaturedArticles(featuredArticles);
        }
    }, [
        data,
        isLoading
    ]);
    // const featuredArticles = store.getState().featuredArticles;
    // const featuredArticlesArray = (
    //   Object.keys(featuredArticles) as Array<keyof typeof featuredArticles>
    // ).map(function (property) {
    //   return featuredArticles[property];
    // });
    if (static_data/* FEATURED_ARTICLES */.t.length) {
        const fontColor = color === "light" ? "black" : "white";
        return /*#__PURE__*/ jsx_runtime_.jsx(shared/* Section */.$0, {
            className: `${color === "light" ? "bg-light" : "bg-secondary"}`,
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "mx-auto max-w-lg text-center",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(shared/* SectionHeading */.OT, {
                            className: `text-3xl font-thin sm:text-4xl text-${fontColor}`,
                            children: NEWS_INFO.header
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3",
                        children: featuredArticles?.map(({ company, title, description, link, image }, idx)=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
                                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                    href: link,
                                    target: "_blank",
                                    className: "block rounded-md p-4 text-center group",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                                            height: 224,
                                            width: 450,
                                            alt: `featured article by ${company}`,
                                            src: image || logo/* default */.Z,
                                            className: "h-56 w-full rounded-sm object-cover"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                            className: "mt-8",
                                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("dl", {
                                                children: [
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                                className: "sr-only",
                                                                children: "Title"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                                className: `font-bold pb-2 text-${fontColor} group-hover:text-${color === "light" ? "black" : "white"}`,
                                                                children: title
                                                            })
                                                        ]
                                                    }),
                                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                        children: [
                                                            /*#__PURE__*/ jsx_runtime_.jsx("dt", {
                                                                className: "sr-only",
                                                                children: "Description"
                                                            }),
                                                            /*#__PURE__*/ jsx_runtime_.jsx("dd", {
                                                                className: `text-sm text-gray-${color === "light" ? "500" : "300"} group-hover:text-${color === "light" ? "black" : "white"}`,
                                                                children: description
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                })
                            }, `article-${idx}`))
                    })
                ]
            })
        });
    }
};
/* harmony default export */ const components_FeaturedNews = (FeaturedNews);


/***/ }),

/***/ 51722:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ FEATURED_ARTICLES),
/* harmony export */   w: () => (/* binding */ ARTICLES)
/* harmony export */ });
// ONLY THREE articles, no more.
const FEATURED_ARTICLES = [
    {
        company: "CEO Weekly",
        title: "Jeff Lackey and JKL Advisors Lead the Way in Developing a People-First Culture for Business Success",
        description: "CEO Weekly",
        imgSrc: "https://ceoweekly.com/wp-content/uploads/2023/06/Jeff-Lackey.png",
        linkUrl: "https://ceoweekly.com/jeff-lackey-and-jkl-advisors-lead-the-way-in-developing-a-people-first-culture-for-business-success/",
        date: "June 1st, 2023"
    },
    {
        company: "Linkedin",
        title: "Vaccinating our Communities: How CVS Health is staffing our pharmacies to answer the call",
        description: "Linkedin",
        imgSrc: "https://media.licdn.com/dms/image/C4E12AQFuhtL6Pv8sTw/article-cover_image-shrink_600_2000/0/1618242033635?e=1695254400&v=beta&t=9Nu08DxoQgFeNIC6k_syqR9P0zH1VNPfNIhgeSf8PAQ",
        linkUrl: "https://www.linkedin.com/pulse/vaccinating-our-communities-how-cvs-health-staffing-answer-lackey/",
        date: "May 15th, 2023"
    },
    {
        company: "The Wall Street Journal",
        title: "U.S. Hiring Alliances Help Tens of Thousands Find Jobs",
        description: "The Wall Street Journal",
        imgSrc: "https://images.wsj.net/im-300896/8SR",
        linkUrl: "https://www.wsj.com/articles/u-s-hiring-alliances-help-tens-of-thousands-find-jobs-11613743200",
        date: "Feb 19th, 2021"
    }
];
// As many as you want
const ARTICLES = [
    {
        company: "Forbes",
        title: "What Is An Internship And How Do You Land One?",
        description: "",
        imgSrc: "",
        linkUrl: "https://www.forbes.com/sites/williamarruda/2023/06/13/what-is-an-internship-and-how-do-you-land-one/?sh=13c221bb7a80",
        date: "Jun 13rd, 2023"
    },
    {
        company: "Recruiting Future",
        title: "Building The Business Case for TA Technology",
        description: "",
        imgSrc: "",
        linkUrl: "https://recruitingfuture.com/2023/06/ep-526-building-the-business-case-for-ta-technology/",
        date: "Jun 2nd, 2023"
    },
    {
        company: "CEO Weekly",
        title: "Jeff Lackey and JKL Advisors Lead the Way in Developing a People-First Culture for Business Success",
        description: "CEO Weekly",
        imgSrc: "https://ceoweekly.com/wp-content/uploads/2023/06/Jeff-Lackey.png",
        linkUrl: "https://ceoweekly.com/jeff-lackey-and-jkl-advisors-lead-the-way-in-developing-a-people-first-culture-for-business-success/",
        date: "June 1st, 2023"
    },
    {
        company: "Linkedin",
        title: "Vaccinating our Communities: How CVS Health is staffing our pharmacies to answer the call",
        description: "Linkedin",
        imgSrc: "https://media.licdn.com/dms/image/C4E12AQFuhtL6Pv8sTw/article-cover_image-shrink_600_2000/0/1618242033635?e=1695254400&v=beta&t=9Nu08DxoQgFeNIC6k_syqR9P0zH1VNPfNIhgeSf8PAQ",
        linkUrl: "https://www.linkedin.com/pulse/vaccinating-our-communities-how-cvs-health-staffing-answer-lackey/",
        date: "May 15th, 2023"
    },
    {
        company: "The Chad & The Cheese Podcast",
        title: "The People MBA",
        description: "",
        imgSrc: "",
        linkUrl: "https://www.chadcheese.com/post/the-people-mba",
        date: "Mar 6th, 2023"
    },
    {
        company: "The Wall Street Journal",
        title: "U.S. Hiring Alliances Help Tens of Thousands Find Jobs",
        description: "The Wall Street Journal",
        imgSrc: "https://images.wsj.net/im-300896/8SR",
        linkUrl: "https://www.wsj.com/articles/u-s-hiring-alliances-help-tens-of-thousands-find-jobs-11613743200",
        date: "Feb 19th, 2021"
    },
    {
        company: "LHH",
        title: "How the Pandemic is Changing the Rules of Talent Management",
        description: "",
        imgSrc: "",
        linkUrl: "https://www.lhh.com/us/en/insights/how-the-pandemic-is-changing-the-rules-of-talent-management/",
        date: "Aug 9th, 2020"
    },
    {
        company: "HR Dive",
        title: "We went virtual 'almost overnight': How CVS hired nearly 50K amid COVID-19",
        description: "",
        imgSrc: "",
        linkUrl: "https://www.hrdive.com/news/we-went-virtual-almost-overnight-how-cvs-hired-nearly-50k-amid-covid-19/577659/",
        date: "May 11th, 2020"
    },
    {
        company: "The Wall Street Journal",
        title: "50,000 Jobs, 900,000 Resumes: Coronavirus Is Redeploying Workers at Record Pace",
        description: "",
        imgSrc: "",
        linkUrl: "https://www.wsj.com/articles/inside-the-push-to-redeploy-workers-quickly-11586943000",
        date: "April 15th, 2020"
    },
    {
        company: "The Wall Street Journal",
        title: "Yes, You're Hired. No, We Don't Need to Meet You First.",
        description: "",
        imgSrc: "",
        linkUrl: "https://www.wsj.com/articles/youre-hired-no-we-dont-need-to-meet-you-first-1542298757",
        date: "Nov 15th, 2018"
    }
];


/***/ })

};
;