var R2Reader =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/BookSettings.ts":
/*!*****************************!*\
  !*** ./src/BookSettings.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BookSettings; });
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts");
/* harmony import */ var _IconLib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./IconLib */ "./src/IconLib.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const template = (sections) => `
    <ul class="settings-menu" role="menu">
        ${sections}
    </ul>
`;
const sectionTemplate = (options) => `
    <li><ul class="settings-options">
        ${options}
    </ul></li>
`;
const optionTemplate = (liClassName, buttonClassName, label, role, svgIcon, buttonId) => `
    <li class='${liClassName}'><button id='${buttonId}' class='${buttonClassName}' role='${role}' tabindex=-1>${label}${svgIcon}</button></li>
`;
class BookSettings {
    constructor(store, bookFonts, fontSizes, bookThemes, bookViews) {
        this.fontChangeCallback = () => { };
        this.fontSizeChangeCallback = () => { };
        this.themeChangeCallback = () => { };
        this.viewChangeCallback = () => { };
        this.store = store;
        this.bookFonts = bookFonts;
        this.fontSizes = fontSizes;
        this.bookThemes = bookThemes;
        this.bookViews = bookViews;
    }
    static create(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const fontSizes = config.fontSizesInPixels.map(fontSize => fontSize + "px");
            const settings = new this(config.store, config.bookFonts, fontSizes, config.bookThemes, config.bookViews);
            yield settings.initializeSelections(config.defaultFontSizeInPixels ? config.defaultFontSizeInPixels + "px" : undefined);
            return settings;
        });
    }
    initializeSelections(defaultFontSize) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.bookFonts.length >= 1) {
                let selectedFont = this.bookFonts[0];
                const selectedFontName = yield this.store.get(BookSettings.SELECTED_FONT_KEY);
                if (selectedFontName) {
                    for (const bookFont of this.bookFonts) {
                        if (bookFont.name === selectedFontName) {
                            selectedFont = bookFont;
                            break;
                        }
                    }
                }
                this.selectedFont = selectedFont;
            }
            if (this.fontSizes.length >= 1) {
                // First, check if the user has previously set a font size.
                let selectedFontSize = yield this.store.get(BookSettings.SELECTED_FONT_SIZE_KEY);
                let selectedFontSizeIsAvailable = (selectedFontSize && this.fontSizes.indexOf(selectedFontSize) !== -1);
                // If not, or the user selected a size that's no longer an option, is there a default font size?
                if ((!selectedFontSize || !selectedFontSizeIsAvailable) && defaultFontSize) {
                    selectedFontSize = defaultFontSize;
                    selectedFontSizeIsAvailable = (selectedFontSize && this.fontSizes.indexOf(selectedFontSize) !== -1);
                }
                // If there's no selection and no default, pick a font size in the middle of the options.
                if (!selectedFontSize || !selectedFontSizeIsAvailable) {
                    const averageFontSizeIndex = Math.floor(this.fontSizes.length / 2);
                    selectedFontSize = this.fontSizes[averageFontSizeIndex];
                }
                this.selectedFontSize = selectedFontSize;
            }
            if (this.bookThemes.length >= 1) {
                let selectedTheme = this.bookThemes[0];
                const selectedThemeName = yield this.store.get(BookSettings.SELECTED_THEME_KEY);
                if (selectedThemeName) {
                    for (const bookTheme of this.bookThemes) {
                        if (bookTheme.name === selectedThemeName) {
                            selectedTheme = bookTheme;
                            break;
                        }
                    }
                }
                this.selectedTheme = selectedTheme;
            }
            if (this.bookViews.length >= 1) {
                let selectedView = this.bookViews[0];
                const selectedViewName = yield this.store.get(BookSettings.SELECTED_VIEW_KEY);
                if (selectedViewName) {
                    for (const bookView of this.bookViews) {
                        if (bookView.name === selectedViewName) {
                            selectedView = bookView;
                            break;
                        }
                    }
                }
                this.selectedView = selectedView;
            }
        });
    }
    renderControls(element) {
        const sections = [];
        if (this.bookFonts.length > 1) {
            const fontOptions = this.bookFonts.map(bookFont => optionTemplate("reading-style", bookFont.name, bookFont.label, "menuitem", _IconLib__WEBPACK_IMPORTED_MODULE_1__["icons"].checkDupe, bookFont.label));
            sections.push(sectionTemplate(fontOptions.join("")));
        }
        if (this.fontSizes.length > 1) {
            const fontSizeOptions = optionTemplate("font-setting", "decrease", "A-", "menuitem", "", "decrease-font") + optionTemplate("font-setting", "increase", "A+", "menuitem", "", "increase-font");
            sections.push(sectionTemplate(fontSizeOptions));
        }
        if (this.bookThemes.length > 1) {
            const themeOptions = this.bookThemes.map(bookTheme => optionTemplate("reading-theme", bookTheme.name, bookTheme.label, "menuitem", _IconLib__WEBPACK_IMPORTED_MODULE_1__["icons"].checkDupe, bookTheme.label));
            sections.push(sectionTemplate(themeOptions.join("")));
        }
        if (this.bookViews.length > 1) {
            const viewOptions = this.bookViews.map(bookView => optionTemplate("reading-style", bookView.name, bookView.label, "menuitem", _IconLib__WEBPACK_IMPORTED_MODULE_1__["icons"].checkDupe, bookView.label));
            sections.push(sectionTemplate(viewOptions.join("")));
        }
        element.innerHTML = template(sections.join(""));
        this.fontButtons = {};
        if (this.bookFonts.length > 1) {
            for (const bookFont of this.bookFonts) {
                this.fontButtons[bookFont.name] = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](element, "button[class=" + bookFont.name + "]");
            }
            this.updateFontButtons();
        }
        this.fontSizeButtons = {};
        if (this.fontSizes.length > 1) {
            for (const fontSizeName of ["decrease", "increase"]) {
                this.fontSizeButtons[fontSizeName] = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](element, "button[class=" + fontSizeName + "]");
            }
            this.updateFontSizeButtons();
        }
        this.themeButtons = {};
        if (this.bookThemes.length > 1) {
            for (const bookTheme of this.bookThemes) {
                this.themeButtons[bookTheme.name] = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](element, "button[class=" + bookTheme.name + "]");
            }
            this.updateThemeButtons();
        }
        this.viewButtons = {};
        if (this.bookViews.length > 1) {
            for (const bookView of this.bookViews) {
                this.viewButtons[bookView.name] = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](element, "button[class=" + bookView.name + "]");
            }
            this.updateViewButtons();
        }
        this.offlineStatusElement = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findElement"](element, 'div[class="offline-status"]');
        this.setupEvents();
        // Clicking the settings view outside the ul hides it, but clicking inside the ul keeps it up.
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](element, "ul").addEventListener("click", (event) => {
            event.stopPropagation();
        });
    }
    onFontChange(callback) {
        this.fontChangeCallback = callback;
    }
    onFontSizeChange(callback) {
        this.fontSizeChangeCallback = callback;
    }
    onThemeChange(callback) {
        this.themeChangeCallback = callback;
    }
    onViewChange(callback) {
        this.viewChangeCallback = callback;
    }
    setupEvents() {
        for (const font of this.bookFonts) {
            const button = this.fontButtons[font.name];
            if (button) {
                button.addEventListener("click", (event) => {
                    this.selectedFont.stop();
                    font.start();
                    this.selectedFont = font;
                    this.updateFontButtons();
                    this.storeSelectedFont(font);
                    this.fontChangeCallback();
                    event.preventDefault();
                });
            }
        }
        if (this.fontSizes.length > 1) {
            this.fontSizeButtons["decrease"].addEventListener("click", (event) => {
                const currentFontSizeIndex = this.fontSizes.indexOf(this.selectedFontSize);
                if (currentFontSizeIndex > 0) {
                    const newFontSize = this.fontSizes[currentFontSizeIndex - 1];
                    this.selectedFontSize = newFontSize;
                    this.fontSizeChangeCallback();
                    this.updateFontSizeButtons();
                    this.storeSelectedFontSize(newFontSize);
                }
                event.preventDefault();
            });
            this.fontSizeButtons["increase"].addEventListener("click", (event) => {
                const currentFontSizeIndex = this.fontSizes.indexOf(this.selectedFontSize);
                if (currentFontSizeIndex < this.fontSizes.length - 1) {
                    const newFontSize = this.fontSizes[currentFontSizeIndex + 1];
                    this.selectedFontSize = newFontSize;
                    this.fontSizeChangeCallback();
                    this.updateFontSizeButtons();
                    this.storeSelectedFontSize(newFontSize);
                }
                event.preventDefault();
            });
        }
        for (const theme of this.bookThemes) {
            const button = this.themeButtons[theme.name];
            if (button) {
                button.addEventListener("click", (event) => {
                    this.selectedTheme.stop();
                    theme.start();
                    this.selectedTheme = theme;
                    this.updateThemeButtons();
                    this.storeSelectedTheme(theme);
                    this.themeChangeCallback();
                    event.preventDefault();
                });
            }
        }
        for (const view of this.bookViews) {
            const button = this.viewButtons[view.name];
            if (button) {
                button.addEventListener("click", (event) => {
                    const position = this.selectedView.getCurrentPosition();
                    this.selectedView.stop();
                    view.start(position);
                    this.selectedView = view;
                    this.updateViewButtons();
                    this.storeSelectedView(view);
                    this.viewChangeCallback();
                    event.preventDefault();
                });
            }
        }
    }
    updateFontButtons() {
        for (const font of this.bookFonts) {
            if (font === this.selectedFont) {
                this.fontButtons[font.name].className = font.name + " active";
                this.fontButtons[font.name].setAttribute("aria-label", font.label + " font enabled");
            }
            else {
                this.fontButtons[font.name].className = font.name;
                this.fontButtons[font.name].setAttribute("aria-label", font.label + " font disabled");
            }
        }
    }
    updateFontSizeButtons() {
        const currentFontSizeIndex = this.fontSizes.indexOf(this.selectedFontSize);
        if (currentFontSizeIndex === 0) {
            this.fontSizeButtons["decrease"].className = "decrease disabled";
        }
        else {
            this.fontSizeButtons["decrease"].className = "decrease";
        }
        if (currentFontSizeIndex === this.fontSizes.length - 1) {
            this.fontSizeButtons["increase"].className = "increase disabled";
        }
        else {
            this.fontSizeButtons["increase"].className = "increase";
        }
    }
    updateThemeButtons() {
        for (const theme of this.bookThemes) {
            if (theme === this.selectedTheme) {
                this.themeButtons[theme.name].className = theme.name + " active";
                this.themeButtons[theme.name].setAttribute("aria-label", theme.label + " mode enabled");
            }
            else {
                this.themeButtons[theme.name].className = theme.name;
                this.themeButtons[theme.name].setAttribute("aria-label", theme.label + " mode disabled");
            }
        }
    }
    updateViewButtons() {
        for (const view of this.bookViews) {
            if (view === this.selectedView) {
                this.viewButtons[view.name].className = view.name + " active";
                this.viewButtons[view.name].setAttribute("aria-label", view.label + " mode enabled");
            }
            else {
                this.viewButtons[view.name].className = view.name;
                this.viewButtons[view.name].setAttribute("aria-label", view.label + " mode disabled");
            }
        }
    }
    getSelectedFont() {
        return this.selectedFont;
    }
    getSelectedFontSize() {
        return this.selectedFontSize;
    }
    getSelectedTheme() {
        return this.selectedTheme;
    }
    getSelectedView() {
        return this.selectedView;
    }
    getOfflineStatusElement() {
        return this.offlineStatusElement;
    }
    storeSelectedFont(font) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.set(BookSettings.SELECTED_FONT_KEY, font.name);
        });
    }
    storeSelectedFontSize(fontSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.set(BookSettings.SELECTED_FONT_SIZE_KEY, fontSize);
        });
    }
    storeSelectedTheme(theme) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.set(BookSettings.SELECTED_THEME_KEY, theme.name);
        });
    }
    storeSelectedView(view) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.store.set(BookSettings.SELECTED_VIEW_KEY, view.name);
        });
    }
}
BookSettings.SELECTED_FONT_KEY = "settings-selected-font";
BookSettings.SELECTED_FONT_SIZE_KEY = "settings-selected-font-size";
BookSettings.SELECTED_THEME_KEY = "settings-selected-theme";
BookSettings.SELECTED_VIEW_KEY = "settings-selected-view";
;


/***/ }),

/***/ "./src/BrowserUtilities.ts":
/*!*********************************!*\
  !*** ./src/BrowserUtilities.ts ***!
  \*********************************/
/*! exports provided: getWidth, getHeight, isZoomed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getWidth", function() { return getWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHeight", function() { return getHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isZoomed", function() { return isZoomed; });
/** Returns the current width of the document. */
function getWidth() {
    return document.documentElement.clientWidth;
}
/** Returns the current height of the document. */
function getHeight() {
    return document.documentElement.clientHeight;
}
/** Returns true if the browser is zoomed in with pinch-to-zoom on mobile. */
function isZoomed() {
    return (getWidth() !== window.innerWidth);
}


/***/ }),

/***/ "./src/Cacher.ts":
/*!***********************!*\
  !*** ./src/Cacher.ts ***!
  \***********************/
/*! exports provided: CacheStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CacheStatus", function() { return CacheStatus; });
var CacheStatus;
(function (CacheStatus) {
    /** The book has not been cached. */
    CacheStatus[CacheStatus["Uncached"] = 0] = "Uncached";
    /** There is a new version available (Application Cache only - refresh the page to update). */
    CacheStatus[CacheStatus["UpdateAvailable"] = 1] = "UpdateAvailable";
    /** The app is checking for a new version (Application Cache only). */
    CacheStatus[CacheStatus["CheckingForUpdate"] = 2] = "CheckingForUpdate";
    /** The cache is downloading. */
    CacheStatus[CacheStatus["Downloading"] = 3] = "Downloading";
    /** The cache is fully downloaded and the book is available offline. */
    CacheStatus[CacheStatus["Downloaded"] = 4] = "Downloaded";
    /** There was an error downloading the cache, and the book is not available offline. */
    CacheStatus[CacheStatus["Error"] = 5] = "Error";
})(CacheStatus || (CacheStatus = {}));


/***/ }),

/***/ "./src/ColumnsPaginatedBookView.ts":
/*!*****************************************!*\
  !*** ./src/ColumnsPaginatedBookView.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ColumnsPaginatedBookView; });
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts");

class ColumnsPaginatedBookView {
    constructor() {
        this.name = "columns-paginated-view";
        this.label = "Paginated";
        this.sideMargin = 0;
        this.height = 0;
        this.hasFixedScrollWidth = false;
    }
    start(position) {
        // any is necessary because CSSStyleDeclaration type does not include
        // all the vendor-prefixed attributes.
        this.setSize();
        const viewportElement = document.createElement("meta");
        viewportElement.name = "viewport";
        viewportElement.content = "width=device-width, initial-scale=1, maximum-scale=1";
        this.checkForFixedScrollWidth();
        this.goToPosition(position);
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.setProperty("--USER__scroll", "readium-scroll-off");
    }
    checkForFixedScrollWidth() {
        // Determine if the scroll width changes when the left position
        // changes. This differs across browsers and sometimes across
        // books in the same browser.
        const body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        const originalScrollWidth = body.scrollWidth;
        this.hasFixedScrollWidth = (body.scrollWidth === originalScrollWidth);
    }
    setSize() {
        // any is necessary because CSSStyleDeclaration type does not include
        // all the vendor-prefixed attributes.
        const body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        this.bookElement.contentDocument.documentElement.style.height = (this.height) + "px";
        this.bookElement.style.height = (this.height) + "px";
        this.bookElement.style.width = "100%"; //BrowserUtilities.getWidth() + "px";
        const images = body.querySelectorAll("img");
        for (const image of images) {
            image.style.width = image.width + "px";
        }
    }
    stop() {
    }
    /** Returns the total width of the columns that are currently
        positioned to the left of the iframe viewport. */
    getLeftColumnsWidth() {
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        return html.scrollLeft;
    }
    /** Returns the total width of the columns that are currently
        positioned to the right of the iframe viewport. */
    getRightColumnsWidth() {
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        const scrollWidth = html.scrollWidth;
        const width = this.getColumnWidth();
        let rightWidth = scrollWidth - width;
        if (this.hasFixedScrollWidth) {
            // In some browsers (IE and Firefox with certain books), 
            // scrollWidth doesn't change when some columns
            // are off to the left, so we need to subtract them.
            const leftWidth = this.getLeftColumnsWidth();
            rightWidth = Math.max(0, rightWidth - leftWidth);
        }
        return rightWidth;
    }
    /** Returns the width of one column. */
    getColumnWidth() {
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        return html.offsetWidth;
    }
    /** Shifts the columns so that the specified width is positioned
        to the left of the iframe viewport. */
    setLeftColumnsWidth(width) {
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.scrollLeft = width;
    }
    /** Returns number in range [0..1) representing the
        proportion of columns that are currently positioned
        to the left of the iframe viewport. */
    getCurrentPosition() {
        const width = this.getColumnWidth();
        const leftWidth = this.getLeftColumnsWidth();
        const rightWidth = this.getRightColumnsWidth();
        const totalWidth = leftWidth + width + rightWidth;
        return leftWidth / totalWidth;
    }
    /** Returns the current 1-indexed page number. */
    getCurrentPage() {
        return this.getCurrentPosition() * this.getPageCount() + 1;
    }
    /** Returns the total number of pages. */
    getPageCount() {
        const width = this.getColumnWidth();
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        return html.scrollWidth / width;
    }
    onFirstPage() {
        const leftWidth = this.getLeftColumnsWidth();
        return (leftWidth <= 0);
    }
    onLastPage() {
        const rightWidth = this.getRightColumnsWidth();
        return (rightWidth <= 0);
    }
    goToPreviousPage() {
        const leftWidth = this.getLeftColumnsWidth();
        const width = this.getColumnWidth();
        var offset = leftWidth - width;
        if (offset >= 0) {
            this.setLeftColumnsWidth(offset);
        }
        else {
            this.setLeftColumnsWidth(0);
        }
    }
    goToNextPage() {
        const leftWidth = this.getLeftColumnsWidth();
        const width = this.getColumnWidth();
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        const scrollWidth = html.scrollWidth;
        var offset = leftWidth + width;
        if (offset < scrollWidth) {
            this.setLeftColumnsWidth(offset);
        }
        else {
            this.setLeftColumnsWidth(scrollWidth);
        }
    }
    /** Goes to a position specified by a number in the range [0..1].
        The position should be a number as returned by getCurrentPosition,
        or 1 to go to the last page. The position will be rounded down so
        it matches the position of one of the columns. */
    /** @param position Number in range [0..1] */
    goToPosition(position) {
        this.setSize();
        // If the window has changed size since the columns were set up,
        // we need to reset position so we can determine the new total width.
        const width = this.getColumnWidth();
        const rightWidth = this.getRightColumnsWidth();
        const totalWidth = width + rightWidth;
        const newLeftWidth = position * totalWidth;
        // Round the new left width so it's a multiple of the column width.
        let roundedLeftWidth = Math.round(newLeftWidth / width) * width;
        if (roundedLeftWidth >= totalWidth) {
            // We've gone too far and all the columns are off to the left.
            // Move one column back into the viewport.
            roundedLeftWidth = roundedLeftWidth - width;
        }
        this.setLeftColumnsWidth(roundedLeftWidth);
    }
    goToElement(elementId, relative) {
        const element = this.bookElement.contentDocument.getElementById(elementId);
        if (element) {
            // Get the element's position in the iframe, and
            // round that to figure out the column it's in.
            // There is a bug in Safari when using getBoundingClientRect
            // on an element that spans multiple columns. Temporarily
            // set the element's height to fit it on one column so we
            // can determine the first column position.
            const originalHeight = element.style.height;
            element.style.height = "0";
            const left = element.getBoundingClientRect().left;
            const width = this.getColumnWidth();
            let roundedLeftWidth = Math.floor(left / width) * width;
            if (relative) {
                const origin = this.getLeftColumnsWidth();
                roundedLeftWidth = (Math.floor(left / width) * width) + origin;
            }
            // Restore element's original height.
            element.style.height = originalHeight;
            this.setLeftColumnsWidth(roundedLeftWidth);
        }
    }
}


/***/ }),

/***/ "./src/DayTheme.ts":
/*!*************************!*\
  !*** ./src/DayTheme.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DayTheme; });
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts");

class DayTheme {
    constructor() {
        this.name = "day-theme";
        this.label = "Day";
    }
    start() {
        const rootElement = document.documentElement;
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](rootElement, "data-viewer-theme", "day");
        const bodyElement = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](rootElement, "body");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](bodyElement, "data-viewer-theme", "day");
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.setProperty("--USER__appearance", "readium-default-on");
    }
    stop() {
        const rootElement = document.documentElement;
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](rootElement, "data-viewer-theme");
        const bodyElement = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](rootElement, "body");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](bodyElement, "data-viewer-theme");
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.removeProperty("--USER__appearance");
    }
}


/***/ }),

/***/ "./src/EventHandler.ts":
/*!*****************************!*\
  !*** ./src/EventHandler.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EventHandler; });
/* harmony import */ var _BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BrowserUtilities */ "./src/BrowserUtilities.ts");

class EventHandler {
    constructor() {
        this.pendingMouseEventStart = null;
        this.pendingMouseEventEnd = null;
        this.pendingTouchEventStart = null;
        this.pendingTouchEventEnd = null;
        this.onLeftTap = () => { };
        this.onMiddleTap = () => { };
        this.onRightTap = () => { };
        this.onBackwardSwipe = () => { };
        this.onForwardSwipe = () => { };
        this.onLeftArrow = () => { };
        this.onRightArrow = () => { };
        this.onLeftHover = () => { };
        this.onRightHover = () => { };
        this.onRemoveHover = () => { };
        this.onInternalLink = () => { };
        this.handleMouseEventStart = (event) => {
            this.pendingMouseEventStart = event;
        };
        this.handleTouchEventStart = (event) => {
            if (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__["isZoomed"]()) {
                return;
            }
            if (event.changedTouches.length !== 1) {
                // This is a multi-touch event. Ignore.
                return;
            }
            this.pendingTouchEventStart = event;
        };
        this.handleMouseEventEnd = (event) => {
            if (!this.pendingMouseEventStart) {
                // Somehow we got an end event without a start event. Ignore it.
                return;
            }
            const devicePixelRatio = window.devicePixelRatio;
            const xDevicePixels = (this.pendingMouseEventStart.clientX - event.clientX) / devicePixelRatio;
            const yDevicePixels = (this.pendingMouseEventStart.clientY - event.clientY) / devicePixelRatio;
            // Is the end event in the same place as the start event?
            if (Math.abs(xDevicePixels) < EventHandler.CLICK_PIXEL_TOLERANCE && Math.abs(yDevicePixels) < EventHandler.CLICK_PIXEL_TOLERANCE) {
                if (this.pendingMouseEventEnd) {
                    // This was a double click. Let the browser handle it.
                    this.pendingMouseEventStart = null;
                    this.pendingMouseEventEnd = null;
                    return;
                }
                // This was a single click.
                this.pendingMouseEventStart = null;
                this.pendingMouseEventEnd = event;
                setTimeout(this.handleClick, EventHandler.DOUBLE_CLICK_MS);
                return;
            }
            this.pendingMouseEventEnd = null;
            // This is a swipe or highlight. Let the browser handle it.
            // (Swipes aren't handled on desktop.)
            this.pendingMouseEventStart = null;
        };
        this.handleTouchEventEnd = (event) => {
            event.preventDefault();
            if (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__["isZoomed"]()) {
                return;
            }
            if (event.changedTouches.length !== 1) {
                // This is a multi-touch event. Ignore.
                return;
            }
            if (!this.pendingTouchEventStart) {
                // Somehow we got an end event without a start event. Ignore it.
                return;
            }
            const startTouch = this.pendingTouchEventStart.changedTouches[0];
            const endTouch = event.changedTouches[0];
            if (!startTouch) {
                // Somehow we saved a touch event with no touches.
                return;
            }
            const devicePixelRatio = window.devicePixelRatio;
            const xDevicePixels = (startTouch.clientX - endTouch.clientX) / devicePixelRatio;
            const yDevicePixels = (startTouch.clientY - endTouch.clientY) / devicePixelRatio;
            // Is the end event in the same place as the start event?
            if (Math.abs(xDevicePixels) < EventHandler.TAP_PIXEL_TOLERANCE && Math.abs(yDevicePixels) < EventHandler.TAP_PIXEL_TOLERANCE) {
                if (this.pendingTouchEventEnd) {
                    // This was a double tap. Let the browser handle it.
                    this.pendingTouchEventStart = null;
                    this.pendingTouchEventEnd = null;
                    return;
                }
                // This was a single tap or long press.
                if (event.timeStamp - this.pendingTouchEventStart.timeStamp > EventHandler.LONG_PRESS_MS) {
                    // This was a long press. Let the browser handle it.
                    this.pendingTouchEventStart = null;
                    this.pendingTouchEventEnd = null;
                    return;
                }
                // This was a single tap.
                this.pendingTouchEventStart = null;
                this.pendingTouchEventEnd = event;
                setTimeout(this.handleTap, EventHandler.DOUBLE_TAP_MS);
                return;
            }
            this.pendingTouchEventEnd = null;
            if (event.timeStamp - this.pendingTouchEventStart.timeStamp > EventHandler.SLOW_SWIPE_MS) {
                // This is a slow swipe / highlight. Let the browser handle it.
                this.pendingTouchEventStart = null;
                return;
            }
            // This is a swipe. 
            const slope = (startTouch.clientY - endTouch.clientY) / (startTouch.clientX - endTouch.clientX);
            if (Math.abs(slope) > 0.5) {
                // This is a mostly vertical swipe. Ignore.
                this.pendingTouchEventStart = null;
                return;
            }
            // This was a horizontal swipe.
            if (xDevicePixels < 0) {
                this.onBackwardSwipe(event);
            }
            else {
                this.onForwardSwipe(event);
            }
            this.pendingTouchEventStart = null;
        };
        this.handleClick = () => {
            if (!this.pendingMouseEventEnd) {
                // Another click happened already.
                return;
            }
            if (this.checkForLink(this.pendingMouseEventEnd)) {
                // This was a single click on a link. Do nothing.
                this.pendingMouseEventEnd = null;
                return;
            }
            // This was a single click.
            const x = this.pendingMouseEventEnd.clientX;
            const width = window.innerWidth;
            if (x / width < 0.05) {
                this.onLeftTap(this.pendingMouseEventEnd);
            }
            else if (x / width > 0.95) {
                this.onRightTap(this.pendingMouseEventEnd);
            }
            else {
                this.onMiddleTap(this.pendingMouseEventEnd);
            }
            this.pendingMouseEventEnd = null;
            return;
        };
        this.handleTap = () => {
            if (!this.pendingTouchEventEnd) {
                // Another tap happened already.
                return;
            }
            if (this.checkForLink(this.pendingTouchEventEnd)) {
                this.handleLinks(this.pendingTouchEventEnd);
                // This was a single tap on a link. Do nothing.
                this.pendingTouchEventEnd = null;
                return;
            }
            // This was a single tap.
            const touch = this.pendingTouchEventEnd.changedTouches[0];
            if (!touch) {
                // Somehow we got a touch event with no touches.
                return;
            }
            const x = touch.clientX;
            const width = window.innerWidth;
            if (x / width < 0.05) {
                this.onLeftTap(this.pendingTouchEventEnd);
            }
            else if (x / width > 0.95) {
                this.onRightTap(this.pendingTouchEventEnd);
            }
            else {
                this.onMiddleTap(this.pendingTouchEventEnd);
            }
            this.pendingTouchEventEnd = null;
            return;
        };
        this.checkForLink = (event) => {
            let nextElement = event.target;
            while (nextElement && nextElement.tagName.toLowerCase() !== "body") {
                if (nextElement.tagName.toLowerCase() === "a" && nextElement.href) {
                    return nextElement;
                }
                else {
                    nextElement = nextElement.parentElement;
                }
            }
            return null;
        };
        this.handleMouseMove = (event) => {
            const x = event.clientX;
            const width = window.innerWidth;
            if (x / width < 0.05) {
                this.onLeftHover();
            }
            else if (x / width > 0.95) {
                this.onRightHover();
            }
            else {
                this.onRemoveHover();
            }
        };
        this.handleMouseLeave = () => {
            this.onRemoveHover();
        };
        this.handleLinks = (event) => {
            const link = this.checkForLink(event);
            if (link) {
                // Open external links in new tabs.
                const isSameOrigin = (window.location.protocol === link.protocol &&
                    window.location.port === link.port &&
                    window.location.hostname === link.hostname);
                const isInternal = (link.href.indexOf("#"));
                if (!isSameOrigin) {
                    window.open(link.href, "_blank");
                    event.preventDefault();
                    event.stopPropagation();
                }
                else if (isSameOrigin && isInternal !== -1) {
                    this.onInternalLink(event);
                }
                else if (isSameOrigin && isInternal === -1) {
                    link.click();
                }
            }
        };
        this.handleKeyboard = (event) => {
            const LEFT_ARROW = 37;
            const RIGHT_ARROW = 39;
            const TAB_KEY = 9;
            if (event.keyCode === LEFT_ARROW) {
                this.onLeftArrow(event);
            }
            else if (event.keyCode === RIGHT_ARROW) {
                this.onRightArrow(event);
            }
            else if (event.keyCode === TAB_KEY) {
                event.preventDefault();
            }
        };
    }
    setupEvents(element) {
        if (element !== null) {
            element.addEventListener("touchstart", this.handleTouchEventStart.bind(this));
            element.addEventListener("touchend", this.handleTouchEventEnd.bind(this));
            element.addEventListener("mousedown", this.handleMouseEventStart.bind(this));
            element.addEventListener("mouseup", this.handleMouseEventEnd.bind(this));
            element.addEventListener("mouseenter", this.handleMouseMove.bind(this));
            element.addEventListener("mousemove", this.handleMouseMove.bind(this));
            element.addEventListener("mouseleave", this.handleMouseLeave.bind(this));
            // Most click handling is done in the touchend and mouseup event handlers,
            // but if there's a click on an external link we need to cancel the click
            // event to prevent it from opening in the iframe.
            element.addEventListener("click", this.handleLinks.bind(this));
            element.addEventListener("keydown", this.handleKeyboard.bind(this));
        }
        else {
            throw "cannot setup events for null";
        }
    }
}
EventHandler.CLICK_PIXEL_TOLERANCE = 10;
EventHandler.TAP_PIXEL_TOLERANCE = 10;
EventHandler.DOUBLE_CLICK_MS = 200;
EventHandler.LONG_PRESS_MS = 500;
EventHandler.DOUBLE_TAP_MS = 200;
EventHandler.SLOW_SWIPE_MS = 500;


/***/ }),

/***/ "./src/HTMLUtilities.ts":
/*!******************************!*\
  !*** ./src/HTMLUtilities.ts ***!
  \******************************/
/*! exports provided: findElement, findRequiredElement, findIframeElement, findRequiredIframeElement, setAttr, removeAttr, createStylesheet, removeStylesheet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findElement", function() { return findElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findRequiredElement", function() { return findRequiredElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIframeElement", function() { return findIframeElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findRequiredIframeElement", function() { return findRequiredIframeElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAttr", function() { return setAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAttr", function() { return removeAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createStylesheet", function() { return createStylesheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeStylesheet", function() { return removeStylesheet; });
/** Returns a single element matching the selector within the parentElement,
    or null if no element matches. */
function findElement(parentElement, selector) {
    return parentElement.querySelector(selector);
}
/** Returns a single element matching the selector within the parent element,
    or throws an exception if no element matches. */
function findRequiredElement(parentElement, selector) {
    const element = findElement(parentElement, selector);
    if (!element) {
        throw "required element " + selector + " not found";
    }
    else {
        return element;
    }
}
/** Returns a single element matching the selector within the parentElement in the iframe context,
    or null if no element matches. */
function findIframeElement(parentElement, selector) {
    if (parentElement === null) {
        throw "parent element is null";
    }
    else {
        return parentElement.querySelector(selector);
    }
}
/** Returns a single element matching the selector within the parent element in an iframe context,
        or throws an exception if no element matches. */
function findRequiredIframeElement(parentElement, selector) {
    const element = findIframeElement(parentElement, selector);
    if (!element) {
        throw "required element " + selector + " not found in iframe";
    }
    else {
        return element;
    }
}
/** Sets an attribute and its value for an HTML element */
function setAttr(element, attr, value) {
    element.setAttribute(attr, value);
}
/** Removes an attribute for an HTML element */
function removeAttr(element, attr) {
    element.removeAttribute(attr);
}
/** Creates an internal stylesheet in an HTML element */
function createStylesheet(element, id, cssStyles) {
    const head = element.querySelector("head");
    const stylesheet = document.createElement("style");
    stylesheet.id = id;
    stylesheet.textContent = cssStyles;
    head.appendChild(stylesheet);
}
/** Removes an existing internal stylesheet in an HTML element */
function removeStylesheet(element, id) {
    const head = element.querySelector("head");
    const stylesheet = head.querySelector("#" + id);
    head.removeChild(stylesheet);
}


/***/ }),

/***/ "./src/IFrameNavigator.ts":
/*!********************************!*\
  !*** ./src/IFrameNavigator.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IFrameNavigator; });
/* harmony import */ var _Cacher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cacher */ "./src/Cacher.ts");
/* harmony import */ var _Publication__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Publication */ "./src/Publication.ts");
/* harmony import */ var _EventHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EventHandler */ "./src/EventHandler.ts");
/* harmony import */ var _BrowserUtilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BrowserUtilities */ "./src/BrowserUtilities.ts");
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts");
/* harmony import */ var _IconLib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IconLib */ "./src/IconLib.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};






const simpleUpLinkTemplate = (href, _label, ariaLabel) => `
<a rel="up" href='${href}' aria-label="${ariaLabel}" style="padding: 0px"><i class="material-icons white-text show-on-large">arrow_back_ios</i></a>
`;
const defaultUpLinkTemplate = (href, label, ariaLabel) => `
<a rel="up" href='${href}' aria-label="${ariaLabel}">
<svg xmlns="http://www.w3.org/2000/svg" width="${_IconLib__WEBPACK_IMPORTED_MODULE_5__["WIDTH_ATTR"]}" height="${_IconLib__WEBPACK_IMPORTED_MODULE_5__["HEIGHT_ATTR"]}" viewBox="${_IconLib__WEBPACK_IMPORTED_MODULE_5__["VIEWBOX_ATTR"]}" aria-labelledby="up-label" preserveAspectRatio="xMidYMid meet" role="img" class="icon">
    <title id="up-label">${label}</title>
    ${_IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].home}
