interface NavbarProps {
  onCreateClick: () => void;
}
export default function Navbar({onCreateClick }: NavbarProps) {
  return (
    <nav className="grid grid-cols-3 items-center  px-8 py-4 border-b-2 border-gray-500  ">
      <div className="font-bold text-lg">CA MONK</div>

      <ul className="hidden md:flex gap-6 text-m text-gray-600">
        <li>Tools</li>
        <li>Practice</li>
        <li>Events</li>
        <li>Job Board</li>
        <li>Points</li>
      </ul>
      <div className="flex justify-end gap-4">
<button
        onClick={onCreateClick}
        className="bg-indigo-600 text-white px-3 py-2 w-auto rounded-md hover:cursor-pointer"
      >
        Create Blog
      </button>
      <button className="bg-indigo-600 text-white font-medium text-m px-6 py-2 rounded-md hover:cursor-pointer">
        Profile
      </button>
      </div>
    </nav>
  );
}
