-- Insert sample projects
INSERT INTO projects (title, description, tech_stack, github_url, live_url, status, featured) VALUES
('E-Commerce Dashboard', 'Modern admin dashboard for e-commerce management with real-time analytics and inventory tracking.', ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB'], 'https://github.com/vanshshah/ecommerce-dashboard', 'https://ecommerce-dashboard-demo.vercel.app', 'completed', true),
('AI Chat Interface', 'Intelligent chat application with natural language processing and real-time messaging capabilities.', ARRAY['React', 'Node.js', 'Socket.io', 'OpenAI API', 'PostgreSQL'], 'https://github.com/vanshshah/ai-chat', 'https://ai-chat-demo.vercel.app', 'completed', true),
('Task Management System', 'Collaborative project management tool with team coordination and progress tracking features.', ARRAY['Vue.js', 'Express.js', 'MongoDB', 'JWT', 'Socket.io'], 'https://github.com/vanshshah/task-manager', 'https://task-manager-demo.vercel.app', 'completed', false),
('Weather Analytics App', 'Real-time weather monitoring with data visualization and predictive analytics dashboard.', ARRAY['React', 'D3.js', 'Node.js', 'Weather API', 'Chart.js'], 'https://github.com/vanshshah/weather-analytics', 'https://weather-analytics-demo.vercel.app', 'completed', false),
('Portfolio CMS', 'Content management system for dynamic portfolio websites with admin panel and SEO optimization.', ARRAY['Next.js', 'Supabase', 'TypeScript', 'Tailwind CSS', 'Vercel'], 'https://github.com/vanshshah/portfolio-cms', 'https://portfolio-cms-demo.vercel.app', 'in-progress', true);

-- Insert sample skills
INSERT INTO skills (name, category, proficiency, icon) VALUES
('HTML5', 'frontend', 95, 'html5'),
('CSS3', 'frontend', 90, 'css3'),
('JavaScript', 'frontend', 92, 'javascript'),
('TypeScript', 'frontend', 88, 'typescript'),
('React', 'frontend', 90, 'react'),
('Next.js', 'frontend', 85, 'nextjs'),
('Vue.js', 'frontend', 75, 'vuejs'),
('Tailwind CSS', 'frontend', 88, 'tailwindcss'),
('Node.js', 'backend', 85, 'nodejs'),
('Express.js', 'backend', 82, 'express'),
('MongoDB', 'backend', 80, 'mongodb'),
('PostgreSQL', 'backend', 78, 'postgresql'),
('Supabase', 'backend', 85, 'supabase'),
('Docker', 'devops', 75, 'docker'),
('Git', 'devops', 90, 'git'),
('Vercel', 'devops', 88, 'vercel'),
('AWS', 'devops', 70, 'aws');

-- Insert sample about info
INSERT INTO about_info (section, title, content, order_index) VALUES
('personal', 'Who I Am', 'I''m Vansh Shah, a Front-End Developer and an MCA student at Gujarat Technological University (GTU). I hold a Bachelor''s degree in Computer Applications (BCA, 2024) and enjoy creating clean, responsive, and user-friendly web interfaces, with a strong focus on delivering seamless digital experiences.', 1),
('personal', 'My Approach', 'I''m a continuous learner, always exploring new technologies, improving problem-solving skills, and experimenting with real-world projects. Beyond coding, I''m curious about history, politics, and global affairs, which adds a broader perspective to my approach as a developer.', 2),
('education', 'Master of Computer Applications', 'Currently pursuing MCA at Gujarat Technological University (GTU), focusing on advanced software development, system design, and emerging technologies.', 1),
('education', 'Bachelor of Computer Applications', 'Completed BCA in 2024 with strong foundation in programming, database management, and software engineering principles.', 2),
('experience', 'Frontend Development', 'Specialized in creating responsive, user-friendly web interfaces using modern frameworks like React and Next.js, with emphasis on performance optimization and accessibility.', 1),
('experience', 'Full-Stack Projects', 'Developed end-to-end web applications integrating frontend interfaces with robust backend systems, databases, and third-party APIs.', 2);
