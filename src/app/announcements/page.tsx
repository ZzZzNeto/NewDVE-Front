"use client";
import Announcement from "@/components/Announcement";
import SubLayout from "../sublayout";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
import axios from "axios";
import api from "@/services/api";
export default function Announcements() {
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const schema = yup
    .object({
      search: yup.string(),
      rating: yup.number(),
      period: yup.number(),
      order: yup.number(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [annoucements, setAnnouncements] = useState([]);
  const onSubmit = handleSubmit((data) => alert(JSON.stringify(data)));

  const handleAnnouncement = async () => {
    const response = await api.get("/announces/");
    if (response.data.length > 0) {
      setAnnouncements(response.data);
    }
  };

  useEffect(() => {
    handleAnnouncement();
  }, []);

  return (
    <SubLayout>
      <div className="flex flex-col gap-4 bg-background px-[270px]">
        <form
          className="flex flex-col w-full pt-10 rounded-lg"
          onSubmit={onSubmit}
        >
          <div className="flex w-full mb-10">
            <Controller
              name="search"
              control={control}
              render={({ field }) => (
                <TextField
                  id="outlined-basic"
                  label="Busque aqui"
                  className="w-11/12 border-none"
                  {...field}
                />
              )}
            />
            <Button
              style={{ textTransform: "none" }}
              type="submit"
              className="flex items-center justify-center flex-1 text-white font-semibold bg-blue-600 hover:bg-blue-600 rounded-e-lg rounded-s-none"
            >
              Buscar
            </Button>
          </div>
          <div className="flex justify-between gap-8">
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="nameCompany">Nome da empresa</InputLabel>
                  <Select
                    labelId="nameCompany"
                    id="demo-simple-select"
                    label="Nome da empresa"
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="period"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="period">Período</InputLabel>
                  <Select
                    labelId="period"
                    id="demo-simple-select"
                    label="Período"
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="order"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="rating">Ordenar</InputLabel>
                  <Select
                    labelId="rating"
                    id="demo-simple-select"
                    label="Ordenar"
                    {...field}
                    onChange={(event) =>
                      field.onChange(Number(event.target.value))
                    }
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </div>
        </form>
        <p className="text-blue-600 font-bold text-3xl mt-5 mb-5">
          {annoucements.length > 0 ? `${annoucements.length} anúncios encontrados` : "" }
        </p>
        <div className="flex flex-col gap-6 mb-10">
          {annoucements.length > 0 &&
            annoucements.map(
              (
                {
                  id,
                  company_name,
                  company_image,
                  main_image,
                  rate,
                  total_rates,
                  city,
                  tags,
                  vacancies,

                },
                index
              ) => (
                <Announcement
                  id={id}
                  city={city}
                  companyName={company_name}
                  image={main_image?.image}
                  quantity={total_rates}
                  rating={rate}
                  tags={tags}
                  vacancies={vacancies}
                  key={index}
                />
              )
            )}
        </div>
      </div>
    </SubLayout>
  );
}
