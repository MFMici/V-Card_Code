import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, updateDoc, getDocs, query, where } from 'firebase/firestore';

export default {
    // One liners awaits, we can just await on the parent
    async register(email, password, phone) {
        try {
            const response = await createUserWithEmailAndPassword(getAuth(), email, password);
            const userDocRef = doc(collection(getFirestore(), 'users'), response.user.uid);

            await setDoc(userDocRef, {
                email,
                phone,
            });

            return response
        }
        catch (error) {
            console.error('Error registering user:', error.message);
        }
    },
    update(data) {
        const userDocRef = doc(collection(getFirestore(), 'users'), getAuth().currentUser.uid)
        return updateDoc(userDocRef, data)
    },

    async getDoc(field, data) {
        try {
            const querySnapshot = await getDocs(query(collection(getFirestore(), 'users'), where(field, '==', data)));
            return querySnapshot.docs.map(doc => doc.data());
        }
        catch (error) {
            console.error('Error getting ' + field + ':', error.message);
        }
    },
    async getField(field, data) {
            const querySnapshot = await getDocs(query(collection(getFirestore(), 'users'), where(field, '==', data)));
            return querySnapshot.docs[0].data()[field];
    }
}