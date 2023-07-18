"use client";
import { Typography, Grid, Rating, Button } from "@mui/material";
import SubLayout from "../sublayout";
import Tag from "@/components/Tag";
import Image from "next/image";
import { useState } from "react";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
export default function AnnoucementDetail() {
  const tags = [
    {
      name: "Tecnologia",
      icon: "https://static.vecteezy.com/system/resources/thumbnails/002/363/076/small/computer-icon-free-vector.jpg",
    },
    {
      name: "Tecnologia",
      icon: "https://static.vecteezy.com/system/resources/thumbnails/002/363/076/small/computer-icon-free-vector.jpg",
    },
    {
      name: "Tecnologia",
      icon: "https://static.vecteezy.com/system/resources/thumbnails/002/363/076/small/computer-icon-free-vector.jpg",
    },
  ];
  const [image, setImage] = useState(0);
  const [value, setValue] = useState<number | null>(2);
  const [favorite, setFavorite] = useState<boolean | null>(false);
  const images = [
    { image: "/assets/map.png", value: 0 },
    { image: "/assets/mapImage.png", value: 1 },
    { image: "/assets/footer.png", value: 2 },
  ];

  return (
    <SubLayout>
      <Grid container className="bg-background ">
        <Grid item xs={6} className="bg-background">
          <div className="flex justify-center items-center h-full flex-col">
            <Image
              src={images[image].image}
              alt="foto de mapa"
              height={500}
              width={500}
              className="mt-5"
            />

            <div className="flex gap-4 mt-10">
              {images.map(({ image, value }, index) => (
                <Button
                  onClick={() => setImage(value)}
                  disableRipple={true}
                  className="hover:bg-background"
                >
                  <Image
                    key={index}
                    src={image}
                    alt="foto de mapa"
                    height={80}
                    width={80}
                    className="mt-5"
                  />
                </Button>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={6} className="bg-white pt-10">
          <div className="ml-10">
            <p className="font-bold text-4xl text-text-500 ">
              Burguer King, Loja Centro
            </p>
            <div className="flex mt-2">
              <Rating
                name="read-only"
                value={4.5}
                precision={0.1}
                className="text-warning-600"
                readOnly
                size="large"
              />
              <div className="flex ml-2 items-center">
                <p className="font-bold text-sm text-text-500">4,5</p>
                <p className="font-bold text-xs ml-1 text-text-500">(126)</p>
              </div>
            </div>

            <div className="flex mt-6 gap-3">
              {tags.map(({ icon, name }, index) => (
                <Tag key={index} name={name} icon={icon} />
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-4">
              <div className="flex gap-4">
                <div>
                  <p className="font-bold text-text-500 text-xl">
                    Horário:
                    <span
                      className="text-base ml-2"
                      style={{ fontWeight: "400" }}
                    >
                      16h - 22h
                    </span>
                  </p>
                </div>
                <div>
                  <p className="font-bold text-text-500 text-xl">
                    Salário:
                    <span
                      className="text-base ml-2"
                      style={{ fontWeight: "400" }}
                    >
                      Não remunerado
                    </span>
                  </p>
                </div>
              </div>

              <p className="font-bold text-text-500 text-xl">
                CH/S:
                <span className="text-base ml-2" style={{ fontWeight: "400" }}>
                  30h, Segunda - Sexta
                </span>
              </p>

              <div className="flex gap-4">
                <div>
                  <p className="font-bold text-text-500 text-xl">
                    Vagas:
                    <span className="text-base ml-2 text-blue-700">30</span>
                  </p>
                </div>
                <div>
                  <p className="font-bold text-text-500 text-xl">
                    Prazo de inscrição:
                    <span
                      className="text-base ml-2"
                      style={{ fontWeight: "400" }}
                    >
                      29/08/2023
                    </span>
                  </p>
                </div>
              </div>
              <p className="font-bold text-text-500 text-xl">
                Benéficios:
                <span className="text-base ml-2" style={{ fontWeight: "400" }}>
                  Vale transporte, alimentação
                </span>
              </p>
              <p className="font-bold text-text-500 text-xl">
                Requisitos:
                <span className="text-base ml-2" style={{ fontWeight: "400" }}>
                  Experiencia na area, formação em gastronomia
                </span>
              </p>
              <p className="font-bold text-text-500 text-xl">
                Descrição:
                <span className="text-base ml-2" style={{ fontWeight: "400" }}>
                  Buscamos um cozinheiro experiente, que saiba trabalhar com
                  carne, e que consiga trabalhar bem em equipe
                </span>
              </p>
              <p className="font-bold text-text-500 text-xl">
                Endereço:
                <span className="text-base ml-2" style={{ fontWeight: "400" }}>
                  Rua das Tanajuras, N25, Pau dos Ferros RN
                </span>
              </p>
            </div>
            <Image
              src={"/assets/map.png"}
              alt="foto de mapa"
              height={500}
              width={500}
              className="mt-5 mb-5"
            />
          </div>
        </Grid>
        <div className="bg-white border border-text-500 border-opacity-10 sticky mx-40 bottom-10 mb-5 mt-5 w-full rounded-lg flex items-center">
          <div className="flex items-center">
            <div className="px-8 py-4 ">
              <Image
                src={"/assets/mapImage.png"}
                alt="foto da empresa"
                width={120}
                height={120}
              />
            </div>
            <div>
              <p className="text-text-500 font-bold text-3xl">Burguer King</p>
              <p className="text-gray-600">Pau dos Ferros - RN</p>
            </div>
            <div className="flex flex-col ml-10">
              <p className="text-gray-600 text-center">Avaliar</p>
              <Rating
                name="read-only"
                value={value}
                precision={0.5}
                className="text-warning-600"
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                size="large"
              />
            </div>
          </div>
          <div className="flex items-center justify-end flex-1">
            <Button
              disableRipple={true}
              onClick={() => setFavorite(!favorite)}
              className="hover:bg-white mr-4"
            >
              {favorite ? (
                <Favorite
                  sx={{ width: 48, height: 48 }}
                  className="text-danger-600"
                />
              ) : (
                <FavoriteBorder
                  className="text-text-500"
                  sx={{ width: 48, height: 48 }}
                />
              )}
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-600 text-white px-8 font-semibold py-4 rounded-lg text-xl font-poppins mr-8" style={{textTransform: "none"}}>
              Inscrever-se
            </Button>
          </div>
        </div>
      </Grid>
    </SubLayout>
  );
}
