(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./node_modules/nosleep.js/src/index.js":
/*!**********************************************!*\
  !*** ./node_modules/nosleep.js/src/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const { webm, mp4 } = __webpack_require__(/*! ./media.js */ "./node_modules/nosleep.js/src/media.js")

// Detect iOS browsers < version 10
const oldIOS = typeof navigator !== 'undefined' && parseFloat(
  ('' + (/CPU.*OS ([0-9_]{3,4})[0-9_]{0,1}|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1])
    .replace('undefined', '3_2').replace('_', '.').replace('_', '')
) < 10 && !window.MSStream

class NoSleep {
  constructor () {
    if (oldIOS) {
      this.noSleepTimer = null
    } else {
      // Set up no sleep video element
      this.noSleepVideo = document.createElement('video')

      this.noSleepVideo.setAttribute('muted', '')
      this.noSleepVideo.setAttribute('title', 'No Sleep')
      this.noSleepVideo.setAttribute('playsinline', '')

      this._addSourceToVideo(this.noSleepVideo, 'webm', webm)
      this._addSourceToVideo(this.noSleepVideo, 'mp4', mp4)

      this.noSleepVideo.addEventListener('loadedmetadata', () => {
        if (this.noSleepVideo.duration <= 1) { // webm source
          this.noSleepVideo.setAttribute('loop', '')
        } else { // mp4 source
          this.noSleepVideo.addEventListener('timeupdate', () => {
            if (this.noSleepVideo.currentTime > 0.5) {
              this.noSleepVideo.currentTime = Math.random()
            }
          })
        }
      })
    }
  }

  _addSourceToVideo (element, type, dataURI) {
    var source = document.createElement('source')
    source.src = dataURI
    source.type = `video/${type}`
    element.appendChild(source)
  }

  enable () {
    if (oldIOS) {
      this.disable()
      console.warn(`
        NoSleep enabled for older iOS devices. This can interrupt
        active or long-running network requests from completing successfully.
        See https://github.com/richtr/NoSleep.js/issues/15 for more details.
      `)
      this.noSleepTimer = window.setInterval(() => {
        if (!document.hidden) {
          window.location.href = window.location.href.split('#')[0]
          window.setTimeout(window.stop, 0)
        }
      }, 15000)
    } else {
      this.noSleepVideo.play()
    }
  }

  disable () {
    if (oldIOS) {
      if (this.noSleepTimer) {
        console.warn(`
          NoSleep now disabled for older iOS devices.
        `)
        window.clearInterval(this.noSleepTimer)
        this.noSleepTimer = null
      }
    } else {
      this.noSleepVideo.pause()
    }
  }
};

module.exports = NoSleep


/***/ }),

/***/ "./node_modules/nosleep.js/src/media.js":
/*!**********************************************!*\
  !*** ./node_modules/nosleep.js/src/media.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  webm: 'data:video/webm;base64,GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA=',
  mp4: 'data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKBtZGF0AAAC8wYF///v3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE0MiByMjQ3OSBkZDc5YTYxIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNCAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTEgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MToweDExMSBtZT1oZXggc3VibWU9MiBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0wIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MCA4eDhkY3Q9MCBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0wIHRocmVhZHM9NiBsb29rYWhlYWRfdGhyZWFkcz0xIHNsaWNlZF90aHJlYWRzPTAgbnI9MCBkZWNpbWF0ZT0xIGludGVybGFjZWQ9MCBibHVyYXlfY29tcGF0PTAgY29uc3RyYWluZWRfaW50cmE9MCBiZnJhbWVzPTMgYl9weXJhbWlkPTIgYl9hZGFwdD0xIGJfYmlhcz0wIGRpcmVjdD0xIHdlaWdodGI9MSBvcGVuX2dvcD0wIHdlaWdodHA9MSBrZXlpbnQ9MzAwIGtleWludF9taW49MzAgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD0xMCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIwLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IHZidl9tYXhyYXRlPTIwMDAwIHZidl9idWZzaXplPTI1MDAwIGNyZl9tYXg9MC4wIG5hbF9ocmQ9bm9uZSBmaWxsZXI9MCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAOWWIhAA3//p+C7v8tDDSTjf97w55i3SbRPO4ZY+hkjD5hbkAkL3zpJ6h/LR1CAABzgB1kqqzUorlhQAAAAxBmiQYhn/+qZYADLgAAAAJQZ5CQhX/AAj5IQADQGgcIQADQGgcAAAACQGeYUQn/wALKCEAA0BoHAAAAAkBnmNEJ/8ACykhAANAaBwhAANAaBwAAAANQZpoNExDP/6plgAMuSEAA0BoHAAAAAtBnoZFESwr/wAI+SEAA0BoHCEAA0BoHAAAAAkBnqVEJ/8ACykhAANAaBwAAAAJAZ6nRCf/AAsoIQADQGgcIQADQGgcAAAADUGarDRMQz/+qZYADLghAANAaBwAAAALQZ7KRRUsK/8ACPkhAANAaBwAAAAJAZ7pRCf/AAsoIQADQGgcIQADQGgcAAAACQGe60Qn/wALKCEAA0BoHAAAAA1BmvA0TEM//qmWAAy5IQADQGgcIQADQGgcAAAAC0GfDkUVLCv/AAj5IQADQGgcAAAACQGfLUQn/wALKSEAA0BoHCEAA0BoHAAAAAkBny9EJ/8ACyghAANAaBwAAAANQZs0NExDP/6plgAMuCEAA0BoHAAAAAtBn1JFFSwr/wAI+SEAA0BoHCEAA0BoHAAAAAkBn3FEJ/8ACyghAANAaBwAAAAJAZ9zRCf/AAsoIQADQGgcIQADQGgcAAAADUGbeDRMQz/+qZYADLkhAANAaBwAAAALQZ+WRRUsK/8ACPghAANAaBwhAANAaBwAAAAJAZ+1RCf/AAspIQADQGgcAAAACQGft0Qn/wALKSEAA0BoHCEAA0BoHAAAAA1Bm7w0TEM//qmWAAy4IQADQGgcAAAAC0Gf2kUVLCv/AAj5IQADQGgcAAAACQGf+UQn/wALKCEAA0BoHCEAA0BoHAAAAAkBn/tEJ/8ACykhAANAaBwAAAANQZvgNExDP/6plgAMuSEAA0BoHCEAA0BoHAAAAAtBnh5FFSwr/wAI+CEAA0BoHAAAAAkBnj1EJ/8ACyghAANAaBwhAANAaBwAAAAJAZ4/RCf/AAspIQADQGgcAAAADUGaJDRMQz/+qZYADLghAANAaBwAAAALQZ5CRRUsK/8ACPkhAANAaBwhAANAaBwAAAAJAZ5hRCf/AAsoIQADQGgcAAAACQGeY0Qn/wALKSEAA0BoHCEAA0BoHAAAAA1Bmmg0TEM//qmWAAy5IQADQGgcAAAAC0GehkUVLCv/AAj5IQADQGgcIQADQGgcAAAACQGepUQn/wALKSEAA0BoHAAAAAkBnqdEJ/8ACyghAANAaBwAAAANQZqsNExDP/6plgAMuCEAA0BoHCEAA0BoHAAAAAtBnspFFSwr/wAI+SEAA0BoHAAAAAkBnulEJ/8ACyghAANAaBwhAANAaBwAAAAJAZ7rRCf/AAsoIQADQGgcAAAADUGa8DRMQz/+qZYADLkhAANAaBwhAANAaBwAAAALQZ8ORRUsK/8ACPkhAANAaBwAAAAJAZ8tRCf/AAspIQADQGgcIQADQGgcAAAACQGfL0Qn/wALKCEAA0BoHAAAAA1BmzQ0TEM//qmWAAy4IQADQGgcAAAAC0GfUkUVLCv/AAj5IQADQGgcIQADQGgcAAAACQGfcUQn/wALKCEAA0BoHAAAAAkBn3NEJ/8ACyghAANAaBwhAANAaBwAAAANQZt4NExC//6plgAMuSEAA0BoHAAAAAtBn5ZFFSwr/wAI+CEAA0BoHCEAA0BoHAAAAAkBn7VEJ/8ACykhAANAaBwAAAAJAZ+3RCf/AAspIQADQGgcAAAADUGbuzRMQn/+nhAAYsAhAANAaBwhAANAaBwAAAAJQZ/aQhP/AAspIQADQGgcAAAACQGf+UQn/wALKCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHCEAA0BoHAAACiFtb292AAAAbG12aGQAAAAA1YCCX9WAgl8AAAPoAAAH/AABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAGGlvZHMAAAAAEICAgAcAT////v7/AAAF+XRyYWsAAABcdGtoZAAAAAPVgIJf1YCCXwAAAAEAAAAAAAAH0AAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAygAAAMoAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAB9AAABdwAAEAAAAABXFtZGlhAAAAIG1kaGQAAAAA1YCCX9WAgl8AAV+QAAK/IFXEAAAAAAAtaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAFZpZGVvSGFuZGxlcgAAAAUcbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAAE3HN0YmwAAACYc3RzZAAAAAAAAAABAAAAiGF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAygDKAEgAAABIAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAyYXZjQwFNQCj/4QAbZ01AKOyho3ySTUBAQFAAAAMAEAAr8gDxgxlgAQAEaO+G8gAAABhzdHRzAAAAAAAAAAEAAAA8AAALuAAAABRzdHNzAAAAAAAAAAEAAAABAAAB8GN0dHMAAAAAAAAAPAAAAAEAABdwAAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAADqYAAAAAQAAF3AAAAABAAAAAAAAAAEAAAu4AAAAAQAAOpgAAAABAAAXcAAAAAEAAAAAAAAAAQAAC7gAAAABAAA6mAAAAAEAABdwAAAAAQAAAAAAAAABAAALuAAAAAEAAC7gAAAAAQAAF3AAAAABAAAAAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAEEc3RzegAAAAAAAAAAAAAAPAAAAzQAAAAQAAAADQAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAAPAAAADQAAAA0AAAARAAAADwAAAA0AAAANAAAAEQAAAA8AAAANAAAADQAAABEAAAANAAAADQAAAQBzdGNvAAAAAAAAADwAAAAwAAADZAAAA3QAAAONAAADoAAAA7kAAAPQAAAD6wAAA/4AAAQXAAAELgAABEMAAARcAAAEbwAABIwAAAShAAAEugAABM0AAATkAAAE/wAABRIAAAUrAAAFQgAABV0AAAVwAAAFiQAABaAAAAW1AAAFzgAABeEAAAX+AAAGEwAABiwAAAY/AAAGVgAABnEAAAaEAAAGnQAABrQAAAbPAAAG4gAABvUAAAcSAAAHJwAAB0AAAAdTAAAHcAAAB4UAAAeeAAAHsQAAB8gAAAfjAAAH9gAACA8AAAgmAAAIQQAACFQAAAhnAAAIhAAACJcAAAMsdHJhawAAAFx0a2hkAAAAA9WAgl/VgIJfAAAAAgAAAAAAAAf8AAAAAAAAAAAAAAABAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAACsm1kaWEAAAAgbWRoZAAAAADVgIJf1YCCXwAArEQAAWAAVcQAAAAAACdoZGxyAAAAAAAAAABzb3VuAAAAAAAAAAAAAAAAU3RlcmVvAAAAAmNtaW5mAAAAEHNtaGQAAAAAAAAAAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAidzdGJsAAAAZ3N0c2QAAAAAAAAAAQAAAFdtcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAArEQAAAAAADNlc2RzAAAAAAOAgIAiAAIABICAgBRAFQAAAAADDUAAAAAABYCAgAISEAaAgIABAgAAABhzdHRzAAAAAAAAAAEAAABYAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAAGAAAAWAAAAXBzdGNvAAAAAAAAAFgAAAOBAAADhwAAA5oAAAOtAAADswAAA8oAAAPfAAAD5QAAA/gAAAQLAAAEEQAABCgAAAQ9AAAEUAAABFYAAARpAAAEgAAABIYAAASbAAAErgAABLQAAATHAAAE3gAABPMAAAT5AAAFDAAABR8AAAUlAAAFPAAABVEAAAVXAAAFagAABX0AAAWDAAAFmgAABa8AAAXCAAAFyAAABdsAAAXyAAAF+AAABg0AAAYgAAAGJgAABjkAAAZQAAAGZQAABmsAAAZ+AAAGkQAABpcAAAauAAAGwwAABskAAAbcAAAG7wAABwYAAAcMAAAHIQAABzQAAAc6AAAHTQAAB2QAAAdqAAAHfwAAB5IAAAeYAAAHqwAAB8IAAAfXAAAH3QAAB/AAAAgDAAAICQAACCAAAAg1AAAIOwAACE4AAAhhAAAIeAAACH4AAAiRAAAIpAAACKoAAAiwAAAItgAACLwAAAjCAAAAFnVkdGEAAAAObmFtZVN0ZXJlbwAAAHB1ZHRhAAAAaG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAO2lsc3QAAAAzqXRvbwAAACtkYXRhAAAAAQAAAABIYW5kQnJha2UgMC4xMC4yIDIwMTUwNjExMDA='
}


/***/ }),

/***/ "./src/app/find-music/card/card.component.html":
/*!*****************************************************!*\
  !*** ./src/app/find-music/card/card.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"card\" [style.background]=\"'url(' + song.preview + ')'\" (click)=\"showList(song.id)\">\n    <div class=\"love\">\n        <i class=\"fas fa-headphones\"></i>\n        <span class=\"love-num\">{{song.love}}</span>\n    </div>\n    <div class=\"author\">\n        <i class=\"far fa-user\"></i>\n        <span class=\"autor-name\">{{song.author}}</span>\n    </div>\n    <div class=\"infor\">\n        <span class=\"category\">{{song.category}}</span>\n        <span class=\"space\">|</span>\n        <span class=\"title\">{{song.title}}</span>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/find-music/card/card.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/find-music/card/card.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\n  width: 180px;\n  height: 180px;\n  position: relative;\n  margin-bottom: 70px;\n  background-repeat: no-repeat !important;\n  background-size: cover !important;\n  cursor: pointer; }\n  .card .love {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 20px;\n    background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.336));\n    /* line-height: 16px; */\n    color: #fff;\n    display: flex;\n    /* justify-content: center; */\n    align-items: center;\n    justify-content: flex-end; }\n  .card .love i, .card .love span {\n      margin-right: 5px;\n      font-size: 12px; }\n  .card .author {\n    position: absolute;\n    left: 0;\n    bottom: 0;\n    height: 30px;\n    background: #4242422e;\n    width: 100%;\n    color: #fff;\n    display: flex;\n    align-items: center; }\n  .card .author i, .card .author span {\n      margin-left: 5px; }\n  .card .infor {\n    position: absolute;\n    bottom: -45px;\n    height: 40px;\n    width: 100%;\n    line-height: 20px;\n    font-size: 15px; }\n  .card .infor .space {\n      margin-left: 5px;\n      margin-right: 5px; }\n  .card img {\n    width: 200px;\n    height: 200px; }\n  .card:first-child {\n  margin-left: 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9yZW5ob25nbC93YW5neWl5dW4tb25saW5lL3NyYy9hcHAvZmluZC1tdXNpYy9jYXJkL2NhcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDSSxhQUFZO0VBQ1osY0FBYTtFQUdiLG1CQUFrQjtFQUNsQixvQkFBbUI7RUFDbkIsd0NBQXVDO0VBQ3ZDLGtDQUFpQztFQUNqQyxnQkFBZSxFQXlEbEI7RUFsRUQ7SUFhUSxtQkFBa0I7SUFDbEIsT0FBTTtJQUNOLFFBQU87SUFDUCxZQUFXO0lBQ1gsYUFBWTtJQUNaLDBGQUF5RjtJQUN6Rix3QkFBd0I7SUFDeEIsWUFBVztJQUNYLGNBQWE7SUFDYiw4QkFBOEI7SUFDOUIsb0JBQW1CO0lBQ25CLDBCQUF5QixFQU01QjtFQTlCTDtNQTJCWSxrQkFBaUI7TUFDakIsZ0JBQWUsRUFDbEI7RUE3QlQ7SUFpQ1EsbUJBQWtCO0lBQ2xCLFFBQU87SUFDUCxVQUFTO0lBQ1QsYUFBWTtJQUNaLHNCQUFxQjtJQUNyQixZQUFXO0lBQ1gsWUFBVztJQUNYLGNBQWE7SUFDYixvQkFBbUIsRUFLdEI7RUE5Q0w7TUE0Q1ksaUJBQWdCLEVBQ25CO0VBN0NUO0lBaURRLG1CQUFrQjtJQUNsQixjQUFhO0lBQ2IsYUFBWTtJQUNaLFlBQVc7SUFDWCxrQkFBaUI7SUFDakIsZ0JBQWUsRUFNbEI7RUE1REw7TUF5RFksaUJBQWdCO01BQ2hCLGtCQUFpQixFQUNwQjtFQTNEVDtJQStEUSxhQUFZO0lBQ1osY0FBYSxFQUNoQjtFQUdMO0VBQ0ksZUFBYyxFQUNqQiIsImZpbGUiOiJzcmMvYXBwL2ZpbmQtbXVzaWMvY2FyZC9jYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4uY2FyZCB7XG4gICAgd2lkdGg6IDE4MHB4O1xuICAgIGhlaWdodDogMTgwcHg7XG4gICAgLy8gZmxvYXQ6IGxlZnQ7XG4gICAgLy8gbWFyZ2luOiAxNHB4O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW4tYm90dG9tOiA3MHB4O1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQgIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyICFpbXBvcnRhbnQ7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIFxuXG4gICAgLmxvdmV7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAyMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMCksIHJnYmEoMCwgMCwgMCwgMC4zMzYpKTtcbiAgICAgICAgLyogbGluZS1oZWlnaHQ6IDE2cHg7ICovXG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAvKiBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgKi9cbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcblxuICAgICAgICBpLCBzcGFue1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuYXV0aG9ye1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgICBiYWNrZ3JvdW5kOiAjNDI0MjQyMmU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAgICAgICBpLCBzcGFue1xuICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC5pbmZvcntcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBib3R0b206IC00NXB4O1xuICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBsaW5lLWhlaWdodDogMjBweDtcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xuXG4gICAgICAgIC5zcGFjZXtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGltZ3tcbiAgICAgICAgd2lkdGg6IDIwMHB4O1xuICAgICAgICBoZWlnaHQ6IDIwMHB4O1xuICAgIH1cbn1cblxuLmNhcmQ6Zmlyc3QtY2hpbGR7XG4gICAgbWFyZ2luLWxlZnQ6IDA7XG59Il19 */"

/***/ }),

/***/ "./src/app/find-music/card/card.component.ts":
/*!***************************************************!*\
  !*** ./src/app/find-music/card/card.component.ts ***!
  \***************************************************/
/*! exports provided: CardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardComponent", function() { return CardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var CardComponent = /** @class */ (function () {
    function CardComponent(router) {
        this.router = router;
    }
    CardComponent.prototype.ngOnInit = function () {
    };
    CardComponent.prototype.showList = function (id) {
        this.router.navigate(["/home/songList/" + id]);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], CardComponent.prototype, "song", void 0);
    CardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-find-music-card',
            template: __webpack_require__(/*! ./card.component.html */ "./src/app/find-music/card/card.component.html"),
            styles: [__webpack_require__(/*! ./card.component.scss */ "./src/app/find-music/card/card.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], CardComponent);
    return CardComponent;
}());



/***/ }),

/***/ "./src/app/find-music/find-music.component.html":
/*!******************************************************!*\
  !*** ./src/app/find-music/find-music.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-tab-group class=\"find-music\">\n  <mat-tab  class=\"find-tab\" label=\"个性推荐\">\n      <div class=\"example-large-box mat-elevation-z4\">\n          <app-find-recommend [songs]=\"recommendSongs\"></app-find-recommend>\n      </div>\n  </mat-tab>\n  <mat-tab  class=\"find-tab\" label=\"歌单\">\n      <div class=\"example-large-box mat-elevation-z4\">\n          <app-find-songs [songs]=\"songs\"></app-find-songs>\n      </div>\n  </mat-tab>\n  <mat-tab  class=\"find-tab\" label=\"主播电台\">主播电台</mat-tab>\n  <mat-tab   class=\"find-tab\"label=\"排行榜\">排行榜</mat-tab>\n  <mat-tab  class=\"find-tab\" label=\"歌手\">歌手</mat-tab>\n  <mat-tab  class=\"find-tab\" label=\"最新音乐\">最新音乐</mat-tab>\n\n  \n</mat-tab-group>\n\n\n"

/***/ }),

/***/ "./src/app/find-music/find-music.component.scss":
/*!******************************************************!*\
  !*** ./src/app/find-music/find-music.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-tab-body-wrapper {\n  height: calc(100% - 49px); }\n\n.find-music {\n  width: 100%;\n  height: 100%; }\n\n.find-music .mat-tab {\n    height: 100%;\n    width: 100%; }\n\n.find-music .example-large-box {\n    max-width: 80%;\n    margin: 0 auto;\n    box-shadow: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9yZW5ob25nbC93YW5neWl5dW4tb25saW5lL3NyYy9hcHAvZmluZC1tdXNpYy9maW5kLW11c2ljLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksMEJBQXlCLEVBQzVCOztBQUNEO0VBQ0ksWUFBVztFQUNYLGFBQVksRUFrQmY7O0FBcEJEO0lBT1EsYUFBWTtJQUNaLFlBQVcsRUFDZDs7QUFUTDtJQWNRLGVBQWM7SUFDZCxlQUFjO0lBQ2QsaUJBQWdCLEVBQ25CIiwiZmlsZSI6InNyYy9hcHAvZmluZC1tdXNpYy9maW5kLW11c2ljLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4ubWF0LXRhYi1ib2R5LXdyYXBwZXJ7XG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA0OXB4KTtcbn1cbi5maW5kLW11c2lje1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcblxuICAgIFxuXG4gICAgLm1hdC10YWJ7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgXG5cbiAgICAuZXhhbXBsZS1sYXJnZS1ib3gge1xuICAgICAgICBtYXgtd2lkdGg6IDgwJTtcbiAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgfVxuXG4gICAgXG59Il19 */"

/***/ }),

/***/ "./src/app/find-music/find-music.component.ts":
/*!****************************************************!*\
  !*** ./src/app/find-music/find-music.component.ts ***!
  \****************************************************/
/*! exports provided: FindMusicComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindMusicComponent", function() { return FindMusicComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _find_music_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./find-music.service */ "./src/app/find-music/find-music.service.ts");



