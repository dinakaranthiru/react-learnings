import React, { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Fresh Apple", icon: "🍎", price: 1.5, desc: "Crisp organic apples" },
  { id: 2, name: "Ripe Banana", icon: "🍌", price: 0.8, desc: "Sweet energy booster" },
  { id: 3, name: "Juicy Orange", icon: "🍊", price: 1.2, desc: "Rich vitamin C citrus" },
  { id: 4, name: "Pineapple", icon: "🍍", price: 3.5, desc: "Tropical ripe pineapple" },
];

function Cart() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, cartId: Date.now() + Math.random() }]);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => setCart([]);

  const totalCost = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div className="demo-container">
      <div className="demo-card">
        <div className="demo-header">
          <div className="demo-badge-row">
            <span className="demo-badge demo-badge-purple">Shopping Cart</span>
            <span className="stat-pill">🛒 {cart.length} items in cart</span>
          </div>
          <h1 className="demo-title">Fruit Market Store</h1>
          <p className="demo-desc">
            Demonstrates array state mutations (append, filter removal, and aggregate sums).
          </p>
        </div>

        {/* Product Grid */}
        <h3 style={{ fontSize: "1.05rem", color: "#f8fafc", marginBottom: "16px" }}>
          Available Products
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "14px",
            marginBottom: "32px",
          }}
        >
          {PRODUCTS.map((p) => (
            <div
              key={p.id}
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                padding: "18px 14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "transform 0.2s ease, border-color 0.2s ease",
              }}
            >
              <div style={{ fontSize: "2.4rem", marginBottom: "8px" }}>{p.icon}</div>
              <strong style={{ fontSize: "0.95rem", color: "#f8fafc", marginBottom: "2px" }}>
                {p.name}
              </strong>
              <span style={{ fontSize: "0.78rem", color: "#64748b", marginBottom: "10px" }}>
                {p.desc}
              </span>
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  color: "#38bdf8",
                  marginBottom: "14px",
                }}
              >
                ${p.price.toFixed(2)}
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => addToCart(p)}
                style={{ width: "100%" }}
              >
                + Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Cart Review Drawer Box */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "20px",
          }}
        >
          <div className="flex-between" style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#f8fafc" }}>
                Your Shopping Cart
              </h3>
              <span className="stat-pill" style={{ color: "#38bdf8" }}>
                {cart.length} {cart.length === 1 ? "item" : "items"}
              </span>
            </div>

            {cart.length > 0 && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={clearCart}
                style={{ color: "#f43f5e" }}
              >
                Clear Cart
              </button>
            )}
          </div>

          {cart.length > 0 ? (
            <div>
              <div className="modern-list" style={{ marginBottom: "16px", maxHeight: "240px", overflowY: "auto" }}>
                {cart.map((item) => (
                  <div key={item.cartId} className="modern-list-item" style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                      <div>
                        <span style={{ fontSize: "0.9rem", color: "#f8fafc", fontWeight: "500" }}>
                          {item.name}
                        </span>
                        <div style={{ fontSize: "0.76rem", color: "#38bdf8" }}>
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.cartId)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div
                className="flex-between"
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  paddingTop: "14px",
                }}
              >
                <span style={{ fontSize: "0.95rem", color: "#94a3b8" }}>Order Subtotal</span>
                <strong style={{ fontSize: "1.35rem", color: "#34d399", fontFamily: "monospace" }}>
                  ${totalCost}
                </strong>
              </div>
            </div>
          ) : (
            <div className="modern-empty-state" style={{ padding: "24px 0" }}>
              <div className="modern-empty-state-icon">🛒</div>
              <p style={{ margin: 0 }}>Your cart is empty. Add fresh fruits above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
