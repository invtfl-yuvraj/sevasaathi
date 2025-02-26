import Image from "next/image";
import { Button } from "@/components/ui/button"
import Link from "next/link";



const Home = () => (
  <div>
    <div>
    <Link href='/user'><Button variant="outline">Continue as User</Button></Link>
    <Link href='/captain'><Button variant="outline">Continue as Professional</Button></Link>
    
    </div>
  </div>
);

export default Home;
