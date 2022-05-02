//  Let's grab elements on from the DOM and we'll eventually pipe data into them
const candyList = document.querySelector(`.candy-list`);

// Our keys and info we'll need
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsaHFoa3VreXRuZWJ3Y2FuYmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTA5MDQ2OTAsImV4cCI6MTk2NjQ4MDY5MH0.oS-XAYTgRZAff1G9TQvYdnPBNtKDfl6mDC8m_0qV-_A`;
const supabaseURL = `https://zlhqhkukytnebwcanbkm.supabase.co`;

// Create our Supabase connection
const { createClient } = supabase;
const _supabase = createClient(supabaseURL, supabaseKey);

// Let's request some data from one of our tables
async function requestData() {
  const { data } = await _supabase.from(`candies`).select(`*`);
  //   clear out all old data
  candyList.innerHTML = ``;
  //   Loop through to create new data
  data.map((candy) => {
    candyList.appendChild(generateCandy(candy));
  });
}

// A function to generate a new <li> for each candy
function generateCandy(candy) {
  const newCandy = document.createElement(`li`);
  newCandy.innerHTML = `
        <p>${candy.name}</p>
    `;
  return newCandy;
}

// A function to insert new data and refresh the info
async function insertData() {
  // get candies from the inputs
  let candies = document.querySelectorAll(`.candy-name`);
  //   turn candies into an array
  candies = Array.from(candies);
  //   get the values from each of the objects in candies array
  const candyNames = candies.map((candy) => {
    return candy.value;
  });
  candyNames.map(async (candy, index) => {
    await _supabase.from(`candies`).insert({
      name: candy,
      rank: index + 1,
    });
  });
  await sleep(2000);
  requestData();
}

// sleep so we can wait for the data to be inserted
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Let's run our request and all its logic
requestData();
