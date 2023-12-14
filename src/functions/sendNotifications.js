const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendNotificationOnTransferChange = functions.firestore
  .document('users/{userId}')
  .onUpdate(async (change, context) => {
    const userId = context.params.userId;
    const previousTransfers = change.before.data().transfers || [];
    const currentTransfers = change.after.data().transfers || [];

    // Check if the transfers array has changed
    if (!arraysEqual(previousTransfers, currentTransfers)) {
      const registrationTokens = await getRegistrationTokens(userId);

      const payload = {
        notification: {
          title: 'Transfers Updated',
          body: 'The transfers array in your user document has been updated.',
        },
      };

      try {
        await admin.messaging().sendToDevice(registrationTokens, payload);
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    }
  });

async function getRegistrationTokens(userId) {
  const userDoc = await admin.firestore().collection('users').doc(userId).get();
  const tokens = userDoc.data().tokens || [];
  return tokens;
}

// Helper function to check if two arrays are equal
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
