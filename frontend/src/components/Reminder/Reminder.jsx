import { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import './Reminder.css';
import DSAQuestions from '../../data/DSAQuestion.json';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

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
        // Clear any existing notification first
        setNotification({ show: false, type: '', message: '' });
        
        // Then set the new notification after a small delay
        setTimeout(() => {
            setNotification({ show: true, type, message });
            
            // Auto-hide after 3 seconds
            setTimeout(() => {
                setNotification(prev => ({ ...prev, show: false }));
            }, 3000);
        }, 50);
    };

    return (
        <div className="reminder-container">
            <div className="reminder-card">
                <h1 className="reminder-title">Daily Practice Reminder</h1>
                
                <div className="motivation-section">
                    <div className="motivation-content">
                        <h2 className="greeting">Hello, Coder!</h2>
                        <p className="motivation-text">
                            We've curated a DSA question to help you stay consistent with your practice. 
                            Regular coding is the key to mastering algorithms and data structures.
                        </p>
                        <p className="motivation-quote">
                            "Consistency is what transforms average into excellence"
                        </p>
                    </div>
                </div>

                <div className="topic-selection">
                    <h3 className="selection-title">Select Your Practice Topic</h3>
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