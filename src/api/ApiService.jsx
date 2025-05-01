import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

export const createApiClient = (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };

  return {
    getAlumni: () => axios.get(`${API_BASE_URL}/admin/get-alumni`, { headers }),
    getPendingAccounts: () => axios.get(`${API_BASE_URL}/admin/pending-accounts`, { headers }),
    getApprovedAccounts: () => axios.get(`${API_BASE_URL}/admin/approved-accounts`, { headers }),
    updateAccountStatus: (id, status) => 
      axios.put(`${API_BASE_URL}/admin/approval-email/${id}`, { status }, { headers }),
    getUnemployed:  () => axios.get(`${API_BASE_URL}/admin/unemployed-alumni-data`, { headers }),
    sendSms:(id) => 
        axios.put(`${API_BASE_URL}/admin/send-sms/${id}`, { headers }),
  };
};

export default createApiClient;
