# @crichmond1989/svn

NodeJS wrapper for SVN.

## Preconditions

* SVN client installed
* SVN client in PATH

[Apache Subversion Packages](https://subversion.apache.org/packages.html)

### CentOS

```console
yum install subversion
```

### Mac OS X

```console
brew options subversion
brew install (OPTIONS) subversion
```

### Ubuntu

```console
apt-get install subversion
```

### Windows

[TortoiseSVN](https://tortoisesvn.net/downloads.html)

## Usage

```console
npm install @crichmond1989/svn
```

Local and remote projects use the `source` property.

### Local

```js
import Svn from "@crichmond1989/svn";

const client = new Svn({source: "C:/Repos/MyProject"});

const info = await client.info({ recursive: true });
const log = await client.log({ revision: 3003 });
```

### Remote

```js
import Svn from "@crichmond1989/svn";

const client = new Svn({source: "https://svn.code.sf.net/p/svnbook/source"});

const info = await client.info({ recursive: true });
const log = await client.log({ revision: 3003 });
```