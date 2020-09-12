import React from 'react';
import { ClipLoader } from 'react-spinners';
import './style.css';

export const Loader = ({ message, color }) => (
  <div className="text-center loader">
    <ul>
      <li>
        <ClipLoader
          sizeUnit={'px'}
          size={65}
          color={'cyan'}
          loading
        />
      </li>
      <li>
        <h3 style={{ color: color || 'white' }}>
          {message || ''}
        </h3>
      </li>
    </ul>
  </div>
)

export const CardLoader = () => (
  <div className="text-center dashboard_card_loader">
    <ClipLoader
      sizeUnit={'px'}
      size={40}
      color={'cyan'}
      loading
    />
  </div>
)

