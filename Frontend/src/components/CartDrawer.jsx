import React, { useState } from 'react';
import { X, Trash2, ArrowLeft } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemove }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in all delivery details.");
      return;
    }
    console.log("Order Placed:", { items: cart, customer: formData, total: subtotal });
    setOrderPlaced(true);
  };

  const handleResetAndClose = () => {
    setOrderPlaced(false);
    setIsCheckingOut(false);
    setFormData({ name: '', phone: '', address: '' });
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'}`}>
      <div 
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
        onClick={handleResetAndClose} 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md bg-white border-l border-gray-200 text-gray-900 flex flex-col shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            {isCheckingOut && !orderPlaced ? (
              <button onClick={() => setIsCheckingOut(false)} className="text-gray-600 hover:text-black flex items-center gap-2 text-xs uppercase tracking-wider font-medium">
                <ArrowLeft size={16} /> Back to Bag
              </button>
            ) : (
              <h2 className="font-serif text-xl tracking-wider text-gray-900">
                {orderPlaced ? "Order Confirmed" : "Your Shopping Bag"}
              </h2>
            )}
            <button onClick={handleResetAndClose} className="text-gray-500 hover:text-black transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {orderPlaced ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-green-100 border border-green-300 rounded-full flex items-center justify-center mx-auto text-green-700 text-2xl font-serif">✓</div>
                <h3 className="font-serif text-2xl text-gray-900">Thank You, {formData.name}!</h3>
                <p className="font-sans text-xs text-gray-600 tracking-wider">Your order has been successfully placed.</p>
                {/* --- UPDATED BUTTON --- */}
                <button 
                  onClick={handleResetAndClose} 
                  className="mt-6 bg-white text-black border border-black px-6 py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-black hover:text-white transition-all rounded"
                >
                  Continue Shopping
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <h3 className="font-serif text-lg text-gray-900 mb-2 border-b pb-2">Shipping Information</h3>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-black rounded"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-black rounded"
                    placeholder="0300-1234567"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-gray-600 mb-1">Delivery Address</label>
                  <textarea 
                    required
                    rows="3"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-white border border-gray-300 px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-black rounded"
                    placeholder="Enter complete address"
                  />
                </div>
                <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-xs uppercase tracking-wider text-gray-600">Total Amount:</span>
                  <span className="font-serif text-lg font-bold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {/* --- UPDATED BUTTON --- */}
                <button 
                  type="submit" 
                  className="w-full bg-white text-black border border-black font-sans text-xs tracking-[0.2em] uppercase py-3.5 font-semibold hover:bg-black hover:text-white transition-all mt-4 rounded"
                >
                  Place Order Now
                </button>
              </form>
            ) : (
              /* Cart Items List */
              <div className="space-y-6">
                {cart.length === 0 ? (
                  <p className="text-center text-gray-400 font-sans tracking-wide py-12">Your shopping bag is currently empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center border-b border-gray-100 pb-4">
                      <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover border border-gray-200 rounded" />
                      <div className="flex-1">
                        <h3 className="font-serif text-base text-gray-900">{item.name}</h3>
                        <p className="font-sans text-xs text-gray-500 mt-0.5">{item.category}</p>
                        <p className="font-sans text-sm text-gray-900 font-semibold mt-1">Rs. {item.price}</p>
                        <div className="flex items-center gap-3 mt-2">
                          {/* --- UPDATED QTY BUTTONS --- */}
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} 
                            className="w-7 h-7 bg-white border border-gray-300 flex items-center justify-center text-sm hover:border-black hover:text-black rounded-sm transition-colors"
                          >
                            -
                          </button>
                          <span className="text-sm font-sans font-medium tabular-nums w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} 
                            className="w-7 h-7 bg-white border border-gray-300 flex items-center justify-center text-sm hover:border-black hover:text-black rounded-sm transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 p-2"><Trash2 size={18} /></button>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Footer Subtotal */}
          {!isCheckingOut && !orderPlaced && cart.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-sans text-sm tracking-wider text-gray-600 uppercase">Subtotal</span>
                <span className="font-serif text-lg font-bold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
              </div>
              {/* --- UPDATED CHECKOUT BUTTON --- */}
              <button 
                onClick={() => setIsCheckingOut(true)} 
                className="w-full bg-white text-black border border-black font-sans text-xs tracking-[0.2em] uppercase py-3.5 font-semibold hover:bg-black hover:text-white transition-all shadow rounded"
              >
                Proceed to Checkout
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}