import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const seedService = {
    seedDummyHistory: async (userId) => {
        if (!userId) return;

        const appointmentsRef = collection(db, 'appointments');
        const services = ['checkup', 'cleaning', 'whitening', 'surgery'];

        // Create 3 past appointments
        const pastDates = [
            new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
            new Date(Date.now() - 1000 * 60 * 60 * 24 * 60), // 60 days ago
            new Date(Date.now() - 1000 * 60 * 60 * 24 * 90)  // 90 days ago
        ];

        for (let i = 0; i < 3; i++) {
            await addDoc(appointmentsRef, {
                userId,
                service: services[i % services.length],
                scheduledSlot: Timestamp.fromDate(pastDates[i]),
                status: 'completed',
                notes: 'Routine procedure completed successfully.',
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            });
        }

        return true;
    }
};
