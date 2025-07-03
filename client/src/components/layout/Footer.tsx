import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about"><a className="text-gray-300 hover:text-white text-sm">About Us</a></Link></li>
              <li><Link href="/careers"><a className="text-gray-300 hover:text-white text-sm">Careers</a></Link></li>
              <li><Link href="/blog"><a className="text-gray-300 hover:text-white text-sm">Blog</a></Link></li>
              <li><Link href="/partner"><a className="text-gray-300 hover:text-white text-sm">Partner with Us</a></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">Our Services</h3>
            <ul className="space-y-2">
              <li><Link href="/medicines"><a className="text-gray-300 hover:text-white text-sm">Order Medicines</a></Link></li>
              <li><Link href="/healthcare"><a className="text-gray-300 hover:text-white text-sm">Healthcare Products</a></Link></li>
              <li><Link href="/lab-tests"><a className="text-gray-300 hover:text-white text-sm">Lab Tests</a></Link></li>
              <li><Link href="/doctor-consultation"><a className="text-gray-300 hover:text-white text-sm">Doctor Consultation</a></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faqs"><a className="text-gray-300 hover:text-white text-sm">FAQs</a></Link></li>
              <li><Link href="/contact"><a className="text-gray-300 hover:text-white text-sm">Contact Us</a></Link></li>
              <li><Link href="/return-policy"><a className="text-gray-300 hover:text-white text-sm">Return Policy</a></Link></li>
              <li><Link href="/shipping-policy"><a className="text-gray-300 hover:text-white text-sm">Shipping Policy</a></Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 font-heading">Download App</h3>
            <p className="text-gray-300 text-sm mb-2">Get access to exclusive offers on our mobile app</p>
            <div className="flex space-x-3">
              <a href="#" title="Visit our YouTube channel">
                <img src="assets/youtube.png" alt="YouTube" className="mt-0.5 h-11 w-12"/>
              </a>
              <a href="#" title="Visit our Instagram profile">
                <img src="assets/instagram.png" alt="Instagram" className="h-12 w-12"/>
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <svg className="w-8 h-8 text-primary-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M19 6h-4V2H9v4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-8 2h2v2h-2V8zm0 4h2v6h-2v-6zM9 4h6v2H9V4z"/>
                </svg>
                <span className="ml-2 font-bold text-xl font-heading">MediQuick</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">© {new Date().getFullYear()} MediQuick. All rights reserved.</p>
            </div>
            <div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 12c0 1.93-1.57 3.5-3.5 3.5S9.5 13.93 9.5 12 11.07 8.5 13 8.5s3.5 1.57 3.5 3.5zm2.5 0c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6zm-14 0c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8-8 3.58-8 8z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
