export default function Avatar({ char }) {
  return <p className="avatar">{char?.toUpperCase()}</p>;
}
