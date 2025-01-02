import { Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from '../pages/HomeScreen';
import Register from '../components/RegistrationForm/RegistrationForm';
import { AuthProvider } from '../contexts/AuthContext';
import AddMARCRecord from '../pages/MARC-Record/AddMARCRecord';
import CurriculumManagement from '../pages/Curriculum-Management/CurriculumManagement';
import ManageCourses from '../pages/Curriculum-Management/Managers/ManageCourse';
import ManageDepartments from '../pages/Curriculum-Management/Managers/ManageDepartments';
import ManageSubjects from '../pages/Curriculum-Management/Managers/ManageSubjects';
import UniversityCurriculumPage from '../pages/Curriculum-Management/UniversityCurriculumPage';
import ProgramPage from '../pages/Curriculum-Management/ProgramPage';
import VerifyOtp from '../components/Verify/VerifyOtp';
import VerifyUser from '../components/Verify/VerifyUser';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';

const AppRoutes = () => (
  <Routes>
    {/* PUBLIC ROUTES */}
    <Route path="/" element={<HomeScreen />} />
    <Route path="/register" element={<Register />} />
    <Route path='/marc-record/add' element={<AddMARCRecord />} />
    <Route path='/university/curriculum' element={<UniversityCurriculumPage />} />
    <Route path="/:departmentName/:programName" element={<ProgramPage />} />
    <Route path='/curriculum/management' element={<CurriculumManagement />} />
    <Route path='/curriculum/management/manage/departments' element={<ManageDepartments />} />
    <Route path='/curriculum/management/manage/courses' element={<ManageCourses />} />
    <Route path='/curriculum/management/manage/subjects' element={<ManageSubjects />} />
    <Route path="/verify/user" element={<VerifyUser />} />
    <Route path="/verify/user/otp" element={<VerifyOtp />} />
    {/* ADMIN ROUTES */}
    <Route path="admin/*" element={<AdminRoutes />} />

    {/* USER ROUTES */}
    <Route path="user/*" element={<UserRoutes />} />

    {/* Default page for unmatched routes */}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

const RoutesWrapper = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default RoutesWrapper;

// CURRENTLY FIXING NAVIGATION FOR BETTER DEBUGGING
// PLEASE ADD THIS ON PUBLIC ROUTES FOR TESTING
//             <Route path='/register/card' element={<LibraryCardGenerationPage />} />
//             <Route path='/' element={<HomeScreen />} /> {/* Home route to display the HomeScreen */}
//             <Route path='/curriculummanagement' element={<CurriculumManagement />} />
//             <Route path='/curriculummanagement/manage/departments' element={<ManageDepartments />} />
//             <Route path='/curriculummanagement/manage/courses' element={<ManageCourses />} />
//             <Route path='/curriculummanagement/manage/subjects' element={<ManageSubjects />} />
//             <Route path='/verify' element={<VerifyStudent />} /> {/* Registration route to display the Register component */}
//             <Route path="/verify-otp" element={<VerifyOtp />} />
//             <Route path='/register' element={<Register />} />
//             <Route path='/landing' element={<LandingPage />} /> {/* New route for admin landing page */}
//             <Route path='/marc-record/add' element={<AddMARCRecord />} />
