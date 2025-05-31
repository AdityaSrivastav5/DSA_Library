// import { useUser } from '@clerk/clerk-react';
// import { FaCheckCircle, FaChartBar, FaBook, FaHistory } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import './Dashboard.css';

// const Dashboard = () => {
//   const { user } = useUser();
//   const userData = {
//     name: user?.fullName || 'Anonymous',
//     email: user?.primaryEmailAddress?.emailAddress || 'user@example.com',
//     joinedDate: 'January 2023',
//     avatar: user?.imageUrl || 'https://randomuser.me/api/portraits/men/1.jpg',
//     stats: {
//       totalQuestions: 147,
//       completed: 89,
//       completionPercentage: 60,
//       byDifficulty: {
//         easy: { completed: 45, total: 60 },
//         medium: { completed: 32, total: 65 },
//         hard: { completed: 12, total: 22 }
//       },
//       byTopic: {
//         'Array': { completed: 15, total: 25 },
//         'Linked List': { completed: 10, total: 15 },
//         'Binary Trees': { completed: 8, total: 12 },
//         'Graph': { completed: 5, total: 10 },
//         'Dynamic Programming': { completed: 7, total: 15 },
//         'Recursion': { completed: 12, total: 15 },
//         'Search & Sort': { completed: 10, total: 12 }
//       },
//       lastActive: '2 hours ago'
//     }
//   };

//   const calculatePercentage = (completed, total) => {
//     return Math.round((completed / total) * 100);
//   };

//   // Animation variants
//   const container = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const item = {
//     hidden: { opacity: 0, y: 20 },
//     show: { opacity: 1, y: 0 }
//   };

//   return (
//     <motion.div 
//       className="dashboard-container"
//       initial="hidden"
//       animate="show"
//       variants={container}
//     >
//       {/* Profile Section */}
//       <motion.section 
//         className="profile-section"
//         variants={item}
//       >
//         <div className="profile-header">
//           <div className="avatar-container">
//             <motion.img 
//               src={userData.avatar} 
//               alt={userData.name} 
//               className="profile-avatar"
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 400, damping: 10 }}
//             />
//           </div>
//           <div className="profile-info">
//             <h1>{userData.name}</h1>
//             <p className="profile-email">{userData.email}</p>
//             <p className="profile-joined">Member since {userData.joinedDate}</p>
//             <p className="profile-active">Last active: {userData.stats.lastActive}</p>
//           </div>
//         </div>
//       </motion.section>

//       {/* Progress Blocks */}
//       <motion.div 
//         className="dashboard-blocks"
//         variants={container}
//       >
//         {/* Progress Overview */}
//         <motion.section 
//           className="progress-section block"
//           variants={item}
//         >
//           <h2 className="section-title">
//             <FaChartBar className="section-icon" />
//             Your Progress
//           </h2>
          
//           <motion.div 
//             className="progress-card"
//             whileHover={{ scale: 1.02 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <div className="progress-card-content">
//               <div className="progress-metric">
//                 <span className="progress-number">{userData.stats.completed}</span>
//                 <span className="progress-label">Solved</span>
//               </div>
//               <div className="progress-metric">
//                 <span className="progress-number">{userData.stats.totalQuestions}</span>
//                 <span className="progress-label">Total</span>
//               </div>
//               <div className="progress-metric">
//                 <span className="progress-number">{userData.stats.completionPercentage}%</span>
//                 <span className="progress-label">Completion</span>
//               </div>
//             </div>
//             <div className="progress-bar">
//               <div 
//                 className="progress-bar-fill"
//                 style={{ width: `${userData.stats.completionPercentage}%` }}
//               ></div>
//             </div>
//           </motion.div>
//         </motion.section>

//         {/* Difficulty Breakdown */}
//         <motion.section 
//           className="difficulty-section block"
//           variants={item}
//         >
//           <h2 className="section-title">
//             <FaBook className="section-icon" />
//             By Difficulty
//           </h2>
          
//           <div className="difficulty-grid">
//             {Object.entries(userData.stats.byDifficulty).map(([difficulty, data]) => (
//               <motion.div 
//                 key={difficulty}
//                 className="difficulty-card"
//                 whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 180, 216, 0.2)" }}
//                 variants={item}
//               >
//                 <h3 className={`difficulty-title ${difficulty}`}>
//                   {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
//                 </h3>
//                 <div className="difficulty-progress">
//                   <span className="difficulty-completed">{data.completed}</span>
//                   <span className="difficulty-total">/ {data.total}</span>
//                 </div>
//                 <div className="difficulty-bar">
//                   <motion.div 
//                     className="difficulty-bar-fill"
//                     initial={{ width: 0 }}
//                     animate={{ 
//                       width: `${calculatePercentage(data.completed, data.total)}%`,
//                       backgroundColor: 
//                         difficulty === 'easy' ? 'var(--clr-easy)' :
//                         difficulty === 'medium' ? 'var(--clr-medium)' : 'var(--clr-hard)'
//                     }}
//                     transition={{ duration: 0.8, type: "spring" }}
//                   />
//                 </div>
//                 <span className="difficulty-percentage">
//                   {calculatePercentage(data.completed, data.total)}%
//                 </span>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>

