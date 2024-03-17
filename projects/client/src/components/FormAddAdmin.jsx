import { useEffect } from "react";

export default function FormAddAdmin({ category = {} }) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Email User
      </label>
      <input
        type="email"
        name="email"
        id="email"
        // defaultValue={category.email || ""}
        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
      />
      <label
        htmlFor="username"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Username
      </label>
      <input
        type="text"
        name="username"
        id="username"
        // defaultValue={category.email || ""}
        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
      />
      <label
        htmlFor="name"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Name
      </label>
      <input
        type="text"
        name="name"
        id="name"
        // defaultValue={category.email || ""}
        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
      />
      <label
        htmlFor="salary"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Salary
      </label>
      <input
        type="number"
        name="salary"
        id="salary"
        // defaultValue={category.email || ""}
        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
      />
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        // defaultValue={category.email || ""}
        className="block w-full min-w-0 flex-1 rounded-md border-gray-300 focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
      />
         
    </div>
  );
}
