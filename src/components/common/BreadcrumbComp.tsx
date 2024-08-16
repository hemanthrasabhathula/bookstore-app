import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const BreadcrumbComp = ({ active }: { active: string }) => {
  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/" style={{ color: "#2B3035" }}>
            {" "}
            Home
          </Link>
        </li>
        <Breadcrumb.Item active>{active}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbComp;
