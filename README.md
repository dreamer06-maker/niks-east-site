# Niks East

Static personal portfolio site for Niks Zhang / 乌云向东.

## Files

- `index.html`: page content
- `styles.css`: visual design
- `script.js`: work filter tabs
- `assets/hero-clouds.png`: generated hero image

## Content Sources

- Local videos: `F:\电脑素材\成片预设`
- Local videos: `C:\Users\28895\Desktop\一些成片`
- Douyin: `Dreamerzhang`
- Xiaohongshu: `1874566400`
- Email: `2889597620@qq.com`

## Local preview

Open `index.html` in a browser.

## Deploy With Cloudflare Pages

1. Go to Cloudflare Dashboard > Workers & Pages.
2. Choose Create application > Pages > Direct Upload.
3. Project name: `niks-east`.
4. Drag the whole `niks-east-site` folder into the upload area.
5. Deploy the site and open the generated `*.pages.dev` preview link.
6. In the project, open Custom domains and add your domain, for example `nikseast.com`.
7. Follow Cloudflare's DNS instructions. If using the root domain, Cloudflare may ask you to point nameservers to Cloudflare.

## Deploy With GitHub

This folder can also be connected to Cloudflare Workers Builds.

1. Create a GitHub repository named `niks-east-site`.
2. Upload all files in this folder to the repository.
3. In Cloudflare, open `Workers & Pages` > `nikseast`.
4. Open `Settings` or `Deployments`, then connect a GitHub repository.
5. Select the `niks-east-site` repository and the `main` branch.
6. Keep the build command empty.
7. Use the included `wrangler.toml`; it tells Cloudflare to serve this folder as static assets.
Cloudflare Git deployment enabled.
