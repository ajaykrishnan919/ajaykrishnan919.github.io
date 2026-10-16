# Portfolio

A static site: `index.html`, `style.css`, `main.js` and `assets/`. It has no build step.

## Preview locally

```
python -m http.server 8123
```

Then open http://localhost:8123.

## Publish on GitHub Pages

1. Create a repository named `<your-username>.github.io` (or any name for a project page).
2. Copy the contents of this folder to the root of the repository and push.
3. In the repository, go to Settings → Pages → Source and choose "Deploy from a branch", `main`, `/ (root)`.

The site is about 48 MB in total. The largest file is a 13 MB video, well under GitHub's 100 MB limit per file.

## Adding a project

Copy one `<section class="project">` block in `index.html`. In each gallery `.row`, set `--ar` on every figure to that image's width divided by its height; this keeps every photo in the row at the same height. Each image needs two files: `name-sm.jpg` (about 900 px, shown on the page) and `name.jpg` (about 1800 px, opened in the viewer).
