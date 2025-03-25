import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import '../styles/SpeakWritePage.css';
import { DarkModeContext } from '../App';
import logoImage from '../assets/images/logo.png';

// TypeScript Interfaces
interface Teacher {
  id: string;
  name: string;
  accent: string;
  avatar_url: string;
  description: string;
  personality_traits?: string[];
  teaching_style?: string;
  specializations?: string[];
  voice_id?: string;
}

interface Message {
  id: string;
  session_id: string;
  teacher_id: string;
  message_text: string;
  audio_url?: string;
  is_user_message: boolean;
  created_at: string;
  teachers?: {
    name: string;
    avatar_url: string;
  };
}

interface Session {
  id: string;
  user_id: string;
  teacher_id: string;
  category_id: string;
  subcategory_id: string;
  start_time: string;
  end_time?: string;
  duration?: number;
  background_url?: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon_url?: string;
}

interface Subcategory {
  id: string;
  name: string;
  description: string;
  category_id: string;
  difficulty_level: string;
}

interface Vocabulary {
  id: string;
  word: string;
  translation: string;
  example_sentence?: string;
  category_id?: string;
}

interface UserVocabulary {
  id: string;
  user_id: string;
  vocabulary_id: string;
  proficiency_level: number;
  last_practiced: string;
}

interface Feedback {
  id: string;
  session_id: string;
  pronunciation_score?: number;
  grammar_score?: number;
  fluency_score?: number;
  vocabulary_score?: number;
  overall_score: number;
  suggestions?: string;
  created_at: string;
}

interface AssessmentQuestion {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  difficulty_level: string;
}

