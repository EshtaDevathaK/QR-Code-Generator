// 👤 PROFILE FACE COMPONENT — shows the user info card
export default function User({ user }) {
  // 🧩 PULL THE PARTS — take needed info from userData prop
  const {
    avatar_url,     // 🎯 Profile Picture
    followers,      // 👥 People following
    following,      // 🤝 People you're following
    public_repos,   // 📚 Number of public repos
    name,           // 🧾 Real name
    login,          // 🪪 GitHub username
    created_at,     // 📅 Date joined
  } = user;

  // 📆 CLEAN UP JOIN DATE — make readable
  const createdDate = new Date(created_at); // 🧼 Convert to readable format

  // 🎨 SHAPE THE PROFILE CARD — final visual return
  return (
    <div className="user"> {/* 🧊 OUTER CARD CONTAINER */}

      {/* 🎯 AVATAR IMAGE */}
      <div>
        <img src={avatar_url} className="avatar" alt="User" /> {/* 🖼️ ROUND IMAGE */}
      </div>

      {/* 🧾 NAME + JOIN DATE SECTION */}
      <div className="name-container"> {/* 📜 NAME ROW */}
        <a href={`https://github.com/${login}`}> {/* 🔗 Click to go to GitHub */}
          {name || login} {/* 🪪 If no name, show username */}
        </a>
        <p>
          User joined on{" "}
          {/* 📅 Show: Day Month Year */}
          {`${createdDate.getDate()} ${createdDate.toLocaleString("en-us", {
            month: "short",
          })} ${createdDate.getFullYear()}`}
        </p>
      </div>

      {/* 📊 STATS SECTION — Repos, Followers, Following */}
      <div className="profile-info"> {/* 📦 FLEX BOX FOR 3 BLOCKS */}
        <div>
          <p>Public Repos</p> {/* 📚 LABEL */}
          <p>{public_repos}</p> {/* 🔢 COUNT */}
        </div>
        <div>
          <p>Followers</p> {/* 👥 LABEL */}
          <p>{followers}</p> {/* 🔢 COUNT */}
        </div>
        <div>
          <p>Following</p> {/* 🤝 LABEL */}
          <p>{following}</p> {/* 🔢 COUNT */}
        </div>
      </div>

    </div>
  );
}


// | 🔥 Trigger                  | 💡 What It Means                            |
// | --------------------------- | ------------------------------------------- |
// | 👤 PROFILE FACE COMPONENT   | This component shows the user info          |
// | 🧩 PULL THE PARTS           | Grab specific fields from the user prop     |
// | 🎯 AVATAR IMAGE             | Shows the round GitHub profile photo        |
// | 🧾 NAME + JOIN DATE SECTION | Show the user's name and date joined        |
// | 📊 STATS SECTION            | Show repos, followers, following            |
// | 🧼 CLEAN UP JOIN DATE       | Format the raw date into readable one       |
// | 🧊 OUTER CARD CONTAINER     | The full profile card block                 |
// | 📦 FLEX BOX FOR 3 BLOCKS    | Lays out the three stat blocks side by side |
