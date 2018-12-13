# WebCatalog 12 [![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0) [![Travis Build Status](https://travis-ci.com/quanglam2807/webcatalog.svg?branch=master)](https://travis-ci.com/quanglam2807/webcatalog)

**[WebCatalog](https://getwebcatalog.com)** - Reinvent your Web Workflow.

This repository only has the source code of WebCatalog 13 & up. For older versions, check out these repos: [12](https://github.com/quanglam2807/webcatalog-12) | [11 & below](https://github.com/quanglam2807/appifier).

While WebCatalog is an Electron app and can be built on Windows & Linux, it's only offically supported on macOS. 

## Development
```
# First, clone the project:
git clone https://github.com/quanglam2807/webcatalog.git
cd webcatalog

# install the dependencies
yarn

# Run development mode of WebCatalog
yarn electron-dev

# Run development mode of the template app
yarn template:electron-dev

# Build for production
yarn template:prepare
yarn dist
```
