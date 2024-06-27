import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import MainPage from './pages/Main/MainPage';
import MyInfo from './pages/MyPage/MyInfo';
import MyInfoEdit from './pages/MyPage/MyInfoEdit';
import MyVideos from './pages/MyPage/MyVideos';
import MyLikes from './pages/MyPage/MyLikes';
import MyChallenges from './pages/MyPage/MyChallenges';
import MyComments from './pages/MyPage/MyComments';
import DeleteComment from './pages/MyPage/DeleteComments';
import RegisterVideo from './pages/Video/RegisterVideo';
import PlayVideo from './pages/Video/PlayVideo';
import ChallengeList from './pages/Challenge/ChallengeList';
import ChallengeDetail from './pages/Challenge/ChallengeDetail';
import ChallengeRegister from './pages/Challenge/ChallengeRegister';
import BattleList from './pages/Battle/BattleList';
import BattleDetail from './pages/Battle/BattleDetail';
import BattleRegister from './pages/Battle/BattleRegister';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage/myinfo" element={<MyInfo />} />
        <Route path="/mypage/myinfoedit" element={<MyInfoEdit />} />
        <Route path="/mypage/myvideos" element={<MyVideos />} />
        <Route path="/mypage/mylikes" element={<MyLikes />} />
        <Route path="/mypage/mychallenges" element={<MyChallenges />} />
        <Route path="/mypage/mycomments" element={<MyComments />} />
        <Route path="/mypage/deletecomments" element={<DeleteComment />} />
        <Route path="/video/register" element={<RegisterVideo />} />
        <Route path="/video/play" element={<PlayVideo />} />
        <Route path="/challenge/list" element={<ChallengeList />} />
        <Route path="/challenge/detail" element={<ChallengeDetail />} />
        <Route path="/challenge/register" element={<ChallengeRegister />} />
        <Route path="/battle/list" element={<BattleList />} />
        <Route path="/battle/detail" element={<BattleDetail />} />
        <Route path="/battle/register" element={<BattleRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
