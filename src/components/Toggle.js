import React from "react";

function Toggle({ value, setValue, trueText, falseText, displayText }) {
  return (
    <label className="inline-flex items-center me-5 cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={value}
        onClick={() => setValue(!value)}
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-green"></div>

      {displayText && (
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {value ? trueText : falseText}
        </span>
      )}
    </label>
  );
}

export default Toggle;