//         {/* Topic Breakdown */}
//         <motion.section 
//           className="topics-section block"
//           variants={item}
//         >
//           <h2 className="section-title">
//             <FaBook className="section-icon" />
//             By Topic
//           </h2>
          
//           <div className="topics-table-container">
//             <motion.table 
//               className="topics-table"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//             >
//               <thead>
//                 <tr>
//                   <th>Topic</th>
//                   <th>Completed</th>
//                   <th>Total</th>
//                   <th>Progress</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {Object.entries(userData.stats.byTopic).map(([topic, data], index) => {
//                   const percentage = calculatePercentage(data.completed, data.total);
//                   return (
//                     <motion.tr 
//                       key={topic}
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.05, duration: 0.3 }}
//                       whileHover={{ backgroundColor: 'rgba(0, 180, 216, 0.05)' }}
//                     >
//                       <td className="topic-name">{topic}</td>
//                       <td className="topic-completed">{data.completed}</td>
//                       <td className="topic-total">{data.total}</td>
//                       <td className="topic-progress">
//                         <div className="progress-container">
//                           <motion.div 
//                             className="progress-bar"
//                             initial={{ width: 0 }}
//                             animate={{ width: `${percentage}%` }}
//                             transition={{ delay: index * 0.05 + 0.2, duration: 0.8 }}
//                           />
//                           <span className="progress-text">{percentage}%</span>
//                         </div>
//                       </td>
//                     </motion.tr>
//                   );
//                 })}
//               </tbody>
//             </motion.table>
//           </div>
//         </motion.section>

//         {/* Recent Activity */}
//         <motion.section 
//           className="activity-section block"
//           variants={item}
//         >
//           <h2 className="section-title">
//             <FaHistory className="section-icon" />
//             Recent Activity
//           </h2>
          
//           <div className="activity-list">
//             {[1, 2, 3].map((item, index) => (
//               <motion.div 
//                 className="activity-item"
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1, duration: 0.3 }}
//                 whileHover={{ x: 5 }}
//               >
//                 <div className="activity-icon">
//                   <FaCheckCircle />
//                 </div>
//                 <div className="activity-content">
//                   <p>Solved <strong>"Sample Problem"</strong> (Easy - Array)</p>
//                   <p className="activity-time">{index + 1} hour ago</p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Dashboard;

