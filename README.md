# Website

This website is built using Docusaurus 2, a modern static website generator.

### Installation

```
npm install
```

### Local Development

```
npm run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```
$env:GIT_USER = "gitusername"
npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
