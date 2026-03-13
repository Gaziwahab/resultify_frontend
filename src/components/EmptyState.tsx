import { FileQuestion, ArrowLeft, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass rounded-2xl p-12 text-center max-w-2xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="inline-block p-6 rounded-full bg-primary/10 mb-6"
      >
        <FileQuestion className="h-16 w-16 text-primary" />
      </motion.div>
      
      <h2 className="text-3xl font-bold mb-3">No Result Found</h2>
      <p className="text-muted-foreground mb-8 text-lg">
        We couldn't find a result matching your search criteria.
        <br />
        Please double-check your college, course, and roll number.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="bg-gradient-to-r from-primary to-accent">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Try Another Search
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="glass glass-hover">
          <Mail className="mr-2 h-4 w-4" />
          Contact Admin
        </Button>
      </div>

      <div className="mt-8 pt-8 border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          <strong>Common Issues:</strong>
          <br />
          • Verify your roll number is correct
          <br />
          • Ensure you selected the right college and course
          <br />
          • Results may not be published yet
        </p>
      </div>
    </motion.div>
  );
};

export default EmptyState;
