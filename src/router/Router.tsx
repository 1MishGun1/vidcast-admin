import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/Layout/Layout";
import { HomePage } from "../pages/HomePage";
import { FullVideoPage } from "../pages/FullVideoPage/FullVideoPage";
import { AuthLayout } from "../components/AuthLayout/AuthLayout";
import { LoginPage } from "../pages/LoginPage/LoginPage";
import { ChanelPage } from "../pages/ChanelPage/ChanelPage";
import { VideosChanelPage } from "../pages/VideosChanelPage/VideosChanelPage";
import { PlaylistsChanelPage } from "../pages/PlaylistsChanelPage/PlaylistsChanelPage";
import { SearchResultPage } from "../pages/SearchResultPage/SearchResultPage";
import { FullVideoLayout } from "../components/FullVideoLayout/FullVideoLayout";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";
import { UserPage } from "../pages/UserPage/UserPage";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/chanel/:id" element={<ChanelPage />} />
        <Route path="/chanel/videos/:id" element={<VideosChanelPage />} />
        <Route path="/chanel/playlists/:id" element={<PlaylistsChanelPage />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<FullVideoLayout />}>
        <Route path="/videos/:id" element={<FullVideoPage />} />
      </Route>
    </Routes>
  );
};