var FindMusicComponent = /** @class */ (function () {
    function FindMusicComponent(findMusicServ) {
        this.findMusicServ = findMusicServ;
    }
    FindMusicComponent.prototype.ngOnInit = function () {
        this.getSongType();
        this.getRecommendType();
    };
    FindMusicComponent.prototype.getSongType = function () {
        var _this = this;
        this.findMusicServ.getSongType('0001').subscribe(function (data) {
            _this.songs = data;
        });
    };
    FindMusicComponent.prototype.getRecommendType = function () {
        var _this = this;
        this.findMusicServ.getSongTypeRecommend('0002').subscribe(function (data) {
            _this.recommendSongs = data;
        });
    };
    FindMusicComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-find-music',
            template: __webpack_require__(/*! ./find-music.component.html */ "./src/app/find-music/find-music.component.html"),
            styles: [__webpack_require__(/*! ./find-music.component.scss */ "./src/app/find-music/find-music.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_find_music_service__WEBPACK_IMPORTED_MODULE_2__["FindMusicService"]])
    ], FindMusicComponent);
    return FindMusicComponent;
}());



/***/ }),

/***/ "./src/app/find-music/find-music.module.ts":
/*!*************************************************!*\
  !*** ./src/app/find-music/find-music.module.ts ***!
  \*************************************************/
/*! exports provided: FindMusicModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindMusicModule", function() { return FindMusicModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _find_music_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./find-music.component */ "./src/app/find-music/find-music.component.ts");
/* harmony import */ var _share_ui_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../share/ui.module */ "./src/app/share/ui.module.ts");
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./card/card.component */ "./src/app/find-music/card/card.component.ts");
/* harmony import */ var _recommend_recommend_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./recommend/recommend.component */ "./src/app/find-music/recommend/recommend.component.ts");
/* harmony import */ var _songs_songs_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./songs/songs.component */ "./src/app/find-music/songs/songs.component.ts");








var FindMusicModule = /** @class */ (function () {
    function FindMusicModule() {
    }
    FindMusicModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_find_music_component__WEBPACK_IMPORTED_MODULE_3__["FindMusicComponent"], _card_card_component__WEBPACK_IMPORTED_MODULE_5__["CardComponent"], _recommend_recommend_component__WEBPACK_IMPORTED_MODULE_6__["RecommendComponent"], _songs_songs_component__WEBPACK_IMPORTED_MODULE_7__["SongsComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _share_ui_module__WEBPACK_IMPORTED_MODULE_4__["UiModule"]
            ],
            exports: [_find_music_component__WEBPACK_IMPORTED_MODULE_3__["FindMusicComponent"]]
        })
    ], FindMusicModule);
    return FindMusicModule;
}());



/***/ }),

/***/ "./src/app/find-music/find-music.service.ts":
/*!**************************************************!*\
  !*** ./src/app/find-music/find-music.service.ts ***!
  \**************************************************/
/*! exports provided: FindMusicService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindMusicService", function() { return FindMusicService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var FindMusicService = /** @class */ (function () {
    function FindMusicService(http) {
        this.http = http;
    }
    FindMusicService.prototype.getSongType = function (id) {
        return this.http.get("/wangyiyun-online/assets/api/huayu.json");
    };
    FindMusicService.prototype.getSongTypeRecommend = function (id) {
        return this.http.get("/wangyiyun-online/assets/api/huayu.json");
    };
    FindMusicService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], FindMusicService);
    return FindMusicService;
}());



/***/ }),

/***/ "./src/app/find-music/recommend/recommend.component.html":
/*!***************************************************************!*\
  !*** ./src/app/find-music/recommend/recommend.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"carousel-con\">\n    <nz-carousel nzAutoPlay>\n        <div class=\"carousel-img\" nz-carousel-content *ngFor=\"let index of array\" [style.background]=\"'url(' + index + ')'\">\n        </div>\n      </nz-carousel>\n</div>\n<div class=\"recommend-songs\">\n    <div class=\"title\">推荐歌单</div>\n    <div class=\"card-con\">\n        <app-find-music-card *ngFor=\"let song of songs\" [song]=\"song\"></app-find-music-card>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/find-music/recommend/recommend.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/find-music/recommend/recommend.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "[nz-carousel-content] {\n  text-align: center;\n  height: 160px;\n  line-height: 160px;\n  background: #364d79;\n  color: #fff;\n  overflow: hidden;\n  margin: 20px 0; }\n\n.slide-img {\n  width: 100%;\n  height: 100%; }\n\n.carousel-img {\n  height: 250px !important;\n  background-repeat: no-repeat !important;\n  background-size: cover !important; }\n\n.title {\n  border-bottom: 1px solid #e0e0e0; }\n\n.card-con {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  padding-top: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvZmluZC1tdXNpYy9yZWNvbW1lbmQvcmVjb21tZW5kLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvdHJhdmlzL2J1aWxkL3JlbmhvbmdsL3dhbmd5aXl1bi1vbmxpbmUvc3JjL2FwcC9maW5kLW11c2ljL3JlY29tbWVuZC9yZWNvbW1lbmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUNDRSxtQkFBa0I7RUFDbEIsY0FBYTtFQUNiLG1CQUFrQjtFQUNsQixvQkFBbUI7RUFDbkIsWUFBVztFQUNYLGlCQUFnQjtFQUNoQixlQUFjLEVBQ2Y7O0FBRUQ7RUFDRSxZQUFXO0VBQ1gsYUFBWSxFQUNiOztBQUVEO0VBQ0UseUJBQXdCO0VBQ3hCLHdDQUF1QztFQUN2QyxrQ0FBaUMsRUFDbEM7O0FBRUQ7RUFDSSxpQ0FBZ0MsRUFDbkM7O0FBRUQ7RUFDSSxZQUFXO0VBQ1gsY0FBYTtFQUNiLGdCQUFlO0VBQ2YsK0JBQThCO0VBQzlCLGtCQUFpQixFQUNwQiIsImZpbGUiOiJzcmMvYXBwL2ZpbmQtbXVzaWMvcmVjb21tZW5kL3JlY29tbWVuZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIltuei1jYXJvdXNlbC1jb250ZW50XSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgaGVpZ2h0OiAxNjBweDtcbiAgbGluZS1oZWlnaHQ6IDE2MHB4O1xuICBiYWNrZ3JvdW5kOiAjMzY0ZDc5O1xuICBjb2xvcjogI2ZmZjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbWFyZ2luOiAyMHB4IDA7IH1cblxuLnNsaWRlLWltZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7IH1cblxuLmNhcm91c2VsLWltZyB7XG4gIGhlaWdodDogMjUwcHggIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdCAhaW1wb3J0YW50O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyICFpbXBvcnRhbnQ7IH1cblxuLnRpdGxlIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7IH1cblxuLmNhcmQtY29uIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBwYWRkaW5nLXRvcDogMTBweDsgfVxuIiwiW256LWNhcm91c2VsLWNvbnRlbnRdIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBoZWlnaHQ6IDE2MHB4O1xuICBsaW5lLWhlaWdodDogMTYwcHg7XG4gIGJhY2tncm91bmQ6ICMzNjRkNzk7XG4gIGNvbG9yOiAjZmZmO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXJnaW46IDIwcHggMDtcbn1cblxuLnNsaWRlLWltZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5jYXJvdXNlbC1pbWcge1xuICBoZWlnaHQ6IDI1MHB4ICFpbXBvcnRhbnQ7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQgIWltcG9ydGFudDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlciAhaW1wb3J0YW50O1xufVxuXG4udGl0bGV7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMGUwZTA7XG59XG5cbi5jYXJkLWNvbntcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgcGFkZGluZy10b3A6IDEwcHg7XG59XG5cbiJdfQ== */"

/***/ }),

/***/ "./src/app/find-music/recommend/recommend.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/find-music/recommend/recommend.component.ts ***!
  \*************************************************************/
/*! exports provided: RecommendComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecommendComponent", function() { return RecommendComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var RecommendComponent = /** @class */ (function () {
    function RecommendComponent() {
        this.array = ['/wangyiyun-online/assets/images/p2.jpg', '/wangyiyun-online/assets/images/p3.jpg', '/wangyiyun-online/assets/images/p5.jpg'];
    }
    RecommendComponent.prototype.ngOnInit = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], RecommendComponent.prototype, "songs", void 0);
    RecommendComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-find-recommend',
            template: __webpack_require__(/*! ./recommend.component.html */ "./src/app/find-music/recommend/recommend.component.html"),
            styles: [__webpack_require__(/*! ./recommend.component.scss */ "./src/app/find-music/recommend/recommend.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], RecommendComponent);
    return RecommendComponent;
}());



/***/ }),

/***/ "./src/app/find-music/songs/songs.component.html":
/*!*******************************************************!*\
  !*** ./src/app/find-music/songs/songs.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"hot-label\">\n    <span class=\"title\">热门标签：</span>\n    <span>华语</span>\n    <span class=\"space\">|</span>\n    <span>流行</span>\n    <span class=\"space\">|</span>\n    <span>摇滚</span>\n    <span class=\"space\">|</span>\n    <span>民谣</span>\n    <span class=\"space\">|</span>\n    <span>电子</span>\n    <span class=\"space\">|</span>\n    <span>轻音乐</span>\n    <span class=\"space\">|</span>\n    <span>怀旧</span>\n  </div>\n  <div class=\"card-con\">\n      <app-find-music-card *ngFor=\"let song of songs\" [song]=\"song\"></app-find-music-card>\n  </div>\n  <div class=\"song-page\">\n      <mat-paginator [length]=\"100\"\n        [pageSize]=\"25\"\n        [pageSizeOptions]=\"[25]\"\n        hidePageSize=\"true\">\n    </mat-paginator>\n  </div>"

/***/ }),

/***/ "./src/app/find-music/songs/songs.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/find-music/songs/songs.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".song-page {\n  clear: both; }\n\n.hot-label {\n  height: 45px;\n  line-height: 45px;\n  font-size: 12px;\n  margin-top: 20px; }\n\n.hot-label span {\n    width: 65px;\n    color: gray;\n    display: inline-block;\n    text-align: center;\n    cursor: pointer; }\n\n.hot-label .space {\n    display: inline-block;\n    width: 20px;\n    text-align: center;\n    color: gray; }\n\n.hot-label .title {\n    color: #000; }\n\n.card-con {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n  padding-top: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9yZW5ob25nbC93YW5neWl5dW4tb25saW5lL3NyYy9hcHAvZmluZC1tdXNpYy9zb25ncy9zb25ncy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQVcsRUFDZDs7QUFFRDtFQUNJLGFBQVk7RUFDWixrQkFBaUI7RUFDakIsZ0JBQWU7RUFDZixpQkFBZ0IsRUFvQm5COztBQXhCRDtJQU9RLFlBQVc7SUFDWCxZQUFXO0lBQ1gsc0JBQXFCO0lBQ3JCLG1CQUFrQjtJQUNsQixnQkFBZSxFQUNsQjs7QUFaTDtJQWVRLHNCQUFxQjtJQUNyQixZQUFXO0lBQ1gsbUJBQWtCO0lBQ2xCLFlBQVcsRUFDZDs7QUFuQkw7SUFzQlEsWUFBVyxFQUNkOztBQUdMO0VBQ0ksWUFBVztFQUNYLGNBQWE7RUFDYixnQkFBZTtFQUNmLCtCQUE4QjtFQUM5QixrQkFBaUIsRUFDcEIiLCJmaWxlIjoic3JjL2FwcC9maW5kLW11c2ljL3NvbmdzL3NvbmdzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNvbmctcGFnZXtcbiAgICBjbGVhcjogYm90aDtcbn1cblxuLmhvdC1sYWJlbHtcbiAgICBoZWlnaHQ6IDQ1cHg7XG4gICAgbGluZS1oZWlnaHQ6IDQ1cHg7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIG1hcmdpbi10b3A6IDIwcHg7XG5cbiAgICBzcGFue1xuICAgICAgICB3aWR0aDogNjVweDtcbiAgICAgICAgY29sb3I6IGdyYXk7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgfVxuXG4gICAgLnNwYWNle1xuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgIHdpZHRoOiAyMHB4O1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGNvbG9yOiBncmF5O1xuICAgIH1cblxuICAgIC50aXRsZXtcbiAgICAgICAgY29sb3I6ICMwMDA7XG4gICAgfVxufVxuXG4uY2FyZC1jb257XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIHBhZGRpbmctdG9wOiAxMHB4O1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/find-music/songs/songs.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/find-music/songs/songs.component.ts ***!
  \*****************************************************/
/*! exports provided: SongsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SongsComponent", function() { return SongsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var SongsComponent = /** @class */ (function () {
    function SongsComponent() {
    }
    SongsComponent.prototype.ngOnInit = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SongsComponent.prototype, "songs", void 0);
    SongsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-find-songs',
            template: __webpack_require__(/*! ./songs.component.html */ "./src/app/find-music/songs/songs.component.html"),
            styles: [__webpack_require__(/*! ./songs.component.scss */ "./src/app/find-music/songs/songs.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], SongsComponent);
    return SongsComponent;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"footer\">\n  <audio [src]=\"songDetail.url\" #playerRef></audio>\n  <div class=\"control\">\n    <div class=\"before\" (click)=\"before()\" [style.background]=\"theme\">\n      <i class=\"material-icons\">\n        skip_previous\n      </i>\n    </div>\n\n    <div class=\"pause\" (click)=\"play()\" [style.background]=\"theme\">\n      <i *ngIf=\"!playing\" class=\"material-icons\">\n        play_arrow\n      </i>\n      <i *ngIf=\"playing\" class=\"material-icons\" [style.background]=\"theme\">\n        pause\n      </i>\n    </div>\n\n    <div class=\"after\" (click)=\"after()\"  [style.background]=\"theme\">\n      <i class=\"material-icons\">\n        skip_next\n      </i>\n    </div>\n  </div>\n\n  <div class=\"duration\">\n    <div class=\"time\">{{currentTime}}</div>\n\n    <mat-slider class=\"time-slider\" color=\"primary\" [min]=\"sliderMin\" [max]=\"sliderMax\" [(ngModel)]=\"sliderValue\"\n      (change)=\"setCurrentTime($event)\"></mat-slider>\n\n    <div class=\"time-total\">{{duration}}</div>\n  </div>\n\n  <div class=\"volume\">\n    <i *ngIf=\"volume === 0\" class=\"material-icons\">\n      volume_off\n    </i>\n    <i *ngIf=\"volume !== 0\" class=\"material-icons\">\n      volume_up\n    </i>\n    <mat-slider class=\"volume-slider\" color=\"primary\" min=\"0\" max=\"10\" [(ngModel)]=\"volume\" (change)=\"setVolume($event)\"\n      tickInterval=\"10\"></mat-slider>\n  </div>\n\n  <div class=\"action\">\n    <i class=\"material-icons\" *ngIf=\"loopStatus === 1\" (click)=\"updateLoopStatus()\" title=\"单曲循环\">\n      repeat_one\n    </i>\n\n    <i class=\"material-icons\" *ngIf=\"loopStatus === 0\" (click)=\"updateLoopStatus()\" title=\"列表循环\">\n      playlist_play\n    </i>\n\n    <i class=\"material-icons\" *ngIf=\"loopStatus === 2\" (click)=\"updateLoopStatus()\" title=\"随机播放\">\n      shuffle\n    </i>\n\n    <i class=\"material-icons\" title=\"歌词\">\n      menu_book\n    </i>\n\n    <i class=\"material-icons\" (click)=\"openPlayList()\" title=\"播放列表\">\n      list\n    </i>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/footer/footer.component.scss":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center; }\n  .footer .control {\n    width: 20%;\n    height: 100%;\n    display: flex;\n    justify-content: space-evenly;\n    align-items: center; }\n  .footer .control .before {\n      height: 30px;\n      width: 30px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      color: #fff;\n      cursor: pointer; }\n  .footer .control .before i {\n        font-size: 20px; }\n  .footer .control .before:hover {\n        opacity: 0.9; }\n  .footer .control .pause {\n      height: 35px;\n      width: 35px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      color: #fff;\n      cursor: pointer; }\n  .footer .control .pause i {\n        font-size: 20px; }\n  .footer .control .pause:hover {\n        opacity: 0.9; }\n  .footer .control .after {\n      height: 30px;\n      width: 30px;\n      border-radius: 50%;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      color: #fff;\n      cursor: pointer; }\n  .footer .control .after i {\n        font-size: 20px; }\n  .footer .control .after:hover {\n        opacity: 0.9; }\n  .footer .duration {\n    width: 50%;\n    height: 100%;\n    display: flex;\n    justify-content: space-around;\n    align-items: center; }\n  .footer .duration .time {\n      width: 50px;\n      font-size: 12px;\n      flex: 1;\n      text-align: right; }\n  .footer .duration .time-slider {\n      width: calc(100% - 500px);\n      flex: 10; }\n  .footer .duration .time-total {\n      width: 50px;\n      font-size: 12px;\n      flex: 1; }\n  .footer .volume {\n    width: 15%;\n    height: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n    margin-left: 20px; }\n  .footer .volume .volume-slider {\n      width: 100px;\n      min-width: 100px !important; }\n  @-webkit-keyframes rotate {\n  to {\n    transform: rotate(360deg); } }\n  @keyframes rotate {\n  to {\n    transform: rotate(360deg); } }\n  .footer .action {\n    display: flex;\n    justify-content: space-evenly;\n    width: 15%;\n    padding-left: 20px;\n    padding-right: 20px; }\n  .footer .action i {\n      cursor: pointer; }\n  .footer .action i:hover {\n        color: gray; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9yZW5ob25nbC93YW5neWl5dW4tb25saW5lL3NyYy9hcHAvZm9vdGVyL2Zvb3Rlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVc7RUFDWCxhQUFZO0VBQ1osY0FBYTtFQUNiLG9CQUFtQixFQXdJcEI7RUE1SUQ7SUFPSSxXQUFVO0lBQ1YsYUFBWTtJQUNaLGNBQWE7SUFDYiw4QkFBNkI7SUFDN0Isb0JBQW1CLEVBNkRwQjtFQXhFSDtNQWNNLGFBQVk7TUFDWixZQUFXO01BQ1gsbUJBQWtCO01BRWxCLGNBQWE7TUFDYixvQkFBbUI7TUFDbkIsd0JBQXVCO01BQ3ZCLFlBQVc7TUFDWCxnQkFBZSxFQVNoQjtFQS9CTDtRQXlCUSxnQkFBZSxFQUNoQjtFQTFCUDtRQTZCUSxhQUFZLEVBQ2I7RUE5QlA7TUFrQ00sYUFBWTtNQUNaLFlBQVc7TUFDWCxtQkFBa0I7TUFFbEIsY0FBYTtNQUNiLG9CQUFtQjtNQUNuQix3QkFBdUI7TUFDdkIsWUFBVztNQUNYLGdCQUFlLEVBU2hCO0VBbkRMO1FBNkNRLGdCQUFlLEVBQ2hCO0VBOUNQO1FBaURRLGFBQVksRUFDYjtFQWxEUDtNQXNETSxhQUFZO01BQ1osWUFBVztNQUNYLG1CQUFrQjtNQUVsQixjQUFhO01BQ2Isb0JBQW1CO01BQ25CLHdCQUF1QjtNQUN2QixZQUFXO01BQ1gsZ0JBQWUsRUFTaEI7RUF2RUw7UUFpRVEsZ0JBQWUsRUFDaEI7RUFsRVA7UUFxRVEsYUFBWSxFQUNiO0VBdEVQO0lBNEVJLFdBQVU7SUFDVixhQUFZO0lBQ1osY0FBYTtJQUNiLDhCQUE2QjtJQUM3QixvQkFBbUIsRUFtQnBCO0VBbkdIO01BbUZNLFlBQVc7TUFDWCxnQkFBZTtNQUNmLFFBQU87TUFDUCxrQkFBaUIsRUFDbEI7RUF2Rkw7TUEwRk0sMEJBQXlCO01BQ3pCLFNBQVEsRUFDVDtFQTVGTDtNQStGTSxZQUFXO01BQ1gsZ0JBQWU7TUFDZixRQUFPLEVBQ1I7RUFsR0w7SUF5R0ksV0FBVTtJQUNWLGFBQVk7SUFDWixjQUFhO0lBQ2Isb0JBQW1CO0lBQ25CLHdCQUF1QjtJQUN2QixvQkFBbUI7SUFDbkIsa0JBQWlCLEVBTWxCO0VBckhIO01Ba0hNLGFBQVk7TUFDWiw0QkFBMkIsRUFDNUI7RUFHSDtFQUNFO0lBQ0UsMEJBQXlCLEVBQUEsRUFBQTtFQUY3QjtFQUNFO0lBQ0UsMEJBQXlCLEVBQUEsRUFBQTtFQXpIL0I7SUE4SEksY0FBYTtJQUNiLDhCQUE2QjtJQUM3QixXQUFVO0lBQ1YsbUJBQWtCO0lBQ2xCLG9CQUFtQixFQVNwQjtFQTNJSDtNQXFJTSxnQkFBZSxFQUtoQjtFQTFJTDtRQXdJUSxZQUFXLEVBQ1oiLCJmaWxlIjoic3JjL2FwcC9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvb3RlciB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgLmNvbnRyb2wge1xuICAgIHdpZHRoOiAyMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAgIC5iZWZvcmUge1xuICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgd2lkdGg6IDMwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAvLyBiYWNrZ3JvdW5kOiAjNWI4YmU2O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgICBpIHtcbiAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgfVxuXG4gICAgICAmOmhvdmVyIHtcbiAgICAgICAgb3BhY2l0eTogMC45O1xuICAgICAgfVxuICAgIH1cblxuICAgIC5wYXVzZSB7XG4gICAgICBoZWlnaHQ6IDM1cHg7XG4gICAgICB3aWR0aDogMzVweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIC8vIGJhY2tncm91bmQ6ICM1YjhiZTY7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgIGkge1xuICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICB9XG5cbiAgICAgICY6aG92ZXIge1xuICAgICAgICBvcGFjaXR5OiAwLjk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmFmdGVyIHtcbiAgICAgIGhlaWdodDogMzBweDtcbiAgICAgIHdpZHRoOiAzMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgLy8gYmFja2dyb3VuZDogIzViOGJlNjtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICAgaSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgIH1cblxuICAgICAgJjpob3ZlciB7XG4gICAgICAgIG9wYWNpdHk6IDAuOTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC5kdXJhdGlvbiB7XG4gICAgd2lkdGg6IDUwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgLnRpbWUge1xuICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmbGV4OiAxO1xuICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgfVxuXG4gICAgLnRpbWUtc2xpZGVyIHtcbiAgICAgIHdpZHRoOiBjYWxjKDEwMCUgLSA1MDBweCk7XG4gICAgICBmbGV4OiAxMDtcbiAgICB9XG5cbiAgICAudGltZS10b3RhbCB7XG4gICAgICB3aWR0aDogNTBweDtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGZsZXg6IDE7XG4gICAgfVxuICB9XG5cblxuXG5cbiAgLnZvbHVtZSB7XG4gICAgd2lkdGg6IDE1JTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XG5cbiAgICAudm9sdW1lLXNsaWRlciB7XG4gICAgICB3aWR0aDogMTAwcHg7XG4gICAgICBtaW4td2lkdGg6IDEwMHB4ICFpbXBvcnRhbnQ7XG4gICAgfVxuICB9XG5cbiAgQGtleWZyYW1lcyByb3RhdGUge1xuICAgIHRvIHtcbiAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gICAgfVxuICB9XG5cbiAgLmFjdGlvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcbiAgICB3aWR0aDogMTUlO1xuICAgIHBhZGRpbmctbGVmdDogMjBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xuXG4gICAgaSB7XG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAgICY6aG92ZXIge1xuICAgICAgICBjb2xvcjogZ3JheTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gOjpuZy1kZWVwIC5tYXQtcHJpbWFyeSAubWF0LXNsaWRlci10cmFjay1maWxsLCAubWF0LXByaW1hcnkgLm1hdC1zbGlkZXItdGh1bWIsIC5tYXQtcHJpbWFyeSAubWF0LXNsaWRlci10aHVtYi1sYWJlbHtcbi8vICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQgIWltcG9ydGFudDtcbi8vIH0iXX0= */"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _footer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./footer.service */ "./src/app/footer/footer.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _home_home_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../home/home.service */ "./src/app/home/home.service.ts");
/* harmony import */ var _header_header_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../header/header.service */ "./src/app/header/header.service.ts");






var FooterComponent = /** @class */ (function () {
    function FooterComponent(footerSer, homeSer, headerSer) {
        this.footerSer = footerSer;
        this.homeSer = homeSer;
        this.headerSer = headerSer;
        this.loopStatus = 0;
        this.playingIndex = 0;
        this.rotation = 0;
        this.open = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    FooterComponent.prototype.ngOnInit = function () {
        this.listenPlayList();
        this.listSongDetail();
        this.player = this.playerRef.nativeElement;
        this.volume = 5;
        this.checkStatus();
        this.listenEnded();
        this.footerSer.player.next(this.player);
        this.listenHistoryList();
        this.listenTheme();
    };
    FooterComponent.prototype.listenTheme = function () {
        var _this = this;
        this.headerSer.theme.subscribe(function (data) {
            _this.theme = data;
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = ".mat-primary .mat-slider-track-fill, .mat-primary .mat-slider-thumb, .mat-primary .mat-slider-thumb-label{background-color: " + data + " !important}";
            document.getElementsByTagName('head')[0].appendChild(style);
        });
    };
    FooterComponent.prototype.listenHistoryList = function () {
        var _this = this;
        this.homeSer.historyList.subscribe(function (data) {
            _this.historyList = data;
        });
    };
    FooterComponent.prototype.listenEnded = function () {
        var _this = this;
        this.player.onended = function () {
            document.title = '网易云音乐';
            if (_this.loopStatus === 0) { // list loop
                _this.playingIndex++;
                if (_this.playingIndex >= _this.playList.length) {
                    _this.playingIndex = 0;
                }
                _this.playThisMusic(_this.playList[_this.playingIndex]);
            }
            else if (_this.loopStatus === 1) { // single loop
                _this.player.play();
            }
            else if (_this.loopStatus === 2) { // random loop
                var n = Number.parseInt((Math.random() * _this.playList.length).toString());
                if (n === _this.playingIndex) {
                    _this.player.play();
                }
                else {
                    _this.playingIndex = n;
                    _this.playThisMusic(_this.playList[_this.playingIndex]);
                }
            }
        };
    };
    FooterComponent.prototype.before = function () {
        this.playingIndex--;
        if (this.playingIndex < 0) {
            this.playingIndex = this.playList.length - 1;
        }
        this.playThisMusic(this.playList[this.playingIndex]);
    };
    FooterComponent.prototype.after = function () {
        this.playingIndex++;
        if (this.playingIndex >= this.playList.length) {
            this.playingIndex = 0;
        }
        this.playThisMusic(this.playList[this.playingIndex]);
    };
    FooterComponent.prototype.updateLoopStatus = function () {
        if (this.loopStatus === 0) {
            this.loopStatus = 1;
        }
        else if (this.loopStatus === 1) {
            this.loopStatus = 2;
        }
        else {
            this.loopStatus = 0;
        }
    };
    FooterComponent.prototype.playThisMusic = function (item) {
        var newList = Object.assign([], this.playList);
        newList.forEach(function (song) {
            if (song.id === item.id) {
                song.current = true;
            }
            else {
                song.current = false;
            }
        });
        this.homeSer.playList.next(newList);
        this.homeSer.historyList.next(this.historyList.concat([item]));
    };
    FooterComponent.prototype.dataAdapter = function (data) {
        var current = this.playList.filter(function (item) { return item.id === data.id; })[0];
        var ret = {
            'id': data.id,
            'name': current.name,
            'author': current.author,
            'preview': current.picUrl || current.preview,
            'source': '每日歌曲推荐',
            'zhuanji': current.zhuanji,
            'lyric': '',
            'url': data.url,
            'time': current.time,
            'vip': current.vip
        };
        return ret;
    };
    FooterComponent.prototype.listSongDetail = function () {
        var _this = this;
        this.footerSer.songDetail.subscribe(function (data) {
            if (_this.songDetail && _this.songDetail.id === data['id']) {
                return;
            }
            _this.songDetail = data;
            if (_this.player && _this.playing !== undefined) {
                _this.player.oncanplay = function () {
                    _this.player.play();
                    _this.playing = true;
                    _this.footerSer.playing.next(true);
                    _this.setIndex();
                };
            }
            _this.updateLyric(data['id']);
            document.title = _this.songDetail.name + ' - ' + _this.songDetail.author;
        });
    };
    FooterComponent.prototype.updateLyric = function (id) {
        var _this = this;
        if (!id) {
            return;
        }
        this.footerSer.getLyric(id).subscribe(function (data) {
            _this.footerSer.songLyric.next(data);
        });
    };
    FooterComponent.prototype.setIndex = function () {
        var _this = this;
        this.playList.forEach(function (item, i) {
            if (item.id === _this.songDetail.id) {
                _this.playingIndex = i;
            }
        });
    };
    FooterComponent.prototype.listenPlayList = function () {
        var _this = this;
        this.homeSer.playList.subscribe(function (data) {
            if (data.length === 0) {
                return;
            }
            _this.playList = data;
            var _a = _this.getCurrentId(data), id = _a.id, curr = _a.curr;
            _this.homeSer.historyList.next(_this.historyList.concat([curr]));
            _this.footerSer.getSongDetail(id).subscribe(function (detail) {
                _this.footerSer.songDetail.next(_this.dataAdapter(detail['data'][0]));
                if (_this.songDetail && _this.songDetail.id === detail['data'][0]['id']) {
                }
                else {
                    _this.playing = false;
                    _this.footerSer.playing.next(false);
                }
            });
        });
    };
    FooterComponent.prototype.getCurrentId = function (data) {
        var _this = this;
        var ret = data[0].id;
        var curr = data[0];
        this.playingIndex = 0;
        data.forEach(function (item, index) {
            if (item.current === true) {
                ret = item.id;
                curr = item;
                _this.playingIndex = index;
            }
        });
        return {
            id: ret,
            curr: curr
        };
    };
    FooterComponent.prototype.openPlayList = function () {
        this.open.emit('open');
    };
    FooterComponent.prototype.ngOnDestroy = function () {
        this.checkTimer.unsubscribe();
    };
    FooterComponent.prototype.checkStatus = function () {
        var _this = this;
        this.checkTimer = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["interval"])(1000);
        this.checkTimer.subscribe(function (val) {
            if (_this.player && _this.player.currentTime) {
                _this.footerSer.currentTime.next(_this.player.currentTime);
            }
            _this.updateDurationSlider();
            if (_this.player.ended && _this.playing) {
                _this.playing = false;
                _this.footerSer.playing.next(false);
            }
        });
    };
    FooterComponent.prototype.updateDurationSlider = function () {
        this.currentTime = this.setMinuts(this.player.currentTime);
        this.duration = this.setMinuts(this.player.duration);
        this.sliderMax = this.player.duration;
        this.sliderMin = 0;
        this.sliderValue = this.player.currentTime;
    };
    FooterComponent.prototype.setVolume = function (val) {
        this.player.volume = val.value / 10;
    };
    FooterComponent.prototype.setCurrentTime = function (val) {
        this.player.currentTime = val.value;
        this.updateDurationSlider();
    };
    FooterComponent.prototype.setMinuts = function (time) {
        return this.addZero(Number.parseInt((time / 60).toString(), 10)) + ':' + this.addZero(Number.parseInt((time % 60).toString(), 10));
    };
    FooterComponent.prototype.addZero = function (time) {
        if (time < 10) {
            return '0' + time;
        }
        return time;
    };
    FooterComponent.prototype.play = function () {
        if (this.playing) {
            this.player.pause();
            this.playing = false;
            this.footerSer.playing.next(false);
        }
        else {
            this.player.play();
            this.playing = true;
            this.footerSer.playing.next(true);
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('playerRef'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], FooterComponent.prototype, "playerRef", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], FooterComponent.prototype, "open", void 0);
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.scss */ "./src/app/footer/footer.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_footer_service__WEBPACK_IMPORTED_MODULE_2__["FooterService"], _home_home_service__WEBPACK_IMPORTED_MODULE_4__["HomeService"], _header_header_service__WEBPACK_IMPORTED_MODULE_5__["HeaderService"]])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/footer/footer.module.ts":
/*!*****************************************!*\
  !*** ./src/app/footer/footer.module.ts ***!
  \*****************************************/
/*! exports provided: FooterModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterModule", function() { return FooterModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _share_ui_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../share/ui.module */ "./src/app/share/ui.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");






var FooterModule = /** @class */ (function () {
    function FooterModule() {
    }
    FooterModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _share_ui_module__WEBPACK_IMPORTED_MODULE_4__["UiModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"]
            ],
            exports: [_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"]]
        })
    ], FooterModule);
    return FooterModule;
}());



