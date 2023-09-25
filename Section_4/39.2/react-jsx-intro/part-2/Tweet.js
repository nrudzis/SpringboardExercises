const Tweet = ({username, name, date, message}) => (
  <div>
    <h3>{name}</h3>
    <p><em>@{username}</em></p>
    <p>{message}</p>
    <p><small>Posted: {date}</small></p>
  </div>
);
