import React, { useState, useContext } from "react";

import { PlantContext } from "../context/plant/PlantContext";

import IdentifyForm from "../components/IdentifyForm/IdentifyForm";
import PlantInfo from "../components/PlantInfo/PlantInfo";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import { Grid, LinearProgress } from "@material-ui/core";
import { Paper } from "@material-ui/core";

function Identify() {
  const { Plant } = useContext(PlantContext);
  const [loading, setLoading] = useState(false);

  const logicalPlant =
    Plant.suggestions === undefined && !localStorage.getItem("current_plant")
      ? null
      : Plant.suggestions !== undefined
      ? Plant
      : localStorage.getItem("current_plant")
      ? JSON.parse(localStorage.getItem("current_plant"))
      : Plant;

  // Get plant info via localStorage. If there is nothing in localStorage, then return nothing
  const mappedPlantInfo =
    logicalPlant &&
    logicalPlant.suggestions.map(
      (
        { plant_name, plant_details, probability, similar_images }: any,
        index: any
      ) => {
        return (
          <Grid key={index} item xs={12} md={6}>
            <PlantInfo
              similarImg={similar_images[0].url}
              name={plant_name}
              commonNames={plant_details.common_names}
              wikiUrl={plant_details.url}
              probability={probability}
            />
          </Grid>
        );
      }
    );

  return (
    <Grid container spacing={6} style={{ maxWidth: 986 }}>
      <Grid item xs={12}>
        <Paper style={{ padding: 12 }}>
          <Grid container>
            <Grid item xs={12} md={9} lg={10}>
              <ErrorBoundary>
                <IdentifyForm setLoading={setLoading} loading={loading} />
              </ErrorBoundary>
            </Grid>
            <Grid item xs={12} md={3} lg={2} style={{ textAlign: "end" }}>
              {logicalPlant && (
                <img
                  style={{
                    height: 122,
                    border: "1px solid #c4c4c4",
                    borderRadius: "4px",
                    padding: "6px",
                  }}
                  src={logicalPlant.images[0].url}
                  alt="Your flower"
                />
              )}
            </Grid>
          </Grid>
        </Paper>
        {loading && (
          <LinearProgress color="secondary" style={{ borderRadius: 6 }} />
        )}
      </Grid>
      <Grid container>{mappedPlantInfo}</Grid>
    </Grid>
  );
}

export default Identify;
