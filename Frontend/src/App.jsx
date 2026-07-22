import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null); // Toast notification state

  useEffect(() => {
    fetch('http://localhost:5113/api/products') 
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Toast notification trigger karo (Drawer open nahi hoga)
    setToastMessage(`${product.name} added to your shopping bag.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000); // 3 seconds baad message gayab ho jayega
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
    );
  };

  const handleRemoveItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-obsidian text-ivory relative">
      {/* 1. Navbar */}
      <Navbar 
        cartCount={totalCartItems} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      {/* 2. Luxury Toast Notification Popup */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-obsidian border border-gold text-ivory px-6 py-3.5 shadow-2xl flex items-center gap-3 animate-fade-in transition-all duration-300">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
          <p className="font-sans text-xs tracking-widest uppercase">{toastMessage}</p>
        </div>
      )}

      {/* 3. Cart Drawer Component */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />

      {/* 4. Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-serif font-bold text-ivory mb-2">Hifza Aromatics</h1>
          <p className="font-sans text-xs tracking-[0.25em] uppercase text-gold/80">Discover the signature luxury of exclusive fragrances.</p>
        </div>

        <h2 className="text-2xl font-serif text-ivory mb-8 border-b border-gold/20 pb-3">Featured Fragrances</h2>
        
        {loading ? (
          <p className="text-center font-sans text-ivory/60 py-12 tracking-wider">Loading luxury fragrances...</p>
        ) : products.length === 0 ? (
          <p className="text-center font-sans text-ivory/60 py-12 tracking-wider">No products found in database yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                image={product.imageUrl}
                name={product.name}
                category={product.category}
                price={product.price}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;