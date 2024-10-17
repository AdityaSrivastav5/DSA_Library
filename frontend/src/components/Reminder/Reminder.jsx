import { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react'; // Import Clerk's useUser hook
import './Reminder.css'; // Import the CSS for styling
import DSAQuestions from '../../data/DSAQuestion.json';

const ReminderSection = () => {
    const [selectedTopic, setSelectedTopic] = useState('');
    const { user } = useUser(); // Get user details from Clerk
    const topicsList = DSAQuestions.map(item => item.topicName);

    const handleTopicChange = (topic) => {
        setSelectedTopic(topic);
    };

    const handleSubmit = () => {
        if (selectedTopic && user) {
            const email = user.primaryEmailAddress.emailAddress; // Get the logged-in user's email
            axios.post('http://localhost:5003/user/set-reminder', { email, topic: selectedTopic })
                .then(response => {
                    console.log('Topic set successfully:', response.data);
                    alert(`Reminder set for: ${selectedTopic}`); // Confirmation alert
                    setSelectedTopic(''); // Reset selection after submission
                })
                .catch(error => {
                    console.error('Error setting topic:', error);
                    alert('Failed to set reminder.'); // Error alert
                });
        } else {
            alert('Please select a topic before setting a reminder.'); // Alert if no topic is selected
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
                            onClick={() => handleTopicChange(topic)} // Update the selected topic
                        >
                            {topic}
                        </div>
                    ))}
                </div>
                <button className="submit-button" onClick={handleSubmit}>Set Reminder</button> {/* Call submit function */}
            </div>
        </div>
    );
};

export default ReminderSection;
