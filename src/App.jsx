import React from 'react';
import {useRoutes} from 'react-router-dom';
import './App.scss';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import LaobanInfo from './pages/LaobanInfo';
import DashenInfo from './pages/DashenInfo';
import Home from './pages/Home';
import Laoban from './pages/Home/Laoban';
import Dashen from './pages/Home/Dashen';
import Message from './pages/Home/Message';
import PersonCenter from './pages/Home/PersonCenter';
import Chat from './pages/Chat';

export default function App() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Main />,
      children: [
        {
          path: 'laobaninfo',
          element: <LaobanInfo />
        },
        {
          path: 'dasheninfo',
          element: <DashenInfo />
        },
        {
          path: 'chat/:userid',
          element: <Chat />
        },
        {
          path: 'home',
          element: <Home />,
          children: [
            {
              path: 'laoban',
              element: <Laoban />
            },
            {
              path: 'dashen',
              element: <Dashen />
            },
            {
              path: 'msg',
              element: <Message />
            },
            {
              path: 'pc',
              element: <PersonCenter />
            }
          ]
        },
      ]
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'register',
      element: <Register />
    },
    {
      path: '*',
      element: <NotFound />
    },
  ]);
  return routes;
}