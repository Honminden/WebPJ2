import React from 'react';
import logo from '../../../img/logo.svg';

class Logo extends React.Component
{
    render()
    {
        return (
            <div className={'Logo'}>
              <img src={logo} alt="logo" />
              <h1> HMD Art™ </h1>
            </div>
        );
    }
}

export default Logo;