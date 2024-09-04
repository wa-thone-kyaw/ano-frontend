import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  TextField,
} from "@mui/material";

const FilterSection = ({ filters, setFilters, filterOptions }) => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={3}>
      <FormControl fullWidth>
        <InputLabel>Product Group</InputLabel>
        <Select
          value={filters.group}
          onChange={(e) => setFilters({ ...filters, group: e.target.value })}
        >
          <MenuItem value="">All</MenuItem>
          {filterOptions.groups.map((group) => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} md={3}>
      <FormControl fullWidth>
        <InputLabel>Raw Material Type</InputLabel>
        <Select
          value={filters.rawMaterial}
          onChange={(e) =>
            setFilters({ ...filters, rawMaterial: e.target.value })
          }
        >
          <MenuItem value="">All</MenuItem>
          {filterOptions.rawMaterials.map((rawMaterial) => (
            <MenuItem key={rawMaterial} value={rawMaterial}>
              {rawMaterial}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} md={3}>
      <FormControl fullWidth>
        <InputLabel>Machine Type</InputLabel>
        <Select
          value={filters.machineType}
          onChange={(e) =>
            setFilters({ ...filters, machineType: e.target.value })
          }
        >
          <MenuItem value="">All</MenuItem>
          {filterOptions.machineTypes.map((machineType) => (
            <MenuItem key={machineType} value={machineType}>
              {machineType}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12} md={3}>
      <FormControl fullWidth>
        <InputLabel>MO Number</InputLabel>
        <Select
          value={filters.moNumber}
          onChange={(e) => setFilters({ ...filters, moNumber: e.target.value })}
        >
          <MenuItem value="">All</MenuItem>
          {filterOptions.moNumbers.map((moNumber) => (
            <MenuItem key={moNumber} value={moNumber}>
              {moNumber}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Search by Product Name"
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />
    </Grid>
  </Grid>
);

export default FilterSection;
