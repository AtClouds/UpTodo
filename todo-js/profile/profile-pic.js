const profilePic = document.getElementById('profilePic');
const profileInput = document.getElementById('profileInput');


const savedImage = localStorage.getItem("profilePic");
if (savedImage) {
  profilePic.src = savedImage;
}

// open file picker
profilePic.addEventListener('click', () => {
  profileInput.click();
  console.log('hi G')
});

// upload to cloudinary
profileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'profile_upload'); // ✅ correct name

  try {
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dxhgbxcpd//images/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await res.json();

    const imagesUrl = data.secure_url; // ✅ correct key

    // update UI
    profilePic.src = imagesUrl;
    //Save it
    localStorage.setItem("profilePic", imagesUrl);

    console.log('uploaded:', imagesUrl);

  } catch (error) {
    console.error(error);
  }
});