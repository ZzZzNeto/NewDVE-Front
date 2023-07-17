'use client'

import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

import footerBG from '../../public/assets/logoFooter.png'

export default function SubLayout({ children } : any){
    return (
        <>  
            <header className="w-full flex-wrap justify-between items-center pt-[30px] pb-[30px] pl-[270px] pr-[270px] bg-blue-700 flex ">
                <NavBar/>
            </header>
            <main className="h-fit min-h-[1200px] bg-background w-full">
                {children}
            </main>
            <footer className="flex  flex-wrap justify-between items-center pt-[30px] pb-[30px] pl-[270px] pr-[270px] min-h-[700px] bg-cover max-h-fit w-full bg-no-repeat bg-center bg-footer-bg">
                <Footer/>
            </footer>
        </>
    )
  };