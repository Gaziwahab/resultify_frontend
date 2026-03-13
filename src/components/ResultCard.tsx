import { Student } from '@/api/mockData';
import { Download, Printer, FileSpreadsheet, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface ResultCardProps {
  student: Student;
}

const ResultCard = ({ student }: ResultCardProps) => {
  const handleDownloadPDF = () => {
    toast.info('PDF download feature coming soon!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    toast.info('CSV export feature coming soon!');
  };

  const handleReportIssue = () => {
    toast.info('Issue reporting modal coming soon!');
  };

  const getGradeColor = (grade: string) => {
    if (grade === 'A+' || grade === 'A') return 'bg-green-500/20 text-green-700 dark:text-green-300';
    if (grade === 'B+' || grade === 'B') return 'bg-blue-500/20 text-blue-700 dark:text-blue-300';
    if (grade === 'C') return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300';
    return 'bg-red-500/20 text-red-700 dark:text-red-300';
  };

  return (
    <div className="space-y-6">
      {/* Student Info Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">{student.name}</h2>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>Roll Number: <span className="font-semibold text-foreground">{student.roll_no}</span></p>
              <p>Course: <span className="font-semibold text-foreground">{student.course}</span></p>
              <p>College: <span className="font-semibold text-foreground">{student.college}</span></p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`text-lg px-4 py-2 ${getGradeColor(student.overallGrade || 'A')}`}>
              Grade: {student.overallGrade}
            </Badge>
            {student.rank && (
              <Badge variant="outline" className="text-lg px-4 py-2">
                Rank: #{student.rank}
              </Badge>
            )}
          </div>
        </div>
      </motion.div>

      {/* Results Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <Card className="border-0 bg-transparent">
          <CardHeader className="border-b border-border/50">
            <CardTitle>Subject-wise Performance</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 bg-muted/30">
                    <th className="text-left p-4 font-semibold">Subject</th>
                    <th className="text-center p-4 font-semibold">Marks Obtained</th>
                    <th className="text-center p-4 font-semibold">Maximum Marks</th>
                    <th className="text-center p-4 font-semibold">Grade</th>
                    <th className="text-center p-4 font-semibold">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {student.subjects.map((subject, index) => {
                    const percentage = (subject.marks / subject.max) * 100;
                    return (
                      <motion.tr
                        key={subject.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                      >
                        <td className="p-4 font-medium">{subject.name}</td>
                        <td className="p-4 text-center font-semibold text-primary">{subject.marks}</td>
                        <td className="p-4 text-center text-muted-foreground">{subject.max}</td>
                        <td className="p-4 text-center">
                          <Badge className={getGradeColor(subject.grade || 'A')}>
                            {subject.grade}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                className="h-full bg-gradient-to-r from-primary to-accent"
                              />
                            </div>
                            <span className="text-sm font-medium min-w-[3rem] text-right">
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                  {/* Summary Row */}
                  <tr className="bg-primary/5 font-bold">
                    <td className="p-4">Total</td>
                    <td className="p-4 text-center text-primary text-lg">{student.total}</td>
                    <td className="p-4 text-center">{student.subjects.reduce((sum, s) => sum + s.max, 0)}</td>
                    <td className="p-4 text-center">
                      <Badge className={`${getGradeColor(student.overallGrade || 'A')} text-base px-3 py-1`}>
                        {student.overallGrade}
                      </Badge>
                    </td>
                    <td className="p-4 text-center text-lg">{student.percentage}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <Button onClick={handleDownloadPDF} className="glass-hover">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <Button onClick={handlePrint} variant="outline" className="glass glass-hover">
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
        <Button onClick={handleExportCSV} variant="outline" className="glass glass-hover">
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
        <Button onClick={handleReportIssue} variant="outline" className="glass glass-hover text-destructive">
          <AlertCircle className="mr-2 h-4 w-4" />
          Report Issue
        </Button>
      </motion.div>
    </div>
  );
};

export default ResultCard;