// DarkModeContext tipi
interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SpeakWritePage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext as React.Context<DarkModeContextType>);
  
  // State
  const [session, setSession] = useState<Session | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategory, setSubcategory] = useState<Subcategory | null>(null);
  const [availableTeachers, setAvailableTeachers] = useState<Teacher[]>([]);
  const [userVocabulary, setUserVocabulary] = useState<UserVocabulary[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showTeacherSelection, setShowTeacherSelection] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [assessmentQuestions, setAssessmentQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showQuestion, setShowQuestion] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Session verilerini yükle
  useEffect(() => {
    const loadSessionData = async () => {
      if (!sessionId) return;
      
      try {
        setIsLoading(true);
        
        // Oturum verilerini çek
        const { data: sessionData, error: sessionError } = await supabase
          .from('learning_sessions')
          .select('*')
          .eq('id', sessionId)
          .single();
          
        if (sessionError) {
          console.error('Session error:', sessionError);
          // Hata durumunda localStorage'dan veri almayı dene
          const storedSubcategory = localStorage.getItem('selectedSubcategory');
          
          if (storedSubcategory) {
            const parsedSubcategory = JSON.parse(storedSubcategory);
            
            console.log('Using stored subcategory:', parsedSubcategory);
            
            // Alt kategori bilgisini ayarla
            setSubcategory(parsedSubcategory);
            
            // Alt kategoriye ait kategoriyi çek
            if (parsedSubcategory.category_id) {
              const { data: categoryData, error: categoryError } = await supabase
                .from('categories')
                .select('*')
                .eq('id', parsedSubcategory.category_id)
                .single();
                
              if (!categoryError && categoryData) {
                console.log('Found category from subcategory:', categoryData);
                setCategory(categoryData);
              } else {
                console.log('Using mock category data');
                // Kategori bilgisi yoksa varsayılan değer kullan
                const mockCategory = {
                  id: parsedSubcategory.category_id || 'cat-1',
                  name: 'Günlük Konuşmalar',
                  description: 'Günlük hayatta karşılaşabileceğiniz konuşma senaryoları',
                  icon_url: '/icons/daily.png'
                };
                setCategory(mockCategory);
              }
            }
            
            // Session mock verisi
            const mockSession = {
              id: sessionId,
              user_id: 'user-1',
              teacher_id: 'teacher-1',
              category_id: parsedSubcategory.category_id || 'cat-1',
              subcategory_id: parsedSubcategory.id || 'subcat-1',
              start_time: new Date().toISOString(),
            };
            
            setSession(mockSession);
          } else {
            // Hiç veri yoksa varsayılan değerler kullan
            const mockCategory = {
              id: 'cat-1',
              name: 'Günlük Konuşmalar',
              description: 'Günlük hayatta karşılaşabileceğiniz konuşma senaryoları',
              icon_url: '/icons/daily.png'
            };
            
            const mockSubcategory = {
              id: 'subcat-1',
              name: 'Seyahat',
              description: 'Seyahat ederken kullanabileceğiniz ifadeler',
              category_id: 'cat-1',
              difficulty_level: 'Orta'
            };
            
            setCategory(mockCategory);
            setSubcategory(mockSubcategory);
            
            // Session mock verisi
            const mockSession = {
              id: sessionId,
              user_id: 'user-1',
              teacher_id: 'teacher-1',
              category_id: mockCategory.id,
              subcategory_id: mockSubcategory.id,
              start_time: new Date().toISOString(),
            };
            
            setSession(mockSession);
          }
        } else {
          setSession(sessionData);
          
          // Kategori ve alt kategori verilerini çek
          const { data: categoryData, error: categoryError } = await supabase
            .from('categories')
            .select('*')
            .eq('id', sessionData.category_id)
            .single();
            
          if (!categoryError) {
            setCategory(categoryData);
          }
          
          const { data: subcategoryData, error: subcategoryError } = await supabase
            .from('subcategories')
            .select('*')
            .eq('id', sessionData.subcategory_id)
            .single();
            
          if (!subcategoryError) {
            setSubcategory(subcategoryData);
          }
        }
        
        // Öğretmen verilerini çek
        const { data: teacherData, error: teacherError } = await supabase
          .from('teachers')
          .select('*')
          .eq('id', '13de5aab-db3b-4bb5-8b5c-370a8f79beb5') // Seval öğretmenin ID'si
          .single();
          
        console.log('Teacher data:', teacherData, teacherError);
          
        if (!teacherError && teacherData) {
          setTeacher(teacherData);
          // Tüm öğretmenleri listeye ekle
          const { data: allTeachers } = await supabase
            .from('teachers')
            .select('*')
            .order('name');
            
          if (allTeachers) {
            setAvailableTeachers(allTeachers);
          }
        } else {
          // Mock teacher data
          const mockTeacher = {
            id: 'teacher-1',
            name: 'Sarah Johnson',
            accent: 'Amerikan',
            avatar_url: '/teacher-avatar.png',
            description: 'Ana dili İngilizce olan 10 yıllık öğretmenlik deneyimine sahip eğitmen',
            personality_traits: ['Sabırlı', 'Enerjik', 'Detaycı'],
            teaching_style: 'İletişim odaklı',
            specializations: ['Günlük konuşma', 'İş İngilizcesi']
          };
          
          setTeacher(mockTeacher);
          
          // Mock available teachers
          const mockTeachers = [
            mockTeacher,
            {
              id: 'teacher-2',
              name: 'David Wilson',
              accent: 'İngiliz',
              avatar_url: '/david-avatar.png',
              description: 'Cambridge Üniversitesi mezunu, 8 yıllık deneyimli İngilizce öğretmeni',
              personality_traits: ['Analitik', 'Sistematik', 'Motive edici'],
              teaching_style: 'Gramer odaklı',
              specializations: ['Akademik İngilizce', 'TOEFL/IELTS']
            },
            {
              id: 'teacher-3',
              name: 'Emma Thompson',
              accent: 'Avustralya',
              avatar_url: '/emma-avatar.png',
              description: 'Eğlenceli ve interaktif öğretim tarzıyla 5 yıllık deneyime sahip',
              personality_traits: ['Eğlenceli', 'Yaratıcı', 'Esnek'],
              teaching_style: 'Aktivite odaklı',
              specializations: ['Günlük konuşma', 'Seyahat İngilizcesi']
            }
          ];
          
          setAvailableTeachers(mockTeachers);
        }
        
        // Mevcut konuşmaları çek
        console.log('Fetching conversations for session ID:', sessionId);
        console.log('Using fixed session ID: d5036e84-2693-40fd-8ec5-9e7f3efc2bb4');
        
        const { data: messagesData, error: messagesError } = await supabase
          .from('conversations')
          .select(`
            *
          `)
          .eq('session_id', 'd5036e84-2693-40fd-8ec5-9e7f3efc2bb4')
          .order('created_at', { ascending: true });
          
        console.log('Conversations query result:', messagesData, messagesError);
          
        if (!messagesError && messagesData && messagesData.length > 0) {
          console.log('Setting messages from database:', messagesData);
          // Mesajları is_user_message alanına göre dönüştür
          const formattedMessages = messagesData.map((msg: any) => ({
            ...msg,
            is_user_message: msg.is_user_message === true
          }));
          setMessages(formattedMessages);
          console.log('Formatted messages:', formattedMessages);
        } else {
          console.log('No messages found in database, using mock data');
          // Eğer veritabanından veri çekemediyse ve "Sipariş Verme" alt kategorisindeyse
          // hazır konuşma verilerini göster
          if (subcategory?.name === 'Sipariş Verme' && teacher) {
            const mockMessages: Message[] = [
              {
                id: '1',
                session_id: sessionId || '',
                teacher_id: teacher.id,
                message_text: 'Merhaba! Ben Seval, sizin İngilizce pratik partneriniz olacağım. Bugün bir restoranda sipariş verme senaryosu üzerinde çalışacağız. Hazır mısınız?',
                is_user_message: false,
                created_at: new Date().toISOString(),
                teachers: { name: teacher.name, avatar_url: teacher.avatar_url }
              },
              {
                id: '2',
                session_id: sessionId || '',
                teacher_id: teacher.id,
                message_text: 'Welcome to our restaurant! May I take your order?',
                is_user_message: false,
                created_at: new Date(Date.now() + 1000).toISOString(),
                teachers: { name: teacher.name, avatar_url: teacher.avatar_url }
              }
            ];
            setMessages(mockMessages);
          }
        }
        
        // Değerlendirme sorularını çek
        console.log('Fetching assessment questions');
        const { data: questionsData, error: questionsError } = await supabase
          .from('assessment_questions')
          .select('*')
          .eq('difficulty_level', 'A1')
          .limit(5);
          
        console.log('Assessment questions result:', questionsData, questionsError);
          
        if (!questionsError && questionsData && questionsData.length > 0) {
          console.log('Setting assessment questions from database:', questionsData);
          setAssessmentQuestions(questionsData);
        } else {
          console.log('No assessment questions found in database, using mock data');
          // Mock değerlendirme soruları
          const mockQuestions: AssessmentQuestion[] = [
            {
              id: '1',
              question_text: 'Which phrase is most appropriate when ordering food in a restaurant?',
              option_a: 'Give me a salad now',
              option_b: 'I want salad',
              option_c: 'I would like to order a salad, please',
              option_d: 'Salad for me',
              correct_option: 'c',
              difficulty_level: 'A1'
            },
            {
              id: '2',
              question_text: 'How would you ask for the bill in a restaurant?',
              option_a: 'Bill!',
              option_b: 'Could I have the bill, please?',
              option_c: 'I need to pay',
              option_d: 'Money now',
              correct_option: 'b',
              difficulty_level: 'A1'
            }
          ];
          setAssessmentQuestions(mockQuestions);
        }
        
      } catch (error) {
        console.error('Error loading session data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSessionData();
  }, [sessionId]);

  // Öğretmen değiştirme
  const handleChangeTeacher = async (newTeacherId: string) => {
    try {
      setIsProcessing(true);
      
      // Oturumu güncelle
      const { data, error } = await supabase
        .from('learning_sessions')
        .update({ teacher_id: newTeacherId })
        .eq('id', sessionId)
        .select()
        .single();
        
      if (error) {
        console.error('Error updating teacher:', error);
        // Hata durumunda mock implementation
        const selectedTeacher = availableTeachers.find(t => t.id === newTeacherId);
        if (selectedTeacher) {
          setTeacher(selectedTeacher);
        }
      } else if (data) {
        // Öğretmen verilerini çek
        const { data: teacherData, error: teacherError } = await supabase
          .from('teachers')
          .select('*')
          .eq('id', newTeacherId)
          .single();
          
        if (!teacherError && teacherData) {
          setTeacher(teacherData);
        }
      }
      
      // Yeni bir mesaj ekle
      const newMessage = {
        session_id: sessionId,
        teacher_id: newTeacherId,
        message_text: `Merhaba, ben ${teacher?.name || 'yeni öğretmeniniz'}. Bundan sonra sizinle ben çalışacağım. ${teacher?.teaching_style || 'Etkili'} bir yaklaşımla ilerleyeceğiz.`,
        is_user_message: false,
        created_at: new Date().toISOString(),
      };
      
      const { data: insertedMessage, error: insertError } = await supabase
        .from('conversations')
        .insert([newMessage])
        .select();
        
      if (!insertError && insertedMessage) {
        setMessages(prev => [...prev, ...insertedMessage]);
      } else {
        // Mock implementation
        const mockMessage: Message = {
          id: Date.now().toString(),
          session_id: sessionId!,
          teacher_id: newTeacherId,
          message_text: `Merhaba, ben ${teacher?.name || 'yeni öğretmeniniz'}. Bundan sonra sizinle ben çalışacağım. ${teacher?.teaching_style || 'Etkili'} bir yaklaşımla ilerleyeceğiz.`,
          is_user_message: false,
          created_at: new Date().toISOString(),
        };
        
        setMessages(prev => [...prev, mockMessage]);
      }
      
      setShowTeacherSelection(false);
    } catch (error) {
      console.error('Error changing teacher:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Mikrofon kontrolü
  const handleMicrophoneClick = async () => {
    if (isRecording) {
      stopRecording();
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        startRecording(stream);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }
  };

  const startRecording = (stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
      await handleAudioSubmission(audioBlob);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleAudioSubmission = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      // Kullanıcı mesajını ekle
      const userMessage = {
        id: 'temp-' + Date.now(),
        session_id: sessionId,
        teacher_id: teacher?.id || 'teacher-1',
        message_text: 'Audio message',
        is_user_message: true,
        created_at: new Date().toISOString(),
      };
      
      // Mesajı Supabase'e kaydet
      const { data: insertedUserMessage, error: userMessageError } = await supabase
        .from('conversations')
        .insert([userMessage])
        .select();
        
      if (!userMessageError && insertedUserMessage) {
        setMessages(prev => [...prev, ...insertedUserMessage]);
      } else {
        // Hata durumunda mock implementation
        const mockUserMessage: Message = {
          id: Date.now().toString(),
          session_id: sessionId!,
          teacher_id: teacher?.id!,
          message_text: 'Audio message',
          is_user_message: true,
          created_at: new Date().toISOString(),
        };
        
        setMessages(prev => [...prev, mockUserMessage]);
      }
      
      // TODO: Implement audio upload and processing
      // 1. Upload audio to storage
      // 2. Process speech-to-text
      // 3. Get AI response
      // 4. Generate audio response
      // 5. Update messages
      
      // Kategori ve alt kategoriye göre yanıt oluştur
      let responseText = '';
      
      if (subcategory) {
        if (subcategory.name === 'Tıbbi Durumlar') {
          responseText = 'Harika bir telaffuz! "I need medical assistance, I\'m having chest pain" cümlesini doğru söylediniz. Şimdi doktorun size ne söyleyebileceğini düşünelim.';
        } else if (subcategory.name === 'Alışveriş') {
          responseText = 'Harika bir telaffuz! "Can I see that item in the window?" cümlesini doğru söylediniz. Şimdi satıcının size ne söyleyebileceğini düşünelim.';
        } else {
          responseText = `Harika bir telaffuz! ${subcategory.name} konusunda iyi bir cümle kurdunuz. Devam edelim.`;
        }
      } else {
        responseText = 'Harika bir telaffuz! Doğru bir cümle kurdunuz. Devam edelim.';
      }
      
      // Öğretmen yanıtını oluştur
      const teacherResponse = {
        session_id: sessionId,
        teacher_id: teacher?.id || 'teacher-1',
        message_text: responseText,
        is_user_message: false,
        created_at: new Date().toISOString(),
      };
      
      // Biraz gecikme ekle (gerçek bir AI yanıtı gibi görünmesi için)
      setTimeout(async () => {
        // Mesajı Supabase'e kaydet
        const { data: insertedResponse, error: responseError } = await supabase
          .from('conversations')
          .insert([teacherResponse])
          .select();
          
        if (!responseError && insertedResponse) {
          setMessages(prev => [...prev, ...insertedResponse]);
        } else {
          // Hata durumunda mock implementation
          const mockResponse: Message = {
            id: (Date.now() + 1).toString(),
            session_id: sessionId!,
            teacher_id: teacher?.id!,
            message_text: responseText,
            is_user_message: false,
            created_at: new Date().toISOString(),
          };
          
          setMessages(prev => [...prev, mockResponse]);
        }
        
        setIsProcessing(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error processing audio:', error);
      setIsProcessing(false);
    }
  };

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;
    
    const newMessage: Message = {
      id: 'temp-' + Date.now(),
      session_id: sessionId || '',
      teacher_id: teacher?.id || '',
      message_text: textInput,
      is_user_message: true,
      created_at: new Date().toISOString()
    };
    
    setTextInput('');
    setIsProcessing(true);
    
    try {
      // Mesajı Supabase'e kaydet
      const { data: insertedUserMessage, error: userMessageError } = await supabase
        .from('conversations')
        .insert([newMessage])
        .select();
        
      if (!userMessageError && insertedUserMessage) {
        setMessages(prev => [...prev, ...insertedUserMessage]);
      } else {
        // Hata durumunda mock implementation
        const mockUserMessage: Message = {
          id: 'temp-' + Date.now(),
          session_id: sessionId!,
          teacher_id: teacher?.id!,
          message_text: textInput,
          is_user_message: true,
          created_at: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, mockUserMessage]);
      }
      
      // Kategori ve alt kategoriye göre yanıt oluştur
      let responseText = '';
      
      if (subcategory) {
        if (subcategory.name === 'Tıbbi Durumlar') {
          responseText = 'Çok güzel! "When did the symptoms start?" sorusuna doğru bir şekilde yanıt verdiniz. Doktor şimdi muayene etmek isteyecektir.';
        } else if (subcategory.name === 'Alışveriş') {
          responseText = 'Çok güzel! "How much does it cost?" sorusunu doğru bir şekilde kurdunuz. Satıcı size fiyatı söyleyecektir. Şimdi pazarlık etmek isterseniz ne söyleyebilirsiniz?';
        } else {
          responseText = `Çok güzel! ${subcategory.name} konusunda iyi bir cümle kurdunuz. Devam edelim.`;
        }
      } else {
        responseText = 'Çok güzel! Doğru bir cümle kurdunuz. Devam edelim.';
      }
      
      // Öğretmen yanıtını oluştur
      const teacherResponse = {
        session_id: sessionId,
        teacher_id: teacher?.id || 'teacher-1',
        message_text: responseText,
        is_user_message: false,
        created_at: new Date().toISOString(),
      };
      
      // Biraz gecikme ekle (gerçek bir AI yanıtı gibi görünmesi için)
      setTimeout(async () => {
        // Mesajı Supabase'e kaydet
        const { data: insertedResponse, error: responseError } = await supabase
          .from('conversations')
          .insert([teacherResponse])
          .select();
          
        if (!responseError && insertedResponse) {
          setMessages(prev => [...prev, ...insertedResponse]);
        } else {
          // Hata durumunda mock implementation
          const mockResponse: Message = {
            id: (Date.now() + 1).toString(),
            session_id: sessionId!,
            teacher_id: teacher?.id!,
            message_text: responseText,
            is_user_message: false,
            created_at: new Date().toISOString(),
          };
          
          setMessages(prev => [...prev, mockResponse]);
        }
        
        setIsProcessing(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error processing text:', error);
      setIsProcessing(false);
    }
  };

  const handlePlayAudio = async (audioUrl: string) => {
    try {
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleEndSession = async () => {
    try {
      setIsProcessing(true);
      
      const endTime = new Date().toISOString();
      const startTime = new Date(session?.start_time || '');
      const durationMs = new Date(endTime).getTime() - startTime.getTime();
      const durationMinutes = Math.floor(durationMs / 60000);
      
      // Oturumu güncelle
      const { error } = await supabase
        .from('learning_sessions')
        .update({ 
          end_time: endTime,
          duration: durationMinutes
        })
        .eq('id', sessionId);
        
      if (error) {
        console.error('Error updating session:', error);
      }
      
      // Kategori ve alt kategoriye göre geri bildirim oluştur
      let suggestions = '';
      let pronunciationScore = 85;
      let grammarScore = 90;
      let fluencyScore = 80;
      let vocabularyScore = 88;
      
      if (subcategory) {
        if (subcategory.name === 'Tıbbi Durumlar') {
          suggestions = 'Tıbbi terimler konusunda kelime dağarcığınızı geliştirmeniz gerekiyor. Acil durum ifadelerini daha akıcı kullanabilirsiniz. Telaffuzunuz oldukça iyi.';
          pronunciationScore = 88;
          grammarScore = 85;
          fluencyScore = 75;
          vocabularyScore = 70;
        } else if (subcategory.name === 'Alışveriş') {
          suggestions = 'Alışveriş diyaloglarında oldukça iyisiniz. Pazarlık ifadelerini daha çok pratik edebilirsiniz. Telaffuzunuz ve grameriniz çok iyi.';
          pronunciationScore = 90;
          grammarScore = 92;
          fluencyScore = 85;
          vocabularyScore = 88;
        } else {
          suggestions = `${subcategory.name} konusunda iyi bir performans gösterdiniz. Telaffuzunuz iyi, ancak akıcılık üzerinde biraz daha çalışabilirsiniz.`;
        }
      } else {
        suggestions = 'Telaffuzunuz iyi, ancak akıcılık üzerinde biraz daha çalışabilirsiniz.';
      }
      
      // Genel puanı hesapla
      const overallScore = Math.round((pronunciationScore + grammarScore + fluencyScore + vocabularyScore) / 4);
      
      // Geri bildirim oluştur
      const feedbackData = {
        session_id: sessionId,
        pronunciation_score: pronunciationScore,
        grammar_score: grammarScore,
        fluency_score: fluencyScore,
        vocabulary_score: vocabularyScore,
        overall_score: overallScore,
        suggestions: suggestions
      };
      
      // Geri bildirimi Supabase'e kaydet
      const { data: insertedFeedback, error: feedbackError } = await supabase
        .from('feedback')
        .insert([feedbackData])
        .select();
        
      if (!feedbackError && insertedFeedback) {
        setFeedback(insertedFeedback[0]);
      } else {
        // Hata durumunda mock implementation
        const mockFeedback: Feedback = {
          id: 'feedback-1',
          session_id: sessionId!,
          pronunciation_score: pronunciationScore,
          grammar_score: grammarScore,
          fluency_score: fluencyScore,
          vocabulary_score: vocabularyScore,
          overall_score: overallScore,
          suggestions: suggestions,
          created_at: new Date().toISOString()
        };
        
        setFeedback(mockFeedback);
      }
      
      setShowFeedback(true);
      
    } catch (error) {
      console.error('Error ending session:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBackToDashboard = () => {
    navigate('/categories');
  };

  const handleShowQuestion = () => {
    setShowQuestion(true);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const isCorrect = option === currentQuestion.correct_option;
    setIsAnswerCorrect(isCorrect);
    
    // Kullanıcı cevabını kaydet
    saveUserAnswer(currentQuestion.id, option, isCorrect);
  };

  const saveUserAnswer = async (questionId: string, selectedOption: string, isCorrect: boolean) => {
    try {
      const userAnswer = {
        user_id: session?.user_id || '78a1b01c-6ab1-439d-8bd2-b241e0c20484',
        question_id: questionId,
        selected_option: selectedOption.charAt(0).toLowerCase(),
        is_correct: isCorrect
      };
      
      const { error } = await supabase
        .from('user_answers')
        .insert([userAnswer]);
        
      if (error) {
        console.error('Error saving user answer:', error);
      }
    } catch (error) {
      console.error('Error saving user answer:', error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswerCorrect(null);
    } else {
      setShowQuestion(false);
      // Tüm sorular tamamlandı, geri bildirim göster
      handleEndSession();
    }
  };

  // Alt kategori adına göre özel öğretmen mesajı
  const getTeacherMessage = (subcategoryName: string) => {
    if (!subcategoryName) return '';
    
    switch(subcategoryName) {
      case 'Sipariş Verme':
        return 'Welcome to our restaurant! May I take your order?';
      case 'Restoran Rezervasyonu':
        return 'Good evening! Do you have a reservation with us tonight?';
      case 'Otel Rezervasyonu':
        return 'Welcome to our hotel. How may I assist you with your reservation?';
      case 'Taksi Çağırma':
        return 'Hello! Where would you like to go today?';
      default:
        return `Let's practice ${subcategoryName} in English. How can I help you?`;
    }
  };

  if (isLoading) {
    return (
      <div className={`speak-write-page loading ${darkMode ? 'dark-mode' : ''}`}>
        <div className="loader"></div>
        <p>Oturum yükleniyor...</p>
      </div>
    );
  }

  if (showFeedback && feedback) {
    return (
      <div className="speak-write-page">
        <div className="feedback-container">
          <h2>Oturum Geri Bildirimi</h2>
          
          <div className="feedback-scores">
            <div className="score-item">
              <div className="score-label">Telaffuz</div>
              <div className="score-bar">
                <div className="score-fill" style={{ width: `${feedback.pronunciation_score}%` }}></div>
              </div>
              <div className="score-value">{feedback.pronunciation_score}%</div>
            </div>
            
            <div className="score-item">
              <div className="score-label">Gramer</div>
              <div className="score-bar">
                <div className="score-fill" style={{ width: `${feedback.grammar_score}%` }}></div>
              </div>
              <div className="score-value">{feedback.grammar_score}%</div>
            </div>
            
            <div className="score-item">
              <div className="score-label">Akıcılık</div>
              <div className="score-bar">
                <div className="score-fill" style={{ width: `${feedback.fluency_score}%` }}></div>
              </div>
              <div className="score-value">{feedback.fluency_score}%</div>
            </div>
            
            <div className="score-item">
              <div className="score-label">Kelime Bilgisi</div>
              <div className="score-bar">
                <div className="score-fill" style={{ width: `${feedback.vocabulary_score}%` }}></div>
              </div>
              <div className="score-value">{feedback.vocabulary_score}%</div>
            </div>
            
            <div className="score-item overall">
              <div className="score-label">Genel Puan</div>
              <div className="score-bar">
                <div className="score-fill" style={{ width: `${feedback.overall_score}%` }}></div>
              </div>
              <div className="score-value">{feedback.overall_score}%</div>
            </div>
          </div>
          
          <div className="feedback-suggestions">
            <h3>Öneriler</h3>
            <p>{feedback.suggestions}</p>
          </div>
          
          <div className="feedback-actions">
            <button className="primary-button" onClick={handleBackToDashboard}>
              Kategorilere Dön
            </button>
            <button className="secondary-button" onClick={() => setShowFeedback(false)}>
              Konuşmaya Devam Et
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`speak-write-page ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header-nav">
        <button
          className="back-to-dashboard"
          onClick={handleBackToDashboard}
        >
          <span className="arrow">←</span>
          Kategorilere Dön
        </button>
      </div>

      <section className="scenario-section">
        <div className="scenario-header">
          <div className="scenario-title">
            <h2>Konuşma Pratiği</h2>
            <div className="scenario-badges">
              <span className="category-badge">{category?.name || 'Günlük Konuşmalar'}</span>
              <span className="subcategory-badge">{subcategory?.name || 'Senaryo'}</span>
            </div>
          </div>
          <p className="scenario-description">
            {teacher?.name || 'Öğretmeniniz'} ile {subcategory?.name || 'seçilen konuda'} İngilizce pratik yapın
          </p>
        </div>
        
        <div className="scenario-content">
          <div className="character-avatar">
            <img 
              src={teacher?.avatar_url || '/default-avatar.png'} 
              alt={teacher?.name}
            />
            <div className="character-info">
              <div className="teacher-name">{teacher?.name || 'Sarah Johnson'}</div>
              <div className="teacher-accent">{teacher?.accent || 'British Aksanı İngilizcesi'}</div>
              <div className="teacher-traits">
                {teacher?.personality_traits?.map((trait, index) => (
                  <span key={index} className="trait-badge">{trait}</span>
                )) || (
                  <>
                    <span className="trait-badge">Sabırlı</span>
                    <span className="trait-badge">Enerjik</span>
                    <span className="trait-badge">Detaycı</span>
                  </>
                )}
              </div>
              <button 
                className="change-teacher-button"
                onClick={() => setShowTeacherSelection(!showTeacherSelection)}
                disabled={isProcessing}
              >
                Öğretmen Değiştir
              </button>
              
              {showTeacherSelection && (
                <div className="teacher-selection">
                  {availableTeachers.map((t) => (
                    <div 
                      key={t.id}
                      className={`teacher-option ${t.id === teacher?.id ? 'selected' : ''}`}
                      onClick={() => handleChangeTeacher(t.id)}
                    >
                      <img src={t.avatar_url || '/default-avatar.png'} alt={t.name} />
                      <div>
                        <div className="option-name">{t.name}</div>
                        <div className="option-accent">{t.accent}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="dialogue-container">
            {messages.length > 0 ? (
              messages.map((message) => (
                <div key={message.id} className={`message ${message.is_user_message ? 'user' : 'teacher'}`}>
                  {message.is_user_message ? (
                    <div className="message-content">
                      <div className="message-text">{message.message_text}</div>
                      {message.audio_url && (
                        <button
                          className="play-audio"
                          onClick={() => handlePlayAudio(message.audio_url!)}
                          title="Sesi çal"
                        >
                          🔊
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="message-content">
                      <div className="teacher-avatar-small">
                        <img src={teacher?.avatar_url || '/default-avatar.png'} alt={teacher?.name} />
                      </div>
                      <div>
                        <div className="message-sender">{teacher?.name}</div>
                        <div className="message-text">{message.message_text}</div>
                        {message.audio_url && (
                          <button 
                            className="play-audio"
                            onClick={() => handlePlayAudio(message.audio_url!)}
                            title="Sesi çal"
                          >
                            🔊
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-messages">
                <p>Henüz mesaj yok. Konuşmaya başlamak için mikrofon butonuna tıklayın veya metin girin.</p>
              </div>
            )}
            
            {isProcessing && (
              <div className="typing-indicator">
                <div className="teacher-avatar-small">
                  <img src={teacher?.avatar_url || '/default-avatar.png'} alt={teacher?.name} />
                </div>
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="interaction-section">
        <div className="session-controls">
          <button 
            className="end-session-button"
            onClick={handleEndSession}
            disabled={isProcessing || isRecording}
          >
            Oturumu Bitir ve Geri Bildirim Al
          </button>
        </div>

        <div className="input-controls">
          <button 
            className={`microphone-button ${isRecording ? 'recording' : ''}`}
            onClick={handleMicrophoneClick}
            disabled={isProcessing}
          >
            <span className="microphone-icon">
              {isRecording ? '⏺' : '🎤'}
            </span>
            {isRecording ? 'Kaydı Durdur' : 'Konuşmaya Başla'}
          </button>
          
          <div className="text-input-container">
            <textarea
              className="text-input"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Mesajınızı buraya yazın..."
              disabled={isRecording || isProcessing}
            />
            <button 
              className="send-button"
              onClick={handleTextSubmit}
              disabled={!textInput.trim() || isRecording || isProcessing}
            >
              ➤
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpeakWritePage;