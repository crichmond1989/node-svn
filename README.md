# @crichmond1989/svn

[![Build Status](https://crichmond1989.visualstudio.com/svn/_apis/build/status/crichmond1989.svn?branchName=master)](https://crichmond1989.visualstudio.com/svn/_build/latest?definitionId=13&branchName=master) [![npm (scoped)](https://img.shields.io/npm/v/@crichmond1989/svn.svg)](https://www.npmjs.com/package/@crichmond1989/svn) [![NPM Size](https://img.shields.io/bundlephobia/minzip/@crichmond1989/svn.svg)](https://bundlephobia.com/result?p=@crichmond1989/svn) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/crichmond1989/svn/blob/master/LICENSE)

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