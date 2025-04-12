# Incognito Link Opener

Incognito Link Opener is a lightweight Chrome extension designed to open links in an incognito window when a user clicks on a link while holding the Shift and Alt keys. This extension simplifies the process of opening content in private browsing mode without having to manually launch an incognito window.

---

## Features

- **Instant Incognito Access:** Opens links in a new incognito window when the Shift and Alt keys are held during a click.
- **Visual Feedback:** Displays a temporary, animated indicator ("Incognito Shortcut Active") at the top of the page when the incognito shortcut is active.
- **Universal Link Handling:** Works on all websites, thanks to broad URL matching.
- **Clean Design:** Minimalistic codebase using content and background scripts to ensure smooth functioning.

---

## Installation

To install the Incognito Link Opener extension, follow these steps:

1. **Clone or Download the Repository:**
   ```bash
   git clone https://github.com/Mixs279/Incognito-Link-Opener.git
   ```
   Alternatively, [download the ZIP](https://github.com/Mixs279/Incognito-Link-Opener/archive/refs/heads/main.zip) archive and extract the files.

2. **Load the Extension in Chrome:**
   - Open Google Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** using the toggle in the upper right corner.
   - Click on **Load unpacked** and select the extension's directory.

3. **Using the Extension:**
   - When you browse any website, hold down **Shift + Alt**. An animated visual indicator will appear, showing that the incognito shortcut is active.
   - Click any link while the indicator is visible. The link will automatically open in a new incognito window.

---

## File Structure

- **manifest.json:**  
  The manifest file defines the extension's configuration, including the extension’s name, version, permissions, icons, background service worker, and content scripts. It also specifies that the incognito mode is set to "spanning", meaning both incognito and regular contexts can share the extension.

- **background.js:**  
  This file runs as a background service worker and listens for messages from the content script. When it receives a message with the action `openInIncognito` and a valid URL, it creates a new incognito window and loads the URL.  

- **content.js:**  
  The content script is injected into all web pages as defined by the manifest. It:
  - Monitors key events to detect when the Shift and Alt keys are pressed.
  - Displays a visual indicator ("Incognito Shortcut Active") when the correct keys are held.
  - Listens for click events on links. If the incognito shortcut is active, it prevents the default behavior and sends a message to the background script to open the link in a new incognito window.

- **Icon Files (icon16.png, icon48.png, icon128.png):**  
  These icon files are used for the extension’s display in various contexts within Chrome (toolbar, extension management page, etc.).

---

## How It Works

### Key Detection and Visual Indicator

- **Key Events:**  
  The content script listens for `keydown` and `keyup` events. It uses a `Set` to track which keys are currently pressed. When both the **Shift** and **Alt** keys are detected, the script considers the incognito shortcut active.

- **Indicator Animation:**  
  Once activated, a stylish indicator is injected into the current page. The indicator uses CSS animations (a gradient background that animates over time) to visually confirm that the shortcut is active.

### Handling Link Clicks

- When the incognito mode shortcut is active, clicking on any link triggers the content script to:
  1. **Intercept the Click:** Prevent default link behavior.
  2. **Communicate with the Background Script:** Send a message (`openInIncognito`) including the URL to open.
  3. **Open Incognito Window:** The background service worker listens for this message and opens a new incognito window with the given URL.

---

## Contribution

Contributions to improve the Incognito Link Opener are welcome. Whether it’s reporting issues, suggesting new features, or submitting pull requests, feel free to participate.

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes with clear commit messages.
4. Submit a pull request describing your changes.

---

## License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for full details.

---

Enjoy a more streamlined and private browsing experience with Incognito Link Opener! If you encounter any issues or have suggestions, please open an issue in the repository.
