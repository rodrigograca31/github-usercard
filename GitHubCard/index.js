/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get("https://api.github.com/users/rodrigograca31")
	.then(response => {
		console.log(response.data);


		const container = document.querySelector(".cards");
		container.append(card(response.data))

	}).catch(error => {
		console.log("errors");
		
	})

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ["ELAndrews", "sergeikabuldzhanov", "tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];

// axios.get("https://api.github.com", {
// 	auth: {
// 		username: 'rodrigograca31',
// 		password: '642ac3a1e3232c0799b783f3d3f29fec08186549'
// 	}
// })

const container = document.querySelector(".cards");

// followersArray.forEach(element => {
	axios.get("https://api.github.com/users/rodrigograca31")
		.then(response => {
			console.log(response.data);
			return response.data.followers_url
		}).then(url => {
			return axios.get(url);
		}).then((response)=> {
			console.log("followers array");
			console.log(response.data);
			response.data.forEach(element => {
				axios.get(element.url).then(follower => {
					container.append(card(follower.data));
				}).catch(error => {
					console.log("errors");
				})
			});
		}).then(url => {
			console.log(url);
			
		})
		.catch(error => {
			console.log("errors");
		})
// });

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

// ES6
const card = (info) => {
	const card = document.createElement("div");
	card.classList.add("card")
	const img = document.createElement("img");
	const cardinfo = document.createElement("div");
	cardinfo.classList.add("card-info")
	const h3 = document.createElement("h3");
	h3.classList.add("name")

	const p1 = document.createElement("p");
	p1.classList.add("username")
	const p2 = document.createElement("p");
	const p3 = document.createElement("p");
	const p4 = document.createElement("p");
	const p5 = document.createElement("p");
	const p6 = document.createElement("p");


	img.src = info.avatar_url;
	h3.innerText = info.name;
	p1.innerText = info.login;

	p2.innerText = `Location: ${info.location}`;
	p3.innerHTML = `Profile: <a href=${info.html_url}>${info.html_url}</a>`
	p4.innerText = `Followers: ${info.followers}`;
	p5.innerText = `Following: ${info.following}`;
	p6.innerText = `Bio: ${info.bio}`;

	cardinfo.append(h3, p1, p2, p3, p4, p5, p6)
	card.append(img, cardinfo);

	return card;
}


/* List of LS Instructors Github username's:
	tetondan
	dustinmyers
	justsml
	luishrd
	bigknell
*/
