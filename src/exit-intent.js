;(function(window, document) {

    "use strict";

    /**
     * Exitintent offset:
     * Wanting to hit close button at top right
     * corner, user can perform exit intent by
     * dragging the mouse to the right of the
     * window (instead to the top). So we do
     * not want to check if clientY is less
     * than 0, but if clientY is less than
     * custom offset...
     *
     * @type {Number}
     */
    window.EXITINTENT_OFFSET = 24;

    /**
     * Create exitintent event
     *
     * @param  {Mixed} e
     * @return {Event}
     */
    var createEvent = function(e) {
        if (!e || typeof e !== "object")
            e = {};

        var result = null,
            eventType = "exitintent",
            params = {
                altKey: e.altKey || false,
                bubbles: false,
                button: e.button || 0,
                buttons: e.buttons || 0,
                cancelable: false,
                clientX: e.clientX || 0,
                clientY: e.clientY || 0,
                ctrlKey: e.ctrlKey || false,
                metaKey: e.metaKey || false,
                offsetX: e.offsetX || 0,
                offsetY: e.offsetY || 0,
                pageX: e.pageX || 0,
                pageY: e.pageY || 0,
                relatedTarget: e.relatedTarget || null,
                screenX: e.screenX || 0,
                screenY: e.screenY || 0,
                shiftKey: e.shiftKey || false,
                view: e.view || null,
                which: e.which || 0,
                x: e.x || 0,
                y: e.y || 0,
            };

        try {
            result = new MouseEvent(eventType, params);
        } catch(e) {
            result = document.createEvent("MouseEvent");
            result.initMouseEvent(eventType,
                params.bubbles,
                params.cancelable,
                window,
                0,
                params.screenX,
                params.screenY,
                params.clientX,
                params.clientY,
                params.ctrlKey,
                params.altKey,
                params.shiftKey,
                params.metaKey,
                params.button,
                params.relatedTarget,
            );
        };

        return result;
    };

    /**
     * Document mouseout event handler
     *
     * @param  {Event} e
     * @return {Void}
     */
    var handleMouseout = function(e) {
        // check related target (it should be
        // null if we're dragging mouse outside
        // the window)
        if (e.relatedTarget)
            return;

        // check offset
        if (e.clientY > EXITINTENT_OFFSET)
            return;

        // emit event
        var event = createEvent(e);
        this.dispatchEvent(event);
    };

    // bind handler
    document.addEventListener("mouseout", handleMouseout);

})(window, document);
