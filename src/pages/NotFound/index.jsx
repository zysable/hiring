import {Button} from 'antd-mobile';
import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{margin: '20px'}}>
      <h2 style={{marginBottom: '20px'}}>Sorry, Page Not Found</h2>
      <Button color='primary' onClick={() => navigate('/')}>Back</Button>
    </div>
  );
}
