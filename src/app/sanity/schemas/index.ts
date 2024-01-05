import article from "./articleSchema";
import episode from "./episodeSchema";
import featuredArticle from "./featuredArticlesSchema";
import { season } from "./seasonSchema";

import sponsor from "./sponsorSchema";

const schemas = [episode, sponsor, article, featuredArticle];
export default schemas;
