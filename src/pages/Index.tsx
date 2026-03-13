import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Users } from 'lucide-react';

const Index = () => {
  const stats = [
    { icon: Users, label: 'Students', value: '10,000+' },
    { icon: Award, label: 'Results Published', value: '250+' },
    { icon: TrendingUp, label: 'Success Rate', value: '96%' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Welcome to Resultify
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your one-stop platform for accessing academic results quickly and securely
          </p>
        </motion.div>

        {/* Search Form */}
        <div className="mb-16">
          <SearchForm />
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="glass rounded-xl p-6 text-center glass-hover"
            >
              <div className="inline-block p-3 rounded-full bg-primary/10 mb-3">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Recent Announcements</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4 py-2">
                <p className="font-semibold">B.Tech CSE Semester 5 Results Published</p>
                <p className="text-sm text-muted-foreground">Posted 2 days ago</p>
              </div>
              <div className="border-l-4 border-accent pl-4 py-2">
                <p className="font-semibold">MBA Final Year Results Available</p>
                <p className="text-sm text-muted-foreground">Posted 5 days ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4 py-2">
                <p className="font-semibold">BCA Semester 3 Results Under Review</p>
                <p className="text-sm text-muted-foreground">Posted 1 week ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="mt-20 py-8 border-t border-border/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Resultify. All rights reserved.</p>
          <p className="mt-2">Powered by modern web technologies</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
