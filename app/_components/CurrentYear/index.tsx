export const CurrentYear = () => {
  return (
    <div className="my-5">
      © {new Date().getFullYear()} By{" "}
      <a href="https://www.igorprvieira.com/" className="text-cyan-700">
        Igor Vieira
      </a>{" "}
      🍋
    </div>
  );
};
