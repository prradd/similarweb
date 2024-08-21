'use client'
import styles from "@/app/page.module.css";
import {Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {CountrySelector, DomainSelector, TableSelector} from "@/app/request-builder/components/Selectors";

const DESIRED_TABLES = [
  'traffic_and_engagement',
  'marketing_channels',
  'site_keywords'
];

const START_DATE = new Date();
const END_DATE = new Date();
END_DATE.setUTCHours(23,59,59,999);

const COUNTRIES = [
  {
    name: 'United Kingdom',
    code: 'GB'
  },
  {
    name: 'Australia',
    code: 'AU'
  },
  {
    name: 'United States',
    code: 'US'
  },
  {
    name: 'Israel',
    code: 'IL'
  }
]

export default function RequestBuilder() {
  const [table, setTable] = useState([]);
  const [form, setForm] = useState({
    table: '',
    domains: [],
    countries: [],
    dateRange: {
      startDate: START_DATE,
      endDate: END_DATE
    },
    granularity: 'daily',
    metrics: [],
  });

  useEffect(() => {
    fetch('https://api.similarweb.com/v3/batch/tables/describe', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'api-key': '31811b8e277746e5872f416a2dfb2975'
      }
    })
      .then(response => response.json())
      .then(data => {
        const cleanedData = data.filter(table => DESIRED_TABLES.includes(table?.table));
        setTable(cleanedData)
      });
  }
  , []);

  console.log(table)
  console.log(form)
  const handleSubmit = (event) => {
  }

  const handleChange = (event) => {
    console.log(event)
  const { name, value } = event?.target || event;
    setForm({
      ...form,
      [name]: value
    });
  }

  return (
    <main className={styles.main}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <h2>Request Builder</h2>
        </Grid>
        <Grid container xs={4}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, mx: 'auto', width: '300px', display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <Typography variant="h5" component="div" gutterBottom>
              User's Input Area
            </Typography>
            <TableSelector tables={table} handleChange={handleChange} />
            <DomainSelector form={form} handleChange={handleChange} />
            <CountrySelector form={form} handleChange={handleChange} allCountries={COUNTRIES} />
          </Box>
        </Grid>
      </Grid>
    </main>
  );
}
