import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => (
  <div className="flex flex-col items-center justify-between h-[60vh]">
    <div>
      <h1 className="text-3xl font-semibold">Welcome to Seva Saathi</h1>
    </div>
    <div className="w-full h-[310px] overflow-hidden">
      <img
        className="object-cover"
        src="https://c8.alamy.com/comp/D36CPK/different-types-of-workers-D36CPK.jpg"
        alt=""
      />
    </div>
    <div className="w-full flex flex-col items-center justify-center gap-2">
      <Link href="/user/login" className="px-10"> 
        <Button
          variant="outline"
          className="bg-lightpurple text-white font-semibold px-4"
        >
          Continue as User
        </Button>
      </Link>
      <Link href="/captain">
        <Button
          variant="outline"
          className="bg-lightpurple text-white font-semibold"
        >
          Continue as Professional
        </Button>
      </Link>
    </div>

    <footer className="mt-4">
      <p className="text-center text-gray-500">
        © 2025 Seva Saathi. All rights reserved.
      </p>
    </footer>
  </div>
);

export default Home;
