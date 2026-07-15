let currentUser = "";

let mediaRecorder;

let audioChunks = [];

let audioURL = "";


// DATABASE

let users = JSON.parse(localStorage.getItem("nuraqUsers")) || [];

let groups = JSON.parse(localStorage.getItem("nuraqGroups")) || [];

let messages = JSON.parse(localStorage.getItem("nuraqMessages")) || [];

let posts = JSON.parse(localStorage.getItem("nuraqPosts")) || [];

let notifications = JSON.parse(localStorage.getItem("nuraqNotifications")) || [];

let photos = JSON.parse(localStorage.getItem("nuraqPhotos")) || {};

let onlineUsers = JSON.parse(localStorage.getItem("nuraqOnline")) || {};






// CREATE ACCOUNT


function createAccount(){


let username =
document.getElementById("signupUsername").value;


let password =
document.getElementById("signupPassword").value;



if(username && password){


let exist = users.find(function(user){

return user.username === username;

});



if(exist){

document.getElementById("signupMessage").innerHTML =
"Username already exists";

return;

}



users.push({

username:username,

password:password

});



localStorage.setItem(

"nuraqUsers",

JSON.stringify(users)

);



document.getElementById("signupMessage").innerHTML =
"Account created successfully ✅";


}else{


document.getElementById("signupMessage").innerHTML =
"Fill all fields";


}


}







// LOGIN


function login(){


let username =
document.getElementById("loginUsername").value;


let password =
document.getElementById("loginPassword").value;



let found = users.find(function(user){


return user.username === username &&
user.password === password;


});



if(found){


currentUser=username;


onlineUsers[currentUser]=true;


localStorage.setItem(

"nuraqOnline",

JSON.stringify(onlineUsers)

);



document.getElementById("signupPage").style.display="none";


document.getElementById("loginPage").style.display="none";


document.getElementById("homePage").style.display="block";


document.getElementById("userDisplay").innerHTML =
username;



}else{


document.getElementById("loginMessage").innerHTML =
"Wrong username or password";


}


}






function showHome(){


document.getElementById("content").innerHTML=`


<h2>🏠 Nuraq v6</h2>


<div class="card">

Welcome to Nuraq Connect v6

</div>


`;



}// PROFILE


function showProfile(){


document.getElementById("content").innerHTML=`


<h2>👤 Profile</h2>


<div class="profile">


<p>${currentUser}</p>


<input type="file" accept="image/*" onchange="uploadPhoto(event)">


<img id="profileImage">


</div>


`;



loadPhoto();


}





function uploadPhoto(event){


let file=event.target.files[0];


let reader=new FileReader();



reader.onload=function(){


photos[currentUser]=reader.result;


localStorage.setItem(

"nuraqPhotos",

JSON.stringify(photos)

);



loadPhoto();


};



reader.readAsDataURL(file);


}





function loadPhoto(){


let img=document.getElementById("profileImage");


if(img && photos[currentUser]){


img.src=photos[currentUser];


}


}







// SEARCH USERS


function showSearch(){


document.getElementById("content").innerHTML=`


<h2>🔍 Search Users</h2>


<input id="searchText" placeholder="Search username">


<button onclick="searchUsers()">

Search

</button>


<div id="searchResult"></div>


`;



}




function searchUsers(){


let text=document.getElementById("searchText").value.toLowerCase();


let result=document.getElementById("searchResult");


result.innerHTML="";



users.forEach(function(user){


if(user.username.toLowerCase().includes(text)){


result.innerHTML += `


<div class="card">

${user.username}

</div>


`;

}


});


}






// MEMBERS


function showMembers(){


let html="<h2>👥 Members</h2>";



users.forEach(function(user){


let status =
onlineUsers[user.username] ? "🟢 Online" : "⚪ Offline";



html += `


<div class="card">

${user.username}

<br>

${status}

</div>


`;


});



document.getElementById("content").innerHTML=html;


}








// GROUPS


function showGroups(){


document.getElementById("content").innerHTML=`


<h2>👨‍👩‍👦 Groups</h2>


<input id="groupName" placeholder="Group name">


<button onclick="createGroup()">

Create Group

</button>


<div id="groupList"></div>


`;



displayGroups();


}




function createGroup(){


let name=document.getElementById("groupName").value;



if(name.trim() !== ""){


groups.push({

name:name,

creator:currentUser,

members:[currentUser]

});



localStorage.setItem(

"nuraqGroups",

JSON.stringify(groups)

);



displayGroups();


}



}





