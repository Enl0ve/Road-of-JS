React实现页面部分：
```javascript
//login.js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-bootstrap';

const styles = {
    zhihuLogo:{
        stroke:"blue",
        strokeWidth:"0",
        fill:"blue",
        
    },
    titleContent:{
        color:"blue",
    },
    loginContainer: {
        textAlign: "center",   
        backgroundColor: "#fff",
        borderRadius: "2px",
        width: "400px",
        height: "350px",
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: "-200px",
        marginTop: "-200px",
    },
    footer: {
        width: "400px",
        height: "48px",
    },
    loginBody: {
        padding: "0px 24px",
    }
}

class Login extends Component {
    static propTypes = {
        phoneNumber: PropTypes.string.isRequired,
        validateCode: PropTypes.string.isRequired,
    }

    static defaultProps = {
        phoneNumber: '请输入合理的号码',
        validateCode: '请输入验证码',
    }

    constructor(props) {
        super(props);
        this.onValidateNumChange = this.onValidateNumChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.state = {
            phoneNumber: '',
            validateCode: '',
        }
    }

    onPhoneChange(event) {
        this.setState({
            phoneNumber: event.target.value,
        });
      }
    
    onValidateNumChange(event) {
        this.setState({
            validateCode: event.target.value,
        });
    }

    register(phoneNumber, validateCode) {
       const registerValue = {"phoneNumber": phoneNumber,
                                "validateCode": validateCode}
       const url = " http://localhost:8080/register";
       try {
           fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(registerValue),
           }).then( res => res.json())
             .then( data => {
                 console.log(data);
                 if(data.success){
                     alert('register OK');
                 }
             });
       } catch (error) {
           
       }
    }

    render() {
        const { phoneNumber, validateCode } = this.state;
        return  (
            <div className="loginContainer" style={ styles.loginContainer}>
                <div className="loginHeader">
                    <svg className="zhihuLogo" width="100" height="100" viewBox="0 0 100 100" style={styles.zhihuLogo}>
                        <g>
                            <path d="M53.29 80.035l7.32.002 2.41 8.24 13.128-8.24h15.477v-67.98H53.29v67.978zm7.79-60.598h22.756v53.22h-8.73l-8.718 5.473-1.587-5.46-3.72-.012v-53.22zM46.818 43.162h-16.35c.545-8.467.687-16.12.687-22.955h15.987s.615-7.05-2.68-6.97H16.807c1.09-4.1 2.46-8.332 4.1-12.708 0 0-7.523 0-10.085 6.74-1.06 2.78-4.128 13.48-9.592 24.41 1.84-.2 7.927-.37 11.512-6.94.66-1.84.785-2.08 1.605-4.54h9.02c0 3.28-.374 20.9-.526 22.95H6.51c-3.67 0-4.863 7.38-4.863 7.38H22.14C20.765 66.11 13.385 79.24 0 89.62c6.403 1.828 12.784-.29 15.937-3.094 0 0 7.182-6.53 11.12-21.64L43.92 85.18s2.473-8.402-.388-12.496c-2.37-2.788-8.768-10.33-11.496-13.064l-4.57 3.627c1.363-4.368 2.183-8.61 2.46-12.71H49.19s-.027-7.38-2.372-7.38zm128.752-.502c6.51-8.013 14.054-18.302 14.054-18.302s-5.827-4.625-8.556-1.27c-1.874 2.548-11.51 15.063-11.51 15.063l6.012 4.51zm-46.903-18.462c-2.814-2.577-8.096.667-8.096.667s12.35 17.2 12.85 17.953l6.08-4.29s-8.02-11.752-10.83-14.33zM199.99 46.5c-6.18 0-40.908.292-40.953.292v-31.56c1.503 0 3.882-.124 7.14-.376 12.773-.753 21.914-1.25 27.427-1.504 0 0 3.817-8.496-.185-10.45-.96-.37-7.24 1.43-7.24 1.43s-51.63 5.153-72.61 5.64c.5 2.756 2.38 5.336 4.93 6.11 4.16 1.087 7.09.53 15.36.277 7.76-.5 13.65-.76 17.66-.76v31.19h-41.71s.88 6.97 7.97 7.14h33.73v22.16c0 4.364-3.498 6.87-7.65 6.6-4.4.034-8.15-.36-13.027-.566.623 1.24 1.977 4.496 6.035 6.824 3.087 1.502 5.054 2.053 8.13 2.053 9.237 0 14.27-5.4 14.027-14.16V53.93h38.235c3.026 0 2.72-7.432 2.72-7.432z"></path>
                        </g>
                    </svg>
                    <p className="titleContent" style={styles.titleContent}>注册知乎，发现更多信赖的解答</p>
                </div>
                <div className="loginBody" style={ styles.loginBody }>
                    <div>
                        <span>手机号:</span><input type="text" onChange={this.onPhoneChange}></input>
                    </div>
                    <p></p>
                    <div>
                        <span>验证码:</span><input placeholder="请输入验证码" type="text" onChange={this.onValidateNumChange}></input>
                    </div>
                    <div className="loginFooter" style={ styles.loginFooter }>
                    <p></p>
                    <Button variant="primary" block onClick={this.register.bind(this, phoneNumber, validateCode)}>注册</Button>
                    </div>
                </div>
                <hr></hr>
                <div className="footer" style={ styles.footer }>
                    <span>已有账号?<a style={{color:"blue"}}>登录</a></span>
                </div>
            </div>
        );  
    }
}

export default Login
```

express作为服务器，mysql实现数据持久化：
```javascript
const express = require('express');
const app = express();
const mysql = require('mysql')；

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Orign', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.get('register', jsonParser, (req, res) => {
    let result = {
        success: false,
    }
    let data = req.body;
    let insertData = {
        phoneNumber: data.phoneNumber
    }
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        passwrd: '1234',
        database: 'userdb',
        connectTimeout: 2000,
    });
    connection.connect( (err) => {
        if(err) {
            console.err('err connecting:', err.stack);
            return;
        }

        console.log('connection as id:', connection.threadId);
    });

    connection.query('INSERT INTO zhihuRegistered SET ?', insertData, (err, fields) => {
        if(err)
            throw err;
        results.success = true;
        console.log('insert fields:', fields);
    });

    connection.end( (err) => {
        if(err) {
            throw err;
            return;
        }
        res.send(results);
        console.log('connection close');
    });
});

let server = app.listen('8000', function() => {
    const port = server.address().port;
    console.log('server starts....');
    console.log('*===============*');
    console.log('server is running at port', port);
})
```

这里简单写下实现部分，有想问的可以在下方评论，我都会一一回复。