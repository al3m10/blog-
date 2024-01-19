import React, { useState, useEffect } from 'react';
import { base64 } from 'base64-js';
import {View, Button, TextInput, Text, FlatList, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { styles } from './styles';
import firebase from 'firebase/app';
import {initializeApp,getApp} from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadData
} from 'firebase/storage';


const data = [];
const firebaseConfig = {
  apiKey: "AIzaSyC1SaR8eMGVPmhaYYF1Qjfnqxa1P_cSuVk",
  authDomain: "blog-app-d7c87.firebaseapp.com",
  databaseURL: "https://blog-app-d7c87-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "blog-app-d7c87",
  storageBucket: "blog-app-d7c87.appspot.com",
  messagingSenderId: "408756541071",
  appId: "1:408756541071:web:5c13a2b5a03d229cc842fa",
  measurementId: "G-6JXEF0G9C6"
};
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const db = getFirestore();

const App = () => {
    const [selectedPost, setSelectedPost] = useState(null);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [posts, setPosts] = useState(data);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [SelectedImageData, setSelectedImageData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');


      const toggleSignup = () => {
        setShowSignup(!showSignup);
      };
      const handleSignup = async () => {
          try {
            setIsLoggingIn(true);
            const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
            console.log("User signed up!");
            setIsAuthenticated(true);
            toggleSignup(); // Hide the signup form after successful signup
            setLoginEmail('');
            setLoginPassword('');
          } catch (error) {
            console.error("Error signing up:", error.message);
            setError(error.message);
          } finally {
            setIsLoggingIn(false);
          }
      };
const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    const user = userCredential.user;
    console.log('User logged in:', user);
    setLoginEmail('');
    setLoginPassword('');
    // Дополнительные действия после успешного входа
  } catch (error) {
    console.error('Error signing in:', error.message);
  }
};
      const handleImageUpload = async () => {
        const url = await openImagePickerAndUpload();
        setImageUrl(url);};
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    const convertImageToBase64 = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          const byteArray = base64.toByteArray(base64String);
          resolve(byteArray);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };
    const createFirebaseApp = (config = {}) => {
      try {
        return getApp();
      } catch (error) {
        return initializeApp(config);
      }
    };
    const firebaseApp = createFirebaseApp();
    const storage = getStorage(firebaseApp, "gs://blog-app-d7c87.appspot.com");
const openImagePicker = async () => {
   let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,})
        if (!result.canceled) {
            const selectedImageUri = result.assets[0].uri;
            // Now 'selectedImageUri' contains the URI of the selected image
              // Get the selected image URL
              setSelectedImage(result.uri);

              // Get a reference to the storage location where you want to store the image
              const storageRef = ref(storage, 'images/' + Date.now());

              // Convert the image URI to a Blob
              const response = await fetch(selectedImageUri);
              const blob = await response.blob();

            // Upload the Blob to Firebase Storage
             const snapshot = await uploadBytes(storageRef, blob);

             // Get the download URL using getDownloadURL function
            const downloadURL = await getDownloadURL(snapshot.ref);

              // Log the download URL of the uploaded image
              console.log('Image uploaded successfully:', downloadURL);
              setSelectedImage(result.uri);
        };
      };
      const uploadImage = async (uri) => {
        try {
          const storageRef = ref(storage, 'post_images/' + Math.random().toString(36).substring(7));
          await uploadString(storageRef, uri, 'data_url');
          const imageUrl = await getDownloadURL(storageRef);
          setImageUrl(imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error.message);
        }
      }
