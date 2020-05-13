var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var IIIFComponents;
(function (IIIFComponents) {
    // Helper functions.
    var AVHelpers;
    (function (AVHelpers) {
        function createTimePlansFromManifest(manifest, mediaElements) {
            var parseRange = function (range, rangeStack, startDuration) {
                var _a, _b, _c;
                if (rangeStack === void 0) { rangeStack = []; }
                if (startDuration === void 0) { startDuration = 0; }
                var timePlan = {
                    type: 'time-plan',
                    canvases: [],
                    duration: 0,
                    items: [],
                    stops: [],
                    rangeOrder: [range.id],
                    end: 0,
                    start: startDuration,
                    rangeId: range.id,
                    rangeStack: rangeStack,
                };
                var runningDuration = startDuration;
                var rangeRanges = __spreadArrays(range.items, range.getCanvasIds());
                for (var canvasIndex = 0; canvasIndex < rangeRanges.length; canvasIndex++) {
                    var ro = rangeRanges[canvasIndex];
                    if (typeof ro === 'string') {
                        var _d = ro.match(/(.*)#t=([0-9.]+),?([0-9.]+)?/) || [undefined, ro, '0', '0'], canvasId = _d[1], start = _d[2], end = _d[3];
                        // Skip invalid ranges.
                        if (!canvasId || typeof start === 'undefined' || typeof end === 'undefined')
                            continue;
                        var canvas = manifest
                            .getSequenceByIndex(0)
                            .getCanvasById(canvasId);
                        if (canvas === null) {
                            throw new Error('Canvas not found..');
                        }
                        timePlan.canvases.push(canvas.id);
                        var rStart = parseFloat(start || '0');
                        var rEnd = parseFloat(end || '0');
                        var rDuration = rEnd - rStart;
                        runningDuration += rDuration;
                        var timeStop = {
                            type: 'time-stop',
                            canvasIndex: canvasIndex,
                            start: runningDuration - rDuration,
                            end: runningDuration,
                            duration: rDuration,
                            rangeId: range.id,
                            rawCanvasSelector: ro,
                            canvasTime: {
                                start: rStart,
                                end: rEnd,
                            },
                            rangeStack: rangeStack,
                        };
                        timePlan.stops.push(timeStop);
                        timePlan.items.push(timeStop);
                    }
                    else {
                        var behavior = ro.getBehavior();
                        if (!behavior || !behavior.nonav()) {
                            var rangeTimePlan = parseRange(ro, __spreadArrays(rangeStack, [ro.id]), runningDuration);
                            runningDuration += rangeTimePlan.duration;
                            (_a = timePlan.stops).push.apply(_a, rangeTimePlan.stops.map(function (stop) { return (__assign(__assign({}, stop), { canvasIndex: stop.canvasIndex + timePlan.canvases.length })); }));
                            (_b = timePlan.canvases).push.apply(_b, rangeTimePlan.canvases);
                            timePlan.items.push(rangeTimePlan);
                            (_c = timePlan.rangeOrder).push.apply(_c, rangeTimePlan.rangeOrder);
                        }
                    }
                }
                timePlan.end = runningDuration;
                timePlan.duration = timePlan.end - timePlan.start;
                return timePlan;
            };
            var topLevels = manifest.getTopRanges();
            var plans = [];
            if (topLevels.length === 1 && !topLevels[0].id) {
                topLevels = topLevels[0].getRanges();
            }
            for (var _i = 0, topLevels_1 = topLevels; _i < topLevels_1.length; _i++) {
                var range = topLevels_1[_i];
                if (range.id === range.getRanges()[0].id) {
                    range = range.getRanges()[0];
                }
                var rangeTimePlan = parseRange(range, [range.id]);
                plans.push(rangeTimePlan);
            }
            return plans[0]; // @todo only one top level range.
        }
        AVHelpers.createTimePlansFromManifest = createTimePlansFromManifest;
        function extractMediaFromAnnotationBodies(annotation) {
            var bodies = annotation.getBody();
            if (!bodies.length) {
                return null;
            }
            // if there's an HLS format and HLS is supported in this browser
            for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                var format = body.getFormat();
                if (format) {
                    if (AVComponentUtils.isHLSFormat(format) && AVComponentUtils.canPlayHls()) {
                        return body;
                    }
                }
            }
            // if there's a Dash format and the browser isn't Safari
            for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                var format = body.getFormat();
                if (format) {
                    if (AVComponentUtils.isMpegDashFormat(format) && !AVComponentUtils.isSafari()) {
                        return body;
                    }
                }
            }
            // otherwise, return the first format that isn't HLS or Dash
            for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                var format = body.getFormat();
                if (format) {
                    if (!AVComponentUtils.isHLSFormat(format) && !AVComponentUtils.isMpegDashFormat(format)) {
                        return body;
                    }
                }
            }
            // couldn't find a suitable format
            return null;
        }
        AVHelpers.extractMediaFromAnnotationBodies = extractMediaFromAnnotationBodies;
        function getMediaSourceFromAnnotationBody(annotation, body, canvasDimensions) {
            var type = body.getType();
            var format = body.getFormat() || undefined;
            var mediaSource = body.id.split('#')[0];
            var target = annotation.getTarget();
            if (!target) {
                throw new Error('No target');
            }
            if (!type) {
                throw new Error('Unknown media type');
            }
            var _a = AVComponentUtils.getSpatialComponent(target) || [0, 0, canvasDimensions.width || 0, canvasDimensions.height || 0], x = _a[0], y = _a[1], width = _a[2], height = _a[3];
            var _b = Manifesto.Utils.getTemporalComponent(target) || [0, canvasDimensions.duration], start = _b[0], end = _b[1];
            var _c = body.id.match(/(.*)#t=([0-9.]+),?([0-9.]+)?/) || [undefined, body.id, undefined, undefined], bodyId = _c[1], offsetStart = _c[2], offsetEnd = _c[3];
            return {
                type: type,
                format: format,
                mediaSource: mediaSource,
                canvasId: canvasDimensions.id,
                x: x,
                y: y,
                width: typeof width === 'undefined' ? undefined : parseInt(String(width), 10),
                height: typeof height === 'undefined' ? undefined : parseInt(String(height), 10),
                start: Number(Number(start).toFixed(2)),
                end: Number(Number(end).toFixed(2)),
                bodyId: bodyId,
                offsetStart: typeof offsetStart === 'undefined' ? undefined : parseFloat(offsetStart),
                offsetEnd: typeof offsetEnd === 'undefined' ? undefined : parseFloat(offsetEnd),
            };
        }
        AVHelpers.getMediaSourceFromAnnotationBody = getMediaSourceFromAnnotationBody;
        var MediaFormat = /** @class */ (function () {
            function MediaFormat(source, options) {
                if (options === void 0) { options = {}; }
                this.source = source;
                this.options = options;
            }
            MediaFormat.prototype.attachTo = function (element) {
                element.setAttribute('src', this.source);
            };
            return MediaFormat;
        }());
        AVHelpers.MediaFormat = MediaFormat;
        var DashFormat = /** @class */ (function (_super) {
            __extends(DashFormat, _super);
            function DashFormat(source, options) {
                if (options === void 0) { options = {}; }
                var _this = _super.call(this, source, options) || this;
                _this.player = dashjs.MediaPlayer().create();
                _this.player.getDebug().setLogToBrowserConsole(false);
                if (options.adaptiveAuthEnabled) {
                    _this.player.setXHRWithCredentialsForType('MPD', true); // send cookies
                }
                return _this;
            }
            DashFormat.prototype.attachTo = function (element) {
                this.player.initialize(element, this.source, false);
            };
            DashFormat.prototype.debug = function () {
                this.player.getDebug().setLogToBrowserConsole(true);
                this.player.getDebug().setLogLevel(4);
            };
            return DashFormat;
        }(MediaFormat));
        AVHelpers.DashFormat = DashFormat;
        var HlsFormat = /** @class */ (function (_super) {
            __extends(HlsFormat, _super);
            function HlsFormat(source, options) {
                if (options === void 0) { options = {}; }
                var _this = _super.call(this, source, options) || this;
                if (options.adaptiveAuthEnabled) {
                    _this.hls = new Hls({
                        xhrSetup: function (xhr) {
                            xhr.withCredentials = true; // send cookies
                        }
                    });
                }
                else {
                    _this.hls = new Hls();
                }
                _this.hls.loadSource(_this.source);
                return _this;
            }
            HlsFormat.prototype.attachTo = function (element) {
                this.hls.attachMedia(element);
            };
            return HlsFormat;
        }(MediaFormat));
        AVHelpers.HlsFormat = HlsFormat;
        var MpegFormat = /** @class */ (function (_super) {
            __extends(MpegFormat, _super);
            function MpegFormat(source, options) {
                if (options === void 0) { options = {}; }
                return _super.call(this, source, options) || this;
            }
            MpegFormat.prototype.attachTo = function (element) {
                element.src = this.source;
            };
            return MpegFormat;
        }(MediaFormat));
        AVHelpers.MpegFormat = MpegFormat;
        var DefaultFormat = /** @class */ (function (_super) {
            __extends(DefaultFormat, _super);
            function DefaultFormat(source, options) {
                if (options === void 0) { options = {}; }
                return _super.call(this, source, options) || this;
            }
            return DefaultFormat;
        }(MediaFormat));
        AVHelpers.DefaultFormat = DefaultFormat;
        var MediaElement = /** @class */ (function () {
            function MediaElement(source, mediaOptions) {
                if (mediaOptions === void 0) { mediaOptions = {}; }
                this.source = source;
                this.mediaSource = source.mediaSource;
                this.type = source.type.toString().toLowerCase();
                this.format = source.format ? source.format.toString() : undefined;
                this.mediaSyncMarginSecs = mediaOptions.mediaSyncMarginSecs || 1;
                switch (this.type) {
                    case 'video':
                        this.element = document.createElement('video');
                        break;
                    case 'sound':
                    case 'audio':
                        this.element = document.createElement('audio');
                        break;
                    default:
                        return;
                }
                if (this.isDash()) {
                    this.instance = new DashFormat(this.mediaSource, mediaOptions);
                }
                else if (this.isHls()) {
                    this.instance = new HlsFormat(this.mediaSource, mediaOptions);
                }
                else if (this.isMpeg()) {
                    this.instance = new MpegFormat(this.mediaSource, mediaOptions);
                }
                else {
                    this.instance = new DefaultFormat(this.mediaSource, mediaOptions);
                }
                this.element.classList.add('anno');
                this.element.crossOrigin = 'anonymous';
                this.element.preload = 'metadata';
                this.element.pause();
                this.instance.attachTo(this.element);
                this.element.currentTime = this.source.start;
            }
            MediaElement.prototype.syncClock = function (time) {
                if (Math.abs(this.element.currentTime - time) > this.mediaSyncMarginSecs) {
                    this.element.currentTime = time;
                }
            };
            MediaElement.prototype.getCanvasId = function () {
                return this.source.canvasId;
            };
            MediaElement.prototype.isWithinRange = function (time) {
                return this.source.start <= time && this.source.end >= time;
            };
            MediaElement.prototype.load = function (withAudio) {
                if (withAudio === void 0) { withAudio = false; }
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (withAudio) {
                                    this.element.load();
                                }
                                return [4 /*yield*/, new Promise(function (resolve) {
                                        _this.element.addEventListener('loadedmetadata', function () {
                                            resolve();
                                        });
                                    })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            MediaElement.prototype.setSize = function (top, left, width, height) {
                $(this.element).css({
                    top: top + "%",
                    left: left + "%",
                    width: width + "%",
                    height: height + "%",
                });
            };
            MediaElement.prototype.isDash = function () {
                return this.format && this.format.toString() === 'application/dash+xml';
            };
            MediaElement.prototype.isHls = function () {
                return (this.format &&
                    this.format.toString() === 'application/vnd.apple.mpegurl' &&
                    Hls && Hls.isSupported());
            };
            MediaElement.prototype.isMpeg = function () {
                return this.element.canPlayType('application/vnd.apple.mpegurl') !== '';
            };
            MediaElement.prototype.stop = function () {
                this.element.pause();
                this.element.currentTime = this.source.start;
            };
            MediaElement.prototype.play = function (time) {
                if (time) {
                    this.element.currentTime = time;
                }
                return this.element.play();
            };
            MediaElement.prototype.pause = function () {
                this.element.pause();
            };
            MediaElement.prototype.isBuffering = function () {
                return this.element.readyState < 3;
            };
            return MediaElement;
        }());
        AVHelpers.MediaElement = MediaElement;
        var CompositeMediaElement = /** @class */ (function () {
            function CompositeMediaElement(mediaElements) {
                var _this = this;
                this.elements = [];
                this.playing = false;
                this.canvasMap = {};
                this._onPlay = [];
                this._onPause = [];
                // Add all elements.
                this.elements = mediaElements;
                var _loop_1 = function (el) {
                    var canvasId = el.getCanvasId();
                    this_1.canvasMap[canvasId] = this_1.canvasMap[canvasId] ? this_1.canvasMap[canvasId] : [];
                    this_1.canvasMap[canvasId].push(el);
                    // Attach events.
                    el.element.addEventListener('play', function () {
                        _this._onPlay.forEach(function (fn) { return fn(canvasId, el.element.currentTime, el); });
                    });
                    el.element.addEventListener('pause', function () {
                        _this._onPause.forEach(function (fn) { return fn(canvasId, el.element.currentTime, el); });
                    });
                };
                var this_1 = this;
                for (var _i = 0, mediaElements_1 = mediaElements; _i < mediaElements_1.length; _i++) {
                    var el = mediaElements_1[_i];
                    _loop_1(el);
                }
                this.activeElement = mediaElements[0];
            }
            CompositeMediaElement.prototype.syncClock = function (time) {
                this.activeElement.syncClock(time);
            };
            CompositeMediaElement.prototype.onPlay = function (func) {
                this._onPlay.push(func);
            };
            CompositeMediaElement.prototype.onPause = function (func) {
                this._onPause.push(func);
            };
            CompositeMediaElement.prototype.findElementInRange = function (canvasId, time) {
                if (!this.canvasMap[canvasId]) {
                    return undefined;
                }
                for (var _i = 0, _a = this.canvasMap[canvasId]; _i < _a.length; _i++) {
                    var el = _a[_i];
                    if (el.isWithinRange(time)) {
                        return el;
                    }
                }
                return undefined;
            };
            CompositeMediaElement.prototype.appendTo = function ($element) {
                console.log('Appending...', this.elements.map(function (media) { return media.element; }));
                $element.append(this.elements.map(function (media) { return media.element; }));
            };
            CompositeMediaElement.prototype.load = function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, Promise.all(this.elements.map(function (element) { return element.load(); }))];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            CompositeMediaElement.prototype.seekTo = function (canvasId, time) {
                return __awaiter(this, void 0, void 0, function () {
                    var newElement;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                newElement = this.findElementInRange(canvasId, time);
                                if (newElement && newElement !== this.activeElement) {
                                    // Moving track.
                                    // Stop the current track.
                                    this.activeElement.stop();
                                    // Set new current track.
                                    this.activeElement = newElement;
                                }
                                if (!this.playing) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.activeElement.play(time)];
                            case 1:
                                _a.sent();
                                return [3 /*break*/, 3];
                            case 2:
                                this.activeElement.syncClock(time);
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                });
            };
            CompositeMediaElement.prototype.play = function (canvasId, time) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.playing = true;
                                if (!(canvasId && typeof time !== 'undefined')) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.seekTo(canvasId, time)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/, this.activeElement.play(time)];
                        }
                    });
                });
            };
            CompositeMediaElement.prototype.pause = function () {
                this.playing = false;
                this.activeElement.pause();
            };
            CompositeMediaElement.prototype.setVolume = function (volume) {
                for (var _i = 0, _a = this.elements; _i < _a.length; _i++) {
                    var el = _a[_i];
                    el.element.volume = volume;
                }
            };
            CompositeMediaElement.prototype.isBuffering = function () {
                return this.activeElement.isBuffering();
            };
            return CompositeMediaElement;
        }());
        AVHelpers.CompositeMediaElement = CompositeMediaElement;
        var TimePlanPlayer = /** @class */ (function () {
            function TimePlanPlayer(media, plan, notifyRangeChange, notifyTimeChange, notifyPlaying) {
                var _this = this;
                this.continuous = true;
                this.playing = false;
                this._time = 0;
                this.media = media;
                this.plan = plan;
                this.fullPlan = plan;
                this.currentStop = plan.stops[0];
                this.notifyRangeChange = notifyRangeChange;
                this.notifyTimeChange = notifyTimeChange;
                this.notifyPlaying = notifyPlaying;
                this.logging = true;
                this.currentRange = this.currentStop.rangeStack[0];
                this.setTime(this.currentStop.start);
                media.onPlay(function (canvasId, time, el) {
                    // Playing the right thing...
                    if (canvasId === _this.plan.canvases[_this.currentStop.canvasIndex]) {
                        if (!_this.playing) {
                            _this.notifyPlaying(true);
                        }
                    }
                    else {
                        el.pause();
                    }
                });
                media.onPause(function (canvasId) {
                    if (canvasId === _this.plan.canvases[_this.currentStop.canvasIndex]) {
                        if (_this.playing) {
                            _this.notifyPlaying(false);
                        }
                    }
                });
            }
            TimePlanPlayer.prototype.selectPlan = function (_a) {
                var _b = _a === void 0 ? {} : _a, reset = _b.reset, rangeId = _b.rangeId;
                if (reset) {
                    return this.initialisePlan(this.fullPlan);
                }
                if (rangeId) {
                    var foundStack = [];
                    for (var _i = 0, _c = this.fullPlan.stops; _i < _c.length; _i++) {
                        var plan_1 = _c[_i];
                        var idx = plan_1.rangeStack.indexOf(rangeId);
                        if (plan_1.rangeStack.indexOf(rangeId) !== -1) {
                            foundStack = plan_1.rangeStack.slice(1, idx + 1);
                        }
                    }
                    var plan = this.fullPlan;
                    for (var _d = 0, foundStack_1 = foundStack; _d < foundStack_1.length; _d++) {
                        var id = foundStack_1[_d];
                        for (var _e = 0, _f = plan.items; _e < _f.length; _e++) {
                            var item = _f[_e];
                            if (item.type === 'time-plan' && item.rangeId === id) {
                                plan = item;
                                break;
                            }
                        }
                    }
                    if (plan) {
                        return this.initialisePlan(plan);
                    }
                }
            };
            TimePlanPlayer.prototype.initialisePlan = function (plan) {
                this.plan = plan;
            };
            TimePlanPlayer.prototype.getCurrentRange = function () {
                var rangeId = this.currentRange;
                var isRangeWithStop = this.currentRange === this.currentStop.rangeId;
                var stopsToCheck = isRangeWithStop ? this.plan.stops : this.fullPlan.stops;
                var starting = [];
                var ending = [];
                for (var _i = 0, stopsToCheck_1 = stopsToCheck; _i < stopsToCheck_1.length; _i++) {
                    var stop_1 = stopsToCheck_1[_i];
                    if (!isRangeWithStop) {
                        if (stop_1.rangeStack.indexOf(rangeId) !== -1) {
                            starting.push(stop_1.start);
                            ending.push(stop_1.end);
                        }
                    }
                    else if (stop_1.rangeId === rangeId) {
                        starting.push(stop_1.start);
                        ending.push(stop_1.end);
                    }
                }
                var start = Math.min.apply(Math, starting);
                var end = Math.max.apply(Math, ending);
                console.log('Range', {
                    rangeId: rangeId,
                    isRangeWithStop: isRangeWithStop,
                    stopsToCheck: stopsToCheck,
                    start: start - this.plan.start,
                    end: end - this.plan.start,
                    duration: end - start,
                });
                return {
                    start: start - this.plan.start,
                    end: end - this.plan.start,
                    duration: end - start,
                };
            };
            TimePlanPlayer.prototype.getTime = function () {
                return this._time;
            };
            TimePlanPlayer.prototype.setInternalTime = function (time) {
                this._time = time;
                this.notifyTimeChange(time);
                return this._time;
            };
            TimePlanPlayer.prototype.log = function () {
                var content = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    content[_i] = arguments[_i];
                }
                this.logging && console.log.apply(console, __spreadArrays(['TimePlanPlayer'], content));
            };
            TimePlanPlayer.prototype.setContinuousPlayback = function (continuous) {
                this.continuous = continuous;
            };
            TimePlanPlayer.prototype.setIsPlaying = function (playing) {
                this.playing = playing;
            };
            TimePlanPlayer.prototype.play = function () {
                this.log('Play', this.getTime());
                this.setIsPlaying(true);
                this.media.play(this.plan.canvases[this.currentStop.canvasIndex], this.currentMediaTime());
                return this.getTime();
            };
            TimePlanPlayer.prototype.currentMediaTime = function () {
                return this.getTime() - this.currentStop.start + this.currentStop.canvasTime.start;
            };
            TimePlanPlayer.prototype.pause = function () {
                this.log('Pause', this.getTime());
                this.setIsPlaying(false);
                this.media.pause();
                return this.getTime();
            };
            TimePlanPlayer.prototype.setVolume = function (volume) {
                this.media.setVolume(volume);
            };
            TimePlanPlayer.prototype.findStop = function (time) {
                // // First check current stop.
                // if ((this.currentStop.start - 0.0001) <= time && (this.currentStop.end + 0.0001) > time) {
                //     return this.currentStop;
                // }
                //
                // // Then check next stop.
                // const idx = this.plan.stops.indexOf(this.currentStop);
                // const nextStop = idx !== -1 ? this.plan.stops[idx + 1] : undefined;
                // if (nextStop && nextStop.start <= time && nextStop.end > time) {
                //     return nextStop;
                // }
                // Fallback to checking all stops.
                for (var _i = 0, _a = this.plan.stops; _i < _a.length; _i++) {
                    var stop_2 = _a[_i];
                    if (stop_2.start - 0.001 <= time && stop_2.end - 0.001 > time) {
                        return stop_2;
                    }
                }
                if (this.plan.stops[this.plan.stops.length - 1].end === time) {
                    return this.plan.stops[this.plan.stops.length - 1];
                }
                return;
            };
            // Time that is set by the user.
            TimePlanPlayer.prototype.setTime = function (time, setRange) {
                if (setRange === void 0) { setRange = true; }
                return __awaiter(this, void 0, void 0, function () {
                    var stop;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.groupCollapsed('set time');
                                console.trace();
                                console.log('USER SET TIME', time, setRange);
                                this.log('set time', { from: this.getTime(), to: time });
                                this.setInternalTime(time);
                                stop = this.findStop(time);
                                if (!(stop && stop !== this.currentStop)) return [3 /*break*/, 2];
                                if (setRange) {
                                    this.currentRange = stop.rangeId;
                                }
                                return [4 /*yield*/, this.advanceToStop(this.currentStop, stop)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                console.groupEnd();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            TimePlanPlayer.prototype.next = function () {
                var currentRangeIndex = this.plan.rangeOrder.indexOf(this.currentRange);
                var isLast = currentRangeIndex >= 0 && currentRangeIndex === (this.plan.rangeOrder.length - 1);
                var nextRangeIdx = !isLast ? this.plan.rangeOrder.indexOf(this.currentRange) + 1 : undefined;
                var nextRange = typeof nextRangeIdx !== 'undefined' ? this.plan.rangeOrder[nextRangeIdx] : undefined;
                var idx = this.plan.stops.indexOf(this.currentStop);
                var offset = 0;
                var nextStop;
                while (true) {
                    offset++;
                    nextStop = this.plan.stops[idx + offset];
                    if (!nextStop) {
                        break;
                    }
                    if (nextStop.rangeId !== this.currentStop.rangeId) {
                        break;
                    }
                }
                if (this.playing && nextStop) {
                    nextRange = nextStop.rangeId;
                }
                if (nextRange && nextStop && nextStop.rangeId !== nextRange) {
                    if (this.playing || (this.currentStop.rangeStack.indexOf(nextRange) === -1 && nextStop.rangeStack.indexOf(nextRange) !== -1)) {
                        this.currentRange = this.playing ? nextStop.rangeId : nextRange;
                        this.setInternalTime(nextStop.start);
                        this.advanceToStop(this.currentStop, nextStop, this.playing ? nextStop.rangeId : nextRange);
                    }
                    else {
                        this.currentRange = nextRange;
                        this.setInternalTime(this.currentStop.start);
                        this.advanceToStop(this.currentStop, this.currentStop, nextRange);
                    }
                    return this.getTime();
                }
                if (nextStop) {
                    this.setInternalTime(nextStop.start);
                    this.currentRange = nextStop.rangeId;
                    this.advanceToStop(this.currentStop, nextStop, nextStop.rangeId);
                }
                else {
                    this.setInternalTime(this.currentStop.end);
                }
                return this.getTime();
            };
            TimePlanPlayer.prototype.previous = function () {
                var currentRangeIndex = this.plan.rangeOrder.indexOf(this.currentRange);
                var isFirst = currentRangeIndex === 0;
                var prevRangeIdx = !isFirst ? this.plan.rangeOrder.indexOf(this.currentRange) - 1 : undefined;
                var prevRange = typeof prevRangeIdx !== 'undefined' ? this.plan.rangeOrder[prevRangeIdx] : undefined;
                var idx = this.plan.stops.indexOf(this.currentStop);
                var prevStop = this.plan.stops[idx - 1];
                var negativeOffset = -1;
                while (true) {
                    var nextPrevStop = this.plan.stops[idx + negativeOffset];
                    negativeOffset--; // start at -1
                    if (!nextPrevStop) {
                        break;
                    }
                    if (prevStop.rangeId !== nextPrevStop.rangeId) {
                        break;
                    }
                    prevStop = nextPrevStop;
                }
                if (this.playing && prevStop) {
                    prevRange = prevStop.rangeId;
                }
                // while (offset <= idx) {
                //     let next = this.plan.stops[offset];
                //     if (!prevStop) {
                //         break;
                //     }
                //     if (next.rangeId === this.currentStop.rangeId) {
                //         break;
                //     }
                //     prevStop = next;
                //     offset++;
                // }
                // Case 1, at the start, but parent ranges possible.
                if (idx === 0) {
                    // Set the time to the start.
                    this.setInternalTime(this.currentStop.start);
                    // We are on the first item.
                    if (prevRange && this.currentStop.rangeId !== prevRange) {
                        // But we still want to change the range.
                        this.currentRange = prevRange;
                        this.advanceToStop(this.currentStop, this.currentStop, prevRange);
                    }
                    // And return the time.
                    return this.getTime();
                }
                // Case 2, in the middle, but previous is a parent.
                if (
                // If the range to navigate to isn't part of the current stop.
                prevRange && this.currentStop.rangeStack.indexOf(prevRange) === -1 &&
                    // But it is in the previous.
                    (prevStop.rangeStack.indexOf(prevRange) !== -1 || prevStop.rangeId === prevRange)) {
                    // Then we navigate to the previous.
                    this.setInternalTime(prevStop.start);
                    this.currentRange = prevRange;
                    this.advanceToStop(this.currentStop, prevStop, prevRange);
                    // And time.
                    return this.getTime();
                }
                // If the previous range is in the current ranges stack (i.e. a parent)
                if (prevRange && this.currentStop.rangeStack.indexOf(prevRange) !== -1) {
                    this.setInternalTime(this.currentStop.start);
                    this.currentRange = prevRange;
                    this.advanceToStop(this.currentStop, this.currentStop, prevRange);
                    // And time.
                    return this.getTime();
                }
                return this.getTime();
            };
            TimePlanPlayer.prototype.setRange = function (id) {
                console.log('setRange', id);
                if (id === this.currentRange) {
                    return this.getTime();
                }
                this.currentRange = id;
                if (id === this.currentStop.rangeId) {
                    // Or the start of the range?
                    return this.getTime();
                }
                for (var _i = 0, _a = this.plan.stops; _i < _a.length; _i++) {
                    var stop_3 = _a[_i];
                    if (stop_3.rangeId === id) {
                        this.setInternalTime(stop_3.start);
                        this.advanceToStop(this.currentStop, stop_3, id);
                        break;
                    }
                }
                for (var _b = 0, _c = this.plan.stops; _b < _c.length; _b++) {
                    var stop_4 = _c[_b];
                    if (stop_4.rangeStack.indexOf(id) !== -1) {
                        this.setInternalTime(stop_4.start);
                        this.advanceToStop(this.currentStop, stop_4, id);
                        break;
                    }
                }
                return this.getTime();
            };
            TimePlanPlayer.prototype.isBuffering = function () {
                return this.media.isBuffering();
            };
            // Time that has ticked over.
            TimePlanPlayer.prototype.advanceToTime = function (time) {
                // this.log('advanceToTime', this.getTime().toFixed(0), time.toFixed(0));
                var stop = this.findStop(time);
                if (stop && this.currentStop !== stop) {
                    this.advanceToStop(this.currentStop, stop);
                    return { buffering: this.isBuffering(), time: time };
                }
                // User has selected top level range.
                if (this.playing && this.currentRange !== this.currentStop.rangeId) {
                    this.currentRange = this.currentStop.rangeId;
                    console.log('Breaking here?');
                    this.notifyRangeChange(this.currentStop.rangeId, { from: this.currentStop, to: this.currentStop });
                }
                if (!stop) {
                    this.pause();
                    this.setTime(this.currentStop.end);
                    return { paused: true, buffering: this.isBuffering(), time: this.currentStop.end };
                }
                else {
                    this.setInternalTime(time);
                    this.media.syncClock(this.currentMediaTime());
                    return { time: time };
                }
            };
            TimePlanPlayer.prototype.hasEnded = function () {
                return this.currentStop.end === this.getTime();
            };
            TimePlanPlayer.prototype.advanceToStop = function (from, to, rangeId) {
                return __awaiter(this, void 0, void 0, function () {
                    var promise;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (from === to) {
                                    if (rangeId) {
                                        this.notifyRangeChange(rangeId ? rangeId : to.rangeId, { to: to, from: from });
                                    }
                                    return [2 /*return*/];
                                }
                                ;
                                this.log('advanceToStop', to.start);
                                this.currentStop = to;
                                promise = this.media.seekTo(this.plan.canvases[to.canvasIndex], this.currentMediaTime());
                                this.notifyRangeChange(rangeId ? rangeId : to.rangeId, { to: to, from: from });
                                return [4 /*yield*/, promise];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            TimePlanPlayer.prototype.getStartTime = function () {
                return this.plan.start;
            };
            TimePlanPlayer.prototype.getDuration = function () {
                return this.plan.duration;
            };
            return TimePlanPlayer;
        }());
        AVHelpers.TimePlanPlayer = TimePlanPlayer;
    })(AVHelpers || (AVHelpers = {}));
    var AVVolumeControl = /** @class */ (function (_super) {
        __extends(AVVolumeControl, _super);
        function AVVolumeControl(options) {
            var _this = _super.call(this, options) || this;
            _this._lastVolume = 1;
            _this._data = {
                volume: 1
            };
            _this._init();
            _this._resize();
            return _this;
        }
        AVVolumeControl.prototype._init = function () {
            var _this = this;
            var success = _super.prototype._init.call(this);
            if (!success) {
                console.error("Component failed to initialise");
            }
            this._$volumeMute = $("\n                                <button class=\"btn volume-mute\" title=\"" + this.options.data.content.mute + "\">\n                                    <i class=\"av-icon av-icon-mute on\" aria-hidden=\"true\"></i>" + this.options.data.content.mute + "\n                                </button>");
            this._$volumeSlider = $('<div class="volume-slider"></div>');
            this._$element.append(this._$volumeMute, this._$volumeSlider);
            var that = this;
            this._$volumeMute.on('touchstart click', function (e) {
                e.preventDefault();
                // start reducer
                if (_this._data.volume !== 0) {
                    // mute
                    _this._lastVolume = _this._data.volume;
                    _this._data.volume = 0;
                }
                else {
                    // unmute
                    _this._data.volume = _this._lastVolume;
                }
                // end reducer
                _this.fire(VolumeEvents.VOLUME_CHANGED, _this._data.volume);
            });
            this._$volumeSlider.slider({
                value: that._data.volume,
                step: 0.1,
                orientation: "horizontal",
                range: "min",
                min: 0,
                max: 1,
                animate: false,
                create: function (evt, ui) {
                },
                slide: function (evt, ui) {
                    // start reducer
                    that._data.volume = ui.value;
                    if (that._data.volume === 0) {
                        that._lastVolume = 0;
                    }
                    // end reducer
                    that.fire(VolumeEvents.VOLUME_CHANGED, that._data.volume);
                },
                stop: function (evt, ui) {
                }
            });
            return success;
        };
        AVVolumeControl.prototype.set = function (data) {
            this._data = Object.assign(this._data, data);
            this._render();
        };
        AVVolumeControl.prototype._render = function () {
            if (this._data.volume !== undefined) {
                this._$volumeSlider.slider({
                    value: this._data.volume
                });
                if (this._data.volume === 0) {
                    var label = this.options.data.content.unmute;
                    this._$volumeMute.prop('title', label);
                    this._$volumeMute.find('i').switchClass('on', 'off');
                }
                else {
                    var label = this.options.data.content.mute;
                    this._$volumeMute.prop('title', label);
                    this._$volumeMute.find('i').switchClass('off', 'on');
                }
            }
        };
        AVVolumeControl.prototype._resize = function () {
        };
        return AVVolumeControl;
    }(_Components.BaseComponent));
    IIIFComponents.AVVolumeControl = AVVolumeControl;
    var VolumeEvents = /** @class */ (function () {
        function VolumeEvents() {
        }
        VolumeEvents.VOLUME_CHANGED = 'volumechanged';
        return VolumeEvents;
    }());
    IIIFComponents.VolumeEvents = VolumeEvents;
    var CanvasInstance = /** @class */ (function (_super) {
        __extends(CanvasInstance, _super);
        function CanvasInstance(options) {
            var _this = _super.call(this, options) || this;
            _this._canvasClockFrequency = 25;
            _this._canvasClockStartDate = 0;
            _this._canvasClockTime = 0;
            _this._canvasHeight = 0;
            _this._canvasWidth = 0;
            _this._data = _this.data();
            _this._highPriorityFrequency = 25;
            _this._isPlaying = false;
            _this._isStalled = false;
            //private _lastCanvasHeight: number | undefined;
            //private _lastCanvasWidth: number | undefined;
            _this._lowPriorityFrequency = 250;
            _this._mediaSyncMarginSecs = 1;
            _this._rangeSpanPadding = 0.25;
            _this._readyMediaCount = 0;
            _this._stallRequestedBy = []; //todo: type
            _this._wasPlaying = false;
            //private _waveformNeedsRedraw: boolean = true;
            _this.ranges = [];
            _this.waveforms = [];
            _this._buffering = false;
            _this._bufferShown = false;
            _this.isOnlyCanvasInstance = false;
            _this.waveformDeltaX = 0;
            _this.waveformPageX = 0;
            _this.waveFormInit = false;
            _this._scaleY = function (amplitude, height) {
                var range = 256;
                return Math.max(_this._data.waveformBarWidth, (amplitude * height / range));
            };
            _this._data = _this.options.data;
            _this.$playerElement = $('<div class="player player--loading"></div>');
            return _this;
        }
        CanvasInstance.prototype.loaded = function () {
            var _this = this;
            setTimeout(function () {
                _this.$playerElement.removeClass('player--loading');
            }, 500);
        };
        CanvasInstance.prototype.isPlaying = function () {
            return this._isPlaying;
        };
        CanvasInstance.prototype.getClockTime = function () {
            return this._canvasClockTime;
        };
        CanvasInstance.prototype.createTimeStops = function () {
            var _this = this;
            var helper = this._data.helper;
            var canvas = this._data.canvas;
            if (!helper || !canvas) {
                return;
            }
            this.ranges = [];
            this._contentAnnotations = [];
            var canvases = canvas.canvases;
            var mediaElements = [];
            for (var _i = 0, canvases_1 = canvases; _i < canvases_1.length; _i++) {
                var canvas_1 = canvases_1[_i];
                var annotations = canvas_1.getContent();
                for (var _a = 0, annotations_1 = annotations; _a < annotations_1.length; _a++) {
                    var annotation = annotations_1[_a];
                    var annotationBody = AVHelpers.extractMediaFromAnnotationBodies(annotation);
                    if (!annotationBody)
                        continue;
                    var mediaSource = AVHelpers.getMediaSourceFromAnnotationBody(annotation, annotationBody, {
                        id: canvas_1.id,
                        duration: canvas_1.getDuration() || 0,
                        height: canvas_1.getHeight(),
                        width: canvas_1.getWidth()
                    });
                    var mediaElement = new AVHelpers.MediaElement(mediaSource, {
                        adaptiveAuthEnabled: this._data.adaptiveAuthEnabled,
                    });
                    mediaElement.setSize(this._convertToPercentage(mediaSource.x || 0, canvas_1.getHeight()), this._convertToPercentage(mediaSource.y || 0, canvas_1.getWidth()), this._convertToPercentage(mediaSource.width || canvas_1.getWidth(), canvas_1.getWidth()), this._convertToPercentage(mediaSource.height || canvas_1.getHeight(), canvas_1.getHeight()));
                    mediaElements.push(mediaElement);
                    var seeAlso = annotation.getProperty('seeAlso');
                    if (seeAlso && seeAlso.length) {
                        var dat = seeAlso[0].id;
                        this.waveforms.push(dat);
                    }
                }
            }
            var compositeMediaElement = new AVHelpers.CompositeMediaElement(mediaElements);
            compositeMediaElement.appendTo(this.$playerElement);
            compositeMediaElement.load().then(function () {
                // this._updateDurationDisplay();
                _this.fire(AVComponent.Events.MEDIA_READY);
            });
            // this._renderSyncIndicator(data)
            var plan = AVHelpers.createTimePlansFromManifest(helper.manifest, mediaElements);
            // @ts-ignore
            window.timePlanPlayer = this.timePlanPlayer = new AVHelpers.TimePlanPlayer(compositeMediaElement, plan, function (rangeId) {
                _this.setCurrentRangeId(rangeId, { autoChanged: true });
            }, function (time) {
                _this._canvasClockTime = time;
            }, function (isPlaying) {
                if (isPlaying) {
                    _this.play();
                }
                else {
                    _this.pause();
                }
            });
            // 1) DONE - Create list of all the media and load into the DOM.
            // 2) DONE - Create the time stops, with references to the media.
            // 3) Set canvas height and width
            // 4) Attach button events (this this class)
            // 5) Create slider and containers
            // 6) Push wave forms
            // this.fire(AVComponent.Events.MEDIA_READY);
            // - Which increments a "number loaded"
            // - Maybe change this.
        };
        CanvasInstance.prototype.init = function () {
            var _this = this;
            if (!this._data || !this._data.content || !this._data.canvas) {
                console.warn('unable to initialise, missing canvas or content');
                return;
            }
            this._$hoverPreviewTemplate = $('<div class="hover-preview"><div class="label"></div><div class="pointer"><span class="arrow"></span></div></div>');
            this._$canvasContainer = $('<div class="canvas-container"></div>');
            this._$optionsContainer = $('<div class="options-container"></div>');
            this._$rangeTimelineContainer = $('<div class="range-timeline-container"></div>');
            this._$canvasTimelineContainer = $('<div class="canvas-timeline-container"></div>');
            this._$canvasHoverPreview = this._$hoverPreviewTemplate.clone();
            this._$canvasHoverHighlight = $('<div class="hover-highlight"></div>');
            this._$rangeHoverPreview = this._$hoverPreviewTemplate.clone();
            this._$rangeHoverHighlight = $('<div class="hover-highlight"></div>');
            this._$durationHighlight = $('<div class="duration-highlight"></div>');
            this._$timelineItemContainer = $('<div class="timeline-item-container"></div>');
            this._$controlsContainer = $('<div class="controls-container"></div>');
            this._$prevButton = $("\n                                <button class=\"btn\" title=\"" + this._data.content.previous + "\">\n                                    <i class=\"av-icon av-icon-previous\" aria-hidden=\"true\"></i>" + this._data.content.previous + "\n                                </button>");
            this._$playButton = $("\n                                <button class=\"btn\" title=\"" + this._data.content.play + "\">\n                                    <i class=\"av-icon av-icon-play play\" aria-hidden=\"true\"></i>" + this._data.content.play + "\n                                </button>");
            this._$nextButton = $("\n                                <button class=\"btn\" title=\"" + this._data.content.next + "\">\n                                    <i class=\"av-icon av-icon-next\" aria-hidden=\"true\"></i>" + this._data.content.next + "\n                                </button>");
            this._$fastForward = $("\n                                <button class=\"btn\" title=\"" + this._data.content.next + "\">\n                                    <i class=\"av-icon av-icon-fast-forward\" aria-hidden=\"true\"></i>" + (this._data.content.fastForward || '') + "\n                                </button>");
            this._$fastRewind = $("\n                                <button class=\"btn\" title=\"" + this._data.content.next + "\">\n                                    <i class=\"av-icon av-icon-fast-rewind\" aria-hidden=\"true\"></i>" + (this._data.content.fastRewind || '') + "\n                                </button>");
            this._$timeDisplay = $('<div class="time-display"><span class="canvas-time"></span> / <span class="canvas-duration"></span></div>');
            this._$canvasTime = this._$timeDisplay.find('.canvas-time');
            this._$canvasDuration = this._$timeDisplay.find('.canvas-duration');
            if (this.isVirtual()) {
                this.$playerElement.addClass('virtual');
            }
            var $volume = $('<div class="volume"></div>');
            this._volume = new AVVolumeControl({
                target: $volume[0],
                data: Object.assign({}, this._data)
            });
            this._volume.on(VolumeEvents.VOLUME_CHANGED, function (value) {
                _this.fire(VolumeEvents.VOLUME_CHANGED, value);
            }, false);
            // @todo make the buttons for FF and FR configurable.
            this._$controlsContainer.append(this._$prevButton, this._data.enableFastRewind ? this._$fastRewind : null, this._$playButton, this._data.enableFastForward ? this._$fastForward : null, this._$nextButton, this._$timeDisplay, $volume);
            this._$canvasTimelineContainer.append(this._$canvasHoverPreview, this._$canvasHoverHighlight, this._$durationHighlight);
            this._$rangeTimelineContainer.append(this._$rangeHoverPreview, this._$rangeHoverHighlight);
            this._$optionsContainer.append(this._$canvasTimelineContainer, this._$rangeTimelineContainer, this._$controlsContainer);
            this.$playerElement.append(this._$canvasContainer, this._$optionsContainer);
            this._$canvasHoverPreview.hide();
            this._$rangeHoverPreview.hide();
            var newRanges = this.isVirtual() && AVComponent.newRanges;
            // Should bootstrap ranges and content.
            if (newRanges) {
                this.createTimeStops();
            }
            if (!newRanges) {
                if (this._data && this._data.helper && this._data.canvas) {
                    var ranges_1 = [];
                    // if the canvas is virtual, get the ranges for all sub canvases
                    if (this.isVirtual()) {
                        // @todo - create time slices.
                        this._data.canvas.canvases.forEach(function (canvas) {
                            if (_this._data && _this._data.helper) {
                                var r = _this._data.helper.getCanvasRanges(canvas);
                                var clonedRanges_1 = [];
                                // shift the range targets forward by the duration of their previous canvases
                                r.forEach(function (range) {
                                    var clonedRange = jQuery.extend(true, {}, range);
                                    clonedRanges_1.push(clonedRange);
                                    if (clonedRange.canvases && clonedRange.canvases.length) {
                                        for (var i = 0; i < clonedRange.canvases.length; i++) {
                                            clonedRange.canvases[i] = AVComponentUtils.retargetTemporalComponent(_this._data.canvas.canvases, clonedRange.__jsonld.items[i].id);
                                        }
                                    }
                                });
                                ranges_1.push.apply(ranges_1, clonedRanges_1);
                            }
                        });
                    }
                    else {
                        ranges_1 = ranges_1.concat(this._data.helper.getCanvasRanges(this._data.canvas));
                    }
                    ranges_1.forEach(function (range) {
                        _this.ranges.push(range);
                    });
                }
            }
            var canvasWidth = this._data.canvas.getWidth();
            var canvasHeight = this._data.canvas.getHeight();
            if (!canvasWidth) {
                this._canvasWidth = this.$playerElement.parent().width(); // this._data.defaultCanvasWidth;
            }
            else {
                this._canvasWidth = canvasWidth;
            }
            if (!canvasHeight) {
                this._canvasHeight = this._canvasWidth * this._data.defaultAspectRatio; //this._data.defaultCanvasHeight;
            }
            else {
                this._canvasHeight = canvasHeight;
            }
            var that = this;
            var prevClicks = 0;
            var prevTimeout = 0;
            this._$prevButton.on('touchstart click', function (e) {
                e.preventDefault();
                prevClicks++;
                if (prevClicks === 1) {
                    // single click
                    _this._previous(false);
                    prevTimeout = setTimeout(function () {
                        prevClicks = 0;
                        prevTimeout = 0;
                    }, _this._data.doubleClickMS);
                }
                else {
                    // double click
                    _this._previous(true);
                    clearTimeout(prevTimeout);
                    prevClicks = 0;
                    prevTimeout = 0;
                }
            });
            this._$playButton.on('touchstart click', function (e) {
                e.preventDefault();
                if (_this._isPlaying) {
                    _this.pause();
                }
                else {
                    _this.play();
                }
            });
            this._$nextButton.on('touchstart click', function (e) {
                e.preventDefault();
                _this._next();
            });
            this._$fastForward.on('touchstart click', function (e) {
                var end = _this.getRangeTiming().end;
                var goToTime = _this.getClockTime() + 20;
                if (goToTime < end) {
                    return _this._setCurrentTime(goToTime);
                }
                return _this._setCurrentTime(end);
            });
            this._$fastRewind.on('touchstart click', function (e) {
                var start = _this.getRangeTiming().start;
                var goToTime = _this.getClockTime() - 20;
                if (goToTime >= start) {
                    return _this._setCurrentTime(goToTime);
                }
                return _this._setCurrentTime(start);
            });
            if (newRanges) {
                this._$canvasTimelineContainer.slider({
                    value: 0,
                    step: 0.01,
                    orientation: "horizontal",
                    range: "min",
                    min: 0,
                    max: this.timePlanPlayer.getDuration(),
                    animate: false,
                    slide: function (evt, ui) {
                        _this._setCurrentTime(_this.timePlanPlayer.plan.start + ui.value);
                    },
                });
            }
            else {
                this._$canvasTimelineContainer.slider({
                    value: 0,
                    step: 0.01,
                    orientation: "horizontal",
                    range: "min",
                    max: that._getDuration(),
                    animate: false,
                    create: function (evt, ui) {
                        // on create
                    },
                    slide: function (evt, ui) {
                        that._setCurrentTime(ui.value);
                    },
                    stop: function (evt, ui) {
                        //this._setCurrentTime(ui.value);
                    }
                });
            }
            this._$canvasTimelineContainer.mouseout(function () {
                that._$canvasHoverHighlight.width(0);
                that._$canvasHoverPreview.hide();
            });
            this._$rangeTimelineContainer.mouseout(function () {
                that._$rangeHoverHighlight.width(0);
                that._$rangeHoverPreview.hide();
            });
            this._$canvasTimelineContainer.on("mousemove", function (e) {
                if (newRanges) {
                    _this._updateHoverPreview(e, _this._$canvasTimelineContainer, _this.timePlanPlayer.getDuration());
                }
                else {
                    _this._updateHoverPreview(e, _this._$canvasTimelineContainer, _this._getDuration());
                }
            });
            this._$rangeTimelineContainer.on("mousemove", function (e) {
                if (newRanges) {
                    _this._updateHoverPreview(e, _this._$canvasTimelineContainer, _this.timePlanPlayer.getDuration());
                }
                else if (_this._data.range) {
                    var duration = _this._data.range.getDuration();
                    _this._updateHoverPreview(e, _this._$rangeTimelineContainer, duration ? duration.getLength() : 0);
                }
            });
            if (newRanges) {
                return;
            }
            // create annotations
            this._contentAnnotations = [];
            var items = this._data.canvas.getContent(); // (<any>this._data.canvas).__jsonld.content[0].items;
            // always hide timelineItemContainer for now
            //if (items.length === 1) {
            this._$timelineItemContainer.hide();
            //}
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                /*
                if (item.motivation != 'painting') {
                    return null;
                }
                */
                var mediaSource = void 0;
                var bodies = item.getBody();
                if (!bodies.length) {
                    console.warn('item has no body');
                    return;
                }
                var body = this._getBody(bodies);
                if (!body) {
                    // if no suitable format was found for the current browser, skip this item.
                    console.warn('unable to find suitable format for', item.id);
                    continue;
                }
                var type = body.getType();
                var format = body.getFormat();
                // if (type && type.toString() === 'choice') {
                //     // Choose first "Choice" item as body
                //     const tmpItem = item;
                //     item.body = tmpItem.body[0].items[0];
                //     mediaSource = item.body.id.split('#')[0];
                // } else
                if (type && type.toString() === 'textualbody') {
                    //mediaSource = (<any>body).value;
                }
                else {
                    mediaSource = body.id.split('#')[0];
                }
                /*
                var targetFragment = (item.target.indexOf('#') != -1) ? item.target.split('#t=')[1] : '0, '+ canvasClockDuration,
                    fragmentTimings = targetFragment.split(','),
                    startTime = parseFloat(fragmentTimings[0]),
                    endTime = parseFloat(fragmentTimings[1]);

                //TODO: Check format (in "target" as MFID or in "body" as "width", "height" etc.)
                var fragmentPosition = [0, 0, 100, 100],
                    positionTop = fragmentPosition[1],
                    positionLeft = fragmentPosition[0],
                    mediaWidth = fragmentPosition[2],
                    mediaHeight = fragmentPosition[3];
                */
                var target = item.getTarget();
                if (!target) {
                    console.warn('item has no target');
                    return;
                }
                var xywh = AVComponentUtils.getSpatialComponent(target);
                var t = Manifesto.Utils.getTemporalComponent(target);
                if (!xywh) {
                    xywh = [0, 0, this._canvasWidth, this._canvasHeight];
                }
                if (!t) {
                    t = [0, this._getDuration()];
                }
                var positionLeft = parseInt(String(xywh[0])), positionTop = parseInt(String(xywh[1])), mediaWidth = parseInt(String(xywh[2])), mediaHeight = parseInt(String(xywh[3])), startTime = parseInt(String(t[0])), endTime = parseInt(String(t[1]));
                var percentageTop = this._convertToPercentage(positionTop, this._canvasHeight), percentageLeft = this._convertToPercentage(positionLeft, this._canvasWidth), percentageWidth = this._convertToPercentage(mediaWidth, this._canvasWidth), percentageHeight = this._convertToPercentage(mediaHeight, this._canvasHeight);
                var temporalOffsets = /t=([^&]+)/g.exec(body.id);
                var ot = void 0;
                if (temporalOffsets && temporalOffsets[1]) {
                    ot = temporalOffsets[1].split(',');
                }
                else {
                    ot = [null, null];
                }
                var offsetStart = (ot[0]) ? parseInt(ot[0]) : ot[0], offsetEnd = (ot[1]) ? parseInt(ot[1]) : ot[1];
                // todo: type this
                var itemData = {
                    'active': false,
                    'end': endTime,
                    'endOffset': offsetEnd,
                    'format': format,
                    'height': percentageHeight,
                    'left': percentageLeft,
                    'source': mediaSource,
                    'start': startTime,
                    'startOffset': offsetStart,
                    'top': percentageTop,
                    'type': type,
                    'width': percentageWidth
                };
                this._renderMediaElement(itemData);
                // waveform
                // todo: create annotation.getSeeAlso
                var seeAlso = item.getProperty('seeAlso');
                if (seeAlso && seeAlso.length) {
                    var dat = seeAlso[0].id;
                    this.waveforms.push(dat);
                }
            }
        };
        CanvasInstance.prototype._getBody = function (bodies) {
            // if there's an HLS format and HLS is supported in this browser
            for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                var format = body.getFormat();
                if (format) {
                    if (AVComponentUtils.isHLSFormat(format) && AVComponentUtils.canPlayHls()) {
                        return body;
                    }
                }
            }
            // if there's a Dash format and the browser isn't Safari
            for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                var format = body.getFormat();
                if (format) {
                    if (AVComponentUtils.isMpegDashFormat(format) && !AVComponentUtils.isSafari()) {
                        return body;
                    }
                }
            }
            // otherwise, return the first format that isn't HLS or Dash
            for (var i = 0; i < bodies.length; i++) {
                var body = bodies[i];
                var format = body.getFormat();
                if (format) {
                    if (!AVComponentUtils.isHLSFormat(format) && !AVComponentUtils.isMpegDashFormat(format)) {
                        return body;
                    }
                }
            }
            // couldn't find a suitable format
            return null;
        };
        CanvasInstance.prototype._getDuration = function () {
            if (this.isVirtual() && AVComponent.newRanges) {
                return this.timePlanPlayer.getDuration();
            }
            if (this._data && this._data.canvas) {
                return Math.floor(this._data.canvas.getDuration());
            }
            return 0;
        };
        CanvasInstance.prototype.data = function () {
            return {
                waveformColor: "#fff",
                waveformBarSpacing: 4,
                waveformBarWidth: 2,
                volume: 1
            };
        };
        CanvasInstance.prototype.isVirtual = function () {
            return this._data.canvas instanceof VirtualCanvas;
        };
        CanvasInstance.prototype.isVisible = function () {
            return !!this._data.visible;
        };
        CanvasInstance.prototype.includesVirtualSubCanvas = function (canvasId) {
            if (this.isVirtual() && this._data.canvas && this._data.canvas.canvases) {
                for (var i = 0; i < this._data.canvas.canvases.length; i++) {
                    var canvas = this._data.canvas.canvases[i];
                    if (Manifesto.Utils.normaliseUrl(canvas.id) === canvasId) {
                        return true;
                    }
                }
            }
            return false;
        };
        CanvasInstance.prototype.setVisibility = function (visibility) {
            if (this._data.visible === visibility) {
                return;
            }
            this._data.visible = visibility;
            if (visibility) {
                this._rewind();
                this.$playerElement.show();
            }
            else {
                this.$playerElement.hide();
                this.pause();
            }
            this.resize();
        };
        CanvasInstance.prototype.viewRange = function (rangeId) {
            if (this.currentRange !== rangeId) {
                console.log("Switching range from " + this.currentRange + " to " + rangeId);
                this.setCurrentRangeId(rangeId);
                // Entrypoint for changing a range. Only get's called when change came from external source.
                this._setCurrentTime(this.timePlanPlayer.setRange(rangeId), true);
                this._render();
            }
        };
        CanvasInstance.prototype.setCurrentRangeId = function (range, _a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.autoChanged, autoChanged = _c === void 0 ? false : _c, _d = _b.limitToRange, limitToRange = _d === void 0 ? false : _d;
            if (!this.currentRange && range && this.limitToRange) {
                // @todo which case was this covering..
                //this.limitToRange = false;
            }
            console.log('Setting current range id', range);
            // This is the end of the chain for changing a range.
            if (range && this.currentRange !== range) {
                this.currentRange = range;
                this.fire(AVComponent.Events.RANGE_CHANGED, range);
            }
            else if (range === null) {
                this.currentRange = undefined;
                this.fire(AVComponent.Events.RANGE_CHANGED, null);
            }
            this._render();
        };
        CanvasInstance.prototype.setVolume = function (volume) {
            this._volume.set({ volume: volume });
            this.timePlanPlayer.setVolume(volume);
        };
        CanvasInstance.prototype.setLimitToRange = function (limitToRange) {
            console.log(this._data.constrainNavigationToRange);
            if (this.limitToRange !== limitToRange) {
                this.limitToRange = limitToRange;
                this._render();
            }
        };
        CanvasInstance.prototype.set = function (data) {
            var _this = this;
            // Simplification of setting state.
            if (AVComponent.newRanges && this.isVirtual()) {
                if (typeof data.range !== 'undefined')
                    this.setCurrentRangeId(data.range.id, { limitToRange: data.limitToRange });
                if (typeof data.rangeId !== 'undefined')
                    this.setCurrentRangeId(data.rangeId, { limitToRange: data.limitToRange });
                if (typeof data.volume !== 'undefined')
                    this.setVolume(data.volume);
                if (typeof data.limitToRange !== 'undefined')
                    this.setLimitToRange(data.limitToRange);
                if (typeof data.visible !== 'undefined')
                    this.setVisibility(data.visible);
                return;
            }
            var oldData = Object.assign({}, this._data);
            this._data = Object.assign(this._data, data);
            var diff = AVComponentUtils.diff(oldData, this._data);
            if (diff.includes('visible')) {
                if (this._data.canvas) {
                    if (this._data.visible) {
                        this._rewind();
                        this.$playerElement.show();
                    }
                    else {
                        this.$playerElement.hide();
                        this.pause();
                    }
                    this.resize();
                }
            }
            if (diff.includes('range')) {
                if (this._data.helper) {
                    if (!this._data.range) {
                        this.fire(AVComponent.Events.RANGE_CHANGED, null);
                    }
                    else {
                        var duration = this._data.range.getDuration();
                        if (duration) {
                            if (typeof duration !== 'undefined') {
                                // Only change the current time if the current time is outside of the current time.
                                if (duration.start >= this._canvasClockTime || duration.end <= this._canvasClockTime) {
                                    this._setCurrentTime(duration.start);
                                }
                                if (this._data.autoPlay) {
                                    this.play();
                                }
                                this.fire(AVComponent.Events.RANGE_CHANGED, this._data.range.id, this._data.range);
                            }
                        }
                    }
                }
                if (diff.includes('volume')) {
                    this._contentAnnotations.forEach(function ($mediaElement) {
                        var volume = (_this._data.volume !== undefined) ? _this._data.volume : 1;
                        $($mediaElement.element).prop('volume', volume);
                        _this._volume.set({
                            volume: _this._data.volume
                        });
                    });
                }
                else {
                    if (this.isVisible()) {
                        this._render();
                    }
                }
                if (diff.includes('limitToRange')) {
                    this._render();
                }
            }
        };
        CanvasInstance.prototype._hasRangeChanged = function () {
            if (this.isVirtual() && AVComponent.newRanges) {
                return;
            }
            var range = this._getRangeForCurrentTime();
            if (range && !this._data.limitToRange && (!this._data.range || (this._data.range && range.id !== this._data.range.id))) {
                console.log('Did you change the range?', range);
                this.set({
                    range: jQuery.extend(true, { autoChanged: true }, range)
                });
            }
        };
        CanvasInstance.prototype._getRangeForCurrentTime = function (parentRange) {
            var ranges;
            if (!parentRange) {
                ranges = this.ranges;
            }
            else {
                ranges = parentRange.getRanges();
            }
            for (var i = 0; i < ranges.length; i++) {
                var range = ranges[i];
                var rangeBehavior = range.getBehavior();
                if (rangeBehavior && rangeBehavior.nonav()) {
                    continue;
                }
                // if the range spans the current time, and is navigable, return it.
                // otherwise, try to find a navigable child range.
                if (this._rangeSpansCurrentTime(range)) {
                    if (this._rangeNavigable(range)) {
                        return range;
                    }
                    var childRanges = range.getRanges();
                    // if a child range spans the current time, recurse into it
                    for (var i_1 = 0; i_1 < childRanges.length; i_1++) {
                        var childRange = childRanges[i_1];
                        if (this._rangeSpansCurrentTime(childRange)) {
                            return this._getRangeForCurrentTime(childRange);
                        }
                    }
                    // this range isn't navigable, and couldn't find a navigable child range.
                    // therefore return the parent range (if any).
                    return range.parentRange;
                }
            }
            return undefined;
        };
        CanvasInstance.prototype._rangeSpansCurrentTime = function (range) {
            if (range.spansTime(Math.ceil(this._canvasClockTime) + this._rangeSpanPadding)) {
                return true;
            }
            return false;
        };
        CanvasInstance.prototype._rangeNavigable = function (range) {
            var behavior = range.getBehavior();
            if (behavior && behavior.toString() === manifesto.Behavior.nonav().toString()) {
                return false;
            }
            return true;
        };
        CanvasInstance.prototype._render = function () {
            if (this.isVirtual() && AVComponent.newRanges && this.isVisible()) {
                console.groupCollapsed('Rendering a new range!');
                console.log({
                    dataRange: this._data.rangeId,
                    range: this.currentRange,
                    newLimitToRange: this.limitToRange,
                    constraintToRange: this._data.constrainNavigationToRange,
                    autoSelectRange: this._data.autoSelectRange,
                });
                // 3 ways to render:
                // Limit to range + no id = show everything
                // Limit to range + id = show everything in context
                // No limit to range = show everything
                // No limit -> Limit (+ range) = show just range
                // - Range id + limitToRange
                // - Range id
                // - nothing
                if (this.limitToRange && this.currentRange) {
                    console.log('Selecting plan...', this.currentRange);
                    this.timePlanPlayer.selectPlan({ rangeId: this.currentRange });
                }
                else {
                    console.log('Resetting...');
                    this.timePlanPlayer.selectPlan({ reset: true });
                }
                var ratio = this._$canvasTimelineContainer.width() / this.timePlanPlayer.getDuration();
                this._$durationHighlight.show();
                var _a = this.timePlanPlayer.getCurrentRange(), start = _a.start, duration = _a.duration;
                this._$canvasTimelineContainer.slider({
                    value: this._canvasClockTime - this.timePlanPlayer.plan.start,
                    max: this.timePlanPlayer.getDuration(),
                });
                // set the start position and width
                this._$durationHighlight.css({
                    left: start * ratio,
                    width: duration * ratio
                });
                console.groupEnd();
                this._updateCurrentTimeDisplay();
                this._updateDurationDisplay();
                this._drawWaveform();
                return;
            }
            // Hide/show UI elements regardless of visibility.
            if (this._data.limitToRange && this._data.range) {
                this._$canvasTimelineContainer.hide();
                this._$rangeTimelineContainer.show();
            }
            else {
                this._$canvasTimelineContainer.show();
                this._$rangeTimelineContainer.hide();
            }
            if (!this._data.range) {
                this._$durationHighlight.hide();
            }
            // Return early if the current CanvasInstance isn't visible
            if (!this.isVisible()) {
                return;
            }
            if (!this.isOnlyCanvasInstance && !this.isVirtual()) {
                return;
            }
            // Render otherwise.
            if (this._data.range && !(this.isVirtual() && AVComponent.newRanges)) {
                var duration = this._data.range.getDuration();
                if (duration) {
                    // get the total length in seconds.
                    var totalDuration = this._getDuration();
                    // get the length of the timeline container
                    var timelineLength = this._$canvasTimelineContainer.width();
                    // get the ratio of seconds to length
                    var ratio = timelineLength / totalDuration;
                    var totalLength = totalDuration * ratio;
                    var start = duration.start * ratio;
                    var end = duration.end * ratio;
                    // if the end is on the next canvas
                    if (end > totalLength || end < start) {
                        end = totalLength;
                    }
                    var width = end - start;
                    if (this.isVirtual() || this.isOnlyCanvasInstance) {
                        this._$durationHighlight.show();
                        // set the start position and width
                        this._$durationHighlight.css({
                            left: start,
                            width: width
                        });
                    }
                    else {
                        this._$durationHighlight.hide();
                    }
                    var that_1 = this;
                    // try to destroy existing rangeTimelineContainer
                    if (this._$rangeTimelineContainer.data("ui-sortable")) {
                        this._$rangeTimelineContainer.slider("destroy");
                    }
                    this._$rangeTimelineContainer.slider({
                        value: duration.start,
                        step: 0.01,
                        orientation: "horizontal",
                        range: "min",
                        min: duration.start,
                        max: duration.end,
                        animate: false,
                        create: function (evt, ui) {
                            // on create
                        },
                        slide: function (evt, ui) {
                            that_1._setCurrentTime(ui.value);
                        },
                        stop: function (evt, ui) {
                            //this._setCurrentTime(ui.value);
                        }
                    });
                }
            }
            this._updateCurrentTimeDisplay();
            this._updateDurationDisplay();
            this._drawWaveform();
        };
        CanvasInstance.prototype.getCanvasId = function () {
            if (this._data && this._data.canvas) {
                return this._data.canvas.id;
            }
            return undefined;
        };
        CanvasInstance.prototype._updateHoverPreview = function (e, $container, duration) {
            var offset = $container.offset();
            var x = e.pageX - offset.left;
            var $hoverArrow = $container.find('.arrow');
            var $hoverHighlight = $container.find('.hover-highlight');
            var $hoverPreview = $container.find('.hover-preview');
            $hoverHighlight.width(x);
            var fullWidth = $container.width();
            var ratio = x / fullWidth;
            var seconds = Math.min(duration * ratio);
            $hoverPreview.find('.label').text(AVComponentUtils.formatTime(seconds));
            var hoverPreviewWidth = $hoverPreview.outerWidth();
            var hoverPreviewHeight = $hoverPreview.outerHeight();
            var left = x - hoverPreviewWidth * 0.5;
            var arrowLeft = hoverPreviewWidth * 0.5 - 6;
            if (left < 0) {
                left = 0;
                arrowLeft = x - 6;
            }
            if (left + hoverPreviewWidth > fullWidth) {
                left = fullWidth - hoverPreviewWidth;
                arrowLeft = (hoverPreviewWidth - (fullWidth - x)) - 6;
            }
            $hoverPreview.css({
                left: left,
                top: hoverPreviewHeight * -1 + 'px'
            }).show();
            $hoverArrow.css({
                left: arrowLeft
            });
        };
        CanvasInstance.prototype._previous = function (isDouble) {
            if (AVComponent.newRanges && this.isVirtual()) {
                console.groupCollapsed('prev');
                var newTime = this.timePlanPlayer.previous();
                this._setCurrentTime(newTime);
                console.log('new time -> ', newTime);
                console.groupEnd();
                return;
            }
            if (this._data.limitToRange) {
                // if only showing the range, single click rewinds, double click goes to previous range unless navigation is contrained to range
                if (isDouble) {
                    if (this._isNavigationConstrainedToRange()) {
                        this._rewind();
                    }
                    else {
                        this.fire(CanvasInstanceEvents.PREVIOUS_RANGE);
                    }
                }
                else {
                    this._rewind();
                }
            }
            else {
                // not limited to range.
                // if there is a currentDuration, single click goes to previous range, double click clears current duration and rewinds.
                // if there is no currentDuration, single and double click rewinds.
                if (this._data.range) {
                    if (isDouble) {
                        this.set({
                            range: undefined
                        });
                        this._rewind();
                    }
                    else {
                        this.fire(CanvasInstanceEvents.PREVIOUS_RANGE);
                    }
                }
                else {
                    this._rewind();
                }
            }
        };
        CanvasInstance.prototype._next = function () {
            if (AVComponent.newRanges && this.isVirtual()) {
                console.groupCollapsed('next');
                this._setCurrentTime(this.timePlanPlayer.next(), false);
                console.groupEnd();
                return;
            }
            if (this._data.limitToRange) {
                if (this._isNavigationConstrainedToRange()) {
                    this._fastforward();
                }
                else {
                    this.fire(CanvasInstanceEvents.NEXT_RANGE);
                }
            }
            else {
                this.fire(CanvasInstanceEvents.NEXT_RANGE);
            }
        };
        CanvasInstance.prototype.destroy = function () {
            window.clearInterval(this._highPriorityInterval);
            window.clearInterval(this._lowPriorityInterval);
            window.clearInterval(this._canvasClockInterval);
        };
        CanvasInstance.prototype._convertToPercentage = function (pixelValue, maxValue) {
            var percentage = (pixelValue / maxValue) * 100;
            return percentage;
        };
        CanvasInstance.prototype._renderMediaElement = function (data) {
            var _this = this;
            var $mediaElement;
            var type = data.type.toString().toLowerCase();
            switch (type) {
                case 'video':
                    $mediaElement = $('<video crossorigin="anonymous" class="anno" />');
                    break;
                case 'sound':
                case 'audio':
                    $mediaElement = $('<audio crossorigin="anonymous" class="anno" />');
                    break;
                // case 'textualbody':
                //     $mediaElement = $('<div class="anno">' + data.source + '</div>');
                //     break;
                // case 'image':
                //     $mediaElement = $('<img class="anno" src="' + data.source + '" />');
                //     break;
                default:
                    return;
            }
            var media = $mediaElement[0];
            //
            // var audioCtx = new AudioContext();
            // var source = audioCtx.createMediaElementSource(media);
            // var panNode = audioCtx.createStereoPanner();
            // var val = -1;
            // setInterval(() => {
            //     val = val === -1 ? 1 : -1;
            //     panNode.pan.setValueAtTime(val, audioCtx.currentTime);
            //     if (val === 1) {
            //         media.playbackRate = 2;
            //     } else {
            //         // media.playbackRate = 1;
            //     }
            // }, 1000);
            // source.connect(panNode);
            // panNode.connect(audioCtx.destination);
            if (data.format && data.format.toString() === 'application/dash+xml') {
                // dash
                $mediaElement.attr('data-dashjs-player', '');
                var player = dashjs.MediaPlayer().create();
                player.getDebug().setLogToBrowserConsole(false);
                // player.getDebug().setLogToBrowserConsole(true);
                // player.getDebug().setLogLevel(4);
                if (this._data.adaptiveAuthEnabled) {
                    player.setXHRWithCredentialsForType('MPD', true); // send cookies
                }
                player.initialize(media, data.source);
            }
            else if (data.format && data.format.toString() === 'application/vnd.apple.mpegurl') {
                // hls
                if (Hls.isSupported()) {
                    var hls = new Hls();
                    if (this._data.adaptiveAuthEnabled) {
                        hls = new Hls({
                            xhrSetup: function (xhr) {
                                xhr.withCredentials = true; // send cookies
                            }
                        });
                    }
                    else {
                        hls = new Hls();
                    }
                    if (this._data.adaptiveAuthEnabled) {
                    }
                    hls.loadSource(data.source);
                    hls.attachMedia(media);
                    //hls.on(Hls.Events.MANIFEST_PARSED, function () {
                    //media.play();
                    //});
                }
                // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
                // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
                // This is using the built-in support of the plain video element, without using hls.js.
                else if (media.canPlayType('application/vnd.apple.mpegurl')) {
                    media.src = data.source;
                    //media.addEventListener('canplay', function () {
                    //media.play();
                    //});
                }
            }
            else {
                $mediaElement.attr('src', data.source);
            }
            $mediaElement.css({
                top: data.top + '%',
                left: data.left + '%',
                width: data.width + '%',
                height: data.height + '%'
            }).hide();
            data.element = $mediaElement;
            data.timeout = null;
            var that = this;
            data.checkForStall = function () {
                var self = this;
                if (this.active) {
                    that._checkMediaSynchronization();
                    if (this.element.get(0).readyState > 0 && !this.outOfSync) {
                        that._playbackStalled(false, self);
                    }
                    else {
                        that._playbackStalled(true, self);
                        if (this.timeout) {
                            window.clearTimeout(this.timeout);
                        }
                        this.timeout = window.setTimeout(function () {
                            self.checkForStall();
                        }, 1000);
                    }
                }
                else {
                    that._playbackStalled(false, self);
                }
            };
            this._contentAnnotations.push(data);
            if (this.$playerElement) {
                this._$canvasContainer.append($mediaElement);
            }
            $mediaElement.on('loadedmetadata', function () {
                _this._readyMediaCount++;
                if (_this._readyMediaCount === _this._contentAnnotations.length) {
                    if (_this._data.autoPlay) {
                        _this.play();
                    }
                    else {
                        _this.pause();
                    }
                    _this._updateDurationDisplay();
                    _this.fire(AVComponent.Events.MEDIA_READY);
                }
            });
            $mediaElement.attr('preload', 'metadata');
            // @todo why?
            $mediaElement.get(0).load();
            this._renderSyncIndicator(data);
        };
        CanvasInstance.prototype._getWaveformData = function (url) {
            // return new Promise(function (resolve, reject) {
            //     const xhr = new XMLHttpRequest();
            //     xhr.responseType = 'arraybuffer';
            //     xhr.open('GET', url);
            //     xhr.addEventListener('load', (progressEvent: any) => {
            //         if (xhr.status == 200) {
            //             resolve(WaveformData.create(progressEvent.target.response));
            //         } else {
            //             reject(new Error(xhr.statusText));
            //         }
            //     });
            //     xhr.onerror = function () {
            //         reject(new Error("Network Error"));
            //     };
            //     xhr.send();
            // });
            // must use this for IE11
            return new Promise(function (resolve, reject) {
                $.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'binary',
                    responseType: 'arraybuffer',
                    processData: false
                }).done(function (data) {
                    resolve(WaveformData.create(data));
                }).fail(function (err) {
                    reject(new Error('Network Error'));
                });
            });
        };
        CanvasInstance.prototype._renderWaveform = function (forceRender) {
            var _this = this;
            if (forceRender === void 0) { forceRender = false; }
            if (this.waveFormInit && !forceRender) {
                return;
            }
            this.waveFormInit = true;
            if (!this.waveforms.length)
                return;
            var promises = this.waveforms.map(function (url) {
                return _this._getWaveformData(url);
            });
            Promise.all(promises).then(function (waveforms) {
                _this._waveformCanvas = document.createElement('canvas');
                _this._waveformCanvas.classList.add('waveform');
                _this._$canvasContainer.append(_this._waveformCanvas);
                _this.waveformPageX = _this._waveformCanvas.getBoundingClientRect().left;
                var raf = _this._drawWaveform.bind(_this);
                // Mouse in and out we reset the delta
                _this._waveformCanvas.addEventListener('mousein', function () {
                    _this.waveformDeltaX = 0;
                });
                _this._$canvasTimelineContainer.on('mouseout', function () {
                    _this.waveformDeltaX = 0;
                    requestAnimationFrame(raf);
                });
                _this._waveformCanvas.addEventListener('mouseout', function () {
                    _this.waveformDeltaX = 0;
                    requestAnimationFrame(raf);
                });
                // When mouse moves over waveform, we render
                _this._waveformCanvas.addEventListener('mousemove', function (e) {
                    _this.waveformDeltaX = e.clientX - _this.waveformPageX;
                    requestAnimationFrame(raf);
                });
                _this._$canvasTimelineContainer.on('mousemove', function (e) {
                    _this.waveformDeltaX = e.clientX - _this.waveformPageX;
                    requestAnimationFrame(raf);
                });
                // When we click the waveform, it should navigate
                _this._waveformCanvas.addEventListener('click', function () {
                    var width = _this._waveformCanvas.getBoundingClientRect().width || 0;
                    if (width) {
                        var _a = _this.getRangeTiming(), start = _a.start, duration = _a.duration;
                        _this._setCurrentTime(start + (duration * (_this.waveformDeltaX / width)));
                    }
                });
                _this._waveformCtx = _this._waveformCanvas.getContext('2d');
                if (_this._waveformCtx) {
                    _this._waveformCtx.fillStyle = _this._data.waveformColor;
                    _this._compositeWaveform = new CompositeWaveform(waveforms);
                    _this.fire(AVComponent.Events.WAVEFORM_READY);
                }
            }).catch(function () {
                console.warn('Could not load wave forms.');
            });
        };
        CanvasInstance.prototype.getRangeTiming = function () {
            if (AVComponent.newRanges && this.isVirtual()) {
                return {
                    start: this.timePlanPlayer.plan.start,
                    end: this.timePlanPlayer.plan.end,
                    duration: this.timePlanPlayer.plan.duration,
                    percent: Math.min((this.timePlanPlayer.getTime() - this.timePlanPlayer.plan.start) / this.timePlanPlayer.plan.duration, 1),
                };
            }
            var durationObj;
            var start = 0;
            var end = this._compositeWaveform ? this._compositeWaveform.duration : -1;
            var duration = end;
            // This is very similar to
            if (this._data.range) {
                durationObj = this._data.range.getDuration();
            }
            if (!this.isVirtual()) {
                end = this._getDuration();
            }
            if (this._data.limitToRange && durationObj) {
                start = durationObj.start;
                end = durationObj.end;
                duration = end - start;
            }
            if (end === -1 && durationObj) {
                start = durationObj.start;
                end = durationObj.end;
                duration = end - start;
            }
            if (end === -1) {
                console.log('getRangeTiming', { start: start, end: end, duration: duration, durationObj: durationObj });
                console.log('Duration not found...');
            }
            return {
                start: start,
                end: end,
                duration: end - start,
                percent: Math.min((this.getClockTime() - start) / duration, 1)
            };
        };
        CanvasInstance.prototype._drawWaveform = function () {
            this._renderWaveform();
            //if (!this._waveformCtx || !this._waveformNeedsRedraw) return;
            if (!this._waveformCtx || !this.isVisible())
                return;
            var _a = this.getRangeTiming(), start = _a.start, end = _a.end, percent = _a.percent;
            var startpx = start * this._compositeWaveform.pixelsPerSecond;
            var endpx = end * this._compositeWaveform.pixelsPerSecond;
            var canvasWidth = this._waveformCtx.canvas.width;
            var canvasHeight = this._waveformCtx.canvas.height;
            var barSpacing = this._data.waveformBarSpacing;
            var barWidth = this._data.waveformBarWidth;
            var increment = Math.floor(((endpx - startpx) / canvasWidth) * barSpacing);
            var sampleSpacing = (canvasWidth / barSpacing);
            this._waveformCtx.clearRect(0, 0, canvasWidth, canvasHeight);
            this._waveformCtx.fillStyle = this._data.waveformColor;
            var inc = canvasWidth / (end - start);
            var listOfBuffers = [];
            if (this._contentAnnotations) {
                for (var i = 0; i < this._contentAnnotations.length; i++) {
                    var contentAnnotation = this._contentAnnotations[i];
                    if (contentAnnotation && contentAnnotation.element) {
                        var element = contentAnnotation.element[0];
                        var annoStart = contentAnnotation.startOffest || 0;
                        var active = contentAnnotation.active;
                        if (active) {
                            for (var i_2 = 0; i_2 < element.buffered.length; i_2++) {
                                var reverse = element.buffered.length - i_2 - 1;
                                var startX = element.buffered.start(reverse);
                                var endX = element.buffered.end(reverse);
                                listOfBuffers.push([
                                    (((annoStart + startX) - start) * inc),
                                    (((annoStart + endX) - start) * inc),
                                ]);
                            }
                        }
                    }
                }
            }
            var newList = [];
            if (this.isVirtual() && AVComponent.newRanges) {
                var plan = this.timePlanPlayer.plan;
                var compositeCanvas = this._data.canvas;
                for (var _i = 0, _b = plan.stops; _i < _b.length; _i++) {
                    var stop_5 = _b[_i];
                    var map = compositeCanvas.durationMap[plan.canvases[stop_5.canvasIndex]];
                    var canvasEndTime = map.runningDuration;
                    var canvasStartTime = canvasEndTime - map.duration;
                    // Start percentage.
                    // End percentage.
                    newList.push({
                        start: (stop_5.start - plan.start) / plan.duration,
                        end: (stop_5.end - plan.start) / plan.duration,
                        duration: stop_5.duration,
                        startTime: canvasStartTime + stop_5.canvasTime.start,
                        endTime: canvasStartTime + stop_5.canvasTime.start + stop_5.canvasTime.end,
                    });
                }
            }
            else {
                newList.push({ start: 0, duration: end - start, end: end, startTime: start });
            }
            // console.log('new list', newList);
            var current = 0;
            for (var x = startpx; x < endpx; x += increment) {
                var rangePercentage = AVComponentUtils.normalise(x, startpx, endpx);
                var xpos = rangePercentage * canvasWidth;
                if (newList[current].end < rangePercentage) {
                    current++;
                }
                var section = newList[current];
                // range percent 0..1
                // section.start = 1.73
                // section.duration = 1806
                // section.startTime = 1382
                // section.endTime = 5003
                //
                // What I need
                // - time in seconds for the current increment
                // startTime + (0) - the first will always be the start time.
                // startTime + ( rangePercentage *  )
                var partPercent = (rangePercentage - section.start);
                var toSample = Math.floor((section.startTime + (partPercent * (section.duration))) * this._compositeWaveform.pixelsPerSecond);
                // console.log('sample seconds -> ', { sample: toSample/60, partPercent, rangePercentage })
                var maxMin = this._getWaveformMaxAndMin(this._compositeWaveform, toSample, sampleSpacing);
                var height = this._scaleY(maxMin.max - maxMin.min, canvasHeight);
                var pastCurrentTime = (xpos / canvasWidth) < percent;
                var hoverWidth = this.waveformDeltaX / canvasWidth;
                var colour = this._data.waveformColor;
                var ypos = (canvasHeight - height) / 2;
                if (pastCurrentTime) {
                    if (this.waveformDeltaX === 0) {
                        // ======o_____
                        //   ^ this colour, no hover
                        colour = '#14A4C3';
                    }
                    else if (xpos / canvasWidth < hoverWidth) {
                        // ======T---o_____
                        //    ^ this colour
                        colour = '#11758e'; // dark
                    }
                    else {
                        // ======T---o_____
                        //         ^ this colour
                        colour = '#14A4C3'; // normal
                    }
                }
                else if (xpos / canvasWidth < hoverWidth) {
                    // ======o-------T_____
                    //           ^ this colour
                    colour = '#86b3c3'; // lighter
                }
                else {
                    colour = '#8a9aa1';
                    for (var _c = 0, listOfBuffers_1 = listOfBuffers; _c < listOfBuffers_1.length; _c++) {
                        var _d = listOfBuffers_1[_c], a = _d[0], b = _d[1];
                        if (xpos > a && xpos < b) {
                            colour = '#fff';
                            break;
                        }
                    }
                }
                this._waveformCtx.fillStyle = colour;
                this._waveformCtx.fillRect(xpos, ypos, barWidth, height | 0);
            }
            return;
            //
            //
            //             // let i = 0;
            //             for (const [innerStartPx, innerEndPx, innerIncr, sectionWidth, offsetX] of startEndList) {
            //                 for (let x = innerStartPx; x < innerEndPx; x += innerIncr) {
            //                     const maxMin = this._getWaveformMaxAndMin(this._compositeWaveform, x, sampleSpacing);
            //                     const height = this._scaleY(maxMin.max - maxMin.min, canvasHeight);
            //                     const ypos = (canvasHeight - height) / 2;
            //                     const xpos = offsetX + (sectionWidth * AVComponentUtils.normalise(x, innerStartPx, innerEndPx));
            //                     const pastCurrentTime = xpos / canvasWidth < percent;
            //                     const hoverWidth = this.waveformDeltaX / canvasWidth;
            //                     let colour = <string>this._data.waveformColor;
            //  
            //                     // colour = ['#fff', 'red'][i % 2];
            //
            //                     // For colours.
            //                     // ======o-------T_____
            //                     //       ^ current time
            //                     // ======o-------T_____
            //                     //               ^ cursor
            //                     //
            //                     if (pastCurrentTime) {
            //                         if (this.waveformDeltaX === 0) {
            //                             // ======o_____
            //                             //   ^ this colour, no hover
            //                             colour = '#14A4C3';
            //                         } else if (xpos / canvasWidth < hoverWidth) {
            //                             // ======T---o_____
            //                             //    ^ this colour
            //                             colour = '#11758e'; // dark
            //                         } else {
            //                             // ======T---o_____
            //                             //         ^ this colour
            //                             colour = '#14A4C3'; // normal
            //                         }
            //                     } else if (xpos / canvasWidth < hoverWidth) {
            //                         // ======o-------T_____
            //                         //           ^ this colour
            //                         colour = '#86b3c3'; // lighter
            //                     } else {
            //                         colour = '#8a9aa1';
            //                         for (const [a, b] of listOfBuffers) {
            //                             if (xpos > a && xpos < b) {
            //                                 colour = '#fff';
            //                                 break;
            //                             }
            //                         }
            //                     }
            //
            //                     this._waveformCtx.fillStyle = colour;
            //                     this._waveformCtx.fillRect(xpos, ypos, barWidth, height | 0);
            //                 }
            //                 // i++;
            //             }
        };
        CanvasInstance.prototype._getWaveformMaxAndMin = function (waveform, index, sampleSpacing) {
            var max = -127;
            var min = 128;
            for (var x = index; x < index + sampleSpacing; x++) {
                var wMax = waveform.max(x);
                var wMin = waveform.min(x);
                if (wMax > max) {
                    max = wMax;
                }
                if (wMin < min) {
                    min = wMin;
                }
            }
            return { max: max, min: min };
        };
        CanvasInstance.prototype.isLimitedToRange = function () {
            return this._data.limitToRange;
        };
        CanvasInstance.prototype.hasCurrentRange = function () {
            return !!this._data.range;
        };
        CanvasInstance.prototype._updateCurrentTimeDisplay = function () {
            if (AVComponent.newRanges && this.isVirtual()) {
                this._$canvasTime.text(AVComponentUtils.formatTime(this._canvasClockTime - this.timePlanPlayer.getStartTime()));
                return;
            }
            var duration;
            if (this._data.range) {
                duration = this._data.range.getDuration();
            }
            if (this._data.limitToRange && duration) {
                var rangeClockTime = this._canvasClockTime - duration.start;
                this._$canvasTime.text(AVComponentUtils.formatTime(rangeClockTime));
            }
            else {
                this._$canvasTime.text(AVComponentUtils.formatTime(this._canvasClockTime));
            }
        };
        CanvasInstance.prototype._updateDurationDisplay = function () {
            if (AVComponent.newRanges && this.isVirtual()) {
                this._$canvasDuration.text(AVComponentUtils.formatTime(this.timePlanPlayer.getDuration()));
                return;
            }
            var duration;
            if (this._data.range) {
                duration = this._data.range.getDuration();
            }
            if (this._data.limitToRange && duration) {
                this._$canvasDuration.text(AVComponentUtils.formatTime(duration.getLength()));
            }
            else {
                this._$canvasDuration.text(AVComponentUtils.formatTime(this._getDuration()));
            }
        };
        CanvasInstance.prototype._renderSyncIndicator = function (mediaElementData) {
            if (AVComponent.newRanges && this.isVirtual()) {
                console.log('_renderSyncIndicator');
                return;
            }
            var leftPercent = this._convertToPercentage(mediaElementData.start, this._getDuration());
            var widthPercent = this._convertToPercentage(mediaElementData.end - mediaElementData.start, this._getDuration());
            var $timelineItem = $('<div class="timeline-item"></div>');
            $timelineItem.css({
                left: leftPercent + '%',
                width: widthPercent + '%'
            });
            var $lineWrapper = $('<div class="line-wrapper"></div>');
            $timelineItem.appendTo($lineWrapper);
            mediaElementData.timelineElement = $timelineItem;
            if (this.$playerElement) {
                this._$timelineItemContainer.append($lineWrapper);
            }
        };
        CanvasInstance.prototype.setCurrentTime = function (seconds) {
            console.log('External set current time?');
            return this._setCurrentTime(seconds, false);
        };
        CanvasInstance.prototype._setCurrentTime = function (seconds, setRange) {
            if (setRange === void 0) { setRange = true; }
            return __awaiter(this, void 0, void 0, function () {
                var _a, start, end;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(AVComponent.newRanges && this.isVirtual())) return [3 /*break*/, 2];
                            this._buffering = true;
                            return [4 /*yield*/, this.timePlanPlayer.setTime(seconds, setRange)];
                        case 1:
                            _b.sent();
                            this._buffering = false;
                            this._canvasClockStartDate = Date.now() - (this._canvasClockTime * 1000);
                            this._canvasClockUpdater();
                            this._highPriorityUpdater();
                            this._lowPriorityUpdater();
                            this._synchronizeMedia();
                            return [2 /*return*/];
                        case 2:
                            _a = this.getRangeTiming(), start = _a.start, end = _a.end;
                            if (seconds < start || start > end) {
                                return [2 /*return*/];
                            }
                            this._canvasClockTime = seconds; //secondsAsFloat;
                            this._canvasClockStartDate = Date.now() - (this._canvasClockTime * 1000);
                            this.logMessage('SET CURRENT TIME to: ' + this._canvasClockTime + ' seconds.');
                            this._canvasClockUpdater();
                            this._highPriorityUpdater();
                            this._lowPriorityUpdater();
                            this._synchronizeMedia();
                            return [2 /*return*/];
                    }
                });
            });
        };
        CanvasInstance.prototype._rewind = function (withoutUpdate) {
            if (AVComponent.newRanges && this.isVirtual()) {
                console.log('Rewind');
                return;
            }
            this.pause();
            var duration;
            if (this._data.range) {
                duration = this._data.range.getDuration();
            }
            if (this._data.limitToRange && duration) {
                this._setCurrentTime(duration.start);
            }
            else {
                this._setCurrentTime(0);
            }
            if (!this._data.limitToRange) {
                if (this._data && this._data.helper) {
                    this.set({
                        range: undefined
                    });
                }
            }
        };
        CanvasInstance.prototype._fastforward = function () {
            if (AVComponent.newRanges && this.isVirtual()) {
                console.log('Fast forward');
                return;
            }
            var duration;
            if (this._data.range) {
                duration = this._data.range.getDuration();
            }
            if (this._data.limitToRange && duration) {
                this._canvasClockTime = duration.end;
            }
            else {
                this._canvasClockTime = this._getDuration();
            }
            this.pause();
        };
        // todo: can this be part of the _data state?
        // this._data.play = true?
        CanvasInstance.prototype.play = function (withoutUpdate) {
            return __awaiter(this, void 0, void 0, function () {
                var duration, label;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (this._isPlaying)
                                return [2 /*return*/];
                            if (!(AVComponent.newRanges && this.isVirtual())) return [3 /*break*/, 3];
                            if (!this.timePlanPlayer.hasEnded()) return [3 /*break*/, 2];
                            this._buffering = true;
                            return [4 /*yield*/, this.timePlanPlayer.setTime(this.timePlanPlayer.currentStop.start)];
                        case 1:
                            _a.sent();
                            this._buffering = false;
                            _a.label = 2;
                        case 2:
                            this.timePlanPlayer.play();
                            return [3 /*break*/, 4];
                        case 3:
                            duration = void 0;
                            if (this._data.range) {
                                duration = this._data.range.getDuration();
                            }
                            if (this._data.limitToRange && duration && this._canvasClockTime >= duration.end) {
                                this._canvasClockTime = duration.start;
                            }
                            if (this._canvasClockTime === this._getDuration()) {
                                this._canvasClockTime = 0;
                            }
                            _a.label = 4;
                        case 4:
                            this._canvasClockStartDate = Date.now() - (this._canvasClockTime * 1000);
                            if (this._highPriorityInterval) {
                                clearInterval(this._highPriorityInterval);
                            }
                            this._highPriorityInterval = window.setInterval(function () {
                                _this._highPriorityUpdater();
                            }, this._highPriorityFrequency);
                            if (this._lowPriorityInterval) {
                                clearInterval(this._lowPriorityInterval);
                            }
                            this._lowPriorityInterval = window.setInterval(function () {
                                _this._lowPriorityUpdater();
                            }, this._lowPriorityFrequency);
                            if (this._canvasClockInterval) {
                                clearInterval(this._canvasClockInterval);
                            }
                            this._canvasClockInterval = window.setInterval(function () {
                                _this._canvasClockUpdater();
                            }, this._canvasClockFrequency);
                            this._isPlaying = true;
                            if (!withoutUpdate) {
                                this._synchronizeMedia();
                            }
                            label = (this._data && this._data.content) ? this._data.content.pause : '';
                            this._$playButton.prop('title', label);
                            this._$playButton.find('i').switchClass('play', 'pause');
                            this.fire(CanvasInstanceEvents.PLAYCANVAS);
                            this.logMessage('PLAY canvas');
                            return [2 /*return*/];
                    }
                });
            });
        };
        // todo: can this be part of the _data state?
        // this._data.play = false?
        CanvasInstance.prototype.pause = function (withoutUpdate) {
            window.clearInterval(this._highPriorityInterval);
            window.clearInterval(this._lowPriorityInterval);
            window.clearInterval(this._canvasClockInterval);
            this._isPlaying = false;
            if (!withoutUpdate) {
                this._highPriorityUpdater();
                this._lowPriorityUpdater();
                this._synchronizeMedia();
            }
            if (AVComponent.newRanges && this.isVirtual()) {
                this.timePlanPlayer.pause();
            }
            var label = (this._data && this._data.content) ? this._data.content.play : '';
            this._$playButton.prop('title', label);
            this._$playButton.find('i').switchClass('pause', 'play');
            this.fire(CanvasInstanceEvents.PAUSECANVAS);
            this.logMessage('PAUSE canvas');
        };
        CanvasInstance.prototype._isNavigationConstrainedToRange = function () {
            return this._data.constrainNavigationToRange;
        };
        CanvasInstance.prototype._canvasClockUpdater = function () {
            if (AVComponent.newRanges && this.isVirtual()) {
                if (this._buffering) {
                    return;
                }
                var paused = this.timePlanPlayer.advanceToTime((Date.now() - this._canvasClockStartDate) / 1000).paused;
                if (paused) {
                    this.pause();
                }
                // console.log('_canvasClockUpdater');
                return;
            }
            if (this._buffering) {
                return;
            }
            this._canvasClockTime = (Date.now() - this._canvasClockStartDate) / 1000;
            var duration;
            if (this._data.range) {
                duration = this._data.range.getDuration();
            }
            if (this._data.limitToRange && duration && this._canvasClockTime >= duration.end) {
                this.pause();
            }
            if (this._canvasClockTime >= this._getDuration()) {
                this._canvasClockTime = this._getDuration();
                this.pause();
            }
        };
        CanvasInstance.prototype._highPriorityUpdater = function () {
            if (this._bufferShown && !this._buffering) {
                this.$playerElement.removeClass('player--loading');
                this._bufferShown = false;
            }
            if (this._buffering && !this._bufferShown) {
                this.$playerElement.addClass('player--loading');
                this._bufferShown = true;
            }
            if (AVComponent.newRanges && this.isVirtual()) {
                this._$rangeTimelineContainer.slider({
                    value: this._canvasClockTime - this.timePlanPlayer.plan.start,
                });
                this._$canvasTimelineContainer.slider({
                    value: this._canvasClockTime - this.timePlanPlayer.plan.start,
                });
            }
            else {
                this._$rangeTimelineContainer.slider({
                    value: this._canvasClockTime
                });
                this._$canvasTimelineContainer.slider({
                    value: this._canvasClockTime
                });
            }
            this._updateCurrentTimeDisplay();
            this._updateDurationDisplay();
            this._drawWaveform();
        };
        CanvasInstance.prototype._lowPriorityUpdater = function () {
            this._updateMediaActiveStates();
            if ( /*this._isPlaying && */this._data.autoSelectRange && (this.isVirtual() || this.isOnlyCanvasInstance)) {
                this._hasRangeChanged();
            }
        };
        CanvasInstance.prototype._updateMediaActiveStates = function () {
            if (AVComponent.newRanges && this.isVirtual()) {
                if (this._isPlaying) {
                    if (this.timePlanPlayer.isBuffering()) {
                        this._buffering = true;
                        return;
                    }
                    else if (this._buffering) {
                        this._buffering = false;
                    }
                    this.timePlanPlayer.advanceToTime(this._canvasClockTime);
                }
                return;
            }
            var contentAnnotation;
            for (var i = 0; i < this._contentAnnotations.length; i++) {
                contentAnnotation = this._contentAnnotations[i];
                if (contentAnnotation.start <= this._canvasClockTime && contentAnnotation.end >= this._canvasClockTime) {
                    this._checkMediaSynchronization();
                    if (!contentAnnotation.active) {
                        this._synchronizeMedia();
                        contentAnnotation.active = true;
                        contentAnnotation.element.show();
                        contentAnnotation.timelineElement.addClass('active');
                    }
                    if (contentAnnotation.element[0].currentTime > contentAnnotation.element[0].duration - contentAnnotation.endOffset) {
                        this._pauseMedia(contentAnnotation.element[0]);
                    }
                }
                else {
                    if (contentAnnotation.active) {
                        contentAnnotation.active = false;
                        contentAnnotation.element.hide();
                        contentAnnotation.timelineElement.removeClass('active');
                        this._pauseMedia(contentAnnotation.element[0]);
                    }
                }
            }
            //this.logMessage('UPDATE MEDIA ACTIVE STATES at: '+ this._canvasClockTime + ' seconds.');
        };
        CanvasInstance.prototype._pauseMedia = function (media) {
            media.pause();
            // const playPromise = media.play();
            // if (playPromise !== undefined) {
            //     playPromise.then(_ => {
            //         // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted
            //         media.pause();
            //     });
            // } else {
            //     media.pause();
            // }
        };
        CanvasInstance.prototype._setMediaCurrentTime = function (media, time) {
            if (!isNaN(media.duration)) {
                media.currentTime = time;
            }
        };
        CanvasInstance.prototype._synchronizeMedia = function () {
            if (AVComponent.newRanges && this.isVirtual()) {
                // console.log('_synchronizeMedia', this.timePlanPlayer.isBuffering());
                return;
            }
            var contentAnnotation;
            for (var i = 0; i < this._contentAnnotations.length; i++) {
                contentAnnotation = this._contentAnnotations[i];
                this._setMediaCurrentTime(contentAnnotation.element[0], this._canvasClockTime - contentAnnotation.start + contentAnnotation.startOffset);
                if (contentAnnotation.start <= this._canvasClockTime && contentAnnotation.end >= this._canvasClockTime) {
                    if (this._isPlaying) {
                        if (contentAnnotation.element[0].paused) {
                            var promise = contentAnnotation.element[0].play();
                            if (promise) {
                                promise.catch(function () { });
                            }
                        }
                    }
                    else {
                        this._pauseMedia(contentAnnotation.element[0]);
                    }
                }
                else {
                    this._pauseMedia(contentAnnotation.element[0]);
                }
                if (contentAnnotation.element[0].currentTime > contentAnnotation.element[0].duration - contentAnnotation.endOffset) {
                    this._pauseMedia(contentAnnotation.element[0]);
                }
            }
            this.logMessage('SYNC MEDIA at: ' + this._canvasClockTime + ' seconds.');
        };
        CanvasInstance.prototype._checkMediaSynchronization = function () {
            if (AVComponent.newRanges && this.isVirtual()) {
                if (this._isPlaying) {
                    if (this.timePlanPlayer.isBuffering()) {
                        this._buffering = true;
                    }
                    else if (this._buffering) {
                        this._buffering = false;
                    }
                }
                return;
            }
            var contentAnnotation;
            for (var i = 0, l = this._contentAnnotations.length; i < l; i++) {
                contentAnnotation = this._contentAnnotations[i];
                if ((contentAnnotation.start <= this._canvasClockTime && contentAnnotation.end >= this._canvasClockTime)) {
                    if (this._isPlaying) {
                        if (contentAnnotation.element[0].readyState < 3) {
                            this._buffering = true;
                        }
                        else if (this._buffering) {
                            this._buffering = false;
                        }
                    }
                    var correctTime = (this._canvasClockTime - contentAnnotation.start + contentAnnotation.startOffset);
                    var factualTime = contentAnnotation.element[0].currentTime;
                    // off by 0.2 seconds
                    if (Math.abs(factualTime - correctTime) > this._mediaSyncMarginSecs) {
                        contentAnnotation.outOfSync = true;
                        //this.playbackStalled(true, contentAnnotation);
                        var lag = Math.abs(factualTime - correctTime);
                        this.logMessage('DETECTED synchronization lag: ' + Math.abs(lag));
                        this._setMediaCurrentTime(contentAnnotation.element[0], correctTime);
                        //this.synchronizeMedia();
                    }
                    else {
                        contentAnnotation.outOfSync = false;
                        //this.playbackStalled(false, contentAnnotation);
                    }
                }
            }
        };
        CanvasInstance.prototype._playbackStalled = function (aBoolean, syncMediaRequestingStall) {
            if (aBoolean) {
                if (this._stallRequestedBy.indexOf(syncMediaRequestingStall) < 0) {
                    this._stallRequestedBy.push(syncMediaRequestingStall);
                }
                if (!this._isStalled) {
                    if (this.$playerElement) {
                        //this._showWorkingIndicator(this._$canvasContainer);
                    }
                    this._wasPlaying = this._isPlaying;
                    this.pause(true);
                    this._isStalled = aBoolean;
                }
            }
            else {
                var idx = this._stallRequestedBy.indexOf(syncMediaRequestingStall);
                if (idx >= 0) {
                    this._stallRequestedBy.splice(idx, 1);
                }
                if (this._stallRequestedBy.length === 0) {
                    //this._hideWorkingIndicator();
                    if (this._isStalled && this._wasPlaying) {
                        this.play(true);
                    }
                    this._isStalled = aBoolean;
                }
            }
        };
        CanvasInstance.prototype.resize = function () {
            if (this.$playerElement) {
                var containerWidth = this._$canvasContainer.width();
                if (containerWidth) {
                    this._$canvasTimelineContainer.width(containerWidth);
                    //const resizeFactorY: number = containerWidth / this.canvasWidth;
                    //$canvasContainer.height(this.canvasHeight * resizeFactorY);
                    var $options = this.$playerElement.find('.options-container');
                    // if in the watch metric, make sure the canvasContainer isn't more than half the height to allow
                    // room between buttons
                    if (this._data.halveAtWidth !== undefined && this.$playerElement.parent().width() < this._data.halveAtWidth) {
                        this._$canvasContainer.height(this.$playerElement.parent().height() / 2);
                    }
                    else {
                        this._$canvasContainer.height(this.$playerElement.parent().height() - $options.height());
                    }
                }
                if (this._waveformCanvas) {
                    var canvasWidth = this._$canvasContainer.width();
                    var canvasHeight = this._$canvasContainer.height();
                    this._waveformCanvas.width = canvasWidth;
                    this._waveformCanvas.height = canvasHeight;
                    this.waveformPageX = this._waveformCanvas.getBoundingClientRect().left;
                }
                this._render();
                this._drawWaveform();
            }
        };
        return CanvasInstance;
    }(_Components.BaseComponent));
    IIIFComponents.CanvasInstance = CanvasInstance;
    var CanvasInstanceEvents = /** @class */ (function () {
        function CanvasInstanceEvents() {
        }
        CanvasInstanceEvents.NEXT_RANGE = 'nextrange';
        CanvasInstanceEvents.PAUSECANVAS = 'pause';
        CanvasInstanceEvents.PLAYCANVAS = 'play';
        CanvasInstanceEvents.PREVIOUS_RANGE = 'previousrange';
        return CanvasInstanceEvents;
    }());
    IIIFComponents.CanvasInstanceEvents = CanvasInstanceEvents;
    var CompositeWaveform = /** @class */ (function () {
        function CompositeWaveform(waveforms) {
            var _this = this;
            this.length = 0;
            this.duration = 0;
            this.pixelsPerSecond = Number.MAX_VALUE;
            this.secondsPerPixel = Number.MAX_VALUE;
            this.timeIndex = {};
            this.minIndex = {};
            this.maxIndex = {};
            this._waveforms = [];
            waveforms.forEach(function (waveform) {
                _this._waveforms.push({
                    start: _this.length,
                    end: _this.length + waveform.adapter.length,
                    waveform: waveform
                });
                _this.length += waveform.adapter.length;
                _this.duration += waveform.duration;
                _this.pixelsPerSecond = Math.min(_this.pixelsPerSecond, waveform.pixels_per_second);
                _this.secondsPerPixel = Math.min(_this.secondsPerPixel, waveform.seconds_per_pixel);
            });
        }
        // Note: these could be optimised, assuming access is sequential
        CompositeWaveform.prototype.min = function (index) {
            if (typeof this.minIndex[index] === 'undefined') {
                var waveform = this._find(index);
                this.minIndex[index] = waveform ? waveform.waveform.min_sample(index - waveform.start) : 0;
            }
            return this.minIndex[index];
        };
        CompositeWaveform.prototype.max = function (index) {
            if (typeof this.maxIndex[index] === 'undefined') {
                var waveform = this._find(index);
                this.maxIndex[index] = waveform ? waveform.waveform.max_sample(index - waveform.start) : 0;
            }
            return this.maxIndex[index];
        };
        CompositeWaveform.prototype._find = function (index) {
            if (typeof this.timeIndex[index] === 'undefined') {
                var waveform = this._waveforms.find(function (waveform) {
                    return index >= waveform.start && index < waveform.end;
                });
                if (!waveform) {
                    return null;
                }
                this.timeIndex[index] = waveform;
            }
            return this.timeIndex[index];
        };
        return CompositeWaveform;
    }());
    IIIFComponents.CompositeWaveform = CompositeWaveform;
    var AVComponentUtils = /** @class */ (function () {
        function AVComponentUtils() {
        }
        AVComponentUtils._compare = function (a, b) {
            var changed = [];
            Object.keys(a).forEach(function (p) {
                if (!Object.is(b[p], a[p])) {
                    changed.push(p);
                }
            });
            return changed;
        };
        AVComponentUtils.diff = function (a, b) {
            return Array.from(new Set(AVComponentUtils._compare(a, b).concat(AVComponentUtils._compare(b, a))));
        };
        AVComponentUtils.getSpatialComponent = function (target) {
            var spatial = /xywh=([^&]+)/g.exec(target);
            var xywh = null;
            if (spatial && spatial[1]) {
                xywh = spatial[1].split(',');
            }
            return xywh;
        };
        AVComponentUtils.getFirstTargetedCanvasId = function (range) {
            var canvasId;
            if (range.canvases && range.canvases.length) {
                canvasId = range.canvases[0];
            }
            else {
                var childRanges = range.getRanges();
                if (childRanges.length) {
                    return AVComponentUtils.getFirstTargetedCanvasId(childRanges[0]);
                }
            }
            if (canvasId !== undefined) {
                return Manifesto.Utils.normaliseUrl(canvasId);
            }
            return undefined;
        };
        AVComponentUtils.getTimestamp = function () {
            return String(new Date().valueOf());
        };
        AVComponentUtils.retargetTemporalComponent = function (canvases, target) {
            var t = Manifesto.Utils.getTemporalComponent(target);
            if (t) {
                var offset = 0;
                var targetWithoutTemporal = target.substr(0, target.indexOf('#'));
                // loop through canvases adding up their durations until we reach the targeted canvas
                for (var i = 0; i < canvases.length; i++) {
                    var canvas = canvases[i];
                    if (!canvas.id.includes(targetWithoutTemporal)) {
                        var duration = canvas.getDuration();
                        if (duration) {
                            offset += duration;
                        }
                    }
                    else {
                        // we've reached the canvas whose target we're adjusting
                        break;
                    }
                }
                t[0] = Number(t[0]) + offset;
                t[1] = Number(t[1]) + offset;
                return targetWithoutTemporal + '#t=' + t[0] + ',' + t[1];
            }
            return undefined;
        };
        AVComponentUtils.formatTime = function (aNumber) {
            var hours, minutes, seconds, hourValue;
            seconds = Math.ceil(aNumber);
            hours = Math.floor(seconds / (60 * 60));
            hours = (hours >= 10) ? hours : '0' + hours;
            minutes = Math.floor(seconds % (60 * 60) / 60);
            minutes = (minutes >= 10) ? minutes : '0' + minutes;
            seconds = Math.floor(seconds % (60 * 60) % 60);
            seconds = (seconds >= 10) ? seconds : '0' + seconds;
            if (hours >= 1) {
                hourValue = hours + ':';
            }
            else {
                hourValue = '';
            }
            return hourValue + minutes + ':' + seconds;
        };
        AVComponentUtils.isIE = function () {
            var ua = window.navigator.userAgent;
            // Test values; Uncomment to check result …
            // IE 10
            // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
            // IE 11
            // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
            // Edge 12 (Spartan)
            // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
            // Edge 13
            // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }
            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }
            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                // Edge (IE 12+) => return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }
            // other browser
            return false;
        };
        AVComponentUtils.isSafari = function () {
            // https://stackoverflow.com/questions/7944460/detect-safari-browser?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
            return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        };
        AVComponentUtils.debounce = function (fn, debounceDuration) {
            // summary:
            //      Returns a debounced function that will make sure the given
            //      function is not triggered too much.
            // fn: Function
            //      Function to debounce.
            // debounceDuration: Number
            //      OPTIONAL. The amount of time in milliseconds for which we
            //      will debounce the function. (defaults to 100ms)
            debounceDuration = debounceDuration || 100;
            return function () {
                if (!fn.debouncing) {
                    var args = Array.prototype.slice.apply(arguments);
                    fn.lastReturnVal = fn.apply(window, args);
                    fn.debouncing = true;
                }
                clearTimeout(fn.debounceTimeout);
                fn.debounceTimeout = setTimeout(function () {
                    fn.debouncing = false;
                }, debounceDuration);
                return fn.lastReturnVal;
            };
        };
        AVComponentUtils.normalise = function (num, min, max) {
            return (num - min) / (max - min);
        };
        AVComponentUtils.isHLSFormat = function (format) {
            return this.hlsMimeTypes.includes(format.toString());
        };
        AVComponentUtils.isMpegDashFormat = function (format) {
            return format.toString() === 'application/dash+xml';
        };
        AVComponentUtils.canPlayHls = function () {
            var doc = typeof document === 'object' && document, videoelem = doc && doc.createElement('video'), isvideosupport = Boolean(videoelem && videoelem.canPlayType);
            return isvideosupport && this.hlsMimeTypes.some(function (canItPlay) {
                return /maybe|probably/i.test(videoelem.canPlayType(canItPlay));
            });
        };
        AVComponentUtils.hlsMimeTypes = [
            // Apple santioned
            'application/vnd.apple.mpegurl',
            'vnd.apple.mpegurl',
            // Apple sanctioned for backwards compatibility
            'audio/mpegurl',
            // Very common
            'audio/x-mpegurl',
            // Very common
            'application/x-mpegurl',
            // Included for completeness
            'video/x-mpegurl',
            'video/mpegurl',
            'application/mpegurl'
        ];
        return AVComponentUtils;
    }());
    IIIFComponents.AVComponentUtils = AVComponentUtils;
    // @todo - change for time-slicing, or add new types of virtual canvas
    var VirtualCanvas = /** @class */ (function () {
        function VirtualCanvas() {
            this.canvases = [];
            this.durationMap = {};
            this.totalDuration = 0;
            // generate an id
            this.id = AVComponentUtils.getTimestamp();
        }
        VirtualCanvas.prototype.addCanvas = function (canvas) {
            // canvases need to be deep copied including functions
            this.canvases.push(jQuery.extend(true, {}, canvas));
            var duration = canvas.getDuration() || 0;
            this.totalDuration += duration;
            this.durationMap[canvas.id] = {
                duration: duration,
                runningDuration: this.totalDuration,
            };
        };
        VirtualCanvas.prototype.getContent = function () {
            var _this = this;
            var annotations = [];
            this.canvases.forEach(function (canvas) {
                var items = canvas.getContent();
                // if the annotations have no temporal target, add one so that
                // they specifically target the duration of their canvas
                items.forEach(function (item) {
                    var target = item.getTarget();
                    if (target) {
                        var t = Manifesto.Utils.getTemporalComponent(target);
                        if (!t) {
                            item.__jsonld.target += '#t=0,' + canvas.getDuration();
                        }
                    }
                });
                items.forEach(function (item) {
                    var target = item.getTarget();
                    if (target) {
                        item.__jsonld.target = AVComponentUtils.retargetTemporalComponent(_this.canvases, target);
                    }
                });
                annotations.push.apply(annotations, items);
            });
            return annotations;
        };
        VirtualCanvas.prototype.getDuration = function () {
            var duration = 0;
            this.canvases.forEach(function (canvas) {
                var d = canvas.getDuration();
                if (d) {
                    duration += d;
                }
            });
            return Math.floor(duration);
        };
        VirtualCanvas.prototype.getWidth = function () {
            if (this.canvases.length) {
                return this.canvases[0].getWidth();
            }
            return 0;
        };
        VirtualCanvas.prototype.getHeight = function () {
            if (this.canvases.length) {
                return this.canvases[0].getHeight();
            }
            return 0;
        };
        return VirtualCanvas;
    }());
    IIIFComponents.VirtualCanvas = VirtualCanvas;
    var Waveform = /** @class */ (function () {
        function Waveform() {
        }
        return Waveform;
    }());
    IIIFComponents.Waveform = Waveform;
    var AVComponent = /** @class */ (function (_super) {
        __extends(AVComponent, _super);
        function AVComponent(options) {
            var _this = _super.call(this, options) || this;
            _this._data = _this.data();
            _this.canvasInstances = [];
            _this._readyMedia = 0;
            _this._readyWaveforms = 0;
            _this._posterCanvasWidth = 0;
            _this._posterCanvasHeight = 0;
            _this._posterImageExpanded = false;
            _this._init();
            _this._resize();
            return _this;
        }
        AVComponent.prototype._init = function () {
            var success = _super.prototype._init.call(this);
            if (!success) {
                console.error("Component failed to initialise");
            }
            return success;
        };
        AVComponent.prototype.getCurrentCanvasInstance = function () {
            var range = this._data.helper.getRangeById(this._data.range.id);
            if (!range) {
                return null;
            }
            var canvasId = AVComponentUtils.getFirstTargetedCanvasId(range);
            return canvasId ? this._data.helper.getCanvasById(canvasId) : null;
        };
        AVComponent.prototype.data = function () {
            return {
                autoPlay: false,
                constrainNavigationToRange: false,
                defaultAspectRatio: 0.56,
                doubleClickMS: 350,
                halveAtWidth: 200,
                limitToRange: false,
                posterImageRatio: 0.3,
                virtualCanvasEnabled: true,
                content: {
                    currentTime: "Current Time",
                    collapse: "Collapse",
                    duration: "Duration",
                    expand: "Expand",
                    mute: "Mute",
                    next: "Next",
                    pause: "Pause",
                    play: "Play",
                    previous: "Previous",
                    unmute: "Unmute"
                },
                enableFastForward: true,
                enableFastRewind: true,
            };
        };
        AVComponent.prototype.set = function (data) {
            var _this = this;
            console.groupCollapsed('Setting AV Component');
            console.log('Data');
            var oldData = Object.assign({}, this._data);
            this._data = Object.assign(this._data, data);
            var diff = AVComponentUtils.diff(oldData, this._data);
            // changing any of these data properties forces a reload.
            if (diff.includes('helper')) {
                // create canvases
                this._reset();
            }
            if (!this._data.helper) {
                console.warn('must pass a helper object');
                return;
            }
            this.canvasInstances.forEach(function (canvasInstance, index) {
                var toSet = {};
                if (diff.includes('limitToRange') && _this._data.canvasId) {
                    toSet.limitToRange = _this._data.limitToRange;
                }
                if (diff.includes('constrainNavigationToRange') && _this._data.canvasId) {
                    toSet.constrainNavigationToRange = _this._data.constrainNavigationToRange;
                }
                if (diff.includes('autoSelectRange') && _this._data.canvasId) {
                    toSet.autoSelectRange = _this._data.autoSelectRange;
                }
                canvasInstance.set(toSet);
            });
            if ((diff.includes('virtualCanvasEnabled') || diff.includes('canvasId')) && this._data.canvasId) {
                var nextCanvasInstance_1 = this._getCanvasInstanceById(this._data.canvasId);
                if (nextCanvasInstance_1) {
                    this.canvasInstances.forEach(function (canvasInstance) {
                        // hide canvases that don't have the same id
                        if (canvasInstance.getCanvasId() !== nextCanvasInstance_1.getCanvasId()) {
                            canvasInstance.set({
                                visible: false
                            });
                        }
                        else {
                            if (diff.includes('range')) {
                                canvasInstance.set({
                                    visible: true,
                                    range: _this._data.range ? jQuery.extend(true, {}, _this._data.range) : undefined
                                });
                            }
                            else {
                                canvasInstance.set({
                                    visible: true
                                });
                            }
                        }
                    });
                }
            }
            if (diff.includes('virtualCanvasEnabled')) {
                this.set({
                    range: undefined
                });
                // as you don't know the id of virtual canvases, you can toggle them on
                // but when toggling off, you must call showCanvas to show the next canvas
                if (this._data.virtualCanvasEnabled) {
                    this.canvasInstances.forEach(function (canvasInstance) {
                        if (canvasInstance.isVirtual()) {
                            _this.set({
                                canvasId: canvasInstance.getCanvasId(),
                                range: undefined
                            });
                        }
                    });
                }
            }
            if (diff.includes('range') && this._data.range) {
                var range = this._data.helper.getRangeById(this._data.range.id);
                if (!range) {
                    console.warn('range not found');
                }
                else {
                    var canvasId = AVComponentUtils.getFirstTargetedCanvasId(range);
                    if (canvasId) {
                        // get canvas by normalised id (without temporal part)
                        var canvasInstance = this._getCanvasInstanceById(canvasId);
                        if (canvasInstance) {
                            if (canvasInstance.isVirtual() && this._data.virtualCanvasEnabled) {
                                if (canvasInstance.includesVirtualSubCanvas(canvasId)) {
                                    canvasId = canvasInstance.getCanvasId();
                                    // use the retargeted range
                                    for (var i = 0; i < canvasInstance.ranges.length; i++) {
                                        var r = canvasInstance.ranges[i];
                                        if (r.id === range.id) {
                                            range = r;
                                            break;
                                        }
                                    }
                                }
                            }
                            // if not using the correct canvasinstance, switch to it
                            if (this._data.canvasId &&
                                ((this._data.canvasId.includes('://')) ? Manifesto.Utils.normaliseUrl(this._data.canvasId) : this._data.canvasId) !== canvasId) {
                                this.set({
                                    canvasId: canvasId,
                                    range: jQuery.extend(true, {}, range) // force diff
                                });
                            }
                            else {
                                canvasInstance.set({
                                    range: jQuery.extend(true, {}, range)
                                });
                            }
                        }
                    }
                }
            }
            this._render();
            this._resize();
            console.groupEnd();
        };
        AVComponent.prototype._render = function () {
        };
        AVComponent.prototype.reset = function () {
            this._reset();
        };
        AVComponent.prototype._reset = function () {
            var _this = this;
            this._readyMedia = 0;
            this._readyWaveforms = 0;
            this._posterCanvasWidth = 0;
            this._posterCanvasHeight = 0;
            clearInterval(this._checkAllMediaReadyInterval);
            clearInterval(this._checkAllWaveformsReadyInterval);
            this.canvasInstances.forEach(function (canvasInstance) {
                canvasInstance.destroy();
            });
            this.canvasInstances = [];
            this._$element.empty();
            if (this._data && this._data.helper) {
                // if the manifest has an auto-advance behavior, join the canvases into a single "virtual" canvas
                var behavior = this._data.helper.manifest.getBehavior();
                var canvases = this._getCanvases();
                if (behavior && behavior.toString() === manifesto.Behavior.autoadvance().toString()) {
                    // @todo - use time-slices to create many virtual canvases with support for sliced canvases with start and end times.
                    var virtualCanvas_1 = new VirtualCanvas();
                    canvases.forEach(function (canvas) {
                        virtualCanvas_1.addCanvas(canvas);
                    });
                    this._initCanvas(virtualCanvas_1);
                }
                // all canvases need to be individually navigable
                canvases.forEach(function (canvas) {
                    _this._initCanvas(canvas);
                });
                if (this.canvasInstances.length > 0) {
                    this._data.canvasId = this.canvasInstances[0].getCanvasId();
                }
                this._checkAllMediaReadyInterval = setInterval(this._checkAllMediaReady.bind(this), 100);
                this._checkAllWaveformsReadyInterval = setInterval(this._checkAllWaveformsReady.bind(this), 100);
                this._$posterContainer = $('<div class="poster-container"></div>');
                this._$element.append(this._$posterContainer);
                this._$posterImage = $('<div class="poster-image"></div>');
                this._$posterExpandButton = $("\n                    <button class=\"btn\" title=\"" + (this._data && this._data.content ? this._data.content.expand : '') + "\">\n                        <i class=\"av-icon  av-icon-expand expand\" aria-hidden=\"true\"></i><span>" + (this._data && this._data.content ? this._data.content.expand : '') + "</span>\n                    </button>\n                ");
                this._$posterImage.append(this._$posterExpandButton);
                this._$posterImage.on('touchstart click', function (e) {
                    e.preventDefault();
                    var target = _this._getPosterImageCss(!_this._posterImageExpanded);
                    //this._$posterImage.animate(target,"fast", "easein");
                    _this._$posterImage.animate(target);
                    _this._posterImageExpanded = !_this._posterImageExpanded;
                    if (_this._data.content) {
                        if (_this._posterImageExpanded) {
                            var label = _this._data.content.collapse;
                            _this._$posterExpandButton.prop('title', label);
                            _this._$posterExpandButton.find('i').switchClass('expand', 'collapse');
                        }
                        else {
                            var label = _this._data.content.expand;
                            _this._$posterExpandButton.prop('title', label);
                            _this._$posterExpandButton.find('i').switchClass('collapse', 'expand');
                        }
                    }
                });
                // poster canvas
                var posterCanvas = this._data.helper.getPosterCanvas();
                if (posterCanvas) {
                    this._posterCanvasWidth = posterCanvas.getWidth();
                    this._posterCanvasHeight = posterCanvas.getHeight();
                    var posterImage = this._data.helper.getPosterImage();
                    if (posterImage) {
                        this._$posterContainer.append(this._$posterImage);
                        var css = this._getPosterImageCss(this._posterImageExpanded);
                        css = Object.assign({}, css, {
                            'background-image': 'url(' + posterImage + ')'
                        });
                        this._$posterImage.css(css);
                    }
                }
            }
        };
        AVComponent.prototype.setCurrentTime = function (time) {
            return __awaiter(this, void 0, void 0, function () {
                var canvas;
                return __generator(this, function (_a) {
                    canvas = this._getCurrentCanvas();
                    if (canvas) {
                        return [2 /*return*/, canvas.setCurrentTime(time)];
                    }
                    return [2 /*return*/];
                });
            });
        };
        AVComponent.prototype.getCurrentTime = function () {
            var canvas = this._getCurrentCanvas();
            if (canvas) {
                return canvas.getClockTime();
            }
            return 0;
        };
        AVComponent.prototype.isPlaying = function () {
            return this.canvasInstances.reduce(function (isPlaying, next) {
                return isPlaying || next.isPlaying();
            }, false);
        };
        AVComponent.prototype._checkAllMediaReady = function () {
            if (this._readyMedia === this.canvasInstances.length) {
                clearInterval(this._checkAllMediaReadyInterval);
                this.fire(AVComponent.Events.MEDIA_READY);
                this.resize();
            }
        };
        AVComponent.prototype._checkAllWaveformsReady = function () {
            if (this._readyWaveforms === this._getCanvasInstancesWithWaveforms().length) {
                clearInterval(this._checkAllWaveformsReadyInterval);
                this.fire(AVComponent.Events.WAVEFORMS_READY);
                this.resize();
            }
        };
        AVComponent.prototype._getCanvasInstancesWithWaveforms = function () {
            return this.canvasInstances.filter(function (c) {
                return c.waveforms.length > 0;
            });
        };
        AVComponent.prototype._getCanvases = function () {
            // @todo - figure out when this is used and if it needs time slicing considerations.
            if (this._data.helper) {
                return this._data.helper.getCanvases();
            }
            return [];
        };
        AVComponent.prototype._initCanvas = function (canvas) {
            // @todo - change these events for time-slicing
            var _this = this;
            var canvasInstance = new CanvasInstance({
                target: document.createElement('div'),
                data: Object.assign({}, { canvas: canvas }, this._data)
            });
            canvasInstance.logMessage = this._logMessage.bind(this);
            canvasInstance.isOnlyCanvasInstance = this._getCanvases().length === 1;
            this._$element.append(canvasInstance.$playerElement);
            canvasInstance.init();
            this.canvasInstances.push(canvasInstance);
            canvasInstance.on('play', function () {
                _this.fire(AVComponent.Events.PLAY, canvasInstance);
            }, false);
            canvasInstance.on('pause', function () {
                _this.fire(AVComponent.Events.PAUSE, canvasInstance);
            }, false);
            canvasInstance.on(AVComponent.Events.MEDIA_READY, function () {
                _this._readyMedia++;
                canvasInstance.loaded();
            }, false);
            canvasInstance.on(AVComponent.Events.WAVEFORM_READY, function () {
                _this._readyWaveforms++;
            }, false);
            // canvasInstance.on(AVComponent.Events.RESETCANVAS, () => {
            //     this.playCanvas(canvasInstance.canvas.id);
            // }, false);
            canvasInstance.on(CanvasInstanceEvents.PREVIOUS_RANGE, function () {
                _this._prevRange();
                _this.play();
            }, false);
            canvasInstance.on(CanvasInstanceEvents.NEXT_RANGE, function () {
                _this._nextRange();
                _this.play();
            }, false);
            canvasInstance.on(AVComponent.Events.RANGE_CHANGED, function (rangeId) {
                _this.fire(AVComponent.Events.RANGE_CHANGED, rangeId);
            }, false);
            canvasInstance.on(VolumeEvents.VOLUME_CHANGED, function (volume) {
                _this._setCanvasInstanceVolumes(volume);
                _this.fire(VolumeEvents.VOLUME_CHANGED, volume);
            }, false);
        };
        AVComponent.prototype.getCurrentRange = function () {
            // @todo - change for time-slicing
            var rangeId = this._data.helper.getCurrentRange().id;
            return this._getCurrentCanvas().ranges.find(function (range) {
                return range.id === rangeId;
            }) || null;
        };
        AVComponent.prototype._prevRange = function () {
            // @todo - change for time-slicing
            if (!this._data || !this._data.helper) {
                return;
            }
            var currentRange = this.getCurrentRange();
            if (currentRange) {
                var currentTime = this.getCurrentTime();
                var startTime = currentRange.getDuration().start || 0;
                // 5 = 5 seconds before going back to current range.
                if (currentTime - startTime > 5) {
                    this.setCurrentTime(startTime);
                    return;
                }
            }
            var prevRange = this._data.helper.getPreviousRange();
            if (prevRange) {
                this.playRange(prevRange.id);
            }
            else {
                // no previous range. rewind.
                this._rewind();
            }
        };
        AVComponent.prototype._nextRange = function () {
            // @todo - change for time-slicing
            if (!this._data || !this._data.helper) {
                return;
            }
            var nextRange = this._data.helper.getNextRange();
            if (nextRange) {
                this.playRange(nextRange.id);
            }
        };
        AVComponent.prototype._setCanvasInstanceVolumes = function (volume) {
            this.canvasInstances.forEach(function (canvasInstance) {
                canvasInstance.set({
                    volume: volume
                });
            });
        };
        AVComponent.prototype._getNormaliseCanvasId = function (canvasId) {
            return (canvasId.includes('://')) ? Manifesto.Utils.normaliseUrl(canvasId) : canvasId;
        };
        AVComponent.prototype._getCanvasInstanceById = function (canvasId) {
            // @todo - figure out when this is used and if it needs time slicing considerations.
            canvasId = this._getNormaliseCanvasId(canvasId);
            // if virtual canvas is enabled, check for that first
            if (this._data.virtualCanvasEnabled) {
                for (var i = 0; i < this.canvasInstances.length; i++) {
                    var canvasInstance = this.canvasInstances[i];
                    var currentCanvasId = canvasInstance.getCanvasId();
                    if (currentCanvasId) {
                        currentCanvasId = this._getNormaliseCanvasId(currentCanvasId);
                        if ((canvasInstance.isVirtual() || this.canvasInstances.length === 1) && currentCanvasId === canvasId ||
                            canvasInstance.includesVirtualSubCanvas(canvasId)) {
                            return canvasInstance;
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < this.canvasInstances.length; i++) {
                    var canvasInstance = this.canvasInstances[i];
                    var id = canvasInstance.getCanvasId();
                    if (id) {
                        var canvasInstanceId = Manifesto.Utils.normaliseUrl(id);
                        if (canvasInstanceId === canvasId) {
                            return canvasInstance;
                        }
                    }
                }
            }
            return undefined;
        };
        AVComponent.prototype._getCurrentCanvas = function () {
            // @todo - use time slices to get current virtual canvas
            if (this._data.canvasId) {
                return this._getCanvasInstanceById(this._data.canvasId);
            }
            return undefined;
        };
        AVComponent.prototype._rewind = function () {
            if (this._data.limitToRange) {
                return;
            }
            var canvasInstance = this._getCurrentCanvas();
            if (canvasInstance) {
                canvasInstance.set({
                    range: undefined
                });
            }
        };
        AVComponent.prototype.play = function () {
            var currentCanvas = this._getCurrentCanvas();
            if (currentCanvas) {
                currentCanvas.play();
            }
        };
        AVComponent.prototype.viewRange = function (rangeId) {
            var currentCanvas = this._getCurrentCanvas();
            if (currentCanvas) {
                currentCanvas.viewRange(rangeId);
            }
        };
        AVComponent.prototype.pause = function () {
            var currentCanvas = this._getCurrentCanvas();
            if (currentCanvas) {
                currentCanvas.pause();
            }
        };
        AVComponent.prototype.playRange = function (rangeId, autoChanged) {
            if (autoChanged === void 0) { autoChanged = false; }
            if (!this._data.helper) {
                return;
            }
            var range = this._data.helper.getRangeById(rangeId);
            if (range) {
                this.set({
                    range: jQuery.extend(true, { autoChanged: autoChanged }, range)
                });
            }
        };
        AVComponent.prototype.showCanvas = function (canvasId) {
            // @todo - change for time-slicing, see where it's used and probably not used it.
            // if the passed canvas id is already the current canvas id, but the canvas isn't visible
            // (switching from virtual canvas)
            var currentCanvas = this._getCurrentCanvas();
            if (this._data.virtualCanvasEnabled && currentCanvas && currentCanvas.getCanvasId() === canvasId && !currentCanvas.isVisible()) {
                currentCanvas.set({
                    visible: true
                });
            }
            else {
                this.set({
                    canvasId: canvasId
                });
            }
        };
        AVComponent.prototype._logMessage = function (message) {
            this.fire(AVComponent.Events.LOG, message);
        };
        AVComponent.prototype._getPosterImageCss = function (expanded) {
            var currentCanvas = this._getCurrentCanvas();
            if (currentCanvas) {
                var $options = currentCanvas.$playerElement.find('.options-container');
                var containerWidth = currentCanvas.$playerElement.parent().width();
                var containerHeight = currentCanvas.$playerElement.parent().height() - $options.height();
                if (expanded) {
                    return {
                        'top': 0,
                        'left': 0,
                        'width': containerWidth,
                        'height': containerHeight
                    };
                }
                else {
                    // get the longer edge of the poster canvas and make that a ratio of the container height/width.
                    // scale the shorter edge proportionally.
                    var ratio = void 0;
                    var width = void 0;
                    var height = void 0;
                    if (this._posterCanvasWidth > this._posterCanvasHeight) {
                        ratio = this._posterCanvasHeight / this._posterCanvasWidth;
                        width = containerWidth * this._data.posterImageRatio;
                        height = width * ratio;
                    }
                    else { // either height is greater, or width and height are equal
                        ratio = this._posterCanvasWidth / this._posterCanvasHeight;
                        height = containerHeight * this._data.posterImageRatio;
                        width = height * ratio;
                    }
                    return {
                        'top': 0,
                        'left': containerWidth - width,
                        'width': width,
                        'height': height
                    };
                }
            }
            return null;
        };
        AVComponent.prototype.resize = function () {
            this.canvasInstances.forEach(function (canvasInstance) {
                canvasInstance.resize();
            });
            // get the visible player and align the poster to it
            var currentCanvas = this._getCurrentCanvas();
            if (currentCanvas) {
                if (this._$posterImage && this._$posterImage.is(':visible')) {
                    if (this._posterImageExpanded) {
                        this._$posterImage.css(this._getPosterImageCss(true));
                    }
                    else {
                        this._$posterImage.css(this._getPosterImageCss(false));
                    }
                    // this._$posterExpandButton.css({
                    //     top: <number>this._$posterImage.height() - <number>this._$posterExpandButton.outerHeight()
                    // });
                }
            }
        };
        AVComponent.newRanges = true;
        return AVComponent;
    }(_Components.BaseComponent));
    IIIFComponents.AVComponent = AVComponent;
})(IIIFComponents || (IIIFComponents = {}));
(function (IIIFComponents) {
    var AVComponent;
    (function (AVComponent) {
        var Events = /** @class */ (function () {
            function Events() {
            }
            Events.PLAY = 'play';
            Events.PAUSE = 'pause';
            Events.MEDIA_READY = 'mediaready';
            Events.LOG = 'log';
            Events.RANGE_CHANGED = 'rangechanged';
            Events.WAVEFORM_READY = 'waveformready';
            Events.WAVEFORMS_READY = 'waveformsready';
            return Events;
        }());
        AVComponent.Events = Events;
    })(AVComponent = IIIFComponents.AVComponent || (IIIFComponents.AVComponent = {}));
})(IIIFComponents || (IIIFComponents = {}));
(function (g) {
    if (!g.IIIFComponents) {
        g.IIIFComponents = IIIFComponents;
    }
    else {
        g.IIIFComponents.AVComponent = IIIFComponents.AVComponent;
    }
})(window);
