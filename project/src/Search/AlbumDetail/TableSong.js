import "./index.css"
import SongRow from "./SongRow";

const TableSong = () => {
  return(
    <div>
      <table className="table table-borderless">
        <thead className={"wd-header"}>
          <tr>
            <th scope="col">#</th>
            <th scope="col">TITLE</th>
            <th scope="col">ALBUM</th>
            <th scope="col">DATE ADDED</th>
            <th scope="col">LENGTH</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr>
            <th scope="row">1</th>
            <td><SongRow></SongRow></td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TableSong