/***/ }),

/***/ "./src/app/footer/footer.service.ts":
/*!******************************************!*\
  !*** ./src/app/footer/footer.service.ts ***!
  \******************************************/
/*! exports provided: FooterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterService", function() { return FooterService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");




var FooterService = /** @class */ (function () {
    function FooterService(http) {
        this.http = http;
        this.songDetail = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({});
        this.songLyric = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({});
        this.currentTime = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](0);
        this.player = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]({});
        this.playing = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"](false);
    }
    // getSongDetail(id) {
    //   return this.http.get(`/wangyiyun-online/assets/api/song-${id}.json`);
    // }
    FooterService.prototype.getSongDetail = function (id) {
        return this.http.get("https://api.imjad.cn/cloudmusic/?type=song&id=" + id);
    };
    FooterService.prototype.getLyric = function (id) {
        return this.http.get("https://api.imjad.cn/cloudmusic/?type=lyric&id=" + id);
    };
    FooterService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]])
    ], FooterService);
    return FooterService;
}());



/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"home\">\n  <div class=\"playing\" *ngIf=\"playing\" [class.before-close]=\"beforeClose\">\n    <app-playing (close)=\"closePlaying()\"></app-playing>\n  </div>\n  <div class=\"left\">\n    <app-nav-recommend></app-nav-recommend>\n    <app-playing-preview (open)=\"openPlaying()\"></app-playing-preview>\n  </div>\n  <div class=\"right\">\n    <router-outlet></router-outlet>\n  </div>\n  <div class=\"bottom\">\n    <app-footer (open)=\"openPlayList()\"></app-footer>\n  </div>\n  <div class=\"play-list\" *ngIf=\"playList\">\n    <app-play-list (close)=\"closePlayList()\"></app-play-list>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/home/home.component.scss":
/*!******************************************!*\
  !*** ./src/app/home/home.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".home {\n  height: 100%;\n  width: 100%; }\n  .home .playing {\n    position: absolute;\n    left: 0;\n    overflow: hidden;\n    top: 100%;\n    height: 0;\n    width: 0;\n    background: #fff;\n    z-index: 100;\n    -webkit-animation: toBig 1s ease-in-out;\n            animation: toBig 1s ease-in-out;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards; }\n  .home .left {\n    width: 250px;\n    height: calc(100% - 50px);\n    border-right: 1px solid #e0e0e0;\n    float: left;\n    box-sizing: border-box;\n    background: #fff;\n    position: relative; }\n  .home .right {\n    width: calc(100% - 250px);\n    height: calc(100% - 50px);\n    float: left;\n    background: #fff;\n    padding: 0 20px;\n    overflow: auto; }\n  .home .bottom {\n    height: 50px;\n    width: 100%;\n    clear: both;\n    box-sizing: border-box;\n    border-top: 1px solid #e0e0e0;\n    background: #fff; }\n  .home .play-list {\n    position: absolute;\n    bottom: 50px;\n    right: 0;\n    width: 500px;\n    height: 70%;\n    z-index: 1000000;\n    background: #fff;\n    box-shadow: -2px -2px 7px rgba(0, 0, 0, 0.5);\n    overflow: auto; }\n  .home .before-close {\n    -webkit-animation: toSmall 1s ease-in-out;\n            animation: toSmall 1s ease-in-out;\n    -webkit-animation-fill-mode: forwards;\n            animation-fill-mode: forwards; }\n  @-webkit-keyframes toSmall {\n  0% {\n    height: calc(100% - 120px);\n    width: 100%;\n    top: 50px;\n    left: 0; }\n  50% {\n    width: 50px;\n    height: 50px;\n    top: 50%;\n    left: 50%; }\n  100% {\n    width: 0;\n    height: 0;\n    top: calc(100% - 50px);\n    left: 0; } }\n  @keyframes toSmall {\n  0% {\n    height: calc(100% - 120px);\n    width: 100%;\n    top: 50px;\n    left: 0; }\n  50% {\n    width: 50px;\n    height: 50px;\n    top: 50%;\n    left: 50%; }\n  100% {\n    width: 0;\n    height: 0;\n    top: calc(100% - 50px);\n    left: 0; } }\n  @-webkit-keyframes toBig {\n  0% {\n    width: 0;\n    height: 0;\n    top: calc(100% - 50px);\n    left: 0; }\n  50% {\n    width: 50px;\n    height: 50px;\n    top: 50%;\n    left: 50%; }\n  100% {\n    height: calc(100% - 100px);\n    width: 100%;\n    top: 50px;\n    left: 0; } }\n  @keyframes toBig {\n  0% {\n    width: 0;\n    height: 0;\n    top: calc(100% - 50px);\n    left: 0; }\n  50% {\n    width: 50px;\n    height: 50px;\n    top: 50%;\n    left: 50%; }\n  100% {\n    height: calc(100% - 100px);\n    width: 100%;\n    top: 50px;\n    left: 0; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9yZW5ob25nbC93YW5neWl5dW4tb25saW5lL3NyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksYUFBWTtFQUNaLFlBQVcsRUFnRWQ7RUFsRUQ7SUFLUSxtQkFBa0I7SUFDbEIsUUFBTztJQUNQLGlCQUFnQjtJQUtoQixVQUFTO0lBQ1QsVUFBUztJQUNULFNBQVE7SUFDUixpQkFBZ0I7SUFDaEIsYUFBWTtJQUVaLHdDQUErQjtZQUEvQixnQ0FBK0I7SUFDL0Isc0NBQTZCO1lBQTdCLDhCQUE2QixFQUNoQztFQXBCTDtJQXVCUSxhQUFZO0lBQ1osMEJBQXlCO0lBQ3pCLGdDQUErQjtJQUMvQixZQUFXO0lBQ1gsdUJBQXNCO0lBQ3RCLGlCQUFnQjtJQUNoQixtQkFBa0IsRUFDckI7RUE5Qkw7SUFpQ1EsMEJBQXlCO0lBQ3pCLDBCQUF5QjtJQUN6QixZQUFXO0lBQ1gsaUJBQWdCO0lBQ2hCLGdCQUFlO0lBQ2YsZUFBYyxFQUNqQjtFQXZDTDtJQTBDUSxhQUFZO0lBQ1osWUFBVztJQUNYLFlBQVc7SUFDWCx1QkFBc0I7SUFDdEIsOEJBQTZCO0lBQzdCLGlCQUFnQixFQUNuQjtFQWhETDtJQW1EUSxtQkFBa0I7SUFDbEIsYUFBWTtJQUNaLFNBQVE7SUFDUixhQUFZO0lBQ1osWUFBVztJQUNYLGlCQUFnQjtJQUNoQixpQkFBZ0I7SUFDaEIsNkNBQTRDO0lBQzVDLGVBQWMsRUFDakI7RUE1REw7SUErRFEsMENBQWlDO1lBQWpDLGtDQUFpQztJQUNqQyxzQ0FBNkI7WUFBN0IsOEJBQTZCLEVBQ2hDO0VBR0w7RUFDSTtJQUNJLDJCQUEwQjtJQUMxQixZQUFXO0lBQ1gsVUFBUztJQUNULFFBQU8sRUFBQTtFQUVYO0lBQ0ksWUFBVztJQUNYLGFBQVk7SUFDWixTQUFRO0lBQ1IsVUFBUyxFQUFBO0VBRWI7SUFDSSxTQUFRO0lBQ1IsVUFBUztJQUNULHVCQUFzQjtJQUN0QixRQUFPLEVBQUEsRUFBQTtFQWpCZjtFQUNJO0lBQ0ksMkJBQTBCO0lBQzFCLFlBQVc7SUFDWCxVQUFTO0lBQ1QsUUFBTyxFQUFBO0VBRVg7SUFDSSxZQUFXO0lBQ1gsYUFBWTtJQUNaLFNBQVE7SUFDUixVQUFTLEVBQUE7RUFFYjtJQUNJLFNBQVE7SUFDUixVQUFTO0lBQ1QsdUJBQXNCO0lBQ3RCLFFBQU8sRUFBQSxFQUFBO0VBSWY7RUFDSTtJQUNJLFNBQVE7SUFDUixVQUFTO0lBQ1QsdUJBQXNCO0lBQ3RCLFFBQU8sRUFBQTtFQUVYO0lBQ0ksWUFBVztJQUNYLGFBQVk7SUFDWixTQUFRO0lBQ1IsVUFBUyxFQUFBO0VBRWI7SUFDSSwyQkFBMEI7SUFDMUIsWUFBVztJQUNYLFVBQVM7SUFDVCxRQUFPLEVBQUEsRUFBQTtFQWpCZjtFQUNJO0lBQ0ksU0FBUTtJQUNSLFVBQVM7SUFDVCx1QkFBc0I7SUFDdEIsUUFBTyxFQUFBO0VBRVg7SUFDSSxZQUFXO0lBQ1gsYUFBWTtJQUNaLFNBQVE7SUFDUixVQUFTLEVBQUE7RUFFYjtJQUNJLDJCQUEwQjtJQUMxQixZQUFXO0lBQ1gsVUFBUztJQUNULFFBQU8sRUFBQSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbi5ob21le1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogMTAwJTtcblxuICAgIC5wbGF5aW5nIHtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAvLyB0b3A6IDUwcHg7XG4gICAgICAgIC8vIGhlaWdodDogY2FsYygxMDAlIC0gMTIwcHgpO1xuICAgICAgICAvLyB3aWR0aDogMTAwJTtcblxuICAgICAgICB0b3A6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICAgIHotaW5kZXg6IDEwMDtcblxuICAgICAgICBhbmltYXRpb246IHRvQmlnIDFzIGVhc2UtaW4tb3V0O1xuICAgICAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgICB9XG5cbiAgICAubGVmdHtcbiAgICAgICAgd2lkdGg6IDI1MHB4O1xuICAgICAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDUwcHgpO1xuICAgICAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjZTBlMGUwO1xuICAgICAgICBmbG9hdDogbGVmdDtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIH1cblxuICAgIC5yaWdodHtcbiAgICAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDI1MHB4KTtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA1MHB4KTtcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICAgIHBhZGRpbmc6IDAgMjBweDtcbiAgICAgICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgfVxuXG4gICAgLmJvdHRvbXtcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgY2xlYXI6IGJvdGg7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTBlMGUwO1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgIH1cblxuICAgIC5wbGF5LWxpc3R7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgYm90dG9tOiA1MHB4O1xuICAgICAgICByaWdodDogMDtcbiAgICAgICAgd2lkdGg6IDUwMHB4O1xuICAgICAgICBoZWlnaHQ6IDcwJTtcbiAgICAgICAgei1pbmRleDogMTAwMDAwMDtcbiAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgYm94LXNoYWRvdzogLTJweCAtMnB4IDdweCByZ2JhKDAsIDAsIDAsIDAuNSk7XG4gICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIH1cblxuICAgIC5iZWZvcmUtY2xvc2V7XG4gICAgICAgIGFuaW1hdGlvbjogdG9TbWFsbCAxcyBlYXNlLWluLW91dDtcbiAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XG4gICAgfVxufVxuXG5Aa2V5ZnJhbWVzIHRvU21hbGx7XG4gICAgMCV7XG4gICAgICAgIGhlaWdodDogY2FsYygxMDAlIC0gMTIwcHgpO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgdG9wOiA1MHB4O1xuICAgICAgICBsZWZ0OiAwO1xuICAgIH1cbiAgICA1MCV7XG4gICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgfVxuICAgIDEwMCV7XG4gICAgICAgIHdpZHRoOiAwO1xuICAgICAgICBoZWlnaHQ6IDA7XG4gICAgICAgIHRvcDogY2FsYygxMDAlIC0gNTBweCk7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgfVxufVxuXG5Aa2V5ZnJhbWVzIHRvQmlne1xuICAgIDAle1xuICAgICAgICB3aWR0aDogMDtcbiAgICAgICAgaGVpZ2h0OiAwO1xuICAgICAgICB0b3A6IGNhbGMoMTAwJSAtIDUwcHgpO1xuICAgICAgICBsZWZ0OiAwO1xuICAgIH1cbiAgICA1MCV7XG4gICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBsZWZ0OiA1MCU7XG4gICAgfVxuICAgIDEwMCV7XG4gICAgICAgIGhlaWdodDogY2FsYygxMDAlIC0gMTAwcHgpO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgdG9wOiA1MHB4O1xuICAgICAgICBsZWZ0OiAwO1xuICAgIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _home_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.service */ "./src/app/home/home.service.ts");
/* harmony import */ var nosleep_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nosleep.js */ "./node_modules/nosleep.js/src/index.js");
/* harmony import */ var nosleep_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(nosleep_js__WEBPACK_IMPORTED_MODULE_3__);




