import React, { useState } from 'react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

// Blog post data
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  image: string;
  readTime: number;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 'blog1',
    title: 'Understanding Antibiotics: Uses, Side Effects, and Resistance',
    excerpt: 'Antibiotics are powerful medicines that fight bacterial infections. Learn when they should be used and the potential risks of overuse.',
    content: `
      <p>Antibiotics are a type of medication used to treat bacterial infections. They work by either killing bacteria or preventing them from reproducing, allowing the body's natural defenses to eliminate the remaining bacteria.</p>
      
      <h3>When Should Antibiotics Be Used?</h3>
      <p>Antibiotics are only effective against bacterial infections, not viral infections like colds, flu, most sore throats, bronchitis, and many sinus and ear infections. Using antibiotics for viral infections not only won't make you feel better, but it can contribute to antibiotic resistance.</p>
      
      <h3>Common Side Effects</h3>
      <p>Antibiotics can cause side effects such as digestive issues, allergic reactions, and disruption of gut bacteria. It's important to complete your prescribed course of antibiotics even if you start feeling better.</p>
      
      <h3>The Growing Problem of Antibiotic Resistance</h3>
      <p>Antibiotic resistance occurs when bacteria develop the ability to defeat the drugs designed to kill them. This is one of the most urgent threats to public health today. Each year in the U.S., at least 2.8 million people get infected with antibiotic-resistant bacteria, and at least 35,000 people die as a result.</p>
      
      <h3>How to Use Antibiotics Responsibly</h3>
      <ul>
        <li>Only take antibiotics when prescribed by a healthcare professional</li>
        <li>Complete the full course of antibiotics, even if you feel better</li>
        <li>Never share or use leftover antibiotics</li>
        <li>Practice good hygiene to prevent bacterial infections</li>
      </ul>
    `,
    author: 'Dr. Anita Sharma',
    publishDate: '2023-05-15',
    category: 'Medication',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    readTime: 5,
    tags: ['antibiotics', 'medication', 'bacterial infections', 'health']
  },
  {
    id: 'blog2',
    title: 'The Importance of Vitamin D: Beyond Bone Health',
    excerpt: 'Vitamin D is essential for bone health, but recent research suggests it plays a crucial role in other aspects of health as well.',
    content: `
      <p>Vitamin D is often called the "sunshine vitamin" because it's produced in your skin in response to sunlight. It's a fat-soluble vitamin in a family of compounds that includes vitamins D-1, D-2, and D-3.</p>
      
      <h3>Why Vitamin D is Important</h3>
      <p>Vitamin D is essential for several reasons, including maintaining the health of bones and teeth, supporting immune, brain, and nervous system health, regulating insulin levels, and supporting lung function and cardiovascular health.</p>
      
      <h3>Vitamin D Deficiency</h3>
      <p>Vitamin D deficiency is incredibly common and most people are unaware of their deficient state. It's estimated that about 1 billion people worldwide have low levels of vitamin D in their blood.</p>
      
      <h3>Sources of Vitamin D</h3>
      <p>While the body can produce vitamin D when exposed to sunlight, many people don't get enough sun exposure to meet their vitamin D needs. Food sources include fatty fish like salmon, mackerel, and tuna, as well as fortified foods like milk, orange juice, and cereal.</p>
      
      <h3>Recommended Daily Intake</h3>
      <p>The recommended daily intake of vitamin D is 600-800 IU (15-20 mcg) for adults, though some experts suggest that higher levels may be optimal for certain individuals. Always consult with a healthcare provider before starting any supplement regimen.</p>
    `,
    author: 'Dr. Rajesh Kumar',
    publishDate: '2023-06-02',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    readTime: 4,
    tags: ['vitamin D', 'nutrition', 'supplements', 'health']
  },
  {
    id: 'blog3',
    title: 'Managing Seasonal Allergies: Tips and Treatments',
    excerpt: 'Seasonal allergies affect millions of people. Learn effective strategies to manage symptoms and enjoy the outdoors again.',
    content: `
      <p>Seasonal allergies, also known as allergic rhinitis or hay fever, affect an estimated 20-30% of the population worldwide. These allergies occur when your immune system overreacts to outdoor allergens like pollen from trees, grasses, and weeds.</p>
      
      <h3>Common Symptoms</h3>
      <p>Symptoms of seasonal allergies include sneezing, runny or stuffy nose, watery and itchy eyes, itchy throat or ears, and postnasal drip. Some people may also experience decreased sense of taste or smell, ear congestion, headaches, and fatigue.</p>
      
      <h3>Managing Seasonal Allergies</h3>
      <p>There are several ways to manage seasonal allergies:</p>
      <ul>
        <li><strong>Avoid allergens:</strong> Check local pollen forecasts and stay indoors when pollen counts are high. Keep windows closed during allergy season.</li>
        <li><strong>Take medications:</strong> Over-the-counter antihistamines, decongestants, nasal corticosteroids, and eye drops can help relieve symptoms.</li>
        <li><strong>Try saline nasal irrigation:</strong> Rinsing your nasal passages with saline solution can help flush out allergens.</li>
        <li><strong>Consider immunotherapy:</strong> For severe allergies, allergen immunotherapy (allergy shots) may be recommended by a doctor.</li>
      </ul>
      
      <h3>When to See a Doctor</h3>
      <p>Consult a healthcare provider if your allergy symptoms are severe, if over-the-counter medications aren't providing relief, or if you have another condition that can be worsened by seasonal allergies, such as asthma.</p>
    `,
    author: 'Dr. Priya Singh',
    publishDate: '2023-08-20',
    category: 'Allergies',
    image: 'https://images.unsplash.com/photo-1568605119711-ebe142218e32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    readTime: 6,
    tags: ['allergies', 'seasonal allergies', 'hay fever', 'health']
  },
  {
    id: 'blog4',
    title: 'The Connection Between Sleep and Mental Health',
    excerpt: 'Sleep and mental health are closely connected. Understanding this relationship can help improve overall well-being.',
    content: `
      <p>Sleep and mental health are intrinsically linked. Poor sleep can contribute to the development of mental health issues, and mental health problems can worsen sleep quality, creating a challenging cycle.</p>
      
      <h3>How Sleep Affects Mental Health</h3>
      <p>During sleep, your brain processes emotional information. Inadequate sleep can impact your ability to regulate emotions and cope with stress. Research has shown that people with insomnia are ten times more likely to develop depression and anxiety disorders compared to those who sleep well.</p>
      
      <h3>Mental Health Conditions and Sleep</h3>
      <p>Many mental health conditions can affect sleep quality:</p>
      <ul>
        <li><strong>Depression:</strong> May cause both insomnia and hypersomnia (excessive sleep)</li>
        <li><strong>Anxiety:</strong> Often leads to difficulty falling asleep and restless sleep</li>
        <li><strong>Bipolar Disorder:</strong> Can cause insomnia during manic episodes and hypersomnia during depressive phases</li>
        <li><strong>ADHD:</strong> Associated with delayed sleep onset and sleep disturbances</li>
      </ul>
      
      <h3>Improving Sleep for Better Mental Health</h3>
      <p>Here are some strategies to improve sleep quality:</p>
      <ul>
        <li>Maintain a consistent sleep schedule</li>
        <li>Create a restful environment (dark, quiet, comfortable temperature)</li>
        <li>Limit screen time before bed</li>
        <li>Avoid caffeine, alcohol, and large meals close to bedtime</li>
        <li>Exercise regularly, but not too close to bedtime</li>
        <li>Practice relaxation techniques like deep breathing or meditation</li>
      </ul>
      
      <h3>When to Seek Help</h3>
      <p>If you're experiencing persistent sleep problems or mental health concerns, speak with a healthcare provider. Both sleep disorders and mental health conditions are treatable, and addressing one often helps improve the other.</p>
    `,
    author: 'Dr. Vikram Mehta',
    publishDate: '2023-09-10',
    category: 'Mental Health',
    image: 'https://images.unsplash.com/photo-1455203983296-905c49f90b61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    readTime: 7,
    tags: ['sleep', 'mental health', 'insomnia', 'well-being']
  },
  {
    id: 'blog5',
    title: 'Heart Health: Understanding Blood Pressure',
    excerpt: 'High blood pressure is often called the "silent killer" because it typically has no symptoms but can lead to serious health problems.',
    content: `
      <p>Blood pressure is the force of blood pushing against the walls of your arteries as your heart pumps blood. High blood pressure, or hypertension, is when this force is consistently too high, potentially damaging your heart and blood vessels.</p>
      
      <h3>Understanding Blood Pressure Readings</h3>
      <p>Blood pressure is measured using two numbers:</p>
      <ul>
        <li><strong>Systolic pressure:</strong> The first number, which measures the pressure in your arteries when your heart beats</li>
        <li><strong>Diastolic pressure:</strong> The second number, which measures the pressure in your arteries when your heart rests between beats</li>
      </ul>
      <p>A normal blood pressure reading is less than 120/80 mm Hg. Readings above this threshold may indicate elevated blood pressure or hypertension.</p>
      
      <h3>Risk Factors for High Blood Pressure</h3>
      <p>Several factors can increase your risk of developing high blood pressure:</p>
      <ul>
        <li>Age (risk increases as you get older)</li>
        <li>Family history of hypertension</li>
        <li>Being overweight or obese</li>
        <li>Physical inactivity</li>
        <li>Tobacco use</li>
        <li>High sodium (salt) intake</li>
        <li>Low potassium intake</li>
        <li>Excessive alcohol consumption</li>
        <li>Stress</li>
        <li>Certain chronic conditions like kidney disease and sleep apnea</li>
      </ul>
      
      <h3>Managing Blood Pressure</h3>
      <p>Lifestyle changes can help manage blood pressure:</p>
      <ul>
        <li>Eat a heart-healthy diet (low in sodium, rich in fruits, vegetables, and whole grains)</li>
        <li>Maintain a healthy weight</li>
        <li>Be physically active (aim for at least 150 minutes of moderate activity per week)</li>
        <li>Limit alcohol consumption</li>
        <li>Don't smoke</li>
        <li>Manage stress</li>
        <li>Take medications as prescribed by your doctor</li>
      </ul>
      
      <h3>The Importance of Regular Monitoring</h3>
      <p>Regular blood pressure checks are essential, even if you feel healthy. High blood pressure often has no symptoms but can lead to serious problems like heart attack, stroke, kidney damage, and vision loss if left untreated.</p>
    `,
    author: 'Dr. Sanjay Gupta',
    publishDate: '2023-10-05',
    category: 'Cardiovascular Health',
    image: 'https://images.unsplash.com/photo-1559131933-ff37315645d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    readTime: 6,
    tags: ['blood pressure', 'hypertension', 'heart health', 'cardiovascular']
  },
  {
    id: 'blog6',
    title: 'Diabetes Management: Living Well with Diabetes',
    excerpt: 'Learn effective strategies for managing diabetes and maintaining a high quality of life with this chronic condition.',
    content: `
      <p>Diabetes is a chronic health condition that affects how your body turns food into energy. When you have diabetes, your body either doesn't make enough insulin or can't use the insulin it makes as well as it should.</p>
      
      <h3>Types of Diabetes</h3>
      <p>There are three main types of diabetes:</p>
      <ul>
        <li><strong>Type 1 diabetes:</strong> An autoimmune reaction that stops your body from making insulin</li>
        <li><strong>Type 2 diabetes:</strong> Your body doesn't use insulin well and can't keep blood sugar at normal levels</li>
        <li><strong>Gestational diabetes:</strong> Develops in pregnant women who have never had diabetes</li>
      </ul>
      
      <h3>Managing Diabetes</h3>
      <p>Effective diabetes management involves:</p>
      <ul>
        <li><strong>Blood sugar monitoring:</strong> Regular checking of blood glucose levels</li>
        <li><strong>Healthy eating:</strong> Following a balanced diet rich in nutrients but controlled in carbohydrates</li>
        <li><strong>Regular physical activity:</strong> Exercise helps lower blood sugar and improves insulin sensitivity</li>
        <li><strong>Medication adherence:</strong> Taking insulin or other diabetes medications as prescribed</li>
        <li><strong>Stress management:</strong> Stress can affect blood sugar levels</li>
        <li><strong>Regular check-ups:</strong> To monitor for and prevent complications</li>
      </ul>
      
      <h3>Preventing Complications</h3>
      <p>Diabetes can lead to serious complications if not properly managed, including:</p>
      <ul>
        <li>Heart disease and stroke</li>
        <li>Kidney disease</li>
        <li>Eye problems and vision loss</li>
        <li>Nerve damage (neuropathy)</li>
        <li>Foot problems that can lead to amputation</li>
      </ul>
      <p>Regular medical check-ups, including eye exams, foot exams, and kidney function tests, are essential for early detection and treatment of complications.</p>
      
      <h3>The Emotional Aspect of Diabetes</h3>
      <p>Living with diabetes can be emotionally challenging. It's important to acknowledge these feelings and seek support when needed. Diabetes support groups, both in-person and online, can provide valuable emotional support and practical advice from others who understand what you're going through.</p>
    `,
    author: 'Dr. Neha Patel',
    publishDate: '2023-11-12',
    category: 'Diabetes',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600',
    readTime: 7,
    tags: ['diabetes', 'chronic condition', 'blood sugar', 'health management']
  }
];

