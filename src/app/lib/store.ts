import * as queryStore from "@sanity/react-loader";

import { client } from "@/src/app/sanity/sanity-utils";
import { token } from "@/src/app/lib/token";

queryStore.setServerClient(client.withConfig({ token }));

export const { loadQuery } = queryStore;
