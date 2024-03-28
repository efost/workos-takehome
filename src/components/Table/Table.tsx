import { User } from "../../App";
import "./Table.css";

const Table = ({
  users,
  onUserChange = () => {},
  checkedList,
  hideSelect = false,
}: {
  users: User[];
  onUserChange?: (user: User, i: number) => void;
  checkedList: boolean[];
  hideSelect?: boolean;
}) => {
  return (
    <div className="table">
      <div
        className={`table-header table-row ${hideSelect ? "hide-select" : ""}`}
      >
        {!hideSelect && <div className="person-admin-cell">Admin</div>}
        <div className="person-photo-cell">Photo</div>
        <div className="person-name-cell">Name</div>
        <div className="person-role-cell">Role</div>
      </div>
      {users.length ? (
        users.map((u, i) => {
          if (!u) return;
          return (
            <div
              className={`table-row ${checkedList[i] ? "checked" : ""} ${
                hideSelect ? "hide-select" : ""
              }`}
              key={`person-${i}`}
            >
              {!hideSelect && (
                <div className="person-admin-cell">
                  <label>
                    <input
                      type="checkbox"
                      checked={checkedList[i]}
                      onChange={() => onUserChange(u, i)}
                    />
                  </label>
                </div>
              )}
              <div className="person-photo-cell">
                <img src={u.photo} className="person-photo" />
              </div>
              <div className="person-name-cell">
                {u.first} {u.last}
              </div>
              <div className="person-role-cell">{u.role}</div>
            </div>
          );
        })
      ) : (
        <div className="no-records">No records found!</div>
      )}
    </div>
  );
};

export default Table;
