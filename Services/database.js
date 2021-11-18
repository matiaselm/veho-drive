import firebase from '@/services/firebase';

export default database = {
    get: (source) => new Promise(async(resolve, reject) => {
        try {
            const db = firebase.firestore();
            let response = { data: [], error: null };
            const res = await db.collection(source).get()
            for(let doc of res.docs) {
                response.data.push(doc.data())
            }
            resolve(response)
        } catch (error) {
            console.error('database', error)
            response.error = error
            reject(response)
        }
    })
}