import {Autocomplete, Chip, FormControl, Input, InputLabel, MenuItem, Select, TextField} from "@mui/material";

export const TableSelector = ({ tables, handleChange } = []) => {
  return (
      tables?.length > 0 && (
      <FormControl fullWidth >
        <InputLabel htmlFor="table-selector">Table Selector</InputLabel>
        <Select
          label="Table Selector"
          onChange={handleChange}
          name="table"
        >
          {
            tables.map(table => (
              <MenuItem key={table.table} value={table.table}>{table.table}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    )
  )
}

export const DomainSelector = ({ form, handleChange } = []) => {
  const { domains = [] } = form;
  const stringDomains = domains.join(', ');
  const handleDomainChange = (event) => {
    const { value } = event.target;
    const newDomains = value.split(',').map(domain => domain.trim());
    handleChange({ target: { name: 'domains', value: newDomains } });
  }
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="domain-selector">Domain Selector</InputLabel>
      <Input
        id="domain-selector"
        value={stringDomains}
        onChange={handleDomainChange}
      />
    </FormControl>
  )
}

export const CountrySelector = ({ form, handleChange, allCountries } = []) => {
  const { countries = [] } = form;
  const selectedCountries = allCountries.filter(country => countries.includes(country.code));
  const handleCountryChange = (event, value) => {
    handleChange({ target: { name: 'countries', value } });
  }
  return (
    <Autocomplete
      multiple
      id="country-selector"
      options={allCountries}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Country Selector"
        />
      )}
      onChange={handleCountryChange}
    />
  )
}

// export const DateRangeSelector = ({ form, handleChange } = []) => {
//   return (
//     // <LocalizationProvider dateAdapter={AdapterDayjs}>
//     //   <DemoContainer components={['DateRangePicker']}>
//     //     <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
//     //   </DemoContainer>
//     // </LocalizationProvider>
//   );
// }
