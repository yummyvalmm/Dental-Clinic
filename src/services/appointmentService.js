import { collection, addDoc, serverTimestamp, query, where, getDocs, Timestamp, doc, updateDoc, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Appointment Service
 * Handles all Firestore operations related to dental appointments.
 */
export const appointmentService = {
    /**
     * Create a new appointment in Firestore.
     * @param {object} appointmentData - The booking details (service, scheduledSlot, patient info)
     * @param {string|null} userId - The UID of the logged-in user, or null if guest
     * @returns {Promise<string>} The ID of the created document
     */
    createAppointment: async (appointmentData, userId = null) => {
        try {
            // Validation
            if (!appointmentData.service || !appointmentData.scheduledSlot) {
                throw new Error("Missing required appointment data: service or scheduledSlot");
            }

            const appointmentRef = collection(db, 'appointments');

            // Format data for standard procedure
            const finalData = {
                service: appointmentData.service,
                scheduledSlot: Timestamp.fromDate(appointmentData.scheduledSlot),
                patientName: appointmentData.name || 'Unknown',
                patientPhone: appointmentData.phone || '',
                patientEmail: appointmentData.email || '',
                userId: userId,
                status: 'pending',
                // Fallback: Store DOB in notes to avoid strict schema validation errors
                notes: `${appointmentData.notes || ''}\n[DOB: ${appointmentData.dob || 'Not Provided'}]`.trim(),
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            const docRef = await addDoc(appointmentRef, finalData);
            return docRef.id;
        } catch (error) {
            console.error("Error creating appointment:", error);
            throw error;
        }
    },

    /**
     * Internal helper to fetch all appointments for a user and sort them.
     * Robust against missing or old data formats.
     */
    _getAllUserAppointments: async (userId) => {
        if (!userId) return [];

        try {
            const appointmentRef = collection(db, 'appointments');
            const q = query(appointmentRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                // Standard procedure: ensure we always have a sortable time
                let sortTime = 0;
                if (data.scheduledSlot && typeof data.scheduledSlot.toMillis === 'function') {
                    sortTime = data.scheduledSlot.toMillis();
                } else if (data.createdAt && typeof data.createdAt.toMillis === 'function') {
                    sortTime = data.createdAt.toMillis();
                }

                return {
                    id: doc.id,
                    ...data,
                    _sortTime: sortTime // used for internal sorting
                };
            }).sort((a, b) => b._sortTime - a._sortTime);
        } catch (error) {
            console.error("Firestore Error in _getAllUserAppointments:", error);
            throw error;
        }
    },

    /**
     * Fetch upcoming appointments for a specific user.
     */
    getUpcomingAppointments: async (userId) => {
        try {
            const now = Date.now();
            const all = await appointmentService._getAllUserAppointments(userId);

            return all
                .filter(apt => apt._sortTime >= now)
                .sort((a, b) => a._sortTime - b._sortTime);
        } catch (error) {
            console.error("Error fetching upcoming appointments:", error);
            throw error;
        }
    },

    /**
     * Fetch past appointments for a specific user.
     */
    getPastAppointments: async (userId) => {
        try {
            const now = Date.now();
            const all = await appointmentService._getAllUserAppointments(userId);

            return all
                .filter(apt => apt._sortTime < now);
        } catch (error) {
            console.error("Error fetching past appointments:", error);
            throw error;
        }
    },

    /**
     * Fetch all appointments for a specific user.
     */
    getHistory: async (userId) => {
        try {
            return await appointmentService._getAllUserAppointments(userId);
        } catch (error) {
            console.error("Error fetching user appointments:", error);
            throw error;
        }
    },

    /**
     * [ADMIN] Fetch all appointments across all users.
     */
    getAllAppointments: async () => {
        try {
            const appointmentRef = collection(db, 'appointments');
            const q = query(appointmentRef, orderBy('scheduledSlot', 'desc'));
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error fetching all appointments:", error);
            throw error;
        }
    },

    /**
     * [ADMIN] Update appointment status (Confirm/Cancel).
     */
    updateAppointmentStatus: async (appointmentId, status) => {
        try {
            const appointmentRef = doc(db, 'appointments', appointmentId);
            await updateDoc(appointmentRef, {
                status,
                updatedAt: serverTimestamp()
            });
        } catch (error) {
            console.error("Error updating appointment status:", error);
            throw error;
        }
    },

    /**
     * [ADMIN] Delete all appointments (Cleanup).
     */
    deleteAllAppointments: async () => {
        try {
            const appointmentRef = collection(db, 'appointments');
            const snapshot = await getDocs(appointmentRef);
            const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);
            return true;
        } catch (error) {
            console.error("Error deleting all appointments:", error);
            throw error;
        }
    }
};
