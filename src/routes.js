import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import MainPage from './pages/Main/MainPage';
import MyInfo from './pages/MyPage/MyInfo';
import MyInfoEdit from './pages/MyPage/MyInfoEdit';
import MyVideos from './pages/MyPage/MyVideos';
import MyLikes from './pages/MyPage/MyLikes';
import MyChallenges from './pages/MyPage/MyChallenges';
import MyBettles from './pages/MyPage/MyBettles';
import MyComments from './pages/MyPage/MyComments';
import Rank from "./pages/MyPage/Rank";
import DeleteComment from './pages/MyPage/DeleteComments';
import Administer from './pages/MyPage/Administer';
import RegisterVideo from './pages/Video/RegisterVideo';
import PlayVideo from './pages/Video/PlayVideo';
import ChallengeList from './pages/Challenge/ChallengeList';
import ChallengeDetail from './pages/Challenge/ChallengeDetail';
import ChallengeRegister from './pages/Challenge/ChallengeRegister';
import BattleList from './pages/Battle/BattleList';
import BattleDetail from './pages/Battle/BattleDetail';
import BattleRegister from './pages/Battle/BattleRegister';
import OAuthCallback from './pages/Auth/OAuthCallback';
import AdminRoute from './components/AdminRoute';

const routes = [
  { path: "/", element: <MainPage /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/mypage/myinfo", element: <PrivateRoute element={<MyInfo />} /> },
  { path: "/mypage/myinfoedit", element: <PrivateRoute element={<MyInfoEdit />} /> },
  { path: "/mypage/myvideos", element: <PrivateRoute element={<MyVideos />} /> },
  { path: "/mypage/mylikes", element: <PrivateRoute element={<MyLikes />} /> },
  { path: "/mypage/mychallenges", element: <PrivateRoute element={<MyChallenges />} /> },
  { path: "/mypage/mybettles", element: <PrivateRoute element={<MyBettles />} /> },
  { path: "/mypage/mycomments", element: <PrivateRoute element={<MyComments />} /> },
  { path: "/mypage/deletecomments", element: <PrivateRoute element={<DeleteComment />} /> },
  { path: "/mypage/administer", element: <AdminRoute element={<Administer />} /> },
  { path: "/mypage/rank", element: <Rank /> },
  { path: "/video/register", element: <PrivateRoute element={<RegisterVideo />} /> },
  { path: "/video/play/:videoId", element: <PlayVideo /> },
  { path: "/challenge/list", element: <ChallengeList /> },
  { path: "/challenge/detail", element: <ChallengeDetail /> },
  { path: "/challenge/register", element: <PrivateRoute element={<ChallengeRegister />} /> },
  { path: "/battle/list", element: <BattleList /> },
  { path: "/battle/detail", element: <BattleDetail /> },
  { path: "/battle/register", element: <BattleRegister /> },
  { path: "/oauth/callback", element: <OAuthCallback /> }
];

const AppRoutes = () => (
  <>
    <ScrollToTop />
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  </>
);

export default AppRoutes;
