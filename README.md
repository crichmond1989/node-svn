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

```js
import svn from "@crichmond1989/svn";

const client = new svn({source: "C:/Repos/MyProject"});

const info = await client.info({ recursive: true });
const log = await client.log({ revision: 3003 });
```