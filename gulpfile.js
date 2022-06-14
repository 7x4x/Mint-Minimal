const { task, dest, src, parallel, series, watch, lastRun } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const nodemon = require("gulp-nodemon");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const concat = require("gulp-concat");

const paths = {
  serverPath: "./index.js",
  sassPath: "./src/sass/**/*.sass",
  jsPath: "./src/js/**/*.js",
  languagesPath: "./src/languages/**/*.js",
};

const _sass = () => {
  return src(paths.sassPath)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(prefix("last 2 versions"))
    .pipe(sourcemaps.write("."))
    .pipe(
      rename((path) => {
        if (!path.extname.endsWith(".map")) path.basename = path.basename + ".min";
      })
    )
    .pipe(dest("./dist/assets/css"));
};

const _js = () => {
  return src(paths.jsPath)
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("./dist/assets/js"));
};

const _langs = () => {
  return src(paths.languagesPath)
    .pipe(concat("languages.min.js"))
    .pipe(babel({ presets: ["@babel/env"] }))
    .pipe(uglify())
    .pipe(dest("./dist/assets/languages"));
};

const _watch = () => {
  watch(paths.sassPath, series("_sass"));
  watch(paths.jsPath, series("_js"));
  watch(paths.languagesPath, series("_langs"));
};

const _nodemon = (done) => {
  nodemon({
    script: paths.serverPath,
    ext: "js json sass pug",
    ignore: ["node_modules/**"],
    watch: ".",
    done: done,
  });
};

task("_run", parallel(_sass, _js, _langs));

module.exports = {
  _js,
  _sass,
  _langs,
  default: series("_run", parallel(_nodemon, _watch)),
};
