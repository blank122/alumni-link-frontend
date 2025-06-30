import { useState, useEffect } from "react";
import axios from "axios";

//admin dashboard analytics
export const useDashboardAnalytics = (
    token,
    from = null,
    to = null,
    techSkillIds = [],
    softSkillIds = [],
    courseIds = []
) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Serialize arrays to strings so they don’t trigger re-renders unless values actually change
    const techSkillKey = techSkillIds.join(",");
    const softSkillKey = softSkillIds.join(",");
    const courseKey = courseIds.join(",");

    useEffect(() => {
        if (!token) return;

        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const params = {};

                if (from && to) {
                    params.from = from;
                    params.to = to;
                }

                if (techSkillKey) params.tech_skills = techSkillKey;
                if (softSkillKey) params.soft_skills = softSkillKey;
                if (courseKey) params.course_ids = courseKey;

                console.log("Fetching with params:", params);

                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/api/dashboard-analytics`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                        params,
                    }
                );

                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [token, from, to, techSkillKey, softSkillKey, courseKey]);

    return { data, loading, error };
};



