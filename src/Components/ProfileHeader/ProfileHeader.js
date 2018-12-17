import React from 'react';
import thumbnail from '../../static/images/default_thumbnail.png';
import './ProfileHeader.scss';
import { getUserId } from '../../lib/common';

const loggedId = getUserId();

const ProfileHeader = ({ userId, userName, toggleFollow }) => (
  <div className="profile-header">
    <img src={thumbnail} alt="user thumbnail" />
    <div className="info-wrapper">
      <div className="userid">{userId}</div>
      <div className="userName">{userName}</div>
    </div>
    <button
      type="button"
      onClick={() =>
        toggleFollow({ followUserId: loggedId, followedUserId: userId })
      }
    >
      팔로우
    </button>
  </div>
);

export default ProfileHeader;
