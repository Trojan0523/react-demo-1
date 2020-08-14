import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  };

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <FormattedDate date={this.state.date}/>
    );
  }
}

function FormattedDate(props) {
  return (
    <h2>It is {props.date.toLocaleTimeString()}</h2>
  );
}

function Tick() {
  return (
    <Clock/>
  );

}

setInterval(Tick, 1000);

function App1() {
  return (
    <div>
      <Tick/>
    </div>
  );
}

function Author(props) {
  return (
    <div>
      {props.name}<br/>{props.url}
    </div>
  );
}

function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    alert('The link was Clicked.');
  }

  return (
    <button onClick={handleClick}>Click Me</button>
  );
}

function UserInfo(props) {
  return (
    <div>
      <Author className="UserInfo-name" name={author.name} url={author.avatarUrl}/>
    </div>
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo className="UserInfo"/>
    </div>
  );
}

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn,
    }), () => {
      console.log(this.state.isToggleOn);
    });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

const author = {
  avatarUrl: 'www.baidu.com',
  name: 'Trojan'
};

/*
*   条件运算符 if
*   author: Trojan
* */

function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

/*
*   三目运算符 ? :
*   author: Trojan
*   改写if语法
* */
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <UserGreeting/>
        : <GuestGreeting/>
      }
    </div>
  );
  // if(isLoggedIn) {
  //   return <UserGreeting/>;
  // } else {
  //   return <GuestGreeting/>;
  // }
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>Login</button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick}/>;
    } else {
      button = <LoginButton onClick={this.handleLoginClick}/>;
    }
    return (
      <div>
        <Greeting isLoggedIn={this.state.isLoggedIn}/>
        {button}
      </div>
    );
  }
}

/*
*   与运算符 &&
*   author: Trojan
* */
function MailBox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      {unreadMessages.length > 0 &&
      <h2>
        you have {unreadMessages.length} unread messages.
      </h2>
      }
    </div>
  );
}

const messages = ['React', '', 'Re: React', 'Re:Re: React'];

/*
*   阻止组件渲染
* */
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }
  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {shwWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning}/>
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

/*
*   列表渲染
* */

const numbers = [1, 2, 3, 4, 5];
// const listItems = numbers.map((number) =>
//   <li>{number}</li>
// );

/*
* 基础列表组件
* */

function NumberList(props) {
  const number = props.numbers;
  //  这里是JSX嵌入map()
  const listItems = number.map((number,index) =>
    // 骚操作 反正只要你没用过，保证其唯一就行,这里的index保留
    <li key={parseInt(number)}>
      {number}
    </li>
  );
  return <ul>{listItems}</ul>;
}

ReactDOM.render(
  <React.StrictMode>
    <App1/>
    <App/>
    <Comment name={author.name} url={author.avatarUrl}/>
    <ActionLink/>
    <Toggle/>
    <LoginControl/>
    <MailBox unreadMessages={messages}/>
    <Page/>
      <NumberList numbers={numbers}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
