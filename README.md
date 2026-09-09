# Portfolio

[![Astro](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=fff)](https://astro.build)
[![Node](https://img.shields.io/badge/Node-%3E%3D22.12.0-339933?logo=node.js&logoColor=fff)](https://nodejs.org)
[![License](https://img.shields.io/github/license/cristianrubioa/portfolio)](LICENSE)

Personal portfolio site built with [Astro](https://astro.build).

🔗 [portfolio.crubio.fyi](https://portfolio.crubio.fyi)

![Preview](public/preview.png)

## Development

```bash
npm install
npm run dev
```

## Project thumbnails

Capture a project's thumbnail at a fixed viewport (local-only, not run in CI):

```bash
npm run screenshot -- <project-folder> <url> [--hero]
```

Example:

```bash
npm run screenshot -- 08-stringweave https://stringweave.crubio.fyi --hero
```

Saves to `src/content/projects/<project-folder>/thumbnail.png`.

## License

MIT — the code is free to reuse. The content (projects, text, images) is personal; replace it with your own before reusing this as a template.
