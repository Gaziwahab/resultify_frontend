// Mock data for Resultify platform

export interface Subject {
  name: string;
  marks: number;
  max: number;
  grade?: string;
}

export interface Student {
  college: string;
  course: string;
  roll_no: string;
  name: string;
  mobile_no: string;
  subjects: Subject[];
  total: number;
  percentage?: number;
  overallGrade?: string;
  rank?: number;
}

export interface College {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  name: string;
  collegeId: string;
}

export const colleges: College[] = [
  { id: 'pcte', name: 'PCTE College' },
  { id: 'dav', name: 'DAV College' },
  { id: 'lovely', name: 'Lovely Professional University' },
  { id: 'chandigarh', name: 'Chandigarh University' },
];

export const courses: Course[] = [
  { id: 'btech-cse', name: 'B.Tech CSE', collegeId: 'pcte' },
  { id: 'btech-ece', name: 'B.Tech ECE', collegeId: 'pcte' },
  { id: 'bca', name: 'BCA', collegeId: 'pcte' },
  { id: 'mba', name: 'MBA', collegeId: 'pcte' },
  { id: 'btech-cse', name: 'B.Tech CSE', collegeId: 'dav' },
  { id: 'bcom', name: 'B.Com', collegeId: 'dav' },
  { id: 'btech-cse', name: 'B.Tech CSE', collegeId: 'lovely' },
  { id: 'mtech', name: 'M.Tech', collegeId: 'lovely' },
  { id: 'btech-cse', name: 'B.Tech CSE', collegeId: 'chandigarh' },
  { id: 'bsc', name: 'B.Sc', collegeId: 'chandigarh' },
];

const calculateGrade = (percentage: number): string => {
  if (percentage >= 90) return 'A+';
  if (percentage >= 80) return 'A';
  if (percentage >= 70) return 'B+';
  if (percentage >= 60) return 'B';
  if (percentage >= 50) return 'C';
  if (percentage >= 40) return 'D';
  return 'F';
};

export const students: Student[] = [
  {
    college: 'PCTE College',
    course: 'B.Tech CSE',
    roll_no: '1001',
    name: 'Gazi Wahab',
    mobile_no: '9876543210',
    subjects: [
      { name: 'Physics', marks: 87, max: 100, grade: 'A' },
      { name: 'Mathematics', marks: 90, max: 100, grade: 'A+' },
      { name: 'Computer Science', marks: 85, max: 100, grade: 'A' },
      { name: 'English', marks: 80, max: 100, grade: 'A' },
    ],
    total: 342,
    percentage: 85.5,
    overallGrade: 'A',
    rank: 12,
  },
  {
    college: 'PCTE College',
    course: 'B.Tech CSE',
    roll_no: '1002',
    name: 'Priya Sharma',
    mobile_no: '9876543211',
    subjects: [
      { name: 'Physics', marks: 92, max: 100, grade: 'A+' },
      { name: 'Mathematics', marks: 95, max: 100, grade: 'A+' },
      { name: 'Computer Science', marks: 88, max: 100, grade: 'A' },
      { name: 'English', marks: 85, max: 100, grade: 'A' },
    ],
    total: 360,
    percentage: 90,
    overallGrade: 'A+',
    rank: 5,
  },
  {
    college: 'DAV College',
    course: 'B.Tech CSE',
    roll_no: '2001',
    name: 'Rahul Kumar',
    mobile_no: '9876543212',
    subjects: [
      { name: 'Physics', marks: 78, max: 100, grade: 'B+' },
      { name: 'Mathematics', marks: 82, max: 100, grade: 'A' },
      { name: 'Computer Science', marks: 80, max: 100, grade: 'A' },
      { name: 'English', marks: 75, max: 100, grade: 'B+' },
    ],
    total: 315,
    percentage: 78.75,
    overallGrade: 'B+',
    rank: 28,
  },
];

export interface UploadBatch {
  id: string;
  college: string;
  course: string;
  rowCount: number;
  timestamp: Date;
  published: boolean;
}

export const uploadedBatches: UploadBatch[] = [
  {
    id: 'batch-001',
    college: 'PCTE College',
    course: 'B.Tech CSE',
    rowCount: 45,
    timestamp: new Date('2024-01-15'),
    published: true,
  },
  {
    id: 'batch-002',
    college: 'DAV College',
    course: 'B.Com',
    rowCount: 32,
    timestamp: new Date('2024-01-14'),
    published: false,
  },
];
