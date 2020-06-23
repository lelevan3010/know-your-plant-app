export const sendIdentification = (
  file: any,
  dispatchPlant: any,
  setLoading: any
) => {
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = event.target!.result;
      console.log(res);
      resolve(res);
    };
    reader.readAsDataURL(file);
  }).then((base64file) => {
    console.log(base64file);
    const data = {
      api_key: "8AVKV6OtqzOqKhwKiKaMsyyi5JvgJ0jH0dBOtIkHTXv7ejkVvz",
      images: [`${base64file}`],
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      plant_details: [
        "common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms",
      ],
    };
    fetch("https://api.plant.id/v2/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        dispatchPlant({
          type: "GET_PLANT",
          payload: {
            Plant: data,
          },
        });
        localStorage.setItem("current_plant", JSON.stringify(data));
        setLoading(false);
      })
      .catch((error) => {
        console.log("from sendIdentification", error);
        throw new Error("Something went wrong!");
      });
  });
};
