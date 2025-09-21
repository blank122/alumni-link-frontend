import { useState, useEffect } from 'react';
import createApiClient from '../api/ApiService';

export const useAlumniData = (token) => {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const api = createApiClient(token);
        const response = await api.getAlumni();
        setAccount(response.data.data);
      } catch (error) {
        console.error("Error fetching alumni data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { account, loading };
};

export const useAccountCounts = (token) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [loadingPending, setLoadingPending] = useState(true);
  const [loadingApproved, setLoadingApproved] = useState(true);

  useEffect(() => {
    const fetchPending = async () => {
      if (!token) return;

      try {
        const api = createApiClient(token);
        const response = await api.getPendingAccounts();
        setPendingCount(response.data.data);
      } catch (error) {
        console.error("Error fetching pending accounts:", error);
      } finally {
        setLoadingPending(false);
      }
    };

    const fetchApproved = async () => {
      if (!token) return;

      try {
        const api = createApiClient(token);
        const response = await api.getApprovedAccounts();
        setApprovedCount(response.data.data);
      } catch (error) {
        console.error("Error fetching approved accounts:", error);
      } finally {
        setLoadingApproved(false);
      }
    };

    fetchPending();
    fetchApproved();
  }, [token]);

  return { pendingCount, approvedCount, loadingPending, loadingApproved };
};

export const useUnemployedData = (token) => {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const api = createApiClient(token);
        const response = await api.getUnemployed();
        console.log("fetched data", response);
        setAccount(response.data.data);
      } catch (error) {
        console.error("Error fetching alumni data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { account, loading };
};

export const useAlumniUnemployedCoursesData = (token) => {
  const [data, setData] = useState(null); // initialize as null, not []
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const api = createApiClient(token);
        const response = await api.getAlumniCourseUnemployed();
        console.log("fetched data", response.data); // should show unemployed, employed, courses
        setData(response.data); // ✅ fixed this line
      } catch (error) {
        console.error("Error fetching alumni data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [token]);

  return { data, loadingData };
};

export const useAdminAccounts = (token) => {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const api = createApiClient(token);
        const response = await api.getUnemployed();
        console.log("fetched data", response);
        setAccount(response.data.data);
      } catch (error) {
        console.error("Error fetching alumni data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { account, loading };
};

export const useFindAlumni = (token, accountID) => {
  const [account, setAccount] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const api = createApiClient(token);
        const response = await api.getSpecificAlumni(accountID);
        setAccount(response.data.data);
      } catch (error) {
        console.error("Error fetching alumni data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  return { account, loading };
}
