import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

const BreadcrumbComp = ({ active }: { active: string }) => {
  return (
    <>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <Breadcrumb.Item active>{active}</Breadcrumb.Item>
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbComp;
