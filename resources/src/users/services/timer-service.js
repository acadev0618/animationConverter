export default class {
    constructor(duration = 3000, delay = 0) {
        this.duration = duration;
        this.delay = delay;
        this.timeFlag = false;
        this.flagSeek = false;
        this.state = 'initial';
        this.beginCallback = () => {};
        this.callbackAt = [];
    }
    timeSeek() {
        if (this.timeFlag === false) {
            return this.flagSeek - this.delay;
        } else {
            return this.flagSeek + new Date().getTime() - this.timeFlag - this.delay;
        }
    }
    play() {
        this.state = 'play';
        this.beginCallback();
        this.timeFlag = new Date().getTime();
        this.flagSeek = 0;
        this.callbackAt.forEach(cb => {
            cb.timeOut = setTimeout(() => {
                cb.fn();
            }, cb.at + this.delay);
        });
    }
    pause() {
        this.flagSeek = this.flagSeek + new Date().getTime() - this.timeFlag;
        this.timeFlag = false;
        this.state = 'pause';
        this.callbackAt.forEach(cb => {
            clearTimeout(cb.timeOut);
        });
    }
    resume() {
        this.timeFlag = new Date().getTime();
        this.state = 'play';
        this.callbackAt.forEach(cb => {
            if (cb.at - this.timeSeek() > 10) {
                cb.timeOut = setTimeout(() => {
                    cb.fn();
                }, cb.at - this.timeSeek());
            }
        });
    }
    stop() {
        this.timeFlag = false;
        this.flagSeek = false;
        this.callbackAt.forEach(cb => {
            if (cb.timeOut) {
                clearTimeout(cb.timeOut);
            }
        });
        this.state = 'initial';
    }
    gotoAndPause(ms) {
        this.flagSeek = ms;
        this.timeFlag = new Date().getTime();
        this.pause();
    }
    afterEnd(fn) {
        this.applyAt(this.duration, fn);
    }
    atBegin(fn) {
        this.beginCallback = fn;
    }
    applyAt(at, fn) {
        let cb = {
            at: at,
            fn: fn
        };
        if (this.state === 'play') {
            if (at - this.timeSeek() >= 0) {
                cb.timeOut = setTimeout(() => {
                    fn();
                }, at - this.timeSeek());
            }
        }
        this.callbackAt.push(cb);
    }
    applyAfter(after, fn) {
        let cb = {
            at: after + this.timeSeek(),
            fn: fn
        };
        if (this.state === 'play') {
            cb.timeOut = setTimeout(() => {
                fn();
            }, after);
        }
        this.callbackAt.push(cb);
    }
    emptyCallback() {
        this.callbackAt.forEach(cb => {
            if (cb.timeOut) {
                clearTimeout(cb.timeOut);
            }
        });
        this.beginCallback = () => {};
        this.callbackAt = [];
    }
}