var HomeComponent = /** @class */ (function () {
    function HomeComponent(homeSer) {
        this.homeSer = homeSer;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.homeSer.getPlayList('0001').subscribe(function (data) {
            _this.homeSer.playList.next(data['songs']);
        });
        var noSleep = new nosleep_js__WEBPACK_IMPORTED_MODULE_3___default.a();
        document.addEventListener('touchstart', function enableNoSleep() {
            document.removeEventListener('touchstart', enableNoSleep, false);
            noSleep.enable();
        }, false);
    };
    HomeComponent.prototype.openPlaying = function () {
        this.playing = true;
    };
    HomeComponent.prototype.closePlaying = function () {
        var _this = this;
        this.beforeClose = true;
        setTimeout(function () {
            _this.playing = false;
            _this.beforeClose = false;
        }, 1000);
    };
    HomeComponent.prototype.openPlayList = function () {
        this.playList = !this.playList;
    };
    HomeComponent.prototype.closePlayList = function () {
        this.playList = false;
    };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_home_service__WEBPACK_IMPORTED_MODULE_2__["HomeService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _navigation_navigation_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../navigation/navigation.module */ "./src/app/navigation/navigation.module.ts");
/* harmony import */ var _find_music_find_music_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../find-music/find-music.module */ "./src/app/find-music/find-music.module.ts");
/* harmony import */ var _find_music_find_music_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../find-music/find-music.component */ "./src/app/find-music/find-music.component.ts");
/* harmony import */ var _private_fm_private_fm_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../private-fm/private-fm.module */ "./src/app/private-fm/private-fm.module.ts");
/* harmony import */ var _private_fm_private_fm_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../private-fm/private-fm.component */ "./src/app/private-fm/private-fm.component.ts");
/* harmony import */ var _song_list_song_list_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../song-list/song-list.component */ "./src/app/song-list/song-list.component.ts");
/* harmony import */ var _search_result_search_result_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../search-result/search-result.component */ "./src/app/search-result/search-result.component.ts");
/* harmony import */ var _footer_footer_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../footer/footer.module */ "./src/app/footer/footer.module.ts");
/* harmony import */ var _playing_playing_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../playing/playing.module */ "./src/app/playing/playing.module.ts");
/* harmony import */ var _play_list_play_list_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../play-list/play-list.module */ "./src/app/play-list/play-list.module.ts");
/* harmony import */ var _song_list_song_list_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../song-list/song-list.module */ "./src/app/song-list/song-list.module.ts");
/* harmony import */ var _search_result_search_result_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../search-result/search-result.module */ "./src/app/search-result/search-result.module.ts");

















var routes = [
    {
        path: '',
        component: _home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"],
        children: [
            {
                path: '',
                component: _find_music_find_music_component__WEBPACK_IMPORTED_MODULE_7__["FindMusicComponent"]
            },
            {
                path: 'findMusic',
                component: _find_music_find_music_component__WEBPACK_IMPORTED_MODULE_7__["FindMusicComponent"]
            },
            {
                path: 'privateFm',
                component: _private_fm_private_fm_component__WEBPACK_IMPORTED_MODULE_9__["PrivateFmComponent"]
            },
            {
                path: 'songList/:id',
                component: _song_list_song_list_component__WEBPACK_IMPORTED_MODULE_10__["SongListComponent"]
            },
            {
                path: 'searchResult/:keyword',
                component: _search_result_search_result_component__WEBPACK_IMPORTED_MODULE_11__["SearchResultComponent"]
            }
        ]
    }
];
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes),
                _navigation_navigation_module__WEBPACK_IMPORTED_MODULE_5__["NavigationModule"],
                _find_music_find_music_module__WEBPACK_IMPORTED_MODULE_6__["FindMusicModule"],
                _private_fm_private_fm_module__WEBPACK_IMPORTED_MODULE_8__["PrivateFmModule"],
                _footer_footer_module__WEBPACK_IMPORTED_MODULE_12__["FooterModule"],
                _playing_playing_module__WEBPACK_IMPORTED_MODULE_13__["PlayingModule"],
                _play_list_play_list_module__WEBPACK_IMPORTED_MODULE_14__["PlayListModule"],
                _song_list_song_list_module__WEBPACK_IMPORTED_MODULE_15__["SongListModule"],
                _search_result_search_result_module__WEBPACK_IMPORTED_MODULE_16__["SearchResultModule"]
            ]
        })
    ], HomeModule);
    return HomeModule;
}());



/***/ }),

/***/ "./src/app/home/home.service.ts":
/*!**************************************!*\
  !*** ./src/app/home/home.service.ts ***!
  \**************************************/
/*! exports provided: HomeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeService", function() { return HomeService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");




var HomeService = /** @class */ (function () {
    function HomeService(http) {
        this.http = http;
        this.playList = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]([]);
        this.historyList = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"]([]);
    }
    HomeService.prototype.getPlayList = function (id) {
        return this.http.get("/wangyiyun-online/assets/api/song-list-" + id + ".json");
    };
    HomeService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], HomeService);
    return HomeService;
}());



/***/ }),

/***/ "./src/app/navigation/created-songs/created-songs.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/navigation/created-songs/created-songs.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  created-songs works!\n</p>\n"

/***/ }),

/***/ "./src/app/navigation/created-songs/created-songs.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/navigation/created-songs/created-songs.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL25hdmlnYXRpb24vY3JlYXRlZC1zb25ncy9jcmVhdGVkLXNvbmdzLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/navigation/created-songs/created-songs.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/navigation/created-songs/created-songs.component.ts ***!
  \*********************************************************************/
/*! exports provided: CreatedSongsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreatedSongsComponent", function() { return CreatedSongsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CreatedSongsComponent = /** @class */ (function () {
    function CreatedSongsComponent() {
    }
    CreatedSongsComponent.prototype.ngOnInit = function () {
    };
    CreatedSongsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-created-songs',
            template: __webpack_require__(/*! ./created-songs.component.html */ "./src/app/navigation/created-songs/created-songs.component.html"),
            styles: [__webpack_require__(/*! ./created-songs.component.scss */ "./src/app/navigation/created-songs/created-songs.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], CreatedSongsComponent);
    return CreatedSongsComponent;
}());



/***/ }),

/***/ "./src/app/navigation/my-music/my-music.component.html":
/*!*************************************************************!*\
  !*** ./src/app/navigation/my-music/my-music.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  my-music works!\n</p>\n"

/***/ }),

/***/ "./src/app/navigation/my-music/my-music.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/navigation/my-music/my-music.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL25hdmlnYXRpb24vbXktbXVzaWMvbXktbXVzaWMuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/navigation/my-music/my-music.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/navigation/my-music/my-music.component.ts ***!
  \***********************************************************/
/*! exports provided: MyMusicComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyMusicComponent", function() { return MyMusicComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MyMusicComponent = /** @class */ (function () {
    function MyMusicComponent() {
    }
    MyMusicComponent.prototype.ngOnInit = function () {
    };
    MyMusicComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-my-music',
            template: __webpack_require__(/*! ./my-music.component.html */ "./src/app/navigation/my-music/my-music.component.html"),
            styles: [__webpack_require__(/*! ./my-music.component.scss */ "./src/app/navigation/my-music/my-music.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MyMusicComponent);
    return MyMusicComponent;
}());



/***/ }),

/***/ "./src/app/navigation/navigation.module.ts":
/*!*************************************************!*\
  !*** ./src/app/navigation/navigation.module.ts ***!
  \*************************************************/
/*! exports provided: NavigationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationModule", function() { return NavigationModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _recommend_recommend_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recommend/recommend.component */ "./src/app/navigation/recommend/recommend.component.ts");
/* harmony import */ var _my_music_my_music_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./my-music/my-music.component */ "./src/app/navigation/my-music/my-music.component.ts");
/* harmony import */ var _created_songs_created_songs_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./created-songs/created-songs.component */ "./src/app/navigation/created-songs/created-songs.component.ts");
/* harmony import */ var _playing_preview_playing_preview_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./playing-preview/playing-preview.component */ "./src/app/navigation/playing-preview/playing-preview.component.ts");
/* harmony import */ var _selected_selected_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./selected/selected.component */ "./src/app/navigation/selected/selected.component.ts");
/* harmony import */ var _share_ui_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../share/ui.module */ "./src/app/share/ui.module.ts");









var NavigationModule = /** @class */ (function () {
    function NavigationModule() {
    }
    NavigationModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_recommend_recommend_component__WEBPACK_IMPORTED_MODULE_3__["RecommendComponent"], _my_music_my_music_component__WEBPACK_IMPORTED_MODULE_4__["MyMusicComponent"], _created_songs_created_songs_component__WEBPACK_IMPORTED_MODULE_5__["CreatedSongsComponent"], _playing_preview_playing_preview_component__WEBPACK_IMPORTED_MODULE_6__["PlayingPreviewComponent"], _selected_selected_component__WEBPACK_IMPORTED_MODULE_7__["SelectedComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _share_ui_module__WEBPACK_IMPORTED_MODULE_8__["UiModule"]
            ],
            exports: [_recommend_recommend_component__WEBPACK_IMPORTED_MODULE_3__["RecommendComponent"], _my_music_my_music_component__WEBPACK_IMPORTED_MODULE_4__["MyMusicComponent"], _created_songs_created_songs_component__WEBPACK_IMPORTED_MODULE_5__["CreatedSongsComponent"], _playing_preview_playing_preview_component__WEBPACK_IMPORTED_MODULE_6__["PlayingPreviewComponent"]]
        })
    ], NavigationModule);
    return NavigationModule;
}());



/***/ }),

/***/ "./src/app/navigation/playing-preview/playing-preview.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/navigation/playing-preview/playing-preview.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"playing-preview\">\n  <div class=\"logo\" [style.background]=\"'url(' + songDetail.preview + ')'\" (click)=\"openPlaying()\">\n\n  </div>\n  <div class=\"expand\" (click)=\"openPlaying()\">\n    <i class=\"material-icons forward\">\n      arrow_forward\n    </i>\n    <i class=\"material-icons back\">\n      arrow_back\n    </i>\n  </div>\n  <div class=\"infor\">\n    <div class=\"name\">\n      {{songDetail.name}}\n    </div>\n    <div class=\"author\">\n      {{songDetail.author}}\n    </div>\n  </div>\n  <div class=\"action\">\n    <i class=\"like fas fa-heart\"></i>\n    <i class=\"delete fas fa-trash-alt\"></i>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/navigation/playing-preview/playing-preview.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/navigation/playing-preview/playing-preview.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".playing-preview {\n  height: 60px;\n  border-top: 1px solid #e0e0e0;\n  position: absolute;\n  bottom: 0;\n  width: 100%; }\n  .playing-preview .logo {\n    width: 50px;\n    height: 50px;\n    float: left;\n    margin: 5px;\n    cursor: pointer;\n    background-repeat: no-repeat !important;\n    background-size: cover !important; }\n  .playing-preview .expand {\n    position: absolute;\n    left: 5px;\n    top: 5px;\n    width: 50px;\n    height: 50px;\n    color: #ffffff;\n    font-size: 50px;\n    text-align: center;\n    line-height: 50px;\n    opacity: 0;\n    cursor: pointer;\n    background: #0c0c0c61; }\n  .playing-preview .expand:hover {\n      opacity: 1; }\n  .playing-preview .expand i.forward {\n      position: absolute;\n      left: 0;\n      top: 25px;\n      transform: rotate(140deg); }\n  .playing-preview .expand i.back {\n      position: absolute;\n      right: 0;\n      top: 5px;\n      transform: rotate(140deg); }\n  .playing-preview .infor {\n    width: 140px;\n    height: 60px;\n    float: left; }\n  .playing-preview .infor .name {\n      height: 30px;\n      line-height: 30px;\n      font-size: 12px;\n      cursor: pointer;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n  .playing-preview .infor .author {\n      height: 30px;\n      line-height: 30px;\n      font-size: 12px;\n      color: gray;\n      cursor: pointer;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap; }\n  .playing-preview .action {\n    width: 49px;\n    float: left; }\n  .playing-preview .action .like {\n      display: block;\n      height: 30px;\n      line-height: 30px;\n      text-align: right;\n      padding-right: 10px;\n      color: grey;\n      cursor: pointer; }\n  .playing-preview .action .delete {\n      display: block;\n      height: 30px;\n      line-height: 30px;\n      text-align: right;\n      padding-right: 10px;\n      color: grey;\n      cursor: pointer; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9yZW5ob25nbC93YW5neWl5dW4tb25saW5lL3NyYy9hcHAvbmF2aWdhdGlvbi9wbGF5aW5nLXByZXZpZXcvcGxheWluZy1wcmV2aWV3LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBWTtFQUNaLDhCQUE2QjtFQUM3QixtQkFBa0I7RUFDbEIsVUFBUztFQUNULFlBQVcsRUFnR2Q7RUFyR0Q7SUFRUSxZQUFXO0lBQ1gsYUFBWTtJQUNaLFlBQVc7SUFDWCxZQUFXO0lBQ1gsZ0JBQWU7SUFDZix3Q0FBdUM7SUFDdkMsa0NBQWlDLEVBQ3BDO0VBZkw7SUFrQlEsbUJBQWtCO0lBQ2xCLFVBQVM7SUFDVCxTQUFRO0lBQ1IsWUFBVztJQUNYLGFBQVk7SUFDWixlQUFjO0lBQ2QsZ0JBQWU7SUFDZixtQkFBa0I7SUFDbEIsa0JBQWlCO0lBQ2pCLFdBQVU7SUFDVixnQkFBZTtJQUNmLHNCQUFxQixFQW1CeEI7RUFoREw7TUFnQ1ksV0FBVSxFQUNiO0VBakNUO01Bb0NZLG1CQUFrQjtNQUNsQixRQUFPO01BQ1AsVUFBUztNQUNULDBCQUF5QixFQUM1QjtFQXhDVDtNQTJDWSxtQkFBa0I7TUFDbEIsU0FBUTtNQUNSLFNBQVE7TUFDUiwwQkFBeUIsRUFDNUI7RUEvQ1Q7SUFtRFEsYUFBWTtJQUNaLGFBQVk7SUFDWixZQUFXLEVBc0JkO0VBM0VMO01Bd0RZLGFBQVk7TUFDWixrQkFBaUI7TUFDakIsZ0JBQWU7TUFDZixnQkFBZTtNQUNmLGlCQUFnQjtNQUNoQix3QkFBdUI7TUFDdkIsb0JBQW1CLEVBQ3RCO0VBL0RUO01Ba0VZLGFBQVk7TUFDWixrQkFBaUI7TUFDakIsZ0JBQWU7TUFDZixZQUFXO01BQ1gsZ0JBQWU7TUFDZixpQkFBZ0I7TUFDaEIsd0JBQXVCO01BQ3ZCLG9CQUFtQixFQUN0QjtFQTFFVDtJQThFUSxZQUFXO0lBQ1gsWUFBVyxFQXFCZDtFQXBHTDtNQWtGWSxlQUFjO01BQ2QsYUFBWTtNQUNaLGtCQUFpQjtNQUNqQixrQkFBaUI7TUFDakIsb0JBQW1CO01BQ25CLFlBQVc7TUFDWCxnQkFBZSxFQUNsQjtFQXpGVDtNQTRGWSxlQUFjO01BQ2QsYUFBWTtNQUNaLGtCQUFpQjtNQUNqQixrQkFBaUI7TUFDakIsb0JBQW1CO01BQ25CLFlBQVc7TUFDWCxnQkFBZSxFQUNsQiIsImZpbGUiOiJzcmMvYXBwL25hdmlnYXRpb24vcGxheWluZy1wcmV2aWV3L3BsYXlpbmctcHJldmlldy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wbGF5aW5nLXByZXZpZXd7XG4gICAgaGVpZ2h0OiA2MHB4O1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTBlMGUwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3R0b206IDA7XG4gICAgd2lkdGg6IDEwMCU7XG5cbiAgICAubG9nb3tcbiAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XG4gICAgICAgIG1hcmdpbjogNXB4O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQgIWltcG9ydGFudDtcbiAgICAgICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlciAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC5leHBhbmR7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgbGVmdDogNXB4O1xuICAgICAgICB0b3A6IDVweDtcbiAgICAgICAgd2lkdGg6IDUwcHg7XG4gICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgICAgIGZvbnQtc2l6ZTogNTBweDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBsaW5lLWhlaWdodDogNTBweDtcbiAgICAgICAgb3BhY2l0eTogMDtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBiYWNrZ3JvdW5kOiAjMGMwYzBjNjE7XG5cbiAgICAgICAgJjpob3ZlcntcbiAgICAgICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIH1cblxuICAgICAgICBpLmZvcndhcmR7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgdG9wOiAyNXB4O1xuICAgICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTQwZGVnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGkuYmFja3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICAgICAgdG9wOiA1cHg7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxNDBkZWcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLmluZm9ye1xuICAgICAgICB3aWR0aDogMTQwcHg7XG4gICAgICAgIGhlaWdodDogNjBweDtcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XG5cbiAgICAgICAgLm5hbWV7XG4gICAgICAgICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMzBweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIH1cblxuICAgICAgICAuYXV0aG9ye1xuICAgICAgICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICBjb2xvcjogZ3JheTtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuYWN0aW9ue1xuICAgICAgICB3aWR0aDogNDlweDtcbiAgICAgICAgZmxvYXQ6IGxlZnQ7XG5cbiAgICAgICAgLmxpa2V7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIGhlaWdodDogMzBweDtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuICAgICAgICAgICAgY29sb3I6IGdyZXk7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAuZGVsZXRle1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMzBweDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICAgICAgcGFkZGluZy1yaWdodDogMTBweDtcbiAgICAgICAgICAgIGNvbG9yOiBncmV5O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/navigation/playing-preview/playing-preview.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/navigation/playing-preview/playing-preview.component.ts ***!
  \*************************************************************************/
/*! exports provided: PlayingPreviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayingPreviewComponent", function() { return PlayingPreviewComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _footer_footer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../footer/footer.service */ "./src/app/footer/footer.service.ts");



var PlayingPreviewComponent = /** @class */ (function () {
    function PlayingPreviewComponent(footerSer) {
        this.footerSer = footerSer;
        this.open = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    PlayingPreviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.footerSer.songDetail.subscribe(function (data) {
            _this.songDetail = data;
        });
    };
    PlayingPreviewComponent.prototype.openPlaying = function () {
        this.open.emit('open');
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PlayingPreviewComponent.prototype, "open", void 0);
    PlayingPreviewComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-playing-preview',
            template: __webpack_require__(/*! ./playing-preview.component.html */ "./src/app/navigation/playing-preview/playing-preview.component.html"),
            styles: [__webpack_require__(/*! ./playing-preview.component.scss */ "./src/app/navigation/playing-preview/playing-preview.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_footer_footer_service__WEBPACK_IMPORTED_MODULE_2__["FooterService"]])
    ], PlayingPreviewComponent);
    return PlayingPreviewComponent;
}());



/***/ }),

/***/ "./src/app/navigation/recommend/recommend.component.html":
/*!***************************************************************!*\
  !*** ./src/app/navigation/recommend/recommend.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"recommend\">\n  <div class=\"title\">推荐</div>\n  <app-nav-selected path=\"/home\" icon=\"fas fa-music\" label=\"发现音乐\" (click)=\"navigateTo('/home')\"></app-nav-selected>\n  <app-nav-selected path=\"/home/privateFm\" icon=\"fas fa-microphone-alt\" label=\"私人FM\" (click)=\"navigateTo('/home/privateFm')\"></app-nav-selected>\n  <app-nav-selected path=\"/home/vv\" icon=\"fas fa-eye\" label=\"LOOK直播\"></app-nav-selected>\n  <app-nav-selected path=\"/home/aa\" icon=\"fas fa-video\" label=\"视频\"></app-nav-selected>\n  <app-nav-selected path=\"/home/cc\" icon=\"fas fa-user-friends\" label=\"朋友\"></app-nav-selected>\n</div>\n\n\n<div class=\"recommend\">\n  <div class=\"title\">我的音乐</div>\n  <app-nav-selected path=\"/home/hh\" icon=\"fas fa-folder-open\" label=\"本地音乐\"></app-nav-selected>\n  <app-nav-selected path=\"/home/dd\" icon=\"fas fas fa-download\" label=\"下载管理\"></app-nav-selected>\n</div>\n\n\n<div class=\"recommend\">\n  <div class=\"title\">创建的歌单</div>\n  <app-nav-selected path=\"/home/hh\" icon=\"fas fa-heart\" label=\"我喜欢的音乐\"></app-nav-selected>\n</div>"

/***/ }),

/***/ "./src/app/navigation/recommend/recommend.component.scss":
/*!***************************************************************!*\
  !*** ./src/app/navigation/recommend/recommend.component.scss ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".recommend .title {\n  padding-left: 10px;\n  height: 35px;\n  line-height: 35px;\n  font-size: 14px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9yZW5ob25nbC93YW5neWl5dW4tb25saW5lL3NyYy9hcHAvbmF2aWdhdGlvbi9yZWNvbW1lbmQvcmVjb21tZW5kLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBRVEsbUJBQWtCO0VBQ2xCLGFBQVk7RUFDWixrQkFBaUI7RUFDakIsZ0JBQWUsRUFDbEIiLCJmaWxlIjoic3JjL2FwcC9uYXZpZ2F0aW9uL3JlY29tbWVuZC9yZWNvbW1lbmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuLnJlY29tbWVuZHtcbiAgICAudGl0bGV7XG4gICAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgICAgICAgaGVpZ2h0OiAzNXB4O1xuICAgICAgICBsaW5lLWhlaWdodDogMzVweDtcbiAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/navigation/recommend/recommend.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/navigation/recommend/recommend.component.ts ***!
  \*************************************************************/
/*! exports provided: RecommendComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecommendComponent", function() { return RecommendComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var RecommendComponent = /** @class */ (function () {
    function RecommendComponent(router) {
        this.router = router;
    }
    RecommendComponent.prototype.ngOnInit = function () {
    };
    RecommendComponent.prototype.navigateTo = function (path) {
        this.router.navigate([path]);
    };
    RecommendComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-nav-recommend',
            template: __webpack_require__(/*! ./recommend.component.html */ "./src/app/navigation/recommend/recommend.component.html"),
            styles: [__webpack_require__(/*! ./recommend.component.scss */ "./src/app/navigation/recommend/recommend.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], RecommendComponent);
    return RecommendComponent;
}());



/***/ }),

/***/ "./src/app/navigation/selected/selected.component.html":
/*!*************************************************************!*\
  !*** ./src/app/navigation/selected/selected.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"nav-selected\" [class.selected]=\"selected\">\n  <i [class]=\"icon\"></i><span class=\"label\">{{label}}</span>\n</div>"

/***/ }),

