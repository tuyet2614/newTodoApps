import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Items = (props) => {
  let {
    currentItems,
    handleEditTodo,
    keyDownHandler,
    DoneTodo,
    handleDelete,
    DataSave,
    newContent,
  } = props;
  let color = "black";
  let done = "";

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>Content</td>
              <td>Date</td>
              <td>Action</td>
              <td>Complete</td>
            </tr>
          </thead>

          {currentItems &&
            currentItems.map(
              (item, index) => (
                item.completed
                  ? [(done = "completed"), (color = "#DEB887")]
                  : [(done = ""), (color = "black")],
                (
                  <tbody key={item._id}>
                    <tr style={{ color: color }}>
                      <td>{index}</td>
                      <td
                        onClick={(e) => handleEditTodo(item, e)}
                        className="description"
                        onBlur={(e) => DataSave(e, item)}
                      >
                        {item.description ? (
                          item.description
                        ) : (
                          <input
                            type="text"
                            defaultValue={newContent.description}
                            onKeyDown={(e) => keyDownHandler(e, item)}
                          ></input>
                        )}
                      </td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="action">
                          <button
                            onClick={() => DoneTodo(item)}
                            className="done"
                          >
                            <CheckSharpIcon />
                          </button>
                          <button onClick={() => handleDelete(item)}>
                            <DeleteForeverIcon />
                          </button>
                        </div>
                      </td>
                      <td>{done}</td>
                    </tr>
                  </tbody>
                )
              )
            )}
        </table>
      </div>
    </>
  );
};

export default Items;
