// // ✅ Imports (Clean & Structured)
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

// // ✅ Public Pages
// import Home from "./pages/Home";
// import ContestDetails from "./pages/ContestDetails";
// import Login from "./pages/Login";
// import VerifyOtp from "./pages/VerifyOTP";
// import Register from "./pages/Register";

// // ✅ Protected Pages
// import ProfilePage from "./pages/ProfilePage";
// import WalletAdd from "./pages/AddWallete";
// import JoinedContestPage from "./pages/JoinedContestDetail";

// // ✅ Middleware (Route Protection)
// import ProtectedRoute from "./middlewares/ProtectedRoute";
// import NotFound from "./pages/NotFound";

// export default function App() {
//   return (
//     <Router>
//       <div className="bg-black min-h-screen text-white">
//         {/* ✅ Navbar is always visible */}
//         <Navbar />

//         <Routes>
//           {/* ✅ Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/contest/:id" element={<ContestDetails />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/verify-otp" element={<VerifyOtp />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="*" element={<NotFound />} />
//           {/* ✅ Protected Routes (Only logged-in users can access) */}
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute>
//                 <ProfilePage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/add-wallet"
//             element={
//               <ProtectedRoute>
//                 <WalletAdd />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/joined-contest/:contestId"
//             element={
//               <ProtectedRoute>
//                 <JoinedContestPage />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// }


// ✅ Imports (Clean & Structured)
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// ✅ Public Pages
import Home from "./pages/Home";
import ContestDetails from "./pages/ContestDetails";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOTP";
import Register from "./pages/Register";

// ✅ Protected Pages
import ProfilePage from "./pages/ProfilePage";
import WalletAdd from "./pages/AddWallete";
import JoinedContestPage from "./pages/JoinedContestDetail";

// ✅ Middleware (Route Protection)
import ProtectedRoute from "./middlewares/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Support from "./pages/Support";
import UpdateProfile from "./pages/UpdateProfile";

export default function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* ✅ Navbar is always visible */}
      <Navbar />
     
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contest/:id" element={<ContestDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path ="/support" element ={<Support/>}/>
        {/* ✅ Protected Routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-wallet"
          element={
            <ProtectedRoute>
              <WalletAdd />
            </ProtectedRoute>
          }
        />

          <Route
          path="/update-profile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/joined-contest/:contestId"
          element={
            <ProtectedRoute>
              <JoinedContestPage />
            </ProtectedRoute>
          }
        />


      </Routes>
      <Footer/>

    </div>
  );
}
