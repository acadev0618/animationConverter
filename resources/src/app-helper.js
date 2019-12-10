import _ from 'lodash';
export default {
    storage: {
        temp: {}
    },
    fillItemsInBoxes(boxes = [], items = [], itemWidth = 100, space = 10, widthKey = 'width', heightKey = 'height') {
        let minHeight;
        let minBox;
        items.forEach((item) => {
            minHeight = 999999;
            boxes.forEach((box) => {
                if (box['height'] < minHeight) {
                    minHeight = box['height'];
                    minBox = box;
                }
            });
            minBox.items.push(item);
            minBox['height'] += (space +  itemWidth * item[heightKey] / item[widthKey]);
        });
        return boxes;
    },
    msToHMS( ms, format = 'mm:ss' ) {
        // 1- Convert to seconds:
        let seconds = ms / 1000;
        // 2- Extract hours:
        let hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
        seconds = seconds % 3600; // seconds remaining after extracting hours
        // 3- Extract minutes:
        let minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
        let mm = minutes >= 10 ? minutes : '0' + minutes;
        // 4- Keep only seconds not extracted to minutes:
        seconds = parseInt(seconds % 60);
        let ss = seconds >= 10 ? seconds : '0' + seconds;
        return mm + ':' + ss;
    },
    getImageSize(url) {
        return new Promise(resolve => {
            let img = document.createElement("img");
            img.src = url;
            img.onload = function() {
                resolve({
                    width: img.naturalWidth,
                    height: img.naturalHeight
                });
            }
        });
    },
    numberToHex(c) {
        let hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    },
    rgbToHex(r, g, b) {
        return "#" + this.numberToHex(r) + this.numberToHex(g) + this.numberToHex(b);
    },
    ptToPx(pt) {
        return  pt * 3 / 4;
    },
    pxToPt(px) {
        return px * 4 / 3;
    },
    hasLottieSlide(json) {
        return json.layers.length && json.layers[0].ty === 0;
    },
    splitSlideFromLottie(json) {
        let elements = [];
        json.layers.sort((a, b) => {
            return a.st - b.st;
        });
        json.layers.forEach((layer, index) => {
            if (layer.ty === 0) {
                let iJson = _.cloneDeep(json);
                let iLayer = iJson.layers[index];
                let dur = iLayer.op - iLayer.ip;
                let st = iLayer.st;
                iLayer.ip = 0;
                iLayer.st = 0;
                iLayer.op = dur;
                if (iLayer.ks) {
                    for (let key in iLayer.ks) {
                        let k =iLayer.ks[key].k;
                        for (let iKey in k) {
                            let kv = k[iKey];
                            if (kv.t) {
                                kv.t = kv.t - st;
                            }
                        }
                    }
                }
                iJson.op = dur;
                iJson.layers = [iLayer];
                this.cleanAssets(iJson);
                elements.push(iJson);
            }
        });
        return elements;
    },
    cleanAssets(json) {
        json.assets = json.assets.filter(asset => {
            let used = false;
            for (let i = 0; i < json.layers.length; i ++) {
                let layer = json.layers[i];
                if (layer.ty === 0) {
                    if (layer.refId === asset.id) {
                        used = true;
                    } else {
                        let iLayers = json.assets.find(iAsset => iAsset.id === layer.refId).layers;
                        iLayers.forEach(iLayer => {
                            if (iLayer.refId && iLayer.refId === asset.id) {
                                used = true;
                            }
                        });
                    }
                } else if (layer.ty === 2) {
                    if (asset.id === layer.refId) {
                        used = true;
                    }
                }
            }
            if (used) {
                if ('u' in asset && asset.u) {
                    asset.u = '';
                }
            }
            return used;
        });
    },
    getLottieSizeByMax(json, maxWidth) {
        let w = json.w, h = json.h;
        if (w > maxWidth) {
            let gcd = this.gcd(w, h);
            let pw = w / gcd, ph = h / gcd;
            let d = Math.floor(maxWidth / pw);
            w = pw * d;
            h = ph * d;
        }
        if (w === 0) {
            w = maxWidth;
            h = json.h * w / json.w;
        }
        return {
            width: w,
            height: h,
        }
    },
    createTemplateFromLottie(json) {
        let elements = this.hasLottieSlide(json) ? this.splitSlideFromLottie(json) : [json];
        let w = json.w, h = json.h;
        let aspect = this.getAspect(w, h);

        if (w > 2000) {
            let gcd = this.gcd(w, h);
            let pw = w / gcd, ph = h / gcd;
            let d = Math.floor(2000 / pw);
            w = pw * d;
            h = ph * d;
        }
        let template = {
            "width": w, "height": h, "state": "initial", "aspect": aspect,
            "slides": [
            ], "sound": false, "timeSeek": 0, "name": "Yoga", "description": "revive yourself"
        };
        let templateDuration = 0;
        elements.forEach((element, index) => {
            let dur = element.op * 1000 / element.fr;
            // dur = dur < 4000 ?  4000 : dur;
            templateDuration += dur;
            template.slides.push(
                {
                    "name": "Yoga",
                    "aspect": "Square",
                    "id": "slide_" + new Date().getTime() + '_' + index,
                    "css": {"backgroundColor": "transparent"},
                    "backgroundVideo": false,
                    "backgroundLottie": false,
                    "selectedElement": false,
                    width: w,
                    height: h,
                    "elements": [{
                        "x": 0,
                        "y": 0,
                        "scaleX": 1,
                        "scaleY": 1,
                        "angle": 0,
                        "classPrefix": "tr2",
                        "selectOn": "mousedown",
                        "selected": false,
                        "styles": {"width": "100%", "height": "100%"},
                        "disableScale": true,
                        "animation": {"play": false, "in": false, "out": false},
                        "duration": dur,
                        "delay": 0,
                        "visible": true,
                        "type": "lottie",
                        "width": w,
                        "height": h,
                        "changeNumber": 0,
                        "lottieChangeNumber": 0,
                        "label": "LOTTIE 2",
                        "content": {
                            "json": element,
                        },
                        "id": "element_" + new Date().getTime() + '_' + index,
                        "state": "initial"
                    }],
                    "duration": dur,
                    "state": "initial",
                    "timer": {"timeFlag": false, "flagSeek": false},
                    "animation": {"leave": false, "space": 0, "nextEnter": false}
                },
            );
        });
        template.duration = templateDuration;
        return template;
    },
    createSlideFromLottie(json) {
        let elements = this.hasLottieSlide(json) ? this.splitSlideFromLottie(json) : [json];
        let w = json.w, h = json.h;
        let aspect = this.getAspect(w, h);

        if (w > 2000) {
            let gcd = this.gcd(w, h);
            let pw = w / gcd, ph = h / gcd;
            let d = Math.floor(2000 / pw);
            w = pw * d;
            h = ph * d;
        }
        let slides = [];
        elements.forEach((element, index) => {
            let dur = element.op * 1000 / element.fr;
            // dur = dur < 4000 ?  4000 : dur;
            slides.push(
                {
                    "name": element.nm,
                    "aspect": aspect,
                    "id": "slide_" + new Date().getTime() + '_' + index,
                    "css": {"backgroundColor": "transparent"},
                    "backgroundVideo": false,
                    "backgroundLottie": false,
                    "selectedElement": false,
                    width: w,
                    height: h,
                    "elements": [{
                        "x": 0,
                        "y": 0,
                        "scaleX": 1,
                        "scaleY": 1,
                        "angle": 0,
                        "classPrefix": "tr2",
                        "selectOn": "mousedown",
                        "selected": false,
                        "styles": {"width": "100%", "height": "100%"},
                        "disableScale": true,
                        "animation": {"play": false, "in": false, "out": false},
                        "duration": dur,
                        "delay": 0,
                        "visible": true,
                        "type": "lottie",
                        "width": w,
                        "height": h,
                        "changeNumber": 0,
                        "lottieChangeNumber": 0,
                        "label": "LOTTIE 2",
                        "content": {
                            "json": element,
                        },
                        "id": "element_" + new Date().getTime() + '_' + index,
                        "state": "initial"
                    }],
                    "duration": dur,
                    "state": "initial",
                    "timer": {"timeFlag": false, "flagSeek": false},
                    "animation": {"leave": false, "space": 0, "nextEnter": false}
                },
            );
        });
        return slides;
    },
    getTemplateDuration(template) {
        let duration = 0;
        let enterAnimation = false;
        template.slides.forEach(slide => {
            if (enterAnimation) {
                duration += enterAnimation.duration;
            }
            duration += slide.duration;
            if (slide.animation.space) {
                duration += slide.animation.space;
            }
            enterAnimation = slide.animation.nextEnter;
        });
        return duration;
    },
    getParameterFromURL(param, url = window.location.href) {
        let urlHandle = new URL(url);
        return urlHandle.searchParams.get(param);
    },
    cloneDeep(value) {
        return _.cloneDeep(value);
    },
    gcd(a, b) {
        if (!b) {
            return a;
        }
        return  this.gcd(b, a % b);
    },
    getAspect(w, h) {
        let gcd = this.gcd(w, h);
        let pw = w / gcd;
        let ph = h / gcd;
        let aspect = pw + '/' + ph;
        switch (aspect) {
            case '4/5':
                return  'portrait';
                break;
            case '1/1':
                return  'square';
                break;
            case '9/16':
                return  'vertical';
                break;
            case '16/9':
                return 'wide';
                break;
            default:
                return 'custom';
                break;
        }
        return  'custom';
    },
    getScrollbarWidth(el) {
        return  el.offsetWidth - el.clientWidth - parseInt(getComputedStyle(el).borderLeftWidth) - parseInt(getComputedStyle(el).borderRightWidth);
    },
    dateFormat(dateStr) {
        return dateStr.split(' ')[0].replace(/\-/g, '.');
    },
    backgroundAlign(align) {
        switch (align) {
            case 'top_left':
                return {
                    backgroundSize: 'auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '0px 0px'
                };
                break;
            case 'top_center':
                return  {
                    backgroundSize: 'auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '50% 0px'
                };
                break;
            case 'top_right':
                return {
                    backgroundSize: 'auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '100% 0px'
                };
                break;
            case 'center_left':
                return {
                    backgroundSize: 'auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '0% 50%'
                };
                break;
            case 'center_center':
                return  {
                    backgroundSize: 'auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '50% 50%'
                };
                break;
            case 'center_right':
                return {
                    backgroundSize: 'auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '100% 50%'
                };
                break;
            case 'bottom_left':
                return {
                    backgroundSize: 'auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '0% 100%'
                };
                break;
            case 'bottom_center':
                return  {
                    backgroundSize: 'auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '50% 100%'
                };
                break;
            case 'bottom_right':
                return {
                    backgroundSize: 'auto',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '100% 100%'
                };
                break;
        }
    },
    exportInlineSVG(svg, receiver, params, quality) {
        if (!svg || !svg.nodeName || svg.nodeName !== 'svg') {
            console.error('Wrong arguments : should be \n exportSVG(SVGElement, function([dataURL],[canvasElement]) || IMGElement || CanvasElement [, String_toDataURL_Params, Float_Params_quality])')
            return;
        }

        let xlinkNS = "http://www.w3.org/1999/xlink";
        // let xlinkNS = "http://www.w3.org/2000/svg";
        let clone;
        let self = this;
        // This will convert an external image to a dataURL
        let toDataURL = function(image) {
            let href = image.getAttributeNS(xlinkNS, 'href');
            if (self.storage.temp[href]) {
                // set our original <image>'s href attribute to the dataURL of our canvas
                image.setAttributeNS(xlinkNS, 'href', self.storage.temp[href]);
                // that was the last one
                if (++encoded === total) exportDoc();
                return ;
            }

            let img = new Image();
            // CORS workaround, this won't work in IE<11
            // If you are sure you don't need it, remove the next line and the double onerror handler
            // First try with crossorigin set, it should fire an error if not needed
            img.crossOrigin = 'Anonymous';

            img.onload = function() {
                // we should now be able to draw it without tainting the canvas
                var canvas = document.createElement('canvas');
                var bbox = image.getBBox();
                canvas.width = bbox.width;
                canvas.height = bbox.height;
                // draw the loaded image
                canvas.getContext('2d').drawImage(this, 0, 0, bbox.width, bbox.height);
                // set our original <image>'s href attribute to the dataURL of our canvas
                const dataURL = canvas.toDataURL();
                image.setAttributeNS(xlinkNS, 'href', dataURL);
                // that was the last one
                self.storage.temp[href] = dataURL;
                if (++encoded === total) exportDoc()
            }

            // No CORS set in the response
            img.onerror = function() {
                // save the src
                var oldSrc = this.src;
                // there is an other problem
                this.onerror = function() {
                    console.warn('failed to load an image at : ', this.src);
                    if (--total === encoded && encoded > 0) exportDoc();
                }
                // remove the crossorigin attribute
                this.removeAttribute('crossorigin');
                // retry
                this.src = '';
                this.src = oldSrc;
            }
            // load our external image into our img
            img.src = image.getAttributeNS(xlinkNS, 'href');
        }

        // The final function that will export our svgNode to our receiver
        var exportDoc = function() {
            // check if our svgNode has width and height properties set to absolute values
            // otherwise, canvas won't be able to draw it

            var bbox = svg.getBBox();
            // avoid modifying the original one
            clone = svg.cloneNode(true);
            if (svg.width.baseVal.unitType !== 1) clone.setAttribute('width', bbox.width);
            if (svg.height.baseVal.unitType !== 1) clone.setAttribute('height', bbox.height);
            // customized position
            // parseStyles();

            // serialize our node
            var svgData = (new XMLSerializer()).serializeToString(clone);
            // remember to encode special chars

            var svgURL = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgData);

            var svgImg = new Image();
            svgImg.crossOrigin = "Anonymous";
            svgImg.onload = function() {
                // if we set a canvas as receiver, then use it
                // otherwise create a new one
                var canvas = (receiver && receiver.nodeName === 'CANVAS') ? receiver : document.createElement('canvas');
                // IE11 doesn't set a width on svg images...
                canvas.width = this.width || bbox.width;
                canvas.height = this.height || bbox.height;
                canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height);

                // try to catch IE
                try {
                    // if we set an <img> as receiver
                    if (receiver.nodeName === 'IMG') {
                        // make the img looks like the svg
                        receiver.setAttribute('style', getSVGStyles(receiver));
                        receiver.src = canvas.toDataURL(params, quality);
                    } else {
                        // make the canvas looks like the canvas
                        canvas.setAttribute('style', getSVGStyles(canvas));
                        // a container element
                        if (receiver.appendChild && receiver !== canvas)
                            receiver.appendChild(canvas);
                        // if we set a function
                        else if (typeof receiver === 'function')
                            receiver(canvas.toDataURL(params, quality), canvas);
                    }
                } catch (ie) {
                    console.warn("Your ~browser~ has tainted the canvas.\n The canvas is returned");
                    if (receiver.nodeName === 'IMG') receiver.parentNode.replaceChild(canvas, receiver);
                    else receiver(null, canvas);
                }
            };
            svgImg.onerror = function(e) {
                if (svg._cleanedNS) {
                    console.error("Couldn't export svg, please check that the svgElement passed is a valid svg document.");
                    return;
                }
                // Some non-standard NameSpaces can cause this issues
                // This will remove them all
                function cleanNS(el) {
                    var attr = el.attributes;
                    for (var i = 0; i < attr.length; i++) {
                        if (attr[i].name.indexOf(':') > -1) el.removeAttribute(attr[i].name)
                    }
                }
                cleanNS(svg);
                for (var i = 0; i < svg.children.length; i++)
                    cleanNS(svg.children[i]);
                svg._cleanedNS = true;
                // retry the export
                exportDoc();
            };
            svgImg.src = svgURL;
        }
        // ToDo : find a way to get only usefull rules
        var parseStyles = function() {
            var styleS = [],i;
            // transform the live StyleSheetList to an array to avoid endless loop
            for (i = 0; i < document.styleSheets.length; i++)
                styleS.push(document.styleSheets[i]);
            // Do we have a `<defs>` element already ?
            var defs = clone.querySelector('defs') || document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            if (!defs.parentNode)
                clone.insertBefore(defs, clone.firstElementChild);

            // iterate through all document's stylesheets
            for (i = 0; i < styleS.length; i++) {
                var style = document.createElement('style');
                var rules = styleS[i].cssRules,
                    l = rules.length;
                for (var j = 0; j < l; j++)
                    style.innerHTML += rules[j].cssText + '\n';

                defs.appendChild(style);
            }
            // small hack to avoid border and margins being applied inside the <img>
            var s = clone.style;
            s.border = s.padding = s.margin = 0;
            s.transform = 'initial';
        }
        var getSVGStyles = function(node) {
            var dest = node.cloneNode(true);
            svg.parentNode.insertBefore(dest, svg);
            var dest_comp = getComputedStyle(dest);
            var svg_comp = getComputedStyle(svg);
            var mods = "";
            for (var i = 0; i < svg_comp.length; i++) {
                if (svg_comp[svg_comp[i]] !== dest_comp[svg_comp[i]])
                    mods += svg_comp[i] + ':' + svg_comp[svg_comp[i]] + ';';
            }
            svg.parentNode.removeChild(dest);
            return mods;
        }

        this.makeSvgValid(svg);

        var images = svg.querySelectorAll('image'),
            total = images.length,
            encoded = 0;
        // Loop through all our <images> elements
        for (var i = 0; i < images.length; i++) {
            // check if the image is external
            $(images[i]).attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');
            if (images[i].getAttributeNS(xlinkNS, 'href').indexOf('data:image') < 0)
                toDataURL(images[i]);
            // else increment our counter
            else if (++encoded === total) exportDoc();
        }
        // if there were no <image> element
        if (total === 0) exportDoc();
    },
    makeSvgValid(svg) {
        let images = svg.querySelectorAll('image'),
            total = images.length,
            encoded = 0;
        // Loop through all our <images> elements
        for (var i = 0; i < images.length; i++) {
            // check if the image is external
            $(images[i]).attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        }
        let children = svg.querySelectorAll('*');
        for (let i = 0; i < children.length; i ++) {
            let child = children[i];
            if ($(child).attr('aria-label')) {
                let l = $(child).attr('aria-label');
                l = l.replace(//g, ' ');
                $(child).attr('aria-label', l);
            }
        }
    }
}
