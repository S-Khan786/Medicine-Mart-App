import React, { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { Helmet } from 'react-helmet';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

// This interface would ideally be imported from a central place
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

// Sample blog posts data (would typically come from an API)
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

// Format date to readable format
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogPostPage: React.FC = () => {
  const [, params] = useRoute('/blog/:id');
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (params && params.id) {
      // Find the post with the matching ID
      const foundPost = blogPosts.find(p => p.id === params.id);
      
      if (foundPost) {
        setPost(foundPost);
        
        // Find related posts (same category but different ID)
        const related = blogPosts
          .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
          .slice(0, 3);
        
        setRelatedPosts(related);
      }
    }
  }, [params]);

  // If post is not found, show 404 message
  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link href="/health-blog">
              <a className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition duration-300">
                Return to Blog
              </a>
            </Link>
          </div>
        </main>
        <Footer />
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | MediQuick Health Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | MediQuick Health Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow bg-gray-50">
          <article className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto mb-8">
              <Link href="/health-blog">
                <a className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Blog
                </a>
              </Link>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>
              
              <div className="flex items-center mb-8">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
                    {post.author.split(' ')[0][0] + post.author.split(' ')[1][0]}
                  </div>
                </div>
                <div className="mr-6">
                  <span className="text-sm font-medium text-gray-900 block">{post.author}</span>
                  <span className="text-sm text-gray-500">{formatDate(post.publishDate)}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{post.readTime} min read</span>
                </div>
              </div>
              
              <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80";
                  }}
                />
              </div>
            </div>
            
            {/* Content Section */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 mb-10">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {/* Tags */}
                <div className="mt-10 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Author Bio */}
              <div className="bg-primary-50 rounded-xl p-6 mb-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-xl font-semibold">
                      {post.author.split(' ')[0][0] + post.author.split(' ')[1][0]}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">About {post.author}</h3>
                    <p className="text-gray-600 mb-3">
                      {post.author} is a healthcare professional specializing in {post.category.toLowerCase()}. 
                      With years of experience in the field, they are dedicated to providing accurate 
                      and helpful health information to improve patient outcomes.
                    </p>
                    <div className="flex space-x-3">
                      <a href="#" className="text-primary-600 hover:text-primary-800 transition duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-primary-600 hover:text-primary-800 transition duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                      <a className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col h-full">
                        <div className="relative">
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80";
                            }}
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="flex items-center text-gray-500 text-xs mb-2">
                            <span>{formatDate(relatedPost.publishDate)}</span>
                            <span className="mx-2">•</span>
                            <span>{relatedPost.readTime} min read</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{relatedPost.title}</h3>
                          <p className="text-gray-600 text-sm">{relatedPost.excerpt.substring(0, 100)}...</p>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Newsletter Subscription */}
            <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-primary-100 to-primary-200 rounded-xl p-8 md:p-10">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Enjoyed this article?</h2>
                <p className="text-gray-700 mb-6">Subscribe to our newsletter for more health insights delivered to your inbox.</p>
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
          </article>
        </main>
        
        <Footer />
        <MobileBottomNav />
      </div>
    </>
  );
};

export default BlogPostPage;