</svg>
<span class="setting-text up">${label}</span>
</a>
`;
const mainTemplate = `
  <main style="overflow: hidden" tabindex=-1 id="iframe-wrapper">
    <div class="loading" style="display:none;">
      ${_IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].loading}
    </div>
    <div class="error" style="display:none;">
      <span>
        ${_IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].error}
      </span>
      <span>There was an error loading this page.</span>
      <button class="go-back">Go back</button>
      <button class="try-again">Try again</button>
    </div>
    <div class="info top">
      <span class="book-title"></span>
    </div>
    <iframe allowtransparency="true" title="ePub Reader" SCROLLING="no"></iframe>
    <div class="info bottom">
      <span class="chapter-position"></span>
      <span class="chapter-title"></span>
    </div>
  </main>
`;
const headerTemplate = `
<div class="controls-trigger">
    <button class="trigger" aria-haspopup="true" aria-expanded="true">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"
        role="img" class="icon menu open inactive-icon" aria-labelledby="menu-icon">
        <title id="menu-icon">Show and hide navigation bar</title>
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path>
    </svg>
    </button>
</div>
<div class="controls">
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" class="svgIcon use">
    <defs>
        <symbol id="close-icon" viewBox="0 0 24 24">
        <title>Close</title>
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"></path>
        </symbol>
    </defs>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" class="svgIcon use">
    <defs>
        <symbol id="check-icon" viewBox="0 0 24 24">
        <title>Checked</title>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"></path>
        </symbol>
    </defs>
    </svg>
    <ul class="links top active">
    <li>
        <button class="contents" aria-labelledby="contents-label" aria-haspopup="true" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"
            role="img" class="icon open" aria-labelledby="toc-icon">
            <title id="toc-icon">Table of Contents</title>
            <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"
            role="img" aria-labelledby="close-icon">
            <use xlink:href="#close-icon"></use>
        </svg>
        <span class="setting-text contents" id="contents-label">Contents</span>
        </button>
        <div class="contents-view controls-view inactive" aria-hidden="true"></div>
    </li>
    <li>
        <button class="landmarks" aria-labelledby="landmarks-label" aria-haspopup="true" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"
            role="img" class="icon open" aria-labelledby="toc-icon">
            <title id="toc-icon">Landmarks</title>
            <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"
            role="img" aria-labelledby="close-icon">
            <use xlink:href="#close-icon"></use>
        </svg>
        <span class="setting-text landmarks" id="landmarks-label">Landmarks</span>
        </button>
        <div class="landmarks-view controls-view inactive" aria-hidden="true"></div>
    </li>
    <li>
        <button class="pageList" aria-labelledby="pageList-label" aria-haspopup="true" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"
            role="img" class="icon open" aria-labelledby="toc-icon">
            <title id="toc-icon">Page List</title>
            <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"
            role="img" aria-labelledby="close-icon">
            <use xlink:href="#close-icon"></use>
        </svg>
        <span class="setting-text pageList" id="landmarks-label">Page List</span>
        </button>
        <div class="pageList-view controls-view inactive" aria-hidden="true"></div>
    </li>
    <li>
        <button class="notes" aria-labelledby="notes-label" aria-haspopup="true" aria-expanded="false">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"
            role="img" class="icon open" aria-labelledby="toc-icon">
            <title id="toc-icon">Notes</title>
            <path d="M4,6H2v16h16v-2H4V6z"></path>
            <path d="M22,2H6v16h16V2z M20,12l-2.5-1.5L15,12V4h5V12z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"
            role="img" aria-labelledby="close-icon">
            <use xlink:href="#close-icon"></use>
        </svg>
        <span class="setting-text notes" id="notes-label">Notes</span>
        </button>
        <div class="notes-view controls-view inactive" aria-hidden="true"></div>
    </li>
    <li>
        <button class="bookmarks" aria-labelledby="bookmarks-label" aria-haspopup="true" aria-expanded="false">
        <i class="material-icons icon open">collections_bookmark</i>
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"
            role="img" aria-labelledby="close-icon">
            <use xlink:href="#close-icon"></use>
        </svg>
        <span class="setting-text bookmarks" id="bookmarks-label">Bookmarks</span>
        </button>
        <div class="bookmarks-view controls-view inactive" aria-hidden="true"></div>
    </li>
    <li>
        <button class="note" aria-labelledby="note-label" aria-haspopup="true" aria-expanded="false">
        <i class="material-icons icon open">speaker_notes</i>
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"
            role="img" aria-labelledby="close-icon">
            <use xlink:href="#close-icon"></use>
        </svg>
        <span class="setting-text note" id="note-label">Add Note</span>
        </button>
        <div class="noteInputView controls-view inactive" aria-hidden="true">
        <ul class="note-menu" role="menu">
            <li>
            <textarea name="text" wrap="soft" class="note-input" name="note-input" placeholder="type your note here"></textarea><br>
            <button id="saveNote" class="saveNote">
                <span>save note</span>
            </button>
            </li>
        </ul>
        </div>
    </li>
    <li>
        <button id="saveBookmark" class="saveBookmark" aria-labelledby="bookmark-label" aria-haspopup="true" aria-expanded="false">
        <i class="material-icons">bookmark</i>
        <span class="setting-text bookmark" id="bookmark-label">Add Bookmark</span>
        </button>
    </li>
    <li>
        <button id="settings-control" class="settings" aria-labelledby="settings-label" aria-expanded="false"
        aria-haspopup="true">
        <i class="material-icons icon open">settings</i>
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"
            role="img" aria-labelledby="close-icon">
            <use xlink:href="#close-icon"></use>
        </svg>
        <span class="setting-text settings" id="settings-label">Settings</span>
        </button>
        <div class="settings-view controls-view inactive" aria-hidden="true"></div>
    </li>
    </ul>
