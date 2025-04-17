# Deployment Instructions for GitHub Pages

This document provides step-by-step instructions for deploying the Prof. Paulo Rettore website to GitHub Pages.

## Prerequisites

- A GitHub account (https://github.com/prettore/)
- Git installed on your local machine

## Deployment Steps

1. **Create a new repository on GitHub**
   - Go to https://github.com/new
   - Name the repository: `prettore.github.io` (this special name will automatically enable GitHub Pages)
   - Set the repository to Public
   - Click "Create repository"

2. **Push the website code to GitHub**
   - Open a terminal and navigate to the website directory
   - Run the following commands:
   ```bash
   git remote add origin https://github.com/prettore/prettore.github.io.git
   git branch -M main
   git push -u origin main
   ```

3. **Configure GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to the "GitHub Pages" section
   - Under "Source", select "main" branch
   - Click "Save"

4. **Verify Deployment**
   - Wait a few minutes for GitHub to build and deploy your site
   - Visit https://prettore.github.io to see your live website

## Updating the Website

To make changes to the website:

1. Make your changes locally
2. Commit the changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
3. Push to GitHub:
   ```bash
   git push origin main
   ```
4. GitHub will automatically rebuild and deploy your site

## Custom Domain (Optional)

If you want to use a custom domain:

1. Go to your repository's "Settings"
2. Scroll down to the "GitHub Pages" section
3. Under "Custom domain", enter your domain name
4. Click "Save"
5. Configure your domain's DNS settings as instructed by GitHub

## Troubleshooting

- If your site doesn't appear, check the GitHub Pages section in Settings for any error messages
- Ensure all file paths are correct (case-sensitive)
- Verify that the .nojekyll file exists to prevent Jekyll processing
