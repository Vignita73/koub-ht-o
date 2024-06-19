const webPush = require('web-push');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const vapidKeys = {
    publicKey: 'BLJHU1bVem4JfvV2_Lpnfo2vTZQhtUZKTajrfxXzX4Bjtq4P4yr34fLyqc8pZwe6p1zGdHoy0fCatmLafRBPZwI',
    privateKey: 'McTC5eDPkX6TAspNVJNdX8mcf28WVbifzaDjOfYfSkI'
};

webPush.setVapidDetails(
    'mailto:your-email@example.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


let subscriptions = [];

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    subscriptions.push(subscription);
    res.status(201).json({});
});

function sendNotification(subscription, dataToSend) {
    webPush.sendNotification(subscription, JSON.stringify(dataToSend))
        .then(response => console.log('Notification sent!', response))
        .catch(error => console.error('Error sending notification', error));
}

function checkWeatherAndNotify() {
    subscriptions.forEach(subscription => {
        // Vérifiez la météo pour les dates importantes
        const weatherData = ;
        const datesImportantes = JSON.parse(localStorage.getItem('datesImportantes')) || [];
        
        datesImportantes.forEach(date => {
            const weatherForDate = ;
            if (weatherForDate.badWeather) {
                const payload = {
                    title: 'Météo mauvaise',
                    body: `Il ne fait pas beau le ${date}.`
                };
                sendNotification(subscription, payload);
            }
        });
    });
}

setInterval(checkWeatherAndNotify, 86400000); // Toutes les jours

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
