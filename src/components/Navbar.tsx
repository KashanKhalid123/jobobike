'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  ChevronDown,
  X,
  ChevronRight,
  Menu,
  EllipsisVertical,
} from 'lucide-react';
import { CartIcon } from './CartIcon';
import { searchProducts, getProductBySlug, getAllProductSlugs } from '@/lib/productData';
import { accessoriesProducts } from '@/lib/accessoriesProducts';

export default function Navbar() {
  const router = useRouter();

  const [activeDropdown, setActiveDropdown] = useState<null | number>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // search state
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // mobile e-bikes accordion
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  // desktop e-bikes accordion
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

  // dynamic categories
  const [categories, setCategories] = useState<any[]>([]);

  // refs
  const desktopSearchRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchRef = useRef<HTMLDivElement | null>(null);

  // fetch categories from products
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

  // helper
  const formatCategoryName = (category: string): string => {
    return category
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  };

  const getCategoryTagline = (category: string): string => {
    const taglines: { [key: string]: string } = {
      Hybrid: 'Smart kompakt mobilitet',
      Pendler: 'Urban mobilitet og glede',
      Sammenleggbar: 'Brett, kjør, erobre',
      Fatbike: 'Stabil terreng allround',
      Lastesykkel: 'Mer kraft når du bærer last',
      Terreng: 'Kraft, teknikk, utmerket',
    };
    return taglines[category] || 'Utforsk vårt utvalg';
  };

  // debounced search
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
        const bikeResults = searchProducts(query);
        const accessoryResults = accessoriesProducts.filter(product => 
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.features?.some(f => f.toLowerCase().includes(query.toLowerCase())) ||
          product.category.some(c => c.toLowerCase().includes(query.toLowerCase()))
        ).map(acc => ({ ...acc, isAccessory: true }));
        
        const allResults = [...bikeResults, ...accessoryResults];
        setResults(allResults || []);
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

  // close search dropdown on outside click
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
    } else if (e.key === 'Enter') {
      if (query.trim()) {
        router.push(`/search?query=${encodeURIComponent(query.trim())}`);
        setShowResults(false);
      }
    }
  };

  const navItems = [
    { name: 'Sykkelutstyr', href: '/accessorie' },
    { name: 'Kontakt oss', href: '/contact' },
  ];

  const moreMenuItems = [
    { name: 'El-sykler', href: '/', dropdown: true },
    { name: 'Sykkelutstyr', href: '/accessorie' },
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

  const toggleMoreMenu = () => setIsMoreMenuOpen(!isMoreMenuOpen);

  return (
    <>
      {/* Green promotional banner */}
      <div className="bg-[#12b190] text-white py-2 fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-2 md:px-4">
          <div className="flex items-center space-x-2 md:space-x-8 text-xs md:text-sm">
            <div className="flex items-center space-x-1 md:space-x-2">
              <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="whitespace-nowrap">EU fabrikk</span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
              <span className="whitespace-nowrap hidden sm:inline">Gratis frakt til EU</span>
              <span className="whitespace-nowrap sm:hidden">Gratis frakt</span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
              </svg>
              <span className="whitespace-nowrap">300+ partnere i Europa</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="fixed top-10 w-full z-40 bg-white border-b shadow-sm">
        {/* TOP ROW like the screenshot */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                src="/images/logo.jpg"
                alt="Logo"
                className="h-9 w-auto md:h-10"
              />
            </Link>

            {/* Search (desktop) */}
            <div
              className="hidden md:block flex-1 max-w-3xl mx-4"
              ref={desktopSearchRef}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="desktop-search-input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => {
                    if (results.length) setShowResults(true);
                  }}
                  type="text"
                  placeholder="Hva leter du etter?"
                  className="w-full pl-12 pr-12 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#12b190]/20 focus:border-[#12b190] text-sm text-black"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      setShowResults(false);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                )}

                {/* search results */}
                {showResults && results.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
                    {results.slice(0, 8).map((product) => (
                      <Link
                        key={product.id}
                        href={product.isAccessory ? `/accessories/${product.slug}` : `/products/${product.slug}`}
                        className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          setShowResults(false);
                          setQuery('');
                        }}
                      >
                        <div className="text-left flex-1 min-w-0 pr-4">
                          <div className="text-sm font-medium text-black truncate">
                            {product.name}
                          </div>
                          {product.price !== undefined && (
                            <div className="text-xs text-gray-500 mt-1">
                              {typeof product.price === 'number'
                                ? `${product.price} kr`
                                : product.price}
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

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Location (desktop) */}
              <div className="hidden md:flex items-center gap-1 text-sm text-gray-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Norge</span>
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors inline-flex items-center justify-center"
              >
                <CartIcon />
              </Link>

              {/* More */}
              <button
                onClick={toggleMoreMenu}
                className="hidden md:inline-flex p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <EllipsisVertical className="w-5 h-5 text-gray-700" />
              </button>

              {/* Mobile buttons */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW - Secondary Navigation */}
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center h-14 gap-8">
              <Link
                href="/about"
                className="text-base font-medium text-gray-700 hover:text-[#12b190] transition-colors"
              >
                Om oss
              </Link>
              <Link
                href="/bli-forhandler"
                className="text-base font-medium text-gray-700 hover:text-[#12b190] transition-colors"
              >
                Bli forhandler
              </Link>
            </div>
          </div>
        </div>

      </nav>

      {/* MOBILE MENU (unchanged logic, only header matches new top row) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu}></div>

          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto" style={{marginTop: '0px'}}>
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.jpg"
                  alt="JOBOBIKE"
                  className="h-8 w-auto"
                />
              </div>
              <button
                onClick={toggleMobileMenu}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* mobile search */}
            <div className="p-4 border-b border-gray-200" ref={mobileSearchRef}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => {
                    if (results.length) setShowResults(true);
                  }}
                  type="text"
                  placeholder="Søk produkter..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm text-black bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#12b190] focus:ring-2 focus:ring-[#12b190]/20"
                />

                {showResults && results.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto z-50">
                    {results.slice(0, 8).map((product) => (
                      <Link
                        key={product.id}
                        href={product.isAccessory ? `/accessories/${product.slug}` : `/products/${product.slug}`}
                        className="flex items-center justify-between px-3 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          setShowResults(false);
                          setQuery('');
                          toggleMobileMenu();
                        }}
                      >
                        <div className="text-left flex-1 min-w-0 pr-3">
                          <div className="text-sm font-medium text-black truncate">
                            {product.name}
                          </div>
                          {product.price !== undefined && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              {typeof product.price === 'number'
                                ? `${product.price} kr`
                                : product.price}
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

            {/* mobile navigation */}
            <div className="p-4 space-y-2">
              {/* El-sykler dropdown with images */}
              <div>
                <button
                  onClick={toggleMobileDropdown}
                  className="flex items-center justify-between w-full p-3 text-left text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span className="font-medium">El-sykler</span>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${mobileDropdownOpen ? 'rotate-90' : ''}`} />
                </button>
                {mobileDropdownOpen && (
                  <div className="mt-2 space-y-2">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                        onClick={toggleMobileMenu}
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-12 h-12 object-contain rounded-md border border-gray-200 mr-3 flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{cat.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{cat.tagline}</div>
                        </div>
                      </Link>
                    ))}
                    <Link
                      href="/cycle"
                      className="block p-3 text-sm text-[#12b190] hover:text-[#0f9a7a] font-medium rounded-lg bg-gray-50 transition-colors text-center"
                      onClick={toggleMobileMenu}
                    >
                      Se alle el-sykler
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar menu items only */}
              <Link
                href="/accessorie"
                className="block p-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                onClick={toggleMobileMenu}
              >
                Sykkelutstyr
              </Link>
              <Link
                href="/contact"
                className="block p-3 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                onClick={toggleMobileMenu}
              >
                Kontakt oss
              </Link>

            </div>


          </div>
        </div>
      )}

      {/* right-side drawer for More */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-30">
          <div className="w-80 bg-white h-full shadow-lg">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-700">
                Flere alternativer
              </h2>
              <button onClick={toggleMoreMenu}>
                <X className="w-5 h-5 text-gray-600 hover:text-black" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {moreMenuItems.map((item, index) => (
                item.dropdown ? (
                  <div key={item.name} className="space-y-2">
                    <button
                      onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                      className="flex items-center justify-between w-full text-left text-gray-900 font-semibold hover:text-[#12b190] transition-colors"
                    >
                      <span>{item.name}</span>
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${desktopDropdownOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {desktopDropdownOpen && (
                      <div className="pl-4 space-y-2">
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                            onClick={toggleMoreMenu}
                          >
                            <img
                              src={cat.image}
                              alt={cat.name}
                              className="w-10 h-10 object-contain rounded-md border border-gray-200 mr-3 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">{cat.name}</div>
                              <div className="text-xs text-gray-500 mt-0.5">{cat.tagline}</div>
                            </div>
                          </Link>
                        ))}
                        <Link
                          href="/cycle"
                          className="block p-2 text-sm text-[#12b190] hover:text-[#0f9a7a] font-medium rounded-lg bg-gray-50 transition-colors text-center mt-2"
                          onClick={toggleMoreMenu}
                        >
                          Se alle el-sykler
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-gray-700 hover:text-black"
                    onClick={toggleMoreMenu}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>

            <div className="absolute bottom-0 w-full p-4 border-t text-center text-sm text-gray-500">
              Trenger du hjelp? Kontakt vårt supportteam
            </div>
          </div>
        </div>
      )}
    </>
  );
}
