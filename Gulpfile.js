const gulp = require("gulp");
const uglify = require("gulp-uglify");

async function clean() {
  console.log("cleaning files");
  const { deleteAsync } = await import("del");
  const deletedPaths = await deleteAsync(["./public/assets/**/*"]);
  const deletedPaths2 = await deleteAsync(["public/assets/js/*"]);
}

gulp.task("js", async function () {
  console.log("minifying js");
  await import("gulp-rev").then((rev) => {
    return gulp
      .src("./assets/**/*.js")
      .pipe(uglify())
      .pipe(rev.default())
      .pipe(gulp.dest("./public/assets/js"))
      .pipe(
        rev.default.manifest({
          cwd: "public",
          merge: true,
        })
      )
      .pipe(gulp.dest("./public/assets/js"));
  });
});

gulp.task("build", gulp.series(clean, gulp.parallel("js")));

gulp.task("default", gulp.series("build"));