function displayGroups(){


let box=document.getElementById("groupList");


if(!box)return;



box.innerHTML="";



groups.forEach(function(group){


box.innerHTML += `


<div class="group">


<h3>🏠 ${group.name}</h3>


<p>Creator: ${group.creator}</p>


<p>Members: ${group.members.join(", ")}</p>


</div>


`;



});


}








// CHAT


function showMessages(){


document.getElementById("content").innerHTML=`


<h2>💬 Chat</h2>


<input id="messageText" placeholder="Write message">


<button onclick="sendMessage()">

Send

</button>


<div id="messageList"></div>


`;



displayMessages();


}





function sendMessage(){


let text=document.getElementById("messageText").value;



if(text.trim() !== ""){


messages.push({

user:currentUser,

text:text,

time:new Date().toLocaleString()

});



localStorage.setItem(

"nuraqMessages",

JSON.stringify(messages)

);



displayMessages();


}


}





function displayMessages(){


let box=document.getElementById("messageList");


if(!box)return;



box.innerHTML="";



messages.forEach(function(message,index){


box.innerHTML += `


<div class="message">


<b>${message.user}</b>


<br>

${message.text}


<button onclick="deleteMessage(${index})">

Delete

</button>


</div>


`;



});


}





function deleteMessage(index){


messages.splice(index,1);



localStorage.setItem(

"nuraqMessages",

JSON.stringify(messages)

);



displayMessages();


}// REAL VOICE RECORDING


function showVoice(){


document.getElementById("content").innerHTML=`


<h2>🎤 Voice Recorder</h2>


<div class="voice">


<button onclick="startRecording()">

Start Recording

</button>


<button onclick="stopRecording()">

Stop Recording

</button>


<div id="audioResult"></div>


</div>


`;



}





function startRecording(){


navigator.mediaDevices.getUserMedia({audio:true})

.then(function(stream){


mediaRecorder = new MediaRecorder(stream);


audioChunks=[];


mediaRecorder.start();


alert("Recording started 🎤");



mediaRecorder.ondataavailable=function(event){


audioChunks.push(event.data);


};



})

.catch(function(){


alert("Microphone permission denied");


});


}





function stopRecording(){


if(mediaRecorder){


mediaRecorder.stop();



mediaRecorder.onstop=function(){


let audioBlob =
new Blob(audioChunks,{type:"audio/mp3"});


audioURL =
URL.createObjectURL(audioBlob);



document.getElementById("audioResult").innerHTML=`


<audio controls class="audio-player">

<source src="${audioURL}">

</audio>


`;



};


}



}








// POSTS


function showPosts(){


document.getElementById("content").innerHTML=`


<h2>📷 Posts</h2>


<textarea id="postText" placeholder="Write post"></textarea>


<button onclick="createPost()">

Post

</button>


<div id="postList"></div>


`;



displayPosts();


}





function createPost(){


let text=document.getElementById("postText").value;



if(text.trim() !== ""){


posts.push({

user:currentUser,

text:text,

likes:0,

comments:[]

});



localStorage.setItem(

"nuraqPosts",

JSON.stringify(posts)

);



displayPosts();


}



}





function displayPosts(){


let box=document.getElementById("postList");


if(!box)return;



box.innerHTML="";



posts.forEach(function(post,index){


box.innerHTML += `


<div class="post">


<b>${post.user}</b>


<p>${post.text}</p>


<button onclick="likePost(${index})">

❤️ ${post.likes}

</button>


<button onclick="deletePost(${index})">

Delete

</button>


</div>


`;



});


}





function likePost(index){


posts[index].likes++;



localStorage.setItem(

"nuraqPosts",

JSON.stringify(posts)

);



displayPosts();


}





function deletePost(index){


posts.splice(index,1);



localStorage.setItem(

"nuraqPosts",

JSON.stringify(posts)

);



displayPosts();


}







// NOTIFICATIONS


function showNotifications(){


document.getElementById("content").innerHTML=`


<h2>🔔 Notifications</h2>


<div class="notification">

No new notifications

</div>


`;



}








// SETTINGS


function showSettings(){


document.getElementById("content").innerHTML=`


<h2>⚙️ Settings</h2>


<div class="card">

Nuraq Connect v6

</div>


<button onclick="logout()">

Logout

</button>


`;



}




function logout(){


currentUser="";


document.getElementById("homePage").style.display="none";


document.getElementById("signupPage").style.display="block";


document.getElementById("loginPage").style.display="block";


}