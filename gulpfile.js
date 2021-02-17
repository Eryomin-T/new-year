let project_folder = "dist"; //папка для продакшена
let source_folder = "src"; //папка для девелопмента

let path = {
    build: {
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/images/",
        fonts: project_folder + "/fonts/",
    },
    src: {
        //код ниже делает то, что исключает файлы с расширением .html, которые начинаются с нижнего подчеркивания
        html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
        css: source_folder + "/scss/style.scss",
        js: source_folder + "/js/script.js",
        img: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/**/*.*",
    },
    watch: {
        html: source_folder + "/**/*.html",
        css: source_folder + "/**/*.scss",
        js: source_folder + "/**/*.js",
        img: source_folder + "/images/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + project_folder + "/",
};

let { src, dest } = require("gulp");
let gulp = require("gulp");
let browsersync = require("browser-sync").create();
let fileinclude = require("gulp-file-include"); //fileinclude позволяет соединить несколько html файлов в один
let del = require("del"); //плагин для удаления файлов/папок
let scss = require("gulp-sass");
let autoprefixer = require("gulp-autoprefixer");
let group_media = require("gulp-group-css-media-queries"); //позволяет сгруппировать все медиа-запросы и поставит ьв конец документа
let clean_css = require("gulp-clean-css"); //минифицирует css
let rename = require("gulp-rename"); //позволяет создать вторую не минифицированную версию
let uglify = require("gulp-uglify-es").default;
let imagemin = require("gulp-imagemin"); //оптимизация изображений
// let webp = require("gulp-webp"); //преобразовать  картинки в современный формат webp
//проблема ниже с путями при подключении тега
// let webphtml = require("gulp-webp-html"); //автоматически создает тег picture и вставляет альтернативную картинку формата webp
// let webpcss = require("gulp-webp-css");

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/", //базовая папка
        },
        port: 3000,
        notify: false,
    });
}

/*функция ниже делает то, что преобразовывает код из папки src в папку dist*/
function html() {
    return src(path.src.html)
        .pipe(fileinclude()) //непосредственно само соединение разных html файлов в один
        // .pipe(webphtml()) //
        .pipe(dest(path.build.html)) //
        .pipe(browsersync.stream()); //обновить страницу
}

function css() {
    return src(path.src.css)
        .pipe(
            //перерабатывание из scss в css
            scss({
                outputStyle: "expanded", //
            })
        )
        .pipe(group_media())
        .pipe(
            autoprefixer({
                overrideBrowserslist: ["last 5 versions"], //поддержка браузеров
                cascade: true, //стиль написания автопрефиксов
            })
        )
        .pipe(dest(path.build.css)) // выгружаем файл (ПЕРВЫЙ файл до минификации)
        // .pipe(webpcss())
        .pipe(clean_css()) //минификацируем css файл
        .pipe(
            //переименовываем минифийцированный файл
            rename({
                extname: ".min.css",
            })
        )
        .pipe(dest(path.build.css)) //выгружаем файл (уже ВТОРОЙ файл после минификации)
        .pipe(browsersync.stream()); //обновить страницу
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude()) //непосредственно само соединение разных js файлов в один
        .pipe(dest(path.build.js)) // выгружаем файл (ПЕРВЫЙ файл до минификации)
        .pipe(uglify())
        .pipe(
            //переименовываем минифийцированный файл
            rename({
                extname: ".min.js",
            })
        )
        .pipe(dest(path.build.js)) //выгружаем файл (уже ВТОРОЙ файл после минификации)
        .pipe(browsersync.stream()); //обновить страницу
}

function images() {
    return src(path.src.img)
        // .pipe(
        //     //преобразуем изображения в современный формат
        //     webp({
        //         quality: 70, //уровень оптимизации
        //     })
        // )
        // .pipe(dest(path.build.img))
        // .pipe(src(path.src.img))
        .pipe(
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViweBox: false }],
                interlaced: true,
                optimizationLevel: 3,
            })
        )
        .pipe(dest(path.build.img)) //
        .pipe(browsersync.stream()); //обновить страницу
}

function fonts() {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
}

/*отслеживание в реальном времени*/
function watchFiles(params) {
    //отслеживание html-файла, htm- это функция которая обрабатывает html-файлы, которую мы сделали ранее
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    // gulp.watch([path.watch.img], images);
}

/**/
function clean(params) {
    return del(path.clean); //указываем путь до папки disat
}

/*сначала папка удаляется, потом выполняется функция html*/
let build = gulp.series(clean, gulp.parallel(js, css, html, images, fonts));
/*сначала */
let start = gulp.parallel(build, watchFiles, browserSync);

exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.start = start;
exports.default = start;
