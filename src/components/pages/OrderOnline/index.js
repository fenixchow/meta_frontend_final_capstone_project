import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import pages from '../../../utils/pages';

const OrderOnline = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deliveryTime: 'asap',
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const menuItems = [
    { id: 1, name: 'Hummus', price: 8, category: 'appetizer' },
    { id: 2, name: 'Baba Ganoush', price: 9, category: 'appetizer' },
    { id: 3, name: 'Chicken Shawarma', price: 18, category: 'main' },
    { id: 4, name: 'Grilled Lamb Chops', price: 28, category: 'main' },
    { id: 5, name: 'Greek Salad', price: 12, category: 'salad' },
    { id: 6, name: 'Baklava', price: 8, category: 'dessert' },
    { id: 7, name: 'Fresh Lemonade', price: 5, category: 'drink' },
  ];

  const addToOrder = (item) => {
    const existingItem = orderItems.find(orderItem => orderItem.id === item.id);
    if (existingItem) {
      setOrderItems(orderItems.map(orderItem =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      ));
    } else {
      setOrderItems([...orderItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromOrder = (itemId) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromOrder(itemId);
    } else {
      setOrderItems(orderItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      ));
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (orderItems.length === 0) {
      alert('Please add items to your order');
      return;
    }
    setOrderSubmitted(true);
  };

  if (orderSubmitted) {
    return (
      <div className="order-online-page">
        <div className="container order-confirmation">
          <h2>Order Confirmed!</h2>
          <p>Thank you for your order. We'll send you a confirmation email shortly.</p>
          <p className="order-total">Total: ${calculateTotal().toFixed(2)}</p>
          <div className="order-actions">
            <Link to={pages.get('home').path} className="button-primary">
              Return to Home
            </Link>
            <button
              className="button-primary"
              onClick={() => {
                setOrderSubmitted(false);
                setOrderItems([]);
                setCustomerInfo({
                  name: '',
                  email: '',
                  phone: '',
                  address: '',
                  deliveryTime: 'asap',
                });
              }}
            >
              Place Another Order
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-online-page">
      <section className="order-hero">
        <div className="container">
          <h1>Order Online</h1>
          <p className="order-subtitle">Delicious food delivered to your door</p>
        </div>
      </section>

      <section className="order-content">
        <div className="container grid order-layout">
          <div className="order-menu-section">
            <h2>Menu Items</h2>
            <div className="menu-items-list">
              {menuItems.map(item => (
                <div key={item.id} className="menu-item-row">
                  <div className="menu-item-info">
                    <h3>{item.name}</h3>
                    <p className="menu-item-price">${item.price}</p>
                  </div>
                  <button
                    className="button-primary add-item-btn"
                    onClick={() => addToOrder(item)}
                    aria-label={`Add ${item.name} to order`}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="order-summary-section">
            <h2>Your Order</h2>
            {orderItems.length === 0 ? (
              <p className="empty-order">Your cart is empty. Add items to get started!</p>
            ) : (
              <>
                <div className="order-items">
                  {orderItems.map(item => (
                    <div key={item.id} className="order-item">
                      <div className="order-item-info">
                        <h4>{item.name}</h4>
                        <p>${item.price} each</p>
                      </div>
                      <div className="order-item-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          className="remove-btn"
                          onClick={() => removeFromOrder(item.id)}
                          aria-label="Remove item"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-total-section">
                  <div className="order-total-line">
                    <span>Subtotal:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="order-total-line">
                    <span>Delivery Fee:</span>
                    <span>$5.00</span>
                  </div>
                  <div className="order-total-line total">
                    <span>Total:</span>
                    <span>${(calculateTotal() + 5).toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="order-form">
                  <h3>Delivery Information</h3>
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone *</label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Delivery Address *</label>
                    <textarea
                      id="address"
                      required
                      rows="3"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="deliveryTime">Delivery Time</label>
                    <select
                      id="deliveryTime"
                      value={customerInfo.deliveryTime}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryTime: e.target.value })}
                    >
                      <option value="asap">As soon as possible</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                    </select>
                  </div>
                  <button type="submit" className="button-primary submit-order-btn">
                    Place Order
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderOnline;

