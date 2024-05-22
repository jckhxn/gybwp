import * as queryStore from "@sanity/react-loader";

import { client } from "@/src/app/(website)/sanity/sanity-utils";
import { token } from "@/src/app/(website)/lib/token";

queryStore.setServerClient(client.withConfig({ token }));

export const { loadQuery } = queryStore;
