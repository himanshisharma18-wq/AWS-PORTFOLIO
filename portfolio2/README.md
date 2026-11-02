# Himanshi Sharma - Portfolio (AWS Amplify)

Static site (light theme): `index.html`, `style.css`, `script.js`. No build step.

## Creative feature: "Sort me out"
A sorting puzzle. Seven numbered tiles hide my story; tap two tiles to swap them and each tile flips open when it lands in its correct spot. Includes a "Watch bubble sort" button that animates the algorithm and shows the minimum swaps possible (computed from permutation cycles). Visible hint: the tilted yellow card in the hero and the "Play" nav pill.

## Run locally
Open `index.html` or run `npx serve .`

## Deploy on AWS Amplify Hosting
1. Push these files to the root of a GitHub repo.
2. Amplify console -> Create new app -> GitHub -> select repo and branch.
3. Leave build settings as default (no build command; output directory is the root).
4. Save and deploy, then use the `*.amplifyapp.com` URL in your submission.
(Alternative: Deploy without Git and upload the zip.)

Add your resume as `Himanshi_Sharma_Resume.pdf` in the root.
