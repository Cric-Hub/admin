import React, { useState } from 'react';
import './userProfile.css';
import Profile from './Profile';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('account');

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return <Profile />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="profile-update-container">
    <div className="profile-container">
      <div className="vertical-tabs">
        <button
          className={activeTab === 'Profile' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('account')}
        >
          Profile
        </button>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
    </div>
  );
};


export default UserProfile;
