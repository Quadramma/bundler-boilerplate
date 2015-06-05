

# bundler-boilerplate
boilerplate para sitios web ''one page'' con riotjs. Bundling con jakubpawlowicz/assets-packager

#Instalar

npm install -g assets-packager
npm install riot -g

#Compilar

assetspkg -c assets.yml -g

assetspkg -c assets.yml -g --js-bundle-to "../deploy" --css-bundle-to "../deploy"

riot public/tags public/javascripts/tags.js

#HTML Boilerplate

htmlboiler
