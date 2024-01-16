# Karng Darbo


## A cross-platform git GUI for Windows, Linux, and OSX.


### Made with [NW.js](https://nwjs.io) and [Vue.js](https://vuejs.org)

[![Build Status](https://travis-ci.org/TheJaredWilcurt/karngdarbo.svg?branch=master)](https://travis-ci.org/TheJaredWilcurt/karngdarbo)

This is the first pass at a lo-fi mockup for the design of the app.

![Karng Darbo mockup](assets/karng-darbo.png)

Karng Darbo will always be:

* Open Source
* Cross-Platform


* * *


## Running locally for development

**Prerequisites:**

1. [Volta](https://volta.sh) - Installed globally (handles Node/npm versions)
1. [git](https://git-scm.com) - Installed globally

**Instructions:**

1. Fork/clone/download this repo
1. `npm install`
1. `npm start`


* * *


## KEY FEATURES

These features are the core value that this project offers and is what is mostly lacking in alternatives:

1. Horizontal branch comparison graph that ONLY supports 2 branches (the base and the fork)
1. Per-character diffing ([Example](https://github.com/TheJaredWilcurt/karngdarbo/issues/4))
1. Dead simple, beginner friendly, highly intuitive


## Features in Priority order

* [x] Be able to add a local repo to the sidebar
* [x] Switch between repos
* [x] Store settings locally in a JSON file
* [x] Filter Sidebar
* [ ] Have swappable themes including: Light (professional), Dark (Low contrast), and High Contrast (WCAG 2.0 AAA compliant)
* [ ] See a history of all commits on the current branch listed in the middle pane
* [ ] Switch branches
* [ ] Visually compare against 1 other branch
* [ ] Pull and push commits
* [ ] Create commits
* [ ] See a diff of files (inlcuding per-char diffs)
* [ ] Discard changes that have not been commited yet (`git checkout HEAD -- path/to/file.js` - resets file to last commit)
* [ ] Clone a remote repo to a local destination
* [ ] Create repos in the app
* [ ] Merge in latest from other branch
* [ ] Internationalize the app so it can be translated
* [ ] Check for updates
* [ ] Organize Repos in sidebar
* [ ] Undo most recent commit (only if it was not pushed)


* * *


### OS Support

* Once released, we intend to support Windows, Linux, and OSX equally.
* Which version of each OS to support has not been decided yet
* We will not be supporting "Code-Signed" packages unless someone wants to help set that up.
* We will not be supporting any OS app store (unless someone wants to help set that up).


* * *


### Technology Colophon

* git
* NW.js
* NW.js Builder Phoenix
  * May replace this with nw-builder later
* Remix Icons
* Vite
* Vue.js
* Pinia
* Vue-Router
* Vue-I18N
* NW-Vue-Devtools
* ESLint
* Sass
* Sass-Lint
* TJW Sass Lint Rules
* VMWare
* VirtualBox
* GitHub Actions
