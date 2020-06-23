/* tslint:disable */
import React, { useState, useContext } from "react";

import { sendIdentification } from "../../services/sendIdentification";
import { PlantContext } from "../../context/plant/PlantContext";
import { styles } from "./styles";

import Button from "@material-ui/core/Button";

function IdentifyForm({ setLoading, loading }: any) {
  const [file, setFile] = useState();
  const { dispatchPlant } = useContext(PlantContext);

  const handleChange = (selectorFiles: any) => {
    console.log(selectorFiles);
    setFile(selectorFiles);
  };

  return (
    <form style={styles.form}>
      <div style={styles.dragBox}>
        <span style={styles.chooseImage}>Choose image</span>
        <span style={styles.boxMessage}>
          {file ? file.name : "or drop here"}
        </span>
        <input
          style={styles.input}
          type="file"
          required
          onChange={(e) => {
            handleChange(e.target.files[0]);
          }}
        />
      </div>
      <Button
        style={styles.submitBtn}
        type="submit"
        disabled={loading}
        onClick={() => {
          if (file && localStorage.getItem("current_plant")) {
            sendIdentification(file, dispatchPlant, setLoading);
            setLoading(true);
          }
        }}
      >
        OK
      </Button>
    </form>
  );
}

export default IdentifyForm;
