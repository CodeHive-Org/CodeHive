// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_APIKEY,
  authDomain: "codehive-6ea48.firebaseapp.com",
  projectId: import.meta.env.VITE_FBPROJID,
  storageBucket: "codehive-6ea48.appspot.com",
  messagingSenderId: import.meta.env.VITE_FBMSGSENDER,
  appId: import.meta.env.VITE_FBAPPID,
  measurementId: "G-VJJZVBLLKN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export firestore database
export const db = getFirestore(app);

// const { formProps, saveButtonProps } = useForm({});

// const handleSubmit = (e) => {
//   e.preventDefault();
//   formProps.form
//     .validateFields()
//     .then((values) => {
//       // Here 'reports' is a node in your Firebase Realtime Database. Adjust as necessary.
//       const reportRef = database.ref('reports');
//       reportRef.push({
//         reportReason: values.reportReason,
//         customReason: values.customReason,
//       })
//       .then(() => {
//         alert('Report submitted successfully!');
//       })
//       .catch((error) => {
//         console.error('Error submitting report:', error);
//         alert('Failed to submit report.');
//       });
//     })
//     .catch((info) => {
//       console.error('Validate Failed:', info);
//     });
// };
