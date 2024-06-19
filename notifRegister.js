// Vérifiez si le navigateur prend en charge les notifications
if ('Notification' in window && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
            console.log('Service Worker Registered', registration);
            return registration.pushManager.getSubscription()
                .then(function(subscription) {
                    if (subscription) {
                        return subscription;
                    }
                    return registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array('BLJHU1bVem4JfvV2_Lpnfo2vTZQhtUZKTajrfxXzX4Bjtq4P4yr34fLyqc8pZwe6p1zGdHoy0fCatmLafRBPZwI')
                    });
                });
        })
        .then(function(subscription) {
            console.log('User is subscribed:', subscription);
            // Envoyer l'abonnement au serveur pour l'enregistrer
            fetch('/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .catch(function(error) {
            console.error('Service Worker Error', error);
        });
}

// Convertir une clé publique VAPID en Uint8Array
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