</div>
`;
const footerTemplate = `
<div class="controls">
  <ul class="links bottom active">
    <li>
        <a rel="prev" class="disabled" role="button" aria-labelledby="previous-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" role="img" class="icon" aria-labelledby="previous-icon">
            <title id="previous-icon">Previous Chapter</title>
            <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"></path>
            </svg>
        <span class="chapter-control" id="previous-label">Previous Chapter</span>
        </a>
    </li>
    <li aria-label="chapters">Chapters</li>
    <li>
        <a rel="next" class="disabled" role="button" aria-labelledby="next-label">
        <span class="chapter-control" id="next-label">Next Chapter</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" role="img" class="icon" aria-labelledby="next-icon">
            <title id="next-icon">Next Chapter</title>
            <path d="M6.49 20.13l1.77 1.77 9.9-9.9-9.9-9.9-1.77 1.77L14.62 12l-8.13 8.13z"></path>
        </svg>
        </a>
    </li>
  </ul>
</div>
`;
/** Class that shows webpub resources in an iframe, with navigation controls outside the iframe. */
class IFrameNavigator {
    constructor(store, cacher = null, settings, annotator = null, publisher = null, serif = null, sans = null, day = null, sepia = null, night = null, paginator = null, scroller = null, eventHandler = null, upLinkConfig = null, allowFullscreen = null, useDefaultHeader = null, useDefaultFooter = null, eventTarget = null, initialLastReadingPosition = null, initialAnnotations = null) {
        this.upLink = null;
        this.fullscreen = null;
        this.canFullscreen = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
        this.store = store;
        this.cacher = cacher;
        this.settings = settings;
        this.annotator = annotator;
        this.publisher = publisher;
        this.serif = serif;
        this.sans = sans;
        this.day = day;
        this.sepia = sepia;
        this.night = night;
        this.paginator = paginator;
        this.scroller = scroller;
        this.eventHandler = eventHandler || new _EventHandler__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.upLinkConfig = upLinkConfig;
        this.allowFullscreen = allowFullscreen;
        this.useDefaultHeader = useDefaultHeader;
        this.useDefaultFooter = useDefaultFooter;
        this.eventTarget = eventTarget;
        this.initialLastReadingPosition = initialLastReadingPosition;
        this.initialAnnotations = initialAnnotations;
    }
    static create(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const navigator = new this(config.store, config.cacher || null, config.settings, config.annotator || null, config.publisher || null, config.serif || null, config.sans || null, config.day || null, config.sepia || null, config.night || null, config.paginator || null, config.scroller || null, config.eventHandler || null, config.upLink || null, config.allowFullscreen || null, config.useDefaultHeader || null, config.useDefaultFooter || null, config.eventTarget || null, config.initialLastReadingPosition || null, config.initialAnnotations || null);
            yield navigator.start(config.mainElement, config.headerMenu, config.footerMenu, config.manifestUrl);
            return navigator;
        });
    }
    start(mainElement, headerMenu, footerMenu, manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            mainElement.innerHTML = mainTemplate;
            if (this.useDefaultHeader) {
                headerMenu.innerHTML = headerTemplate;
            }
            if (this.useDefaultFooter) {
                footerMenu.innerHTML = footerTemplate;
            }
            this.manifestUrl = manifestUrl;
            try {
                // Main Element
                this.iframe = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](mainElement, "main#iframe-wrapper iframe");
                this.loadingMessage = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](mainElement, "div[class=loading]");
                this.errorMessage = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](mainElement, "div[class=error]");
                this.tryAgainButton = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](mainElement, "button[class=try-again]");
                this.goBackButton = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](mainElement, "button[class=go-back]");
                this.infoTop = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](mainElement, "div[class='info top']");
                this.infoBottom = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](mainElement, "div[class='info bottom']");
                if (this.useDefaultHeader) {
                    this.bookTitle = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](this.infoTop, "span[class=book-title]");
                }
                else {
                    this.bookTitle = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, ".brand-logo");
                }
                this.chapterTitle = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](this.infoBottom, "span[class=chapter-title]");
                this.chapterPosition = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](this.infoBottom, "span[class=chapter-position]");
                // Header Menu
                this.contentsControl = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, "button.contents");
                this.settingsControl = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, "button.settings");
                this.landmarksControl = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, "button.landmarks");
                this.pageListControl = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, "button.pageList");
                this.saveNoteButton = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, "#saveNote");
                this.addNoteControl = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, "button.note");
                this.noteInputView = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, ".noteInputView");
                this.saveBookmarkButton = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, "#saveBookmark");
                this.bookmarksControl = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, "button.bookmarks");
                this.bookmarksView = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, ".bookmarks-view");
                this.notesControl = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, "button.notes");
                this.notesView = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, ".notes-view");
                this.links = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, "ul.links.top");
                this.linksTopLeft = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, "#nav-mobile-left");
                this.tocView = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, ".contents-view");
                this.landmarksView = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, ".landmarks-view");
                this.pageListView = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, ".pageList-view");
                this.settingsView = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, ".settings-view");
                this.menuControl = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, "button.trigger");
                this.fullscreen = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](headerMenu, "#fullscreen-control");
                // Footer Menu
                this.linksBottom = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](footerMenu, "ul.links.bottom");
                this.linksMiddle = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](footerMenu, "ul.links.middle");
                this.nextChapterLink = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](footerMenu, "a[rel=next]");
                this.previousChapterLink = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](footerMenu, "a[rel=prev]");
                this.newPosition = null;
                this.newElementId = null;
                this.isBeingStyled = true;
                this.isLoading = true;
                this.setupEvents();
                if (this.publisher) {
                    this.publisher.bookElement = this.iframe;
                }
                if (this.serif) {
                    this.serif.bookElement = this.iframe;
                }
                if (this.sans) {
                    this.sans.bookElement = this.iframe;
                }
                if (this.day) {
                    this.day.bookElement = this.iframe;
                }
                if (this.sepia) {
                    this.sepia.bookElement = this.iframe;
                }
                if (this.night) {
                    this.night.bookElement = this.iframe;
                }
                if (this.paginator) {
                    this.paginator.bookElement = this.iframe;
                }
                if (this.scroller) {
                    this.scroller.bookElement = this.iframe;
                }
                if (this.settingsView) {
                    this.settings.renderControls(this.settingsView);
                    if (this.settingsControl) {
                        // Trap keyboard focus inside the settings view when it's displayed.
                        const settingsButtons = this.settingsView.querySelectorAll("button");
                        if (settingsButtons && settingsButtons.length > 0) {
                            const lastSettingsButton = settingsButtons[settingsButtons.length - 1];
                            this.setupModalFocusTrap(this.settingsView, this.settingsControl, lastSettingsButton);
                        }
                    }
                    if (this.cacher) {
                        this.cacher.onStatusUpdate(this.updateOfflineCacheStatus.bind(this));
                        this.enableOffline();
                    }
                }
                this.settings.onFontChange(this.updateFont.bind(this));
                this.settings.onFontSizeChange(this.updateFontSize.bind(this));
                this.settings.onViewChange(this.updateBookView.bind(this));
                // init with initial values
                if (this.initialAnnotations) {
                    var bookmarks = this.initialAnnotations['bookmarks'] || null;
                    var notes = this.initialAnnotations['notes'] || null;
                    if (bookmarks) {
                        this.annotator.initBookmarks(bookmarks);
                    }
                    if (notes) {
                        this.annotator.initNotes(notes);
                    }
                }
                if (this.initialLastReadingPosition) {
                    this.annotator.initLastReadingPosition(this.initialLastReadingPosition);
                }
                return yield this.loadManifest();
            }
            catch (err) {
                // There's a mismatch between the template and the selectors above,
                // or we weren't able to insert the template in the element.
                console.log(err);
                return new Promise((_, reject) => reject(err)).catch(() => { });
            }
        });
    }
    addEventListenerOptional(element, eventType, eventListener) {
        if (element) {
            element.addEventListener(eventType, eventListener);
        }
    }
    setupEvents() {
        this.iframe.addEventListener("load", this.handleIFrameLoad.bind(this));
        const delay = 200;
        let timeout;
        window.addEventListener("resize", () => {
            clearTimeout(timeout);
            timeout = setTimeout(this.handleResize.bind(this), delay);
        });
        this.addEventListenerOptional(this.previousChapterLink, 'click', this.handlePreviousChapterClick.bind(this));
        this.addEventListenerOptional(this.nextChapterLink, 'click', this.handleNextChapterClick.bind(this));
        this.addEventListenerOptional(this.contentsControl, 'click', this.handleControlClick.bind(this, this.tocView, this.contentsControl));
        this.addEventListenerOptional(this.landmarksControl, 'click', this.handleControlClick.bind(this, this.landmarksView, this.landmarksControl));
        this.addEventListenerOptional(this.pageListControl, 'click', this.handleControlClick.bind(this, this.pageListView, this.pageListControl));
        this.addEventListenerOptional(this.settingsControl, 'click', this.handleSettingsClick.bind(this));
        this.addEventListenerOptional(this.settingsView, 'click', this.handleToggleLinksClick.bind(this));
        this.addEventListenerOptional(this.addNoteControl, 'click', this.handleBookmarkClick.bind(this));
        this.addEventListenerOptional(this.saveBookmarkButton, 'click', this.saveBookmark.bind(this));
        this.addEventListenerOptional(this.saveNoteButton, 'click', this.saveNote.bind(this));
        this.addEventListenerOptional(this.bookmarksControl, 'click', this.handleBookmarksClick.bind(this));
        this.addEventListenerOptional(this.notesControl, 'click', this.handleNotesClick.bind(this));
        this.addEventListenerOptional(this.fullscreen, "click", this.toggleFullscreen.bind(this));
        this.tryAgainButton.addEventListener("click", this.tryAgain.bind(this));
        this.goBackButton.addEventListener("click", this.goBack.bind(this));
        this.addEventListenerOptional(this.menuControl, "click", this.handleToggleLinksClick.bind(this));
        this.addEventListenerOptional(this.contentsControl, "keydown", this.hideTOCOnEscape.bind(this));
        this.addEventListenerOptional(this.tocView, "keydown", this.hideTOCOnEscape.bind(this));
        this.addEventListenerOptional(this.settingsControl, "keydown", this.hideSettingsOnEscape.bind(this));
        this.addEventListenerOptional(this.settingsView, "keydown", this.hideSettingsOnEscape.bind(this));
        window.addEventListener("keydown", this.handleKeyboardNavigation.bind(this));
        if (this.allowFullscreen && this.canFullscreen) {
            document.addEventListener("fullscreenchange", this.toggleFullscreenIcon.bind(this));
            document.addEventListener("webkitfullscreenchange", this.toggleFullscreenIcon.bind(this));
            document.addEventListener("mozfullscreenchange", this.toggleFullscreenIcon.bind(this));
            document.addEventListener("MSFullscreenChange", this.toggleFullscreenIcon.bind(this));
        }
        this.addEventListenerOptional(this.addNoteControl, "keydown", this.hideBookmarkOnEscape.bind(this));
        this.addEventListenerOptional(this.bookmarksControl, "keydown", this.hideBookmarksOnEscape.bind(this));
    }
    setupModalFocusTrap(modal, closeButton, lastFocusableElement) {
        // Trap keyboard focus in a modal dialog when it's displayed.
        const TAB_KEY = 9;
        // Going backwards from the close button sends you to the last focusable element.
        closeButton.addEventListener("keydown", (event) => {
            if (this.isDisplayed(modal)) {
                const tab = (event.keyCode === TAB_KEY);
                const shift = !!event.shiftKey;
                if (tab && shift) {
                    lastFocusableElement.focus();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        });
        // Going forward from the last focusable element sends you to the close button.
        lastFocusableElement.addEventListener("keydown", (event) => {
            if (this.isDisplayed(modal)) {
                const tab = (event.keyCode === TAB_KEY);
                const shift = !!event.shiftKey;
                if (tab && !shift) {
                    closeButton.focus();
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        });
    }
    handleKeyboardNavigation(event) {
        const LEFT_ARROW = 37;
        const RIGHT_ARROW = 39;
        if (this.settings.getSelectedView() === this.paginator) {
            if (event.keyCode === LEFT_ARROW) {
                this.handlePreviousPageClick(event);
            }
            else if (event.keyCode === RIGHT_ARROW) {
                this.handleNextPageClick(event);
            }
        }
    }
    ;
    updateFont() {
        this.handleResize();
    }
    updateFontSize() {
        this.handleResize();
    }
    updateBookView() {
        const doNothing = () => { };
        if (this.settings.getSelectedView() === this.paginator) {
            document.body.onscroll = () => { };
            this.chapterTitle.style.display = "inline";
            this.chapterPosition.style.display = "inline";
            if (this.eventHandler) {
                this.eventHandler.onBackwardSwipe = this.handlePreviousPageClick.bind(this);
                this.eventHandler.onForwardSwipe = this.handleNextPageClick.bind(this);
                this.eventHandler.onLeftTap = this.handlePreviousPageClick.bind(this);
                this.eventHandler.onMiddleTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onRightTap = this.handleNextPageClick.bind(this);
                this.eventHandler.onRemoveHover = this.handleRemoveHover.bind(this);
                this.eventHandler.onInternalLink = this.handleInternalLink.bind(this);
                this.eventHandler.onLeftArrow = this.handleKeyboardNavigation.bind(this);
                this.eventHandler.onRightArrow = this.handleKeyboardNavigation.bind(this);
            }
            if (this.useDefaultFooter) {
                if (this.isDisplayed(this.linksBottom)) {
                    this.toggleDisplay(this.linksBottom);
                }
            }
            else {
                if (!this.isDisplayed(this.linksBottom)) {
                    this.toggleDisplay(this.linksBottom);
                }
            }
            if (!this.isDisplayed(this.linksMiddle)) {
                this.toggleDisplay(this.linksMiddle);
            }
        }
        else if (this.settings.getSelectedView() === this.scroller) {
            document.body.onscroll = () => {
                this.saveCurrentReadingPosition();
                if (this.scroller && this.scroller.atBottom()) {
                    // Bring up the bottom nav when you get to the bottom,
                    // if it wasn't already displayed.
                    if (!this.isDisplayed(this.linksBottom)) {
                        this.toggleDisplay(this.linksBottom);
                    }
                    if (!this.isDisplayed(this.linksMiddle)) {
                        this.toggleDisplay(this.linksMiddle);
                    }
                }
                else {
                    // Remove the bottom nav when you scroll back up,
                    // if it was displayed because you were at the bottom.
                    if (this.isDisplayed(this.linksBottom) && !this.isDisplayed(this.links)) {
                        this.toggleDisplay(this.linksBottom);
                    }
                }
            };
            this.chapterTitle.style.display = "none";
            this.chapterPosition.style.display = "none";
            if (this.eventHandler) {
                this.eventHandler.onBackwardSwipe = doNothing;
                this.eventHandler.onForwardSwipe = doNothing;
                this.eventHandler.onLeftTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onMiddleTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onRightTap = this.handleToggleLinksClick.bind(this);
                this.eventHandler.onLeftHover = doNothing;
                this.eventHandler.onRightHover = doNothing;
                this.eventHandler.onRemoveHover = doNothing;
                this.eventHandler.onInternalLink = doNothing;
                this.eventHandler.onLeftArrow = doNothing;
                this.eventHandler.onRightArrow = doNothing;
                this.handleRemoveHover();
            }
            if (this.useDefaultFooter) {
                if (this.isDisplayed(this.links) && !this.isDisplayed(this.linksBottom)) {
                    this.toggleDisplay(this.linksBottom);
                }
            }
            else {
                if (!this.isDisplayed(this.linksBottom)) {
                    this.toggleDisplay(this.linksBottom);
                }
            }
            if (!this.isDisplayed(this.linksMiddle)) {
                this.toggleDisplay(this.linksMiddle);
            }
        }
        setTimeout(() => {
            this.updatePositionInfo();
        }, 100);
    }
    enableOffline() {
        if (this.cacher && this.cacher.getStatus() !== _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Downloaded) {
            this.cacher.enable();
        }
    }
    updateOfflineCacheStatus(status) {
        const statusElement = this.settings.getOfflineStatusElement();
        let statusMessage = "";
        if (status === _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Uncached) {
            statusMessage = "";
        }
        else if (status === _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].UpdateAvailable) {
            statusMessage = "A new version is available. Refresh to update.";
        }
        else if (status === _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].CheckingForUpdate) {
            statusMessage = "Checking for update.";
        }
        else if (status === _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Downloading) {
            statusMessage = "Downloading...";
        }
        else if (status === _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Downloaded) {
            statusMessage = "Downloaded for : use";
        }
        else if (status === _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Error) {
            statusMessage = "Error downloading for offline use";
        }
        if (statusElement) {
            statusElement.innerHTML = statusMessage;
        }
    }
    loadManifest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createSubmenu = (parentElement, links, control, ol = false) => {
                    var menuControl;
                    var mainElement;
                    if (control) {
                        menuControl = control;
                        if (parentElement instanceof HTMLDivElement) {
                            mainElement = parentElement;
                        }
                    }
                    var listElement = document.createElement("ul");
                    if (ol) {
                        listElement = document.createElement("ol");
                    }
                    let lastLink = null;
                    for (const link of links) {
                        const listItemElement = document.createElement("li");
                        const linkElement = document.createElement("a");
                        const spanElement = document.createElement("span");
                        linkElement.style.display = "block";
                        linkElement.style.whiteSpace = "nowrap"; /* forces text to single line */
                        linkElement.style.overflow = "hidden";
                        linkElement.style.textOverflow = "ellipsis";
                        linkElement.tabIndex = -1;
                        let href = "";
                        if (link.href) {
                            href = new URL(link.href, this.manifestUrl.href).href;
                            linkElement.href = href;
                            linkElement.innerHTML = link.title || "";
                            listItemElement.appendChild(linkElement);
                        }
                        else {
                            spanElement.innerHTML = link.title || "";
                            listItemElement.appendChild(spanElement);
                        }
                        if (link.children && link.children.length > 0) {
                            createSubmenu(listItemElement, link.children, null, true);
                        }
                        listElement.appendChild(listItemElement);
                        lastLink = linkElement;
                    }
                    // Trap keyboard focus inside the TOC while it's open.
                    if (lastLink && menuControl) {
                        this.setupModalFocusTrap(mainElement, menuControl, lastLink);
                    }
                    listElement.addEventListener("click", (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        if (event.target && event.target.tagName.toLowerCase() === "a") {
                            let linkElement = event.target;
                            if (linkElement.className.indexOf("active") !== -1) {
                                // This TOC item is already loaded. Hide the TOC
                                // but don't navigate.
                                this.hideView(mainElement, menuControl);
                            }
                            else {
                                // Set focus back to the contents toggle button so screen readers
                                // don't get stuck on a hidden link.
                                menuControl ? menuControl.focus() : null;
                                const position = {
                                    href: linkElement.href,
                                    locations: {
                                        progression: 0
                                    },
                                    created: new Date(),
                                    title: linkElement.title
                                };
                                this.hideView(mainElement, menuControl);
                                this.navigate(position);
                            }
                        }
                    });
                    parentElement.appendChild(listElement);
                };
                const manifest = yield _Publication__WEBPACK_IMPORTED_MODULE_1__["default"].getManifest(this.manifestUrl, this.store);
                const toc = manifest.tableOfContents;
                const landmarks = manifest.landmarks;
                const pageList = manifest.pageList;
                if (this.tocView) {
                    if (toc.length) {
                        this.contentsControl ? this.contentsControl.className = "contents" : null;
                        createSubmenu(this.tocView, toc, this.contentsControl);
                    }
                    else {
                        this.tocView.parentElement.parentElement.removeChild(this.tocView.parentElement);
                    }
                }
                if (this.pageListView) {
                    if (pageList.length) {
                        this.pageListControl ? this.pageListControl.className = "pageList" : null;
                        createSubmenu(this.pageListView, pageList, this.pageListControl);
                    }
                    else {
                        this.pageListView.parentElement.parentElement.removeChild(this.pageListView.parentElement);
                    }
                }
                if (this.landmarksView) {
                    if (landmarks.length) {
                        this.landmarksControl ? this.landmarksControl.className = "landmarks" : null;
                        createSubmenu(this.landmarksView, landmarks, this.landmarksControl);
                    }
                    else {
                        this.landmarksView.parentElement.parentElement.removeChild(this.landmarksView.parentElement);
                    }
                }
                if (!this.useDefaultHeader) {
                    this.showBookmarks();
                    this.showNotes();
                }
                if ((this.links || this.linksTopLeft) && this.upLinkConfig && this.upLinkConfig.url) {
                    const upUrl = this.upLinkConfig.url;
                    const upLabel = this.upLinkConfig.label || "";
                    const upAriaLabel = this.upLinkConfig.ariaLabel || upLabel;
                    var upHTML = defaultUpLinkTemplate(upUrl.href, upLabel, upAriaLabel);
                    if (!this.useDefaultHeader) {
                        upHTML = simpleUpLinkTemplate(upUrl.href, upLabel, upAriaLabel);
                    }
                    const upParent = document.createElement("li");
                    upParent.classList.add("uplink-wrapper");
                    upParent.innerHTML = upHTML;
                    if (this.links) {
                        this.links.insertBefore(upParent, this.links.firstChild);
                        this.upLink = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](this.links, "a[rel=up]");
                    }
                    else {
                        this.linksTopLeft.insertBefore(upParent, this.linksTopLeft.firstChild);
                        this.upLink = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](this.linksTopLeft, "a[rel=up]");
                    }
                }
                if (this.links && this.allowFullscreen && this.canFullscreen) {
                    const fullscreenHTML = `<button id="fullscreen-control" class="fullscreen" aria-hidden="false">${_IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].expand} ${_IconLib__WEBPACK_IMPORTED_MODULE_5__["icons"].minimize}</button>`;
                    const fullscreenParent = document.createElement("li");
                    fullscreenParent.innerHTML = fullscreenHTML;
                    this.links.appendChild(fullscreenParent);
                    this.fullscreen = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredElement"](this.links, "#fullscreen-control");
                    this.fullscreen.addEventListener("click", this.toggleFullscreen.bind(this));
                }
                let lastReadingPosition = null;
                if (this.annotator) {
                    lastReadingPosition = (yield this.annotator.getLastReadingPosition());
                }
                const startLink = manifest.getStartLink();
                let startUrl = null;
                if (startLink && startLink.href) {
                    startUrl = new URL(startLink.href, this.manifestUrl.href).href;
                }
                if (lastReadingPosition) {
                    this.navigate(lastReadingPosition);
                }
                else if (startUrl) {
                    const position = {
                        href: startUrl,
                        locations: {
                            progression: 0
                        },
                        created: new Date(),
                        title: startLink.title
                    };
                    this.navigate(position);
                }
                return new Promise(resolve => resolve());
            }
            catch (err) {
                this.abortOnError();
                return new Promise((_, reject) => reject(err)).catch(() => { });
            }
        });
    }
    handleIFrameLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.errorMessage.style.display = "none";
            this.showLoadingMessageAfterDelay();
            try {
                if (this.useDefaultHeader) {
                    this.hideView(this.tocView, this.contentsControl);
                }
                let bookViewPosition = 0;
                if (this.newPosition) {
                    bookViewPosition = this.newPosition.locations.progression;
                    this.newPosition = null;
                }
                this.updateFont();
                this.updateFontSize();
                this.updateBookView();
                this.settings.getSelectedFont().start();
                this.settings.getSelectedTheme().start();
                this.settings.getSelectedView().start(bookViewPosition);
                setTimeout(() => {
                    this.settings.getSelectedView().goToPosition(bookViewPosition);
                    this.updatePositionInfo();
                }, 100);
                if (this.newElementId) {
                    this.settings.getSelectedView().goToElement(this.newElementId);
                    this.newElementId = null;
                }
                let currentLocation = this.iframe.src;
                if (this.iframe.contentDocument && this.iframe.contentDocument.location && this.iframe.contentDocument.location.href) {
                    currentLocation = this.iframe.contentDocument.location.href;
                }
                if (currentLocation.indexOf("#") !== -1) {
                    // Letting the iframe load the anchor itself doesn't always work.
                    // For example, with CSS column-based pagination, you can end up
                    // between two columns, and we can't reset the position in some
                    // browsers. Instead, we grab the element id and reload the iframe
                    // without it, then let the view figure out how to go to that element
                    // on the next load event.
                    const elementId = currentLocation.slice(currentLocation.indexOf("#") + 1);
                    // Set the element to go to the next time the iframe loads.
                    this.newElementId = elementId;
                    // Reload the iframe without the anchor.
                    this.iframe.src = currentLocation.slice(0, currentLocation.indexOf("#"));
                    return new Promise(resolve => resolve());
                }
                this.updatePositionInfo();
                const manifest = yield _Publication__WEBPACK_IMPORTED_MODULE_1__["default"].getManifest(this.manifestUrl, this.store);
                const previous = manifest.getPreviousSpineItem(currentLocation);
                if (previous && previous.href) {
                    this.previousChapterUrl = new URL(previous.href, this.manifestUrl.href).href;
                }
                if (this.previousChapterLink) {
                    if (this.previousChapterUrl) {
                        this.previousChapterLink.href = this.previousChapterUrl;
                        this.previousChapterLink.className = "";
                    }
                    else {
                        this.previousChapterLink.removeAttribute("href");
                        this.previousChapterLink.className = "disabled";
                        this.handleRemoveHover();
                    }
                }
                const next = manifest.getNextSpineItem(currentLocation);
                if (next && next.href) {
                    this.nextChapterUrl = new URL(next.href, this.manifestUrl.href).href;
                }
                if (this.nextChapterLink) {
                    if (this.nextChapterUrl) {
                        this.nextChapterLink.href = this.nextChapterUrl;
                        this.nextChapterLink.className = "";
                    }
                    else {
                        this.nextChapterLink.removeAttribute("href");
                        this.nextChapterLink.className = "disabled";
                        this.handleRemoveHover();
                    }
                }
                this.setActiveTOCItem(currentLocation);
                if (manifest.metadata.title) {
                    this.bookTitle.innerHTML = manifest.metadata.title;
                }
                let chapterTitle;
                const spineItem = manifest.getSpineItem(currentLocation);
                if (spineItem !== null) {
                    chapterTitle = spineItem.title;
                }
                if (!chapterTitle) {
                    const tocItem = manifest.getTOCItem(currentLocation);
                    if (tocItem !== null && tocItem.title) {
                        chapterTitle = tocItem.title;
                    }
                }
                if (chapterTitle) {
                    this.chapterTitle.innerHTML = "(" + chapterTitle + ")";
                }
                else {
                    this.chapterTitle.innerHTML = "(Current Chapter)";
                }
                if (this.eventHandler) {
                    this.eventHandler.setupEvents(this.iframe.contentDocument);
                }
                if (this.annotator) {
                    yield this.saveCurrentReadingPosition();
                }
                this.hideLoadingMessage();
                this.showIframeContents();
                // Inject Readium CSS into Iframe Head
                const head = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredIframeElement"](this.iframe.contentDocument, "head");
                if (head) {
                    const beforeCss = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](head, 'link[rel=stylesheet][href~="/viewer/readium-css/ReadiumCSS-before.css"]');
                    const defaultCss = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](head, 'link[rel=stylesheet][href~="/viewer/readium-css/ReadiumCSS-default.css"]');
                    const afterCss = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findElement"](head, 'link[rel=stylesheet][href~="/viewer/readium-css/ReadiumCSS-after.css"]');
                    if (!beforeCss) {
                        head.appendChild(this.creatCssLink('/viewer/readium-css/ReadiumCSS-before.css'));
                    }
                    if (!defaultCss) {
                        head.appendChild(this.creatCssLink('/viewer/readium-css/ReadiumCSS-default.css'));
                    }
                    if (!afterCss) {
                        head.appendChild(this.creatCssLink('/viewer/readium-css/ReadiumCSS-after.css'));
                    }
                }
                return new Promise(resolve => resolve());
            }
            catch (err) {
                this.abortOnError();
                return new Promise((_, reject) => reject(err)).catch(() => { });
            }
        });
    }
    abortOnError() {
        this.errorMessage.style.display = "block";
        if (this.isLoading) {
            this.hideLoadingMessage();
        }
    }
    tryAgain() {
        this.iframe.src = this.iframe.src;
        this.enableOffline();
    }
    goBack() {
        window.history.back();
    }
    isDisplayed(element) {
        return element ? element.className.indexOf(" active") !== -1 : false;
    }
    showElement(element, control) {
        if (element) {
            element.className = element.className.replace(" inactive", "");
            if (element.className.indexOf(" active") === -1) {
                element.className += " active";
            }
            element.setAttribute("aria-hidden", "false");
            if (control) {
                control.setAttribute("aria-expanded", "true");
                const openIcon = control.querySelector(".icon.open");
                if (openIcon && (openIcon.getAttribute("class") || "").indexOf(" inactive-icon") === -1) {
                    const newIconClass = (openIcon.getAttribute("class") || "") + " inactive-icon";
                    openIcon.setAttribute("class", newIconClass);
                }
                const closeIcon = control.querySelector(".icon.close");
                if (closeIcon) {
                    const newIconClass = (closeIcon.getAttribute("class") || "").replace(" inactive-icon", "");
                    closeIcon.setAttribute("class", newIconClass);
                }
            }
            // Add buttons and links in the element to the tab order.
            const buttons = Array.prototype.slice.call(element.querySelectorAll("button"));
            const links = Array.prototype.slice.call(element.querySelectorAll("a"));
            for (const button of buttons) {
                button.tabIndex = 0;
            }
            for (const link of links) {
                link.tabIndex = 0;
            }
        }
    }
    hideElement(element, control) {
        if (element) {
            element.className = element.className.replace(" active", "");
            if (element.className.indexOf(" inactive") === -1) {
                element.className += " inactive";
            }
            element.setAttribute("aria-hidden", "true");
            if (control) {
                control.setAttribute("aria-expanded", "false");
                const openIcon = control.querySelector(".icon.open");
                if (openIcon) {
                    const newIconClass = (openIcon.getAttribute("class") || "").replace(" inactive-icon", "");
                    openIcon.setAttribute("class", newIconClass);
                }
                const closeIcon = control.querySelector(".icon.close");
                if (closeIcon && (closeIcon.getAttribute("class") || "").indexOf(" inactive-icon") === -1) {
                    const newIconClass = (closeIcon.getAttribute("class") || "") + " inactive-icon";
                    closeIcon.setAttribute("class", newIconClass);
                }
            }
            // Remove buttons and links in the element from the tab order.
            const buttons = Array.prototype.slice.call(element.querySelectorAll("button"));
            const links = Array.prototype.slice.call(element.querySelectorAll("a"));
            for (const button of buttons) {
                button.tabIndex = -1;
            }
            for (const link of links) {
                link.tabIndex = -1;
            }
        }
    }
    showModal(modal, control) {
        // Hide the rest of the page for screen readers.
        this.iframe.setAttribute("aria-hidden", "true");
        if (this.upLink) {
            this.upLink.setAttribute("aria-hidden", "true");
        }
        if (this.fullscreen) {
            this.fullscreen.setAttribute("aria-hidden", "true");
        }
        if (this.contentsControl) {
            this.contentsControl.setAttribute("aria-hidden", "true");
        }
        if (this.settingsControl) {
            this.settingsControl.setAttribute("aria-hidden", "true");
        }
        if (this.linksBottom) {
            this.linksBottom.setAttribute("aria-hidden", "true");
        }
        if (this.linksMiddle) {
            this.linksMiddle.setAttribute("aria-hidden", "true");
        }
        this.loadingMessage.setAttribute("aria-hidden", "true");
        this.errorMessage.setAttribute("aria-hidden", "true");
        this.infoTop.setAttribute("aria-hidden", "true");
        this.infoBottom.setAttribute("aria-hidden", "true");
        if (control) {
            control.setAttribute("aria-hidden", "false");
        }
        this.showElement(modal, control);
    }
    hideModal(modal, control) {
        // Restore the page for screen readers.
        this.iframe.setAttribute("aria-hidden", "false");
        if (this.upLink) {
            this.upLink.setAttribute("aria-hidden", "false");
        }
        if (this.fullscreen) {
            this.fullscreen.setAttribute("aria-hidden", "false");
        }
        if (this.contentsControl) {
            this.contentsControl.setAttribute("aria-hidden", "false");
        }
        if (this.settingsControl) {
            this.settingsControl.setAttribute("aria-hidden", "false");
        }
        if (this.linksBottom) {
            this.linksBottom.setAttribute("aria-hidden", "false");
        }
        if (this.linksMiddle) {
            this.linksMiddle.setAttribute("aria-hidden", "false");
        }
        this.loadingMessage.setAttribute("aria-hidden", "false");
        this.errorMessage.setAttribute("aria-hidden", "false");
        this.infoTop.setAttribute("aria-hidden", "false");
        this.infoBottom.setAttribute("aria-hidden", "false");
        this.hideElement(modal, control);
    }
    toggleFullscreenIcon() {
        if (this.fullscreen) {
            const activeIcon = this.fullscreen.querySelector(".icon.active-icon");
            const inactiveIcon = this.fullscreen.querySelector(".icon.inactive-icon");
            if (activeIcon && (activeIcon.getAttribute("class") || "").indexOf(" inactive-icon") === -1) {
                const newIconClass = "icon inactive-icon";
                activeIcon.setAttribute("class", newIconClass);
            }
            if (inactiveIcon) {
                const newIconClass = "icon active-icon";
                inactiveIcon.setAttribute("class", newIconClass);
            }
        }
    }
    toggleFullscreen() {
        if (this.fullscreen) {
            const doc = document;
            const docEl = document.documentElement;
            const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
            const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
            if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                requestFullScreen.call(docEl);
            }
            else {
                cancelFullScreen.call(doc);
            }
        }
    }
    toggleDisplay(element, control) {
        if (!this.isDisplayed(element)) {
            this.showElement(element, control);
        }
        else {
            this.hideElement(element, control);
        }
        if (element === this.linksMiddle) {
            if (this.settings.getSelectedView() === this.scroller) {
                this.showElement(element, control);
            }
            else {
                this.hideElement(element, control);
            }
        }
    }
    toggleModal(modal, control) {
        if (!this.isDisplayed(modal)) {
            this.showModal(modal, control);
        }
        else {
            this.hideModal(modal, control);
        }
    }
    handleToggleLinksClick(event) {
        if (this.useDefaultHeader) {
            this.hideView(this.tocView, this.contentsControl);
            this.hideSettings();
            this.hideBookmarks();
            this.hideNotes();
        }
        this.toggleDisplay(this.links, this.menuControl);
        if (this.settings.getSelectedView() === this.scroller) {
            if (!this.scroller.atBottom()) {
                this.toggleDisplay(this.linksBottom);
            }
        }
        event.preventDefault();
        event.stopPropagation();
    }
    handlePreviousPageClick(event) {
        if (this.paginator) {
            if (this.paginator.onFirstPage()) {
                if (this.previousChapterUrl) {
                    const position = {
                        href: this.previousChapterUrl,
                        locations: {
                            progression: 1
                        },
                        created: new Date(),
                        title: "previousChapterUrl.title" // TODO: need to get the actual chapter title. 
                    };
                    this.navigate(position);
                    var pagi = this.paginator;
                    setTimeout(() => {
                        pagi.goToPosition(1);
                        this.updatePositionInfo();
                        this.saveCurrentReadingPosition();
                    }, 1);
                }
            }
            else {
                this.paginator.goToPreviousPage();
                this.updatePositionInfo();
                this.saveCurrentReadingPosition();
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }
    handleNextPageClick(event) {
        if (this.paginator) {
            if (this.paginator.onLastPage()) {
                if (this.nextChapterUrl) {
                    const position = {
                        href: this.nextChapterUrl,
                        locations: {
                            progression: 0
                        },
                        created: new Date(),
                        title: "nextChapterUrl.title" // TODO: need to get the actual chapter title. 
                    };
                    this.navigate(position);
                    var pagi = this.paginator;
                    setTimeout(() => {
                        pagi.goToPosition(0);
                        this.updatePositionInfo();
                        this.saveCurrentReadingPosition();
                    }, 1);
                }
            }
            else {
                this.paginator.goToNextPage();
                this.updatePositionInfo();
                this.saveCurrentReadingPosition();
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }
    handleRemoveHover() {
        this.iframe.className = "";
    }
    handleInternalLink(event) {
        const element = event.target;
        let currentLocation = this.iframe.src.split("#")[0];
        if (this.iframe.contentDocument && this.iframe.contentDocument.location && this.iframe.contentDocument.location.href) {
            currentLocation = this.iframe.contentDocument.location.href.split("#")[0];
        }
        if (element && element.tagName.toLowerCase() === "a") {
            if (element.href.split("#")[0] === currentLocation) {
                const elementId = element.href.split("#")[1];
                this.settings.getSelectedView().goToElement(elementId, true);
                this.updatePositionInfo();
                this.saveCurrentReadingPosition();
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }
    handleResize() {
        const selectedView = this.settings.getSelectedView();
        const oldPosition = selectedView.getCurrentPosition();
        const fontSize = this.settings.getSelectedFontSize();
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_4__["findRequiredIframeElement"](this.iframe.contentDocument, "html");
        // TODO: might need to replace fontsize in px to fontsize in %
        html.style.setProperty("--USER__fontSize", fontSize);
        const fontSizeNumber = parseInt(fontSize.slice(0, -2));
        let sideMargin = fontSizeNumber * 2;
        // if (BrowserUtilities.getWidth() > fontSizeNumber * 45) {
        //     const extraMargin = Math.floor((BrowserUtilities.getWidth() - fontSizeNumber * 40) / 2);
        //     sideMargin = sideMargin + extraMargin;
        // }
        if (this.paginator) {
            this.paginator.sideMargin = sideMargin;
        }
        if (this.scroller) {
            this.scroller.sideMargin = sideMargin;
        }
        // If the links are hidden, show them temporarily
        // to determine the top and bottom heights.
        const linksHidden = !this.isDisplayed(this.links);
        if (linksHidden) {
            this.toggleDisplay(this.links);
        }
        var topHeight = this.links ? this.links.clientHeight : 40;
        if (this.useDefaultHeader) {
            this.infoTop.style.height = topHeight + "px";
        }
        else {
            topHeight = this.links ? this.links.clientHeight : 70;
            this.infoTop.style.height = 10 + "px";
            this.infoTop.style.minHeight = 10 + "px";
        }
        if (linksHidden) {
            this.toggleDisplay(this.links);
        }
        const linksBottomHidden = !this.isDisplayed(this.linksBottom);
        if (linksBottomHidden) {
            this.toggleDisplay(this.linksBottom);
        }
        const bottomHeight = this.linksBottom ? this.linksBottom.clientHeight : 40;
        if (this.useDefaultFooter) {
            this.infoBottom.style.height = bottomHeight + "px";
        }
        else {
            this.infoBottom.style.height = 30 + "px";
        }
        if (linksBottomHidden) {
            this.toggleDisplay(this.linksBottom);
        }
        if (this.paginator) {
            if (this.useDefaultHeader && this.useDefaultFooter) {
                this.paginator.height = (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_3__["getHeight"]() - topHeight - bottomHeight - 10);
            }
            else if (this.useDefaultHeader) {
                this.paginator.height = (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_3__["getHeight"]() - topHeight - 10 - 40 - 10);
            }
            else if (this.useDefaultFooter) {
                this.paginator.height = (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_3__["getHeight"]() - 70 - bottomHeight - 10);
            }
            else {
                this.paginator.height = (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_3__["getHeight"]() - 70 - 10 - 40 - 10);
            }
        }
        if (this.scroller) {
            this.scroller.height = (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_3__["getHeight"]() - topHeight - bottomHeight - 10);
        }
        setTimeout(() => {
            selectedView.goToPosition(oldPosition);
            this.updatePositionInfo();
        }, 100);
    }
    updatePositionInfo() {
        if (this.settings.getSelectedView() === this.paginator) {
            const currentPage = Math.round(this.paginator.getCurrentPage());
            const pageCount = Math.round(this.paginator.getPageCount());
            this.chapterPosition.innerHTML = "Page " + currentPage + " of " + pageCount;
        }
        else {
            this.chapterPosition.innerHTML = "";
        }
    }
    handlePreviousChapterClick(event) {
        if (this.settings.getSelectedView() === this.paginator) {
            this.handlePreviousPageClick(event);
        }
        else {
            if (this.previousChapterUrl) {
                const position = {
                    href: this.previousChapterUrl,
                    locations: {
                        progression: 1
                    },
                    created: new Date(),
                    title: "previousChapterUrl.title" // TODO: need to get the actual chapter title. 
                };
                this.navigate(position);
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }
    handleNextChapterClick(event) {
        if (this.settings.getSelectedView() === this.paginator) {
            this.handleNextPageClick(event);
        }
        else {
            if (this.nextChapterUrl) {
                const position = {
                    href: this.nextChapterUrl,
                    locations: {
                        progression: 0
                    },
                    created: new Date(),
                    title: "nextChapterUrl.title" // TODO: need to get the actual chapter title. 
                };
                this.navigate(position);
            }
            event.preventDefault();
            event.stopPropagation();
        }
    }
    handleControlClick(view, control, event) {
        if (this.useDefaultHeader) {
            this.hideSettings();
            this.hideBookmarks();
            this.hideNotes();
            this.hideNoteInputView();
        }
        if (view != this.tocView && this.isDisplayed(this.tocView)) {
            this.hideModal(this.tocView, this.contentsControl);
        }
        if (view != this.landmarksView && this.isDisplayed(this.landmarksView)) {
            this.hideModal(this.landmarksView, this.landmarksControl);
        }
        if (view != this.pageListView && this.isDisplayed(this.pageListView)) {
            this.hideModal(this.pageListView, this.pageListControl);
        }
        this.toggleModal(view, control);
        // While the TOC is displayed, prevent scrolling in the book.
        if (this.settings.getSelectedView() === this.scroller) {
            if (this.isDisplayed(view)) {
                document.body.style.overflow = "hidden";
            }
            else {
                document.body.style.overflow = "auto";
            }
        }
        event.preventDefault();
        event.stopPropagation();
    }
    hideNotes() {
        this.hideModal(this.notesView, this.notesControl);
    }
    hideBookmarks() {
        this.hideModal(this.bookmarksView, this.bookmarksControl);
    }
    hideNoteInputView() {
        this.hideModal(this.noteInputView, this.addNoteControl);
    }
    hideBookmarksOnEscape(event) {
        const ESCAPE_KEY = 27;
        if (this.isDisplayed(this.bookmarksView) && event.keyCode === ESCAPE_KEY) {
            this.hideModal(this.bookmarksView, this.bookmarksControl);
        }
    }
    hideBookmarkOnEscape(event) {
        const ESCAPE_KEY = 27;
        if (this.isDisplayed(this.noteInputView) && event.keyCode === ESCAPE_KEY) {
            this.hideModal(this.noteInputView, this.addNoteControl);
        }
    }
    hideView(view, control) {
        if (this.useDefaultHeader) {
            this.hideModal(view, control);
        }
        if (this.settings.getSelectedView() === this.scroller) {
            document.body.style.overflow = "auto";
        }
    }
    hideTOCOnEscape(event) {
        const ESCAPE_KEY = 27;
        if (this.isDisplayed(this.tocView) && event.keyCode === ESCAPE_KEY) {
            this.hideView(this.tocView, this.contentsControl);
        }
    }
    setActiveTOCItem(resource) {
        if (this.tocView) {
            const allItems = Array.prototype.slice.call(this.tocView.querySelectorAll("li > a"));
            for (const item of allItems) {
                item.className = "";
            }
            const activeItem = this.tocView.querySelector('li > a[href^="' + resource + '"]');
            if (activeItem) {
                activeItem.className = "active";
            }
        }
    }
    saveBookmark() {
        if (this.useDefaultHeader) {
            this.hideView(this.tocView, this.contentsControl);
            this.hideView(this.landmarksView, this.landmarksControl);
            this.hideView(this.pageListView, this.pageListControl);
            this.hideBookmarks();
            this.hideNotes();
            this.hideSettings();
            this.hideNoteInputView();
        }
        if (this.annotator) {
            const resource = this.iframe.src;
            const bookmarkPosition = this.settings.getSelectedView().getCurrentPosition();
            let bookmarkTitle = 'Bookmark';
            if (this.noteInputView) {
                let bookmarkInput = this.noteInputView.querySelector("textarea");
                if (bookmarkInput && bookmarkInput.value) {
                    bookmarkTitle = bookmarkInput.value;
                    bookmarkInput.value = '';
                }
            }
            const bookmark = {
                href: resource,
                locations: {
                    progression: bookmarkPosition
                },
                created: new Date(),
                title: bookmarkTitle //this.chapterTitle.innerText // TODO replace with actual chapter title and not with the html 
            };
            var saved = this.annotator.saveBookmark(bookmark);
            if (this.eventTarget) {
                this.eventTarget.dispatchEvent(new CustomEvent('r2.bookmark.added', { detail: bookmark }));
            }
            if (!this.useDefaultHeader) {
                this.showBookmarks();
            }
            return saved;
        }
        else {
            return new Promise(resolve => resolve());
        }
    }
    saveNote() {
        if (this.annotator) {
            const resource = this.iframe.src;
            const notePosition = this.settings.getSelectedView().getCurrentPosition();
            let noteTitle = 'Note';
            if (this.noteInputView) {
                let noteInput = this.noteInputView.querySelector("textarea");
                if (noteInput && noteInput.value) {
                    noteTitle = noteInput.value;
                    noteInput.value = '';
                }
            }
            if (noteTitle === 'Note') {
                return new Promise(resolve => resolve());
            }
            else {
                if (this.useDefaultHeader) {
                    this.hideNoteInputView();
                }
                const note = {
                    href: resource,
                    locations: {
                        progression: notePosition
                    },
                    created: new Date(),
                    title: noteTitle,
                    note: noteTitle
                };
                var saved = this.annotator.saveNote(note);
                if (this.eventTarget) {
                    this.eventTarget.dispatchEvent(new CustomEvent('r2.note.added', { detail: note }));
                }
                if (!this.useDefaultHeader) {
                    this.showNotes();
                }
                return saved;
            }
        }
        else {
            return new Promise(resolve => resolve());
        }
    }
    handleBookmarkClick(event) {
        if (this.useDefaultHeader) {
            this.hideSettings();
            this.hideView(this.tocView, this.contentsControl);
            this.hideView(this.landmarksView, this.landmarksControl);
            this.hideView(this.pageListView, this.pageListControl);
            this.hideBookmarks();
            this.hideNotes();
        }
        this.toggleModal(this.noteInputView, this.addNoteControl);
        event.preventDefault();
        event.stopPropagation();
    }
    handleBookmarksClick(event) {
        this.showBookmarks();
        if (this.useDefaultHeader) {
            this.hideNoteInputView();
            this.hideSettings();
            this.hideView(this.tocView, this.contentsControl);
            this.hideView(this.landmarksView, this.landmarksControl);
            this.hideView(this.pageListView, this.pageListControl);
            this.hideNotes();
        }
        this.toggleModal(this.bookmarksView, this.bookmarksControl);
        event.preventDefault();
        event.stopPropagation();
    }
    handleNotesClick(event) {
        this.showNotes();
        if (this.useDefaultHeader) {
            this.hideNoteInputView();
            this.hideSettings();
            this.hideView(this.tocView, this.contentsControl);
            this.hideView(this.landmarksView, this.landmarksControl);
            this.hideView(this.pageListView, this.pageListControl);
            this.hideBookmarks();
        }
        this.toggleModal(this.notesView, this.notesControl);
        event.preventDefault();
        event.stopPropagation();
    }
    showBookmarks() {
        return __awaiter(this, void 0, void 0, function* () {
            let bookmarks = [];
            if (this.annotator) {
                bookmarks = (yield this.annotator.getBookmarks());
            }
            const manifest = yield _Publication__WEBPACK_IMPORTED_MODULE_1__["default"].getManifest(this.manifestUrl, this.store);
            this.createTree(bookmarks, manifest, this.bookmarksView, this.bookmarksControl);
        });
    }
    showNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            let notes = [];
            if (this.annotator) {
                notes = (yield this.annotator.getNotes());
            }
            const manifest = yield _Publication__WEBPACK_IMPORTED_MODULE_1__["default"].getManifest(this.manifestUrl, this.store);
            this.createTree(notes, manifest, this.notesView, this.notesControl);
        });
    }
    createTree(annotations, manifest, view, control) {
        if (annotations) {
            const me = this;
            const toc = manifest.tableOfContents;
            if (toc.length && this.tocView) {
                const createAnnotationTree = (parentElement, links) => {
                    let chapterList = document.createElement("ul");
                    chapterList.className = 'chapter-list';
                    for (const link of links) {
                        let chapterHeader = document.createElement("li");
                        chapterHeader.className = 'chapter-header';
                        const linkElement = document.createElement("a");
                        const spanElement = document.createElement("span");
                        linkElement.tabIndex = -1;
                        linkElement.style.display = "block";
                        linkElement.style.whiteSpace = "nowrap"; /* forces text to single line */
                        linkElement.style.overflow = "hidden";
                        linkElement.style.textOverflow = "ellipsis";
                        let href = "";
                        if (link.href) {
                            href = new URL(link.href, this.manifestUrl.href).href;
                            linkElement.href = href;
                            linkElement.innerHTML = link.title || "";
                            chapterHeader.appendChild(linkElement);
                        }
                        else {
                            spanElement.innerHTML = link.title || "";
                            chapterHeader.appendChild(spanElement);
                        }
                        linkElement.addEventListener("click", (event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            if (this.useDefaultHeader) {
                                this.hideModal(view, control);
                            }
                            const position = {
                                href: linkElement.href,
                                locations: {
                                    progression: 0
                                },
                                created: new Date(),
                                title: linkElement.title
                            };
                            this.navigate(position);
                        });
                        const bookmarkList = document.createElement("ol");
                        bookmarkList.className = 'bookmarks-list';
                        annotations.forEach(function (bookmark) {
                            if (link.href && bookmark.href.endsWith(link.href)) {
                                let bookmarkItem = document.createElement("li");
                                let bookmarkLink = document.createElement("a");
                                bookmarkLink.setAttribute("href", bookmark.href);
                                bookmarkLink.innerHTML = bookmark.title; // TODO: ??????
                                bookmarkLink.addEventListener("click", (event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    me.handleAnnotationLinkClick(event, bookmark, view, control);
                                });
                                bookmarkItem.appendChild(bookmarkLink);
                                bookmarkList.appendChild(bookmarkItem);
                            }
                        });
                        if (bookmarkList.children.length > 0) {
                            chapterList.appendChild(chapterHeader);
                            chapterList.appendChild(bookmarkList);
                        }
                        if (chapterList.children.length > 0) {
                            parentElement.appendChild(chapterList);
                        }
                        if (link.children && link.children.length > 0) {
                            createAnnotationTree(parentElement, link.children);
                        }
                    }
                };
                view.innerHTML = '';
                createAnnotationTree(view, toc);
            }
        }
    }
    handleAnnotationLinkClick(event, bookmark, view, control) {
        if (this.useDefaultHeader) {
            this.hideModal(view, control);
        }
        if (bookmark) {
            this.navigate(bookmark);
        }
        else {
            console.log('bookmark data missing: ', event);
        }
    }
    handleSettingsClick(event) {
        if (this.useDefaultHeader) {
            this.hideView(this.tocView, this.contentsControl);
            this.hideView(this.landmarksView, this.landmarksControl);
            this.hideView(this.pageListView, this.pageListControl);
            this.hideBookmarks();
            this.hideNotes();
            this.hideNoteInputView();
        }
        this.toggleModal(this.settingsView, this.settingsControl);
        event.preventDefault();
        event.stopPropagation();
    }
    hideSettings() {
        this.hideModal(this.settingsView, this.settingsControl);
    }
    hideSettingsOnEscape(event) {
        const ESCAPE_KEY = 27;
        if (this.isDisplayed(this.settingsView) && event.keyCode === ESCAPE_KEY) {
            this.hideSettings();
        }
    }
    navigate(locator) {
        this.hideIframeContents();
        this.showLoadingMessageAfterDelay();
        this.newPosition = locator;
        if (locator.href.indexOf("#") === -1) {
            this.iframe.src = locator.href;
        }
        else {
            // We're navigating to an anchor within the resource,
            // rather than the resource itself. Go to the resource
            // first, then go to the anchor.
            this.newElementId = locator.href.slice(locator.href.indexOf("#") + 1);
            const newResource = locator.href.slice(0, locator.href.indexOf("#"));
            if (newResource === this.iframe.src) {
                // The resource isn't changing, but handle it like a new
                // iframe load to hide the menus and popups and go to the 
                // new element.
                this.handleIFrameLoad();
            }
            else {
                this.iframe.src = newResource;
            }
        }
        if (this.paginator) {
            this.paginator.goToPosition(locator.locations.progression);
        }
    }
    showIframeContents() {
        this.isBeingStyled = false;
        // We set a timeOut so that settings can be applied when opacity is still 0
        setTimeout(() => {
            if (!this.isBeingStyled) {
                this.iframe.style.opacity = "1";
            }
        }, 150);
    }
    showLoadingMessageAfterDelay() {
        this.isLoading = true;
        setTimeout(() => {
            if (this.isLoading) {
                this.loadingMessage.style.display = "block";
                this.loadingMessage.classList.add("is-loading");
            }
        }, 200);
    }
    hideIframeContents() {
        this.isBeingStyled = true;
        this.iframe.style.opacity = "0";
    }
    hideLoadingMessage() {
        this.isLoading = false;
        this.loadingMessage.style.display = "none";
        this.loadingMessage.classList.remove("is-loading");
    }
    saveCurrentReadingPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.annotator) {
                const position = {
                    href: this.iframe.src,
                    locations: {
                        progression: this.settings.getSelectedView().getCurrentPosition()
                    },
                    created: new Date(),
                    title: "Last Reading Position" // this.chapterTitle.innerText // TODO replace with actual chapter title and not with the html 
                };
                if (this.eventTarget) {
                    this.eventTarget.dispatchEvent(new CustomEvent('r2.lastreadposition.changed', { detail: position }));
                }
                return this.annotator.saveLastReadingPosition(position);
            }
            else {
                return new Promise(resolve => resolve());
            }
        });
    }
    creatCssLink(href) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = href;
        return cssLink;
    }
}


/***/ }),

/***/ "./src/IconLib.ts":
/*!************************!*\
  !*** ./src/IconLib.ts ***!
  \************************/
/*! exports provided: WIDTH_ATTR, HEIGHT_ATTR, VIEWBOX_ATTR, icons */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WIDTH_ATTR", function() { return WIDTH_ATTR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEIGHT_ATTR", function() { return HEIGHT_ATTR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEWBOX_ATTR", function() { return VIEWBOX_ATTR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "icons", function() { return icons; });
const WIDTH_ATTR = 24;
const HEIGHT_ATTR = 24;
const VIEWBOX_ATTR = `0 0 24 24`;
const iconTemplate = (id, title, path, classAttr = `icon`) => `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH_ATTR}" height="${HEIGHT_ATTR}" viewBox="${VIEWBOX_ATTR}" preserveAspectRatio="xMidYMid meet" role="img" class="${classAttr}" aria-labelledBy="${id}">
  <title id="${id}">${title}</title>
  ${path}
