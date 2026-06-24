// Ordered learning items for each non-DSA track. The roadmap generator spreads
// these across the relevant phase of the 90 days so that deeper topics get more
// than one day of attention.

// ---------------- CORE CS ----------------
// Roughly: Month 1 -> OOP + DBMS, Month 2 -> OS + Networks, Month 3 -> System Design + revision
export const CORE_CS = [
  // OOPs
  { topic: 'OOP: Classes & Objects', track: 'OOPs' },
  { topic: 'OOP: Encapsulation', track: 'OOPs' },
  { topic: 'OOP: Inheritance', track: 'OOPs' },
  { topic: 'OOP: Polymorphism (compile-time & runtime)', track: 'OOPs' },
  { topic: 'OOP: Abstraction & Interfaces', track: 'OOPs' },
  { topic: 'OOP: SOLID Principles', track: 'OOPs' },
  // DBMS
  { topic: 'DBMS: SQL Basics (SELECT, WHERE, GROUP BY)', track: 'DBMS' },
  { topic: 'DBMS: Joins (INNER, LEFT, RIGHT, FULL)', track: 'DBMS' },
  { topic: 'DBMS: Normalization (1NF, 2NF, 3NF, BCNF)', track: 'DBMS' },
  { topic: 'DBMS: Transactions & ACID Properties', track: 'DBMS' },
  { topic: 'DBMS: Indexing & Query Optimization', track: 'DBMS' },
  { topic: 'DBMS: Keys & ER Modeling', track: 'DBMS' },
  // Operating Systems
  { topic: 'OS: Processes vs Threads', track: 'Operating Systems' },
  { topic: 'OS: CPU Scheduling Algorithms', track: 'Operating Systems' },
  { topic: 'OS: Deadlocks (conditions & handling)', track: 'Operating Systems' },
  { topic: 'OS: Paging & Segmentation', track: 'Operating Systems' },
  { topic: 'OS: Memory Management & Virtual Memory', track: 'Operating Systems' },
  { topic: 'OS: Synchronization (Mutex, Semaphores)', track: 'Operating Systems' },
  // Computer Networks
  { topic: 'CN: OSI Model (7 layers)', track: 'Computer Networks' },
  { topic: 'CN: TCP/IP Model', track: 'Computer Networks' },
  { topic: 'CN: TCP vs UDP', track: 'Computer Networks' },
  { topic: 'CN: DNS & how a URL resolves', track: 'Computer Networks' },
  { topic: 'CN: HTTP / HTTPS & status codes', track: 'Computer Networks' },
  { topic: 'CN: IP Addressing & Subnetting', track: 'Computer Networks' },
  // System Design Basics
  { topic: 'SD: Load Balancers', track: 'System Design' },
  { topic: 'SD: Caching (Redis, CDN, cache strategies)', track: 'System Design' },
  { topic: 'SD: Database Scaling (sharding, replication)', track: 'System Design' },
  { topic: 'SD: CAP Theorem', track: 'System Design' },
  { topic: 'SD: Design a URL Shortener (case study)', track: 'System Design' },
  { topic: 'SD: Design a Rate Limiter (case study)', track: 'System Design' },
]

// ---------------- APTITUDE ----------------
export const APTITUDE = [
  // Quantitative
  { topic: 'Quant: Percentages', track: 'Quantitative' },
  { topic: 'Quant: Profit and Loss', track: 'Quantitative' },
  { topic: 'Quant: Ratio and Proportion', track: 'Quantitative' },
  { topic: 'Quant: Averages', track: 'Quantitative' },
  { topic: 'Quant: Time and Work', track: 'Quantitative' },
  { topic: 'Quant: Time, Speed and Distance', track: 'Quantitative' },
  { topic: 'Quant: Number System', track: 'Quantitative' },
  { topic: 'Quant: Permutation and Combination', track: 'Quantitative' },
  { topic: 'Quant: Probability', track: 'Quantitative' },
  { topic: 'Quant: Geometry & Mensuration', track: 'Quantitative' },
  { topic: 'Quant: Simple & Compound Interest', track: 'Quantitative' },
  // Logical Reasoning
  { topic: 'Logical: Puzzles', track: 'Logical Reasoning' },
  { topic: 'Logical: Seating Arrangement', track: 'Logical Reasoning' },
  { topic: 'Logical: Blood Relations', track: 'Logical Reasoning' },
  { topic: 'Logical: Coding-Decoding', track: 'Logical Reasoning' },
  { topic: 'Logical: Direction Sense', track: 'Logical Reasoning' },
  { topic: 'Logical: Syllogisms', track: 'Logical Reasoning' },
  { topic: 'Logical: Series (number & letter)', track: 'Logical Reasoning' },
  // Verbal
  { topic: 'Verbal: Reading Comprehension', track: 'Verbal' },
  { topic: 'Verbal: Vocabulary (synonyms/antonyms)', track: 'Verbal' },
  { topic: 'Verbal: Grammar & Error Spotting', track: 'Verbal' },
  { topic: 'Verbal: Sentence Correction', track: 'Verbal' },
]

