"use client";
import Announcement from "@/components/Announcement";
import SubLayout from "../sublayout";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  ListItemText,
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
      order: yup.string(),
      tags: yup.array().of(yup.number()),
      stipendiary: yup
        .string()
        .transform((value) => (value === "false" ? void 0 : value)),
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
  const [tags, setTags] = useState([]);


  const onSubmit = handleSubmit(async (data) => {
    const response = await api.get(
      `/announces/?search=${data.search ? data.search : ""}&order=${
        data.order ? data.order : ""
      }&rentable=${data.stipendiary ? data.stipendiary : ""}&tags=${data.tags && data.tags}`
    );

    setAnnouncements(response.data);
  });

  const optionsSelectOrderBy = [
    { label: "Mais vagas", value: "vacancies" },
    { label: "Mais recentes", value: "creation_time" },
    { label: "Melhor avaliado", value: "rate" },
  ];
  const optionsSelectStipendiary = [
    { label: "Remunerado", value: "true" },
    { label: "Não remunerado", value: "false" },
  ];

  const optionsSelect = [
    { label: "Opção 1", value: 0 },
    { label: "Opção 2", value: 1 },
    { label: "Opção 3", value: 2 },
  ];

  const handleAnnouncement = async () => {
    const response = await api.get("/announces/");
    if (response.data.length > 0) {
      setAnnouncements(response.data);
    }
  };
  const handleTags = async () => {
    const response = await api.get("/tags/");
    if (response.data.length > 0) {
      setTags(response.data);
    }
  };

  useEffect(() => {
    handleAnnouncement();
    handleTags();
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
              name="order"
              control={control}
              defaultValue={optionsSelectOrderBy[0].value}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="Ordenar por">Ordenar por</InputLabel>
                  <Select
                    labelId="Ordenar por"
                    id="demo-simple-select"
                    label="Ordenar por"
                    {...field}
                    onChange={(e) => field.onChange(String(e.target.value))}
                  >
                    {optionsSelectOrderBy.map(({ label, value }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="stipendiary"
              control={control}
              defaultValue={optionsSelectStipendiary[0].value}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="Remuneração">Remuneração</InputLabel>
                  <Select
                    labelId="Remuneração"
                    id="demo-simple-select"
                    label="Remuneração"
                    {...field}
                    onChange={(event) =>
                      field.onChange(String(event.target.value))
                    }
                  >
                    {optionsSelectStipendiary.map(({ label, value }) => (
                      <MenuItem value={value}>{label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <FormControl fullWidth>
              <InputLabel id="select-multiple-checkbox-label">
                Selecione as opções
              </InputLabel>
              <Controller
                name="tags"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Select
                    labelId="select-multiple-checkbox-label"
                    id="select-multiple-checkbox"
                    label="Selecione as opções"
                    multiple
                    {...field}
                    onChange={(event) => field.onChange(event.target.value)}
                    renderValue={(selected) => (
                      <div>
                        {selected.map((value) => (
                          <span key={value}>{tags[value-1].tag_name}, </span>
                        ))}
                      </div>
                    )}
                  >
                    {tags.map(({ tag_name, id }) => (
                      <MenuItem key={id} value={id}>
                        <Checkbox checked={field.value.indexOf(id) > -1} />
                        <ListItemText primary={tag_name} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
        </form>
        <p className="text-blue-600 font-bold text-3xl mt-5 mb-5">
          {annoucements.length > 0 &&
            `${annoucements.length} anúncios encontrados`}
        </p>
        <div className="flex flex-col gap-6 mb-10">
          {annoucements.length > 0 ? (
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
            )
          ) : (
            <p className="text-text-500 text-2xl text-center font-bold">
              Nenhum anúncio encontrado
            </p>
          )}
        </div>
      </div>
    </SubLayout>
  );
}