</svg>`;
const iconSymbol = (id, title, path, classAttr = `svgIcon use`) => `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" class="${classAttr}">
  <defs>
    <symbol id="${id}" viewBox="${VIEWBOX_ATTR}">
      <title>${title}</title>
      ${path}
    </symbol>
  </defs>
</svg>`;
const iconUse = (id, classAttr) => `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="${classAttr}" role="img" aria-labelledby="${id}">
  <use xlink:href="#${id}"></use>
</svg>`;
const icons = {
    "checkOriginal": iconSymbol(`check-icon`, `Checked`, `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>`),
    "checkDupe": iconUse("check-icon", "checkedIcon"),
    "closeOriginal": iconSymbol(`close-icon`, `Close`, `<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/>`),
    "closeDupe": iconUse("close-icon", "icon close inactive-icon"),
    "error": iconTemplate(`error-icon`, `Warning`, `<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>`),
    "home": `<path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>`,
    "expand": iconTemplate(`expand-icon`, `Enter fullscreen`, `<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>`, `icon active-icon`),
    "loading": iconTemplate(`loading-icon`, `Loading`, `<path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>`),
    "menu": iconTemplate(`menu-icon`, `Show and hide navigation bar`, `<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/>`, `icon menu open inactive-icon`),
    "minimize": iconTemplate(`minimize-icon`, `Exit fullscreen`, `<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>`, `icon inactive-icon`),
    "next": iconTemplate(`next-icon`, `Next Chapter`, `<path d="M6.49 20.13l1.77 1.77 9.9-9.9-9.9-9.9-1.77 1.77L14.62 12l-8.13 8.13z"/>`),
    "previous": iconTemplate(`previous-icon`, `Previous Chapter`, `<path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/>`),
    "settings": iconTemplate(`settings-icon`, `Settings`, `<path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>`, `icon open`),
    "toc": iconTemplate(`toc-icon`, `Table of Contents`, `<path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"/>`, `icon open`),
    "bookmarks": iconTemplate(`toc-icon`, `Bookmarks`, `<path d="M4,6H2v16h16v-2H4V6z"/><path d="M22,2H6v16h16V2z M20,12l-2.5-1.5L15,12V4h5V12z"/>`, `icon open`),
    "bookmark": iconTemplate(`toc-icon`, `Bookmark`, `<path d="M19,3H5v18l7-3l7,3V3z"/>`, `icon open`)
};


