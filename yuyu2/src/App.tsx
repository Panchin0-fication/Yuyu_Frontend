import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FrontPage,
  Oficial,
  Fanon,
  FrontImages,
  Sprites,
  Mangas,
  FanArts,
  PostFanArt,
  CreateAccount,
  ValidateUser,
  Login,
  ChangePassword,
  AccountConfig,
  ToValidateFanArts,
  ValidateFanArts,
} from "@features";
import { RestrictedPage, ProtectedRoute } from "@shared";
import "./i18n";
import "./App.css";
function App() {
  const { t } = useTranslation("common");
  return (
    <div className="body">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage />}></Route>
          <Route path="/oficial" element={<Oficial />}></Route>
          <Route path="/fanon" element={<Fanon />}></Route>
          <Route path="/images" element={<FrontImages />}></Route>
          <Route path="/sprites" element={<Sprites />}></Route>
          <Route path="/mangas" element={<Mangas />}></Route>
          <Route path="/fanArts" element={<FanArts />}></Route>
          <Route
            path="/fanArts/Post"
            element={
              <ProtectedRoute mode="logged">
                <PostFanArt />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fanArts/toValidate"
            element={
              <ProtectedRoute mode="admin">
                <ToValidateFanArts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fanArts/validatePost"
            element={
              <ProtectedRoute mode="admin">
                <ValidateFanArts />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/create" element={<CreateAccount />} />
          <Route path="/auth/validate" element={<ValidateUser />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/changePassword" element={<ChangePassword />} />
          <Route
            path="/auth/accountConfig"
            element={
              <ProtectedRoute mode="logged">
                <AccountConfig />
              </ProtectedRoute>
            }
          />
          <Route
            path="/inaccessible"
            element={
              <RestrictedPage
                info={t("inaccesible_admin")}
                toRedirect="/"
                backgroundImg="/staticImgs/generalUse/youmu_inaccesible.png"
              />
            }
          />
          <Route
            path="/unlogged"
            element={
              <RestrictedPage
                info={t("inaccesible_login")}
                toRedirect="/auth/login"
                backgroundImg="/staticImgs/generalUse/yuyuko_inaccesible.png"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
