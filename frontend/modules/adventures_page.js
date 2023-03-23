import config from "../conf/index.js";
let adventuresCopy =""

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it ?city=bengaluru
  let urlParam = new URLSearchParams(search);
  let param = urlParam.get("city");
  return param;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    var cities = await fetch(
      config.backendEndpoint + "/adventures?city=" + city
    );
    let data = await cities.json();
    adventuresCopy=data;
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  var data = document.getElementById("data");

  for (let i = 0; i < adventures.length; i++) {
    var bannerdiv = document.createElement("div");
    bannerdiv.setAttribute("class", "col-lg-3 col-sm-6 mb-4 col-12");

    var anchorTag = document.createElement("a");
    anchorTag.setAttribute("id", adventures[i].id);
    anchorTag.setAttribute("href", "detail/?adventure=" + adventures[i].id);

    var bandiv = document.createElement("div");
    bandiv.setAttribute("class", "category-banner");
    bandiv.innerHTML = adventures[i].category;

    var carddiv = document.createElement("div");
    carddiv.setAttribute("class", "activity-card ");

    var cardImg = document.createElement("img");
    cardImg.setAttribute("class", "img");
    cardImg.setAttribute("src", adventures[i].image);
    cardImg.setAttribute("alt", adventures[i].name);

    var aboveDetailDiv = document.createElement("div");
    aboveDetailDiv.setAttribute("class", "card-body pb-0");

    var detaildiv1 = document.createElement("div");
    detaildiv1.setAttribute(
      "class",
      "card-text d-lg-flex justify-content-lg-between flex-wrap  w-100"
    );

    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    p1.innerHTML = adventures[i].name;
    p2.innerHTML = ` &#8377;
    <span class="amount-in-rupees">${adventures[i].costPerHead}</span>`;

    
    var detaildiv2 = document.createElement("div");
    detaildiv2.setAttribute(
      "class",
      "card-text d-lg-flex justify-content-lg-between flex-wrap  w-100"
    );
    var p3 = document.createElement("p");
    var p4 = document.createElement("p");
    p3.innerHTML = "Duration";
    p4.innerHTML = adventures[i].duration + " hours";

    carddiv.append(bandiv);
    carddiv.append(cardImg);

    detaildiv1.append(p1);
    detaildiv1.append(p2);

    detaildiv2.append(p3);
    detaildiv2.append(p4);

    aboveDetailDiv.append(detaildiv1);
    aboveDetailDiv.append(detaildiv2);
    carddiv.append(aboveDetailDiv);

    anchorTag.append(carddiv);
    bannerdiv.append(anchorTag);
    data.append(bannerdiv);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  var newList = [];
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  list.forEach(function (obj) {
    if (obj.duration >= low && obj.duration <= high) {
      newList.push(obj);
    }
  });

  console.log("filterDuration", list, low, high);
  return newList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  var newList = [];
  for (let i = 0; i < categoryList.length; i++) {
    list.forEach(function (obj) {
      if (obj.category == categoryList[i]) {
        console.log("inside fore each", obj, categoryList[i]);
        newList.push(obj);
      }
    });
  }
  console.log("filterCategort", list, categoryList);
  return newList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  if (filters.category.length != 0 && filters.duration != "") {
    list = filterByCategory(list, filters.category);

    let num = filters.duration.split("-");
    let min = num[0];
    let max = num[1];
    console.log(min, max);
    list = filterByDuration(list, min, max);
  } else if (filters.category.length != 0) {
    list = filterByCategory(list, filters.category);
  } else if (filters.duration != "") {
    let num = filters.duration.split("-");
    let min = num[0];
    let max = num[1];
    console.log(min, max);
    list = filterByDuration(list, min, max);
  }
  console.log("filter", list, filters);
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let obj = localStorage.getItem("filters");
  let data = JSON.parse(obj);
  // Place holder for functionality to work in the Stubs
  return data;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  const categoryList = document.getElementById("category-list");
  console.log(filters);
  if (filters.duration != "") {
    document.getElementById("duration-select").value = filters.duration;
  }
  filters.category.forEach((category, index) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.setAttribute("class", "category-filter");
    categoryDiv.setAttribute("style", "position: relative");

    const categoryText = document.createElement("span");
    categoryText.setAttribute("class", "me-3");
    categoryText.textContent = category;

    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("class", "btn");
    closeBtn.setAttribute("style", "position: absolute;right:0;top:0");
    closeBtn.innerHTML = `
    <i class="fa fa-close"></i>
    `;
    closeBtn.addEventListener("click", () => {
      filters.category.splice(index, 1);
      document.getElementById("data").innerHTML = "";
      categoryList.innerHTML = "";
      generateFilterPillsAndUpdateDOM(filters);
      let filteredAdventures = filterFunction(adventuresCopy, filters);
      addAdventureToDOM(filteredAdventures);
      saveFiltersToLocalStorage(filters);
    });

    categoryDiv.append(categoryText);
    categoryDiv.append(closeBtn);
    categoryList.append(categoryDiv);
  });

}

function displayingMessageOnButtonClick() {
  alert("Welcome to Javascript Program")
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
  displayingMessageOnButtonClick,
};
