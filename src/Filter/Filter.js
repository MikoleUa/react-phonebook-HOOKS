import s from "./Filter.module.css";

function Filter({ onChange }) {
  return (
    <div className={s.filter}>
      <p>Find contacts by name</p>
      <input
        placeholder="search..."
        onChange={(e) => onChange(e.target.value)}
      ></input>
    </div>
  );
}
export default Filter;
