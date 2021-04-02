// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
console.log(Airtable);

// use the airtable library to get a variable that represents one of our bases
// We needed to put in the right apiKey and
// base ID here!
var base = new Airtable({ apiKey: "keyNTXrO3UGtDrQ1y" }).base(
  "appbnizpsaNo9Kbia"
);

// Get your table from the base, select ALL the records, and specify the callback functions that will receive each page of data
base("band").select({}).eachPage(gotPageOfPeople, gotAllPeople);

// an empty array to hold our people data
const people = [];

// callback function that receives each page of data (considered here as records) and adds them to our list of people
function gotPageOfPeople(records, fetchNextPage) {
  console.log("gotPageOfPeople()");
  console.log("There are "+records.length+" items in records");
  // This takes the list of records and add them to the people array
  people.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when ALL pages are loaded
function gotAllPeople(err) {
  console.log("gotAllPeople()");

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading people");
    console.error(err);
    return;
  }

  // call function to show the people
  showPeople();
}

// show all the characters
function showPeople() {
  console.log("showPeople()");

  // find the shelf element
  const peopleContainer = document.querySelector("#container");

  // loop through all the people listed in the Airtable data. Inside is the code we are applying for EACH person in the list of people.
  people.forEach((person) => {
    // Print out what a single person's data looks like
    console.log("SHOWING THE PERSON")
    // console.log(person.fields);

    /*******************
    DIV for images
    *******************/
    const personContainer = document.createElement("div");
    personContainer.classList.add("person-container");
    /*******************
    ADD THE PERSON'S IMAGE
    *******************/

    // Create the image for this person as a new img element
    const personImg = document.createElement("img");
    // Set the src property of this image to the url of the image on Airtable (which is given by the fields of the person)
    personImg.src = person.fields.images[0].url;
    // Add this newly created img element to the inside of our container div
    personContainer.appendChild(personImg);

    /*******************
    TODO: ADD THE PERSON'S NAME
    *******************/

    // 1) Create the name for this person, as a new h1 element
    const personName = document.createElement("h2");
    // 2) Set the inside text of this h1 to the name for this person data
    personName.innerText = person.fields.Name;
    // 3) Add this newly created h1 to our container div
    personContainer.appendChild(personName);
    
    /*******************
    TODO: ADD THE PERSON'S BIO
    *******************/

    // 1) Create the bio for this person as a new p (paragraph) element
    const personBio = document.createElement("p");
    // 2) Set the inside text of this p to the name for this person data
    personBio.innerText = person.fields.bio;
    // 3) Add this newly created p element to the container div
    personContainer.appendChild(personBio);

    peopleContainer.appendChild(personContainer)


  });
}
