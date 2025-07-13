// 📦 This component receives data + click action from parent
export default function Suggestions({ data, handleClick }) {
  return (
    <ul>
      {data && data.length ? (
        data.map((item, index) => (
          <li onClick={handleClick} key={index}>
            {item} {/* 🧍 Display each name */}
          </li>
        ))
      ) : (
        // 🤷‍♀️ No data? Show nothing
        null
      )}
    </ul>
  );
}
