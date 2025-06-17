import { useState, useEffect } from 'react';
import createApiClient from '../api/ApiService';

export const useClusteringData = (token) => {
  const [data, setData] = useState(null); // initialize as null, not []
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const api = createApiClient(token);
        const response = await api.getClusteredAnalysis();
        console.log("fetched data", response.data); // should show unemployed, employed, courses
        setData(response.data); // ✅ fixed this line
      } catch (error) {
        console.error("Error fetching clustering analysis data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [token]);

  return { data, loadingData };
};


export const useClusteredLocation = (token) => {
  const [data, setData] = useState(null); // initialize as null, not []
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const api = createApiClient(token);
        const response = await api.getClusteredLocation();
        console.log("fetched data", response.data); // should show unemployed, employed, courses
        setData(response.data); // ✅ fixed this line
      } catch (error) {
        console.error("Error fetching clustering analysis data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [token]);

  return { data, loadingData };
};


export const useClusteredCertifications = (token) => {
  const [data, setData] = useState(null); // initialize as null, not []
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const api = createApiClient(token);
        const response = await api.getClusteredCertifications();
        console.log("fetched data", response.data); // should show unemployed, employed, courses
        setData(response.data); // ✅ fixed this line
      } catch (error) {
        console.error("Error fetching clustering analysis data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [token]);

  return { data, loadingData };
};


export const useClusteredCertificationsEmployment = (token) => {
  const [data, setData] = useState(null); // initialize as null, not []
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const api = createApiClient(token);
        const response = await api.getClusteredCertifications();
        console.log("fetched data", response.data); // should show unemployed, employed, courses
        setData(response.data); // ✅ fixed this line
      } catch (error) {
        console.error("Error fetching clustering analysis data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [token]);

  return { data, loadingData };
};

export const useClusteredRegionalEmployment = (token) => {
  const [data, setData] = useState(null); // initialize as null, not []
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        const api = createApiClient(token);
        const response = await api.getClusteredRegionalEmployment();
        console.log("fetched data", response.data); // should show unemployed, employed, courses
        setData(response.data); // ✅ fixed this line
      } catch (error) {
        console.error("Error fetching clustering analysis data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [token]);

  return { data, loadingData };
};