// ---------------- DEVELOPMENT ----------------
// Front-loaded into Months 1-2; project work continues into Month 3.
export const DEVELOPMENT = [
  { topic: 'Git: init, add, commit, branch, merge', track: 'Git' },
  { topic: 'GitHub: push, pull, PRs, README', track: 'GitHub' },
  { topic: 'HTML: structure, forms, semantic tags', track: 'HTML' },
  { topic: 'CSS: box model, flexbox, grid', track: 'CSS' },
  { topic: 'CSS: responsive design & media queries', track: 'CSS' },
  { topic: 'JavaScript: variables, functions, scope', track: 'JavaScript' },
  { topic: 'JavaScript: arrays, objects, ES6+', track: 'JavaScript' },
  { topic: 'JavaScript: async, promises, fetch', track: 'JavaScript' },
  { topic: 'JavaScript: DOM manipulation', track: 'JavaScript' },
  { topic: 'React: components & JSX', track: 'React' },
  { topic: 'React: props & state', track: 'React' },
  { topic: 'React: hooks (useState, useEffect)', track: 'React' },
  { topic: 'React: build a small project', track: 'React' },
  { topic: 'REST APIs: methods, status codes, design', track: 'REST APIs' },
  { topic: 'Node.js: basics & npm', track: 'Node.js' },
  { topic: 'Node.js: Express server & routes', track: 'Node.js' },
  { topic: 'MongoDB: CRUD basics', track: 'MongoDB' },
  { topic: 'SQL: practical queries for backend', track: 'SQL' },
  { topic: 'Full-stack: connect frontend + backend', track: 'Full Stack' },
  { topic: 'Deploy a project (Vercel/Render)', track: 'Deployment' },
]

