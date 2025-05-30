import { useState, useEffect } from "react";
import axios from "axios";

const useDashboardAnalytics = (token, from = null, to = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const params = {};
                if (from && to) {
                    params.from = from;
                    params.to = to;
                }

                const response = await axios.get("http://localhost:8000/api/dashboard-analytics", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    },
                    params
                });

                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchAnalytics();
        }
    }, [token, from, to]);

    return { data, loading, error };
};

export default useDashboardAnalytics;