/***/ "./src/app/navigation/selected/selected.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/navigation/selected/selected.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".nav-selected {\n  height: 30px;\n  line-height: 30px;\n  font-size: 13px;\n  cursor: pointer;\n  padding-left: 20px;\n  border-left: 4px solid #fff; }\n  .nav-selected .label {\n    margin-left: 10px; }\n  .selected {\n  border-left: 4px solid #5b8be6;\n  background: #f3f3f3; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9yZW5ob25nbC93YW5neWl5dW4tb25saW5lL3NyYy9hcHAvbmF2aWdhdGlvbi9zZWxlY3RlZC9zZWxlY3RlZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQVk7RUFDWixrQkFBaUI7RUFDakIsZ0JBQWU7RUFDZixnQkFBZTtFQUNmLG1CQUFrQjtFQUNsQiw0QkFBMkIsRUFLOUI7RUFYRDtJQVNRLGtCQUFpQixFQUNwQjtFQUdMO0VBQ0ksK0JBQThCO0VBQzlCLG9CQUFtQixFQUN0QiIsImZpbGUiOiJzcmMvYXBwL25hdmlnYXRpb24vc2VsZWN0ZWQvc2VsZWN0ZWQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubmF2LXNlbGVjdGVke1xuICAgIGhlaWdodDogMzBweDtcbiAgICBsaW5lLWhlaWdodDogMzBweDtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHBhZGRpbmctbGVmdDogMjBweDtcbiAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICNmZmY7XG5cbiAgICAubGFiZWx7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICAgIH1cbn1cblxuLnNlbGVjdGVke1xuICAgIGJvcmRlci1sZWZ0OiA0cHggc29saWQgIzViOGJlNjtcbiAgICBiYWNrZ3JvdW5kOiAjZjNmM2YzO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/navigation/selected/selected.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/navigation/selected/selected.component.ts ***!
  \***********************************************************/
/*! exports provided: SelectedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectedComponent", function() { return SelectedComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var SelectedComponent = /** @class */ (function () {
    function SelectedComponent(router) {
        var _this = this;
        this.router = router;
        router.events.subscribe(function (val) {
            _this.checkSelected(router.url);
        });
    }
    SelectedComponent.prototype.checkSelected = function (url) {
        if (this.path === url) {
            this.selected = true;
        }
        else {
            this.selected = false;
        }
    };
    SelectedComponent.prototype.ngOnInit = function () {
        this.checkSelected(this.router.url);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], SelectedComponent.prototype, "icon", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SelectedComponent.prototype, "label", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], SelectedComponent.prototype, "path", void 0);
    SelectedComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-nav-selected',
            template: __webpack_require__(/*! ./selected.component.html */ "./src/app/navigation/selected/selected.component.html"),
            styles: [__webpack_require__(/*! ./selected.component.scss */ "./src/app/navigation/selected/selected.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], SelectedComponent);
    return SelectedComponent;
}());



/***/ }),

/***/ "./src/app/play-list/play-list.component.html":
/*!****************************************************!*\
  !*** ./src/app/play-list/play-list.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"play-list-con\">\n  <div class=\"header\">\n    <button [class.selected]=\"showList\" class=\"list\" (click)=\"showListPage()\">播放列表</button>\n    <button [class.selected]=\"!showList\" class=\"history\" (click)=\"showHistory()\">历史记录</button>\n  </div>\n\n  <div class=\"content\">\n    <div class=\"list\" *ngIf=\"showList\">\n      <div class=\"total\">\n        总{{playList.length}}首\n        <span class=\"clear-all\" (click)=\"clearAll()\">\n          <i class=\"far fa-trash-alt\" title=\"删除\"></i>\n          删除所有 \n        </span>\n      </div>\n      <div class=\"item-con\">\n        <div class=\"item\" *ngFor=\"let item of playList;\" (click)=\"singleClick(item)\" (dblclick)=\"doubleClick(item)\">\n          <span class=\"playing\" [style.color]=\"theme\">\n            <i *ngIf=\"item.id === currentSong.id\" class=\"fas fa-headphones\"></i>\n          </span>\n          <span class=\"play\">\n            <i class=\"far fa-play-circle\"  title=\"播放\" (click)=\"playThisMusic(item)\"></i>\n            <i class=\"far fa-trash-alt\" title=\"删除\" (click)=\"removeThisMusic(item)\"></i>\n          </span>\n          <span class=\"name\">{{item.name}}</span>\n          <span class=\"status\" *ngIf=\"item.vip\">SQ</span>\n          <span class=\"time\">{{item.time}}</span>\n          <span class=\"from\" [title]=\"item.source\">\n            <!-- <i class=\"material-icons\">\n              link\n            </i> -->\n          </span>\n          <span class=\"author\">{{item.author}}</span>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"history\" *ngIf=\"!showList\">\n      <div class=\"total\">\n        总{{historyList.length}}首\n      </div>\n      <div class=\"item-con\">\n        <div class=\"item\" *ngFor=\"let item of historyList;\" (click)=\"singleClick(item)\" (dblclick)=\"doubleClick(item)\">\n          <span class=\"playing\">\n            <!-- <i *ngIf=\"item.id === currentSong.id\" class=\"fas fa-headphones\"></i> -->\n          </span>\n          <span class=\"play\">\n            <i class=\"far fa-play-circle\"  title=\"播放\" (click)=\"playThisMusic(item)\"></i>\n            <!-- <i class=\"far fa-trash-alt\" title=\"删除\" (click)=\"removeThisMusic(item)\"></i> -->\n          </span>\n          <span class=\"name\">{{item.name}}</span>\n          <span class=\"status\" *ngIf=\"item.vip\">SQ</span>\n          <span class=\"time\">{{item.time}}</span>\n          <span class=\"from\" [title]=\"item.source\">\n            <!-- <i class=\"material-icons\">\n              link\n            </i> -->\n          </span>\n          <span class=\"author\">{{item.author}}</span>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  \n</div>\n"

/***/ }),

/***/ "./src/app/play-list/play-list.component.scss":
/*!****************************************************!*\
  !*** ./src/app/play-list/play-list.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".play-list-con {\n  width: 100%;\n  height: 100%; }\n  .play-list-con .content {\n    height: calc(100% - 40px);\n    width: 100%; }\n  .play-list-con .content .list {\n      height: 100%; }\n  .play-list-con .content .history {\n      height: 100%; }\n  .play-list-con .content .total {\n      height: 30px;\n      line-height: 30px;\n      padding-left: 30px;\n      font-size: 12px;\n      border-bottom: 1px solid gainsboro; }\n  .play-list-con .content .total span.clear-all {\n        float: right;\n        margin-right: 5px;\n        cursor: pointer; }\n  .play-list-con .content .item-con {\n      height: calc(100% - 30px);\n      overflow: auto; }\n  .play-list-con .content .item-con .item:nth-child(odd) {\n        background: #fff; }\n  .play-list-con .content .item-con .item:nth-child(even) {\n        background: #fbfbfb; }\n  .play-list-con .content .item-con .item:hover {\n        background: #e2e2e2 !important; }\n  .play-list-con .content .item-con .item {\n        height: 30px;\n        line-height: 30px;\n        padding: 0 10px 0 10px;\n        color: #000;\n        font-size: 13px;\n        cursor: pointer;\n        -webkit-user-select: none;\n           -moz-user-select: none;\n            -ms-user-select: none;\n                user-select: none; }\n  .play-list-con .content .item-con .item .playing {\n          display: inline-block;\n          width: 5%; }\n  .play-list-con .content .item-con .item .play {\n          display: inline-block;\n          width: 10%; }\n  .play-list-con .content .item-con .item .play:hover {\n            color: #000; }\n  .play-list-con .content .item-con .item .play i {\n            margin-right: 5px;\n            color: #a7a7a7; }\n  .play-list-con .content .item-con .item .play i:hover {\n              color: #000; }\n  .play-list-con .content .item-con .item span.status {\n          margin-left: 10px;\n          border: 1px solid red;\n          padding: 0px 4px 0 4px;\n          color: red;\n          border-radius: 3px;\n          font-size: 9px; }\n  .play-list-con .content .item-con .item span.time {\n          float: right;\n          padding: 0 10px 0 10px; }\n  .play-list-con .content .item-con .item .from {\n          float: right;\n          padding: 0 10px 0 10px;\n          display: flex;\n          padding-top: 3px;\n          color: #cccccc;\n          transform: rotate(-45deg); }\n  .play-list-con .content .item-con .item .from i {\n            font-size: 18px;\n            margin: 4px; }\n  .play-list-con .content .item-con .item .author {\n          float: right; }\n  .play-list-con .header {\n    height: 40px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: #f3f3f3;\n    border-bottom: 1px solid #cacaca; }\n  .play-list-con .header .list {\n      border: 1px solid gray;\n      height: 25px;\n      line-height: 20px;\n      font-size: 12px;\n      background: #fff;\n      color: gray;\n      display: inline-block;\n      border-radius: 5px 0 0 5px;\n      width: 80px;\n      outline: none;\n      cursor: pointer; }\n  .play-list-con .header .history {\n      border: 1px solid gray;\n      height: 25px;\n      line-height: 20px;\n      font-size: 12px;\n      background: #fff;\n      color: gray;\n      border-radius: 0 5px 5px 0;\n      display: inline-block;\n      width: 80px;\n      outline: none;\n      cursor: pointer; }\n  .play-list-con .header .selected {\n      background: gray !important;\n      color: #fff !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9yZW5ob25nbC93YW5neWl5dW4tb25saW5lL3NyYy9hcHAvcGxheS1saXN0L3BsYXktbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQVc7RUFDWCxhQUFZLEVBd0pmO0VBMUpEO0lBS1EsMEJBQXlCO0lBQ3pCLFlBQVcsRUF5R2Q7RUEvR0w7TUFTWSxhQUFZLEVBQ2Y7RUFWVDtNQWFZLGFBQVksRUFDZjtFQWRUO01BaUJZLGFBQVk7TUFDWixrQkFBaUI7TUFDakIsbUJBQWtCO01BQ2xCLGdCQUFlO01BQ2YsbUNBQWtDLEVBT3JDO0VBNUJUO1FBd0JnQixhQUFZO1FBQ1osa0JBQWlCO1FBQ2pCLGdCQUFlLEVBQ2xCO0VBM0JiO01BK0JZLDBCQUF5QjtNQUN6QixlQUFjLEVBOEVqQjtFQTlHVDtRQW1DZ0IsaUJBQWdCLEVBQ25CO0VBcENiO1FBdUNnQixvQkFBbUIsRUFDdEI7RUF4Q2I7UUEyQ2dCLCtCQUE4QixFQUNqQztFQTVDYjtRQStDZ0IsYUFBWTtRQUNaLGtCQUFpQjtRQUNqQix1QkFBc0I7UUFDdEIsWUFBVztRQUNYLGdCQUFlO1FBQ2YsZ0JBQWU7UUFDZiwwQkFBaUI7V0FBakIsdUJBQWlCO1lBQWpCLHNCQUFpQjtnQkFBakIsa0JBQWlCLEVBd0RwQjtFQTdHYjtVQXdEb0Isc0JBQXFCO1VBQ3JCLFVBQVMsRUFFWjtFQTNEakI7VUE4RG9CLHNCQUFxQjtVQUNyQixXQUFVLEVBYWI7RUE1RWpCO1lBa0V3QixZQUFXLEVBQ2Q7RUFuRXJCO1lBc0V3QixrQkFBaUI7WUFDakIsZUFBYyxFQUlqQjtFQTNFckI7Y0F5RTRCLFlBQVcsRUFDZDtFQTFFekI7VUErRW9CLGtCQUFpQjtVQUNqQixzQkFBcUI7VUFDckIsdUJBQXNCO1VBQ3RCLFdBQVU7VUFDVixtQkFBa0I7VUFDbEIsZUFBYyxFQUNqQjtFQXJGakI7VUF3Rm9CLGFBQVk7VUFDWix1QkFBc0IsRUFDekI7RUExRmpCO1VBNkZvQixhQUFZO1VBQ1osdUJBQXNCO1VBQ3RCLGNBQWE7VUFDYixpQkFBZ0I7VUFDaEIsZUFBYztVQUNkLDBCQUF5QixFQU01QjtFQXhHakI7WUFxR3dCLGdCQUFlO1lBQ2YsWUFBVyxFQUNkO0VBdkdyQjtVQTJHb0IsYUFBWSxFQUNmO0VBNUdqQjtJQWtIUSxhQUFZO0lBQ1osY0FBYTtJQUNiLHdCQUF1QjtJQUN2QixvQkFBbUI7SUFDbkIsb0JBQW1CO0lBQ25CLGlDQUFnQyxFQWtDbkM7RUF6Skw7TUEwSFksdUJBQXNCO01BQ3RCLGFBQVk7TUFDWixrQkFBaUI7TUFDakIsZ0JBQWU7TUFDZixpQkFBZ0I7TUFDaEIsWUFBVztNQUNYLHNCQUFxQjtNQUNyQiwyQkFBMEI7TUFDMUIsWUFBVztNQUNYLGNBQWE7TUFDYixnQkFBZSxFQUNsQjtFQXJJVDtNQXdJWSx1QkFBc0I7TUFDdEIsYUFBWTtNQUNaLGtCQUFpQjtNQUNqQixnQkFBZTtNQUNmLGlCQUFnQjtNQUNoQixZQUFXO01BQ1gsMkJBQTBCO01BQzFCLHNCQUFxQjtNQUNyQixZQUFXO01BQ1gsY0FBYTtNQUNiLGdCQUFlLEVBQ2xCO0VBbkpUO01Bc0pZLDRCQUEyQjtNQUMzQix1QkFBc0IsRUFDekIiLCJmaWxlIjoic3JjL2FwcC9wbGF5LWxpc3QvcGxheS1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBsYXktbGlzdC1jb24ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcblxuICAgIC5jb250ZW50IHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA0MHB4KTtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG5cbiAgICAgICAgLmxpc3R7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIH1cblxuICAgICAgICAuaGlzdG9yeXtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgfVxuXG4gICAgICAgIC50b3RhbCB7XG4gICAgICAgICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMzBweDtcbiAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMzBweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCBnYWluc2Jvcm87XG5cbiAgICAgICAgICAgIHNwYW4uY2xlYXItYWxsIHtcbiAgICAgICAgICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLml0ZW0tY29ue1xuICAgICAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAzMHB4KTtcbiAgICAgICAgICAgIG92ZXJmbG93OiBhdXRvO1xuXG4gICAgICAgICAgICAuaXRlbTpudGgtY2hpbGQob2RkKXtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuaXRlbTpudGgtY2hpbGQoZXZlbil7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZiZmJmYjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLml0ZW06aG92ZXJ7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogI2UyZTJlMiAhaW1wb3J0YW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAuaXRlbSB7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAzMHB4O1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAgMTBweCAwIDEwcHg7XG4gICAgICAgICAgICAgICAgY29sb3I6ICMwMDA7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcblxuICAgICAgICAgICAgICAgIC5wbGF5aW5nIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNSU7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbG9yOiAjNWI4YmU2O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC5wbGF5IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAlO1xuXG4gICAgICAgICAgICAgICAgICAgICY6aG92ZXJ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzAwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGl7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjYTdhN2E3O1xuICAgICAgICAgICAgICAgICAgICAgICAgJjpob3ZlcntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzAwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHNwYW4uc3RhdHVzIHtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMHB4IDRweCAwIDRweDtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHJlZDtcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDlweDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzcGFuLnRpbWUge1xuICAgICAgICAgICAgICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAgMTBweCAwIDEwcHg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLmZyb20ge1xuICAgICAgICAgICAgICAgICAgICBmbG9hdDogcmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDAgMTBweCAwIDEwcHg7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmctdG9wOiAzcHg7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAjY2NjY2NjO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbjogNHB4O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLmF1dGhvciB7XG4gICAgICAgICAgICAgICAgICAgIGZsb2F0OiByaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuaGVhZGVyIHtcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZDogI2YzZjNmMztcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjYWNhY2E7XG5cbiAgICAgICAgLmxpc3R7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICAgICAgICAgICAgaGVpZ2h0OiAyNXB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDIwcHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICAgICAgY29sb3I6IGdyYXk7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHggMCAwIDVweDtcbiAgICAgICAgICAgIHdpZHRoOiA4MHB4O1xuICAgICAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5oaXN0b3J5e1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgICAgICAgICAgIGhlaWdodDogMjVweDtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgICAgIGNvbG9yOiBncmF5O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMCA1cHggNXB4IDA7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICB3aWR0aDogODBweDtcbiAgICAgICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICAuc2VsZWN0ZWR7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiBncmF5ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBjb2xvcjogI2ZmZiAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/play-list/play-list.component.ts":
/*!**************************************************!*\
  !*** ./src/app/play-list/play-list.component.ts ***!
  \**************************************************/
/*! exports provided: PlayListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayListComponent", function() { return PlayListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _home_home_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../home/home.service */ "./src/app/home/home.service.ts");
/* harmony import */ var _footer_footer_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../footer/footer.service */ "./src/app/footer/footer.service.ts");
/* harmony import */ var ng_zorro_antd_message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd/message */ "./node_modules/ng-zorro-antd/fesm5/ng-zorro-antd-message.js");
/* harmony import */ var _header_header_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../header/header.service */ "./src/app/header/header.service.ts");






var PlayListComponent = /** @class */ (function () {
    function PlayListComponent(homeSer, footSer, message, headerSer) {
        this.homeSer = homeSer;
        this.footSer = footSer;
        this.message = message;
        this.headerSer = headerSer;
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.showList = true;
    }
    PlayListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.homeSer.playList.subscribe(function (data) {
            _this.playList = data;
        });
        this.footSer.songDetail.subscribe(function (data) {
            _this.currentSong = data;
        });
        this.homeSer.historyList.subscribe(function (data) {
            _this.historyList = _this.unique(data);
        });
        this.headerSer.theme.subscribe(function (data) {
            _this.theme = data;
        });
    };
    PlayListComponent.prototype.closePlayList = function () {
        this.close.emit('close');
    };
    PlayListComponent.prototype.showListPage = function () {
        this.showList = true;
    };
    PlayListComponent.prototype.showHistory = function () {
        this.showList = false;
    };
    PlayListComponent.prototype.singleClick = function (item) {
        var _this = this;
        this.timer = 0;
        this.preventSimpleClick = false;
        var delay = 500;
        this.timer = setTimeout(function () {
            if (!_this.preventSimpleClick) {
            }
        }, delay);
    };
    PlayListComponent.prototype.doubleClick = function (item) {
        this.preventSimpleClick = true;
        clearTimeout(this.timer);
        this.playThisMusic(item);
    };
    PlayListComponent.prototype.unique = function (list) {
        var temp = [];
        list.forEach(function (item) {
            var has = false;
            temp.forEach(function (ite, index) {
                if (item.id === ite.id) {
                    has = true;
                    if (item.current) {
                        temp[index] = item;
                    }
                }
            });
            if (!has) {
                temp.push(item);
            }
        });
        return temp;
    };
    PlayListComponent.prototype.removeThisMusic = function (song) {
        if (song.current) {
            var newList = Object.assign([], this.playList);
            newList = newList.filter(function (item) { return item.id !== song.id; });
            newList.forEach(function (item, index) {
                if (0 === index) {
                    item.current = true;
                }
                else {
                    item.current = false;
                }
            });
            this.homeSer.playList.next(this.unique(newList));
        }
        else {
            var newList = Object.assign([], this.playList);
            newList = newList.filter(function (item) { return item.id !== song.id; });
            this.homeSer.playList.next(this.unique(newList));
        }
    };
    PlayListComponent.prototype.clearAll = function () {
        this.homeSer.playList.next([]);
    };
    PlayListComponent.prototype.playThisMusic = function (song) {
        var newSong = Object.assign({}, song);
        newSong.current = true;
        var newList = Object.assign([], this.playList);
        newList.forEach(function (item) {
            item.current = false;
        });
        newList.push(newSong);
        this.homeSer.playList.next(this.unique(newList));
        this.message.success("\u6B63\u5728\u64AD\u653E\uFF1A" + song.name);
    };
    PlayListComponent.prototype.getCurrentSong = function (data) {
        var ret;
        this.playList.forEach(function (item) {
            if (item.id === data.id) {
                ret = item;
            }
        });
        return ret;
    };
    PlayListComponent.prototype.setCurrent = function (id) {
        var newList = Object.assign([], this.playList);
        newList.forEach(function (item) {
            if (item.id === id) {
                item.current = true;
            }
            else {
                item.current = false;
            }
        });
        this.homeSer.playList.next(newList);
    };
    PlayListComponent.prototype.dataAdapter = function (data) {
        var current = this.playList.filter(function (item) { return item.id === data.id; })[0];
        var ret = {
            'id': data.id,
            'name': current.name,
            'author': current.author,
            'preview': current.picUrl,
            'source': '每日歌曲推荐',
            'zhuanji': current.zhuanji,
            'lyric': '',
            'url': data.url,
            'time': current.time,
            'vip': current.vip
        };
        return ret;
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PlayListComponent.prototype, "close", void 0);
    PlayListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-play-list',
            template: __webpack_require__(/*! ./play-list.component.html */ "./src/app/play-list/play-list.component.html"),
            styles: [__webpack_require__(/*! ./play-list.component.scss */ "./src/app/play-list/play-list.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_home_home_service__WEBPACK_IMPORTED_MODULE_2__["HomeService"],
            _footer_footer_service__WEBPACK_IMPORTED_MODULE_3__["FooterService"],
            ng_zorro_antd_message__WEBPACK_IMPORTED_MODULE_4__["NzMessageService"],
            _header_header_service__WEBPACK_IMPORTED_MODULE_5__["HeaderService"]])
    ], PlayListComponent);
    return PlayListComponent;
}());



/***/ }),

/***/ "./src/app/play-list/play-list.module.ts":
/*!***********************************************!*\
  !*** ./src/app/play-list/play-list.module.ts ***!
  \***********************************************/
/*! exports provided: PlayListModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayListModule", function() { return PlayListModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _play_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./play-list.component */ "./src/app/play-list/play-list.component.ts");
/* harmony import */ var _header_header_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../header/header.module */ "./src/app/header/header.module.ts");





var PlayListModule = /** @class */ (function () {
    function PlayListModule() {
    }
    PlayListModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_play_list_component__WEBPACK_IMPORTED_MODULE_3__["PlayListComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _header_header_module__WEBPACK_IMPORTED_MODULE_4__["HeaderModule"]
            ],
            exports: [_play_list_component__WEBPACK_IMPORTED_MODULE_3__["PlayListComponent"]]
        })
    ], PlayListModule);
    return PlayListModule;
}());



/***/ }),

