import { GitContributors } from "/Users/jenkin/Desktop/adminfyy.github.io/vdocs/node_modules/@vuepress/plugin-git/dist/client/components/GitContributors.js";
import { GitChangelog } from "/Users/jenkin/Desktop/adminfyy.github.io/vdocs/node_modules/@vuepress/plugin-git/dist/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
