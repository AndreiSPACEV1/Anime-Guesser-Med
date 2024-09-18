const laodingDiv = document.querySelector(".info-bar");
let name = "";
document.querySelector(".result").style.display = "none";
document.getElementById("about").hidden = true;
document.querySelector(".img-anime").hidden = true;
async function getAnimeCharacter() {
  setLoading(true);

  const rdmPage = Math.floor(Math.random() * 100) + 1; // Poți ajusta câte pagini vrei să explorezi

  try {
    console.log("page: " + rdmPage);
    const response = await fetch(
      `https://api.jikan.moe/v4/top/characters?page=${rdmPage}`
    );
    const data = await response.json();
    characters = data.data;
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
  } catch {
    document.getElementById("Random-Anime-Character").disabled = true;

    console.log("Nu spama ca prostu pe butonu de generat 💢😡 !!!");
    alert("Nu spama ca prostu pe butonu de generat 💢😡 !!!");

    setTimeout(() => {
      document.getElementById("Random-Anime-Character").disabled = false;
      getAnimeCharacter();
    }, 500);
  }

  // Alege un caracter random din toate caracterele adunate
  // Adaugă toate caracterele din pagină

  // const response = await fetch(
  //   "https://api.jikan.moe/v4/top/random/characters"
  // );
  // const data = await response.json();

  // // Alege un personaj random
  // console.log(data);

  // const randomCharacter = data.data;

  //data.data[Math.floor(Math.random() * data.data.length)];
}

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
