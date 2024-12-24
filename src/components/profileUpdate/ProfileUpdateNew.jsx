import React, { useState } from 'react';
import './profileUpdateNew.css';
import AccountSettings from './AccountSettings';
import ChangePassword from './ChangePassword';

const ProfileUpdate = () => {
  const [activeTab, setActiveTab] = useState('account');

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSettings />;
      case 'password':
        return <ChangePassword />;
      default:
        return <AccountSettings />;
    }
  };

  return (
    <div className="profile-update-container">
    <div className="profile-container">
      <div className="vertical-tabs">
        <button
          className={activeTab === 'account' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('account')}
        >
          Account Settings
        </button>
        <button
          className={activeTab === 'password' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </button>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
    </div>
  );
};


export default ProfileUpdate;
