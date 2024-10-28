import { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import './Reminder.css';
import DSAQuestions from '../../data/DSAQuestion.json';

const ReminderSection = () => {
    const [selectedTopic, setSelectedTopic] = useState('');
    const [reminderSet, setReminderSet] = useState(false);
    const [error, setError] = useState(''); // New state for error messages
    const { user } = useUser();
    const topicsList = DSAQuestions.map(item => item.topicName);

    const handleTopicChange = (topic) => {
        setSelectedTopic(topic);
    };

    const handleSubmit = async () => {
        if (selectedTopic && user) {
            const email = user.primaryEmailAddress.emailAddress; // Get user email from Clerk
            console.log("User Email:", email); // Log the email being sent for verification
    
            try {
                await axios.post('http://localhost:5003/user/set-reminder', { email, topic: selectedTopic });
    
                console.log('Topic set successfully');
                setSelectedTopic('');
                setReminderSet(true);
                setTimeout(() => setReminderSet(false), 3000);
            } catch (error) {
                console.error('Error setting reminder:', error);
            }
        } else {
            setError('User not found or Topic not selected.');
            setSelectedTopic('');
            setTimeout(() => setError(''), 3000);
        }
    };
    
    

    return (
        <div className="reminder-section">
            <h1 className="reminder-heading">Daily Reminder!!</h1>
            <div className="motivational-message">
                <p className="greeting">Hey there, Folks!</p>
                <p className="message-body">
                    We have handpicked a DSA question just for you, designed to sharpen your skills and keep you on track with your learning goals. 
                </p>
                <p className="message-body">
                    Remember, consistency is key; every problem solved brings you one step closer to mastery.
                </p>
                <p className="closing">Happy coding!</p>
            </div>
            <div className="topic-selection">
                <label htmlFor="topic" className="topic-label">Select a Topic to Set the Reminder:</label>
                <div className="capsules-container">
                    {topicsList.map((topic, index) => (
                        <div
                            key={index}
                            className={`capsule ${selectedTopic === topic ? 'selected' : ''}`}
                            onClick={() => handleTopicChange(topic)}
                        >
                            {topic}
                        </div>
                    ))}
                </div>
                <button className="submit-button" onClick={handleSubmit}>Set Reminder</button>
                {reminderSet && <div className="reminder-confirmation">Reminder set!</div>}
                {error && <div className="error-message">{error}</div>} {/* Error message box */}
            </div>
        </div>
    );
};

export default ReminderSection;
