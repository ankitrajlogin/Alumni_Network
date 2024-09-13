import React, { useState } from 'react';


const Signup = ({isLogin,setIsLogin}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Name,setName] = useState('') ; 
  const [phone ,setphone] = useState('') ; 
  const [bio,setbio] = useState('') ; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = {
      name: Name,
      email: email,
      password: password,
      bio: bio,
      phone: phone
    };
  
    console.log('User Data:', userData); // This will show you what data you're sending
    
    const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(userData),
    });
  
    const data = await response.json();
    console.log(data);
    if(data.sucess){
        setIsLogin(isLogin);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label>Name:</label>
            <input
                type="name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                required
            />
        </div>
        <div>
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        <div>
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <div>
            <label>Phone:</label>
            <input
                type="Phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                
            />
        </div>
        <div>
            <label>Bio:</label>
            <input
                type="text"
                value={bio}
                onChange={(e) => setbio(e.target.value)}
                required
            />
        </div>
      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
