import Image from "next/image";

export default function HeroBanner() {
    return (
        <div className="max-h-[400px] w-[90%] flex flex-col items-center">
            <div className="block md:hidden w-full">
                <Image
                    src="/bannerMB.png"
                    alt="Hero Banner Mobile"
                    width={300}
                    height={400}
                    sizes="100vw"
                    className="w-full h-auto object-cover rounded-lg"
                    priority
                />
            </div>
            <div className="hidden md:block w-full h-full">
                <Image
                    src="/bannerPC.png"
                    alt="Hero Banner Desktop"
                    width={1200}
                    height={500}
                    sizes="100vw"
                    className="w-full h-full object-cover rounded-lg"
                    priority
                />
            </div>
        </div>
    )
}