/***/ }),

/***/ "./src/LocalAnnotator.ts":
/*!*******************************!*\
  !*** ./src/LocalAnnotator.ts ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocalAnnotator; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** Annotator that stores annotations locally, in the browser. */
class LocalAnnotator {
    constructor(config) {
        this.store = config.store;
    }
    getLastReadingPosition() {
        return __awaiter(this, void 0, void 0, function* () {
            const positionString = yield this.store.get(LocalAnnotator.LAST_READING_POSITION);
            if (positionString) {
                const position = JSON.parse(positionString);
                return new Promise(resolve => resolve(position));
            }
            return new Promise(resolve => resolve());
        });
    }
    initLastReadingPosition(position) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.store.set(LocalAnnotator.LAST_READING_POSITION, position);
            return new Promise(resolve => resolve());
        });
    }
    saveLastReadingPosition(position) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof position === 'string') {
                yield this.store.set(LocalAnnotator.LAST_READING_POSITION, position);
            }
            else {
                const positionString = JSON.stringify(position);
                yield this.store.set(LocalAnnotator.LAST_READING_POSITION, positionString);
            }
            return new Promise(resolve => resolve());
        });
    }
    initBookmarks(list) {
        return __awaiter(this, void 0, void 0, function* () {
            let savedBookmarksObj = JSON.parse(list);
            yield this.store.set(LocalAnnotator.BOOKMARKS, JSON.stringify(savedBookmarksObj));
            return new Promise(resolve => resolve(list));
        });
    }
    saveBookmark(bookmark) {
        return __awaiter(this, void 0, void 0, function* () {
            let savedBookmarks = yield this.store.get(LocalAnnotator.BOOKMARKS);
            if (savedBookmarks) {
                let savedBookmarksObj = JSON.parse(savedBookmarks);
                savedBookmarksObj.push(bookmark);
                yield this.store.set(LocalAnnotator.BOOKMARKS, JSON.stringify(savedBookmarksObj));
            }
            else {
                let bookmarksAry = new Array();
                bookmarksAry.push(bookmark);
                yield this.store.set(LocalAnnotator.BOOKMARKS, JSON.stringify(bookmarksAry));
            }
            return new Promise(resolve => resolve(bookmark));
        });
    }
    initNotes(list) {
        return __awaiter(this, void 0, void 0, function* () {
            let savedNotesObj = JSON.parse(list);
            yield this.store.set(LocalAnnotator.NOTES, JSON.stringify(savedNotesObj));
            return new Promise(resolve => resolve(list));
        });
    }
    saveNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            let savedNotes = yield this.store.get(LocalAnnotator.NOTES);
            if (savedNotes) {
                let savedNotesObj = JSON.parse(savedNotes);
                savedNotesObj.push(note);
                yield this.store.set(LocalAnnotator.NOTES, JSON.stringify(savedNotesObj));
            }
            else {
                let notesArray = new Array();
                notesArray.push(note);
                yield this.store.set(LocalAnnotator.NOTES, JSON.stringify(notesArray));
            }
            return new Promise(resolve => resolve(note));
        });
    }
    getBookmarks() {
        return __awaiter(this, void 0, void 0, function* () {
            const bookmarksString = yield this.store.get(LocalAnnotator.BOOKMARKS);
            if (bookmarksString) {
                const bookmarks = JSON.parse(bookmarksString);
                return new Promise(resolve => resolve(bookmarks));
            }
            return new Promise(resolve => resolve());
        });
    }
    getNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            const notesString = yield this.store.get(LocalAnnotator.NOTES);
            if (notesString) {
                const notes = JSON.parse(notesString);
                return new Promise(resolve => resolve(notes));
            }
            return new Promise(resolve => resolve());
        });
    }
}
LocalAnnotator.LAST_READING_POSITION = "last-reading-position";
LocalAnnotator.BOOKMARKS = "bookmarks";
LocalAnnotator.NOTES = "notes";


