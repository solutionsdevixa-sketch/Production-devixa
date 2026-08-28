import React, { useMemo, useState } from 'react';
import { Navigate, NavLink, Route, Routes, Link, useNavigate } from 'react-router-dom';
import awsLogo from './assets/aws-logo.svg';
import azureLogo from './assets/azure-logo.svg';
import devixaLogo from './assets/devixa-logo.svg';
import gcpLogo from './assets/gcp-logo.svg';

const products = [
  { id: 1, name: 'AWS Cloud Architecture', provider: 'AWS', price: 45000, description: 'Scalable cloud design, deployment, and optimization.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
  { id: 2, name: 'AWS Managed Security', provider: 'AWS', price: 38000, description: 'Security posture, monitoring, and threat protection.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
  { id: 3, name: 'AWS DevOps Starter', provider: 'AWS', price: 32000, description: 'CI/CD pipeline setup and deployment automation.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' },
  { id: 4, name: 'AWS Backup & Disaster Recovery', provider: 'AWS', price: 28000, description: 'Backup strategy and recovery planning for businesses.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80' },
  { id: 5, name: 'AWS Cost Optimization Review', provider: 'AWS', price: 15000, description: 'Reduce cloud spend and improve usage efficiency.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
  { id: 6, name: 'AWS Monitoring Setup', provider: 'AWS', price: 22000, description: 'CloudWatch monitoring and alerting setup.', image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80' },
  { id: 7, name: 'AWS IAM & Security Hardening', provider: 'AWS', price: 18000, description: 'Identity management and account security best practices.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80' },
  { id: 8, name: 'AWS Website Hosting Setup', provider: 'AWS', price: 12000, description: 'Deploy and host a business website on AWS.', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80' },

  { id: 9, name: 'Azure Cloud Migration', provider: 'Azure', price: 52000, description: 'Migrate your workloads to Microsoft Azure smoothly.', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80' },
  { id: 10, name: 'Azure DevOps & Monitoring', provider: 'Azure', price: 41000, description: 'CI/CD pipelines, observability, and governance.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' },
  { id: 11, name: 'Azure Virtual Desktop Setup', provider: 'Azure', price: 36000, description: 'Remote workspace setup for teams.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80' },
  { id: 12, name: 'Azure Backup Policy Setup', provider: 'Azure', price: 24000, description: 'Backup policies and retention design.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80' },
  { id: 13, name: 'Azure Cost Control Review', provider: 'Azure', price: 14000, description: 'Reduce Azure monthly spend and improve cost visibility.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
  { id: 14, name: 'Azure Security Baseline', provider: 'Azure', price: 20000, description: 'Secure tenant setup and account protection.', image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80' },
  { id: 15, name: 'Azure Website Deployment', provider: 'Azure', price: 17000, description: 'Deploy websites and apps on Azure services.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
  { id: 16, name: 'Azure Microsoft 365 Setup', provider: 'Azure', price: 11000, description: 'Email and collaboration setup for businesses.', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80' },

  { id: 17, name: 'GCP Cloud Landing Zone', provider: 'GCP', price: 47000, description: 'Foundation setup for secure and scalable GCP usage.', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80' },
  { id: 18, name: 'GCP Data Analytics Platform', provider: 'GCP', price: 56000, description: 'BigQuery, data pipelines, and cloud analytics.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80' },
  { id: 19, name: 'GCP Kubernetes Setup', provider: 'GCP', price: 43000, description: 'GKE cluster setup and orchestration support.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80' },
  { id: 20, name: 'GCP Security Review', provider: 'GCP', price: 21000, description: 'Review and improve cloud security posture.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80' },
  { id: 21, name: 'GCP Cost Optimization', provider: 'GCP', price: 16000, description: 'Identify savings and optimize GCP usage.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
  { id: 22, name: 'GCP Website Hosting Setup', provider: 'GCP', price: 13000, description: 'Deploy and host your website on GCP.', image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80' },
  { id: 23, name: 'GCP Backup & Recovery', provider: 'GCP', price: 23000, description: 'Reliable backup and disaster recovery planning.', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80' },
  { id: 24, name: 'GCP Monitoring Setup', provider: 'GCP', price: 19000, description: 'Logging, monitoring, and alerting for apps.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' },

  { id: 25, name: 'Website Hosting Setup', provider: 'Budget', price: 1500, description: 'Low-cost hosting setup for small businesses in Pakistan.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80' },
  { id: 26, name: 'Basic Email Setup', provider: 'Budget', price: 2000, description: 'Professional business email configuration and support.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' },
  { id: 27, name: 'Small Server Backup Plan', provider: 'Budget', price: 2500, description: 'Affordable backup plan for data safety.', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80' },
  { id: 28, name: 'Domain & DNS Configuration', provider: 'Budget', price: 3000, description: 'Get your domain connected and live quickly.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80' },
  { id: 29, name: 'Cloud Consultation', provider: 'Budget', price: 4500, description: 'One-hour consultation for cloud planning and guidance.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
  { id: 30, name: 'Security Health Check', provider: 'Budget', price: 5000, description: 'Basic security review for your cloud setup.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
  { id: 31, name: 'WordPress Hosting Assist', provider: 'Budget', price: 1800, description: 'Simple WordPress deployment help.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80' },
  { id: 32, name: 'Business Landing Page Setup', provider: 'Budget', price: 3500, description: 'One-page business site launch support.', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80' },
  { id: 33, name: 'SSL Certificate Installation', provider: 'Budget', price: 2200, description: 'Secure your website with HTTPS.', image: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80' },
  { id: 34, name: 'Email Migration Help', provider: 'Budget', price: 3200, description: 'Move your email to a new platform safely.', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80' },
  { id: 35, name: 'Basic IT Support Package', provider: 'Budget', price: 4000, description: 'Starter remote support for small teams.', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80' },
  { id: 36, name: 'Cloud Training Session', provider: 'Budget', price: 4800, description: 'Introductory cloud training for your staff.', image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80' },
  { id: 37, name: 'Database Backup Setup', provider: 'Budget', price: 2700, description: 'Basic database backup configuration.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80' },
  { id: 38, name: 'Server Cleanup & Audit', provider: 'Budget', price: 2400, description: 'Quick review and cleanup of your server setup.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80' },
  { id: 39, name: 'Office Network Setup', provider: 'Budget', price: 3900, description: 'Small office network planning and installation help.', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80' },
  { id: 40, name: 'Monthly Support Plan', provider: 'Budget', price: 5000, description: 'Affordable monthly support for startups.', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
];

const categories = ['All', 'AWS', 'Azure', 'GCP', 'Budget'];
const money = (value) => `PKR ${value.toLocaleString('en-PK')}`;
const load = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };

function App() {
  const [users, setUsers] = useState(() => load('ht_users', []));
  const [currentUser, setCurrentUser] = useState(() => load('ht_currentUser', null));
  const [cart, setCart] = useState(() => load('ht_cart', []));
  const [provider, setProvider] = useState('All');
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const saveUsers = (next) => { setUsers(next); localStorage.setItem('ht_users', JSON.stringify(next)); };
  const saveCurrentUser = (next) => { setCurrentUser(next); localStorage.setItem('ht_currentUser', JSON.stringify(next)); };
  const saveCart = (next) => { setCart(next); localStorage.setItem('ht_cart', JSON.stringify(next)); };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    const next = existing ? cart.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item) : [...cart, { ...product, qty: 1 }];
    saveCart(next);
    navigate('/cart');
  };

  const updateQty = (id, qty) => saveCart(cart.map((item) => item.id === id ? { ...item, qty: Math.max(1, qty) } : item));
  const removeItem = (id) => saveCart(cart.filter((item) => item.id !== id));
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);
  const filteredProducts = products.filter((p) => (provider === 'All' || p.provider === provider) && `${p.name} ${p.description} ${p.provider}`.toLowerCase().includes(query.toLowerCase()));
  const checkout = () => { if (!currentUser) return navigate('/login'); saveCart([]); navigate('/success'); };

  return <div className="app-shell">
    <div className="ambient-art" aria-hidden="true"><span className="watermark-cloud cloud-left"></span><span className="watermark-cloud cloud-right"></span><span className="watermark-platform"></span><span className="watermark-galaxy"><i></i><b></b><em></em></span></div>
    <header className="topbar">
      <Link to="/" className="brand"><Logo /></Link>
      <nav className="main-nav">
        <NavLink to="/" end>Services</NavLink>
        <NavLink to="/about">About us</NavLink>
        <NavLink to="/contact" className="nav-contact">Contact</NavLink>
        <NavLink to="/cart" className="nav-cart"><span>Cart</span><b>{cart.length}</b></NavLink>
        {currentUser ? <button className="linkbtn" onClick={() => { saveCurrentUser(null); navigate('/'); }}>Logout</button> : <NavLink to="/login" className="nav-login">Login</NavLink>}
      </nav>
    </header>

    <Routes>
      <Route path="/" element={<Home provider={provider} setProvider={setProvider} query={query} setQuery={setQuery} filteredProducts={filteredProducts} addToCart={addToCart} />} />
      <Route path="/login" element={<AuthPage mode="login" users={users} saveUsers={saveUsers} saveCurrentUser={saveCurrentUser} />} />
      <Route path="/register" element={<AuthPage mode="register" users={users} saveUsers={saveUsers} saveCurrentUser={saveCurrentUser} />} />
      <Route path="/cart" element={<CartPage cart={cart} updateQty={updateQty} removeItem={removeItem} subtotal={subtotal} />} />
      <Route path="/checkout" element={<Protected currentUser={currentUser}><CheckoutPage currentUser={currentUser} cart={cart} subtotal={subtotal} onCheckout={checkout} /></Protected>} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <Footer />
  </div>;
}

const Home = ({ provider, setProvider, query, setQuery, filteredProducts, addToCart }) => (
  <main>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow">Cloud, simplified</span><h1>Cloud Services for AWS, Azure, and GCP</h1><p>Affordable cloud and budget-friendly services for customers in Pakistan.</p><div className="hero-providers"><span><ProviderLogo provider="AWS" />AWS</span><span><ProviderLogo provider="Azure" />Azure</span><span><ProviderLogo provider="GCP" />Google Cloud</span></div></div>
      <div className="cloud-visual" aria-label="DEVIXA SOLUTIONS cloud services"><div className="cloud-orbit orbit-one"></div><div className="cloud-orbit orbit-two"></div><div className="cloud-core"><span>DEVIXA</span><strong>SOLUTIONS</strong></div><i className="cloud-dot dot-one"><ProviderLogo provider="AWS" /></i><i className="cloud-dot dot-two"><ProviderLogo provider="Azure" /></i><i className="cloud-dot dot-three"><ProviderLogo provider="GCP" /></i></div>
    </section>
    <section className="toolbar">
      <label className="search-box"><span className="search-icon" aria-hidden="true"></span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services" aria-label="Search services" /></label>
      <div className="tabs">{categories.map((c) => <button key={c} className={`${c === provider ? 'active ' : ''}${c !== 'All' ? `provider-tab ${c.toLowerCase()}` : ''}`} onClick={() => setProvider(c)}>{c !== 'All' && <ProviderLogo provider={c} />}{c}</button>)}</div>
    </section>
    <section className="grid">{filteredProducts.map((p) => <article key={p.id} className="card"><img src={p.image} alt={p.name} className="product-image" /><span className="card-provider"><ProviderLogo provider={p.provider} />{p.provider}</span><h3>{p.name}</h3><p>{p.description}</p><strong>{money(p.price)}</strong><button className={`provider-button ${p.provider.toLowerCase()}`} onClick={() => addToCart(p)}>Add to cart</button></article>)}</section>
  </main>
);

const AuthPage = ({ mode, users, saveUsers, saveCurrentUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = (e) => {
    e.preventDefault();
    if (mode === 'register') {
      if (users.some((u) => u.email === email)) return alert('User already exists');
      saveUsers([...users, { email, password }]); saveCurrentUser({ email }); navigate('/checkout');
    } else {
      const user = users.find((u) => u.email === email && u.password === password); if (!user) return alert('Invalid login');
      saveCurrentUser({ email }); navigate('/checkout');
    }
  };
  return <form className="auth" onSubmit={submit}><h2>{mode === 'login' ? 'Login' : 'Register'}</h2><input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><button type="submit">{mode}</button><p><Link to={mode === 'login' ? '/register' : '/login'}>{mode === 'login' ? 'Need an account?' : 'Already have an account?'}</Link></p></form>;
};

const CartPage = ({ cart, updateQty, removeItem, subtotal }) => {
  const navigate = useNavigate();

  return (
    <main className="panel cart-panel">
      <div className="cart-heading"><div><span className="eyebrow">Your selection</span><h2>Your Cart</h2></div><span className="cart-count">{cart.length} {cart.length === 1 ? 'service' : 'services'}</span></div>

      {cart.length === 0 ? (
        <div className="empty-cart"><span className="empty-cart-icon">+</span><h3>Your cart is waiting</h3><p>Browse our cloud services and add a solution to get started.</p><Link to="/" className="about-action">Explore services <span aria-hidden="true">↗</span></Link></div>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div key={item.id} className="cartrow">
              <img src={item.image} alt={item.name} className="cart-image" />

              <div className="cart-details">
                <span className="cart-provider"><ProviderLogo provider={item.provider} />{item.provider}</span>
                <strong>{item.name}</strong>
                <div className="cart-description">{item.description}</div>
                <div className="cart-price">{money(item.price)} <small>per service</small></div>
              </div>

              <div className="cart-actions">
                <div className="cart-qty"><button aria-label={`Decrease quantity of ${item.name}`} onClick={() => updateQty(item.id, item.qty - 1)}>-</button><span>{item.qty}</span><button aria-label={`Increase quantity of ${item.name}`} onClick={() => updateQty(item.id, item.qty + 1)}>+</button></div>
                <button className="remove-button" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cart-summary"><div><span>Estimated total</span><strong>{money(subtotal)}</strong></div><button disabled={!cart.length} onClick={() => navigate('/checkout')}>Proceed to checkout <span aria-hidden="true">→</span></button></div>
    </main>
  );
};

const Protected = ({ currentUser, children }) => currentUser ? children : <Navigate to="/login" replace />;

const providerIcons = { AWS: awsLogo, Azure: azureLogo, GCP: gcpLogo };
const ProviderLogo = ({ provider }) => {
  const iconSource = providerIcons[provider];
  return iconSource ? <img className={`provider-logo ${provider.toLowerCase()}`} src={iconSource} alt={`${provider} logo`} /> : <span className="provider-fallback" aria-hidden="true">+</span>;
};

const CheckoutPage = ({ currentUser, cart, subtotal, onCheckout }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [cardholder, setCardholder] = useState('');
  const [card, setCard] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentTouched, setPaymentTouched] = useState(false);
  const cardDigits = card.replace(/\D/g, '');
  const expiryIsValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
  const expiryMonthEntered = expiry.length >= 2;
  const cardIsValid = cardDigits.length >= 13 && cardDigits.length <= 19;
  const cvvIsValid = /^\d{3,4}$/.test(cvv);
  const paymentIsValid = cardIsValid && expiryIsValid && cvvIsValid;
  return (
    <main className="checkout-page">
      <section className="checkout-form panel">
        <div className="checkout-heading"><span className="eyebrow">Secure checkout</span><h1>Billing details</h1><p>Signed in as {currentUser.email}</p></div>
        <div className="checkout-fields">
          <label>Full name<input placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} required /></label>
          <label>Email address<input type="email" value={currentUser.email} readOnly /></label>
          <label>Contact number<input type="tel" placeholder="+92 300 0000000" value={phone} onChange={(e) => setPhone(e.target.value)} required /></label>
          <label className="field-wide">Billing address<input placeholder="Street address, office or house number" value={address} onChange={(e) => setAddress(e.target.value)} required /></label>
          <label>City<input placeholder="Islamabad" value={city} onChange={(e) => setCity(e.target.value)} required /></label>
          <label>Cardholder name<input placeholder="Name as shown on card" value={cardholder} onChange={(e) => setCardholder(e.target.value)} required /></label>
          <label className="field-wide">Card number<span className="card-input"><input className={paymentTouched && !cardIsValid ? 'input-error' : ''} placeholder="Card number" inputMode="numeric" maxLength="19" value={card} onChange={(e) => setCard(e.target.value)} onBlur={() => setPaymentTouched(true)} required /><span className="card-brands" aria-label="Visa and Mastercard accepted"><b className="visa-mark">VISA</b><b className="mastercard-mark"><i></i><i></i></b></span></span>{paymentTouched && !cardIsValid && <small className="validation-error">Enter a valid card number.</small>}</label>
          <label>Expiry date<input className={(paymentTouched || expiryMonthEntered) && !expiryIsValid ? 'input-error' : ''} placeholder="MM/YY" inputMode="numeric" maxLength="5" value={expiry} onChange={(e) => { const digits = e.target.value.replace(/\D/g, '').slice(0, 4); setExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits); }} onBlur={() => setPaymentTouched(true)} required />{(paymentTouched || expiryMonthEntered) && !expiryIsValid && <small className="validation-error">Month must be between 01 and 12.</small>}</label>
          <label>CVV / CVC<input className={paymentTouched && !cvvIsValid ? 'input-error' : ''} type="password" placeholder="3 or 4 digits" inputMode="numeric" maxLength="4" value={cvv} onChange={(e) => setCvv(e.target.value)} onBlur={() => setPaymentTouched(true)} required />{paymentTouched && !cvvIsValid && <small className="validation-error">Enter 3 or 4 digits.</small>}</label>
        </div>
        <div className="checkout-actions"><button onClick={() => { setPaymentTouched(true); if (paymentIsValid) onCheckout(); }} disabled={!cart.length || !name || !phone || !address || !city || !cardholder || !paymentIsValid}>Place order <span aria-hidden="true">→</span></button><button className="secondary" onClick={() => navigate('/cart')}>Back to cart</button></div>
      </section>
      <aside className="order-summary panel"><div className="summary-heading"><span className="eyebrow">Your order</span><h2>What you're buying</h2></div><div className="checkout-items">{cart.map((item) => <div className="checkout-item" key={item.id}><img src={item.image} alt={item.name} /><div><strong>{item.name}</strong><span><ProviderLogo provider={item.provider} />{item.provider} · Qty {item.qty}</span></div><b>{money(item.price * item.qty)}</b></div>)}</div><div className="checkout-total"><span>Total</span><strong>{money(subtotal)}</strong></div><p className="summary-note">Your service details will be confirmed after your order is placed.</p></aside>
    </main>
  );
};

const SuccessPage = () => <main className="panel success"><div className="celebration" aria-hidden="true"><span className="confetti confetti-one"></span><span className="confetti confetti-two"></span><span className="confetti confetti-three"></span><span className="confetti confetti-four"></span><span className="firework firework-one"></span><span className="firework firework-two"></span><span className="success-mark">✓</span></div><span className="eyebrow">Thank you for choosing Devixa</span><h2>Congratulations!</h2><p>Your order has been placed successfully. We are excited to help your business move forward.</p><Link to="/">Continue shopping <span aria-hidden="true">→</span></Link></main>;

const Logo = () => <><img className="logo-image" src={devixaLogo} alt="" /><span className="logo-wordmark">DEVIXA <small>SOLUTIONS</small></span></>;

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-content">
      <div className="footer-brand"><Link to="/" className="brand"><Logo /></Link><p>Practical cloud solutions for growing businesses.</p><small>DEVIXA SOLUTIONS (SMC_PRIVATE) LIMITED</small></div>
      <div className="footer-column"><strong>Explore</strong><Link to="/">Services</Link><Link to="/about">About us</Link><Link to="/contact">Contact us</Link><Link to="/cart">Your cart</Link></div>
      <div className="footer-column footer-contact"><strong>Get in touch</strong><a href="mailto:solutions.devixa@gmail.com">solutions.devixa@gmail.com</a><a href="tel:+923274782302">+92-327-4782302</a><a href="tel:+923074750990">+92-307-4750990</a></div>
      <div className="footer-column footer-address"><strong>Visit us</strong><span>Office No. 17, First Floor, Khyber 03 Plaza, G-15 Markaz, Islamabad</span></div>
    </div>
    <div className="footer-bottom"><span>© 2026 DEVIXA SOLUTIONS</span><span>Cloud services, made clear.</span></div>
  </footer>
);

const AboutPage = () => (
  <main className="about-page">
    <section className="about-hero">
      <div>
        <span className="eyebrow">About us</span>
        <h1>Technology that helps businesses move forward.</h1>
      </div>
      <p>DEVIXA SOLUTIONS (SMC_PRIVATE) LIMITED is built on a simple belief: powerful technology should be practical, approachable, and within reach of every growing business.</p>
    </section>

    <section className="founder-section">
      <div className="founder-badge" aria-hidden="true">MH</div>
      <div className="founder-copy">
        <span className="eyebrow">Meet the founder</span>
        <h2>Muhammad Husnain Dev</h2>
        <p className="founder-role">Founder / Managing Director</p>
        <p>Since 2020, I have been building DEVIXA SOLUTIONS with a clear purpose: to make dependable cloud services and technology guidance easier for businesses to understand and use.</p>
        <p>My work brings together a practical mindset, a passion for modern infrastructure, and a commitment to helping customers choose solutions that genuinely fit their goals. Every service is shaped around clarity, value, and long-term progress.</p>
      </div>
      <div className="about-stats"><div><strong>2020</strong><span>Founded</span></div><div><strong>40+</strong><span>Services</span></div><div><strong>3</strong><span>Cloud platforms</span></div></div>
    </section>

    <section className="about-values">
      <span className="eyebrow">Our approach</span>
      <h2>Clear advice. Reliable solutions. Real momentum.</h2>
      <p>From cloud architecture and security to hosting and everyday IT support, we help turn complex technology decisions into confident next steps.</p>
      <Link to="/contact" className="about-action">Start a conversation <span aria-hidden="true">↗</span></Link>
    </section>
  </main>
);

const ContactPage = () => {
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main className="contact-page">
      <section className="contact-intro">
        <span className="eyebrow">Let's talk cloud</span>
        <h1>Have a project in mind?</h1>
        <p>Tell us what you are building, and our team will help you find the right cloud solution.</p>
        <div className="contact-details">
          <div><strong>Email</strong><a href="mailto:solutions.devixa@gmail.com">solutions.devixa@gmail.com</a></div>
          <div><strong>Contact Number</strong><a href="tel:+923274782302">+92-327-4782302</a><a href="tel:+923074750990">+92-307-4750990</a></div>
          <div><strong>Office Address</strong><span>Office No. 17, First Floor, Khyber 03 Plaza, G-15 Markaz, Islamabad</span></div>
          <div><strong>Availability</strong><span>Mon - Sat, 9:00 AM - 6:00 PM</span></div>
        </div>
      </section>

      <form className="contact-form" onSubmit={submit}>
        {sent ? (
          <div className="contact-success"><span className="success-mark">✓</span><h2>Message received</h2><p>Thanks for reaching out. We will get back to you soon.</p><button type="button" onClick={() => setSent(false)}>Send another message</button></div>
        ) : (
          <>
            <div className="form-heading"><span className="eyebrow">Contact us</span><h2>Start a conversation</h2></div>
            <label>Name<input type="text" placeholder="Your full name" required /></label>
            <label>Email<input type="email" placeholder="you@company.com" required /></label>
            <label>How can we help?<textarea placeholder="Tell us a little about your needs..." rows="5" required /></label>
            <button type="submit">Send message <span aria-hidden="true">↗</span></button>
          </>
        )}
      </form>
    </main>
  );
};

export default App;