/***/ "./src/app/playing/playing.component.html":
/*!************************************************!*\
  !*** ./src/app/playing/playing.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "    <div class=\"song-bg\" [style.background]=\"'url(' + songDetail.preview + ')'\">\n        <div class=\"fog\"></div>\n    </div>\n    \n    <div class=\"song-detail\">\n        <div class=\"detail-con\">\n            <div class=\"close-btn\"  (click)=\"closePanel()\">\n                <i class=\"fas fa-compress-arrows-alt\"></i>\n            </div>\n            <div class=\"border\"></div>\n            <div class=\"img\" [style.background]=\"'url(' + songDetail.preview + ')'\"></div>\n            <div class=\"bar\"></div>\n            <div class=\"title\">\n                <div class=\"tit\">{{songDetail.name}}</div>\n                <span>专辑：<span class=\"zhuanji\">{{songDetail.zhuanji}}</span></span>\n                <span>歌手：<span class=\"author\">{{songDetail.author}}</span></span>\n            </div>\n            <div class=\"lyric\">\n                <div *ngFor=\"let row of songLyric.lrc.lyric.split('[')\" class=\"row\" [attr.time]=\"row.split(']')[0].split('.')[0]\">\n                    <span class=\"ly\" [attr.time]=\"row.split(']')[0].split('.')[0]\">{{row.split(']')[1]}}</span>\n                </div>\n                <div class=\"row\" *ngFor=\"let i of [1, 2, 3, 4, 5, 6]\"></div>\n            </div>\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/playing/playing.component.scss":
/*!************************************************!*\
  !*** ./src/app/playing/playing.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".song-bg {\n  width: 100%;\n  height: 100%;\n  -webkit-filter: blur(1px);\n  filter: blur(10px);\n  overflow: hidden;\n  background-repeat: no-repeat !important;\n  background-size: cover !important;\n  background-position: center center !important; }\n  .song-bg .fog {\n    width: 100%;\n    height: 100%;\n    box-shadow: 0 0 2000px white inset;\n    z-index: 100; }\n  .song-detail {\n  position: absolute;\n  top: 0;\n  /* float: left; */\n  width: 100%;\n  height: 100%; }\n  .song-detail .detail-con {\n    width: 100%;\n    height: 100%;\n    position: relative;\n    background: #bfbfbfa3; }\n  .song-detail .detail-con .title {\n      width: 40%;\n      height: 70px;\n      position: absolute;\n      right: 100px;\n      top: 25px;\n      font-size: 12px; }\n  .song-detail .detail-con .title .tit {\n        font-size: 20px;\n        font-weight: bold;\n        margin-bottom: 5px; }\n  .song-detail .detail-con .title .zhuanji, .song-detail .detail-con .title .author {\n        color: #5b8be6;\n        display: inline-block;\n        margin-right: 20px; }\n  .song-detail .detail-con .lyric {\n      width: 40%;\n      height: 70%;\n      overflow: auto;\n      position: absolute;\n      right: 100px;\n      top: 100px;\n      scroll-behavior: smooth; }\n  .song-detail .detail-con .lyric .row {\n        height: 30px;\n        line-height: 30px;\n        color: #000; }\n  .song-detail .detail-con .lyric span.time {\n        opacity: 0; }\n  .song-detail .detail-con .close-btn {\n      position: absolute;\n      right: 20px;\n      top: 20px;\n      cursor: pointer;\n      border: 1px solid #dcdcdc;\n      width: 35px;\n      line-height: 30px;\n      height: 30px;\n      text-align: center;\n      border-radius: 3px; }\n  .song-detail .detail-con .close-btn:hover {\n        opacity: 0.8; }\n  .song-detail .detail-con .bar {\n      background: url('/wangyiyun-online/assets/images/bar.png');\n      height: 140px;\n      width: 280px;\n      background-repeat: no-repeat;\n      position: absolute;\n      left: 250px;\n      top: -16px;\n      transform: scale(0.6, 0.6) rotate(0deg);\n      transform-origin: 35px 35px;\n      transition: all 0.5 ease-in-out; }\n  .song-detail .detail-con .img {\n      width: 300px;\n      height: 300px;\n      position: absolute;\n      left: 115px;\n      top: 72px;\n      border-radius: 50%;\n      background-size: cover !important;\n      border: 50px solid #000;\n      background-repeat: no-repeat !important;\n      background-position: center center !important; }\n  .song-detail .detail-con .border {\n      width: 320px;\n      height: 320px;\n      position: absolute;\n      left: 105px;\n      top: 62px;\n      border-radius: 50%;\n      background-size: cover !important;\n      border: 50px solid #d0cfcf78; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9yZW5ob25nbC93YW5neWl5dW4tb25saW5lL3NyYy9hcHAvcGxheWluZy9wbGF5aW5nLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBVztFQUNYLGFBQVk7RUFDWiwwQkFBeUI7RUFDekIsbUJBQWtCO0VBQ2xCLGlCQUFnQjtFQUNoQix3Q0FBdUM7RUFDdkMsa0NBQWlDO0VBQ2pDLDhDQUE2QyxFQVFoRDtFQWhCRDtJQVdRLFlBQVc7SUFDWCxhQUFZO0lBQ1osbUNBQStDO0lBQy9DLGFBQVksRUFDZjtFQUdMO0VBQ0ksbUJBQWtCO0VBQ2xCLE9BQU07RUFDTixrQkFBa0I7RUFDbEIsWUFBVztFQUNYLGFBQVksRUF1R2Y7RUE1R0Q7SUFRUSxZQUFXO0lBQ1gsYUFBWTtJQUNaLG1CQUFrQjtJQUNsQixzQkFBcUIsRUFnR3hCO0VBM0dMO01BY1ksV0FBVTtNQUNWLGFBQVk7TUFDWixtQkFBa0I7TUFDbEIsYUFBWTtNQUNaLFVBQVM7TUFDVCxnQkFBZSxFQWFsQjtFQWhDVDtRQXNCZ0IsZ0JBQWU7UUFDZixrQkFBaUI7UUFDakIsbUJBQWtCLEVBQ3JCO0VBekJiO1FBNEJnQixlQUFjO1FBQ2Qsc0JBQXFCO1FBQ3JCLG1CQUFrQixFQUNyQjtFQS9CYjtNQW1DWSxXQUFVO01BQ1YsWUFBVztNQUNYLGVBQWM7TUFDZCxtQkFBa0I7TUFDbEIsYUFBWTtNQUNaLFdBQVU7TUFDVix3QkFBdUIsRUFXMUI7RUFwRFQ7UUE0Q2dCLGFBQVk7UUFDWixrQkFBaUI7UUFDakIsWUFBVyxFQUNkO0VBL0NiO1FBa0RnQixXQUFVLEVBQ2I7RUFuRGI7TUF1RFksbUJBQWtCO01BQ2xCLFlBQVc7TUFDWCxVQUFTO01BQ1QsZ0JBQWU7TUFDZiwwQkFBeUI7TUFDekIsWUFBVztNQUNYLGtCQUFpQjtNQUNqQixhQUFZO01BQ1osbUJBQWtCO01BQ2xCLG1CQUFrQixFQUtyQjtFQXJFVDtRQW1FZ0IsYUFBWSxFQUNmO0VBcEViO01Bd0VZLDJEQUF1QztNQUN2QyxjQUFhO01BQ2IsYUFBWTtNQUNaLDZCQUE0QjtNQUM1QixtQkFBa0I7TUFDbEIsWUFBVztNQUNYLFdBQVU7TUFDVix3Q0FBdUM7TUFDdkMsNEJBQTJCO01BQzNCLGdDQUErQixFQUNsQztFQWxGVDtNQXFGWSxhQUFZO01BQ1osY0FBYTtNQUNiLG1CQUFrQjtNQUNsQixZQUFXO01BQ1gsVUFBUztNQUNULG1CQUFrQjtNQUNsQixrQ0FBaUM7TUFDakMsd0JBQXVCO01BQ3ZCLHdDQUF1QztNQUN2Qyw4Q0FBNkMsRUFDaEQ7RUEvRlQ7TUFrR1ksYUFBWTtNQUNaLGNBQWE7TUFDYixtQkFBa0I7TUFDbEIsWUFBVztNQUNYLFVBQVM7TUFDVCxtQkFBa0I7TUFDbEIsa0NBQWlDO01BQ2pDLDZCQUE0QixFQUMvQiIsImZpbGUiOiJzcmMvYXBwL3BsYXlpbmcvcGxheWluZy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zb25nLWJne1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICAtd2Via2l0LWZpbHRlcjogYmx1cigxcHgpO1xuICAgIGZpbHRlcjogYmx1cigxMHB4KTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQgIWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyICFpbXBvcnRhbnQ7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlciAhaW1wb3J0YW50O1xuXG4gICAgLmZvZ3tcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDIwMDBweCByZ2IoMjU1LCAyNTUsIDI1NSkgaW5zZXQ7XG4gICAgICAgIHotaW5kZXg6IDEwMDtcbiAgICB9XG59XG5cbi5zb25nLWRldGFpbHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIC8qIGZsb2F0OiBsZWZ0OyAqL1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcblxuICAgIC5kZXRhaWwtY29ue1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIGJhY2tncm91bmQ6ICNiZmJmYmZhMztcblxuICAgICAgICAudGl0bGUge1xuICAgICAgICAgICAgd2lkdGg6IDQwJTtcbiAgICAgICAgICAgIGhlaWdodDogNzBweDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHJpZ2h0OiAxMDBweDtcbiAgICAgICAgICAgIHRvcDogMjVweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcblxuICAgICAgICAgICAgLnRpdCB7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgICAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLnpodWFuamksIC5hdXRob3J7XG4gICAgICAgICAgICAgICAgY29sb3I6ICM1YjhiZTY7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMjBweDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC5seXJpY3tcbiAgICAgICAgICAgIHdpZHRoOiA0MCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDcwJTtcbiAgICAgICAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgcmlnaHQ6IDEwMHB4O1xuICAgICAgICAgICAgdG9wOiAxMDBweDtcbiAgICAgICAgICAgIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xuXG4gICAgICAgICAgICAucm93e1xuICAgICAgICAgICAgICAgIGhlaWdodDogMzBweDtcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMzBweDtcbiAgICAgICAgICAgICAgICBjb2xvcjogIzAwMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3Bhbi50aW1lIHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLmNsb3NlLWJ0bntcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHJpZ2h0OiAyMHB4O1xuICAgICAgICAgICAgdG9wOiAyMHB4O1xuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2RjZGNkYztcbiAgICAgICAgICAgIHdpZHRoOiAzNXB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG5cbiAgICAgICAgICAgICY6aG92ZXJ7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMC44O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLmJhcntcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHVybCgvYXNzZXRzL2ltYWdlcy9iYXIucG5nKTtcbiAgICAgICAgICAgIGhlaWdodDogMTQwcHg7XG4gICAgICAgICAgICB3aWR0aDogMjgwcHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgbGVmdDogMjUwcHg7XG4gICAgICAgICAgICB0b3A6IC0xNnB4O1xuICAgICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjYsIDAuNikgcm90YXRlKDBkZWcpO1xuICAgICAgICAgICAgdHJhbnNmb3JtLW9yaWdpbjogMzVweCAzNXB4O1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNSBlYXNlLWluLW91dDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5pbWd7XG4gICAgICAgICAgICB3aWR0aDogMzAwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDMwMHB4O1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgbGVmdDogMTE1cHg7XG4gICAgICAgICAgICB0b3A6IDcycHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBib3JkZXI6IDUwcHggc29saWQgIzAwMDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQgIWltcG9ydGFudDtcbiAgICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXIgIWltcG9ydGFudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5ib3JkZXJ7XG4gICAgICAgICAgICB3aWR0aDogMzIwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDMyMHB4O1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgbGVmdDogMTA1cHg7XG4gICAgICAgICAgICB0b3A6IDYycHg7XG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBib3JkZXI6IDUwcHggc29saWQgI2QwY2ZjZjc4O1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0= */"

/***/ }),

/***/ "./src/app/playing/playing.component.ts":
/*!**********************************************!*\
  !*** ./src/app/playing/playing.component.ts ***!
  \**********************************************/
/*! exports provided: PlayingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayingComponent", function() { return PlayingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _footer_footer_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../footer/footer.service */ "./src/app/footer/footer.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var PlayingComponent = /** @class */ (function () {
    function PlayingComponent(footerSer, router) {
        this.footerSer = footerSer;
        this.router = router;
        this.close = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.rotation = 0;
    }
    PlayingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.footerSer.songDetail.subscribe(function (data) {
            _this.songDetail = data;
        });
        this.footerSer.songLyric.subscribe(function (data) {
            _this.songLyric = data;
        });
        this.footerSer.currentTime.subscribe(function (data) {
            _this.moveLyric(data);
        });
        this.footerSer.playing.subscribe(function (data) {
            _this.playing = data;
            if (_this.playing) {
                if (!_this.starting) {
                    _this.start();
                    _this.starting = true;
                }
            }
            else {
                _this.stop();
                _this.starting = false;
            }
        });
        this.router.events.subscribe(function (data) {
            _this.closePanel();
        });
    };
    PlayingComponent.prototype.start = function () {
        var _this = this;
        if (this.rotation <= 38) {
            if (document.querySelector('.bar')) {
                document.querySelector('.bar')['style'].transform = "scale(0.6, 0.6) rotate(" + this.rotation++ + "deg)";
                requestAnimationFrame(function () {
                    _this.start();
                });
            }
        }
        setTimeout(function () {
            if (document.querySelector('.detail-con .img')) {
                document.querySelector('.detail-con .img')['style']['animation'] = 'rotate 20s linear infinite';
                document.querySelector('.detail-con .img')['style']['animation-play-state'] = 'running';
            }
        }, 500);
    };
    PlayingComponent.prototype.stop = function () {
        var _this = this;
        if (this.rotation >= 0) {
            document.querySelector('.bar')['style'].transform = "scale(0.6, 0.6) rotate(" + this.rotation-- + "deg)";
            requestAnimationFrame(function () {
                _this.stop();
            });
        }
        setTimeout(function () {
            // document.querySelector('.detail-con .img')['style']['animation'] = 'none';
            if (document.querySelector('.detail-con .img')) {
                document.querySelector('.detail-con .img')['style']['animation-play-state'] = 'paused';
            }
        }, 500);
    };
    PlayingComponent.prototype.moveLyric = function (time) {
        var newTime = this.setMinuts(time);
        var current = document.querySelector('div[time="' + newTime + '"]');
        var index = 0;
        if (current) {
            Array.from(document.querySelectorAll('.lyric div')).forEach(function (item, i) {
                item['style']['color'] = '#000';
                if (item.getAttribute('time') === current.getAttribute('time')) {
                    index = i;
                }
            });
            // current.scrollIntoView(true);
            current['style']['color'] = '#fff';
            // const top = document.querySelector('.lyric').scrollTop;
            document.querySelector('.lyric')['scrollTop'] = 30 * index - 50;
        }
    };
    PlayingComponent.prototype.setMinuts = function (time) {
        return this.addZero(Number.parseInt((time / 60).toString(), 10)) + ':' + this.addZero(Number.parseInt((time % 60).toString(), 10));
    };
    PlayingComponent.prototype.addZero = function (time) {
        if (time < 10) {
            return '0' + time;
        }
        return time;
    };
    PlayingComponent.prototype.closePanel = function () {
        this.close.emit('close');
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], PlayingComponent.prototype, "close", void 0);
    PlayingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-playing',
            template: __webpack_require__(/*! ./playing.component.html */ "./src/app/playing/playing.component.html"),
            styles: [__webpack_require__(/*! ./playing.component.scss */ "./src/app/playing/playing.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_footer_footer_service__WEBPACK_IMPORTED_MODULE_2__["FooterService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], PlayingComponent);
    return PlayingComponent;
}());



/***/ }),

/***/ "./src/app/playing/playing.module.ts":
/*!*******************************************!*\
  !*** ./src/app/playing/playing.module.ts ***!
  \*******************************************/
/*! exports provided: PlayingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayingModule", function() { return PlayingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _playing_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./playing.component */ "./src/app/playing/playing.component.ts");
/* harmony import */ var _footer_footer_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../footer/footer.module */ "./src/app/footer/footer.module.ts");





var PlayingModule = /** @class */ (function () {
    function PlayingModule() {
    }
    PlayingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_playing_component__WEBPACK_IMPORTED_MODULE_3__["PlayingComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _footer_footer_module__WEBPACK_IMPORTED_MODULE_4__["FooterModule"]
            ],
            exports: [_playing_component__WEBPACK_IMPORTED_MODULE_3__["PlayingComponent"]]
        })
    ], PlayingModule);
    return PlayingModule;
}());



/***/ }),

/***/ "./src/app/private-fm/private-fm.component.html":
/*!******************************************************!*\
  !*** ./src/app/private-fm/private-fm.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  private-fm works!\n</p>\n"

/***/ }),

/***/ "./src/app/private-fm/private-fm.component.scss":
/*!******************************************************!*\
  !*** ./src/app/private-fm/private-fm.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ByaXZhdGUtZm0vcHJpdmF0ZS1mbS5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/private-fm/private-fm.component.ts":
/*!****************************************************!*\
  !*** ./src/app/private-fm/private-fm.component.ts ***!
  \****************************************************/
/*! exports provided: PrivateFmComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivateFmComponent", function() { return PrivateFmComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PrivateFmComponent = /** @class */ (function () {
    function PrivateFmComponent() {
    }
    PrivateFmComponent.prototype.ngOnInit = function () {
    };
    PrivateFmComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-private-fm',
            template: __webpack_require__(/*! ./private-fm.component.html */ "./src/app/private-fm/private-fm.component.html"),
            styles: [__webpack_require__(/*! ./private-fm.component.scss */ "./src/app/private-fm/private-fm.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PrivateFmComponent);
    return PrivateFmComponent;
}());



/***/ }),

/***/ "./src/app/private-fm/private-fm.module.ts":
/*!*************************************************!*\
  !*** ./src/app/private-fm/private-fm.module.ts ***!
  \*************************************************/
/*! exports provided: PrivateFmModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivateFmModule", function() { return PrivateFmModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _private_fm_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./private-fm.component */ "./src/app/private-fm/private-fm.component.ts");




var PrivateFmModule = /** @class */ (function () {
    function PrivateFmModule() {
    }
    PrivateFmModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_private_fm_component__WEBPACK_IMPORTED_MODULE_3__["PrivateFmComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
            ],
            exports: [_private_fm_component__WEBPACK_IMPORTED_MODULE_3__["PrivateFmComponent"]]
        })
    ], PrivateFmModule);
    return PrivateFmModule;
}());



/***/ }),

/***/ "./src/app/search-result/search-result.component.html":
/*!************************************************************!*\
  !*** ./src/app/search-result/search-result.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"search-result\">\n  <div class=\"title\">搜索<span class=\"keyword\">\"{{keyWord}}\"</span>，共找到 {{searchResult.songCount}} 条结果</div>\n  <mat-tab-group>\n    <mat-tab label=\"单曲\">\n      <div class=\"example-large-box mat-elevation-z4\">\n        <app-search-song-list [songList]=\"searchResult.songs\"></app-search-song-list>\n        <div class=\"song-page\">\n          <mat-paginator [length]=\"searchResult.songCount\" [pageSize]=\"30\" [pageSizeOptions]=\"[30]\" hidePageSize=\"true\" (page)=\"changePage($event)\">\n          </mat-paginator>\n        </div>\n      </div>\n    </mat-tab>\n    <mat-tab label=\"歌手\"> Content 2 </mat-tab>\n    <mat-tab label=\"专辑\"> Content 3 </mat-tab>\n  </mat-tab-group>\n</div>\n"

/***/ }),

/***/ "./src/app/search-result/search-result.component.scss":
/*!************************************************************!*\
  !*** ./src/app/search-result/search-result.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".search-result {\n  width: 100%;\n  height: 100%; }\n  .search-result .title {\n    height: 50px;\n    display: flex;\n    align-items: center; }\n  .search-result .keyword {\n    color: #5b8be6; }\n  .mat-tab-body-content {\n  overflow: hidden !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9yZW5ob25nbC93YW5neWl5dW4tb25saW5lL3NyYy9hcHAvc2VhcmNoLXJlc3VsdC9zZWFyY2gtcmVzdWx0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBO0VBQ0ksWUFBVztFQUNYLGFBQVksRUFXZjtFQWJEO0lBS1EsYUFBWTtJQUNaLGNBQWE7SUFDYixvQkFBbUIsRUFDdEI7RUFSTDtJQVdRLGVBQWMsRUFDakI7RUFHTDtFQUNJLDRCQUEyQixFQUM5QiIsImZpbGUiOiJzcmMvYXBwL3NlYXJjaC1yZXN1bHQvc2VhcmNoLXJlc3VsdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG5cbi5zZWFyY2gtcmVzdWx0e1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBcbiAgICAudGl0bGUge1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLmtleXdvcmR7XG4gICAgICAgIGNvbG9yOiAjNWI4YmU2O1xuICAgIH1cbn1cblxuLm1hdC10YWItYm9keS1jb250ZW50e1xuICAgIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/search-result/search-result.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/search-result/search-result.component.ts ***!
  \**********************************************************/
/*! exports provided: SearchResultComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchResultComponent", function() { return SearchResultComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _header_header_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../header/header.service */ "./src/app/header/header.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");




var SearchResultComponent = /** @class */ (function () {
    function SearchResultComponent(headerSer, route) {
        this.headerSer = headerSer;
        this.route = route;
        this.type = 1;
    }
    SearchResultComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.listenSearchResult();
        this.route.params.subscribe(function (data) {
            _this.getResult(data.keyword);
        });
    };
    SearchResultComponent.prototype.getResult = function (keyWord) {
        var _this = this;
        this.keyWord = keyWord;
        this.headerSer.search(keyWord, this.type, 1).subscribe(function (data) {
            _this.searchResult = { songs: [] };
            _this.searchResult = _this.dataAdapter(data['result']);
        });
    };
    SearchResultComponent.prototype.changePage = function (e) {
        var _this = this;
        this.headerSer.search(this.keyWord, this.type, e.pageIndex + 1).subscribe(function (data) {
            _this.searchResult = { songs: [] };
            _this.searchResult = _this.dataAdapter(data['result']);
        });
    };
    SearchResultComponent.prototype.dataAdapter = function (data) {
        var _this = this;
        data.songs = data.songs.map(function (item) {
            return {
                id: item.id,
                name: item.name,
                author: item.ar[0].name,
                zhuanji: item.al.name,
                time: _this.timeFormat(item.dt),
                vip: true,
                preview: item.al.picUrl
            };
        });
        return data;
    };
    SearchResultComponent.prototype.timeFormat = function (time) {
        var mins = Number.parseInt((time / 1000 / 60).toString());
        var secs = Number.parseInt((time / 1000 % 60).toString());
        return this.addZero(mins) + ':' + this.addZero(secs);
    };
    SearchResultComponent.prototype.addZero = function (time) {
        if (time < 10) {
            return '0' + time;
        }
        return time;
    };
    SearchResultComponent.prototype.listenSearchResult = function () {
        var _this = this;
        this.headerSer.searchResult.subscribe(function (data) {
            _this.searchResult = { songs: [] };
            _this.searchResult = data;
        });
    };
    SearchResultComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-search-result',
            template: __webpack_require__(/*! ./search-result.component.html */ "./src/app/search-result/search-result.component.html"),
            styles: [__webpack_require__(/*! ./search-result.component.scss */ "./src/app/search-result/search-result.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_header_header_service__WEBPACK_IMPORTED_MODULE_2__["HeaderService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], SearchResultComponent);
    return SearchResultComponent;
}());



/***/ }),

/***/ "./src/app/search-result/search-result.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/search-result/search-result.module.ts ***!
  \*******************************************************/
/*! exports provided: SearchResultModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchResultModule", function() { return SearchResultModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _search_result_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search-result.component */ "./src/app/search-result/search-result.component.ts");
/* harmony import */ var _share_ui_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../share/ui.module */ "./src/app/share/ui.module.ts");
/* harmony import */ var _song_list_song_list_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./song-list/song-list.component */ "./src/app/search-result/song-list/song-list.component.ts");