/***/ }),

/***/ "./src/LocalStorageStore.ts":
/*!**********************************!*\
  !*** ./src/LocalStorageStore.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LocalStorageStore; });
/* harmony import */ var _MemoryStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MemoryStore */ "./src/MemoryStore.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/** Class that stores key/value pairs in localStorage if possible
    but falls back to an in-memory store. */
class LocalStorageStore {
    constructor(config) {
        this.prefix = config.prefix;
        try {
            // In some browsers (eg iOS Safari in private mode), 
            // localStorage exists but throws an exception when
            // you try to write to it.
            const testKey = config.prefix + "-" + String(Math.random());
            window.localStorage.setItem(testKey, "test");
            window.localStorage.removeItem(testKey);
            this.fallbackStore = null;
        }
        catch (e) {
            this.fallbackStore = new _MemoryStore__WEBPACK_IMPORTED_MODULE_0__["default"]();
        }
    }
    getLocalStorageKey(key) {
        return this.prefix + "-" + key;
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = null;
            if (!this.fallbackStore) {
                value = window.localStorage.getItem(this.getLocalStorageKey(key));
            }
            else {
                value = yield this.fallbackStore.get(key);
            }
            return new Promise(resolve => resolve(value));
        });
    }
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.fallbackStore) {
                window.localStorage.setItem(this.getLocalStorageKey(key), value);
            }
            else {
                yield this.fallbackStore.set(key, value);
            }
            return new Promise(resolve => resolve());
        });
    }
}


