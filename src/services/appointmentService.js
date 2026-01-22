/**
 * Appointment Service
 * Handles data fetching and business logic for appointments.
 * Currently uses mock data, but structure allows easy swap to API/Firestore.
 */

const MOCK_APPOINTMENTS = [
    {
        id: 1,
        date: "Jan 15, 2026",
        time: "10:00 AM",
        treatment: "General Checkup",
        type: "Checkup",
        dentist: "Dr. Sarah Johnson",
        status: "completed",
        notes: "Teeth are healthy. Recommended daily flossing.",
        prescription: "Fluoride rinse"
    },
    {
        id: 2,
        date: "Dec 10, 2025",
        time: "2:30 PM",
        treatment: "Deep Cleaning",
        type: "Cleaning",
        dentist: "Dr. Sarah Johnson",
        status: "completed",
        notes: "Plaque removal successful. Minor gum sensitivity.",
        prescription: "Sensitivity toothpaste"
    },
    {
        id: 3,
        date: "Nov 05, 2025",
        time: "11:00 AM",
        treatment: "Whitening Session",
        type: "Whitening",
        dentist: "Dr. Michael Chen",
        status: "completed",
        notes: "Shade improved by 2 levels.",
        prescription: "None"
    }
];

export const appointmentService = {
    /**
     * Fetch appointment history for a user.
     * @param {string} userId - ID of the user
     * @param {string} filter - Optional type filter
     * @returns {Promise<Array>} List of appointments
     */
    getHistory: async (userId, filter = 'All') => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // In a real app, this would fetch from Firestore/Backend using userId
        let data = [...MOCK_APPOINTMENTS];

        if (filter !== 'All') {
            data = data.filter(apt => apt.type === filter || apt.treatment.includes(filter));
        }

        return data;
    },

    /**
     * Get details for a specific appointment
     * @param {string} id 
     * @returns {Promise<object>}
     */
    getById: async (id) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return MOCK_APPOINTMENTS.find(a => a.id === id);
    }
};
