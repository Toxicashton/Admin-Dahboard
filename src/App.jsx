// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

// Import your pages (create placeholder files for them for now)
import Dashboard from './pages/Dashboard';
import ChatWithDocument from './pages/ChatWithDocument';
import CreateRequest from './pages/CreateRequest';
import EditRequestDetails from './pages/EditRequestDetails';
import PromptLibrary from './pages/PromptLibrary';
import ManageUsers from './pages/ManageUsers';
import ManageTags from './pages/ManageTags';
import ManageDocuments from './pages/ManageDocuments';
import UploadDocument from './pages/UploadDocument';
// ... import other pages

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the main application layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/:requestId" element={<EditRequestDetails />} />
          <Route path="chat" element={<ChatWithDocument />} />
          <Route path="create-request" element={<CreateRequest />} />
          <Route path="prompts" element={<PromptLibrary />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="tags" element={<ManageTags />} />
          <Route path="documents" element={<ManageDocuments />} />
          <Route path="documents/upload" element={<UploadDocument />} />
          
        </Route>
        
        {/* <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} /> 
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;