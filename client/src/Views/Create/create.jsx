import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { postDriver, getTeams, getNationality } from '../../Redux/actions/index';
import './create.style.css';
import image from "../../Components/Imagenes/f1image.jpg";
import imagenBack from "../../Components/Imagenes/flechaback1.png"
d



const validate = ({forename, surname, nationality, image, dob, description, team}) => {
  let errors = {}
  let regexNotNumbers = /([0-9])+/;
  let regexImg= (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);

  if(!forename){
      errors.forename = 'Por favor, ingrese un nombre'
  }else if(forename.length > 40 || forename.length < 2){
      errors.forename = 'El nombre debe contener mas de 2 caracteres y menos de 40'
  }else if(regexNotNumbers.test(forename.trim())){
      errors.name = 'No se permiten números'
  }

  if(!surname){
      errors.surname = 'Por favor, ingrese un apellido'
  }else if(surname.length < 2 || surname.length > 40 ){
      errors.surname = 'El apellido debe contener mas de 2 caracteres y menos de 40'
  }else if(regexNotNumbers.test(forename.trim())){
      errors.surname = 'No se permiten números'
  }

  if(!nationality){
      errors.nationality = 'Por favor, ingrese una nacionalidad'
  }

  if (!image) {
      errors.image= "Por favor, inserta una imagen"
  } else if (!regexImg.test(image.trim())) {
      errors.image= "Por favor, ingrese un formato válido"
  }

  if(!dob){
      errors.dob = 'Por favor, ingrese una fecha de nacimiento'
  }


  if(!description){
      errors.description = 'Por favor, ingrese una descripción'
  }else if(description.trim().length < 10) {
      errors.description = 'La descripción debe contener al menos 10 caracteres'
  }

  if(team === null){
      errors.team = 'Por favor, seleccione al menos un equipo'
  }



  return errors
}

const Create = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const nameList = useSelector((state) => state.allDrivers);
  const nationality = useSelector((state) => state.nationality)
  console.log(nationality)



  const [input, setInput] = useState({
    forename: '',
    surname: '',
    description: '',
    image: '',
    dob: '',
    nationality: [],
    teams: [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTeams());
    dispatch(getNationality());

  }, [dispatch]);

  const handleTeams = (event) => {
    const selectedTeam = event.target.value;
    if (selectedTeam !== 'all') {
      setInput({
        ...input,
        teams: [...input.teams, selectedTeam],
      });
    }
  };
  
  const handleNationality = (event) => {
    setInput({
      ...input,
      nationality: [...new Set([...input.nationality, event.target.value])],
    });
  };
  const handleDeleteTeam = (teamToDelete) => {
    setInput({
      ...input,
      teams: input.teams.filter((team) => team !== teamToDelete),
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
     
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let noRepeat = nameList.filter((n) => n.forename === input.forename);
    if (noRepeat.length) {
      alert("Ya existe un piloto con ese nombre");
      errors.forename = "Ya existe un piloto con ese nombre";
    } else {
      let error = Object.keys(validate(input));
      if (error.length || !input.teams.length || !input.nationality.length) {
        alert("Falta completar datos");
        errors.teams = "falta completar datos";
        error.nationality = "falta completar datos";
      } else {
        dispatch(postDriver(input));
        alert("piloto creado!!");
        setInput({
          forename: "",
          surname: "",
          description: "",
          image: "",
          dob: "",
          nationality: [],
          teams: [],
        });
        
  };
}}

  return (
    <div>
       <div>
      <Link to={"/home"}>
    
      <img className="img-back" src={imagenBack} alt="imagenBack" />
   
  </Link>
      </div>       
      <form className="create-form" onSubmit={handleSubmit}>
        <input type="text" name="forename" value={input.forename} onChange={handleChange} placeholder="Name" /> {errors.forename && <p className="errors" >{errors.forename}</p>}
        <input type="text" name="surname" value={input.surname} onChange={handleChange} placeholder="Lastname" /> {errors.surname && <p  className="errors">{errors.surname}</p>}
        <input type="text" name="description" value={input.description} onChange={handleChange} placeholder="Description" /> {errors.description && <p className="errors" >{errors.description}</p>}
        <input type="text" name="image" value={input.image} onChange={handleChange} placeholder="URL  image" /> {errors.image && <p className="errors" >{errors.image}</p>}
        <input type="date" name="dob" value={input.dob} onChange={handleChange} placeholder="Fecha de Nacimiento" className="create-input" /> {errors.dob && <p className="errors" >{errors.dob}</p>}
        <div>
          <label>Nationality</label>
          <select onChange={handleNationality}>
            <option value="all">Nationality...</option>
            {nationality?.map((n, index) => (
              <option key={index} value={n.name}>
                {n.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-options">
          {input.nationality.map((n) => (
            <span key={n} className="option-label">
             
              <p>{n}</p>
            </span>
          ))}
        </div>

        
        <div>
          <label>Teams</label>
          <select onChange={handleTeams}>
            <option value="all">Teams...</option>
            {teams?.map((t, index) => (
              <option key={index} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="form-options">
          {input.teams.map((t) => (
            <span key={t} className="option-label">
              <button className="button-options" onClick={() => handleDeleteTeam(t)}>
                <span>X</span>
              </button>
              <p>{t}</p>
            </span>
          ))}
        </div>
        <button type="submit">Create Driver</button>
      </form>
      <img className="f1image" src={image} alt="f1" />

    </div>
  );
};

export default Create;