var SearchResultModule = /** @class */ (function () {
    function SearchResultModule() {
    }
    SearchResultModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_search_result_component__WEBPACK_IMPORTED_MODULE_3__["SearchResultComponent"], _song_list_song_list_component__WEBPACK_IMPORTED_MODULE_5__["SongListComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _share_ui_module__WEBPACK_IMPORTED_MODULE_4__["UiModule"]
            ],
            exports: [_search_result_component__WEBPACK_IMPORTED_MODULE_3__["SearchResultComponent"]]
        })
    ], SearchResultModule);
    return SearchResultModule;
}());



/***/ }),

/***/ "./src/app/search-result/song-list/song-list.component.html":
/*!******************************************************************!*\
  !*** ./src/app/search-result/song-list/song-list.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"song-list\" *ngIf=\"songList\">\n  <div class=\"content\">\n    <div class=\"song-item header\">\n      <span class=\"number\"></span>\n      <span class=\"action\">\n        操作\n      </span>\n      <span class=\"title\">音乐标题</span>\n      <span class=\"author\">歌手</span>\n      <span class=\"zhuanji\">专辑</span>\n      <span class=\"time\">时长</span>\n    </div>\n    <div class=\"song-item\" *ngFor=\"let song of songList; let i = index\">\n      <span class=\"number\">{{i + 1}}</span>\n      <span class=\"love\">\n        <i class=\"far fa-heart\"></i>\n        <i class=\"far fa-play-circle\" title=\"播放\" (click)=\"playThisSong(song)\"></i>\n        <i class=\"fas fa-plus-circle\" title=\"添加全部到播放列表\" (click)=\"addThisSong(song)\"></i>\n      </span>\n      <span class=\"title\">{{song.name}}<span class=\"vip\" *ngIf=\"song.vip\">SQ</span></span>\n      <span class=\"author\">{{song.author}}</span>\n      <span class=\"zhuanji\">{{song.zhuanji}}</span>\n      <span class=\"time\">{{song.time}}</span>\n    </div>\n    <p></p>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/search-result/song-list/song-list.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/search-result/song-list/song-list.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".song-list {\n  width: 100%;\n  height: 100%; }\n  .song-list .content {\n    height: 100%;\n    width: 100%;\n    overflow: hidden; }\n  .song-list .content .mat-tab-body-content {\n      overflow: hidden !important; }\n  .song-list .content .song-item.header {\n      border-bottom: 1px solid #e2e0e0;\n      height: 30px;\n      display: flex; }\n  .song-list .content .song-item:hover {\n      background: #e8e8e8 !important; }\n  .song-list .content .song-item {\n      height: 30px;\n      line-height: 30px;\n      cursor: pointer;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n      display: flex; }\n  .song-list .content .song-item span.number {\n        display: inline-block;\n        width: 5%;\n        text-align: center; }\n  .song-list .content .song-item .number.current {\n        color: #5b8be6 !important; }\n  .song-list .content .song-item span.love {\n        display: inline-block;\n        width: 10%;\n        line-height: 25px; }\n  .song-list .content .song-item span.love i {\n          font-size: 16px;\n          transform: translateY(3px);\n          color: #a7a7a7;\n          margin-right: 5px; }\n  .song-list .content .song-item span.love i:hover {\n            color: #000; }\n  .song-list .content .song-item span.download {\n        display: inline-block;\n        width: 5%;\n        text-align: center; }\n  .song-list .content .song-item span.download i {\n          font-size: 16px;\n          transform: translateY(3px);\n          border: 1px solid gray;\n          border-radius: 50%;\n          margin-right: 5px; }\n  .song-list .content .song-item span.download i:hover {\n            color: gray; }\n  .song-list .content .song-item span.title {\n        width: 40%;\n        display: inline-block;\n        font-size: 13px;\n        padding-left: 10px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        padding-right: 5px; }\n  .song-list .content .song-item span.vip {\n        color: red;\n        border: 1px solid red;\n        padding: 1px 2px 1px 2px;\n        font-size: 10px;\n        margin-left: 10px;\n        border-radius: 3px; }\n  .song-list .content .song-item span.author {\n        display: inline-block;\n        width: 20%;\n        font-size: 12px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        padding-right: 5px; }\n  .song-list .content .song-item span.zhuanji {\n        display: inline-block;\n        width: 20%;\n        font-size: 12px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        height: 100%;\n        padding-right: 10px;\n        overflow-y: hidden;\n        white-space: nowrap; }\n  .song-list .content .song-item span.time {\n        display: inline-block;\n        font-size: 12px;\n        color: gray; }\n  .song-list .content .song-item span.action {\n        display: inline-block;\n        width: 10%; }\n  .song-list .content .song-item:nth-child(odd) {\n      background: #fff; }\n  .song-list .content .song-item:nth-child(even) {\n      background: #fbfbfb; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9yZW5ob25nbC93YW5neWl5dW4tb25saW5lL3NyYy9hcHAvc2VhcmNoLXJlc3VsdC9zb25nLWxpc3Qvc29uZy1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0ksWUFBVztFQUNYLGFBQVksRUF1SWY7RUF6SUQ7SUFPUSxhQUFZO0lBQ1osWUFBVztJQUNYLGlCQUFnQixFQStIbkI7RUF4SUw7TUFZWSw0QkFBMkIsRUFDOUI7RUFiVDtNQWdCWSxpQ0FBZ0M7TUFDaEMsYUFBWTtNQUNaLGNBQWEsRUFDaEI7RUFuQlQ7TUFzQlksK0JBQThCLEVBQ2pDO0VBdkJUO01BMEJZLGFBQVk7TUFDWixrQkFBaUI7TUFDakIsZ0JBQWU7TUFDZiwwQkFBaUI7U0FBakIsdUJBQWlCO1VBQWpCLHNCQUFpQjtjQUFqQixrQkFBaUI7TUFDakIsY0FBYSxFQWlHaEI7RUEvSFQ7UUFpQ2dCLHNCQUFxQjtRQUNyQixVQUFTO1FBQ1QsbUJBQWtCLEVBQ3JCO0VBcENiO1FBdUNnQiwwQkFBeUIsRUFDNUI7RUF4Q2I7UUEyQ2dCLHNCQUFxQjtRQUNyQixXQUFVO1FBQ1Ysa0JBQWlCLEVBV3BCO0VBeERiO1VBZ0RvQixnQkFBZTtVQUNmLDJCQUEwQjtVQUMxQixlQUFjO1VBSWQsa0JBQWlCLEVBQ3BCO0VBdkRqQjtZQW9Ed0IsWUFBVyxFQUNkO0VBckRyQjtRQTJEZ0Isc0JBQXFCO1FBQ3JCLFVBQVM7UUFDVCxtQkFBa0IsRUFZckI7RUF6RWI7VUFnRW9CLGdCQUFlO1VBQ2YsMkJBQTBCO1VBSTFCLHVCQUFzQjtVQUN0QixtQkFBa0I7VUFDbEIsa0JBQWlCLEVBQ3BCO0VBeEVqQjtZQW1Fd0IsWUFBVyxFQUNkO0VBcEVyQjtRQTRFZ0IsV0FBVTtRQUNWLHNCQUFxQjtRQUNyQixnQkFBZTtRQUNmLG1CQUFrQjtRQUNsQixpQkFBZ0I7UUFDaEIsd0JBQXVCO1FBQ3ZCLG9CQUFtQjtRQUNuQixtQkFBa0IsRUFDckI7RUFwRmI7UUF1RmdCLFdBQVU7UUFDVixzQkFBcUI7UUFDckIseUJBQXdCO1FBQ3hCLGdCQUFlO1FBQ2Ysa0JBQWlCO1FBQ2pCLG1CQUFrQixFQUNyQjtFQTdGYjtRQWdHZ0Isc0JBQXFCO1FBQ3JCLFdBQVU7UUFDVixnQkFBZTtRQUNmLGlCQUFnQjtRQUNoQix3QkFBdUI7UUFDdkIsb0JBQW1CO1FBQ25CLG1CQUFrQixFQUNyQjtFQXZHYjtRQTBHZ0Isc0JBQXFCO1FBQ3JCLFdBQVU7UUFDVixnQkFBZTtRQUNmLGlCQUFnQjtRQUNoQix3QkFBdUI7UUFDdkIsYUFBWTtRQUNaLG9CQUFtQjtRQUNuQixtQkFBa0I7UUFDbEIsb0JBQW1CLEVBQ3RCO0VBbkhiO1FBc0hnQixzQkFBcUI7UUFDckIsZ0JBQWU7UUFDZixZQUFXLEVBQ2Q7RUF6SGI7UUE0SGdCLHNCQUFxQjtRQUNyQixXQUFVLEVBQ2I7RUE5SGI7TUFrSVksaUJBQWdCLEVBQ25CO0VBbklUO01Bc0lZLG9CQUFtQixFQUN0QiIsImZpbGUiOiJzcmMvYXBwL3NlYXJjaC1yZXN1bHQvc29uZy1saXN0L3NvbmctbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuXG4uc29uZy1saXN0IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG5cbiAgICBcblxuICAgIC5jb250ZW50e1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgICAgIC5tYXQtdGFiLWJvZHktY29udGVudHtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zb25nLWl0ZW0uaGVhZGVye1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMmUwZTA7XG4gICAgICAgICAgICBoZWlnaHQ6IDMwcHg7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnNvbmctaXRlbTpob3ZlcntcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNlOGU4ZTggIWltcG9ydGFudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zb25nLWl0ZW0ge1xuICAgICAgICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG5cbiAgICAgICAgICAgIHNwYW4ubnVtYmVyIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDUlO1xuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLm51bWJlci5jdXJyZW50e1xuICAgICAgICAgICAgICAgIGNvbG9yOiAjNWI4YmU2ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNwYW4ubG92ZSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMCU7XG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDI1cHg7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaXtcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoM3B4KTtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICNhN2E3YTc7XG4gICAgICAgICAgICAgICAgICAgICY6aG92ZXJ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogIzAwMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNwYW4uZG93bmxvYWQge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICB3aWR0aDogNSU7XG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgICAgICAgICAgICAgaXtcbiAgICAgICAgICAgICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoM3B4KTtcbiAgICAgICAgICAgICAgICAgICAgJjpob3ZlcntcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBncmF5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gICAgICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzcGFuLnRpdGxlIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogNDAlO1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICAgICAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiA1cHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNwYW4udmlwIHtcbiAgICAgICAgICAgICAgICBjb2xvcjogcmVkO1xuICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAxcHggMnB4IDFweCAycHg7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMHB4O1xuICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3Bhbi5hdXRob3Ige1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAlO1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgICAgICAgICAgcGFkZGluZy1yaWdodDogNXB4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzcGFuLnpodWFuamkge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICB3aWR0aDogMjAlO1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgICAgICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xuICAgICAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcbiAgICAgICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzcGFuLnRpbWUge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICAgICAgY29sb3I6IGdyYXk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNwYW4uYWN0aW9uIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwJTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC5zb25nLWl0ZW06bnRoLWNoaWxkKG9kZCl7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmO1xuICAgICAgICB9XG5cbiAgICAgICAgLnNvbmctaXRlbTpudGgtY2hpbGQoZXZlbil7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjZmJmYmZiO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ== */"

/***/ }),

/***/ "./src/app/search-result/song-list/song-list.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/search-result/song-list/song-list.component.ts ***!
  \****************************************************************/
/*! exports provided: SongListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SongListComponent", function() { return SongListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_home_home_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/home/home.service */ "./src/app/home/home.service.ts");
/* harmony import */ var ng_zorro_antd_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd/message */ "./node_modules/ng-zorro-antd/fesm5/ng-zorro-antd-message.js");




var SongListComponent = /** @class */ (function () {
    function SongListComponent(homeSer, message) {
        this.homeSer = homeSer;
        this.message = message;
    }
    SongListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.homeSer.playList.subscribe(function (data) {
            _this.playList = data;
        });
    };
    SongListComponent.prototype.playThisSong = function (song) {
        var newSong = Object.assign({}, song);
        newSong.current = true;
        var newList = Object.assign([], this.playList);
        newList.forEach(function (item) {
            item.current = false;
        });
        newList.push(newSong);
        this.homeSer.playList.next(this.unique(newList));
        this.message.success("\u6B63\u5728\u64AD\u653E\uFF1A" + song.name);
    };
    SongListComponent.prototype.unique = function (list) {
        var temp = [];
        list.forEach(function (item) {
            var has = false;
            temp.forEach(function (ite, index) {
                if (item.id === ite.id) {
                    has = true;
                    if (item.current) {
                        temp[index] = item;
                    }
                }
            });
            if (!has) {
                temp.push(item);
            }
        });
        return temp;
    };
    SongListComponent.prototype.addThisSong = function (song) {
        var newList = Object.assign([], this.playList);
        newList.push(song);
        this.homeSer.playList.next(this.unique(newList));
        this.message.success("\u6DFB\u52A0\u6210\u529F\uFF1A" + song.name);
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SongListComponent.prototype, "songList", void 0);
    SongListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-search-song-list',
            template: __webpack_require__(/*! ./song-list.component.html */ "./src/app/search-result/song-list/song-list.component.html"),
            styles: [__webpack_require__(/*! ./song-list.component.scss */ "./src/app/search-result/song-list/song-list.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_home_home_service__WEBPACK_IMPORTED_MODULE_2__["HomeService"], ng_zorro_antd_message__WEBPACK_IMPORTED_MODULE_3__["NzMessageService"]])
    ], SongListComponent);
    return SongListComponent;
}());



/***/ }),

