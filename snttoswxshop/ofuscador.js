 // 1) contextmenu
    document.addEventListener('contextmenu', function(e) {
        try { e.preventDefault(); } catch (err) {}
        handleDetection('Clique direito (contextmenu)');
    }, { passive: false });

    // 2) keyboard combos (cross-platform)
    document.addEventListener('keydown', function(e) {
        try {
            const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
            const metaKey = isMac ? e.metaKey : e.ctrlKey;

            // F12
            if (e.key === 'F12' || e.keyCode === 123) {
                try { e.preventDefault(); } catch (err) {}
                handleDetection('F12');
                return;
            }

            // Ctrl/Cmd+Shift+I or J
            if (metaKey && e.shiftKey && (e.key && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'j'))) {
                try { e.preventDefault(); } catch (err) {}
                handleDetection('Ctrl/Cmd+Shift+I/J');
                return;
            }

            // Ctrl/Cmd+U
            if (metaKey && (e.key && e.key.toLowerCase() === 'u')) {
                try { e.preventDefault(); } catch (err) {}
                handleDetection('Ctrl/Cmd+U');
                return;
            }

            // Ctrl/Cmd+Shift+C
            if (metaKey && e.shiftKey && (e.key && e.key.toLowerCase() === 'c')) {
                try { e.preventDefault(); } catch (err) {}
                handleDetection('Ctrl/Cmd+Shift+C');
                return;
            }
        } catch (err) {}
    }, { passive: false });

    // 3) outer/inner size detection (works across many browsers)
    setInterval(function() {
        try {
            const ow = window.outerWidth || 0;
            const iw = window.innerWidth || 0;
            const oh = window.outerHeight || 0;
            const ih = window.innerHeight || 0;
            if ((ow - iw) > CONFIG.SIZE_THRESHOLD || (oh - ih) > CONFIG.SIZE_THRESHOLD) {
                handleDetection('Diff outer/inner window size');
            }
        } catch (e) {}
    }, CONFIG.POLL_INTERVAL);

    // 4) getter trick — logs an object with a getter that triggers when inspected
    try {
        const obj = {};
        Object.defineProperty(obj, 'sdg', {
            get: function() {
                handleDetection('Getter-trick (console inspect)');
                return 'sdg';
            },
            configurable: true
        });
        // periodically log it to increase chance of triggering when console open
        setInterval(function() {
            try { console.log('%c', obj); } catch (e) {}
        }, CONFIG.GETTER_INTERVAL);
    } catch (e) {}

    // 5) debugger timing heuristic — if devtools pause on debugger, timing will spike
    setInterval(function() {
        try {
            const t0 = performance.now();
            // eslint-disable-next-line no-debugger
            debugger;
            const t1 = performance.now();
            if ((t1 - t0) > 120) {
                handleDetection('Debugger timing');
            }
        } catch (e) {}
    }, CONFIG.DEBUGGER_INTERVAL);

    // NOTE: combine heuristics if you want to reduce false positives.
    // Currently each heuristic shows the modal; you can change to require n events in window.