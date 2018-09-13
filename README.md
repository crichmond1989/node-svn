SVN Handles for node.
I got tired of all the spawn() calls needed to run our custom Continuous Integration server.

Usage
------

```console
npm install @crichmond/svn
```

```js
import svn from "@crichmond/svn";

const client = new svn({source: "C:/Repos/MyProject"});

const info = await client.info({ recursive: true });
const log = await client.log({ revision: 3003 });
```