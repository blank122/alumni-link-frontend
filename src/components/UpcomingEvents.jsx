import "react";
import EventCard from "./EventCard";

const UpcomingEvents = () => {
    const events = [
        { title: "UM TRAIL RUN", image: "your-image-url.jpg" },
        { title: "JOB FAIR", image: "your-image-url.jpg" },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((event, index) => (
                    <EventCard key={index} title={event.title} image={event.image} />
                ))}
            </div>
        </div>
    );
};

export default UpcomingEvents;
