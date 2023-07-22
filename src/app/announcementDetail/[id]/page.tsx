"use client";
import { Typography, Grid, Rating, Button } from "@mui/material";
import SubLayout from "../../sublayout";
import Tag from "@/components/Tag";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import api from "@/services/api";

interface AnnoucementDetailProps {
  params: {
    id: string;
  };
}
export default function AnnoucementDetail({ params }: AnnoucementDetailProps) {
  const [image, setImage] = useState(0);
  const [value, setValue] = useState<number | null>(0);
  const [favorite, setFavorite] = useState<boolean | null>(false);
  const images = [
    { image: "/assets/map.png", value: 0 },
    { image: "/assets/mapImage.png", value: 1 },
    { image: "/assets/footer.png", value: 2 },
  ];

  const [announcement, setAnnouncement] = useState();
  const [loadAnnouncemet, setLoadAnnouncemet] = useState(false);
  const handleAnnouncement = async () => {
    const response = await api.get(`/announces/${params.id}/`);

    if (response.data) {
      setAnnouncement(response.data);
      console.log(response.data);
    }
  };

  const handleFavoritedAnnouncement = async () => {
    await api.post(`/announces/${params.id}/save_unsave/`);
    setLoadAnnouncemet(true)
  };

  const handleRateAnnouncement = async (rate: number) => {
    await api.post(`/ratings/`, { rate: rate, announcement: params.id });
    setValue(rate);
    setLoadAnnouncemet(true);

  };

  const handleInscriptAnnouncement = async () => {
    await api.post(`/announces/${params.id}/subscribe_unsubscribe/`);
    setLoadAnnouncemet(true);
  };

  useEffect(() => {
    handleAnnouncement();
    setLoadAnnouncemet(false)
  }, [loadAnnouncemet]);

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
              {announcement?.company_name}
            </p>
            <div className="flex mt-2">
              <Rating
                name="read-only"
                value={Number(announcement?.rate)}
                precision={0.5}
                className="text-warning-600"
                readOnly
                size="large"
              />
              <div className="flex ml-2 items-center">
                <p className="font-bold text-sm text-text-500">{announcement?.rate}</p>
                <p className="font-bold text-xs ml-1 text-text-500">(<span>{announcement?.total_rates}</span>)</p>
              </div>
            </div>

            <div className="flex mt-6 gap-3">
              {announcement?.tags.map(({ icon, tag_name }, index) => (
                <Tag key={index} tag_name={tag_name} icon={icon} />
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
                      {announcement?.schedule}
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
                      {announcement?.salary}
                    </span>
                  </p>
                </div>
              </div>

              <p className="font-bold text-text-500 text-xl">
                CH/S:
                <span className="text-base ml-2" style={{ fontWeight: "400" }}>
                  {announcement?.journey}
                </span>
              </p>

              <div className="flex gap-4">
                <div>
                  <p className="font-bold text-text-500 text-xl">
                    Vagas:
                    <span className="text-base ml-2 text-blue-700">
                      {announcement?.vacancies}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="font-bold text-text-500 text-xl">
                    Prazo de inscrição:
                    <span
                      className="text-base ml-2"
                      style={{ fontWeight: "400" }}
                    >
                      {announcement?.deadline}
                    </span>
                  </p>
                </div>
              </div>
              <p className="font-bold text-text-500 text-xl">
                Benéficios:
                <span className="text-base ml-2" style={{ fontWeight: "400" }}>
                  {announcement?.benefits}
                </span>
              </p>
              <p className="font-bold text-text-500 text-xl">
                Requisitos:
                <span className="text-base ml-2" style={{ fontWeight: "400" }}>
                  {announcement?.requeriments}
                </span>
              </p>
              <p className="font-bold text-text-500 text-xl">
                Descrição:
                <span className="text-base ml-2" style={{ fontWeight: "400" }}>
                  {announcement?.description}
                </span>
              </p>
              <p className="font-bold text-text-500 text-xl">
                Endereço:
                <span className="text-base ml-2" style={{ fontWeight: "400" }}>
                  {announcement?.address.street}, {announcement?.address.number}
                  , {announcement?.address.city}
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
              <p className="text-text-500 font-bold text-3xl">
                {announcement?.company_name}
              </p>
              <p className="text-gray-600">{announcement?.address.city}</p>
            </div>
            <div className="flex flex-col ml-10">
              <p className="text-gray-600 text-center">Avaliar</p>
              <Rating
                name="read-only"
                value={announcement?.rated ? announcement?.rated : 0 }
                precision={0.5}
                className="text-warning-600"
                onChange={(event, newValue) => handleRateAnnouncement(newValue)}
                size="large"
              />
            </div>
          </div>
          <div className="flex items-center justify-end flex-1">
            <Button
              disableRipple={true}
              onClick={handleFavoritedAnnouncement}
              className="hover:bg-white mr-4"
            >
              {announcement?.favorite ? (
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
            <Button
              className={` ${announcement?.inscript ? " bg-danger-600 hover:bg-danger-600" : " bg-blue-600 hover:bg-blue-600"} text-white px-8 font-semibold py-4 rounded-lg text-xl font-poppins mr-8`}
              style={{ textTransform: "none" }}
              onClick={handleInscriptAnnouncement}
            >
              {announcement?.inscript ? 'Cancelar inscrição' : 'Inscrever-se'}
            </Button>
          </div>
        </div>
      </Grid>
    </SubLayout>
  );
}
