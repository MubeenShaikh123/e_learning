import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { useSelector } from 'react-redux';

const NotificationsTab = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await fetch('/api/dashboard/notification/get', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('x-access-token')}`
                    }
                });
                const data = await res.json();
                if (data.success) {
                    setNotifications(data.data);
                }
            } catch (err) {
                console.error('Failed to fetch notifications', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [user]);

    const filteredNotifications =
        activeCategory === "all"
            ? notifications
            : notifications.filter(n => n.type === activeCategory);

    return (
        <div className="space-y-6">
            {/* Filter controls */}
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex flex-wrap gap-2">
                    {[
                        { label: "All", type: "all" },
                        { label: "General", type: "general" },
                        { label: "Course Updates", type: "course" },
                        { label: "Quizzes", type: "quizz" },
                        { label: "Reminders", type: "reminder" }
                    ].map(btn => (
                        <button
                            key={btn.type}
                            onClick={() => setActiveCategory(btn.type)}
                            className={`px-4 py-2 text-sm font-medium rounded-md border ${activeCategory === btn.type
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white text-gray-700 border-gray-300"
                                }`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notifications list */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-medium text-gray-900">
                        {activeCategory === "all"
                            ? "All Notifications"
                            : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Notifications`}
                    </h3>
                </div>

                {loading ? (
                    <div className="p-6 text-gray-500">Loading...</div>
                ) : filteredNotifications.length === 0 ? (
                    <div className="p-6 text-gray-500">No notifications found.</div>
                ) : (
                    <div className="divide-y">
                        {filteredNotifications.map((notification) => (
                            <div key={notification._id} className={`px-6 py-4 ${notification.isNew ? 'bg-indigo-50' : ''}`}>
                                <div className="flex items-start">
                                    <div className={`flex-shrink-0 p-2 rounded-full ${notification.type === 'general'
                                            ? 'bg-blue-100 text-blue-600'
                                            : notification.type === 'reminder'
                                                ? 'bg-yellow-100 text-yellow-600'
                                                : notification.type === 'course'
                                                    ? 'bg-green-100 text-green-600'
                                                    : notification.type === 'quizz'
                                                        ? 'bg-purple-100 text-purple-600'
                                                        : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        <Bell size={16} />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-md font-medium text-gray-900">{notification.title}</h4>
                                            <span className="text-xs text-gray-500">
                                                {new Date(notification.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsTab;
