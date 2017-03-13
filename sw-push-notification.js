(function () {
    'use strict';

    self.addEventListener('push', function (event) {
        console.log('Push message', event);

        event.waitUntil(self.registration.showNotification('Wichtig', {
            body: 'Aktie fällt',
            icon: '/images/down.png',
            tag: 'my-tag'
        }));
    });

    self.addEventListener('notificationclick', function (event) {
        var messageId = event.notification.data;

        event.notification.close();

        if (event.action === 'payShare') {
            console.log('Aktie gekauft!');
        }
    }, false);
})();