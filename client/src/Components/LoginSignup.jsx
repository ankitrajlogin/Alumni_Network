import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';


const LoginSignup = ({isLogin,setIsLogin}) => {
    const [log,setlog] = useState(false) ; 
    return (
      <div className="">
        <h1>{log ? 'Login' : 'Signup'}</h1>
        {log ? <Login isLogin={isLogin} setIsLogin={setIsLogin}/> : <Signup isLogin={isLogin} setIsLogin={setIsLogin} />}
        <button onClick={() => setlog(!log)}>
          {log ? 'Switch to Signup' : 'Switch to Login'}
        </button>
      </div>
    );
}

export default LoginSignup
