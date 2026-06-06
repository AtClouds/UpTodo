import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

const profilePic = document.getElementById('profilePic');
const profileInput = document.getElementById('profileInput');

onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const savedImage = localStorage.getItem(`profilePic_${user.uid}`);
  if (savedImage) {
    profilePic.src = savedImage;
  }

  profilePic.addEventListener('click', () => {
    profileInput.click();
  });

  profileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'profile_upload');

    try {
      const res = await fetch(
        'https://api.cloudinary.com/v1_1/dxhgbxcpd/image/upload',
        { method: 'POST', body: formData }
      );
      const data = await res.json();
      const imagesUrl = data.secure_url;

      profilePic.src = imagesUrl;
      localStorage.setItem(`profilePic_${user.uid}`, imagesUrl);

    } catch (error) {
      console.error(error);
    }
  });
});