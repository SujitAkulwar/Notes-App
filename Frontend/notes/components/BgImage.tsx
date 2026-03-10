import Image from "next/image";
import bg from "@/assets/image/bg.jpg";

export default function BgImage() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen -z-10">
            <Image 
                src={bg}
                alt="Background" 
                className="w-full h-full object-cover opacity-80" 
            />
        </div>
    );
}