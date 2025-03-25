import React, { useEffect, useState } from 'react';
import { FaChalkboardTeacher, FaLanguage, FaUserGraduate } from 'react-icons/fa';
import { supabase } from '../lib/supabase';

interface TeacherCardProps {
  name: string;
  specialty: string;
  description: string;
  icon: React.ReactNode;
  imageUrl?: string;
  avatar_url?: string;
}

interface Teacher {
  id: string;
  name: string;
  avatar_url: string;
  accent: string;
  personality: string;
  teaching_style: string;
  created_at: string;
  is_active: boolean;
}

// Create a common interface for both Supabase teachers and default teachers
interface TeacherCardData {
  name: string;
  specialty: string;
  description: string;
  icon: React.ReactNode;
  avatar_url?: string;
  id?: string; // Add id for sorting
}

const TeacherCard: React.FC<TeacherCardProps> = ({ name, specialty, description, icon, imageUrl, avatar_url }) => {
  return (
    <div className="teacher-card">
      <div className="teacher-card-inner">
        <div className="teacher-card-front">
          <div className="teacher-avatar">
            {avatar_url ? (
              <img src={avatar_url} alt={name} className="teacher-image" />
            ) : (
              <div className="teacher-icon-placeholder">{icon}</div>
            )}
          </div>
          <h3 className="teacher-name">{name}</h3>
          <p className="teacher-specialty">{specialty}</p>
        </div>
        <div className="teacher-card-back">
          <div className="teacher-icon">{icon}</div>
          <h3 className="teacher-name">{name}</h3>
          <p className="teacher-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

const TeachersSection: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data, error } = await supabase
          .from('teachers')
          .select('*')
          .eq('is_active', true)
          .order('id', { ascending: true }); // Order by id to keep consistent order

        if (error) {
          throw error;
        }

        if (data) {
          console.log('Fetched teachers:', data);
          setTeachers(data);
        }
      } catch (err) {
        console.error('Error fetching teachers:', err);
        setError('Öğretmen bilgileri yüklenirken bir hata oluştu.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  // Map teacher data to teacher card props
  const teacherCards: TeacherCardData[] = teachers.map(teacher => ({
    id: teacher.id,
    name: teacher.name,
    specialty: teacher.teaching_style,
    description: teacher.personality,
    icon: <FaChalkboardTeacher />,
    avatar_url: teacher.avatar_url
  }));

  // Default teachers in case no data is loaded
  const defaultTeachers: TeacherCardData[] = [
    {
      id: '0',
      name: 'AI Öğretmen',
      specialty: 'Dil Eğitimi',
      description: 'Kişiselleştirilmiş dil eğitimi deneyimi sunar.',
      icon: <FaChalkboardTeacher />,
      avatar_url: undefined // Explicitly set to undefined
    }
  ];

  return (
    <section className="teachers-section">
      <div className="container">
        <h2 className="section-title">Yapay Zeka Öğretmenlerimiz</h2>
        <p className="section-subtitle">
          Dil öğrenme yolculuğunuzda size rehberlik edecek uzman AI öğretmenlerimizle tanışın.
          Her biri kendi alanında uzmanlaşmış ve size en iyi öğrenme deneyimini sunmak için tasarlanmıştır.
        </p>
        
        {loading && <p className="loading-message">Öğretmenler yükleniyor...</p>}
        {error && <p className="error-message">{error}</p>}
        
        <div className="teachers-grid">
          {!loading && !error && (teacherCards.length > 0 ? teacherCards : defaultTeachers).map((teacher, index) => (
            <TeacherCard
              key={teacher.id || index} // Use id as key if available
              name={teacher.name}
              specialty={teacher.specialty}
              description={teacher.description}
              icon={teacher.icon}
              avatar_url={teacher.avatar_url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeachersSection;
