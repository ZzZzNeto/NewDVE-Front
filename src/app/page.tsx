'use client'

import Link from "next/link"
import SubLayout from "./sublayout"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CardHomepage from "@/components/CardHomepage";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";

import daily from '@/../public/assets/dailyAccess.png'
import map from '@/../public/assets/mapImage.png'

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
}

export default function Home() {
  return (
    <SubLayout>
      <div className="pt-[30px] pb-[30px] pl-[270px] pr-[270px] bg-home-bg max-h-fit bg-no-repeat min-h-[800px] w-full">
        <h1 className="text-white text-[45px] font-bold max-w-[700px] mb-[20px]">Encontre vagas no mercado de trabalho à sua disposição</h1>
        <p className="text-white text-[20px] max-w-[500px] font-thin mb-[50px]">Em busca de uma vaga no emprego dos sonhos ou uma oportunidade de estágio na sua região? <span>Cadastre-se</span> e acompanhe.</p>
        <div className="flex items-center">
          <Link className='w-[250px] py-[10px] bg-white text-blue-600 text-[20px] font-bold rounded-[15px] text-center' href={'sign_in'}>Cadastrar-se</Link>
          <Link className="text-white text-[24px] font-bold ml-[50px]" href={'/login'}>Entrar <ArrowForwardIcon /></Link>
        </div>
      </div>
      <div className="pl-[270px] pr-[270px] h-fit my-[50px] w-full justify-center items-center">
        <h1 className="text-[40px] text-center font-bold mb-[50px] ">Anúncios recentes</h1>
        <Carousel centerMode responsive={responsive} infinite>
          <div className="w-[300px]"><CardHomepage companyName="Socorro" rating={4.5} quantity_rating={129} city="Pau dos Ferros" tags={[{ name: 'Tecnologia', icon: 'https://static.vecteezy.com/system/resources/thumbnails/002/363/076/small/computer-icon-free-vector.jpg' }]} image="https://patasdacasa.com.br/sites/patasdacasa/files/styles/webp/public/noticias/2019/10/gato-obeso-quando-o-aumento-de-peso-indica-um-problema-mais-serio.jpg.webp?itok=5KmFBNjw" /></div>
          <div className="w-[300px]"><CardHomepage companyName="Socorro" rating={4.5} quantity_rating={129} city="Pau dos Ferros" tags={[{ name: 'Tecnologia', icon: 'https://static.vecteezy.com/system/resources/thumbnails/002/363/076/small/computer-icon-free-vector.jpg' }]} image="https://patasdacasa.com.br/sites/patasdacasa/files/styles/webp/public/noticias/2019/10/gato-obeso-quando-o-aumento-de-peso-indica-um-problema-mais-serio.jpg.webp?itok=5KmFBNjw" /></div>
          <div className="w-[300px]"><CardHomepage companyName="Socorro" rating={4.5} quantity_rating={129} city="Pau dos Ferros" tags={[{ name: 'Tecnologia', icon: 'https://static.vecteezy.com/system/resources/thumbnails/002/363/076/small/computer-icon-free-vector.jpg' }]} image="https://patasdacasa.com.br/sites/patasdacasa/files/styles/webp/public/noticias/2019/10/gato-obeso-quando-o-aumento-de-peso-indica-um-problema-mais-serio.jpg.webp?itok=5KmFBNjw" /></div>
          <div className="w-[300px]"><CardHomepage companyName="Socorro" rating={4.5} quantity_rating={129} city="Pau dos Ferros" tags={[{ name: 'Tecnologia', icon: 'https://static.vecteezy.com/system/resources/thumbnails/002/363/076/small/computer-icon-free-vector.jpg' }]} image="https://patasdacasa.com.br/sites/patasdacasa/files/styles/webp/public/noticias/2019/10/gato-obeso-quando-o-aumento-de-peso-indica-um-problema-mais-serio.jpg.webp?itok=5KmFBNjw" /></div>
        </Carousel>
      </div>
      <div className="pl-[270px] pr-[270px] pt-[100px] w-full">
        <div className="flex my-[50px] w-full">
          <div className="mr-[50px]">
            <Image alt="DailyAccess" height={200} width={200} src={daily}/>
          </div>
          <div>
            <h1 className="font-bold text-[40px] mb-[20px]">Diversos acessos diarios</h1>
            <ul className="list-disc">
              <li className="my-[5px]">
                <p className="text-[22px]">Garanta mais <span className="font-bold text-blue-600">visibilidade</span> aos seus anuncios e aumente a concorrencia.</p>
              </li>
              <li className="my-[5px]">
                <p className="text-[22px]">Profissionais <span className="font-bold text-blue-600">capacitados</span> de qualquer lugar do Brasil.</p>
              </li>
              <li className="my-[5px]">
                <p className="text-[22px]">Suporte ao processo de <span className="font-bold text-blue-600">seleção</span>.</p>
              </li>
            </ul>          
          </div>
        </div>
        <div className="flex justify-end my-[100px] w-full">
          <div className="text-end flex flex-col items-end justify-center">
            <h1 className="font-bold text-[40px] mb-[20px]">Vagas de todo o Brasil</h1>
            <ul className="list-disc flex flex-col justify-end">
              <li className="my-[5px] w-fit">
                <p className="text-[22px] w-fit">Encontre propostas na sua <span className="font-bold text-blue-600">região</span>, <span className="font-bold text-blue-600">estado</span> ou <span className="font-bold text-blue-600">cidade</span>.</p>
              </li>
              <li className=" my-[5px]w-fit">
                <p className="text-[22px] w-fit"><span className="font-bold text-blue-600">Acompanhamento</span> do processo de seleção</p>
              </li>
            </ul>  
          </div>
          <div className="ml-[50px]">
            <Image alt="DailyAccess" height={200} width={200} src={map}/>
          </div>
        </div>
      </div>
      <div className="bg-rocket-bg min-h-[700px] flex flex-col pb-[150px] pl-[250px] justify-end items-start bg-cover bg-no-repeat ml-[270px] mr-[270px] my-[100px] min-w-[1443px] ">
        <h1 className="text-white font-bold text-[40px] mb-[50px] max-w-[600px]">Anuncie e encontre profissionais interessados</h1>
        <Link className='px-[20px] py-[15px] bg-white text-blue-600 text-[20px] font-bold rounded-[15px] text-center' href={'/login'}>Anúnciar</Link>
      </div>
      <div id="about_us" className=" bg-about_us-bg min-h-[700px] flex flex-col pt-[180px] justify-start items-start bg-cover bg-no-repeat pl-[300px] pr-[270px] my-[100px] min-w-[1443px] ">
        <h1 className="text-white font-bold text-[40px] mb-[20px]">Sobre nós</h1>
        <p className="text-white max-w-[590px] text-[20px] indent-[40px] text-justify">A DVE é uma plataforma de anuncios prossionais que tem como objetivo facilitar a vida das pessoas que buscam por vagas ou por funcionarios em qualquer area do mercado. </p>
        <p className="text-white max-w-[590px] text-[20px] indent-[40px] text-justify">Estamos no mercado desde 2022, a plataforma hoje conta com mais de 2 mil usuarios diarios e possuindo mais de 3 mil anuncios publicados, alem de inumeras usuarios que conseguiram sua tão sonhada vaga atravez da DVE.</p>
      </div>
    </SubLayout>
  )
}
