// Select The Elements
let repoInput = document.querySelector(".get-repos input");
let repoBtn = document.querySelector(".repo-btn");
let reposData = document.querySelector(".show-repos");

repoBtn.onclick = function () {
  repoInput.value == ""
    ? (reposData.innerHTML = "<span>Please Write Github Username.</span>")
    : getRepos();
};

const getRepos = async () => {
  try {
    let myRepos = await (
      await fetch(`https://api.github.com/users/${repoInput.value}/repos`)
    ).json();
    appedData(myRepos);
  } catch (error) {
    return error;
  }
};

const appedData = (element) => {
  // Empty The Container
  reposData.innerHTML = "";
  // Loop On Repos
  element.forEach((repo) => {
    // Create The Main Div
    let mainDiv = document.createElement("div");
    // Add Class On Main Div
    mainDiv.className = "repo-box";
    // Create Repo Name Text
    let repoName = document.createTextNode(repo.name);
    // Appened The Text To The Main Div
    mainDiv.appendChild(repoName);
    //   Create Anchor & Starts Div
    let locationDiv = document.createElement("div");
    //   Add Class On Location Div
    locationDiv.className = "location";

    // Create Repo URL Anchor
    let theUrl = document.createElement("a");
    // Create Repo Url Text
    let theUrlText = document.createTextNode("Visit");
    // Append The Repo Url Text To Anchor Tag
    theUrl.appendChild(theUrlText);
    // Add The Hypertext Reference "href"
    theUrl.href = `https://github.com/${repoInput.value}/${repo.name}`;
    // Set Attribute Blank
    theUrl.target = "_blank";
    // Append Url Anchor To location Div
    locationDiv.appendChild(theUrl);
    // Create Stars Count Span
    let starsSpan = document.createElement("span");
    // Create The Stars Count Text
    let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);
    // Add Stars Count Text To Stars Span
    starsSpan.appendChild(starsText);
    // Append Stars Count Span To location Div
    locationDiv.appendChild(starsSpan);
    //   Append Location Div to Main Div
    mainDiv.appendChild(locationDiv);
    // Appened The Main Div To The Container
    reposData.appendChild(mainDiv);
  });
};
