import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ResultCard from '@/components/ResultCard';
import EmptyState from '@/components/EmptyState';
import { searchResult, getColleges, getCoursesByCollege } from '@/api/mockApi';
import { Student } from '@/api/mockData';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

const Result = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [colleges, setColleges] = useState<string[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [loadingColleges, setLoadingColleges] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(false);

  const college = searchParams.get('college') || '';
  const course = searchParams.get('course') || '';
  const roll = searchParams.get('roll') || '';

  useEffect(() => {
    loadColleges();
  }, []);

  useEffect(() => {
    if (college) {
      loadCourses(college);
    } else {
      setCourses([]);
    }
  }, [college]);

  useEffect(() => {
    if (college && course && roll) {
      loadResult();
    }
  }, [college, course, roll]);

  const loadColleges = async () => {
    try {
      setLoadingColleges(true);
      console.log('Fetching colleges...');
      
      // Direct API call to check the response
      const response = await fetch(`${import.meta.env.VITE_API_URL}/colleges`);
      const text = await response.text(); // Get raw response
      console.log('Raw response:', text);
      
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        throw new Error('Invalid server response format');
      }
      
      console.log('Parsed colleges data:', data);
      
      if (!Array.isArray(data)) {
        throw new Error('Server did not return an array of colleges');
      }
      
      if (data.length === 0) {
        console.log('No colleges found in database');
        toast.warning('No colleges found. Please upload some results first.');
      } else {
        console.log(`Found ${data.length} colleges`);
      }
      
      setColleges(data);
    } catch (err) {
      console.error('Error loading colleges:', err);
      if (err instanceof Error) {
        toast.error(`Failed to load colleges: ${err.message}`);
      } else {
        toast.error('Failed to load colleges');
      }
    } finally {
      setLoadingColleges(false);
    }
  };

  const loadCourses = async (selectedCollege: string) => {
    try {
      setLoadingCourses(true);
      const data = await getCoursesByCollege(selectedCollege);
      setCourses(data);
    } catch (err) {
      console.error('Error loading courses:', err);
      toast.error('Failed to load courses');
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleCollegeChange = (value: string) => {
    setSearchParams({ college: value });
  };

  const handleCourseChange = (value: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('course', value);
      return newParams;
    });
  };

  const handleRollChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('roll', e.target.value);
      return newParams;
    });
  };

  const loadResult = async () => {
    if (!college || !course || !roll) {
      setError(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      const result = await searchResult(college, course, roll);
      if (result) {
        setStudent(result);
        toast.success('Result loaded successfully!');
      } else {
        setError(true);
        toast.error('No result found');
      }
    } catch (err) {
      setError(true);
      toast.error('Failed to load result');
      console.error('Error loading result:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <Card className="glass p-6 mb-8">
          <form onSubmit={(e) => {
            e.preventDefault();
            if (college && course && roll) {
              loadResult();
            }
          }} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">College</label>
              <select
                value={college}
                onChange={(e) => handleCollegeChange(e.target.value)}
                className="w-full px-3 py-2 rounded-md border glass focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loadingColleges}
              >
                <option value="">Select College</option>
                {loadingColleges ? (
                  <option value="" disabled>Loading...</option>
                ) : colleges.length > 0 ? (
                  colleges.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))
                ) : (
                  <option value="" disabled>No colleges found</option>
                )}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Course</label>
              <select
                value={course}
                onChange={(e) => handleCourseChange(e.target.value)}
                className="w-full px-3 py-2 rounded-md border glass focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={!college || loadingCourses}
              >
                <option value="">Select Course</option>
                {loadingCourses ? (
                  <option value="" disabled>Loading...</option>
                ) : courses.length > 0 ? (
                  courses.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))
                ) : (
                  <option value="" disabled>No courses found</option>
                )}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Roll Number</label>
              <input
                type="text"
                value={roll}
                onChange={handleRollChange}
                placeholder="Enter Roll Number"
                className="w-full px-3 py-2 rounded-md border glass focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={!college || !course}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={!college || !course || !roll || loading}
            className="w-full bg-gradient-to-r from-primary to-accent text-white py-2 px-4 rounded-md hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'View Result'}
          </button>
          </form>
        </Card>

        {loading ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="glass rounded-2xl p-6">
              <Skeleton className="h-8 w-64 mb-4" />
              <Skeleton className="h-4 w-48 mb-2" />
              <Skeleton className="h-4 w-56" />
            </div>
            <div className="glass rounded-2xl p-6">
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        ) : error || !student ? (
          <EmptyState />
        ) : (
          <div className="max-w-5xl mx-auto">
            <ResultCard student={student} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Result;