const signUp = async () => {
    try {
      setIsLoggingIn(true);

      // Use createUserWithEmailAndPassword without setUser
      const userCredential = await createUserWithEmailAndPassword(auth, "newuser@example.com", "password");

      // No need to set user here, as onAuthStateChanged will handle it

      console.log("User signed up!");
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const signIn = async () => {
    try {
      setIsLoggingIn(true);
      const userCredential = await signInWithEmailAndPassword(auth, "user@example.com", "password");
      // No need to set user here, as onAuthStateChanged will handle it
      console.log("User signed in!");
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error signing in:", error.message);
      setError(error.message);
    } finally {
      setIsLoggingIn(false);
    }
  };
const addPostToDatabase = async (post) => {
  try {
    // Получите текущего пользователя
    const currentUser = auth.currentUser;

    // Проверьте, что пользователь аутентифицирован, прежде чем использовать его email
    if (currentUser) {
      // Добавьте email пользователя к новому посту
      post.userEmail = currentUser.email;
    }

    const docRef = await addDoc(collection(db, 'posts'), post);
    console.log('Document written with ID: ', docRef.id);

    // Получите ссылку на загруженное изображение
    const imageUrl = await uploadImageFromUrl(docRef.id, selectedImage);

    // Обновите документ в базе данных с ссылкой на изображение
    await updateDoc(docRef, { imageUrl });

    getAllPostsFromDatabase();
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

// Функция для загрузки изображения в хранилище Firebase и получения URL
const uploadImageFromUrl = async (postId, imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `postImages/${postId}.jpg`);

    // Используйте функцию uploadBytes для загрузки данных изображения
    const snapshot = await uploadBytes(storageRef, blob);

    // Получите URL загруженного изображения
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};
const addNewPost = () => {
  if (newPostTitle.trim() === '' || newPostContent.trim() === '') {
    setError('Title and content cannot be empty');
    return;
  } else {
    setError('');
  }

  const id = posts.length + 1;
  const newPost = {
    id,
    title: newPostTitle,
    content: newPostContent,
    imageUrl, // Include the image URL in the post
  };

  // Add the new post to the database
  addPostToDatabase(newPost);
  getAllPostsFromDatabase();
  // Update component state
  setPosts([...posts, newPost]);
  setNewPostTitle('');
  setNewPostContent('');
  setSelectedImage(null);
  setImageUrl(null); // Reset imageUrl after adding the post
};

const getAllPostsFromDatabase = async () => {
  try {
    const postsCollection = collection(db, 'posts');
    const q = query(postsCollection);
    const querySnapshot = await getDocs(q);
    const fetchedPosts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setPosts(fetchedPosts);
  } catch (error) {
    console.error('Error fetching posts from database:', error.message);
  }
};

const deletePost = async (postId) => {
  try {
    const postDocRef = doc(db, 'posts', postId);
    await deleteDoc(postDocRef);
    getAllPostsFromDatabase(); // Ensure that this function is correctly implemented
  } catch (error) {
    console.error('Error deleting post:', error.message);
  }
};


const renderItem = ({ item }) => {
  const currentUser = auth.currentUser;

  return (
    <TouchableOpacity onPress={() => setSelectedPost(item)}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent}>{item.content}</Text>
        <Text style={styles.postAuthor}>Користувач: {item.userEmail}</Text>
        {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.postImage} />}

        {/* Conditionally render the "Delete" button */}
        {currentUser && (currentUser.email === item.userEmail || currentUser.email === 'osvitniyservice@dnu.test') && (
          <TouchableOpacity style={styles.deleteButton} onPress={() => deletePost(item.id)}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

 const signOut = async () => {
    try {
      await auth.signOut();
      setIsAuthenticated(false);
      setSelectedPost(null); // Clear selected post after sign out
      setPosts([]); // Clear posts after sign out
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      if (user) {
        getAllPostsFromDatabase();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);



return (
  <View style={styles.container}>
    <View style={styles.headingContainer}>
      <Text style={styles.heading}>Освітній блог</Text>
    </View>
    {!isAuthenticated ? (
      // Display login and signup buttons when not authenticated
      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => setShowSignup(false)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => setShowSignup(true)}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        {(showSignup || !showSignup) && (
          // Display signup or login form based on showSignup value
          <View style={showSignup ? styles.signupForm : styles.loginForm}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={showSignup ? signupEmail : loginEmail}
              onChangeText={showSignup ? setSignupEmail : setLoginEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
              value={showSignup ? signupPassword : loginPassword}
              onChangeText={showSignup ? setSignupPassword : setLoginPassword}
            />
            <Button title={showSignup ? "Sign Up" : "Login"} onPress={showSignup ? handleSignup : handleLogin} />
          </View>
        )}
      </View>
    )  : (
      // Display the sign-out button and other content when authenticated
      <>
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
            <Text style={styles.buttonText}>Вийти</Text>
          </TouchableOpacity>
        </View>
        {!selectedPost ? (
          <FlatList
            data={posts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View style={styles.selectedPostContainer}>
            <Text style={styles.selectedPostTitle}>{selectedPost.title}</Text>
            <Text style={styles.selectedPostContent}>{selectedPost.content}</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedPost(null)}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            {selectedPost.imageUrl && (
              <Image source={{ uri: selectedPost.imageUrl }} style={styles.selectedImage} />
            )}
            <Text style={styles.selectedPostTitle}>Користувач {selectedPost.userEmail}</Text>
          </View>
        )}
        {selectedPost === null && (
          <View style={styles.formContainer}>
            {error !== '' && <Text style={styles.errorText}>{error}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Введіть заголовок"
              value={newPostTitle}
              onChangeText={setNewPostTitle}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Що ви хочете написати?"
              value={newPostContent}
              onChangeText={setNewPostContent}
              multiline={true}
            />
            <Button title="Додати пост" onPress={() => addNewPost()} />
            <Button title="Обрати зображення" onPress={openImagePicker} />
            {selectedImage && <Image source={{ uri: selectedImage }} style={styles.selectedImage} />}
          </View>
        )}
      </>
    )}
  </View>
);


};

export { auth, db };
export default App;