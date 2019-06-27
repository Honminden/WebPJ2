import React,{ useState, useEffect }  from 'react';
import Header from './js/Header'
import './App.css';
import Tools from "./js/function/Tools";
import Form from "./js/component/global/Form";
import Tag from "./js/component/global/Tag";
import Button from "./js/component/global/Button";
import Figure from "./js/component/global/Figure";

const CAPCHA_DIV = './CAPCHA/';

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
  const [deposit, setDeposit] = useState(null);
  const [submitDeposit,setSubmitDeposit] = useState(false);
  const [info,setInfo] = useState({state: "", user: {}});
  const [submit, setSubmit] = useState(false);
  const [own, setOwn] = useState(null);
  const [order, setOrder] = useState(null);
  const [sold, setSold] = useState(null);

    useEffect(() =>
    {
        if (signed && info.user.userID)
        {
            Tools.setImgs('own', setOwn, [{name: 'userID', value: info.user.userID}]);
            Tools.setImgs('order', setOrder, [{name: 'userID', value: info.user.userID}]);
            Tools.setImgs('sold', setSold, [{name: 'userID', value: info.user.userID}]);
        }
    }, [info.user, signed]);

  useEffect(() =>
  {
     if (info.state === "Signed")
     {
         Tools.signIn(setInfo,
             [
                 {name: 'name', value: username},
                 {name: 'password', value: password}
             ]);
         info.state = "";
     }
  }, [info.state, username, password]);

  useEffect(() =>
  {
      if (!signed)
      {
          Tools.getJSON('/sign', [{name: 'aim', value: 'check'}], data =>
          {
              let datum = (Array.isArray(data)) ? data[0] : data;
              setSigned(datum.signed === true);
              if (datum.user)
              {
                  setInfo({state: "", user: datum.user})
              }
          });
      }
  }, [signed]);

  useEffect(() =>
  {
      if (submit)
      {
          if (signUp)
          {
              Tools.signUp(setInfo,
                  [
                      {name: 'name', value: username},
                      {name: 'email', value: email},
                      {name: 'password', value: password},
                      {name: 'rePassword', value: rePassword},
                      {name: 'phone', value: phone},
                      {name: 'address', value: address}
                  ]);
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

    useEffect(() =>
    {
        if (submitDeposit)
        {
            Tools.getJSON('/sign',
                [
                    {name: 'aim', value: 'deposit'},
                    {name: 'userID', value: info.user.userID},
                    {name: 'deposit', value: deposit}
                ], data =>
            {
                let datum = (Array.isArray(data)) ? data[0] : data;
                setInfo(datum);
            });
            setSubmitDeposit(false);
        }
    }, [submitDeposit, info.user, deposit]);

  return (
    <div className="User">
      <Header />
      <Tag innerText={(info.state) ? info.state : ''}/>
      {
          (signed) ?
              <div>
                  <h1> {(signed) ? "Welcome, " + info.user.name : (signUp) ? "SignUp" : "SignIn"} </h1>
                  <table>
                      <thead> User: {info.user.name} </thead>
                      <tr>
                          <td> Email </td>
                          <td> {info.user.email} </td>
                      </tr>
                      <tr>
                          <td> Phone </td>
                          <td> {info.user.tel} </td>
                      </tr>
                      <tr>
                          <td> Address </td>
                          <td> {info.user.address} </td>
                      </tr>
                      <tr>
                          <td> Balance </td>
                          <td> {info.user.balance} </td>
                      </tr>
                  </table>
                  <Form className={'block'}
                        inputs=
                            {[
                                {
                                    key: 14,
                                    innerText: 'Deposit',
                                    type: 'number',
                                    name: 'deposit',
                                    onChange: e => {setDeposit(e.target.value)}
                                }
                            ]}
                        onClick={null}
                        innerText={"Submit"}
                        onSubmit={e => {setSubmitDeposit(true); e.preventDefault();}}/>
                  {
                      (own) ?
                          <Figure className={'vertical'}
                                  imgs = {own}
                                  captionSide={'top'}
                                  innerText={<Tag className={'blue brighter'} fontSize={'2em'} innerText={'Own'}/>}/>
                          :
                          <Figure color={'white'} innerText={"Nothing"} />
                  }
                  {
                      (order) ?
                          <Figure className={'vertical'}
                                  imgs = {order}
                                  captionSide={'top'}
                                  innerText={<Tag className={'blue brighter'} fontSize={'2em'} innerText={'Order'}/>}/>
                          :
                          <Figure color={'white'} innerText={"Nothing"} />
                  }
                  {
                      (sold) ?
                          <Figure className={'vertical'}
                                  imgs = {sold}
                                  captionSide={'top'}
                                  innerText={<Tag className={'blue brighter'} fontSize={'2em'} innerText={'Sold'}/>}/>
                          :
                          <Figure color={'white'} innerText={"Nothing"} />
                  }
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
