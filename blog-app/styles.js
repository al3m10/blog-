import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headingContainer: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  logoutContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  postAuthor: {
      fontSize: 14,
      color: '#777', // Цвет текста может быть изменен
      marginBottom: 5,
    },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00000',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    margin: 10,
  },
  imagePickerContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  selectedImage: {
    width: 330, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: 'cover', // or 'contain' based on your preference
    marginVertical: 10, // Adjust the margin as needed
  },
  loginButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  registerButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postContent: {
    fontSize: 16,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  deleteButtonText: {
    color: 'red',
  },
  selectedPostContainer: {
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  selectedPostTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectedPostContent: {
    fontSize: 16,
  },
  backButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  backButtonText: {
    color: 'blue',
    fontSize: 14,
  },
  formContainer: {
    alignItems: 'center', // Выравнивание формы по центру
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%', // Ширина 100%
  },
  textArea: {
    height: 100,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },postImage: {
          width: 330, // Adjust the width as needed
          height: 200, // Adjust the height as needed
          resizeMode: 'cover', // or 'contain' based on your preference
          marginVertical: 10, // Adjust the margin as needed
        },

});
