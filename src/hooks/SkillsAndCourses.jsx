import { useState, useEffect } from 'react';
import createApiClient from '../api/ApiService';

export const fetchTechnicalSkills = (token) => {
  const [techSkills, setTechSkills] = useState([]);
  const [loadingTech, setLoadingTechSkills] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      
      try {
        const api = createApiClient(token);
        const response = await api.getTechSkills();
        setTechSkills(response.data.data);
      } catch (error) {
        console.error("Error fetching techskills data:", error);
      } finally {
        setLoadingTechSkills(false);
      }
    };

    fetchData();
  }, [token]);

  return { techSkills, loadingTech };
};

export const fetchSoftSkills = (token) => {
  const [softSkills, setSoftSkills] = useState([]);
  const [loadingSoft, setLoadingSoftSkills] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      
      try {
        const api = createApiClient(token);
        const response = await api.getSoftSkills();
        setSoftSkills(response.data.data);
      } catch (error) {
        console.error("Error fetching softskills data:", error);
      } finally {
        setLoadingSoftSkills(false);
      }
    };

    fetchData();
  }, [token]);s

  return { softSkills, loadingSoft };
};

export const fetchCourses = (token) => {
  const [softSkills, setSoftSkills] = useState([]);
  const [loadingSoft, setLoadingSoftSkills] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;
      
      try {
        const api = createApiClient(token);
        const response = await api.getSoftSkills();
        setSoftSkills(response.data.data);
      } catch (error) {
        console.error("Error fetching softskills data:", error);
      } finally {
        setLoadingSoftSkills(false);
      }
    };

    fetchData();
  }, [token]);

  return { softSkills, loadingSoft };
};