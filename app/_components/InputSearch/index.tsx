import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "../SearchIcon";

export const InputSearch = ({
  onChange,
  value,
  placeholder,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        onChange={onChange}
        value={value}
        className={`shadow w-full p-2 pl-10 border-2 rounded-lg my-2 focus:outline-none ${
          isFocused ? "border-purple-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        ref={searchInputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon />
      </div>
    </div>
  );
};
