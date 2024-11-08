import { getAuth, createUserWithEmailAndPassword, reauthenticateWithCredential, EmailAuthProvider, signInWithEmailAndPassword  } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, updateDoc, getDocs, query, where, getDoc } from 'firebase/firestore';


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
    async login(email, password) {
            return await signInWithEmailAndPassword(getAuth(), email, password);
    },
    updateMy(data) {
        const userDocRef = doc(collection(getFirestore(), 'users'), getAuth().currentUser.uid)
        return updateDoc(userDocRef, data)
    },
    update(uid, data) {
        const userDocRef = doc(collection(getFirestore(), 'users'), uid)
        return updateDoc(userDocRef, data)
    },
    async getMy() {
        return (await getDoc(doc(collection(getFirestore(), 'users'), getAuth().currentUser.uid))).data()
    },
    async getUserUID(email) {
        const querySnapshot = await getDocs(query(collection(getFirestore(), 'users'), where('email', '==', email + "@gmail.com")));
        return querySnapshot.docs[0]?.id;
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
        return querySnapshot.docs[0]?.data()[field];
    },
    async deleteMyData(password) {
        const user = getAuth().currentUser;
        await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password));
        await user.delete();
    },
}