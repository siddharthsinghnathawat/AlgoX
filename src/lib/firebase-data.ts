import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  collection, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import type { Student, SolvedData } from './types';

// Create a new student profile in Firestore
export async function createStudentProfile(studentData: {
  uid: string;
  codername: string;
  realName: string;
  email: string;
  leetcodeId: string;
  avatarUrl?: string;
}) {
  try {
    const studentRef = doc(db, 'students', studentData.uid);
    const student: Student = {
      id: studentData.uid,
      username: studentData.codername,
      realName: studentData.realName,
      password: '', // Not stored in Firebase for security
      email: studentData.email,
      leetcodeId: studentData.leetcodeId,
      avatarUrl: studentData.avatarUrl || 'https://placehold.co/100x100.png',
      totalSolved: 0,
      streak: 0,
      badges: 0,
      solvedData: [],
      created_at: new Date().toISOString(),
    };

    await setDoc(studentRef, {
      ...student,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return student;
  } catch (error) {
    console.error('Error creating student profile:', error);
    throw error;
  }
}

// Get student profile by UID
export async function getStudentProfile(uid: string): Promise<Student | null> {
  try {
    const studentRef = doc(db, 'students', uid);
    const studentSnap = await getDoc(studentRef);

    if (studentSnap.exists()) {
      const data = studentSnap.data();
      return {
        id: data.id,
        username: data.username,
        realName: data.realName,
        password: '', // Not returned for security
        email: data.email,
        leetcodeId: data.leetcodeId,
        avatarUrl: data.avatarUrl,
        totalSolved: data.totalSolved || 0,
        streak: data.streak || 0,
        badges: data.badges || 0,
        solvedData: data.solvedData || [],
        created_at: data.created_at,
      } as Student;
    }

    return null;
  } catch (error) {
    console.error('Error getting student profile:', error);
    throw error;
  }
}

// Get student by email
export async function getStudentByEmail(email: string): Promise<Student | null> {
  try {
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        id: data.id,
        username: data.username,
        realName: data.realName,
        password: '', // Not returned for security
        email: data.email,
        leetcodeId: data.leetcodeId,
        avatarUrl: data.avatarUrl,
        totalSolved: data.totalSolved || 0,
        streak: data.streak || 0,
        badges: data.badges || 0,
        solvedData: data.solvedData || [],
        created_at: data.created_at,
      } as Student;
    }

    return null;
  } catch (error) {
    console.error('Error getting student by email:', error);
    throw error;
  }
}

// Update student progress
export async function updateStudentProgress(uid: string, solved: boolean) {
  try {
    const studentRef = doc(db, 'students', uid);
    const studentSnap = await getDoc(studentRef);

    if (studentSnap.exists()) {
      const data = studentSnap.data();
      const currentSolved = data.totalSolved || 0;
      const newSolved = solved ? currentSolved + 1 : Math.max(0, currentSolved - 1);

      // Update solved data for today
      const today = new Date().toISOString().split('T')[0];
      const solvedData: SolvedData[] = data.solvedData || [];
      let todayData = solvedData.find(d => d.date === today);

      if (solved) {
        if (todayData) {
          todayData.count++;
        } else {
          solvedData.push({ date: today, count: 1 });
        }
      } else {
        if (todayData) {
          todayData.count--;
          if (todayData.count <= 0) {
            solvedData.splice(solvedData.indexOf(todayData), 1);
          }
        }
      }

      // Calculate streak
      const sortedData = solvedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      let streak = 0;
      if (sortedData.length > 0) {
        const today = new Date();
        const lastSolve = new Date(sortedData[sortedData.length - 1].date);
        const diffDays = Math.floor((today.getTime() - lastSolve.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 1) {
          streak = 1;
          for (let i = sortedData.length - 2; i >= 0; i--) {
            const currentDate = new Date(sortedData[i].date);
            const nextDate = new Date(sortedData[i + 1].date);
            const dayDiff = Math.floor((nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
            if (dayDiff === 1) {
              streak++;
            } else {
              break;
            }
          }
        }
      }

      await updateDoc(studentRef, {
        totalSolved: newSolved,
        streak: streak,
        solvedData: solvedData,
        updatedAt: serverTimestamp(),
      });

      return true;
    }

    return false;
  } catch (error) {
    console.error('Error updating student progress:', error);
    throw error;
  }
}

// Get all students for ranking
export async function getAllStudents(): Promise<Student[]> {
  try {
    const studentsRef = collection(db, 'students');
    const querySnapshot = await getDocs(studentsRef);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.id,
        username: data.username,
        realName: data.realName,
        password: '', // Not returned for security
        email: data.email,
        leetcodeId: data.leetcodeId,
        avatarUrl: data.avatarUrl,
        totalSolved: data.totalSolved || 0,
        streak: data.streak || 0,
        badges: data.badges || 0,
        solvedData: data.solvedData || [],
        created_at: data.created_at,
      } as Student;
    });
  } catch (error) {
    console.error('Error getting all students:', error);
    throw error;
  }
}

// Delete student profile from Firestore
export async function deleteStudentProfile(uid: string): Promise<boolean> {
  try {
    const studentRef = doc(db, 'students', uid);
    const studentSnap = await getDoc(studentRef);
    
    if (studentSnap.exists()) {
      await deleteDoc(studentRef);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error deleting student profile:', error);
    throw error;
  }
}

