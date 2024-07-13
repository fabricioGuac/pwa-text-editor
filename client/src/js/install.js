const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Adds an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {

    window.deferredPrompt = event;

    butInstall.classList.toggle('hidden', false);

});

// Implements a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

    const prompt = window.deferredPrompt;

    if(!prompt){
        return;
    }

    prompt.prompt();

    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// Adds an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
