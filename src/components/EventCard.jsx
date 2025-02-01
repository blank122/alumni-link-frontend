import React from "react";

const EventCard = ({ title, image }) => {
    return (
        <div className="bg-white shadow-md p-4 rounded-md">
            <img src={image} alt={title} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-2">{title}</h3>
        </div>
    );
};

export default EventCard;
