#!/bin/bash
mkdir dist dist/{assets,views} dist/assets/{css,favicon,js,images,languages} dist/views/{includes,layout}
touch dist/views/index.pug
mkdir src src/{js,languages,sass} src/sass/{abstracts,base,components,layout,pages,themes,vendors}
touch src/sass/main.sass src/sass/base/{_normalize.sass,_global.sass} src/sass/abstracts/{_variables.sass,_helpers.sass,_colors.sass,_mixins.sass} src/sass/layout/{_header.sass,_grid.sass,_footer.sass}
echo node_modules >> .gitignore