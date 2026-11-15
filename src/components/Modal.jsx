export default function Modal({ center = false, children }) {
  return (
    <div className="overlay">
      <div className={"modal" + (center ? " modal-center" : "")}>{children}</div>
    </div>
  );
}
