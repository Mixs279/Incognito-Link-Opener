(function() {
	let incognitoModeActive = false;
	let indicator = null;
	const keysPressed = new Set();

	(function injectStyles() {
		if (!document.getElementById('incognito-indicator-style')) {
			const style = document.createElement('style');
			style.id = 'incognito-indicator-style';
			style.textContent = `
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .incognito-indicator {
          position: fixed;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          padding: 5px 10px;
          border-radius: 10px;
          font-size: 14px;
          z-index: 2147483647; 
          pointer-events: none; 
          background: linear-gradient(270deg, 
            hsl(0, 70%, 90%),    
            hsl(60, 70%, 90%),   
            hsl(120, 70%, 90%),  
            hsl(180, 70%, 90%),  
            hsl(240, 70%, 90%),  
            hsl(300, 70%, 90%)   
          );
          background-size: 600% 600%;
          animation: gradient 8s ease infinite;
          color: #333;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .incognito-indicator.visible {
          opacity: 1;
        }
      `;
			document.head.appendChild(style);
		}
	})();

	function showIndicator() {
		if (!indicator) {
			indicator = document.createElement('div');
			indicator.classList.add('incognito-indicator');
			indicator.innerText = "Incognito Shortcut Active";
			document.body.appendChild(indicator);

			requestAnimationFrame(() => {
				indicator.classList.add('visible');
			});
		}
	}

	function hideIndicator() {
		if (indicator) {

			indicator.classList.remove('visible');

			indicator.addEventListener('transitionend', function handler() {
				indicator.removeEventListener('transitionend', handler);
				if (indicator && !indicator.classList.contains('visible')) {
					indicator.remove();
					indicator = null;
				}
			});
		}
	}

	function resetShortcut() {
		keysPressed.clear();
		if (incognitoModeActive) {
			incognitoModeActive = false;
			hideIndicator();
		}
	}

	document.addEventListener('visibilitychange', () => {
		if (document.hidden) {
			resetShortcut();
		}
	});

	window.addEventListener('blur', () => {
		resetShortcut();
	});

	document.addEventListener('keydown', (e) => {
		keysPressed.add(e.key);
		if (keysPressed.has('Shift') && keysPressed.has('Alt')) {
			if (!incognitoModeActive) {
				incognitoModeActive = true;
				showIndicator();
			}

			e.stopPropagation();
			e.preventDefault();
		}
	}, true);

	document.addEventListener('keyup', (e) => {
		keysPressed.delete(e.key);

		if (!(keysPressed.has('Shift') && keysPressed.has('Alt'))) {
			if (incognitoModeActive) {
				incognitoModeActive = false;
				hideIndicator();
			}
		}
	}, true);

	document.addEventListener('click', (e) => {
		if (incognitoModeActive) {
			let target = e.target;
			let link = target.closest('a');
			if (link && link.href) {
				e.preventDefault();
				e.stopPropagation();
				chrome.runtime.sendMessage({
					action: 'openInIncognito',
					url: link.href
				});
			}
		}
	}, true);
})();