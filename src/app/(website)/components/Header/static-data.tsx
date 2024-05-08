import routes from "@/src/app/(website)/routes";

export const PAGES = [
  { name: "Home", url: routes.internal.home },
  { name: "About", url: routes.internal.about },
  { name: "Sponsors", url: routes.internal.sponsors },
  { name: "Consulting", url: routes.internal.consulting },
  { name: "News", url: routes.internal.news },
];

export const COPY = {
  buttonText: "Follow Us",
};
