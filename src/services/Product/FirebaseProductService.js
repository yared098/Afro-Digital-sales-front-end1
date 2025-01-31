import { dbConfig } from '../../config/dbConfig';
import { ProductOperations } from '../operations/ProductOperations';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

class FirebaseProductService extends ProductOperations {
  constructor() {
    super();
    this.db = getFirestore();
  }

  async create(data) {
    const productRef = collection(this.db, 'products');
    const docRef = await addDoc(productRef, data);
    return docRef.id;
  }

  async read(id) {
    const productRef = doc(this.db, 'products', id);
    const docSnap = await getDoc(productRef);
    return docSnap.exists() ? docSnap.data() : null;
  }

  async update(id, data) {
    const productRef = doc(this.db, 'products', id);
    await updateDoc(productRef, data);
  }

  async delete(id) {
    const productRef = doc(this.db, 'products', id);
    await deleteDoc(productRef);
  }
}

export default FirebaseProductService;
