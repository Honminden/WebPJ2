import React,{ useState, useEffect }  from 'react';
import Header from './js/Header'
import './App.css';
import Tools from "./js/function/Tools";
import Form from "./js/component/global/Form";
import Tag from "./js/component/global/Tag";

function User()
{
  const [signed, setSigned] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [username,setUsername] = useState(null);
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  const [rePassword,setRePassword] = useState(null);
  const [phone,setPhone] = useState(null);
  const [address,setAddress] = useState(null);
  const [info,setInfo] = useState({state: ""});
  const [submit, setSubmit] = useState(false);

  useEffect(() =>
  {
      Tools.getJSON('/sign', [{name: 'aim', value: 'check'}], data =>
      {
          let datum = (Array.isArray(data)) ? data[0] : data;
          console.log(datum.signed);
          console.log(datum.userID);
          setSigned(datum.signed === true);
      })
  });

  useEffect(() =>
  {
      if (submit)
      {
          if (signUp)
          {
              Tools.signUp(setInfo,
                  {
                      name: username,
                      email: email,
                      password: password,
                      rePassword: rePassword,
                      phone: phone,
                      address: address
                  });
          }
          else
          {
              Tools.signIn(setInfo,
                  [
                      {name: 'name', value: username},
                      {name: 'password', value: password}
                  ]);
          }
          setSubmit(false);
      }
  }, [address, email, password, phone, rePassword, signUp, submit, username]);

  return (
    <div className="User">
      <Header />
      <h1> {(signed) ? "User" : (signUp) ? "SignUp" : "SignIn"} </h1>
      <Tag innerText={(info.state) ? info.state : ''}/>
      {
          (signed) ?
              <div>
              </div>
              :
              (signUp) ?
                  <Form className={'block'}
                        inputs=
                            {[
                                {
                                    key: 0,
                                    innerText: '->signIn',
                                    type: 'checkBox',
                                    name: 'signIn',
                                    onChange: () => {setSignUp(false)}
                                },
                                {
                                    key: 1,
                                    type: 'text',
                                    name: 'username',
                                    placeholder: "username...",
                                    onChange: e => {setUsername(e.target.value)}
                                },
                                {
                                    key: 2,
                                    type: 'email',
                                    name: 'email',
                                    placeholder: "email...",
                                    onChange: e => {setEmail(e.target.value)}
                                },
                                {
                                    key: 3,
                                    type: 'password',
                                    name: 'password',
                                    placeholder: "password...",
                                    onChange: e => {setPassword(e.target.value)}
                                },
                                {
                                    key: 4,
                                    type: 'password',
                                    name: 'rePassword',
                                    placeholder: "password again...",
                                    onChange: e => {setRePassword(e.target.value)}
                                },
                                {
                                    key: 5,
                                    type: 'tel',
                                    name: 'phone',
                                    placeholder: "phone...",
                                    onChange: e => {setPhone(e.target.value)}
                                },
                                {
                                    key: 6,
                                    type: 'text',
                                    name: 'address',
                                    placeholder: "address...",
                                    onChange: e => {setAddress(e.target.value)}
                                }
                            ]}
                        onClick={null}
                        innerText={"Submit"}
                        onSubmit={e => {setSubmit(true); e.preventDefault();}}/>
                  :
                  <Form className={'block'}
                        inputs=
                            {[
                                {
                                    key: 0,
                                    innerText: '->signUp',
                                    type: 'checkBox',
                                    name: 'signUp',
                                    onChange: () => {setSignUp(true)}
                                },
                                {
                                    key: 1,
                                    type: 'text',
                                    name: 'username',
                                    placeholder: "username...",
                                    onChange: e => {setUsername(e.target.value)}
                                },
                                {
                                    key: 3,
                                    type: 'password',
                                    name: 'password',
                                    placeholder: "password...",
                                    onChange: e => {setPassword(e.target.value)}
                                }
                            ]}
                        onClick={null}
                        innerText={"Submit"}
                        onSubmit={e => {setSubmit(true); e.preventDefault();}}/>

      }
    </div>
  );
}

export default User;
