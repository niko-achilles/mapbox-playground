import React from "react";

import Context from "../../../context/context.js";

import axios from "axios";

const CreateContent = () => {
  const [title, setTitle] = React.useState("");
  const [image, setImage] = React.useState("");
  const [text, setText] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const { state, dispatch } = React.useContext(Context);

  const handleDeleteDraft = () => {
    setTitle("");
    setImage("");
    setText("");
    dispatch({ type: "DELETE_DRAFT" });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setSubmitting(true);
      const url = await handleImageUpload();
      const { latitude, longitude } = state.draft;
      const payload = { text, image, title, url, latitude, longitude };
      console.log(payload);
      dispatch({ type: "CREATE_PIN", payload });
      handleDeleteDraft();
    } catch (error) {
      setSubmitting(false);
      console.error("Error creating pin", err);
    }
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "geopins");
    data.append("cloud_name", "nikolaosachilles");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/nikolaosachilles/image/upload",
      data
    );
    return res.data.url;
  };

  return (
    <div className="create-content">
      <h3>Σημείο στο χάρτη</h3>
      <form>
        <div className="flex-container">
          <input
            type="text"
            placeholder="Τίτλος σημείου"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="image">
            <span className="add-photo">
              <i className="far fa-image"></i>
            </span>
          </label>
          <input
            hidden
            type="file"
            accept="image/*"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <textarea
          rows="8"
          placeholder="Για πες μας..."
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex-container">
          <button className="cta mr-1" onClick={handleDeleteDraft}>
            Άλλη φορά
          </button>
          <button
            className="cta"
            type="submit"
            onClick={handleSubmit}
            disabled={!title.trim() || !text.trim() || !image || submitting}
          >
            Δημοσίευσε
          </button>
        </div>
      </form>
      <style jsx>
        {`
        .create-content{
          padding-top: 15rem;
        }
        h3{
          text-align: left;
        }
          input[type="text"] {
            width: 100%;
            padding: 1em;
          
            border: 1px solid #acacac;
            color: #1b1820;
            font-size: inherit;
          }

          input[type="text"]:focus,
          textarea:focus {
            outline: 3px solid #acacac;
          }

          textarea {
            width: 100%;
            padding: 1em;
     
            border: 1px solid #acacac;
            color: #1b1820;
            font-size: 1.2rem;
            margin-top: 1em;
          }

          .flex-container {
            width: 100%;
            margin-top: 1em;
            display: flex;
            justify-content: flex-end;
          }

          .cta {
            flex: 0 0 50%
            display: inline-block;

            padding: 1em;
            text-align: center;
            text-decoration: none;

            color:  #1b1820;
            background: #acacac;

            font-weight: bold;
            font-size: 0.8em;
            border: 2px solid black;
          }
          .cta:focus, .cta:hover{
            background-color: black;
            color: white;
            border: 2px solid white;

          }
          .cta[disabled]{
            border: none;
            pointer-events: none;
            color: #2e2e2e;
            background-color: #dadada;
            font-weight: 100;
          }

          .mr-1 {
            margin-right: 0.5em;
          }
          .add-photo{
            font-size: 3rem;
            
       
            border: 1px solid #acacac;
            color:  #1b1820;
            
          }
        `}
      </style>
    </div>
  );
};

export default CreateContent;