import { useUser } from '@clerk/clerk-react';
import { FaCheckCircle, FaChartBar, FaBook, FaHistory } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Dashboard.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useUser();
    const [userStats, setUserStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchUserStats();
        }
    }, [user]);

    const fetchUserStats = async () => {
        try {
            const response = await axios.get(`http://localhost:5003/user/stats/${user.id}`);
            setUserStats(response.data.stats);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user stats:', error);
            setLoading(false);
        }
    };

    const calculatePercentage = (completed, total) => {
        if (!total) return 0;
        return Math.round((completed / total) * 100);
    };

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    if (loading) {
        return <div className="dashboard-container">Loading...</div>;
    }

    return (
        <motion.div 
            className="dashboard-container"
            initial="hidden"
            animate="show"
            variants={container}
        >
            {/* Profile Section */}
            <motion.section 
                className="profile-section"
                variants={item}
            >
                <div className="profile-header">
                    <div className="avatar-container">
                        <motion.img 
                            src={user?.imageUrl || 'https://randomuser.me/api/portraits/men/1.jpg'} 
                            alt={user?.fullName} 
                            className="profile-avatar"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        />
                    </div>
                    <div className="profile-info">
                        <h1>{user?.fullName || 'Anonymous'}</h1>
                        <p className="profile-email">{user?.primaryEmailAddress?.emailAddress || 'user@example.com'}</p>
                        <p className="profile-joined">Member since {new Date(user?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                    </div>
                </div>
            </motion.section>

            {/* Progress Blocks */}
            <motion.div 
                className="dashboard-blocks"
                variants={container}
            >
                {/* Progress Overview */}
                <motion.section 
                    className="progress-section block"
                    variants={item}
                >
                    <h2 className="section-title">
                        <FaChartBar className="section-icon" />
                        Your Progress
                    </h2>
                    
                    <motion.div 
                        className="progress-card"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="progress-card-content">
                            <div className="progress-metric">
                                <span className="progress-number">{userStats?.totalCompleted || 0}</span>
                                <span className="progress-label">Solved</span>
                            </div>
                            <div className="progress-metric">
                                <span className="progress-number">500</span>
                                <span className="progress-label">Total</span>
                            </div>
                            <div className="progress-metric">
                                <span className="progress-number">{calculatePercentage(userStats?.totalCompleted || 0, 500)}%</span>
                                <span className="progress-label">Completion</span>
                            </div>
                        </div>
                        <div className="progress-bar">
                            <div 
                                className="progress-bar-fill"
                                style={{ width: `${calculatePercentage(userStats?.totalCompleted || 0, 500)}%` }}
                            ></div>
                        </div>
                    </motion.div>
                </motion.section>

                {/* Difficulty Breakdown */}
                <motion.section 
                    className="difficulty-section block"
                    variants={item}
                >
                    <h2 className="section-title">
                        <FaBook className="section-icon" />
                        By Difficulty
                    </h2>
                    
                    <div className="difficulty-grid">
                        {userStats?.byDifficulty && Object.entries(userStats.byDifficulty).map(([difficulty, completed]) => {
                            const total = {
                                easy: 200,
                                medium: 200,
                                hard: 100
                            }[difficulty];
                            
                            return (
                                <motion.div 
                                    key={difficulty}
                                    className="difficulty-card"
                                    whileHover={{ scale: 1.03, boxShadow: "0 10px 20px rgba(0, 180, 216, 0.2)" }}
                                    variants={item}
                                >
                                    <h3 className={`difficulty-title ${difficulty}`}>
                                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                    </h3>
                                    <div className="difficulty-progress">
                                        <span className="difficulty-completed">{completed}</span>
                                        <span className="difficulty-total">/ {total}</span>
                                    </div>
                                    <div className="difficulty-bar">
                                        <motion.div 
                                            className="difficulty-bar-fill"
                                            initial={{ width: 0 }}
                                            animate={{ 
                                                width: `${calculatePercentage(completed, total)}%`,
                                                backgroundColor: 
                                                    difficulty === 'easy' ? 'var(--clr-easy)' :
                                                    difficulty === 'medium' ? 'var(--clr-medium)' : 'var(--clr-hard)'
                                            }}
                                            transition={{ duration: 0.8, type: "spring" }}
                                        />
                                    </div>
                                    <span className="difficulty-percentage">
                                        {calculatePercentage(completed, total)}%
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Topic Breakdown */}
                <motion.section 
                    className="topics-section block"
                    variants={item}
                >
                    <h2 className="section-title">
                        <FaBook className="section-icon" />
                        By Topic
                    </h2>
                    
                    <div className="topics-table-container">
                        <motion.table 
                            className="topics-table"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <thead>
                                <tr>
                                    <th>Topic</th>
                                    <th>Completed</th>
                                    <th>Total</th>
                                    <th>Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userStats?.byTopic && Array.from(userStats.byTopic.entries()).map(([topic, completed], index) => {
                                    const total = 20; // You might want to get actual totals from your data
                                    const percentage = calculatePercentage(completed, total);
                                    return (
                                        <motion.tr 
                                            key={topic}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05, duration: 0.3 }}
                                            whileHover={{ backgroundColor: 'rgba(0, 180, 216, 0.05)' }}
                                        >
                                            <td className="topic-name">{topic}</td>
                                            <td className="topic-completed">{completed}</td>
                                            <td className="topic-total">{total}</td>
                                            <td className="topic-progress">
                                                <div className="progress-container">
                                                    <motion.div 
                                                        className="progress-bar"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${percentage}%` }}
                                                        transition={{ delay: index * 0.05 + 0.2, duration: 0.8 }}
                                                    />
                                                    <span className="progress-text">{percentage}%</span>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </motion.table>
                    </div>
                </motion.section>

                {/* Recent Activity */}
                <motion.section 
                    className="activity-section block"
                    variants={item}
                >
                    <h2 className="section-title">
                        <FaHistory className="section-icon" />
                        Recent Activity
                    </h2>
                    
                    <div className="activity-list">
                        {[1, 2, 3].map((item, index) => (
                            <motion.div 
                                className="activity-item"
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                whileHover={{ x: 5 }}
                            >
                                <div className="activity-icon">
                                    <FaCheckCircle />
                                </div>
                                <div className="activity-content">
                                    <p>Solved <strong>"Sample Problem"</strong> (Easy - Array)</p>
                                    <p className="activity-time">{index + 1} hour ago</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;