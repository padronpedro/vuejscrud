# basic-crud

> Basic crud functions using vue + nodejs + sequelize

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# Installing Vue
``` bash
# Check if Vue is installed:
Vue --version
# Create a folder for all projects and run
sudo npm install -g vue-cli
# To create a project:
Vue init webpack <name>
# To run internal web server
Npm install
Npm run dev
```
# Installing Vuetify
``` bash
npm install vuetify
npm install sass sass-loader fibers deepmerge -D
```
``` javascript
// Find webpack.config.js and add this
module.exports = {
  rules: [
    {
      test: /\.s(c|a)ss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          // Requires sass-loader@^7.0.0
          options: {
            implementation: require('sass'),
            fiber: require('fibers'),
            indentedSyntax: true // optional
          },
          // Requires sass-loader@^8.0.0
          options: {
            implementation: require('sass'),
            sassOptions: {
              fiber: require('fibers'),
              indentedSyntax: true // optional
            },
          },
        },
      ],
    },
  ],
}
```
``` javascript
// Create a plugin file for Vuetify, src/plugins/vuetify.js with the below content:
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
const opts = {}
export default new Vuetify(opts)
```

``` javascript
// In main.js add:

import vuetify from '@/plugins/vuetify' // path to vuetify export

new Vue({
  vuetify,
}).$mount('#app')
```

``` html
// Index.html add fonts:

<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
```
# Running migrations and seeders
```
// Run Migrations
npx sequelize-cli db:migrate
// Run Seeders
npx sequelize-cli db:seed:all
```
> Seeder will generate:
2 - Roles: admin, user
4 - Permissions: AddUsers, EditUsers, DeleteUsers, ManageUsers
1- Admin user:
 Login: a@a.com
 Password: a
 (All permissions assigned)
10 - Test User: without any permissions assigned and with role: user (you must run the file ./seed.js)

# To run E2E test (using testcafe package)
```
npm run testcafe
```

