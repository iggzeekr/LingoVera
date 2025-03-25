import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Attempting login with:', { email });
      
      // 1. Supabase Auth ile giriş yap
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        
        // Daha açıklayıcı hata mesajları
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Geçersiz e-posta veya şifre. Lütfen bilgilerinizi kontrol edin.');
          
          // Kullanıcının kayıtlı olup olmadığını kontrol et
          try {
            const { data: existingUser, error: checkError } = await supabase
              .from('users')
              .select('email')
              .eq('email', email)
              .maybeSingle();
              
            if (!existingUser && !checkError) {
              toast.error('Bu e-posta adresi ile kayıtlı bir kullanıcı bulunamadı. Lütfen önce kayıt olun.');
            }
          } catch (checkErr) {
            console.error('Error checking if user exists:', checkErr);
          }
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('E-posta adresiniz henüz doğrulanmamış. Lütfen e-postanızı kontrol edin.');
        } else {
          toast.error(`Giriş hatası: ${error.message}`);
        }
        return;
      }

      if (data.user) {
        console.log('Login successful:', data.user.id);
        
        // 2. Kullanıcı bilgilerini users tablosundan çek
        try {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single();
            
          if (userError) {
            console.error('Error fetching user data:', userError);
            // Kullanıcı verileri çekilemese bile giriş başarılı
            toast.success('Başarıyla giriş yapıldı!');
          } else if (userData) {
            console.log('User data fetched successfully:', userData);
            toast.success(`Hoş geldiniz, ${userData.username || userData.full_name}!`);
          } else {
            console.warn('User exists in Auth but not in users table');
            
            // Kullanıcı Auth'da var ama users tablosunda yoksa, users tablosuna ekle
            try {
              const { error: insertError } = await supabase
                .from('users')
                .insert([
                  {
                    id: data.user.id,
                    email: data.user.email,
                    username: data.user.email?.split('@')[0] || 'user',
                    full_name: data.user.user_metadata?.full_name || '',
                    is_active: true,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                  }
                ]);
                
              if (insertError) {
                console.error('Error creating missing user profile:', insertError);
              } else {
                console.log('Created missing user profile');
              }
            } catch (insertErr) {
              console.error('Unexpected error creating missing profile:', insertErr);
            }
            
            toast.success('Başarıyla giriş yapıldı!');
          }
        } catch (userDataErr) {
          console.error('Unexpected error fetching user data:', userDataErr);
          toast.success('Başarıyla giriş yapıldı!');
        }
        
        // Başarılı giriş sonrası anasayfaya (test) yönlendir
        navigate('/');
        onClose();
      }
    } catch (error) {
      console.error('Unexpected error during login:', error);
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error('Lütfen e-posta adresinizi girin');
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi');
    } catch (error) {
      toast.error('Bir hata oluştu. Lütfen tekrar deneyin.');
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
          <h2 className="modal-title">Giriş Yap</h2>
          
          <form onSubmit={handleSubmit} className="login-form">
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
              />
            </div>
            
            <div className="form-actions">
              <a href="#" onClick={handleForgotPassword} className="forgot-password">
                Şifremi unuttum
              </a>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'} <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 