'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ChevronDown,
  X,
  ChevronRight,
  User,
  Menu,
  Factory,
  Truck,
  Users,
  EllipsisVertical,
} from 'lucide-react';
import { CartIcon } from './CartIcon';
import { searchProducts, getProductBySlug, getAllProductSlugs } from '@/lib/productData';

export default function Navbar() {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<null | number>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Search state
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Mobile e-bikes accordion
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  // Dynamic categories from products
  const [categories, setCategories] = useState<any[]>([]);

  // Refs
  const desktopSearchRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch categories from products
  useEffect(() => {
    try {
      const slugs = getAllProductSlugs();
      const categoryMap = new Map();

      slugs.forEach((slug) => {
        const product = getProductBySlug(slug);
        if (product && product.category && Array.isArray(product.category)) {
          product.category.forEach((cat: string) => {
            if (!categoryMap.has(cat)) {
              categoryMap.set(cat, {
                name: formatCategoryName(cat),
                slug: cat,
                tagline: getCategoryTagline(cat),
                image: product.image || '/images/placeholder.png',
                description: '',
              });
            }
          });
        }
      });

      setCategories(Array.from(categoryMap.values()));
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  }, []);

  // Helper function to format category names
  const formatCategoryName = (category: string): string => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Helper function to get category taglines
  const getCategoryTagline = (category: string): string => {
    const taglines: { [key: string]: string } = {
      'Hybrid': 'Smart Compact Mobility',
      'Pendler': 'Urban Mobility Enjoyment',
      'Sammenleggbar': 'Fold Ride Conquer',
      'Fatbike': 'Stable Off-road All-Terrain',
      'Lastesykkel': 'More Power When Carrying Loads',
      'Terreng': 'Power Technique Outstand',
    };
    return taglines[category] || 'Explore our collection';
  };

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const id = setTimeout(() => {
      try {
        const found = searchProducts(query);
        setResults(found || []);
        setShowResults(true);
      } catch (err) {
        console.error('searchProducts error', err);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(id);
  }, [query]);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktop = desktopSearchRef.current?.contains(target);
      const insideMobile = mobileSearchRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowResults(false);
      setIsSearchOpen(false);
    } else if (e.key === 'Enter') {
      if (query.trim()) {
        router.push(`/search?query=${encodeURIComponent(query.trim())}`);
        setShowResults(false);
        setIsSearchOpen(false);
      }
    }
  };

  const navItems = [
    { name: 'El-sykler', href: '/', dropdown: true },
    { name: 'Tilbehør', href: '/accessorie' },
    { name: 'Kontakt', href: '/contact' },
  ];

  const moreMenuItems = [
    { name: 'Vilkår for tjeneste', href: '/terms' },
    { name: 'Kontakt oss', href: '/contact' },
  ];

  const toggleDropdown = (index: number) =>
    setActiveDropdown(activeDropdown === index ? null : index);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setMobileDropdownOpen(false);
    }
  };

  const toggleMobileDropdown = () => setMobileDropdownOpen((s) => !s);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        const searchInput = document.getElementById('desktop-search-input');
        searchInput?.focus();
      }, 100);
    }
  };

   const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white shadow-sm">
        {/* Top Bar - Teal Background */}
        <div className="bg-[#12b190] text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-10 text-xs md:text-sm">
              {/* Left side features */}
              <div className="flex items-center space-x-4 md:space-x-6">
                <div className="flex items-center space-x-1.5">
                  <Factory className="w-4 h-4" />
                  <span className="hidden sm:inline">Europeisk fabrikk</span>
                  <span className="sm:hidden">Fabrikk</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Truck className="w-4 h-4" />
                  <span className="hidden sm:inline">Gratis frakt til EU</span>
                  <span className="sm:hidden">Gratis frakt</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Users className="w-4 h-4" />
                  <span>300+ partnere i Europa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16 md:h-20">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <img src="/images/logo.jpg" alt="Logo" className="h-8 md:h-10 w-auto" />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8 text-base font-medium">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => item.dropdown && toggleDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {item.dropdown ? (
                      <button className="flex items-center space-x-1 text-gray-700 hover:text-[#12b190] transition-colors py-2 text-base">
                        <span>{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-gray-700 hover:text-[#12b190] transition-colors py-2 text-base"
                      >
                        {item.name}
                      </Link>
                    )}

                    {/* Dropdown for E-Bikes */}
                    {item.dropdown && activeDropdown === index && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-full bg-white shadow-2xl rounded-xl border border-gray-100 z-50 w-[95vw] max-w-[700px] max-h-[500px] overflow-hidden flex flex-col">
                        <div className="px-8 pt-8 pb-4 border-b border-gray-200 flex-shrink-0">
                          <h3 className="text-2xl font-bold text-gray-900">Bla gjennom kategorier</h3>
                          <p className="text-sm text-gray-600 mt-1">Utforsk vårt komplette el-sykkel utvalg</p>
                        </div>

                        <div className="overflow-y-auto flex-1 px-8 py-6 custom-scrollbar">
                          <div className="grid grid-cols-3 gap-6">
                            {categories.map((cat) => (
                              <Link
                                key={cat.slug}
                                href={`/category/${cat.slug}`}
                                className="group flex flex-col items-center text-center p-4 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {/* <div className="w-full h-32 mb-4 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden group-hover:bg-white transition-colors">
                                  <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                                  />
                                </div> */}
                                <div className="w-full">
                                  <div className="flex items-center justify-center gap-1 mb-2">
                                    <h4 className="text-base font-bold text-gray-900 group-hover:text-[#12b190] transition-colors">
                                      {cat.name}
                                    </h4>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#12b190] group-hover:translate-x-1 transition-all" />
                                  </div>
                                  <p className="text-xs text-gray-500 leading-relaxed">{cat.tagline}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="px-8 py-4 border-t border-gray-200 text-center flex-shrink-0">
                          <Link
                            href="/cycle"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#12b190] hover:text-[#0f9a7a] transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            Se alle el-sykler
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>

                        <style jsx>{`
                          .custom-scrollbar::-webkit-scrollbar {
                            width: 6px;
                          }
                          .custom-scrollbar::-webkit-scrollbar-track {
                            background: #f1f1f1;
                            border-radius: 10px;
                          }
                          .custom-scrollbar::-webkit-scrollbar-thumb {
                            background: #12b190;
                            border-radius: 10px;
                          }
                          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: #0f9a7a;
                          }
                          .custom-scrollbar {
                            scrollbar-width: thin;
                            scrollbar-color: #12b190 #f1f1f1;
                          }
                        `}</style>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right side icons */}
              <div className="flex items-center space-x-2">
                {/* Search Button */}
                <button 
                  onClick={toggleSearch}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-gray-700" />
                </button>
                
                {/* Cart Icon - Fixed with proper container */}
                <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors inline-flex items-center justify-center">
                  <CartIcon />
                </Link>

                {/* More menu button - Hidden on mobile */}
                <button onClick={toggleMoreMenu} className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-black transition-colors p-2">
                  <EllipsisVertical className="w-5 h-5" />
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Menu"
                >
                  <Menu className="w-6 h-6 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Search Bar Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40">
            <div className="max-w-7xl mx-auto px-4 py-4" ref={desktopSearchRef}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="desktop-search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => { if (results.length) setShowResults(true); }}
                  type="text"
                  placeholder="Søk etter produkter..."
                  className="w-full pl-12 pr-12 py-3 text-base text-black bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-[#12b190] focus:ring-2 focus:ring-[#12b190]/20"
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setQuery('');
                    setShowResults(false);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Search Results */}
                {showResults && results.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                    {results.slice(0, 8).map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          setShowResults(false);
                          setQuery('');
                          setIsSearchOpen(false);
                        }}
                      >
                        <div className="text-left flex-1 min-w-0 pr-4">
                          <div className="text-sm font-medium text-black truncate">{product.name}</div>
                          {product.price !== undefined && (
                            <div className="text-xs text-gray-500 mt-1">
                              {typeof product.price === 'number' ? `${product.price} kr` : product.price}
                            </div>
                          )}
                        </div>
                        <img
                          src={product.image || '/images/placeholder.png'}
                          alt={product.name}
                          className="w-16 h-16 object-contain rounded-md border border-gray-200 flex-shrink-0"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu}></div>
          
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
            {/* Mobile Menu Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Meny</h2>
              <button
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-gray-200" ref={mobileSearchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => { if (results.length) setShowResults(true); }}
                  type="text"
                  placeholder="Søk produkter..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm text-black bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#12b190] focus:ring-2 focus:ring-[#12b190]/20"
                />

                {showResults && results.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto z-50">
                    {results.slice(0, 8).map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className="flex items-center justify-between px-3 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          setShowResults(false);
                          setQuery('');
                          toggleMobileMenu();
                        }}
                      >
                        <div className="text-left flex-1 min-w-0 pr-3">
                          <div className="text-sm font-medium text-black truncate">{product.name}</div>
                          {product.price !== undefined && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              {typeof product.price === 'number' ? `${product.price} kr` : product.price}
                            </div>
                          )}
                        </div>
                        <img
                          src={product.image || '/images/placeholder.png'}
                          alt={product.name}
                          className="w-14 h-14 object-contain rounded-md border border-gray-200 flex-shrink-0"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="p-4 space-y-2">
              {/* E-Bikes Dropdown */}
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <button
                  onClick={toggleMobileDropdown}
                  className="flex items-center justify-between w-full px-4 py-3 text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm">El-sykler</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                      mobileDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {mobileDropdownOpen && (
                  <div className="px-2 pb-2 space-y-2 bg-white">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all group border border-gray-100"
                        onClick={() => {
                          setMobileDropdownOpen(false);
                          toggleMobileMenu();
                        }}
                      >
                        <div className="flex-1 min-w-0 pr-3">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-semibold text-gray-900 truncate">{cat.name}</p>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#12b190] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5 truncate">{cat.tagline}</p>
                        </div>
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-14 h-14 object-contain rounded-md border border-gray-200 flex-shrink-0"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* View All Bikes Link */}
              <Link
                href="/cycle"
                className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-[#12b190] bg-[#12b190]/5 rounded-lg hover:bg-[#12b190]/10 transition-colors border border-[#12b190]/20"
                onClick={toggleMobileMenu}
              >
                <span>Se alle sykler</span>
                <ChevronRight className="w-4 h-4 text-[#12b190]" />
              </Link>

              {/* Other Navigation Items */}
              {navItems
                .filter((i) => i.name !== 'El-sykler')
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-900 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}

          {/* Right-side drawer for More Menu */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30">
          <div className="w-80 bg-white h-full shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-700">Flere alternativer</h2>
              <button onClick={toggleMoreMenu}>
                <X className="w-5 h-5 text-gray-600 hover:text-black" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {moreMenuItems.map((item) => (
                <Link key={item.name} href={item.href} className="block text-gray-700 hover:text-black" onClick={toggleMoreMenu}>
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="absolute bottom-0 w-full p-4 border-t text-center text-sm text-gray-500">Trenger du hjelp? Kontakt vårt supportteam</div>
          </div>
        </div>
      )}
    </>
  );
}