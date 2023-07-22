"use client";
import { Typography, Grid, Rating, Button } from "@mui/material";
import SubLayout from "../../sublayout";
import Tag from "@/components/Tag";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import api from "@/services/api";
import axios from "axios";

interface AnnoucementDetailProps {
  params: {
    id: string;
  };
}

interface Tag {
  id: number;
  tag_name: string;
  icon: string;
}
interface Inscript {
  id: number;
  email: string;
  name: string;
}

interface Images {
  id: number;
  image: string;
  announcement: number;
}
interface Announcement {
  id: number;
  tags: Tag[];
  schedule: string;
  salary: number;
  journey: string;
  vacancies: number;
  deadline: String;
  benefits: string;
  requeriments: string;
  description: string;
  address: {
    id: number;
    state: string;
    city: string;
    district: string;
    street: string;
    number: string;
    cep: string;
  }
  curriculum: string;
  course: string;
  total_workload: string;
  inscripts: Inscript[];
  creator: {
    id: number;
    email: string;
    name: string;
  }
  images: Images[];
  company_name: string;
  rate: number;
  total_rates: number;
  inscript: boolean;
  favorite: boolean;
  rated: boolean;
}
export default function AnnoucementDetail({ params }: AnnoucementDetailProps) {
  const [image, setImage] = useState(0);
  const [value, setValue] = useState<number | null>(0);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [announcement, setAnnouncement] = useState<Announcement[] | null>(null);
  const [loadAnnouncemet, setLoadAnnouncemet] = useState(false);

  const displayMap = async () => {
    if (announcement?.address) {
      const queryString = `housenumber=${
        announcement?.address?.number
      }&street=${encodeURIComponent(announcement?.address?.street)}&postcode=${
        announcement?.address?.cep
      }&city=${encodeURIComponent(
        announcement?.address?.city
      )}&state=${encodeURIComponent(
        announcement?.address?.state
      )}&format=json&apiKey=3b011d230823499d831285fb00b49c04`;
      const apiUrl = `https://api.geoapify.com/v1/geocode/search?${queryString}`;

      const response = await axios.get(apiUrl);
      setLat(response.data.results[0].lat);
      setLon(response.data.results[0].lon);
      console.log(response.data.results[0].lon);
      console.log(response.data.results[0].lat);
    }
  };

  const handleAnnouncement = async () => {
    const response = await api.get(`/announces/${params.id}/`);

    if (response.data) {
      setAnnouncement(response.data);
      displayMap()
    }
  };

  const handleFavoritedAnnouncement = async () => {
    await api.post(`/announces/${params.id}/save_unsave/`);
    setLoadAnnouncemet(!loadAnnouncemet);
  };

  const handleRateAnnouncement = async (rate: number) => {
    await api.post(`/ratings/`, { rate: rate, announcement: params.id });
    setValue(rate);
    setLoadAnnouncemet(!loadAnnouncemet);
  };

  const handleInscriptAnnouncement = async () => {
    await api.post(`/announces/${params.id}/subscribe_unsubscribe/`);
    setLoadAnnouncemet(!loadAnnouncemet);
  };

  useEffect(() => {
    handleAnnouncement();
  }, [loadAnnouncemet]);

  return (
    <SubLayout>
      <Grid container className="bg-background ">
        <Grid item xs={6} className="bg-background">
          <div className="flex justify-center items-center h-full flex-col">
            {announcement?.images && (
              <Image
                src={`http://127.0.0.1:8000${announcement?.images[image].image}`}
                alt="foto de mapa"
                height={500}
                width={500}
                className="mt-5"
              />
            )}

            <div className="flex gap-4 mt-10">
              {announcement?.images &&
                announcement?.images.map(({ image, id }, index) => (
                  <Button
                    onClick={() => setImage(index)}
                    disableRipple={true}
                    className="hover:bg-background"
                  >
                    <Image
                      key={index}
                      src={`http://127.0.0.1:8000${image}`}
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
                <p className="font-bold text-sm text-text-500">
                  {announcement?.rate}
                </p>
                <p className="font-bold text-xs ml-1 text-text-500">
                  (<span>{announcement?.total_rates}</span>)
                </p>
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
              className="my-[30px]"
              width={600}
              height={400}
              src={`https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${lon},${lat}&zoom=15.9318&marker=lonlat:${lon},${lat};type:material;color:%23ff0000;size:large;icon:home;iconsize:small&apiKey=3b011d230823499d831285fb00b49c04`}
              alt="map"
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
                value={announcement?.rated ? announcement?.rated : 0}
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
              className={` ${
                announcement?.inscript
                  ? " bg-danger-600 hover:bg-danger-600"
                  : " bg-blue-600 hover:bg-blue-600"
              } text-white px-8 font-semibold py-4 rounded-lg text-xl font-poppins mr-8`}
              style={{ textTransform: "none" }}
              onClick={handleInscriptAnnouncement}
            >
              {announcement?.inscript ? "Cancelar inscrição" : "Inscrever-se"}
            </Button>
          </div>
        </div>
      </Grid>
    </SubLayout>
  );
}
