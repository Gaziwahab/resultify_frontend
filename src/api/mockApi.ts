import { Student, College, Course, UploadBatch } from './mockData';

const API_URL = import.meta.env.VITE_API_URL;

export const searchResult = async (
  college: string,
  course: string,
  rollNo: string
): Promise<Student | null> => {
  const res = await fetch(`${API_URL}/students/${encodeURIComponent(rollNo)}?college=${encodeURIComponent(college)}&course=${encodeURIComponent(course)}`);
  if (!res.ok) return null;

  const doc: any = await res.json();
  const mapSubject = (s: any) => ({
    name: s.name || s.subject || '',
    marks: s.marks != null ? Number(s.marks) : 0,
    max: s.max != null ? Number(s.max) : 0,
    grade: s.grade || s.overallGrade || undefined
  });

  const student: Student = {
    college: doc.college || '',
    course: doc.course || '',
    roll_no: doc.roll_no || '',
    name: doc.name || '',
    mobile_no: doc.mobile_no || '',
    subjects: Array.isArray(doc.subjects) ? doc.subjects.map(mapSubject) : [],
    total: doc.total != null ? Number(doc.total) : 0,
    percentage: doc.percentage != null ? Number(doc.percentage) : undefined,
    overallGrade: doc.overallGrade || doc.grade || undefined,
    rank: doc.rank != null ? Number(doc.rank) : undefined
  };

  return student;
};

// API functions for fetching data
export const getColleges = async (): Promise<string[]> => {
  const apiUrl = `${import.meta.env.VITE_API_URL}/colleges`;
  console.log('Making API request to:', apiUrl);
  
  try {
    console.log('Sending request...');
    const response = await fetch(apiUrl);
    console.log('Received response');
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('Raw response text:', responseText);

    if (!response.ok) {
      console.error('Error response:', responseText);
      throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
      console.log('Parsed response data:', data);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      throw new Error('Invalid JSON in response');
    }

    if (!Array.isArray(data)) {
      console.error('Response is not an array:', data);
      throw new Error('Expected array of colleges but got: ' + typeof data);
    }

    return data;
  } catch (error) {
    console.error('Error fetching colleges:', error);
    throw error;
  }
};

export const getCoursesByCollege = async (collegeName: string): Promise<string[]> => {
  try {
    console.log('Fetching courses for college:', collegeName);
    const response = await fetch(`${import.meta.env.VITE_API_URL}/colleges/${encodeURIComponent(collegeName)}/courses`);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('Received courses data:', data);
    
    if (!Array.isArray(data)) {
      throw new Error('Server did not return an array of courses');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getUploadedBatches = async (): Promise<UploadBatch[]> => {
  const res = await fetch(`${API_URL}/admin/batches`);
  if (!res.ok) throw new Error('Failed to fetch batches');
  return res.json();
};

export const publishBatch = async (batchId: string): Promise<boolean> => {
  const token = localStorage.getItem('resultify-admin-token');
  if (!token) return false;

  const res = await fetch(`${API_URL}/admin/batches/${batchId}/publish`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.ok;
};

export const deleteBatch = async (batchId: string): Promise<boolean> => {
  const token = localStorage.getItem('resultify-admin-token');
  if (!token) return false;

  const res = await fetch(`${API_URL}/admin/batches/${batchId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.ok;
};

export const adminLogin = async (username: string, password: string): Promise<string | null> => {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.token || null;
};

export const verifyAdminToken = async (): Promise<boolean> => {
  const token = localStorage.getItem('resultify-admin-token');
  if (!token) return false;

  try {
    const res = await fetch(`${API_URL}/admin/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.ok;
  } catch {
    return false;
  }
};
