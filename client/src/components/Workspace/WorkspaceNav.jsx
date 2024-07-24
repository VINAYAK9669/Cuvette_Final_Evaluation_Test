import { Link } from "react-router-dom";

function WorkspaceNav() {
  return (
    <div className="flex justify-between">
      <div>
        <input type="text" />
      </div>
      <div>
        <Link to="">Flow</Link>
        <Link to="">Theme</Link>
        <Link to="">Response</Link>
      </div>
      <div>
        <button>Share</button>
        <button>Save</button>
        <button>×</button>
      </div>
    </div>
  );
}

export default WorkspaceNav;