// Categories for filtering
const categories = [
  'All',
  'Medication',
  'Nutrition',
  'Allergies',
  'Mental Health',
  'Cardiovascular Health',
  'Diabetes'
];

const HealthBlogPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter blog posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Helmet>
        <title>Health Blog | MediQuick</title>
        <meta name="description" content="Read the latest healthcare articles, tips, and advice from medical professionals on MediQuick's Health Blog." />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Health Blog</h1>
            <p className="text-lg text-gray-600 mb-8">Expert insights and advice for your well-being</p>
            
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-lg">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Categories */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Categories</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full transition duration-300 ${
                      selectedCategory === category 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-500'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Article */}
            {filteredPosts.length > 0 && (
              <div className="mb-12">
                <Link href={`/blog/${filteredPosts[0].id}`}>
                  <motion.div 
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="md:flex">
                      <div className="md:w-2/5 h-56 md:h-auto relative">
                        <img 
                          src={filteredPosts[0].image}
                          alt={filteredPosts[0].title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80";
                          }}
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {filteredPosts[0].category}
                          </span>
                        </div>
                      </div>
                      <div className="md:w-3/5 p-6 md:p-8">
                        <div className="flex items-center text-gray-500 text-sm mb-2">
                          <span>{formatDate(filteredPosts[0].publishDate)}</span>
                          <span className="mx-2">•</span>
                          <span>{filteredPosts[0].readTime} min read</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">{filteredPosts[0].title}</h2>
                        <p className="text-gray-600 mb-4">{filteredPosts[0].excerpt}</p>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 mr-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                              {filteredPosts[0].author.split(' ')[0][0] + filteredPosts[0].author.split(' ')[1][0]}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{filteredPosts[0].author}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </div>
            )}
            
            {/* Blog Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.slice(1).map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <motion.div 
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 h-full flex flex-col"
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80";
                          }}
                        />
                        <div className="absolute top-3 right-3">
                          <span className="bg-white text-primary-600 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex items-center text-gray-500 text-xs mb-2">
                          <span>{formatDate(post.publishDate)}</span>
                          <span className="mx-2">•</span>
                          <span>{post.readTime} min read</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 flex-grow">{post.excerpt}</p>
                        <div className="flex items-center mt-auto">
                          <div className="flex-shrink-0 mr-3">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xs font-semibold">
                              {post.author.split(' ')[0][0] + post.author.split(' ')[1][0]}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-900">{post.author}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium mb-2">No articles found</h3>
                <p className="text-gray-600">Try changing your search or filter criteria</p>
              </div>
            )}
            
            {/* Newsletter Subscription */}
            <div className="mt-16 bg-gradient-to-r from-primary-100 to-primary-200 rounded-xl p-8 md:p-10">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Stay Updated on Health Topics</h2>
                <p className="text-gray-700 mb-6">Subscribe to our newsletter for the latest health articles, tips, and updates delivered straight to your inbox.</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                  />
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-4">We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
        <MobileBottomNav />
      </div>
    </>
  );
};

export default HealthBlogPage;