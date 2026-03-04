import { Link } from "react-router"

const Start: React.FC = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/play">Begin</Link>
        </li>
        <li>
          <Link to="/foo/one">Foo One</Link>
        </li>
        <li>
          <Link to="/foo/two">Foo Two</Link>
        </li>
      </ul>
    </>
  )
}

export default Start
