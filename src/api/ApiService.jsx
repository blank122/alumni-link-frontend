import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

export const createApiClient = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };

  return {
    //api for admin
    getAlumni: () => axios.get(`${API_BASE_URL}/admin/get-alumni`, { headers }),
    getPendingAccounts: () => axios.get(`${API_BASE_URL}/admin/pending-accounts`, { headers }),
    getApprovedAccounts: () => axios.get(`${API_BASE_URL}/admin/approved-accounts`, { headers }),
    updateAccountStatus: (id, status) =>
      axios.put(`${API_BASE_URL}/admin/approval-email/${id}`, { status }, { headers }),
    getUnemployed: () => axios.get(`${API_BASE_URL}/admin/unemployed-alumni-data`, { headers }),
    sendSms: (id) =>
      axios.post(`${API_BASE_URL}/admin/send-sms-unemployed/${id}`, { headers }),

    //api for user
    addCareer: (id, newJob) =>
      axios.post(`${API_BASE_URL}/add-career/${id}`, { newJob }, { headers }),

    //fetched technical skills
    getTechSkills: () => axios.get(`${API_BASE_URL}/technical-skills`, { headers }),
    getSoftSkills: () => axios.get(`${API_BASE_URL}/soft-skills`, { headers }),
    getAlumniCourseUnemployed: () => axios.get(`${API_BASE_URL}/alumni-course-unemployed`, { headers }),

    //get clustered data kmeans
    getClusteredAnalysis: () => axios.get(`${API_BASE_URL}/kmeans-analysis`, { headers }),
    getClusteredLocation: () => axios.get(`${API_BASE_URL}/kmeans-location`, { headers }),
    getClusteredCertifications: () => axios.get(`${API_BASE_URL}/kmeans-certifications`, { headers }),

  };
};

export default createApiClient;
