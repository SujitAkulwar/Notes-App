import ThemeSwitch from "./ThemeSwitch";

export default function Header({

}:{

}) {
  return (
    <div 
        className="flex justify-between items-center py-1 sm:py-2 pl-6 h-fit w-full">
        <span className="text-xl font-semibold ">
            Notes App
        </span>
        <ThemeSwitch />
    </div>
  );
}