import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting registration for:', { email, username });
      
      // Önce kullanıcının daha önce kayıt olup olmadığını kontrol et
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .maybeSingle();
        
      if (existingUser) {
        console.log('User already exists with this email:', email);
        toast.error('Bu e-posta adresi ile daha önceden kayıt olunmuş. Lütfen giriş yapın veya farklı bir e-posta adresi kullanın.');
        setLoading(false);
        return;
      }
      
      // Kullanıcı adının benzersiz olup olmadığını kontrol et
      const { data: existingUsername, error: usernameError } = await supabase
        .from('users')
        .select('username')
        .eq('username', username)
        .maybeSingle();
        
      if (existingUsername) {
        console.log('Username already exists:', username);
        toast.error('Bu kullanıcı adı zaten kullanılıyor. Lütfen farklı bir kullanıcı adı seçin.');
        setLoading(false);
        return;
      }
      
      // Ayrıca auth sisteminde de e-posta kontrolü yapalım
      const { data: authUser, error: authCheckError } = await supabase.auth.signInWithPassword({
        email,
        password: 'dummy-password-for-check' // Gerçek şifre olmadığı için giriş başarısız olacak, ama e-posta var mı kontrolü yapılacak
      });
      
      if (authCheckError && !authCheckError.message.includes('Invalid login credentials')) {
        // "Invalid login credentials" dışında bir hata varsa, e-posta zaten kayıtlı olabilir
        console.log('Email might already exist in auth system:', authCheckError);
        toast.error('Bu e-posta adresi ile ilgili bir sorun var. Lütfen farklı bir e-posta adresi kullanın.');
        setLoading(false);
        return;
      }
      
      // 1. Kullanıcı kaydı oluştur
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: `${firstName} ${lastName}`,
            username: username,
            is_active: true
          }
        }
      });

      if (authError) {
        console.error('Registration error:', authError);
        
        if (authError.message.includes('already registered')) {
          toast.error('Bu e-posta adresi ile daha önceden kayıt olunmuş. Lütfen giriş yapın veya farklı bir e-posta adresi kullanın.');
        } else {
          toast.error(`Kayıt hatası: ${authError.message}`);
        }
        setLoading(false);
        return;
      }

      if (authData.user) {
        console.log('Registration successful:', authData.user.id);
        toast.success('Kayıt başarılı!');
        onClose();
        // Kayıt başarılı olduğunda kategori sayfasına yönlendir
        navigate('/categories');
      }
    } catch (error) {
      console.error('Unexpected registration error:', error);
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-logo">
            <img src="/logo500.png" alt="Lingovera Logo" className="logo" />
            <span className="brand-name">Lingovera</span>
          </div>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <h2 className="modal-title">Kayıt Ol</h2>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Ad</label>
                <input 
                  type="text" 
                  id="firstName" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  placeholder="Adınızı girin"
                  required
                  disabled={loading}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Soyad</label>
                <input 
                  type="text" 
                  id="lastName" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  placeholder="Soyadınızı girin"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="username">Kullanıcı Adı</label>
              <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Kullanıcı adınızı girin"
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">E-posta</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="E-posta adresinizi girin"
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Şifre</label>
              <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Şifrenizi girin"
                required
                disabled={loading}
                minLength={6}
              />
            </div>
            
            <div className="form-actions">
              <small className="terms-text">
                Kayıt olarak <a href="#terms">Kullanım Şartları</a> ve <a href="#privacy">Gizlilik Politikası</a>'nı kabul etmiş olursunuz.
              </small>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;