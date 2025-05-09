import { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import './Reminder.css';
import DSAQuestions from '../../data/DSAQuestion.json';
import { FiCheckCircle, FiAlertCircle, FiClock, FiCalendar } from 'react-icons/fi';

const ReminderSection = () => {
    const [selectedTopic, setSelectedTopic] = useState('');
    const [notification, setNotification] = useState({ show: false, type: '', message: '' });
    const { user } = useUser();
    const topicsList = DSAQuestions.map(item => item.topicName);

    const handleTopicChange = (topic) => {
        setSelectedTopic(topic);
    };

    const handleSubmit = async () => {
        if (!selectedTopic) {
            showNotification('error', 'Please select a topic');
            return;
        }

        if (!user) {
            showNotification('error', 'Please sign in to set reminders');
            return;
        }

        try {
            const email = user.primaryEmailAddress.emailAddress;
            await axios.post('https://dsa-library.onrender.com/user/set-reminder', { 
                email, 
                topic: selectedTopic 
            });

            showNotification('success', 'Reminder set successfully!');
            setSelectedTopic('');
        } catch (error) {
            console.error('Error setting reminder:', error);
            showNotification('error', 'Failed to set reminder. Please try again.');
        }
    };

    const showNotification = (type, message) => {
        setNotification({ show: false, type: '', message: '' });
        
        setTimeout(() => {
            setNotification({ show: true, type, message });
            
            setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 3000);
        }, 50);
    };

    return (
        <div className="reminder-container">
            <div className="reminder-card">
                <div className="card-header">
                    <h1 className="reminder-title">Daily Practice Reminder</h1>
                    <p className="reminder-subtitle">Stay consistent with your DSA practice</p>
                </div>
                
                <div className="motivation-section">
                    <div className="motivation-icon">
                        <FiClock size={24} />
                    </div>
                    <div className="motivation-content">
                        <h2 className="greeting">Hello, {user?.firstName || 'Coder'}!</h2>
                        <p className="motivation-text">
                            We've curated high-quality DSA questions to help you stay consistent. 
                            Regular practice is the key to mastering algorithms and data structures.
                        </p>
                        <div className="stats-container">
                            <div className="stat-item">
                                <FiCalendar className="stat-icon" />
                                <span>Daily Questions</span>
                            </div>
                            <div className="stat-item">
                                <FiCheckCircle className="stat-icon" />
                                <span>Personalized Reminders</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="topic-selection">
                    <h3 className="selection-title">Select Your Practice Topic</h3>
                    <p className="selection-subtitle">Choose a topic you want to focus on</p>
                    
                    <div className="topic-capsules">
                        {topicsList.map((topic, index) => (
                            <button
                                key={index}
                                className={`topic-capsule ${selectedTopic === topic ? 'selected' : ''}`}
                                onClick={() => handleTopicChange(topic)}
                            >
                                {topic}
                            </button>
                        ))}
                    </div>
                    
                    <button 
                        className="submit-button"
                        onClick={handleSubmit}
                        disabled={!selectedTopic}
                    >
                        Set Daily Reminder
                    </button>
                </div>
            </div>

            {notification.show && (
                <div className={`notification ${notification.type}`}>
                    {notification.type === 'success' ? (
                        <FiCheckCircle className="notification-icon" />
                    ) : (
                        <FiAlertCircle className="notification-icon" />
                    )}
                    <span className="notification-message">{notification.message}</span>
                </div>
            )}
        </div>
    );
};

export default ReminderSection;