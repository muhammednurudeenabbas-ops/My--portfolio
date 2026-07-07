let posts = JSON.parse(localStorage.getItem("nuraqPosts")) || [];
let profileImage = "https://via.placeholder.com/50";

posts = posts.map(post => {
    if (!post.comments) post.comments = [];
    return post;
});

function savePosts() {
    localStorage.setItem("nuraqPosts", JSON.stringify(posts));
}

function showHome() {

    document.getElementById("content").innerHTML = `
    <h2>🏠 Home</h2>

    <input type="file" id="profileImage" accept="image/*">

    <br><br>

    <textarea id="postText" placeholder="What's on your mind?"></textarea>

    <br><br>

    <button id="postBtn">Post</button>

    <div id="posts"></div>
    `;


    document.getElementById("profileImage").onchange = function(event){

        let file = event.target.files[0];

        if(file){

            let reader = new FileReader();

            reader.onload=function(){

                profileImage = reader.result;

            };

            reader.readAsDataURL(file);
        }
    };


    document.getElementById("postBtn").onclick = addPost;

    showPosts();
}


function addPost(){

    let text = document.getElementById("postText").value;

    if(text===""){
        alert("Write something first!");
        return;
    }

    posts.push({
        name:"Muhammad Nurudeen Abbas",
        image:profileImage,
        text:text,
        time:new Date().toLocaleString(),
        likes:0,
        comments:[]
    });

    savePosts();

    document.getElementById("postText").value="";

    showPosts();
}


function showPosts(){

    let area=document.getElementById("posts");

    if(!area) return;

    area.innerHTML="";


    posts.forEach((post,index)=>{

        area.innerHTML += `

        <div class="post">

        <img src="${post.image}" width="50" height="50">

        <h3>👤 ${post.name}</h3>

        <p>${post.text}</p>

        <small>🕒 ${post.time}</small>

        <br><br>

        <button onclick="likePost(${index})">
        ❤️ ${post.likes}
        </button>

        <button onclick="editPost(${index})">
        ✏️ Edit
        </button>

        <button onclick="deletePost(${index})">
        🗑️ Delete
        </button>

        <br><br>

        <input id="comment${index}" placeholder="Write a comment">

        <button onclick="addComment(${index})">
        💬 Comment
        </button>

        <div>
        ${post.comments.map(c=>`<p>💬 ${c}</p>`).join("")}
        </div>

        <hr>

        </div>

        `;

    });

}


function editPost(index){

    let text = prompt("Edit your post:", posts[index].text);

    if(text){

        posts[index].text = text;

        savePosts();

        showPosts();

    }

}


function addComment(index){

    let box=document.getElementById("comment"+index);

    if(box.value==="") return;

    posts[index].comments.push(box.value);

    savePosts();

    showPosts();

}


function likePost(index){

    posts[index].likes++;

    savePosts();

    showPosts();

}


function deletePost(index){

    posts.splice(index,1);

    savePosts();

    showPosts();

}


document.getElementById("homeBtn").onclick = showHome;


document.getElementById("profileBtn").onclick=function(){

document.getElementById("content").innerHTML=`

<h2>👤 Profile</h2>

<h3>Muhammad Nurudeen Abbas</h3>

`;

};


document.getElementById("messagesBtn").onclick=function(){

document.getElementById("content").innerHTML=`

<h2>💬 Messages</h2>

<p>No messages yet.</p>

`;

};


document.getElementById("notificationsBtn").onclick=function(){

document.getElementById("content").innerHTML=`

<h2>🔔 Notifications</h2>

<p>No notifications yet.</p>

`;

};


showHome();