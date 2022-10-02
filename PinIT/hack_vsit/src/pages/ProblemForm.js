import { useRef } from "react";
import { useUserContext } from "../context/UserContext";
import style from "./ProblemForm.module.css";
//Import context api

const ProblemForm = () => {
  const { getCurrentLocation, currentLocation, showForm, setShowForm, savePins,
  showLocationPin, setShowLocationPin} = useUserContext();

  const formRef = useRef(null);

  const handleSubmit = (e)=>{

    e.preventDefault();
    
    const allDetails = {
        location: currentLocation,
        problemType: formRef.current.problemType.value,
        severity: formRef.current.severity.value,
        description: formRef.current.description.value,
        personName: formRef.current.personName.value,
    }

    const allPins = {
        location: currentLocation,
        problemType: formRef.current.problemType.value,
    }

    console.log("Form Values: ",allDetails);

    //Saving To Database
    savePins(allPins);

    //Reloading AllBlogs after Adding new BLog
    // setReloadPage(reloadPage + 1);
  }

  return (
    <div className={style.formDiv}>

      <button className={style.closeBtn} onClick={() => {setShowForm(!showForm); setShowLocationPin(!showLocationPin)}}>{" "}Close{" "}</button>
      <button className={style.addPin} onClick={() => {getCurrentLocation()}}>{" "}Add Pin{" "}</button>

      <form className={style.form} onSubmit={handleSubmit} ref={formRef}>

        <label htmlFor={style.fname}>Problem Type</label>
        <select name="problemType" required>
          <option value="broken-road" >Broken Road</option>
          <option value="faulty-traffic-light" >Faulty Traffic Light</option>
          <option value="garbage-pile">Garbage Pile</option>
          <option value="broken-water-pipe">Broken Water Pipe</option>
          <option value="non-working-street-light">Non Working Street Light</option>
          <option value="others">Others</option>
        </select>

        <label htmlFor={style.fname}>Severity</label>
        <select  name="severity" required>
          <option value="low" >Low Severity</option>
          <option value="medium" >Medium Severity</option>
          <option value="high">High Severity</option>
          <option value="extreme">Extreme Severity</option>
        </select>


        <label htmlFor="location">Location </label>

        <div className={style.locationDiv}>
          <span>{currentLocation.lat}</span>
          <span>{currentLocation.lng}</span>
        </div>

        <label htmlFor="description">Describe Your Problem</label>
        <textarea rows="3" cols="45" name="description" placeholder="Write a brief description..."/>

        <label htmlFor="lname">Registration Date</label>
        <input type="date" name="date" autoComplete="off"/>

        <label htmlFor="personName">Your Name</label>
        <input type="text" name="personName" autoComplete="off" placeholder="Option Field"/>

        <div className={style.btnDiv}>
          <button className={style.btn} id="submit"> Submit </button>
          <button className={style.btn} id="reset"> Reset </button>
        </div>

      </form>

    </div>
  );
};

export default ProblemForm;
