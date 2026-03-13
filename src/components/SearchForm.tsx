import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GraduationCap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getColleges, getCoursesByCollege } from '@/api/mockApi';
import { College, Course } from '@/api/mockData';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const SearchForm = () => {
  const navigate = useNavigate();
  const [colleges, setColleges] = useState<College[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedCollege, setSelectedCollege] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [rollNumber, setRollNumber] = useState('');

  useEffect(() => {
    loadColleges();
  }, []);

  useEffect(() => {
    if (selectedCollege) {
      loadCourses(selectedCollege);
    }
  }, [selectedCollege]);

  const loadColleges = async () => {
    console.log('Starting loadColleges...');
    try {
      setLoading(true);
      setSelectedCollege('');
      setSelectedCourse('');
      setCourses([]);
      
      console.log('Current state cleared');
      console.log('API URL:', import.meta.env.VITE_API_URL);
      
      const collegeNames = await getColleges();
      console.log('API returned collegeNames:', collegeNames);
      
      if (!Array.isArray(collegeNames)) {
        console.error('Invalid response format:', collegeNames);
        toast.error('Failed to load colleges: Invalid response format');
        return;
      }
      
      // Map the college names to objects with id and name
      const collegeData = collegeNames.map(name => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name: name
      }));
      console.log('Mapped collegeData:', collegeData);
      
      if (collegeData.length === 0) {
        console.log('No colleges found');
        toast.warning('No colleges found. Please upload some results first.');
      } else {
        console.log(`Found ${collegeData.length} college(s):`, collegeData);
        toast.success(`Found ${collegeData.length} college(s)`);
      }
      
      console.log('Setting colleges state to:', collegeData);
      setColleges(collegeData);
    } catch (error) {
      console.error('Failed to load colleges:', error);
      toast.error('Failed to load colleges');
      setColleges([]);
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async (collegeName: string) => {
    try {
      const data = await getCoursesByCollege(collegeName);
      console.log('Received courses:', data);
      
      if (!Array.isArray(data)) {
        console.error('Invalid course response format:', data);
        toast.error('Failed to load courses: Invalid response format');
        return;
      }
      
      // Map the data to match the expected format
      const courseData = data.map(name => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name
      }));
      console.log('Mapped course data:', courseData);
      
      if (courseData.length === 0) {
        toast.warning('No courses found for this college');
      } else {
        console.log(`Found ${courseData.length} courses`);
      }
      
      setCourses(courseData);
      setSelectedCourse('');
    } catch (error) {
      console.error('Failed to load courses:', error);
      toast.error('Failed to load courses');
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCollege || !selectedCourse || !rollNumber.trim()) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    
    // The selected values are already the actual names
    const college = selectedCollege;
    const course = selectedCourse;
    
    navigate(`/result?college=${encodeURIComponent(college)}&course=${encodeURIComponent(course)}&roll=${encodeURIComponent(rollNumber)}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-8 max-w-2xl mx-auto glass-hover"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">Search Your Result</h2>
        <p className="text-muted-foreground">Enter your details to view your results</p>
      </div>

      <form onSubmit={handleSearch} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="college" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            College
          </Label>
          <div className="relative">
            <select
              id="college"
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 glass"
            >
              <option value="">Select your college</option>
              {colleges.map(college => (
                <option key={college.id} value={college.name}>
                  {college.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="course" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            Course
          </Label>
          <div className="relative">
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              disabled={!selectedCollege}
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 glass"
            >
              <option value="">Select your course</option>
              {courses.map(course => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="roll" className="flex items-center gap-2">
            <Search className="h-4 w-4 text-primary" />
            Roll Number
          </Label>
          <Input
            id="roll"
            type="text"
            placeholder="Enter your roll number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="glass"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          {loading ? 'Searching...' : 'View Result'}
        </Button>
      </form>
    </motion.div>
  );
};

export default SearchForm;
