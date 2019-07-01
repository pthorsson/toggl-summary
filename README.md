# time - A summary calendar tool for Toggl data

Displays data from [Toggl](https://toggl.com/) in a calendar to give a better overview.

No database is used as the required data is stored in a cipher hash in the URL, which the user saves after creating it. The user then visits the URL and at login deciphers the hash to access the neccesary tokens to fetch the Toggl data. The tokens are temporarly stored in the users session in the browser, meaning it will only be stored until the user closes the browser.

Project is currently deployed on https://time.pathnoir.com/.

### Requirements

- [NodeJS (>= v10.15.3)](https://nodejs.org/en/)
- [Yarn (>= v1.13.0)](https://yarnpkg.com/en/)

### Install

Run `yarn`

### Development

Run `yarn dev`

### Build

To create build, run `yarn build`<br>
To serve build, run `yarn serve`