/***/ }),

/***/ "./src/MemoryStore.ts":
/*!****************************!*\
  !*** ./src/MemoryStore.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MemoryStore; });
/** Class that stores key/value pairs in memory. */
class MemoryStore {
    constructor() {
        this.store = {};
    }
    get(key) {
        const value = this.store[key] || null;
        return new Promise(resolve => resolve(value));
    }
    set(key, value) {
        this.store[key] = value;
        return new Promise(resolve => resolve());
    }
}


/***/ }),

/***/ "./src/NightTheme.ts":
/*!***************************!*\
  !*** ./src/NightTheme.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NightTheme; });
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts");

class NightTheme {
    constructor() {
        this.name = "night-theme";
        this.label = "Night";
    }
    start() {
        const rootElement = document.documentElement;
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](rootElement, "data-viewer-theme", "night");
        const bodyElement = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](rootElement, "body");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](bodyElement, "data-viewer-theme", "night");
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.setProperty("--USER__appearance", "readium-night-on");
    }
    stop() {
        const rootElement = document.documentElement;
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](rootElement, "data-viewer-theme");
        const bodyElement = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](rootElement, "body");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](bodyElement, "data-viewer-theme");
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.removeProperty("--USER__appearance");
    }
}


/***/ }),

/***/ "./src/Publication.ts":
/*!****************************!*\
  !*** ./src/Publication.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Publication; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Publication {
    static getManifest(manifestUrl, store) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchManifest = () => __awaiter(this, void 0, void 0, function* () {
                const response = yield window.fetch(manifestUrl.href);
                const manifestJSON = yield response.json();
                if (store) {
                    yield store.set("manifest", JSON.stringify(manifestJSON));
                }
                return new Publication(manifestJSON, manifestUrl);
            });
            const tryToUpdateManifestButIgnoreResult = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield fetchManifest();
                }
                catch (err) {
                    // Ignore errors.
                }
                return new Promise(resolve => resolve());
            });
            // Respond immediately with the manifest from the store, if possible.
            if (store) {
                const manifestString = yield store.get("manifest");
                if (manifestString) {
                    // Kick off a fetch to update the store for next time,
                    // but don't await it.
                    tryToUpdateManifestButIgnoreResult();
                    const manifestJSON = JSON.parse(manifestString);
                    return new Publication(manifestJSON, manifestUrl);
                }
            }
            return fetchManifest();
        });
    }
    constructor(manifestJSON, manifestUrl) {
        this.metadata = manifestJSON.metadata || {};
        this.links = manifestJSON.links || [];
        this.readingOrder = (manifestJSON.spine || manifestJSON.readingOrder) || [];
        this.resources = manifestJSON.resources || [];
        this.tableOfContents = manifestJSON.toc || [];
        this.landmarks = manifestJSON.landmarks || [];
        // this.pageList = manifestJSON.parse("page-list") || [];
        this.pageList = manifestJSON['page-list'] || [];
        this.manifestUrl = manifestUrl;
    }
    getStartLink() {
        if (this.readingOrder.length > 0) {
            return this.readingOrder[0];
        }
        return null;
    }
    getPreviousSpineItem(href) {
        const index = this.getSpineIndex(href);
        if (index !== null && index > 0) {
            return this.readingOrder[index - 1];
        }
        return null;
    }
    getNextSpineItem(href) {
        const index = this.getSpineIndex(href);
        if (index !== null && index < (this.readingOrder.length - 1)) {
            return this.readingOrder[index + 1];
        }
        return null;
    }
    getSpineItem(href) {
        const index = this.getSpineIndex(href);
        if (index !== null) {
            return this.readingOrder[index];
        }
        return null;
    }
    getSpineIndex(href) {
        for (let index = 0; index < this.readingOrder.length; index++) {
            const item = this.readingOrder[index];
            if (item.href) {
                const itemUrl = new URL(item.href, this.manifestUrl.href).href;
                if (itemUrl === href) {
                    return index;
                }
            }
        }
        return null;
    }
    getTOCItem(href) {
        const findItem = (href, links) => {
            for (let index = 0; index < links.length; index++) {
                const item = links[index];
                if (item.href) {
                    const itemUrl = new URL(item.href, this.manifestUrl.href).href;
                    if (itemUrl === href) {
                        return item;
                    }
                }
                if (item.children) {
                    const childItem = findItem(href, item.children);
                    if (childItem !== null) {
                        return childItem;
                    }
                }
            }
            return null;
        };
        return findItem(href, this.tableOfContents);
    }
}


/***/ }),