/***/ "./src/app/song-list/song-list.component.html":
/*!****************************************************!*\
  !*** ./src/app/song-list/song-list.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"song-list\" *ngIf=\"songList\">\n  <div class=\"header\">\n    <div class=\"img\" [style.background]=\"'url('+ songList.img + ')'\">\n\n    </div>\n    <div class=\"category\">\n      <span class=\"cate-label\">歌单</span>{{songList.category}}\n    </div>\n    <div class=\"songer\">\n      {{songList.author}}\n    </div>\n    <div class=\"create-date\">\n      {{songList.createDate}} 创建\n    </div>\n    <div class=\"actions\">\n      <div class=\"play-all\" [style.background]=\"theme\">\n        <div class=\"left\" (click)=\"playThisList(-1)\"  [style.background]=\"theme\">\n          <i class=\"material-icons\">\n            play_circle_outline\n          </i>播放全部</div>\n        <div class=\"add-all\" title=\"添加全部到播放列表\" (click)=\"addThisList()\"><i class=\"material-icons\">\n            add\n          </i></div>\n      </div>\n      <div class=\"save\">收藏</div>\n      <div class=\"share\">分享</div>\n      <span class=\"download-all\">下载全部</span>\n    </div>\n    <div class=\"labels\">\n      <span>标签：</span>\n      <span *ngFor=\"let item of songList.label\">{{item}}/</span>\n    </div>\n    <div class=\"desc\">\n      简介：{{songList.desc}}\n    </div>\n  </div>\n\n  <div class=\"content\">\n    <mat-tab-group>\n      <mat-tab label=\"歌曲列表\">\n        <div class=\"song-item header\">\n          <span class=\"number\"></span>\n          <span class=\"action\">\n            操作\n          </span>\n          <span class=\"title\">音乐标题</span>\n          <span class=\"author\">歌手</span>\n          <span class=\"zhuanji\">专辑</span>\n          <span class=\"time\">时长</span>\n        </div>\n        <div class=\"song-item\" *ngFor=\"let song of songList.songs; let i = index\" (dblclick)=\"doubleClick(song.id)\">\n          <span class=\"number\" *ngIf=\"song.id !== currentSong.id\">{{i + 1}}</span>\n          <span class=\"number current\" *ngIf=\"song.id === currentSong.id\" [style.color]=\"theme\"><i class=\"fas fa-headphones\"></i></span>\n          <span class=\"love\">\n            <i class=\"far fa-heart\"></i>\n            <i class=\"far fa-play-circle\" title=\"播放\" (click)=\"playThisSong(song)\"></i>\n            <i class=\"fas fa-plus-circle\" title=\"添加全部到播放列表\" (click)=\"addThisSong(song)\"></i>\n          </span>\n          <span class=\"title\">{{song.name}}<span class=\"vip\" *ngIf=\"song.vip\">SQ</span></span>\n          <span class=\"author\">{{song.author}}</span>\n          <span class=\"zhuanji\">{{song.zhuanji}}</span>\n          <span class=\"time\">{{song.time}}</span>\n        </div>\n        <p></p>\n        <p></p>\n      </mat-tab>\n      <mat-tab label=\"评论(3)\"> Content 2 </mat-tab>\n      <mat-tab label=\"收藏者\"> Content 3 </mat-tab>\n    </mat-tab-group>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/song-list/song-list.component.scss":
/*!****************************************************!*\
  !*** ./src/app/song-list/song-list.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".song-list {\n  width: 100%;\n  height: 100%; }\n  .song-list .header {\n    height: 250px;\n    width: 100%;\n    position: relative; }\n  .song-list .header .actions {\n      position: absolute;\n      left: 250px;\n      top: 108px;\n      width: 400px;\n      height: 30px;\n      display: flex;\n      justify-content: space-between;\n      align-items: center; }\n  .song-list .header .actions .save {\n        width: 82px;\n        height: 25px;\n        border: 1px solid #e4e4e4;\n        line-height: 23px;\n        border-radius: 5px;\n        text-align: center; }\n  .song-list .header .actions .share {\n        width: 82px;\n        height: 25px;\n        border: 1px solid #e4e4e4;\n        line-height: 23px;\n        border-radius: 5px;\n        text-align: center; }\n  .song-list .header .actions span.download-all {\n        width: 82px;\n        height: 25px;\n        border: 1px solid #e4e4e4;\n        line-height: 23px;\n        border-radius: 5px;\n        text-align: center; }\n  .song-list .header .actions .play-all {\n        width: 120px;\n        height: 25px;\n        font-size: 11px;\n        display: flex;\n        align-items: center;\n        justify-content: space-around;\n        color: #fff;\n        border-radius: 5px; }\n  .song-list .header .actions .play-all .left {\n          flex: 2;\n          display: flex;\n          justify-content: space-evenly;\n          align-items: center;\n          padding-right: 5px;\n          height: 100%;\n          border-radius: 5px 0 0 5px;\n          cursor: pointer; }\n  .song-list .header .actions .play-all .left:hover {\n            opacity: 0.9; }\n  .song-list .header .actions .play-all i.material-icons {\n          font-size: 16px !important; }\n  .song-list .header .actions .play-all .add-all {\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          border-left: 1px solid rgba(255, 255, 255, 0.6);\n          flex: 1;\n          height: 100%;\n          border-radius: 0px 5px 5px 0px;\n          cursor: pointer; }\n  .song-list .header .actions .play-all .add-all:hover {\n            opacity: 0.9; }\n  .song-list .header .img {\n      width: 200px;\n      height: 200px;\n      position: absolute;\n      left: 20px;\n      top: 30px;\n      background-repeat: no-repeat !important;\n      background-size: cover !important; }\n  .song-list .header .category {\n      height: 30px;\n      width: 50%;\n      position: absolute;\n      left: 250px;\n      top: 30px;\n      font-size: 20px;\n      font-weight: bold;\n      display: flex;\n      align-items: center; }\n  .song-list .header .category span.cate-label {\n        font-size: 11px;\n        border: 1px solid red;\n        color: red;\n        padding: 1px 5px 1px 5px;\n        margin-right: 10px;\n        border-radius: 3px;\n        font-weight: normal; }\n  .song-list .header .songer {\n      position: absolute;\n      left: 250px;\n      top: 70px;\n      width: 25; }\n  .song-list .header .create-date {\n      display: inline-block;\n      position: absolute;\n      left: 341px;\n      top: 71px;\n      color: #a5a5a5;\n      font-size: 12px; }\n  .song-list .header .desc {\n      width: 40%;\n      position: absolute;\n      left: 250px;\n      top: 187px;\n      display: block;\n      display: -webkit-box;\n      max-width: 100%;\n      height: 42px;\n      margin: 0 auto;\n      font-size: 13px;\n      line-height: 1.5;\n      -webkit-line-clamp: 2;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      display: -webkit-box;\n      max-width: 100%;\n      height: 43px;\n      margin: 0 auto;\n      font-size: 14px;\n      line-height: 1.5;\n      -webkit-line-clamp: 2;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n  .song-list .header .labels {\n      position: absolute;\n      left: 250px;\n      top: 159px;\n      font-size: 12px; }\n  .song-list .content {\n    height: calc(100% - 250px);\n    width: 100%; }\n  .song-list .content .mat-tab-body-content {\n      overflow: hidden !important; }\n  .song-list .content .song-item.header {\n      border-bottom: 1px solid #e2e0e0;\n      display: flex; }\n  .song-list .content .song-item:hover {\n      background: #e8e8e8 !important; }\n  .song-list .content .song-item {\n      height: 30px;\n      line-height: 30px;\n      cursor: pointer;\n      -webkit-user-select: none;\n         -moz-user-select: none;\n          -ms-user-select: none;\n              user-select: none;\n      display: flex; }\n  .song-list .content .song-item span.number {\n        display: inline-block;\n        width: 5%;\n        text-align: center; }\n  .song-list .content .song-item span.love {\n        display: inline-block;\n        width: 10%;\n        line-height: 25px; }\n  .song-list .content .song-item span.love i {\n          font-size: 15px;\n          transform: translateY(3px);\n          color: #a7a7a7;\n          margin-right: 5px; }\n  .song-list .content .song-item span.love i:hover {\n            color: #000; }\n  .song-list .content .song-item span.download {\n        display: inline-block;\n        width: 5%;\n        text-align: center; }\n  .song-list .content .song-item span.download i {\n          font-size: 15px;\n          transform: translateY(3px);\n          border: 1px solid gray;\n          border-radius: 50%;\n          margin-right: 5px; }\n  .song-list .content .song-item span.download i:hover {\n            color: gray; }\n  .song-list .content .song-item span.title {\n        width: 40%;\n        display: inline-block;\n        font-size: 13px;\n        padding-left: 10px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        padding-right: 5px; }\n  .song-list .content .song-item span.vip {\n        color: red;\n        border: 1px solid red;\n        padding: 1px 2px 1px 2px;\n        font-size: 10px;\n        margin-left: 10px;\n        border-radius: 3px; }\n  .song-list .content .song-item span.author {\n        display: inline-block;\n        width: 20%;\n        font-size: 12px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        padding-right: 5px; }\n  .song-list .content .song-item span.zhuanji {\n        display: inline-block;\n        width: 20%;\n        font-size: 12px;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        white-space: nowrap;\n        padding-right: 5px; }\n  .song-list .content .song-item span.time {\n        display: inline-block;\n        font-size: 12px;\n        color: gray; }\n  .song-list .content .song-item span.action {\n        display: inline-block;\n        width: 10%; }\n  .song-list .content .song-item:nth-child(odd) {\n      background: #fff; }\n  .song-list .content .song-item:nth-child(even) {\n      background: #fbfbfb; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3RyYXZpcy9idWlsZC9yZW5ob25nbC93YW5neWl5dW4tb25saW5lL3NyYy9hcHAvc29uZy1saXN0L3NvbmctbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQUNJLFlBQVc7RUFDWCxhQUFZLEVBZ1RmO0VBbFREO0lBS1EsY0FBYTtJQUNiLFlBQVc7SUFDWCxtQkFBa0IsRUF5S3JCO0VBaExMO01BVVksbUJBQWtCO01BQ2xCLFlBQVc7TUFDWCxXQUFVO01BQ1YsYUFBWTtNQUNaLGFBQVk7TUFDWixjQUFhO01BQ2IsK0JBQThCO01BQzlCLG9CQUFtQixFQTRFdEI7RUE3RlQ7UUFvQmdCLFlBQVc7UUFDWCxhQUFZO1FBQ1osMEJBQXlCO1FBQ3pCLGtCQUFpQjtRQUNqQixtQkFBa0I7UUFDbEIsbUJBQWtCLEVBQ3JCO0VBMUJiO1FBNkJnQixZQUFXO1FBQ1gsYUFBWTtRQUNaLDBCQUF5QjtRQUN6QixrQkFBaUI7UUFDakIsbUJBQWtCO1FBQ2xCLG1CQUFrQixFQUNyQjtFQW5DYjtRQXNDZ0IsWUFBVztRQUNYLGFBQVk7UUFDWiwwQkFBeUI7UUFDekIsa0JBQWlCO1FBQ2pCLG1CQUFrQjtRQUNsQixtQkFBa0IsRUFDckI7RUE1Q2I7UUErQ2dCLGFBQVk7UUFDWixhQUFZO1FBRVosZ0JBQWU7UUFDZixjQUFhO1FBQ2Isb0JBQW1CO1FBQ25CLDhCQUE2QjtRQUM3QixZQUFXO1FBQ1gsbUJBQWtCLEVBcUNyQjtFQTVGYjtVQTBEb0IsUUFBTztVQUNQLGNBQWE7VUFDYiw4QkFBNkI7VUFDN0Isb0JBQW1CO1VBQ25CLG1CQUFrQjtVQUNsQixhQUFZO1VBQ1osMkJBQTBCO1VBQzFCLGdCQUFlLEVBTWxCO0VBdkVqQjtZQXFFd0IsYUFBWSxFQUNmO0VBdEVyQjtVQTBFb0IsMkJBQTBCLEVBQzdCO0VBM0VqQjtVQThFb0IsY0FBYTtVQUNiLHdCQUF1QjtVQUN2QixvQkFBbUI7VUFDbkIsZ0RBQStDO1VBQy9DLFFBQU87VUFDUCxhQUFZO1VBQ1osK0JBQThCO1VBQzlCLGdCQUFlLEVBTWxCO0VBM0ZqQjtZQXlGd0IsYUFBWSxFQUNmO0VBMUZyQjtNQWdHWSxhQUFZO01BQ1osY0FBYTtNQUNiLG1CQUFrQjtNQUNsQixXQUFVO01BQ1YsVUFBUztNQUNULHdDQUF1QztNQUN2QyxrQ0FBaUMsRUFDcEM7RUF2R1Q7TUEwR1ksYUFBWTtNQUNaLFdBQVU7TUFDVixtQkFBa0I7TUFDbEIsWUFBVztNQUNYLFVBQVM7TUFDVCxnQkFBZTtNQUNmLGtCQUFpQjtNQUNqQixjQUFhO01BQ2Isb0JBQW1CLEVBV3RCO0VBN0hUO1FBcUhnQixnQkFBZTtRQUNmLHNCQUFxQjtRQUNyQixXQUFVO1FBQ1YseUJBQXdCO1FBQ3hCLG1CQUFrQjtRQUNsQixtQkFBa0I7UUFDbEIsb0JBQW1CLEVBQ3RCO0VBNUhiO01BZ0lZLG1CQUFrQjtNQUNsQixZQUFXO01BQ1gsVUFBUztNQUNULFVBQVMsRUFDWjtFQXBJVDtNQXVJWSxzQkFBcUI7TUFDckIsbUJBQWtCO01BQ2xCLFlBQVc7TUFDWCxVQUFTO01BQ1QsZUFBYztNQUNkLGdCQUFlLEVBQ2xCO0VBN0lUO01BZ0pZLFdBQVU7TUFDVixtQkFBa0I7TUFDbEIsWUFBVztNQUNYLFdBQVU7TUFDVixlQUFjO01BQ2QscUJBQW9CO01BQ3BCLGdCQUFlO01BQ2YsYUFBWTtNQUNaLGVBQWM7TUFDZCxnQkFBZTtNQUNmLGlCQUFnQjtNQUNoQixzQkFBcUI7TUFDckIsaUJBQWdCO01BQ2hCLHdCQUF1QjtNQUN2QixxQkFBb0I7TUFDcEIsZ0JBQWU7TUFDZixhQUFZO01BQ1osZUFBYztNQUNkLGdCQUFlO01BQ2YsaUJBQWdCO01BQ2hCLHNCQUFxQjtNQUVyQixpQkFBZ0I7TUFDaEIsd0JBQXVCLEVBQzFCO0VBeEtUO01BMktZLG1CQUFrQjtNQUNsQixZQUFXO01BQ1gsV0FBVTtNQUNWLGdCQUFlLEVBQ2xCO0VBL0tUO0lBbUxRLDJCQUEwQjtJQUMxQixZQUFXLEVBNkhkO0VBalRMO01BdUxZLDRCQUEyQixFQUM5QjtFQXhMVDtNQTJMWSxpQ0FBZ0M7TUFDaEMsY0FBYSxFQUNoQjtFQTdMVDtNQWdNWSwrQkFBOEIsRUFDakM7RUFqTVQ7TUFvTVksYUFBWTtNQUNaLGtCQUFpQjtNQUNqQixnQkFBZTtNQUNmLDBCQUFpQjtTQUFqQix1QkFBaUI7VUFBakIsc0JBQWlCO2NBQWpCLGtCQUFpQjtNQUNqQixjQUFhLEVBZ0doQjtFQXhTVDtRQTJNZ0Isc0JBQXFCO1FBQ3JCLFVBQVM7UUFDVCxtQkFBa0IsRUFDckI7RUE5TWI7UUFxTmdCLHNCQUFxQjtRQUNyQixXQUFVO1FBQ1Ysa0JBQWlCLEVBWXBCO0VBbk9iO1VBME5vQixnQkFBZTtVQUNmLDJCQUEwQjtVQUMxQixlQUFjO1VBS2Qsa0JBQWlCLEVBQ3BCO0VBbE9qQjtZQStOd0IsWUFBVyxFQUNkO0VBaE9yQjtRQXNPZ0Isc0JBQXFCO1FBQ3JCLFVBQVM7UUFDVCxtQkFBa0IsRUFZckI7RUFwUGI7VUEyT29CLGdCQUFlO1VBQ2YsMkJBQTBCO1VBSTFCLHVCQUFzQjtVQUN0QixtQkFBa0I7VUFDbEIsa0JBQWlCLEVBQ3BCO0VBblBqQjtZQThPd0IsWUFBVyxFQUNkO0VBL09yQjtRQXVQZ0IsV0FBVTtRQUNWLHNCQUFxQjtRQUNyQixnQkFBZTtRQUNmLG1CQUFrQjtRQUNsQixpQkFBZ0I7UUFDaEIsd0JBQXVCO1FBQ3ZCLG9CQUFtQjtRQUNuQixtQkFBa0IsRUFDckI7RUEvUGI7UUFrUWdCLFdBQVU7UUFDVixzQkFBcUI7UUFDckIseUJBQXdCO1FBQ3hCLGdCQUFlO1FBQ2Ysa0JBQWlCO1FBQ2pCLG1CQUFrQixFQUNyQjtFQXhRYjtRQTJRZ0Isc0JBQXFCO1FBQ3JCLFdBQVU7UUFDVixnQkFBZTtRQUNmLGlCQUFnQjtRQUNoQix3QkFBdUI7UUFDdkIsb0JBQW1CO1FBQ25CLG1CQUFrQixFQUNyQjtFQWxSYjtRQXFSZ0Isc0JBQXFCO1FBQ3JCLFdBQVU7UUFDVixnQkFBZTtRQUNmLGlCQUFnQjtRQUNoQix3QkFBdUI7UUFDdkIsb0JBQW1CO1FBQ25CLG1CQUFrQixFQUNyQjtFQTVSYjtRQStSZ0Isc0JBQXFCO1FBQ3JCLGdCQUFlO1FBQ2YsWUFBVyxFQUNkO0VBbFNiO1FBcVNnQixzQkFBcUI7UUFDckIsV0FBVSxFQUNiO0VBdlNiO01BMlNZLGlCQUFnQixFQUNuQjtFQTVTVDtNQStTWSxvQkFBbUIsRUFDdEIiLCJmaWxlIjoic3JjL2FwcC9zb25nLWxpc3Qvc29uZy1saXN0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbi5zb25nLWxpc3Qge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcblxuICAgIC5oZWFkZXIge1xuICAgICAgICBoZWlnaHQ6IDI1MHB4O1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgICAgIC5hY3Rpb25zIHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGxlZnQ6IDI1MHB4O1xuICAgICAgICAgICAgdG9wOiAxMDhweDtcbiAgICAgICAgICAgIHdpZHRoOiA0MDBweDtcbiAgICAgICAgICAgIGhlaWdodDogMzBweDtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgICAgICAgICAuc2F2ZSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDgycHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyNXB4O1xuICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDIzcHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLnNoYXJlIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogODJweDtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDI1cHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2U0ZTRlNDtcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogMjNweDtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzcGFuLmRvd25sb2FkLWFsbCB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDgycHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyNXB4O1xuICAgICAgICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNlNGU0ZTQ7XG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDIzcHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLnBsYXktYWxsIHtcbiAgICAgICAgICAgICAgICB3aWR0aDogMTIwcHg7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyNXB4O1xuICAgICAgICAgICAgICAgIC8vIGJhY2tncm91bmQ6ICM1YjhiZTY7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgICAgICAgICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHg7XG5cbiAgICAgICAgICAgICAgICAubGVmdHtcbiAgICAgICAgICAgICAgICAgICAgZmxleDogMjtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gICAgICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDVweDtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1cHggMCAwIDVweDtcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgICAgICAgICAgICAgICAgICY6aG92ZXJ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBiYWNrZ3JvdW5kOiAjNGY3YmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC45O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGkubWF0ZXJpYWwtaWNvbnMge1xuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE2cHggIWltcG9ydGFudDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAuYWRkLWFsbCB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbiAgICAgICAgICAgICAgICAgICAgZmxleDogMTtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwcHggNXB4IDVweCAwcHg7XG4gICAgICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICAgICAgICAgICAgICAgICAmOmhvdmVye1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmFja2dyb3VuZDogIzRmN2JjZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuOTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC5pbWcge1xuICAgICAgICAgICAgd2lkdGg6IDIwMHB4O1xuICAgICAgICAgICAgaGVpZ2h0OiAyMDBweDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGxlZnQ6IDIwcHg7XG4gICAgICAgICAgICB0b3A6IDMwcHg7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyICFpbXBvcnRhbnQ7XG4gICAgICAgIH1cblxuICAgICAgICAuY2F0ZWdvcnkge1xuICAgICAgICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgICAgICAgd2lkdGg6IDUwJTtcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIGxlZnQ6IDI1MHB4O1xuICAgICAgICAgICAgdG9wOiAzMHB4O1xuICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcblxuICAgICAgICAgICAgc3Bhbi5jYXRlLWxhYmVsIHtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDExcHg7XG4gICAgICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xuICAgICAgICAgICAgICAgIGNvbG9yOiByZWQ7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMXB4IDVweCAxcHggNXB4O1xuICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC5zb25nZXIge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgbGVmdDogMjUwcHg7XG4gICAgICAgICAgICB0b3A6IDcwcHg7XG4gICAgICAgICAgICB3aWR0aDogMjU7XG4gICAgICAgIH1cblxuICAgICAgICAuY3JlYXRlLWRhdGUge1xuICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgbGVmdDogMzQxcHg7XG4gICAgICAgICAgICB0b3A6IDcxcHg7XG4gICAgICAgICAgICBjb2xvcjogI2E1YTVhNTtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5kZXNjIHtcbiAgICAgICAgICAgIHdpZHRoOiA0MCU7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBsZWZ0OiAyNTBweDtcbiAgICAgICAgICAgIHRvcDogMTg3cHg7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAgICAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgaGVpZ2h0OiA0MnB4O1xuICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgICBmb250LXNpemU6IDEzcHg7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgICAgICAgLXdlYmtpdC1saW5lLWNsYW1wOiAyO1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICAgICAgZGlzcGxheTogLXdlYmtpdC1ib3g7XG4gICAgICAgICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICAgICAgICBoZWlnaHQ6IDQzcHg7XG4gICAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgICAgICAgICAtd2Via2l0LWxpbmUtY2xhbXA6IDI7XG4gICAgICAgICAgICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxhYmVscyB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICBsZWZ0OiAyNTBweDtcbiAgICAgICAgICAgIHRvcDogMTU5cHg7XG4gICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuY29udGVudHtcbiAgICAgICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAyNTBweCk7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuXG4gICAgICAgIC5tYXQtdGFiLWJvZHktY29udGVudHtcbiAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zb25nLWl0ZW0uaGVhZGVye1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlMmUwZTA7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnNvbmctaXRlbTpob3ZlcntcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNlOGU4ZTggIWltcG9ydGFudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zb25nLWl0ZW0ge1xuICAgICAgICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDMwcHg7XG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG5cbiAgICAgICAgICAgIHNwYW4ubnVtYmVyIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDUlO1xuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLm51bWJlci5jdXJyZW50e1xuICAgICAgICAgICAgICAgIC8vIGNvbG9yOiAjNWI4YmU2ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNwYW4ubG92ZSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMCU7XG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDI1cHg7XG5cbiAgICAgICAgICAgICAgICBpe1xuICAgICAgICAgICAgICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgzcHgpO1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogI2E3YTdhNztcblxuICAgICAgICAgICAgICAgICAgICAmOmhvdmVye1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICMwMDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzcGFuLmRvd25sb2FkIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDUlO1xuICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAgICAgICAgICAgICAgIGl7XG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDNweCk7XG4gICAgICAgICAgICAgICAgICAgICY6aG92ZXJ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogZ3JheTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCBncmF5O1xuICAgICAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3Bhbi50aXRsZSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDQwJTtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgICAgICAgICAgIHBhZGRpbmctbGVmdDogMTBweDtcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgICAgICAgICAgcGFkZGluZy1yaWdodDogNXB4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzcGFuLnZpcCB7XG4gICAgICAgICAgICAgICAgY29sb3I6IHJlZDtcbiAgICAgICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMXB4IDJweCAxcHggMnB4O1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNwYW4uYXV0aG9yIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwJTtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDVweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3Bhbi56aHVhbmppIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIwJTtcbiAgICAgICAgICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICAgICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDVweDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3Bhbi50aW1lIHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgICAgICAgICAgIGNvbG9yOiBncmF5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzcGFuLmFjdGlvbiB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgIHdpZHRoOiAxMCU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAuc29uZy1pdGVtOm50aC1jaGlsZChvZGQpe1xuICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgfVxuXG4gICAgICAgIC5zb25nLWl0ZW06bnRoLWNoaWxkKGV2ZW4pe1xuICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZiZmJmYjtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0= */"

/***/ }),

/***/ "./src/app/song-list/song-list.component.ts":
/*!**************************************************!*\
  !*** ./src/app/song-list/song-list.component.ts ***!
  \**************************************************/
/*! exports provided: SongListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SongListComponent", function() { return SongListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _song_list_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./song-list.service */ "./src/app/song-list/song-list.service.ts");
/* harmony import */ var _home_home_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../home/home.service */ "./src/app/home/home.service.ts");
/* harmony import */ var _footer_footer_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../footer/footer.service */ "./src/app/footer/footer.service.ts");
/* harmony import */ var ng_zorro_antd_message__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng-zorro-antd/message */ "./node_modules/ng-zorro-antd/fesm5/ng-zorro-antd-message.js");
/* harmony import */ var _header_header_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../header/header.service */ "./src/app/header/header.service.ts");








var SongListComponent = /** @class */ (function () {
    function SongListComponent(route, songListSer, homeSer, footSer, message, headerSer) {
        this.route = route;
        this.songListSer = songListSer;
        this.homeSer = homeSer;
        this.footSer = footSer;
        this.message = message;
        this.headerSer = headerSer;
    }
    SongListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = this.route.snapshot.paramMap.get('id');
        this.songListSer.getSongList(id).subscribe(function (data) {
            _this.songList = _this.dataAdapter(data);
        });
        this.footSer.songDetail.subscribe(function (data) {
            _this.currentSong = data;
        });
        this.homeSer.playList.subscribe(function (data) {
            _this.playList = data;
        });
        this.headerSer.theme.subscribe(function (data) {
            _this.theme = data;
        });
    };
    SongListComponent.prototype.dataAdapter = function (data) {
        var _this = this;
        var playListData = data.playlist;
        if (!playListData) {
            return null;
        }
        var ret = {
            'img': playListData.coverImgUrl,
            'category': playListData.name,
            'number': playListData.trackCount,
            'playNumber': playListData.playCount,
            'author': playListData.creator.nickname,
            'createDate': playListData.trackUpdateTime,
            'label': playListData.tags,
            'desc': playListData.description,
            'songs': []
        };
        playListData.tracks.forEach(function (item) {
            var temp = {
                'id': item.id,
                'name': item.name,
                'author': item.ar[0].name,
                'zhuanji': item.al.name,
                'time': _this.timeFormat(item.dt),
                'vip': true,
                picUrl: item.al.picUrl,
                playCount: item.playCount
            };
            ret.songs.push(temp);
        });
        return ret;
    };
    SongListComponent.prototype.timeFormat = function (time) {
        var mins = Number.parseInt((time / 1000 / 60).toString());
        var secs = Number.parseInt((time / 1000 % 60).toString());
        return this.addZero(mins) + ':' + this.addZero(secs);
    };
    SongListComponent.prototype.addZero = function (time) {
        if (time < 10) {
            return '0' + time;
        }
        return time;
    };
    SongListComponent.prototype.singleClick = function (item) {
        var _this = this;
        this.timer = 0;
        this.preventSimpleClick = false;
        var delay = 500;
        this.timer = setTimeout(function () {
            if (!_this.preventSimpleClick) {
            }
        }, delay);
    };
    SongListComponent.prototype.doubleClick = function (id) {
        this.preventSimpleClick = true;
        clearTimeout(this.timer);
        this.playThisList(id);
    };
    SongListComponent.prototype.addThisList = function () {
        var newList = this.playList.concat(this.songList.songs);
        this.homeSer.playList.next(this.unique(newList));
        this.message.success("\u6B4C\u66F2\u5DF2\u7ECF\u5168\u90E8\u6DFB\u52A0\u5230\u64AD\u653E\u5217\u8868");
    };
    SongListComponent.prototype.unique = function (list) {
        var temp = [];
        list.forEach(function (item) {
            var has = false;
            temp.forEach(function (ite, index) {
                if (item.id === ite.id) {
                    has = true;
                    if (item.current) {
                        temp[index] = item;
                    }
                }
            });
            if (!has) {
                temp.push(item);
            }
        });
        return temp;
    };
    SongListComponent.prototype.playThisList = function (id) {
        var newList = Object.assign([], this.songList.songs);
        newList.forEach(function (item) {
            if (item.id === id) {
                item.current = true;
            }
            else {
                item.current = false;
            }
        });
        this.homeSer.playList.next(newList);
        this.message.success("\u6B63\u5728\u64AD\u653E\u8BE5\u6B4C\u5355");
    };
    SongListComponent.prototype.addThisSong = function (song) {
        var newList = Object.assign([], this.playList);
        newList.push(song);
        this.homeSer.playList.next(this.unique(newList));
        this.message.success("\u6DFB\u52A0\u6210\u529F\uFF1A" + song.name);
    };
    SongListComponent.prototype.playThisSong = function (song) {
        var newSong = Object.assign({}, song);
        newSong.current = true;
        var newList = Object.assign([], this.playList);
        newList.forEach(function (item) {
            item.current = false;
        });
        newList.push(newSong);
        this.homeSer.playList.next(this.unique(newList));
        this.message.success("\u6B63\u5728\u64AD\u653E\uFF1A" + song.name);
    };
    SongListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-song-list',
            template: __webpack_require__(/*! ./song-list.component.html */ "./src/app/song-list/song-list.component.html"),
            styles: [__webpack_require__(/*! ./song-list.component.scss */ "./src/app/song-list/song-list.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _song_list_service__WEBPACK_IMPORTED_MODULE_3__["SongListService"],
            _home_home_service__WEBPACK_IMPORTED_MODULE_4__["HomeService"],
            _footer_footer_service__WEBPACK_IMPORTED_MODULE_5__["FooterService"],
            ng_zorro_antd_message__WEBPACK_IMPORTED_MODULE_6__["NzMessageService"],
            _header_header_service__WEBPACK_IMPORTED_MODULE_7__["HeaderService"]])
    ], SongListComponent);
    return SongListComponent;
}());



/***/ }),

/***/ "./src/app/song-list/song-list.module.ts":
/*!***********************************************!*\
  !*** ./src/app/song-list/song-list.module.ts ***!
  \***********************************************/
/*! exports provided: SongListModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SongListModule", function() { return SongListModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _song_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./song-list.component */ "./src/app/song-list/song-list.component.ts");
/* harmony import */ var _share_ui_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../share/ui.module */ "./src/app/share/ui.module.ts");
/* harmony import */ var _header_header_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../header/header.module */ "./src/app/header/header.module.ts");






var SongListModule = /** @class */ (function () {
    function SongListModule() {
    }
    SongListModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_song_list_component__WEBPACK_IMPORTED_MODULE_3__["SongListComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _share_ui_module__WEBPACK_IMPORTED_MODULE_4__["UiModule"],
                _header_header_module__WEBPACK_IMPORTED_MODULE_5__["HeaderModule"]
            ],
            exports: [_song_list_component__WEBPACK_IMPORTED_MODULE_3__["SongListComponent"]]
        })
    ], SongListModule);
    return SongListModule;
}());



/***/ }),

/***/ "./src/app/song-list/song-list.service.ts":
/*!************************************************!*\
  !*** ./src/app/song-list/song-list.service.ts ***!
  \************************************************/
/*! exports provided: SongListService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SongListService", function() { return SongListService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var SongListService = /** @class */ (function () {
    function SongListService(http) {
        this.http = http;
    }
    // getSongList(id) {
    //   return this.http.get(`/wangyiyun-online/assets/api/song-list-${id}.json`);
    // }
    SongListService.prototype.getSongList = function (id) {
        return this.http.get("https://api.imjad.cn/cloudmusic/?type=playlist&id=" + id + "&limit=100");
    };
    SongListService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], SongListService);
    return SongListService;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module.js.map