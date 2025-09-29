import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Map, Marker } from "pigeon-maps";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiMapPin,
    FiNavigation,
    FiGlobe,
    FiClock,
    FiAlertCircle
} from "react-icons/fi";

const Maps = () => {
    const { user, token } = useAuth();
    const [maps, setMaps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [markerPosition, setMarkerPosition] = useState([10.3157, 123.8854]); // Default: Cebu City

    useEffect(() => {
        if (!user?.alumni_id || !token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/user-location/${user.alumni_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json",
                        },
                    }
                );

                const locationData = response.data.data;
                setMaps(locationData);

                if (locationData.length > 0) {
                    setMarkerPosition([
                        parseFloat(locationData[0].add_lat),
                        parseFloat(locationData[0].add_long),
                    ]);
                }
            } catch (error) {
                console.error("Error fetching user location:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.alumni_id, token]);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hover: { y: -4, transition: { duration: 0.2 } }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <FiGlobe className="w-6 h-6 text-blue-500" />
                        </div>
                        <h1 className="text-3xl font-light text-gray-900 dark:text-white">Location Maps</h1>
                    </div>
                    <div className="w-12 h-0.5 bg-blue-500"></div>
                    <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl">
                        View your registered addresses and their locations on the map.
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center items-center py-20"
                    >
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-gray-500 dark:text-gray-400">Loading map data...</p>
                        </div>
                    </motion.div>
                ) : maps.length > 0 ? (
                    /* Maps Grid */
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                        {maps.map((map, index) => (
                            <motion.div
                                key={map.id}
                                variants={cardVariants}
                                whileHover="hover"
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
                            >
                                {/* Card Header */}
                                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-2">
                                            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                <FiMapPin className="w-4 h-4 text-green-500" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                Registered Address
                                            </h3>
                                        </div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                            Primary
                                        </span>
                                    </div>

                                    {/* Address Details */}
                                    <div className="space-y-3">
                                        <div className="flex items-start space-x-3">
                                            <FiNavigation className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                {map.full_address}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-2">
                                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Latitude</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {parseFloat(map.add_lat).toFixed(6)}
                                                </p>
                                            </div>
                                            <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Longitude</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {parseFloat(map.add_long).toFixed(6)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Map Container */}
                                <div className="p-4">
                                    <div className="relative rounded-xl overflow-hidden shadow-inner border border-gray-200 dark:border-gray-600">
                                        <Map
                                            center={[parseFloat(map.add_lat), parseFloat(map.add_long)]}
                                            defaultZoom={15}
                                            height={200}
                                            metaWheelZoom={true}
                                            touchEvents={true}
                                        >
                                            <Marker
                                                width={35}
                                                anchor={[parseFloat(map.add_lat), parseFloat(map.add_long)]}
                                                color="#3B82F6"
                                            />
                                        </Map>
                                        <div className="absolute top-3 right-3">
                                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/70 text-white backdrop-blur-sm">
                                                <FiMapPin className="w-3 h-3 mr-1" />
                                                Your Location
                                            </span>
                                        </div>
                                    </div>

                                    {/* Map Controls Info */}
                                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center space-x-4">
                                            <span>Drag to move</span>
                                            <span>Scroll to zoom</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <FiClock className="w-3 h-3" />
                                            <span>Real-time</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <FiAlertCircle className="w-16 h-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No Location Data
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                            No address locations found. Please add your address information to see it on the map.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FiMapPin className="w-4 h-4" />
                            <span>Add Address</span>
                        </motion.button>
                    </motion.div>
                )}

                {/* Additional Info Section */}
                {maps.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg flex-shrink-0">
                                <FiNavigation className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                                    Map Navigation Tips
                                </h3>
                                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                    <li>• Drag the map to explore different areas</li>
                                    <li>• Use scroll wheel to zoom in and out</li>
                                    <li>• Click and drag to move around the map</li>
                                    <li>• Blue marker shows your registered address location</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Maps;