/***/ "./src/PublisherFont.ts":
/*!******************************!*\
  !*** ./src/PublisherFont.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PublisherFont; });
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts");

class PublisherFont {
    constructor() {
        this.name = "publisher-font";
        this.label = "Publisher";
    }
    start() {
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.setProperty("--USER__fontFamily", "Original");
        html.style.setProperty("--USER__fontOverride", "readium-font-off");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](html, "data-viewer-font", "publisher");
    }
    stop() {
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.removeProperty("--USER__fontFamily");
        html.style.removeProperty("--USER__fontOverride");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](html, "data-viewer-font");
    }
}


/***/ }),

/***/ "./src/SansFont.ts":
/*!*************************!*\
  !*** ./src/SansFont.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SansFont; });
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts");

class SansFont {
    constructor() {
        this.name = "sans-font";
        this.label = "Sans-serif";
    }
    start() {
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.setProperty("--USER__fontFamily", "sans-serif");
        // HTMLUtilities.createStylesheet(rootFrame, "sans-font-internal", "* {font-family: Seravek, Calibri, Roboto, Arial, sans-serif !important;}");
        html.style.setProperty("--USER__fontOverride", "readium-font-on");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](html, "data-viewer-font", "sans");
    }
    stop() {
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.removeProperty("--USER__fontFamily");
        html.style.removeProperty("--USER__fontOverride");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](html, "data-viewer-font");
    }
}


/***/ }),

/***/ "./src/ScrollingBookView.ts":
/*!**********************************!*\
  !*** ./src/ScrollingBookView.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScrollingBookView; });
/* harmony import */ var _BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BrowserUtilities */ "./src/BrowserUtilities.ts");
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts");


class ScrollingBookView {
    constructor() {
        this.name = "scrolling-book-view";
        this.label = "Scrolling";
        this.sideMargin = 20;
        this.height = 0;
    }
    setIFrameSize() {
        // Remove previous iframe height so body scroll height will be accurate.
        this.bookElement.style.height = "";
        this.bookElement.style.width = _BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__["getWidth"]() + "px";
        const body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_1__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        const width = (_BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__["getWidth"]() - this.sideMargin * 2) + "px";
        const minHeight = this.height;
        const bodyHeight = body.scrollHeight + 60;
        this.bookElement.style.height = Math.max(minHeight, bodyHeight) + "px";
        const images = Array.prototype.slice.call(body.querySelectorAll("img"));
        for (const image of images) {
            image.style.maxWidth = width;
        }
    }
    start(position) {
        const head = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_1__["findRequiredIframeElement"](this.bookElement.contentDocument, "head");
        if (head) {
            const viewport = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_1__["findElement"](head, 'meta[name=viewport]');
            if (viewport) {
                viewport.remove();
            }
        }
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_1__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.setProperty("--USER__scroll", "readium-scroll-on");
        this.goToPosition(position);
    }
    stop() {
        this.bookElement.style.height = "";
        this.bookElement.style.width = "";
        const body = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_1__["findRequiredIframeElement"](this.bookElement.contentDocument, "body");
        const images = Array.prototype.slice.call(body.querySelectorAll("img"));
        for (const image of images) {
            image.style.maxWidth = "";
        }
    }
    getCurrentPosition() {
        var body = (document.documentElement || document.body.parentNode || document.body);
        var scrollTop = body.scrollTop;
        return scrollTop / document.body.scrollHeight;
    }
    atBottom() {
        var body = (document.documentElement || document.body.parentNode || document.body);
        var scrollTop = body.scrollTop;
        return (document.body.scrollHeight - scrollTop) === _BrowserUtilities__WEBPACK_IMPORTED_MODULE_0__["getHeight"]();
    }
    goToPosition(position) {
        this.setIFrameSize();
        var body = (document.documentElement || document.body.parentNode || document.body);
        body.scrollTop = document.body.scrollHeight * position;
    }
    goToElement(elementId) {
        const element = this.bookElement.contentDocument.getElementById(elementId);
        if (element) {
            // Put the element as close to the top as possible.
            element.scrollIntoView();
            // Unless we're already at the bottom, scroll up so the element is
            // in the middle, and not covered by the top nav.
            var body = (document.documentElement || document.body.parentNode || document.body);
            var scrollTop = body.scrollTop;
            if ((document.body.scrollHeight - element.offsetTop) >= this.height) {
                body.scrollTop = Math.max(0, scrollTop - this.height / 3);
            }
        }
    }
}


/***/ }),

/***/ "./src/SepiaTheme.ts":
/*!***************************!*\
  !*** ./src/SepiaTheme.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SepiaTheme; });
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts");

class SepiaTheme {
    constructor() {
        this.name = "sepia-theme";
        this.label = "Sepia";
    }
    start() {
        const rootElement = document.documentElement;
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](rootElement, "data-viewer-theme", "sepia");
        const bodyElement = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](rootElement, "body");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](bodyElement, "data-viewer-theme", "sepia");
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.setProperty("--USER__appearance", "readium-sepia-on");
    }
    stop() {
        const rootElement = document.documentElement;
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](rootElement, "data-viewer-theme");
        const bodyElement = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredElement"](rootElement, "body");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](bodyElement, "data-viewer-theme");
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.removeProperty("--USER__appearance");
    }
}


/***/ }),

/***/ "./src/SerifFont.ts":
/*!**************************!*\
  !*** ./src/SerifFont.ts ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SerifFont; });
/* harmony import */ var _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTMLUtilities */ "./src/HTMLUtilities.ts");

class SerifFont {
    constructor() {
        this.name = "serif-font";
        this.label = "Serif";
    }
    start() {
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.setProperty("--USER__fontFamily", "serif");
        // HTMLUtilities.createStylesheet(rootFrame, "serif-font-internal", "* {font-family: 'Iowan Old Style', 'Sitka Text', Palatino, 'Book Antiqua', serif !important;}");
        html.style.setProperty("--USER__fontOverride", "readium-font-on");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["setAttr"](html, "data-viewer-font", "serif");
    }
    stop() {
        const html = _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["findRequiredIframeElement"](this.bookElement.contentDocument, "html");
        html.style.removeProperty("--USER__fontFamily");
        html.style.removeProperty("--USER__fontOverride");
        _HTMLUtilities__WEBPACK_IMPORTED_MODULE_0__["removeAttr"](html, "data-viewer-font");
    }
}


/***/ }),

/***/ "./src/ServiceWorkerCacher.ts":
/*!************************************!*\
  !*** ./src/ServiceWorkerCacher.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ServiceWorkerCacher; });
/* harmony import */ var _Cacher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Cacher */ "./src/Cacher.ts");
/* harmony import */ var _Publication__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Publication */ "./src/Publication.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


/** Class that caches responses using ServiceWorker's Cache API, and optionally
    falls back to the application cache if service workers aren't available. */
class ServiceWorkerCacher {
    /** Create a ServiceWorkerCacher. */
    constructor(config) {
        this.cacheStatus = _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Uncached;
        this.statusUpdateCallback = () => { };
        this.serviceWorkerUrl = config.serviceWorkerUrl || new URL("sw.js", config.manifestUrl.href);
        this.staticFileUrls = config.staticFileUrls || [];
        this.store = config.store;
        this.manifestUrl = config.manifestUrl;
        const protocol = window.location.protocol;
        this.areServiceWorkersSupported = !!navigator.serviceWorker && !!window.caches && (protocol === "https:");
    }
    enable() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.areServiceWorkersSupported && (this.cacheStatus !== _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Downloaded)) {
                this.cacheStatus = _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Downloading;
                this.updateStatus();
                navigator.serviceWorker.register(this.serviceWorkerUrl.href);
                try {
                    yield this.verifyAndCacheManifest(this.manifestUrl);
                    this.cacheStatus = _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Downloaded;
                    this.updateStatus();
                }
                catch (err) {
                    this.cacheStatus = _Cacher__WEBPACK_IMPORTED_MODULE_0__["CacheStatus"].Error;
                    this.updateStatus();
                }
            }
            return new Promise(resolve => resolve());
        });
    }
    verifyAndCacheManifest(manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            yield navigator.serviceWorker.ready;
            try {
                // Invoke promises concurrently...
                const urlsToCache = [manifestUrl.href];
                for (const url of this.staticFileUrls) {
                    urlsToCache.push(url.href);
                }
                const promises = [this.cacheManifest(manifestUrl), this.cacheUrls(urlsToCache, manifestUrl)];
                // then wait for all of them to resolve.
                for (const promise of promises) {
                    yield promise;
                }
                return new Promise(resolve => resolve());
            }
            catch (err) {
                return new Promise((_, reject) => reject(err));
            }
        });
    }
    cacheUrls(urls, manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const cache = yield window.caches.open(manifestUrl.href);
            return cache.addAll(urls.map(url => new URL(url, manifestUrl.href).href));
        });
    }
    cacheManifest(manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const manifest = yield _Publication__WEBPACK_IMPORTED_MODULE_1__["default"].getManifest(manifestUrl, this.store);
            const promises = [this.cacheSpine(manifest, manifestUrl), this.cacheResources(manifest, manifestUrl)];
            for (const promise of promises) {
                yield promise;
            }
            return new Promise(resolve => resolve());
        });
    }
    cacheSpine(manifest, manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const urls = [];
            for (const resource of manifest.readingOrder) {
                if (resource.href) {
                    urls.push(resource.href);
                }
            }
            return yield this.cacheUrls(urls, manifestUrl);
        });
    }
    cacheResources(manifest, manifestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const urls = [];
            for (const resource of manifest.resources) {
                if (resource.href) {
                    urls.push(resource.href);
                }
            }
            return yield this.cacheUrls(urls, manifestUrl);
        });
    }
    onStatusUpdate(callback) {
        this.statusUpdateCallback = callback;
        this.updateStatus();
    }
    getStatus() {
        return this.cacheStatus;
    }
    updateStatus() {
        this.statusUpdateCallback(this.cacheStatus);
    }
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: load */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load", function() { return load; });
/* harmony import */ var _LocalStorageStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LocalStorageStore */ "./src/LocalStorageStore.ts");
/* harmony import */ var _ServiceWorkerCacher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ServiceWorkerCacher */ "./src/ServiceWorkerCacher.ts");
/* harmony import */ var _IFrameNavigator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./IFrameNavigator */ "./src/IFrameNavigator.ts");
/* harmony import */ var _PublisherFont__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PublisherFont */ "./src/PublisherFont.ts");
/* harmony import */ var _SerifFont__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SerifFont */ "./src/SerifFont.ts");
/* harmony import */ var _SansFont__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SansFont */ "./src/SansFont.ts");
/* harmony import */ var _DayTheme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DayTheme */ "./src/DayTheme.ts");
/* harmony import */ var _SepiaTheme__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SepiaTheme */ "./src/SepiaTheme.ts");
/* harmony import */ var _NightTheme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./NightTheme */ "./src/NightTheme.ts");
/* harmony import */ var _ColumnsPaginatedBookView__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ColumnsPaginatedBookView */ "./src/ColumnsPaginatedBookView.ts");
/* harmony import */ var _ScrollingBookView__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ScrollingBookView */ "./src/ScrollingBookView.ts");
/* harmony import */ var _BookSettings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./BookSettings */ "./src/BookSettings.ts");
/* harmony import */ var _LocalAnnotator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./LocalAnnotator */ "./src/LocalAnnotator.ts");













function load(config) {
    var mainElement = document.getElementById("R2Reader-Container");
    var headerMenu = document.getElementById("headerMenu");
    var footerMenu = document.getElementById("footerMenu");
    var webpubManifestUrl = config.url;
    var store = new _LocalStorageStore__WEBPACK_IMPORTED_MODULE_0__["default"]({ prefix: webpubManifestUrl.href });
    var staticFileUrls = [
        new URL(window.location.href),
        new URL("index.html", window.location.href),
        new URL("fetch.js", window.location.href),
        new URL("r2-reader.css", window.location.href),
        new URL("r2-reader.js", window.location.href)
    ];
    if (config.customHeader) {
        staticFileUrls = [
            new URL(window.location.href),
            new URL("index.html", window.location.href),
            new URL("fetch.js", window.location.href),
            new URL("r2-reader.css", window.location.href),
            new URL("r2-reader.js", window.location.href),
            new URL("material.css", window.location.href),
            new URL("material.js", window.location.href)
        ];
    }
    var serviceWorkerUrl = new URL("/viewer/sw.js", window.location.href);
    if (config.serviceWorkerUrl) {
        serviceWorkerUrl = config.serviceWorkerUrl;
    }
    var cacher = new _ServiceWorkerCacher__WEBPACK_IMPORTED_MODULE_1__["default"]({
        store: store,
        manifestUrl: webpubManifestUrl,
        serviceWorkerUrl: serviceWorkerUrl,
        staticFileUrls: staticFileUrls,
        fallbackBookCacheUrl: config.bookCacheUrl
    });
    var publisher = new _PublisherFont__WEBPACK_IMPORTED_MODULE_3__["default"]();
    var serif = new _SerifFont__WEBPACK_IMPORTED_MODULE_4__["default"]();
    var sans = new _SansFont__WEBPACK_IMPORTED_MODULE_5__["default"]();
    var fontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32];
    var defaultFontSize = 20;
    var day = new _DayTheme__WEBPACK_IMPORTED_MODULE_6__["default"]();
    var sepia = new _SepiaTheme__WEBPACK_IMPORTED_MODULE_7__["default"]();
    var night = new _NightTheme__WEBPACK_IMPORTED_MODULE_8__["default"]();
    var paginator = new _ColumnsPaginatedBookView__WEBPACK_IMPORTED_MODULE_9__["default"]();
    var scroller = new _ScrollingBookView__WEBPACK_IMPORTED_MODULE_10__["default"]();
    var annotator = new _LocalAnnotator__WEBPACK_IMPORTED_MODULE_12__["default"]({ store: store });
    var settingsStore = new _LocalStorageStore__WEBPACK_IMPORTED_MODULE_0__["default"]({ prefix: "r2-reader" });
    var upLink = {
        url: new URL(window.location.origin),
        label: "Catalog",
        ariaLabel: "Go back to the Catalog"
    };
    if (config.upLinkUrl) {
        upLink = config.upLinkUrl;
    }
    _BookSettings__WEBPACK_IMPORTED_MODULE_11__["default"].create({
        store: settingsStore,
        bookFonts: [publisher, serif, sans],
        fontSizesInPixels: fontSizes,
        defaultFontSizeInPixels: defaultFontSize,
        bookThemes: [day, sepia, night],
        bookViews: [paginator, scroller]
    }).then(function (settings) {
        _IFrameNavigator__WEBPACK_IMPORTED_MODULE_2__["default"].create({
            eventTarget: config.eventTarget,
            mainElement: mainElement,
            headerMenu: headerMenu,
            footerMenu: footerMenu,
            manifestUrl: webpubManifestUrl,
            store: store,
            cacher: cacher,
            settings: settings,
            annotator: annotator,
            publisher: publisher,
            serif: serif,
            sans: sans,
            day: day,
            sepia: sepia,
            night: night,
            paginator: paginator,
            scroller: scroller,
            upLink: upLink,
            allowFullscreen: false,
            useDefaultHeader: !config.customHeader,
            useDefaultFooter: !config.customFooter,
            initialAnnotations: config.annotations,
            initialLastReadingPosition: config.lastReadingPosition,
        });
    });
}
exports.load = function (config) {
    load(config);
};


/***/ })

/******/ });
//# sourceMappingURL=r2-reader.js.map