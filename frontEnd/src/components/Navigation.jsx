import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaBars, FaTimes, FaSearch } from 'react-icons/fa'
import { useAuth } from '../store/AuthContext'
import { useSelector } from 'react-redux'
import logo from '../assets/logos/LOGO-SMAB-CROP-1.png'
import { categories } from '../data/categories'
import { searchProducts } from '../services/productService'
import { generateSlug } from '../utils/FunctionHelper'


const Navigation = ({ children }) => {
  const { user, logout } = useAuth()
  const cartItems = useSelector(state => state.cart.items)
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [showSideNav, setShowSideNav] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const searchTimeout = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSideNav && !event.target.closest('.side-nav') && !event.target.closest('.nav-trigger')) {
        setShowSideNav(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showSideNav])

  // Debounced search
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }
    setSearchLoading(true)
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(async () => {
      try {
        const res = await searchProducts(searchQuery)
        setSearchResults(res.products || [])
        setShowDropdown(true)
      } catch (e) {
        setSearchResults([])
        setShowDropdown(false)
      } finally {
        setSearchLoading(false)
      }
    }, 350)
    return () => clearTimeout(searchTimeout.current)
  }, [searchQuery])

  return (
    <div className="fixed w-full top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#e63812] to-[#ff6b4a] text-white py-2">
        <div className="container mx-auto px-4">          
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <a href="tel:+1234567890" className="hover:text-gray-200">+212 766-074939</a>
            <span>|</span>
            <a href="mailto:contact@smab.com" className="hover:text-gray-200">contact@smab.com</a>
          </div>
          {/* Auth Links */}
          <div className="flex items-center gap-3 mt-1 sm:mt-0">
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-gray-200 transition-colors font-medium flex items-center gap-1">
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.847.635 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
                  MY SMAB
                </Link>
                <span className="h-4 border-l border-white/40 mx-2"></span>
                {children} {/* NotificationMenu will render here */}
                <span className="h-4 border-l border-white/40 mx-2"></span>
                <button onClick={logout} className="hover:text-gray-200 transition-colors font-medium flex items-center gap-1">
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1' /></svg>
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200 transition-colors font-medium flex items-center gap-1">
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.847.635 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z' /></svg>
                  Connexion
                </Link>
                <span className="h-4 border-l border-white/40 mx-2"></span>
                <Link to="/register" className="hover:text-gray-200 transition-colors font-medium flex items-center gap-1">
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' /></svg>
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`bg-white transition-all duration-300 ${hasScrolled ? 'shadow-lg' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Search */}
            <div className="flex items-center gap-6 flex-1 relative">
              <Link to="/" className="flex-shrink-0">
                <div className="bg-[#e63812] p-2 rounded">
                  <img src={logo} alt="SMAB Logo" className="h-12 w-auto" />
                </div>
              </Link>
              {/* Search Bar - Hidden on mobile */}
              <div className="hidden md:block relative w-80">
                <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-[#e63812]">
                  <FaSearch className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    className="bg-transparent outline-none w-full text-gray-800"
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                  />
                  {searchLoading && <span className="ml-2 text-xs text-gray-400">...</span>}
                </div>
                {showDropdown && searchQuery && (
                  <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto border border-gray-100">
                    {searchResults.length === 0 && !searchLoading ? (
                      <div className="p-4 text-gray-500 text-center">Aucun résultat</div>
                    ) : (
                      searchResults.map(product => {
                        const slug = generateSlug(product.ProductLabel || product.name || '')
                        return (
                          <div
                            key={product.ProductId || product.id}
                            className="block px-4 py-3 hover:bg-gray-50 text-gray-800 border-b last:border-b-0 border-gray-100 cursor-pointer"
                            onMouseDown={e => {
                              e.preventDefault();
                              setShowDropdown(false);
                              navigate(`/produit/${slug}?id=${product.ProductId}`);
                            }}
                          >
                            <div className="font-medium">{product.ProductLabel || product.name}</div>
                            <div className="text-xs text-gray-500 truncate">{product.ProductRef ? `Ref: ${product.ProductRef}` : (product.shortDescription || product.ProductDescription)}</div>
                          </div>
                        )
                      })
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">              <button
              className="nav-trigger flex items-center text-gray-700 hover:text-[#e63812] font-medium transition-colors"
              onClick={() => setShowSideNav(!showSideNav)}
            >
              <FaBars className="mr-2" />
              Toutes les catégories
            </button>
              <Link to="/services" className="text-gray-700 hover:text-[#e63812] font-medium transition-colors">
                Nos services
              </Link>
              <Link to="/conseils" className="text-gray-700 hover:text-[#e63812] font-medium transition-colors">
                Nos conseils
              </Link>

              <Link to="/about" className="text-gray-700 hover:text-[#e63812] font-medium transition-colors">
                À propos
              </Link>

              <Link to="/contact" className="text-gray-700 hover:text-[#e63812] font-medium transition-colors">
                Contact
              </Link>


              {/* Cart Icon */}
              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-2xl text-gray-700 hover:text-[#e63812] transition-colors" />
                <span className="absolute -top-2 -right-2 bg-[#e63812] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* Side Navigation */}
        <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-all duration-500 z-50 ${showSideNav ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className={`side-nav fixed inset-y-0 left-0 w-72 bg-white/95 backdrop-blur-md shadow-2xl transform transition-all duration-500 ease-out ${showSideNav ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Catégories</h2>
                  <button
                    onClick={() => setShowSideNav(false)}
                    className="text-gray-400 hover:text-[#e63812] transition-colors duration-300 p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto flex-1 py-4 hide-scrollbar">
                <div className="space-y-2 px-4">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/activite/${category.slug}`}
                      className={`group flex items-center w-full p-3 text-gray-700 rounded-xl justify-between transition-all duration-300 ease-out border-l-[3px] hover:border-[#e63812] ${selectedCategory?.id === category.id ? 'bg-gray-50/80 text-[#e63812] border-[#e63812] shadow-sm' : 'border-transparent hover:bg-gray-50/80 hover:text-[#e63812]'}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-white p-2.5 shadow-sm flex items-center justify-center transition-all duration-300 ${selectedCategory?.id === category.id ? 'shadow-md' : 'group-hover:shadow'}`}>
                          <img src={category.icon} alt={category.name} className="w-full h-full object-contain" />
                        </div>
                        <span className="font-medium text-[15px]">{category.name}</span>
                      </div>
                      <span className={`transform transition-all duration-300 ${selectedCategory?.id === category.id ? 'text-[#e63812] translate-x-1' : 'text-gray-400 group-hover:text-[#e63812] group-hover:translate-x-1 opacity-60 group-hover:opacity-100'}`}>
                        &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Subcategory Sidebar */}
          {selectedCategory && (
            <div className={`fixed inset-y-0 w-80 bg-white/95 backdrop-blur-md shadow-2xl transform transition-all duration-500 ease-out ${selectedCategory ? 'translate-x-72 opacity-100' : 'translate-x-full opacity-0'}`}>
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-gray-400 hover:text-[#e63812] transition-all duration-300 p-2 hover:bg-gray-50 rounded-lg group flex items-center"
                    >
                      <span className="transform inline-block transition-transform duration-200 group-hover:-translate-x-1 text-xl">&larr;</span>
                    </button>
                    <h3 className="text-xl font-semibold text-gray-800">{selectedCategory.name}</h3>
                  </div>
                </div>
                <div className="overflow-y-auto flex-1 p-6 hide-scrollbar">
                  <div className="h-[280px] rounded-2xl overflow-hidden shadow-lg mb-8 relative group">
                    <img
                      src={selectedCategory.image}
                      alt={selectedCategory.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="text-white text-2xl font-semibold mb-2">{selectedCategory.name}</h4>
                      <p className="text-white/80 text-sm">Découvrez notre gamme complète</p>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    {selectedCategory.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        to={`/activite/${selectedCategory.slug}/${sub.slug}`}
                        className="group flex items-center px-4 py-3 text-gray-700 hover:text-[#e63812] bg-gray-50/50 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-md border-l-[3px] border-transparent hover:border-[#e63812]"
                        onClick={() => { setShowSideNav(false); setSelectedCategory(null); }}
                      >
                        <span className="flex-1">{sub.name}</span>
                        <span className="text-gray-400 group-hover:text-[#e63812] transform group-hover:translate-x-1 transition-all duration-300">
                          &rarr;
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-50">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <Link to="/" className="flex items-center">
                    <div className="bg-[#e63812] p-2 rounded">
                      <img src={logo} alt="SMAB Logo" className="h-10 w-auto" />
                    </div>
                  </Link>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-[#e63812] p-2 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto hide-scrollbar">
                {/* Mobile Search */}

                {selectedCategory ? (
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-6">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="text-gray-400 hover:text-[#e63812] transition-all duration-300 p-2 hover:bg-gray-50 rounded-lg group"
                      >
                        <span className="transform inline-block transition-transform duration-200 group-hover:-translate-x-1 text-xl">&larr;</span>
                      </button>
                      <h3 className="text-xl font-semibold text-gray-800">{selectedCategory.name}</h3>                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-xl mb-8 relative group">
                      <div className="h-[320px] sm:h-[400px]">
                        <img
                          src={selectedCategory.image}
                          alt={selectedCategory.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <h4 className="text-white text-3xl font-bold mb-3">{selectedCategory.name}</h4>
                          <p className="text-white/90 text-base">Découvrez notre gamme complète de solutions</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {selectedCategory.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/activite/${selectedCategory.slug}/${sub.slug}`}
                          className="group flex items-center px-4 py-3 text-gray-700 hover:text-[#e63812] bg-gray-50/50 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-md border-l-[3px] border-transparent hover:border-[#e63812]"
                          onClick={() => { setIsOpen(false); setSelectedCategory(null); }}
                        >
                          <span className="flex-1">{sub.name}</span>
                          <span className="text-gray-400 group-hover:text-[#e63812] transform group-hover:translate-x-1 transition-all duration-300">
                            &rarr;
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/activite/${category.slug}`}
                        className="flex items-center w-full p-3 text-gray-700 hover:text-[#e63812] bg-gray-50/50 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-md border-l-[3px] border-transparent hover:border-[#e63812] group"
                        onClick={() => setSelectedCategory(category)}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-white p-2.5 shadow-sm flex items-center justify-center group-hover:shadow transition-all duration-300">
                            <img src={category.icon} alt={category.name} className="w-full h-full object-contain" />
                          </div>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className="text-gray-400 group-hover:text-[#e63812] transform group-hover:translate-x-1 transition-all duration-300">
                          &rarr;
                        </span>
                      </Link>
                    ))}                    <div className="border-t border-gray-100 pt-4 space-y-2">
                      <Link
                        to="/conseils"
                        className="flex items-center w-full p-3 text-gray-700 hover:text-[#e63812] bg-gray-50/50 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-md"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="flex-1">Nos conseils</span>
                        <span className="text-gray-400 group-hover:text-[#e63812]">&rarr;</span>
                      </Link>
                      <Link
                        to="/services"
                        className="block px-4 py-3 text-gray-700 hover:text-[#e63812] bg-gray-50/50 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-md border-l-[3px] border-transparent hover:border-[#e63812]"
                        onClick={() => setIsOpen(false)}
                      >
                        Nos services
                      </Link>
                      <Link
                        to="/about"
                        className="block px-4 py-3 text-gray-700 hover:text-[#e63812] bg-gray-50/50 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-md border-l-[3px] border-transparent hover:border-[#e63812]"
                        onClick={() => setIsOpen(false)}
                      >
                        À propos de nous
                      </Link>
                      <Link
                        to="/contact"
                        className="block px-4 py-3 text-gray-700 hover:text-[#e63812] bg-gray-50/50 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-md border-l-[3px] border-transparent hover:border-[#e63812]"
                        onClick={() => setIsOpen(false)}
                      >
                        Contact
                      </Link>
                      {user && (
                        <Link
                          to="/dashboard"
                          className="block px-4 py-3 text-gray-700 hover:text-[#e63812] bg-gray-50/50 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-md border-l-[3px] border-transparent hover:border-[#e63812]"
                          onClick={() => setIsOpen(false)}
                        >
                          MY SMAB
                        </Link>
                      )}
                      <Link
                        to="/cart"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#e63812] bg-gray-50/50 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-md border-l-[3px] border-transparent hover:border-[#e63812]"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaShoppingCart className="mr-3 text-xl" />
                        <span className="flex-1">Panier</span>
                        <span className="ml-auto bg-[#e63812] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      </Link>

                      {/* Auth Links */}
                      <div className="mt-4 border-t border-gray-100 pt-4">
                        {user ? (
                          <>
                            <Link
                              to="/dashboard"
                              className="block px-4 py-3 text-gray-700 hover:text-[#e63812] bg-gray-50/50 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-md border-l-[3px] border-transparent hover:border-[#e63812] mb-2"
                              onClick={() => setIsOpen(false)}
                            >
                              MY SMAB
                            </Link>
                            <button
                              onClick={() => {
                                logout();
                                setIsOpen(false);
                              }}
                              className="w-full text-left px-4 py-3 text-gray-700 hover:text-[#e63812] bg-gray-50/50 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-md border-l-[3px] border-transparent hover:border-[#e63812]"
                            >
                              Déconnexion
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/login"
                              className="block px-4 py-3 text-gray-700 hover:text-[#e63812] bg-gray-50/50 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-md border-l-[3px] border-transparent hover:border-[#e63812] mb-2"
                              onClick={() => setIsOpen(false)}
                            >
                              Connexion
                            </Link>
                            <Link
                              to="/register"
                              className="block px-4 py-3 text-gray-700 hover:text-[#e63812] bg-gray-50/50 hover:bg-white rounded-xl transition-all duration-300 hover:shadow-md border-l-[3px] border-transparent hover:border-[#e63812]"
                              onClick={() => setIsOpen(false)}
                            >
                              Inscription
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-4 right-4 bg-[#e63812] text-white p-4 rounded-full shadow-lg hover:bg-[#ff6b4a] transition-colors z-50"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
    </div>
  )
}

export default Navigation
