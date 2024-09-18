const laodingDiv = document.querySelector(".info-bar");
let name = "";
document.querySelector(".result").style.display = "none";
document.getElementById("about").hidden = true;
document.querySelector(".img-anime").hidden = true;
let search = false;
let characters = [];

async function getPopularCharacters(totalPages) {
  for (let i = 1; i <= totalPages; i++) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/top/characters?page=${i}`
      );
      const data = await response.json();

      // Verifică dacă datele există
      if (data && data.data) {
        characters = characters.concat(data.data);
      } else {
        console.log(`No data on page ${i}`);
      }
    } catch (error) {
      console.log(`Page ${i} not found, retrying in 0.1 second...`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Așteaptă 0.1 secunde
      i--; // Revino la aceeași pagină
    }
  }

  return characters;
}

async function getAnimeCharacter() {
  setLoading(true);
  const totalPages = 10; // Schimbă numărul de pagini după nevoie
  const characters = await getPopularCharacters(totalPages);

  if (characters.length === 0) {
    console.log("No characters found.");
    return;
  }

  // Alege un caracter random
  const randomIndex = Math.floor(Math.random() * characters.length);
  const randomCharacter = characters[randomIndex];

  console.log(`Nume: ${randomCharacter.name}`);
  console.log(`Imagine: ${randomCharacter.images.jpg.image_url}`);

  document.querySelector(".result").style.display = "none";
  // Afișează poza personajului
  document.getElementById("animeImage").src =
    randomCharacter.images.jpg.image_url;
  document.getElementById("about").innerHTML =
    "<h1> About </h1>" + randomCharacter.about;
  document.getElementById("about").hidden = true;

  document.getElementById("input").value = "";
  document.querySelector(".img-anime").hidden = false;
  name = randomCharacter.name;
  setLoading(false);
}

// async function getAnimeCharacter() {
//   setLoading(true);

//   if (search == false) {
//     const totalPages = 10; // Poți ajusta câte pagini vrei să explorezi
//     let characters = [];

//     for (let i = 1; i <= totalPages; i++) {
//       try {
//         const response = await fetch(
//           `https://api.jikan.moe/v4/top/characters?page=${i}`
//         );
//         const data = await response.json();

//         // Verifică dacă datele există
//         if (data && data.data) {
//           characters = characters.concat(data.data);
//         } else {
//           console.log(`No data on page ${i}`);
//         }
//       } catch (error) {
//         console.log(`Page ${i} not found, retrying in 0.1 second...`);
//         await new Promise((resolve) => setTimeout(resolve, 0)); // Așteaptă 0.1 secunde
//         i--; // Revino la aceeași pagină
//       }

//       characters = characters.concat(data.data); // Adaugă toate caracterele din pagină
//       search = true;
//       console.log(`Searching`);
//     }
//   }

//   // Alege un caracter random din toate caracterele adunate
//   const randomIndex = Math.floor(Math.random() * characters.length);
//   const randomCharacter = characters[randomIndex];

//   console.log(`Nume: ${randomCharacter.name}`);
//   console.log(`Imagine: ${randomCharacter.images.jpg.image_url}`);

//   // const response = await fetch(
//   //   "https://api.jikan.moe/v4/top/random/characters"
//   // );
//   // const data = await response.json();

//   // // Alege un personaj random
//   // console.log(data);

//   // const randomCharacter = data.data;

//   //data.data[Math.floor(Math.random() * data.data.length)];
//   document.querySelector(".result").style.display = "none";
//   // Afișează poza personajului
//   document.getElementById("animeImage").src =
//     randomCharacter.images.jpg.image_url;
//   document.getElementById("about").innerHTML =
//     "<h1> About </h1>" + randomCharacter.about;
//   document.getElementById("about").hidden = true;

//   document.getElementById("input").value = "";
//   document.querySelector(".img-anime").hidden = false;
//   name = randomCharacter.name;
//   setLoading(false);
// }

function setLoading(isLoading) {
  laodingDiv.classList.toggle("show", isLoading);
  if (isLoading) {
    laodingDiv.style.display = "block";
  } else {
    laodingDiv.style.display = "none";
  }
}

function verifica(nume) {
  nume = name;
  let value = document.getElementById("input").value;

  //alin-nume1-nume2  => alin nume1 nume2

  if (nume.includes("-")) {
    nume = nume.replace(/-/g, " ");
  }
  if (value.includes("-")) {
    value = value.replace(/-/g, " ");
  }
  if (nume.replace(/\s+/g)) {
    nume = nume.replace(/\s+/g, " ");
  }
  if (value.replace(/\s+/g)) {
    value = value.replace(/\s+/g, " ");
  }

  if (value[0] == " ") {
    value = value.replace(/\s+/, "");
    console.log("0:" + value[0]);
  }

  if (value.endsWith(" ")) {
    value = value.trim();
  }

  if (nume.toLowerCase() == value.toLowerCase()) {
    console.log("Correct");
    document.getElementById("result").innerHTML = "Correct!";
    document.getElementById("result").style.color = "#3CA64C";
  } else {
    console.log("Incorrect");
    document.getElementById("result").innerHTML = "Incorrect!";
    document.getElementById("result").style.color = "#F23D5E";
  }

  console.log(name.toLowerCase() + ":" + value.toLowerCase());
  document.querySelector(".result").style.display = "block";
  document.getElementById("about").hidden = false;
}