// ---------------- MACHINE LEARNING ----------------
// Maps the SuperDataScience "Machine Learning A-Z: build, train & deploy ML, DL
// & AI models in AWS, Python and R" (Udemy) course, in its natural order, so it
// fits alongside the rest of the 90-day plan.
export const MACHINE_LEARNING = [
  { topic: 'Setup: Anaconda/Python, R, Google Colab & course code templates', track: 'Setup' },
  { topic: 'Python refresh for ML: NumPy, Pandas, Matplotlib', track: 'Setup' },
  // Data Preprocessing
  { topic: 'Data Preprocessing: import data & handle missing values', track: 'Data Preprocessing' },
  { topic: 'Data Preprocessing: encode categorical data', track: 'Data Preprocessing' },
  { topic: 'Data Preprocessing: train/test split & feature scaling', track: 'Data Preprocessing' },
  // Regression
  { topic: 'Regression: Simple Linear Regression', track: 'Regression' },
  { topic: 'Regression: Multiple Linear Regression', track: 'Regression' },
  { topic: 'Regression: Polynomial Regression', track: 'Regression' },
  { topic: 'Regression: Support Vector Regression (SVR)', track: 'Regression' },
  { topic: 'Regression: Decision Tree Regression', track: 'Regression' },
  { topic: 'Regression: Random Forest Regression', track: 'Regression' },
  { topic: 'Regression: evaluating models & R-squared', track: 'Regression' },
  // Classification
  { topic: 'Classification: Logistic Regression', track: 'Classification' },
  { topic: 'Classification: K-Nearest Neighbors (K-NN)', track: 'Classification' },
  { topic: 'Classification: Support Vector Machine (SVM)', track: 'Classification' },
  { topic: 'Classification: Kernel SVM', track: 'Classification' },
  { topic: 'Classification: Naive Bayes', track: 'Classification' },
  { topic: 'Classification: Decision Tree Classification', track: 'Classification' },
  { topic: 'Classification: Random Forest Classification', track: 'Classification' },
  { topic: 'Classification: confusion matrix, accuracy & CAP curve', track: 'Classification' },
  // Clustering
  { topic: 'Clustering: K-Means Clustering', track: 'Clustering' },
  { topic: 'Clustering: Hierarchical Clustering', track: 'Clustering' },
  // Association Rule Learning
  { topic: 'Association Rule Learning: Apriori', track: 'Association Rules' },
  { topic: 'Association Rule Learning: Eclat', track: 'Association Rules' },
  // Reinforcement Learning
  { topic: 'Reinforcement Learning: Upper Confidence Bound (UCB)', track: 'Reinforcement Learning' },
  { topic: 'Reinforcement Learning: Thompson Sampling', track: 'Reinforcement Learning' },
  // NLP
  { topic: 'NLP: text cleaning & Bag-of-Words model', track: 'NLP' },
  { topic: 'NLP: build a sentiment-analysis classifier', track: 'NLP' },
  // Deep Learning
  { topic: 'Deep Learning: Artificial Neural Networks (ANN) theory', track: 'Deep Learning' },
  { topic: 'Deep Learning: build an ANN (churn prediction)', track: 'Deep Learning' },
  { topic: 'Deep Learning: Convolutional Neural Networks (CNN) theory', track: 'Deep Learning' },
  { topic: 'Deep Learning: build a CNN (image classification)', track: 'Deep Learning' },
  // Dimensionality Reduction
  { topic: 'Dimensionality Reduction: PCA', track: 'Dimensionality Reduction' },
  { topic: 'Dimensionality Reduction: LDA', track: 'Dimensionality Reduction' },
  { topic: 'Dimensionality Reduction: Kernel PCA', track: 'Dimensionality Reduction' },
  // Model Selection & Boosting
  { topic: 'Model Selection: k-Fold Cross Validation', track: 'Model Selection & Boosting' },
  { topic: 'Model Selection: Grid Search & hyperparameter tuning', track: 'Model Selection & Boosting' },
  { topic: 'Boosting: XGBoost', track: 'Model Selection & Boosting' },
  // AWS Deployment
  { topic: 'AWS: intro to SageMaker & the cloud ML workflow', track: 'AWS Deployment' },
  { topic: 'AWS: train a model on SageMaker', track: 'AWS Deployment' },
  { topic: 'AWS: deploy a model as an endpoint / API', track: 'AWS Deployment' },
  // Capstone
  { topic: 'ML Capstone: end-to-end project (data → model → deploy)', track: 'Capstone' },
  { topic: 'ML Capstone: write README, push to GitHub & add to resume', track: 'Capstone' },
]

// ---------------- PLACEMENT / RESUME (Month 2-3 heavy) ----------------
export const PLACEMENT = [
  { topic: 'Resume: build 1-page ATS-friendly resume', track: 'Resume' },
  { topic: 'Resume: quantify projects & impact', track: 'Resume' },
  { topic: 'LinkedIn: optimize headline & about', track: 'LinkedIn' },
  { topic: 'LinkedIn: add projects & connect with recruiters', track: 'LinkedIn' },
  { topic: 'GitHub: pin top repos & polish READMEs', track: 'GitHub Profile' },
  { topic: 'HR: "Tell me about yourself" pitch', track: 'HR Round' },
  { topic: 'HR: strengths, weaknesses, why us', track: 'HR Round' },
  { topic: 'Behavioral: STAR method stories', track: 'Behavioral' },
  { topic: 'Behavioral: conflict & teamwork stories', track: 'Behavioral' },
  { topic: 'Mock Interview: DSA round (peer/Pramp)', track: 'Mock Interview' },
  { topic: 'Mock Interview: Core CS round', track: 'Mock Interview' },
  { topic: 'Mock Interview: full loop simulation', track: 'Mock Interview' },
  { topic: 'Apply: 5 internship applications', track: 'Applications' },
  { topic: 'Apply: 5 placement / full-time applications', track: 'Applications' },
  { topic: 'Apply: follow up & track in a sheet', track: 'Applications' },
  { topic: 'Project: write project explanation notes', track: 'Projects' },
]
